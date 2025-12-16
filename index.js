import axios from "axios";


export const imageUpload = async (imageData) => {
  try {
    const formData = new FormData();
    formData.append("image", imageData);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData
    );

    return res.data?.data?.display_url;
  } catch (error) {
    console.error("IMGBB Upload Error:", error);
    return null;
  }
};

export const imageUploadCloudinary = async (imageData) => {
  try {
    const formData = new FormData();
    formData.append("file", imageData);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    );

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      formData
    );

    return res.data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};

export const saveOrUpdateUser = async (userData) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/user`,
      userData,
      {
        withCredentials: true,
      }
    );

    return res.data;
  } catch (error) {
    console.error("Save User Error:", error);
    return null;
  }
};
