"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/infrastructure/database/supabase/client";

const AuthCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error);
        router.push("/login");
      } else {
        router.push("/dashboard");
      }
    };

    handleAuthCallback();
  }, [router]);

  return <div>Loading...</div>;
};

export default AuthCallback;
