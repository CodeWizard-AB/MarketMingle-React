import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./routes/Route";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</AuthProvider>
	</React.StrictMode>
);
