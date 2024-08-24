"use client";

import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  return (
    <AppBar position="static" className="bg-[#00509e]"> {/* Darker blue */}
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="text-white">
          Albert
        </Typography>
        <div>
          <Button color="inherit" className="text-white">
            <Link href="/">Home</Link>
          </Button>
          <Button color="inherit" className="text-white">
            <Link href="/login">Sign In</Link>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
