import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import useEscapeKey from "../../hooks/useEscapeKey.jsx";

function ImageViewer() {
	const location = useLocation();
	const navigate = useNavigate();
	const { image } = location.state || {};
		useEscapeKey(() => navigate("/"));

		if (!image) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				No image selected
			</div>
		);
	}

	return (
		<div className="relative flex flex-col items-center justify-center min-h-screen bg-black gap-4">
			<button
				onClick={() => navigate("/")}
        className="absolute top-5 left-5 text-white rounded-lg bg-gray-800 p-3 hover:bg-gray-700 hover:text-red-400 transition z-10"
			>
				<ArrowLeft />
			</button>
			<img src={image} alt="Uploaded" className=" rounded-lg object-cover w-full max-w-6xl " />

		</div>
	);
}

export default ImageViewer;