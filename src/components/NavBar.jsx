import { navButtons, navigation } from "../constant";
import { Link } from "react-router-dom";
import DrawerContainer from "./Drawer";
import { useAuth } from "../contexts/AuthContext";
import Account from "./Account";
import ButtonContainer from "./Button";
import Theme from "./Theme";
import Logo from "../assets/Logo.png";

function NavBar() {
	const { user } = useAuth();

	return (
		<nav
			className={`flex px-4 lg:px-40 m-auto py-4 shadow-md font-medium text-lg items-center justify-between w-full`}
		>
			<h3 className="font-bold text-2xl flex-1 md:flex-none ml-2 md:m-0">
				<Link to="/">
					<img src={Logo} alt="website logo" className="w-60" />
				</Link>
			</h3>
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
