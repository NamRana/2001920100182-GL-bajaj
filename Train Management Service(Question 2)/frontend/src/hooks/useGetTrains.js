import { useState } from "react";
import axios from "axios";

export const useGetTrains = () => {
  const [isPending, setIsPending] = useState(false);

  const getTrains = async (id) => {
    setIsPending(true);

    try {
      const res = await axios.get("http://localhost:3000/trains");

      console.log(res);

      return res
        ? { ok: true, data: res.data }
        : { error: "Unable to Get Trains Information" };
    } catch (err) {
      let error = "";
      if (err.response) {
        error = err?.response?.data?.message || "An error occurred.";
      } else if (err.request) {
        error = "Network error. Please try again later.";
      } else {
        error = "An error occurred. Please try again later.";
      }
      return { error };
    } finally {
      setIsPending(false);
    }
  };

  return { getTrains, isPending };
};

