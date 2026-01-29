import { useEffect } from "react";

export  default function useEscapeKey(callback) {
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === "Escape") {

				callback();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [callback]);
}
