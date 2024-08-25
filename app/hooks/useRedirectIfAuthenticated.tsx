"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const useRedirectIfAuthenticated = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/"); // Redirect to home if authenticated
      }
    });

    return () => unsubscribe();
  }, [router]);
};

export default useRedirectIfAuthenticated;
