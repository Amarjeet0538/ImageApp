const Parameters = ({ name, value, onChange, min = 0, max = 200, step = 1 }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-gray-300">{name}</label>
        <span className="text-sm text-blue-400 font-bold">{Math.round(value)}</span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        style={{
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
            ((value - min) / (max - min)) * 100
          }%, #374151 ${((value - min) / (max - min)) * 100}%, #374151 100%)`,
        }}
      />
    </div>
  );
};

export default Parameters;