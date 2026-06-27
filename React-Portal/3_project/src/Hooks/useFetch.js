import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
  // Initialize state variables for data, loading, and error

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Create an async function to fetch data
  useEffect(() => {
    const fetchData = async () => {
     setLoading(true);
        try {
            const response = await axios.get(url);
            console.log(response.data);
            setData(response.data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setData([]);
        } finally {
            setLoading(false);
        }l
    };
    fetchData();
  }, [url]);

 return { data, loading, error };
};

export default useFetch;
