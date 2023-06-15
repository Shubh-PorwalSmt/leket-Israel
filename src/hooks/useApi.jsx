import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;

const useApi = ({ url, method, body = null, headers = null }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const query = () => {
    axios[method](url, JSON.parse(headers), JSON.parse(body))
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
  };

  useEffect(() => {
    query();
  }, [method, url, body, headers]);

  return { data, error };
};

export default useApi;
