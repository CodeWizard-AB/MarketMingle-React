import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";

export default function Account() {
	const { user, logOut } = useAuth();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		user && (
			<>
				<Box
					sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
				>
					<Tooltip title="Account settings">
						<IconButton
							onClick={handleClick}
							size="small"
							sx={{ ml: 2 }}
							aria-controls={open ? "account-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
						>
							{user?.photoURL ? (
								<Avatar
									sx={{ width: 50, height: 50 }}
									src={user.photoURL}
									alt={user.displayName}
								/>
							) : (
								<Avatar sx={{ width: 32, height: 32 }}>
									{user?.displayName[0]}
								</Avatar>
							)}
						</IconButton>
					</Tooltip>
				</Box>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							minWidth: 200,
							overflow: "visible",
							filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
							mt: 1.5,
							"& .MuiAvatar-root": {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
							},
							"&::before": {
								content: '""',
								display: "block",
								position: "absolute",
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: "background.paper",
								transform: "translateY(-50%) rotate(45deg)",
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{ horizontal: "right", vertical: "top" }}
					anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
				>
					<MenuItem onClick={handleClose}>
						<Avatar src={user?.photoURL} /> {user?.displayName}
					</MenuItem>
					<Divider />
					<Link to={`post-job/${user?.email}`}>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<AddCircleOutlineOutlinedIcon />
							</ListItemIcon>
							Post A Job
						</MenuItem>
					</Link>
					<Link to={`/posted-jobs/${user?.email}`}>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<WorkHistoryOutlinedIcon />
							</ListItemIcon>
							My Posted Jobs
						</MenuItem>
					</Link>
					<Link to={`/job-bids/${user?.email}`}>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<CurrencyBitcoinOutlinedIcon />
							</ListItemIcon>
							My Bids
						</MenuItem>
					</Link>
					<Link to={`/bid-request/${user?.email}`}>
						<MenuItem onClick={handleClose}>
							<ListItemIcon>
								<RequestPageOutlinedIcon />
							</ListItemIcon>
							Bid Requests
						</MenuItem>
					</Link>
					<MenuItem
						onClick={() => {
							logOut();
							handleClose();
						}}
					>
						<ListItemIcon>
							<Logout />
						</ListItemIcon>
						Logout
					</MenuItem>
				</Menu>
			</>
		)
	);
}
