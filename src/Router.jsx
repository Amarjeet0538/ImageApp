import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import CameraPage from "./components/Pages/CameraPage";
import ImageViewer from "./components/Pages/ImageViewer";

const AppRouter = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/camera",
		element: <CameraPage />,
	},
	{
		path: "/image-viewer",
		element: <ImageViewer />,
	},
]);

export default AppRouter;
