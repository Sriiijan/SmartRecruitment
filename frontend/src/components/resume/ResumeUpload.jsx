import { UploadCloud, FileText } from "lucide-react";
import { useState } from "react";

import { uploadResume } from "../../api/resumeApi";

function ResumeUpload() {
  const [resume, setResume] = useState(null);
  const [title, setTitle] = useState("");
  const [previewName, setPreviewName] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================
  // Handle Resume Change
  // =====================================
  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setResume(file);
      setPreviewName(file.name);

      // Auto-fill title using filename (without extension)
      if (!title.trim()) {
        const fileName = file.name.replace(/\.[^/.]+$/, "");
        setTitle(fileName);
      }
    }
  };

  // =====================================
  // Handle Submit
  // =====================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      return alert("Please select a resume");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("title", title);

      const response = await uploadResume(formData);

      console.log(response);

      alert("Resume uploaded successfully");

      // Reset form
      setResume(null);
      setTitle("");
      setPreviewName("");

      // Reset file input
      document.getElementById("resumeInput").value = "";
    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        w-full
        max-w-2xl
        bg-slate-900
        border border-slate-800
        rounded-2xl sm:rounded-3xl
        p-5 sm:p-8 md:p-10
        shadow-2xl
      "
    >
      {/* Heading */}
      <div className="text-center mb-8 sm:mb-10">
        <h1
          className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            font-bold
            text-white
          "
        >
          Upload Resume
        </h1>

        <p
          className="
            text-slate-400
            mt-2 sm:mt-3
            text-sm sm:text-base
          "
        >
          Store and manage your resumes securely.
        </p>
      </div>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Resume Title */}
        <div>
          <label className="block text-white font-medium mb-2">
            Resume Title
          </label>

          <input
            type="text"
            placeholder="Enter resume title (Optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
              w-full
              bg-slate-800
              border border-slate-700
              rounded-xl
              px-4
              py-3
              text-white
              placeholder:text-slate-500
              focus:outline-none
              focus:border-cyan-400
            "
          />
        </div>

        {/* Upload Box */}
        <label
          className="
            border-2 border-dashed border-cyan-400
            rounded-2xl sm:rounded-3xl
            p-6 sm:p-10 md:p-12
            flex flex-col items-center justify-center
            cursor-pointer
            hover:bg-slate-800
            transition
            text-center
          "
        >
          <UploadCloud
            size={window.innerWidth < 640 ? 45 : 60}
            className="text-cyan-400"
          />

          <p
            className="
              text-white
              text-base sm:text-lg
              mt-4 sm:mt-5
            "
          >
            Click to Upload Resume
          </p>

          <p
            className="
              text-slate-400
              text-xs sm:text-sm
              mt-2
            "
          >
            PDF, DOC, DOCX Supported
          </p>

          <input
            id="resumeInput"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            className="hidden"
          />
        </label>

        {/* Preview */}
        {previewName && (
          <div
            className="
              bg-slate-800
              rounded-2xl
              p-4 sm:p-5
              flex items-center gap-3 sm:gap-4
            "
          >
            <FileText className="text-cyan-400 flex-shrink-0" />

            <div className="min-w-0 flex-1">
              <p
                className="
                  text-white
                  text-sm sm:text-base
                  truncate
                "
              >
                {previewName}
              </p>

              <p
                className="
                  text-slate-400
                  text-xs sm:text-sm
                "
              >
                Title: <span className="text-cyan-400">{title}</span>
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            bg-gradient-to-r
            from-indigo-500
            to-cyan-500
            py-3 sm:py-4
            rounded-2xl
            text-white
            font-semibold
            text-sm sm:text-base
            hover:opacity-90
            transition
            disabled:opacity-50
          "
        >
          {loading ? "Uploading..." : "Save Resume"}
        </button>
      </form>
    </div>
  );
}

export default ResumeUpload;