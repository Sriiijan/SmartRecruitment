import { Mail, Lock, X, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { loginUser } from "../../api/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LoginForm() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

    } 
    catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid email or password");
      }

      else {
        setError("Something went wrong");
      }
    }
    finally {
      setLoading(false);
    }
  };

  return (

    <div className="w-full max-w-md mx-auto bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl">

      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10">

        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="text-slate-400 mt-3 text-sm sm:text-base">
          Login to continue your journey.
        </p>

      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 sm:space-y-6"
      >

        {/* Email */}
        <div>

          <label className="text-slate-300 block mb-2 text-sm sm:text-base">
            Email
          </label>

          <div className="flex items-center bg-slate-800 rounded-xl sm:rounded-2xl px-3 sm:px-4 border border-slate-700 focus-within:border-cyan-400 transition">

            <Mail className="text-slate-400 flex-shrink-0" size={20} />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full bg-transparent outline-none px-3 sm:px-4 py-3 sm:py-4 text-sm sm:text-base text-white"
              required
            />

          </div>

        </div>

        {/* Password */}
        <div>
          <label className="text-slate-300 block mb-2">
              Password
          </label>

          <div className="relative flex items-center bg-slate-800 rounded-2xl px-4 border border-slate-700 focus-within:border-cyan-400 transition">

              <Lock className="text-slate-400" size={20} />

              <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none px-4 py-4 text-white"
              required
              />

              <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-gray-400 hover:text-white"
              >
              {
                  showPassword
                  ? <EyeOff size={22} />
                  : <Eye size={22} />
              }
              </button>
          </div>
        </div>

        {/* Forgot Password */}
        <div className="text-right">

          <button
            type="button"
            className="text-cyan-400 hover:underline text-sm sm:text-base"
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
          className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-white font-semibold text-sm sm:text-base hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      {/* Register */}
      <p className="text-slate-400 text-center mt-6 sm:mt-8 text-sm sm:text-base">

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