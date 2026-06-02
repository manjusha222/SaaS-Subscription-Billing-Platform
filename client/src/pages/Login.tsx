import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
     const response = await loginUser({ email, password });
    login(response.data.token, {
    name: response.data.user.name,   
    email: response.data.user.email, 
});
toast.success(`Welcome back, ${response.data.user.name}!`);
navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md">
        <Card>
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
          </div>
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-center">
              <Button
                title={loading ? "Loading..." : "Login"}
                onClick={handleLogin}
              />
            </div>
            <p className="text-center">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-700 font-semibold">
                Register
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;
