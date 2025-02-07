"use client"

import About from "@/components/About";
import ChatBot from "@/components/ChatBot";
import Landing from "@/components/Landing";
import Skills from "@/components/Skills";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    alert("This Project is still under development. Some features may not work as expected. If You are still interested in exploring the project, please visit `https://sarthakdev-ruined.vercel.app`");
  }, []);

  return (
    <>
      <ChatBot />
      <Landing />
      <About />
      <Skills />
    </>
  );
}
