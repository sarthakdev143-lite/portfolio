import About from "@/components/About";
import Landing from "@/components/Landing";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    alert("This Project is still under development. Some features may not work as expected. If You are still interested in exploring the project, please visit `https://sarthakdev-ruined.vercel.app`");
  }, []);

  return (
    <>
      <Landing />
      <About />
    </>
  );
}
