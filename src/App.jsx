import { Upload } from "lucide-react";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useImageContext } from "./context/ImageContext.jsx";

function App() {
	const navigate = useNavigate();
	const { addImage } = useImageContext();

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				addImage(event.target.result);
				navigate("/image-viewer", { state: { image: event.target.result } });
			};
			reader.readAsDataURL(file);
		}
	};

	const handleCameraCapture = () => {
		navigate("/camera");
	};

	return (
		<div className="flex items-center justify-center min-h-screen gap-5  font-sn">
			<button className="w-120 h-80 rounded-lg bg-[#202020] hover:bg-[#191919] transition flex justify-center items-center ">
				<div className="w-110 h-70 rounded-lg border-2 border-dashed border-gray-600 flex flex-col justify-center items-center cursor-pointer relative ">
					<h1 className="text-2xl font-bold mb-4 w-3/4">
						Drag and Drop an Image
						<span className="text-blue-400"> or Browse to Upload</span>
					</h1>

					<Upload size={50} className="m-2" />

					<span className="text-xl font-semibold">Upload</span>
					<input
						type="file"
						accept="image/*"
						onChange={handleImageUpload}
						className="absolute w-50 h-50 opacity-0 cursor-pointer"
					/>
				</div>
			</button>

			<button
				className="w-80 h-80 rounded-lg bg-[#202020] flex flex-col justify-center items-center cursor-pointer hover:bg-[#191919] transition"
				onClick={handleCameraCapture}
			>
				<Camera size={50} className="m-2" />
				<span className="text-xl">Camera</span>
			</button>
		</div>
	);
}

export default App;
