const AnilloProgreso = ({ porcentaje, colorClase, bgPunto, label }) => {
  // Cálculos matemáticos para dibujar el anillo SVG
  const radio = 36;
  const circunferencia = 2 * Math.PI * radio;
  const offset = circunferencia - (porcentaje / 100) * circunferencia;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          {/* Anillo de fondo oscuro */}
          <circle 
            cx="50%" cy="50%" r={radio} 
            stroke="currentColor" strokeWidth="8" fill="transparent" 
            className="text-slate-800" 
          />
          {/* Anillo de color animado */}
          <circle 
            cx="50%" cy="50%" r={radio} 
            stroke="currentColor" strokeWidth="8" fill="transparent" 
            strokeDasharray={circunferencia} strokeDashoffset={offset} 
            className={`transition-all duration-1000 ease-out ${colorClase}`} 
            strokeLinecap="round" 
          />
        </svg>
        {/* Texto del porcentaje en el centro */}
        <span className="absolute text-sm sm:text-lg font-bold text-white">
          {porcentaje}%
        </span>
      </div>
      {/* Etiqueta inferior con el puntito de color */}
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${bgPunto}`}></span>
        <span className="text-[10px] sm:text-xs text-slate-300 font-medium whitespace-nowrap">
          {label}
        </span>
      </div>
    </div>
  );
};

export default AnilloProgreso;