/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { jobDetials } from "../constant";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

export default function Modal({ open, setOpen, id, setUserJobs }) {
	const [updateData, setUpdateData] = useState({});

	useEffect(() => {
		id &&
			axios
				.get(`${import.meta.env.VITE_APP_URL}/market-jobs/${id}`)
				.then(({ data }) => setUpdateData(data));
	}, [id]);

	const handleClose = () => {
		setOpen(false);
	};

	const handleUpdate = function () {
		axios
			.put(`${import.meta.env.VITE_APP_URL}/market-jobs/${id}`, updateData)
			.then(() => {
				setUserJobs((prevJobs) => [
					...prevJobs.filter((job) => job._id !== id),
					{ _id: id, ...updateData },
				]);
				handleClose();
			});
	};

	return (
		<div>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
				maxWidth="md"
			>
				<DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
					Update Modal
				</DialogTitle>
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
				<DialogContent dividers>
					<div className="my-10 px-6 grid md:place-items-center">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:last:*:col-span-2 md:min-w-[600px]">
							<div className="row-start-3 md:col-start-2">
								<Stack spacing={1}>
									<label htmlFor="category" className="font-medium">
										Category
									</label>
									<Select
										required={true}
										labelId="category"
										id="category"
										value={updateData?.category || ""}
										onChange={(e) =>
											setUpdateData({ ...updateData, category: e.target.value })
										}
									>
										{[
											"Web Development",
											"Graphics Design",
											"Digital Marketing",
										].map((item, i) => (
											<MenuItem value={item} key={i * 88}>
												{item}
											</MenuItem>
										))}
									</Select>
								</Stack>
							</div>
							{jobDetials.map((item, i) => (
								<div
									key={i * 1}
									className={`${item.id === "description" && "md:col-span-2"}`}
								>
									<Stack spacing={1}>
										<label htmlFor={item.id} className="font-medium">
											{item.label}
										</label>
										<TextField
											required={true}
											variant="outlined"
											id={item.id}
											type={item.type}
											multiline={i + 1 === jobDetials.length}
											rows={2}
											value={updateData?.[item.id] || ""}
											onChange={(e) =>
												setUpdateData({
													...updateData,
													[item.id]: e.target.value,
												})
											}
										/>
									</Stack>
								</div>
							))}
						</div>
					</div>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleUpdate}>
						Save changes
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</div>
	);
}
