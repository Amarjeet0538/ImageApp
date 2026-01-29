import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useEscapeKey from "../../hooks/useEscapeKey.jsx";
import useSpace from "../../hooks/useSpaceKey.jsx";
import { useRef, useState } from "react";
import { useEffect } from "react";

function CameraPage() {
	const [photo, setPhoto] = useState(null);
	const navigate = useNavigate();
	const videoRef = useRef(null);
	const canvasRef = useRef(null);

	useEscapeKey(() => navigate("/"));
	useSpace(() => handleCameraCapture());

	const handleCameraCapture = () => {
		const canvas = canvasRef.current;
		const video = videoRef.current;

		if (canvas && video) {
			const context = canvas.getContext("2d");
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			context.drawImage(video, 0, 0);
			const photoData = canvas.toDataURL("image/png");
			setPhoto(photoData);
			console.log("Camera capture triggered");
			navigate("/image-viewer", { state: { image: photoData } });
		}
	};

	useEffect(() => {
		const startCamera = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: { facingMode: "user" },
				});
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			} catch (error) {
				console.error("Error accessing camera:", error);
			}
		};
		startCamera();

		return () => {
			if (videoRef.current && videoRef.current.srcObject) {
				videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
			}
		};
	}, []);

	return (
			<div className="relative flex flex-col items-center justify-between min-h-screen">
			<button
				onClick={() => navigate("/")}
				className="absolute top-10 left-10 text-white rounded-lg bg-gray-800 p-3 hover:text-red-400 z-10"
			>
				<ArrowLeft />
			</button>
			<div className=" relative w-6xl	min-h-screen flex items-center justify-center ">
				<video
					ref={videoRef}
					autoPlay
					playsInline
					className=" rounded-lg bg-gray-500 w-full h-full object-cover"
				/>
				<button
					className="absolute bottom-15 left-1/2 transform -translate-x-1/2 bg-red-600 border-5 border-red-100 text-white px-8 py-8 rounded-full hover:bg-red-700"
					onClick={handleCameraCapture}
				></button>
				<canvas ref={canvasRef} className="hidden" />
			</div>
		</div>
	);
}

export default CameraPage;
