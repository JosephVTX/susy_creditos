import axios from "axios";

export const apiCreateProduct = (URL, data) => {
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

export const apiDeleteProduct = (URL) => {

    const options = {
        method: "DELETE",
        url: URL,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        
    };
    
    return axios.request(options);

};
