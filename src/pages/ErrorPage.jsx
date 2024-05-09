import error from "../assets/Frame.png";
import { Link } from "react-router-dom";
import ButtonContainer from "../components/Button";

function ErrorPage() {
	return (
		<div className="grid place-items-center h-screen">
			<figure className="flex flex-col items-center gap-10">
				<img src={error} alt="error page image" />
				<Link to="/">
					<ButtonContainer>Go to Home page</ButtonContainer>
				</Link>
			</figure>
		</div>
	);
}

export default ErrorPage;
