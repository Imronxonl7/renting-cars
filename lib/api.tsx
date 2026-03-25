"use client"

import { useEffect, useState } from "react";

type UseApiParams = {
  url: string;
};

const SUPABASE_URL = "https://ikpfkhvdwjrblaiyniru.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_SbG03902HzuTqSDtUIqsQQ_PE0BqWfA";

const useApi = <T,>({ url }: UseApiParams) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${url}?select=*`, {
          headers: {
            apikey: SUPABASE_PUBLISHABLE_KEY,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Supabase API bilan bog'lanishda xatolik: ${res.status}`);
        }

        const result = (await res.json()) as T[];
        setData(result);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Noma'lum xatolik yuz berdi";

        setError(message);
        setData([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useApi;
