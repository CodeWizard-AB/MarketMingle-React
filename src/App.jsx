import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
	return (
		<div>
			<NavBar />
			<main className="mx-auto max-w-screen-xl">
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default App;
