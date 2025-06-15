import React from "react";
import RotatingText from "@/app/themes/rotatingtext.jsx";
// import Threads from "@/app/themes/threads";

function Window() {
  return (
    <div className="relative w-full mt-16 flex items-center justify-center py-15 px-6 overflow-hidden">

      {/* Foreground block */}
      <div className="rounded-2xl bg-transparent flex items-center justify-center gap-4 shadow-2xl max-w-2xl w-full">
        {/* Title */}
        <h1 className="text-white text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 rounded-xl">
          SensAI Creative
        </h1>

        {/* Rotating Text */}
        <RotatingText
          texts={["Coding", "Thinking", "Components!", "Development!"]}
          mainClassName="text-base sm:text-lg font-semibold text-cyan-300 px-4 py-2 bg-cyan-500/10 rounded-lg shadow-inner tracking-wide"
          staggerFrom="last"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          staggerDuration={0.03}
          splitLevelClassName="overflow-hidden"
          transition={{
            type: "spring",
            damping: 20,
            stiffness: 300,
          }}
          rotationInterval={2000}
        />
      </div>
    </div>
  );
}

export default Window;
