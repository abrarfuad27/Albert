"use client";

import React from "react";
import { AppBar,Toolbar,Typography,Button } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
    return (
      <AppBar position="static" className="bg-blue-600">
        <Toolbar className="flex justify-between">
          <Typography variant="h6" className="text-white">
            Albert
          </Typography>
          <div>
            <Button color="inherit" className="text-white">
              <Link href="/">Home</Link>
            </Button>
            <Button color="inherit" className="text-white">
              <Link href="/about">About</Link>
            </Button>
            <Button color="inherit" className="text-white">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    );
  }