import React from 'react';

const CurvedNav = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Curved background effect */}
      <div className="absolute inset-x-0 top-0 h-full rounded-full opacity-25 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-color-1/25 via-color-2/25 to-color-3/25 blur-sm"></div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[70%] bg-n-8/50 blur-3xl rounded-full opacity-15"></div>
      
      {/* Border highlight */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-n-1/0 via-n-1/30 to-n-1/0"></div>
    </div>
  );
};

export default CurvedNav;