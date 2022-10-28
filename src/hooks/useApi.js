import axios from "axios";
import { useEffect, useState } from "react";

export const useApi = (URL, _="") => {
    const [data, setData] = useState([]);
    const options = { method: "GET", url: URL };

  useEffect(()=>{

    axios
    .request(options)
    .then(response => setData(response.data.data))
  }, [_])

  return {data}
};

