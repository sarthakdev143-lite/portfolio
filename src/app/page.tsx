"use client"

import About from "@/components/About";
import ChatBot from "@/components/ChatBot";
import Landing from "@/components/Landing";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <>
      <ChatBot />
      <Landing />
      <About />
      <Skills />
      <Projects />
      <div id="space" className="w-full h-40"></div>
    </>
  );
}
