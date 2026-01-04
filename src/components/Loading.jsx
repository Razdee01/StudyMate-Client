import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100/50 backdrop-blur-sm fixed inset-0 z-50">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute animate-ping h-20 w-20 rounded-full bg-primary/20"></div>

        {/* Inner Spinning Ring */}
        <div className="h-16 w-16 border-4 border-t-primary border-r-transparent border-b-primary/30 border-l-transparent rounded-full animate-spin"></div>

        {/* Center Dot */}
        <div className="absolute h-4 w-4 bg-primary rounded-full animate-pulse"></div>
      </div>

      <div className="mt-8 flex flex-col items-center">
        <h2 className="text-xl font-black tracking-widest text-primary animate-pulse">
          STUDYMATE.
        </h2>
        <div className="flex gap-1 mt-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_1s_infinite_100ms]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_1s_infinite_200ms]"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-[bounce_1s_infinite_300ms]"></span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
