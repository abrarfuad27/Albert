
"use client";

import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect to the homepage after successful login
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // Redirect to the homepage after successful login
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: "16px", backgroundColor: "#4285F4" }} // Blue button for email
          >
            Sign in with Email
          </Button>
        </form>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          style={{ marginTop: "16px", backgroundColor: "#DB4437" }} // Red button for Google
          onClick={handleGoogleLogin}
        >
          Sign in with Google
        </Button>
        <Typography variant="body2" style={{ marginTop: "16px" }}>
          Don’t have an account?{" "}
          <Link href="/register" passHref>
            <Button variant="text" color="primary">
              Create Account
            </Button>
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
