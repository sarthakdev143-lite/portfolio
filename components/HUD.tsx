export default function HUD() {

    return (
        <div className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 pt-8 z-50 pointer-events-none mix-blend-difference text-[#f3f3f3] uppercase font-mono text-[10px] md:text-xs tracking-widest">

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>offline</span>
                </div>
            </div>

        </div>
    );
}