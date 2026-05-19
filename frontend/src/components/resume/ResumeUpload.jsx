import { UploadCloud, FileText } from "lucide-react";
import { useState } from "react";

import { uploadResume } from "../../api/resumeApi";

function ResumeUpload() {

  const [resume, setResume] = useState(null);

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

      const response = await uploadResume(formData);

      console.log(response);

      alert("Resume uploaded successfully");

      // reset states
      setResume(null);

      setPreviewName("");

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

    <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-2xl">

      {/* Heading */}
      <div className="text-center mb-10">

        <h1 className="text-4xl font-bold text-white">
          Upload Resume
        </h1>

        <p className="text-slate-400 mt-3">
          Store and manage your resumes securely.
        </p>

      </div>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >

        {/* Upload Box */}
        <label className="border-2 border-dashed border-cyan-400 rounded-3xl p-12 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-800 transition">

          <UploadCloud
            size={60}
            className="text-cyan-400"
          />

          <p className="text-white text-lg mt-5">
            Click to Upload Resume
          </p>

          <p className="text-slate-400 text-sm mt-2">
            PDF, DOC, DOCX Supported
          </p>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleResumeChange}
            className="hidden"
          />

        </label>

        {/* File Preview */}
        {
          previewName && (

            <div className="bg-slate-800 rounded-2xl p-5 flex items-center gap-4">

              <FileText className="text-cyan-400" />

              <div>

                <p className="text-white">
                  {previewName}
                </p>

                <p className="text-slate-400 text-sm">
                  Ready to upload
                </p>

              </div>

            </div>
          )
        }

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 py-4 rounded-2xl text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
        >

          {
            loading
              ? "Uploading..."
              : "Save Resume"
          }

        </button>

      </form>

    </div>
  );
}

export default ResumeUpload;