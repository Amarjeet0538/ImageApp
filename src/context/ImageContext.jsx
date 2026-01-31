import { createContext, useState } from "react";
import { useContext } from "react";


const ImageContext = createContext();

export  const  ImageProvider = ({ children }) => {
	const [images, setImages] = useState([]);
	const [currentImage, setCurrentImage] = useState(null);
	const [editedImage, setEditedImage] = useState(null);

	const addImage = (imageData) => {
		const newImage = {
			id: Date.now(),
			original: imageData,
			edited: null,
			timestamp: new Date(),
		};
		setImages([newImage, ...images]);
		setCurrentImage(newImage);
		return newImage;
	};

	// Update edited image
	const updateEditedImage = (imageData) => {
		if (currentImage) {
			const updated = { ...currentImage, edited: imageData };
			setCurrentImage(updated);
			setImages(
				images.map((img) => (img.id === currentImage.id ? updated : img)),
			);
		}
	};

	// Get current image
	const getCurrentImage = () => {
		return currentImage?.edited || currentImage?.original;
	};

	// Delete image
	const deleteImage = (id) => {
		setImages(images.filter((img) => img.id !== id));
		if (currentImage?.id === id) {
			setCurrentImage(images[0] || null);
		}
	};

	// Clear all images
	const clearAll = () => {
		setImages([]);
		setCurrentImage(null);
	};

	// Get all images
	const getAllImages = () => images;

	const value = {
		images,
		currentImage,
		addImage,
		updateEditedImage,
		getCurrentImage,
		deleteImage,
		clearAll,
		getAllImages,
		setCurrentImage,
	};

	return (
		<ImageContext.Provider value={value}>{children}</ImageContext.Provider>
	);
};


export const useImageContext = () => {
	const context = useContext(ImageContext);
	if (!context) {
		throw new Error("useImageContext must be used within ImageProvider");
	}
	return context;
};
