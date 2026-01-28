import { Upload } from "lucide-react";
import { Camera } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function App() {
	const [image, setImage] = useState(null);
	const navigate = useNavigate();

	const handleImageUpload = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setImage(event.target.result);
				navigate("/image-viewer", { state: { image: event.target.result } });
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen gap-5">
			<button className="w-50 h-50 rounded-lg bg-[#202020] flex flex-col justify-center items-center cursor-pointer relative hover:bg-[#191919] transition">
				<Upload size={50} className="m-2" />
				<span className="text-xl">Upload</span>
				<input
					type="file"
					accept="image/*"
					onChange={handleImageUpload}
					className="absolute w-50 h-50 opacity-0 cursor-pointer"
				/>
			</button>

			<Link to="/camera">
				<button className="w-50 h-50 rounded-lg bg-[#202020] flex flex-col justify-center items-center cursor-pointer hover:bg-[#191919] transition">
					<Camera size={50} className="m-2" />
					<span className="text-xl">Camera</span>
				</button>
			</Link>
		</div>
	);
}

export default App;
