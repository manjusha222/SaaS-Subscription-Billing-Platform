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

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await getPlans();
      setPlans(response.data || []);
    } catch (error) {
      toast.error("Failed to load plans. Please try again.");
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
          {Array.isArray(plans) && plans.length > 0 ? (
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
            <p>No Plans Available</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Plans;
