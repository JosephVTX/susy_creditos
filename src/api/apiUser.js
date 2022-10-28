import axios from "axios";

export const apiCreateUser = (URL, data) => {
  const options = {
    method: "POST",
    url: URL,
    data: {
        data: data
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  return axios.request(options);
};
