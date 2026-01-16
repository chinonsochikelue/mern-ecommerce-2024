import { Scissors } from "lucide-react";

function Logo({ className = "" }) {
  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      <div className="relative flex items-center justify-center w-10 h-10 bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 group-hover:bg-yellow-600 shadow-lg">
        <Scissors className="w-6 h-6 text-yellow-500 transition-colors duration-300 group-hover:text-white" />
        <div className="absolute inset-x-0 bottom-0 h-1 bg-yellow-500 opacity-50" />
      </div>
      <div className="flex flex-col leading-none">
        <span className="text-2xl font-bold tracking-tighter text-gray-900" style={{ fontFamily: 'Georgia, serif' }}>
          BESPOKE
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-yellow-700 font-bold">
          Master Tailors
        </span>
      </div>
    </div>
  );
}

export default Logo;
