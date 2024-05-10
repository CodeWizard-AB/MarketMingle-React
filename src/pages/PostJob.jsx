import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { jobDetials } from "../constant";
import { useState } from "react";
import axios from "axios";
import ButtonContainer from "../components/Button";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

function PostJob() {
	const { user } = useAuth();
	const [postData, setPostData] = useState({ buyer_email: user?.email });
	const handleJobPost = function (e) {
		e.preventDefault();
		axios
			.post(`${import.meta.env.VITE_APP_URL}/market-jobs`, {
				...postData,
				buyer_name: user?.displayName,
				buyer_email: user?.email,
			})
			.then(() => toast.success("Your job has been posted"));
	};

	return (
		<div className="my-10 px-6 md:px-0 grid md:place-items-center">
			<h1 className="font-bold text-3xl mb-10">Post Your Job</h1>
			<form
				className="grid grid-cols-1 md:grid-cols-2 gap-6 md:last:*:col-span-2 md:min-w-[600px] last:*:justify-self-end"
				onSubmit={handleJobPost}
			>
				<div className="row-start-3 md:col-start-2">
					<Stack spacing={1}>
						<label htmlFor="category" className="font-medium">
							Category
						</label>
						<Select
							required={true}
							labelId="category"
							id="category"
							value={postData?.category || ""}
							onChange={(e) =>
								setPostData({ ...postData, category: e.target.value })
							}
						>
							{["Web Development", "Graphics Design", "Digital Marketing"].map(
								(item, i) => (
									<MenuItem value={item} key={i * 88}>
										{item}
									</MenuItem>
								)
							)}
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
								value={postData?.[item.id] || ""}
								onChange={(e) =>
									setPostData({ ...postData, [item.id]: e.target.value })
								}
							/>
						</Stack>
					</div>
				))}
				<ButtonContainer>Post</ButtonContainer>
			</form>
		</div>
	);
}

export default PostJob;
