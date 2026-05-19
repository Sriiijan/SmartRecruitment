import axiosInstance from "./axios";


// Update User Details
export const updateAccountDetails = async (userData) => {

    const response = await axiosInstance.patch(
        "/users/update-account",
        userData
    );

    return response.data;
};

export const getCurrentUser = async () => {

    const response = await axiosInstance.get(
        "/users/current-user"
    );

    return response.data;
};

// Update Avatar
export const updateAvatar = async (formData) => {

    const response = await axiosInstance.patch(
        "/users/avatar",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};
