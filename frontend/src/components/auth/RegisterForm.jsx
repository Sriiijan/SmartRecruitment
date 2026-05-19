import { User, Mail, Lock, ImagePlus } from "lucide-react";
import { useState } from "react";
import { registerUser } from "../../api/authApi";

function RegisterForm() {

    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });

    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    // Handle Avatar
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];

        if (file) {
        setAvatar(file);
        setPreview(URL.createObjectURL(file));
        }
    };

    // Handle Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        setLoading(true);
        setError("");

        const userData = new FormData();

        userData.append("fullName", formData.fullName);
        userData.append("username", formData.username);
        userData.append("email", formData.email);
        userData.append("password", formData.password);
        userData.append("avatar", avatar);

        const data = await registerUser(userData);

        console.log(data);

        // API Call Example
        /*
        await axios.post(
            "http://localhost:8000/api/v1/users/register",
            userData,
            {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            }
        );
        */

        } catch (err) {
        setError("Registration failed");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

        {/* Heading */}
        <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-white">
            Create Account
            </h1>

            <p className="text-slate-400 mt-3">
            Join SmarRecruitment today.
            </p>
        </div>

        {/* Form */}
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            {/* Avatar Upload */}
            <div className="flex flex-col items-center">

            <label className="relative cursor-pointer">

                <div className="w-28 h-28 rounded-full bg-slate-800 border-2 border-dashed border-cyan-400 flex items-center justify-center overflow-hidden">

                {
                    preview ? (
                    <img
                        src={preview}
                        alt="avatar"
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <ImagePlus
                        className="text-cyan-400"
                        size={40}
                    />
                    )
                }

                </div>

                <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                />
            </label>

            <p className="text-slate-400 text-sm mt-3">
                Upload Profile Picture
            </p>
            </div>

            {/* Name */}
            <div>
            <label className="text-slate-300 block mb-2">
                Full Name
            </label>

            <div className="flex items-center bg-slate-800 rounded-2xl px-4 border border-slate-700 focus-within:border-cyan-400 transition">

                <User className="text-slate-400" size={20} />

                <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full bg-transparent outline-none px-4 py-4 text-white"
                required
                />
            </div>
            </div>

            {/* Username */}
            <div>
            <label className="text-slate-300 block mb-2">
                Username
            </label>

            <div className="flex items-center bg-slate-800 rounded-2xl px-4 border border-slate-700 focus-within:border-cyan-400 transition">

                <User className="text-slate-400" size={20} />

                <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="w-full bg-transparent outline-none px-4 py-4 text-white"
                required
                />
            </div>
            </div>

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
                placeholder="Create password"
                className="w-full bg-transparent outline-none px-4 py-4 text-white"
                required
                />
            </div>
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
            {loading ? "Creating Account..." : "Register"}
            </button>

        </form>
        </div>
    );
}

export default RegisterForm;