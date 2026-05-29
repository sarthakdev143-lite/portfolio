export default function HUD() {
  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-start gap-4 px-5 sm:px-6 md:px-12 pt-5 md:pt-8 z-50 pointer-events-none mix-blend-difference text-[#f3f3f3] uppercase font-mono text-[8px] sm:text-[10px] md:text-xs tracking-widest">
      <div className="flex items-center gap-4 min-w-0">
        <span>Sarthak Parulekar © {new Date().getFullYear()}</span>
      </div>
      <div className="hidden sm:block text-right">
        <span>CREATIVE ENGINEER | 18Y/o</span>
      </div>
    </div>
  );
}
