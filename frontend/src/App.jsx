import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResumePage from "./pages/UploadResume";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import AnalyzeResumeJD from "./pages/AnalyzeResume";
import RecommendedJobsPage from "./pages/RecommendedJobsPage";

import ProtectedRoute from "./routes/ProtectedRoute";
import SavedJobsPage from "./pages/SavedJobsPage";
import Navbar from "./components/home/Navbar";

function App() {

  const location = useLocation();

  const isHome = location.pathname === "/";


  return (
    <>
      {/* Global Navbar */}
      <Navbar />

      {!isHome && <Sidebar />}
      {/* Page Content */}
      <div
        className={`
          pt-16
          ${!isHome ? "ml-72" : ""}
        `}
      >

        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/upload-resume"
            element={
              <ProtectedRoute>
                <UploadResumePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/jobs"
            element={
              <ProtectedRoute>
                <Jobs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/analyze-resume"
            element={
              <ProtectedRoute>
                <AnalyzeResumeJD />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recommended-jobs"
            element={<RecommendedJobsPage />}
          />

          <Route
            path="/saved-jobs"
            element={<SavedJobsPage />}
          />

        </Routes>
      </div>
    </>
  );
}

export default App;