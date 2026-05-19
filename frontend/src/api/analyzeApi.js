import axiosInstance from "./axios";



export const analyzedScore = async (selectedResumeId, jobDescription) => {

  const response = await axiosInstance.post(
    "/analyze",
    {
      resumeId: selectedResumeId,
      jobDescription: jobDescription
    }
  );

  return response.data;
};
