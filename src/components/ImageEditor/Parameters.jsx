const Parameters = ({
	name,
	value,
	onChange,
	min = 0,
	max = 100,
	step = 1,
}) => {
	return (
		<div className="flex flex-col gap-3 w-full">
			<div className="flex justify-between items-center">
				<label className="text-lg font-semibold text-gray-300">{name}</label>
				<span className="text-md text-white font-bold">
					{Math.round(value)}
				</span>
			</div>
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => onChange(Number(e.target.value))}
				className="w-100 h-10  rounded-lg appearance-none cursor-pointer slider border border-gray-600"
				style={{
					background: `linear-gradient(
          to right,
          #333333 0%,
          #333333 ${((value - min) / (max - min)) * 100}%,
          #000000 ${((value - min) / (max - min)) * 100}%,
          #000000 100%)`,
				}}
			/>
		</div>
	);
};

export default Parameters;
