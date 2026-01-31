import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./Router.jsx";
import { RouterProvider } from "react-router-dom";
import {ImageProvider}  from "./context/ImageContext.jsx";

createRoot(document.getElementById("root")).render(
	<ImageProvider>
		<StrictMode>
			<RouterProvider router={AppRouter} />
		</StrictMode>
	</ImageProvider>,
);
