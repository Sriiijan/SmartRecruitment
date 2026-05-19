import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { updateAccountDetails } from "../../api/userApi";

function EditProfileModal({
    user,
    setUser,
    onClose
}) {

    const [fullName, setFullName] = useState(user?.fullName || "");
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (password !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }

            const response = await updateAccountDetails({
                fullName,
                username,
                email,
            });


            const updatedUser = response.data;
            

            setUser(updatedUser);

            alert("Profile updated successfully");

            onClose();

        } catch (error) {

            console.log(error);

            alert("Something went wrong");
        }
    };

    return (

        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">

            <div className="bg-[#09122C] w-full max-w-lg rounded-3xl p-8 border border-cyan-500/20 shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">

                    <h2 className="text-3xl font-bold text-white">
                        Edit Profile
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <X size={28} />
                    </button>

                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Full Name */}
                    <div>

                        <label className="text-gray-300 block mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Enter full name"
                            className="w-full bg-[#1B2A49] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                        />

                    </div>

                    {/* Username */}
                    <div>

                        <label className="text-gray-300 block mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled
                            placeholder="Enter username"
                            className="w-full bg-[#1B2A49] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                        />

                    </div>

                    {/* Email */}
                    <div>

                        <label className="text-gray-300 block mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="w-full bg-[#1B2A49] border border-cyan-500/20 rounded-xl px-4 py-3 text-white outline-none focus:border-cyan-400"
                        />

                    </div>

                    {/* Password */}
                    <div>

                        <label className="text-gray-300 block mb-2">
                            New Password
                        </label>

                        <div className="relative">

                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter new password"
                                className="w-full bg-[#1B2A49] border border-cyan-500/20 rounded-xl px-4 py-3 pr-14 text-white outline-none focus:border-cyan-400"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {
                                    showPassword
                                        ? <EyeOff size={22} />
                                        : <Eye size={22} />
                                }
                            </button>

                        </div>

                    </div>

                    {/* Confirm Password */}
                    <div>

                        <label className="text-gray-300 block mb-2">
                            Confirm Password
                        </label>

                        <div className="relative">

                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                                className="w-full bg-[#1B2A49] border border-cyan-500/20 rounded-xl px-4 py-3 pr-14 text-white outline-none focus:border-cyan-400"
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                            >
                                {
                                    showConfirmPassword
                                        ? <EyeOff size={22} />
                                        : <Eye size={22} />
                                }
                            </button>

                        </div>

                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4 pt-4">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-3 rounded-xl bg-gray-700 text-white hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:scale-105 transition"
                        >
                            Save Changes
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditProfileModal;