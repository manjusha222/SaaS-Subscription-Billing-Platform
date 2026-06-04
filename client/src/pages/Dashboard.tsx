import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { getMySubscriptions } from "../services/dashboardService";
import { subscribePlan } from "../services/subscriptionService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { generateInvoice } from "../utils/generateInvoice";
import { useAuth } from "../context/AuthContext";

interface Subscription {
  id: number;
  name: string;
  plan_id: number;
  price: number;
  features: string;
  status: string;
  created_at: string;
  expires_at: string | null;
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function ExpiryBadge({ expiresAt }: { expiresAt: string | null }) {
  const days = daysUntil(expiresAt);
  if (days === null) return null;

  if (days < 0)
    return (
      <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
        Expired
      </span>
    );
  if (days <= 7)
    return (
      <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
        Expires in {days} day{days !== 1 ? "s" : ""}
      </span>
    );
  return (
    <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
      Expires {new Date(expiresAt!).toLocaleDateString()}
    </span>
  );
}

// ── Loading Skeleton ──────────────────────────────────────────────────────────
function DashboardSkeleton() {
  return (
    <DashboardLayout>
      <div className="animate-pulse">
        {/* Title skeleton */}
        <div className="h-8 bg-gray-200 rounded w-40 mb-6" />

        {/* Current plan skeleton */}
        <div className="mb-10">
          <div className="h-10 bg-gray-200 rounded-full w-44 mb-4" />
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between mb-4">
              <div className="h-7 bg-gray-200 rounded w-32" />
              <div className="h-6 bg-gray-200 rounded-full w-24" />
            </div>
            <div className="h-5 bg-gray-200 rounded w-28 mb-3" />
            <div className="h-5 bg-gray-200 rounded w-24 mb-3" />
            <div className="h-5 bg-gray-200 rounded w-48 mb-5" />
            <div className="flex gap-3">
              <div className="h-10 bg-gray-200 rounded-lg w-32" />
              <div className="h-10 bg-gray-200 rounded-lg w-40" />
            </div>
          </div>
        </div>

        {/* History skeleton */}
        <div className="h-7 bg-gray-200 rounded w-52 mb-5" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="bg-gray-100 p-5 rounded-xl">
              <div className="flex justify-between mb-3">
                <div className="h-6 bg-gray-200 rounded w-28" />
                <div className="h-5 bg-gray-200 rounded-full w-20" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-32" />
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────
function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await getMySubscriptions();
      setSubscriptions(response.data || []);
    } catch (error) {
      toast.error("Failed to load subscriptions.");
    } finally {
      setLoading(false);
    }
  };

  const handleRenew = async (planId: number) => {
    try {
      const response = await subscribePlan({ plan_id: planId });
      toast.success(response.data.message || "Plan renewed successfully!");
      fetchSubscriptions();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Renewal failed");
    }
  };

  const handleDownloadInvoice = () => {
    if (!activePlan) return;
    generateInvoice({
      userName: user?.name || "User",
      userEmail: user?.email || "",
      planName: activePlan.name,
      planPrice: activePlan.price,
      subscribedDate: new Date(activePlan.created_at).toLocaleDateString("en-IN"),
      expiryDate: activePlan.expires_at
        ? new Date(activePlan.expires_at).toLocaleDateString("en-IN")
        : "N/A",
      invoiceNumber: `INV-${activePlan.id}-${Date.now().toString().slice(-4)}`,
    });
    toast.success("Invoice downloaded!");
  };

  const activePlan = subscriptions.find((sub) => sub.status === "active");
  const historyPlans = subscriptions;
  const isExpiringSoon =
    activePlan?.expires_at
      ? (daysUntil(activePlan.expires_at) ?? 99) <= 7
      : false;

