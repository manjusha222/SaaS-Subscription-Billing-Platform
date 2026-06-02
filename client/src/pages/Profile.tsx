import DashboardLayout from "../layouts/DashboardLayout";
import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../services/userService";
import toast from "react-hot-toast";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await getProfile();
      setName(response.data.name);
      setEmail(response.data.email);
    } catch (error) {
      toast.error("Failed to load profile.");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await updateProfile({ name, email });
      toast.success(response.data.message || "Profile updated!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-10">
          <div className="flex items-center gap-5 mb-10">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
              {name ? name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="text-gray-500 mt-1">Manage your account details</p>
            </div>
          </div>

          <form onSubmit={handleUpdate}>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name || ""}
                disabled={!isEditing}
                onChange={(e) => setName(e.target.value)}
                className={`w-full border p-4 rounded-xl focus:outline-none focus:ring-2 ${
                  isEditing
                    ? "focus:ring-blue-500 bg-white"
                    : "bg-gray-200 text-black cursor-not-allowed"
                }`}
              />
            </div>

            <div className="mb-8">
              <label className="block text-lg font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email || ""}
                disabled={!isEditing}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border p-4 rounded-xl focus:outline-none focus:ring-2 ${
                  isEditing
                    ? "focus:ring-blue-500 bg-white"
                    : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-800"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-800 disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Profile;
