import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/home/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadResumePage from "./pages/UploadResume";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import AnalyzeResumeJD from "./pages/AnalyzeResume";
import RecommendedJobsPage from "./pages/RecommendedJobsPage";
import SavedJobsPage from "./pages/SavedJobsPage";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  const location = useLocation();

  // Pages WITHOUT sidebar
  const noSidebarRoutes = [
    "/",
    "/login",
    "/register",
  ];

  const showSidebar =
    !noSidebarRoutes.includes(location.pathname);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Sidebar */}
      {showSidebar && <Sidebar />}

      {/* Main Content */}
      <div
        className={`
          pt-16
          transition-all duration-300
          ${showSidebar ? "md:ml-72" : ""}
        `}
      >

        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
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