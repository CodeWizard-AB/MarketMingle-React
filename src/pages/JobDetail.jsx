import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { formLabel } from "../constant";
import Stack from "@mui/material/Stack";
import ButtonContainer from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

function JobDetail() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({ email: user?.email });
	const {
		job_title,
		category,
		deadline,
		description,
		buyer_email,
		min_price,
		max_price,
		buyer_name,
		_id: job_id,
	} = useLoaderData();

	const handleSubmit = async function (e) {
		e.preventDefault();

		if (formData?.price < min_price)
			return toast.error(
				"Offer should more or at least equal to minimum price"
			);
		if (formData?.email === buyer_email)
			return toast.error("Buyer email and freelancer email should be not same");

		try {
			await axios.post(`${import.meta.env.VITE_APP_URL}/market-bids`, {
				...formData,
				deadline: new Date(formData?.deadline),
				buyer_email,
				buyer_name,
				category,
				job_title,
				job_id,
				status: "pending",
			});
			await Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Your bid has been submited",
				showConfirmButton: false,
				timer: 1500,
			});
			setFormData({ email: user?.email });
			navigate(`/job-bids/${user?.email}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="my-20">
			<p className="px-3 w-max mx-auto py-1 text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
				{category}
			</p>
			<div className="grid mt-6 grid-cols-2 gap-10">
				<div className="space-y-2">
					<p>Deadline: {new Date(deadline).toLocaleDateString()}</p>
					<p className="font-bold text-3xl">{job_title}</p>
					<p className="text-lg">{description}</p>
					<p className="text-xl font-semibold pt-3">Buyer Details:</p>
					<p>
						<span className="font-medium">Name:</span> {buyer_name}
					</p>
					<p>
						<span className="font-medium">Email:</span> {buyer_email}
					</p>
					<p className="pt-5 font-medium text-lg">
						Range: ${min_price} - ${max_price}
					</p>
				</div>
				<form
					className="grid grid-cols-2 first:*:col-span-2 items-center gap-x-6 gap-y-4"
					onSubmit={handleSubmit}
				>
					<h2 className="font-bold text-2xl">Place A Bid</h2>
					{formLabel.map((item, i) => (
						<Stack key={i * 23} spacing={1}>
							<label htmlFor={item.title} className="font-medium">
								{item.title}
							</label>
							<TextField
								key={i * 23}
								id={item.title}
								type={item.type}
								placeholder={item.holder}
								value={formData?.[item.id] || ""}
								onChange={(e) =>
									setFormData({ ...formData, [item.id]: e.target.value })
								}
								required={true}
							/>
						</Stack>
					))}
					<div className="col-span-2 justify-self-end mt-4">
						<ButtonContainer>Place Bid</ButtonContainer>
					</div>
				</form>
			</div>
		</div>
	);
}

export default JobDetail;
