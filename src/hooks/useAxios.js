import axios from "axios";
import { useCallback, useEffect, useState } from "react";

export default function (request) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1); // Function to trigger re-fetch
  }, []);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(request);
        setResponse(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    }
    fetchData();
  }, [request, trigger]);

  return { response, error, loading, refetch };
}
