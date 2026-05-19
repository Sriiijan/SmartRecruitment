import axiosInstance from "./axios";


export const searchJobs = async (query) => {

  const response = await axiosInstance.get(
    `/job/search?q=${query}`
  );

  return response.data;
};

export const recommendedJobs = async (selectedResumeId) => {

  const response = await axiosInstance.post(
    "/job/recommended",
    {
      resumeId: selectedResumeId
    }
  );

  return response.data;
};

export const saveJob = async (jobData) => {

  const response =
    await axiosInstance.post(
      "/job/save",
      jobData
    );

  return response.data;
};


export const deleteSavedJob = async (id) => {

  const response =
    await axiosInstance.delete(
      `/job/${id}`
    );

  return response.data;
};

export const getSavedJobs =
  async () => {

    const response =
      await axiosInstance.get(
        "/job/saved"
      );

    return response.data;
};


export const getSavedJobsCount =
  async () => {

    const response =
      await axiosInstance.get(
        "/job/saved/count"
      );

    return response.data;
};