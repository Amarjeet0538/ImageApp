import Parameters from "./Parameters";
import { useState, useRef, useEffect } from "react";
import { useImageContext } from "../../context/ImageContext";
import { RotateCcw, Download } from "lucide-react";
import { Check } from "lucide-react";

const ImageEditor = () => {
	const [brightness, setBrightness] = useState(0);
	const [contrast, setContrast] = useState(0);
	const [saturation, setSaturation] = useState(0);
	const [noise, setNoise] = useState(0);
	const [blur, setBlur] = useState(0);

	const { currentImage, getCurrentImage, updateEditedImage } =useImageContext();


  useEffect(() => {
    
  }, [brightness, contrast, saturation, noise, blur, currentImage, getCurrentImage]);


	const handleApply = () => {
		const canvas = document.querySelector("canvas:not(.hidden)");
		if (!canvas) return;

		const editedImageUrl = canvas.toDataURL("image/png");
		updateEditedImage(editedImageUrl);
	};

	const handleDownload = () => {
		const canvas = document.querySelector("canvas:not(.hidden)");
		if (!canvas) return;
		const link = document.createElement("a");
		link.download = `edited-image-${Date.now()}.png`;
		link.href = canvas.toDataURL();
		link.click();
	};

	const handleReset = () => {
		setBrightness(0);
		setContrast(0);
		setSaturation(0);
		setNoise(0);
		setBlur(0);
	};

	return (
		<div className="flex flex-col h-full bg-[#202020] text-white border-l border-gray-700">
			<div className="flex flex-col flex-1 gap-7 pt-10 p-4 w-full bg-[#202020]  text-white overflow-y-auto">
				<Parameters
					name="Brightness"
					value={brightness}
					onChange={setBrightness}
					min={-100}
					max={100}
				/>

				<Parameters
					name="Contrast"
					value={contrast}
					onChange={setContrast}
					min={-100}
					max={100}
				/>

				<Parameters
					name="Saturation"
					value={saturation}
					onChange={setSaturation}
					min={-100}
					max={100}
				/>

				<Parameters
					name="Noise"
					value={noise}
					onChange={setNoise}
					min={0}
					max={100}
				/>

				<Parameters
					name="Blur"
					value={blur}
					onChange={setBlur}
					min={0}
					max={100}
				/>
			</div>

			<div className="flex gap-2 p-4 border-t border-gray-700 bg-[#1a1a1a] ">
				<button
					onClick={handleApply}
					className="flex-1 flex items-center justify-center gap-2  px-4 py-3 bg-black text-white rounded-lg hover:bg-green-900 transition font-semibold"
				>
					<Check size={18} />
				</button>
				<button
					onClick={handleDownload}
					className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-blue-900 transition font-semibold"
				>
					<Download size={18} />
				</button>

				<button
					onClick={handleReset}
					className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-700 transition font-semibold"
				>
					<RotateCcw size={18} />
				</button>
			</div>
		</div>
	);
};

export default ImageEditor;
