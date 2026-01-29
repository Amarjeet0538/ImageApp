import { useEffect } from "react";

export default function useSpaceKey(callback) {
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === " " || event.code === "Space") {
				event.preventDefault();
				callback();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [callback]);
}
