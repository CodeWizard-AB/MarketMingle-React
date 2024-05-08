import { navButtons, navigation } from "../constant";
import { Link, useLocation } from "react-router-dom";
import DrawerContainer from "./Drawer";
import { useAuth } from "../contexts/AuthContext";
import Account from "./Account";
import ButtonContainer from "./Button";
import Theme from "./Theme";
import Logo from "../assets/Logo.png";

function NavBar() {
	const { user } = useAuth();
	const location = useLocation();

	return (
		<nav
			className={`flex px-4 lg:px-28 py-5 ${
				location.pathname !== "/" && "border-b shadow-sm"
			} font-medium text-lg items-center justify-between w-full`}
		>
			<Link to="/">
				<img src={Logo} alt="website logo" className="w-60" />
			</Link>
			<ul className="hidden lg:flex lg:gap-8">
				{navigation.map((item, i) => (
					<li key={i}>
						<Link to={item.link}>{item.title}</Link>
					</li>
				))}
			</ul>
			<div className="flex items-center gap-4">
				{user ? (
					<Account />
				) : (
					navButtons.map((btn, i) => (
						<Link to={btn.link} key={i * 10} className="hidden lg:block">
							<ButtonContainer variant={i === 0 && "outlined"}>
								{btn.title}
							</ButtonContainer>
						</Link>
					))
				)}
				<Theme />
			</div>
			<DrawerContainer />
		</nav>
	);
}

export default NavBar;
