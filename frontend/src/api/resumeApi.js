import axiosInstance from "./axios";



// Upload Resume
export const uploadResume = async (formData) => {

    const response = await axiosInstance.post(

        "/resume/add-resume",

        formData,

        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};


// Get User Resumes
export const getUserResumes = async () => {

    const response = await axiosInstance.get(
        "/resume"
    );

    return response.data;
};


// Delete Resume
export const deleteResume = async (resumeId) => {

  const response = await axiosInstance.delete(
    `/resume/delete/${resumeId}`
  );

  return response.data;
};


export const fetchResumeCount = async () => {

    const response = await axiosInstance.get(
        "/resume/count"
    );

    return response.data;
};
