import { useNavigate } from "react-router-dom";
import { ArrowLeft, RotateCcw, Check } from "lucide-react";
import useEscapeKey from "../../hooks/useEscapeKey.jsx";
import useSpace from "../../hooks/useSpaceKey.jsx";
import { useEffect, useRef, useState } from "react";
import { useImageContext } from "../../context/ImageContext";

function CameraPage() {
	const [photo, setPhoto] = useState(null);
	const [stream, setStream] = useState(null);
	const navigate = useNavigate();
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const { addImage } = useImageContext();

	useEscapeKey(() => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
		}
		navigate("/");
	});

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
		}
	};

	useEffect(() => {
		let isMounted = true;

		const startCamera = async () => {
			try {
				const mediaStream = await navigator.mediaDevices.getUserMedia({
					video: {
						facingMode: "user",
						width: { ideal: 1920 },
						height: { ideal: 1080 },
					},
				});
				if (isMounted && videoRef.current) {
					videoRef.current.srcObject = mediaStream;
					setStream(mediaStream);
				}
			} catch (error) {
				console.error("Error accessing camera:", error);
			}
		};
		startCamera();

		return () => {
			isMounted = false;
			if (stream) {
				stream.getTracks().forEach((track) => track.stop());
			}
		};
	}, []);

	const handleRetake = () => {
		setPhoto(null);
	};

	const handleViewPhoto = () => {
		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
		}
		addImage(photo);
		navigate("/image-viewer");
	};

	return (
		<div className="relative flex flex-col items-center justify-between min-h-screen">
			<button
				onClick={() => {
					if (stream) {
						stream.getTracks().forEach((track) => track.stop());
					}
					navigate("/");
				}}
				className="absolute top-10 left-10 text-white rounded-lg bg-gray-800 p-3 hover:text-red-400 z-10"
			>
				<ArrowLeft />
			</button>

			{!photo ? (
				 <div className="relative w-full h-screen flex items-center justify-center px-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover rounded-lg"
          />
					<button
						className="absolute bottom-15 left-1/2 transform -translate-x-1/2 bg-red-600 border-5 border-red-100 text-white px-8 py-8 rounded-full hover:bg-red-700"
						onClick={handleCameraCapture}
					></button>
					<canvas ref={canvasRef} className="hidden" />
				</div>
			) : (
				<div className="flex flex-col items-center justify-center gap-6 w-full h-screen">
					<img
						src={photo}
						alt="Captured"
						className="rounded-lg  object-cover"
					/>
					<div className="flex gap-4">
						<button
							onClick={handleRetake}
							className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
						>
							<RotateCcw color="#ffffff" />
						</button>
						<button
							onClick={handleViewPhoto}
							className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
						>
							<Check color="#ffffff" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default CameraPage;
