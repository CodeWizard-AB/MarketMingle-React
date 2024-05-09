import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<div>
			<Toaster />
			<NavBar />
			<main className="mx-auto max-w-screen-xl">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default App;
