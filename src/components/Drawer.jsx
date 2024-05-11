import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";
import { useState } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { navButtons } from "../constant";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ButtonContainer from "./Button";

function DrawerContainer() {
	const { user, theme } = useAuth();
	const [isOpen, setIsOpen] = useState(false);
	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	return (
		<div className={`lg:hidden block ${user && "order-first"}`}>
			<Hamburger
				toggled={isOpen}
				size={26}
				toggle={setIsOpen}
				color={theme === "light" ? "#000" : "#fff"}
			/>
			<Drawer
				open={isOpen}
				onClose={toggleDrawer}
				direction={user ? "left" : "right"}
				style={{
					padding: "30px",
					bottom: "0",
					width: "100%",
					marginTop: "96px",
					boxShadow: "none",
					background: `${theme === "black" ? "black" : "white"}`,
				}}
				enableOverlay={false}
			>
				{/* <ul className="text-center space-y-4">
					{navigation.map((item, i) => (
						<li key={i * 9} onClick={toggleDrawer}>
							<Link to={item.link}>{item.title}</Link>
						</li>
					))}
				</ul> */}

				<div className="text-center space-x-4 mt-4">
					{!user &&
						navButtons.map((btn, i) => (
							<ButtonContainer
								variant={i === 0 && "outlined"}
								key={i * 12}
								event={toggleDrawer}
							>
								<Link to={btn.link}>{btn.title}</Link>
							</ButtonContainer>
						))}
				</div>
			</Drawer>
		</div>
	);
}

export default DrawerContainer;