  //  Show skeleton while loading 
  if (loading) return <DashboardSkeleton />;

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Current Plan */}
        <div className="mb-10">
          {activePlan &&(
            <p className="text-lg font-semibold text-red-500 mb-3">
              Your Current Plan
            </p>
          )}
          
          {activePlan ? (
            <div
              className={`bg-white p-6 rounded-xl shadow-md ${
                isExpiringSoon ? "border-2 border-orange-400" : ""
              }`}
            >
              {/* Expiry warning banner */}
              {isExpiringSoon && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
                  <span className="text-orange-600 text-sm font-medium">
                    ⚠️ Your plan is expiring soon. Renew now to avoid interruption.
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-2">
                <h2 className="text-2xl font-bold">{activePlan.name}</h2>
                <ExpiryBadge expiresAt={activePlan.expires_at} />
              </div>

              <p className="text-lg mb-2">₹{activePlan.price}/month</p>

              <p className="mb-2">
                Status:
                <span className="text-green-600 font-medium ml-2">
                  {activePlan.status}
                </span>
              </p>

              {activePlan.expires_at && (
                <p className="mb-2 text-sm font-medium">
                  Renewal date:{" "}
                  <span className="font-medium text-black">
                    {new Date(activePlan.expires_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </p>
              )}

              <p className="mb-5">
                Features:
                <span className="ml-2">{activePlan.features}</span>
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate("/plans")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Change Plan
                </button>

                <button
                  onClick={handleDownloadInvoice}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold"
                >
                  📄 Download Invoice
                </button>

                {isExpiringSoon && (
                  <button
                    onClick={() => handleRenew(activePlan.plan_id)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors font-semibold"
                  >
                    Renew Now
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Empty state — only shown AFTER loading is complete
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="bg-grt-to-r from-blue-600 to-blue-400 px-8 py-8">
                <p className="text-blue-100 text-sm mb-1">Current Plan</p>
                <h2 className="text-white text-2xl font-bold">No Active Plan</h2>
                <p className="text-blue-100 text-sm mt-1">
                  You are not subscribed yet. Choose a plan to get started.
                </p>
              </div>

              <div className="px-8 py-6">
                <p className="text-sm font-semibold text-gray-400 mb-4">
                  What you will get after subscribing
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="flex flex-col items-center text-center bg-gray-50 rounded-xl px-3 py-4 border border-gray-100">
                    <span className="text-2xl mb-2">📋</span>
                    <p className="text-xs font-semibold text-gray-500">Plan Management</p>
                    <p className="text-xs text-gray-400 mt-1">Subscribe, change or cancel anytime</p>
                  </div>
                  <div className="flex flex-col items-center text-center bg-gray-50 rounded-xl px-3 py-4 border border-gray-100">
                    <span className="text-2xl mb-2">📄</span>
                    <p className="text-xs font-semibold text-gray-500">Invoice Download</p>
                    <p className="text-xs text-gray-400 mt-1">Download PDF invoice for your plan</p>
                  </div>
                  <div className="flex flex-col items-center text-center bg-gray-50 rounded-xl px-3 py-4 border border-gray-100">
                    <span className="text-2xl mb-2">🔔</span>
                    <p className="text-xs font-semibold text-gray-500">Expiry Alerts</p>
                    <p className="text-xs text-gray-400 mt-1">Get notified before plan expires</p>
                  </div>
                  <div className="flex flex-col items-center text-center bg-gray-50 rounded-xl px-3 py-4 border border-gray-100">
                    <span className="text-2xl mb-2">📅</span>
                    <p className="text-xs font-semibold text-gray-500">Billing History</p>
                    <p className="text-xs text-gray-400 mt-1">Track all your past subscriptions</p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/plans")}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors"
                >
                  View Plans & Subscribe
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Subscription History */}
        <div>
          <h2 className="text-2xl font-bold mb-5">Subscription History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {historyPlans.length > 0 ? (
              historyPlans.map((sub) => (
                <div key={sub.id} className="bg-gray-100 p-5 rounded-xl">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{sub.name}</h3>
                    <ExpiryBadge expiresAt={sub.expires_at} />
                  </div>
                  <p className="mb-1">₹{sub.price}/month</p>
                  <p className="mb-1">
                    Status:
                    <span className={`ml-2 font-medium ${
                      sub.status === "active" ? "text-green-600" : "text-red-500"
                    }`}>
                      {sub.status}
                    </span>
                  </p>
                  <p className="mb-1">
                    Subscribed:{" "}
                    <span className="ml-1">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </span>
                  </p>
                  {sub.expires_at && (
                    <p>
                      Expires:{" "}
                      <span className="ml-1">
                        {new Date(sub.expires_at).toLocaleDateString()}
                      </span>
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p>No subscription history found</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;