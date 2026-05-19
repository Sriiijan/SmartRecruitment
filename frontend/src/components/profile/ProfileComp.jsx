import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import EditProfileModal from "../../components/profile/EditProfileModal";
import { useAuth } from "../../context/AuthContext";
import {
  fetchResumeCount,
  getUserResumes,
  deleteResume
} from "../../api/resumeApi";
import { getCurrentUser, updateAvatar } from "../../api/userApi";
import { getSavedJobsCount } from "../../api/jobApi";

import {
  FileText,
  Briefcase,
  BadgeCheck,
  Mail,
  User,
} from "lucide-react";


function ProfileComp() {

  // const { user } = useAuth();

  const [user, setUser]= useState(null);
  const [resumeCount, setResumeCount] = useState(0);
  const [resumes, setResumes] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [savedJobCount, setSavedJobCount] = useState(0);

  // Current User
  useEffect(() => {
    const currentUser= async () => {
      try {
        const data= await getCurrentUser();
        // console.log(data);
        setUser(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    currentUser();

  }, []);

  // Resume count
  useEffect(() => {
    const loadResumeCount = async () => {

      try {
        const data = await fetchResumeCount();
        setResumeCount(data.count);
      }
      catch (error) {
        console.log(error);
      }
    };

    loadResumeCount();

  }, []);

  //Resumes
  useEffect(() => {
    const loadResumes = async () => {
      try {
        const data = await getUserResumes();
        // console.log(data);
        setResumes(data.data);
      }
      catch (error) {
        console.log(error);
      }
    };

    loadResumes();

  }, []);

  // Update avatar
  const handleAvatarChange = async (e) => {
    try {
      const file = e.target.files[0];

      if (!file) return;

      const formData = new FormData();

      formData.append("avatar", file);

      const response = await updateAvatar(
        formData
      );

      console.log(response);

      const updatedUser = response.data;

      // Update UI instantly
      setUser(updatedUser);

    }
    catch (error) {
      console.log(error);
      alert("Failed to upload avatar");
    }
  };
  
  // Saved Jobs Count
  useEffect(() => {

    const loadSavedJobsCount = async () => {
        try {

          const response =
            await getSavedJobsCount();

          console.log(response);

          setSavedJobCount(
            response.data.count
          );

        } catch (error) {

          console.log(error);
        }
      };

    loadSavedJobsCount();

  }, []);

  const handleDeleteResume = async (resumeId) => {

    try {

      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this resume?"
        );

      if (!confirmDelete) return;

      await deleteResume(resumeId);

      // Update UI instantly
      setResumes((prev) =>
        prev.filter(
          (resume) =>
            resume._id !== resumeId
        )
      );

      // Update count
      setResumeCount((prev) =>
        prev - 1
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to delete resume"
      );
    }
  };

  return (
    <div className="flex bg-slate-950 min-h-screen">

      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="flex-1 p-10">

        {/* Heading */}
        <h1 className="text-5xl font-bold text-white">
          My Profile
        </h1>

        <p className="text-slate-400 mt-4">
          Manage your Smart Recruitment account.
        </p>

        {/* Profile Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 mt-12 max-w-4xl">
      
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center gap-10">

            {/* Avatar */}
            <div className="relative">
              <img
                src={
                  user?.avatar ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="avatar"
                className="w-44 h-44 rounded-full object-cover border-4 border-slate-900 shadow-2xl"
              />

              {/* Upload Button */}
              <label
                htmlFor="avatarUpload"
                className="absolute bottom-2 right-2 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full cursor-pointer shadow-lg transition"
              >
                ✎
              </label>

              <input
                type="file"
                id="avatarUpload"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
              
            </div>

            {/* User Info */}
            <div>

              <h2 className="text-4xl font-bold text-white">
                {user?.fullName}
              </h2>

              <p className="text-cyan-400 text-xl mt-2">
                @{user?.username}
              </p>

              <p className="text-slate-400 mt-4 text-lg">
                {user?.email}
              </p>

              <button
                className="mt-8 bg-gradient-to-r from-indigo-500 to-cyan-500 px-8 py-3 rounded-2xl text-white font-semibold hover:opacity-90 transition"
                onClick={() => setOpenEditModal(true)}
              >
                Edit Profile
              </button>
              {
                  openEditModal && (
                      <EditProfileModal
                      user={user}
                      setUser={setUser}
                      onClose={() => setOpenEditModal(false)}
                  />
                  )
              }

            </div>

          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-14">

            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <h3 className="text-slate-400">
                Uploaded Resumes
              </h3>

              <p className="text-4xl font-bold text-cyan-400 mt-3">
                {resumeCount}
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <h3 className="text-slate-400">
                Saved Jobs
              </h3>

              <p className="text-4xl font-bold text-cyan-400 mt-3">
                {savedJobCount}
              </p>
            </div>

            <div className="bg-slate-800 rounded-2xl p-6 text-center">
              <h3 className="text-slate-400">
                ATS Score
              </h3>

              <p className="text-4xl font-bold text-cyan-400 mt-3">
                92%
              </p>
            </div>

          </div>

          {/* Uploaded Resumes */}
          <div className="mt-14">

            <h2 className="text-3xl font-bold text-white mb-8">
              Uploaded Resumes
            </h2>

            <div className="grid gap-6">

              {
                  resumes.map((resume) => (

                  <div
                    key={resume._id}
                    className="bg-slate-800 border border-slate-700 rounded-2xl p-6 flex items-center justify-between"
                  >

                    {/* Left */}
                    <div className="flex items-center gap-4">

                      <div className="bg-cyan-500/10 p-4 rounded-2xl">

                        <FileText
                          size={28}
                          className="text-cyan-400"
                        />

                      </div>

                      <div>

                        <h3 className="text-white text-lg font-semibold">
                          {resume.originalName}
                        </h3>

                        <p className="text-slate-400 text-sm mt-1">
                          Uploaded Resume
                        </p>

                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex gap-4">

                      {/* View */}
                      <a
                        href={resume.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl transition"
                      >
                        View
                      </a>

                      {/* Download */}
                      <a
                        href={resume.resumeUrl}
                        download
                        className="bg-slate-700 hover:bg-slate-600 text-white px-5 py-2 rounded-xl transition"
                      >
                        Download
                      </a>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          handleDeleteResume(
                            resume._id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                ))
              }

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProfileComp;