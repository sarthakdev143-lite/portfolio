import About from "@/components/About";
import Landing from "@/components/Landing";

export default function Home() {
  return (
    <>
      <Landing />
      <About />
      <div className="w-full h-[100rem] bg-red-900"></div>
    </>
  );
}
