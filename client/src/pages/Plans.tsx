import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { getPlans } from "../services/planService";
import { subscribePlan } from "../services/subscriptionService";
import toast from "react-hot-toast";

interface Plan {
  id: number;
  name: string;
  price: number;
  features: string;
}

function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true); 
      const response = await getPlans();
      setPlans(response.data || []);
    } catch (error) {
      toast.error("Failed to load plans. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: number) => {
    try {
      const response = await subscribePlan({ plan_id: planId });
      toast.success(response.data.message || "Subscribed successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Subscription failed");
    }
  };

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl font-bold mb-8">Subscription Plans</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Skeleton cards while loading */}
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-md animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-24 mb-3" />
                  <div className="h-8 bg-gray-200 rounded w-20 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-6" />
                  <div className="h-10 bg-gray-200 rounded-lg w-full" />
                </div>
              ))}
            </>
          ) : Array.isArray(plans) && plans.length > 0 ? (
            plans.map((plan) => (
              <div key={plan.id} className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-medium mb-3">{plan.name}</h2>
                <p className="text-3xl text-blue-600 font-medium mb-4">
                  ₹ {plan.price}
                  <span className="text-base text-gray-400 font-normal">
                    /month
                  </span>
                </p>
                <p className="mb-6 text-gray-600">{plan.features}</p>
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className="w-full text-white bg-blue-600 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">No Plans Available</p>
            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Plans;