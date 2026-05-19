import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(formData);

      login(data.data.user);

      navigate("/dashboard");

      console.log(data);

      // API call here

    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="text-slate-400 mt-3">
          Login to continue your journey.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Email */}
        <div>
          <label className="text-slate-300 block mb-2">
            Email
          </label>

          <div className="flex items-center bg-slate-800 rounded-2xl px-4 border border-slate-700 focus-within:border-cyan-400 transition">

            <Mail className="text-slate-400" size={20} />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none px-4 py-4 text-white"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-slate-300 block mb-2">
            Password
          </label>

          <div className="flex items-center bg-slate-800 rounded-2xl px-4 border border-slate-700 focus-within:border-cyan-400 transition">

            <Lock className="text-slate-400" size={20} />

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none px-4 py-4 text-white"
              required
            />
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <button
            type="button"
            className="text-cyan-400 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        {/* Error */}
        {
          error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )
        }

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 py-4 rounded-2xl text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      {/* Register */}
      <p className="text-slate-400 text-center mt-8">
        Don't have an account?{" "}

        <Link
          to="/register"
          className="text-cyan-400 hover:underline"
        >
          Register
        </Link>
      </p>

    </div>
  );
}

export default LoginForm;