import { useNavigate } from "react-router-dom";
import { ArrowLeft, Pencil} from "lucide-react";
import useEscapeKey from "../../hooks/useEscapeKey.jsx";
import { useState } from "react";
import { useImageContext } from "../../context/ImageContext";
import ImageEditor from "../ImageEditor/ImageEditor.jsx";
import CanvasImageViewer from "./CanvasImageViewer.jsx";
import { useEffect } from "react";

function ImageViewer() {
	const navigate = useNavigate();
  const { currentImage } = useImageContext();
	const [openEditor, setOpenEditor] = useState(false);

	useEscapeKey(() => navigate("/"));

	if (!currentImage) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				No image selected
			</div>
		);
	}

	return (
		<div className="relative flex flex-col min-h-screen bg-black gap-4">
			<button
				onClick={() => navigate("/")}
				className="absolute top-5 left-5  rounded-lg bg-[#202020]  p-3 hover:bg-gray-700 hover:text-red-400 transition z-10"
			>
				<ArrowLeft />
			</button>

			<button
				onClick={() => setOpenEditor(!openEditor)}
				className={`absolute top-5 right-5 text-white rounded-lg bg-[#202020]  p-3 hover:bg-gray-700 hover:text-red-400 transition z-10 ${openEditor ? "right-115" : ""}`}
			>
				<Pencil />
			</button>

      <div className="flex flex-1 gap-6 min-h-0 ">
        <div className="flex-1 min-h-0 flex flex-col">
          <CanvasImageViewer />
        </div>



        {openEditor && (
          <div >
            <ImageEditor  />
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageViewer;