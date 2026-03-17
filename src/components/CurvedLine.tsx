const CurvedLine = () => {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 1000 100" 
      preserveAspectRatio="none"
      className="block"
    >
      <defs>
        <linearGradient id="opacityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#df0505" stopOpacity="0" />
          <stop offset="50%" stopColor="#df0505" stopOpacity="1" />
          <stop offset="100%" stopColor="#df0505" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* Curved red line on top */}
      <path
        d="
          M 0,100 
          C 200,100 300,25 500,25
          C 700,25 800,100 1000,100
          L 1000,70
          C 800,91 700,0 500,0
          C 300,0 200,91 0,70
          Z
        "
        fill="url(#opacityGradient)"
      />
      
      {/* Black fill below the curved line */}
      <path
        d="
          M 0,100 
          C 200,100 300,25 500,25
          C 700,25 800,100 1000,100
          L 1000,100
          L 0,100
          Z
        "
        fill="#141414"
      />
    </svg>
  );
};

export default CurvedLine;
