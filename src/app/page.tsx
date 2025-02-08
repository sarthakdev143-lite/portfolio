"use client"

import About from "@/components/About";
import ChatBot from "@/components/ChatBot";
import Landing from "@/components/Landing";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <ChatBot />
      {/* <Landing /> */}
      <About />
      <Skills />
    </>
  );
}
