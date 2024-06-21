import { create } from "zustand";
import axios from "axios";
import { useEffect, useState } from "react";
import { user } from "@/lib/types";

const endPoint = process.env.NEXT_PUBLIC_API + '/users/admin'

const useUpdateUser = create<{ reload: boolean; reloadUser: () => void }>(
  (set) => ({
    reload: false,
    reloadUser: () => set((state) => ({ reload: !state.reload })),
  })
);

export function useUser() {
  const { reload, reloadUser } = useUpdateUser();
  const [user, setUser] = useState<user | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userToken = sessionStorage.getItem("ms_admin_user_token");
        if (!userToken) {
          setUser(null);
          setError("User token not found.");
          return;
        }
        const res = await axios.get(endPoint + '?user_token=' + userToken);
        setUser(res.data);
      } catch (err) {
        setError("Unknown error occurred.");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    if (typeof window !== "undefined") {
      fetchUser();
    }
  }, [reload]);

  return { user, loading, error, reloadUser };
}