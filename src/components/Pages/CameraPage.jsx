import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function CameraPage() {
	const navigate = useNavigate();
	const handleCameraCapture = (capturedImage) => {};

	return (
		<div className="flex flex-col items-center justify-between p-5 min-h-screen">
			<button
				onClick={() => navigate("/")}
				className="absolute top-5 left-5 text-white rounded-lg bg-gray-800 p-3 hover:text-red-400"
			>
				<ArrowLeft />
			</button>
			<div className="mt-5">
				{/* WebCam interface */}
				<p>This is where the camera functionality would be implemented.</p>
			</div>
			<div className="mb-5">
				<button
					className="bg-red-600 border-5 border-red-100 text-white px-8 py-8 rounded-full hover:bg-red-700"
					onClick={handleCameraCapture}
				></button>
			</div>
		</div>
	);
}

export default CameraPage;
