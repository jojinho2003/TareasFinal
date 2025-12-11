import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export function useHttp() {
  const { token } = useContext(AuthContext);

  const request = async (url, method = "GET", body = null) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      }
    };

    if (body) options.body = JSON.stringify(body);

    const res = await fetch(url, options);
    return res.json();
  };

  return { request };
}
