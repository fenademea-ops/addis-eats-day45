import { useEffect, useState } from "react";

export function useFetch(url, options = {}) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await fetch(url, { ...JSON.parse(optionsKey), signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        setState({ data: await response.json(), loading: false, error: null });
      } catch (error) {
        if (error.name !== "AbortError") {
          setState({ data: null, loading: false, error });
        }
      }
    }

    load();
    return () => controller.abort();
  }, [url, optionsKey]);

  return state;
}