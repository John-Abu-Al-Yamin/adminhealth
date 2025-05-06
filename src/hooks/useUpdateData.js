import baseUrl from "../Api/axiosInstance ";

const useInUpdateDataWithImage = async (url, formData) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await baseUrl.post(url, formData, config);
  console.log(res.status);
  return res;
};


const useInsUpdateData = async (url, params) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
  const res = await baseUrl.post(url, params, config);
  return res;
};

export { useInUpdateDataWithImage, useInsUpdateData };
