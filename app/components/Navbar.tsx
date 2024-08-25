"use client";

import React, { useState, useEffect } from "react";
import { auth } from "../config/firebaseConfig";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login"); // redirect to login page after signing out
  };

  return (
    <AppBar position="static" className="bg-[#00509e]">
      {" "}
      {/* Darker blue */}
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="text-white">
          Albert
        </Typography>
        <div>
          <Button color="inherit" className="text-white">
            <Link href="/">Home</Link>
          </Button>
          {user ? (
            <Button
              color="inherit"
              className="text-white"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          ) : (
            <Button color="inherit" className="text-white">
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
