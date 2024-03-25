import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/LandingPage.tsx";
import UserProfilePage from "./pages/UserProfilePage.tsx";
import { UserContextProvider } from "./context/UserContext.tsx";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "/user-profile",
		element: <UserProfilePage />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<UserContextProvider>
			<Toaster position="top-right" />
			<RouterProvider router={router} />
		</UserContextProvider>
	</React.StrictMode>
);
