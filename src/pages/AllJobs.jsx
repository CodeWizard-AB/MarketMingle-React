import { useLoaderData } from "react-router-dom";
import JobCard from "../components/JobCard";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import { PaginationItem, Typography } from "@mui/material";
import ButtonContainer from "../components/Button";
import useAxios from "../hooks/useAxios";

const AllJobs = () => {
	const [allJobs, setAllJobs] = useState(useLoaderData());
	const [number, setNumber] = useState();
	const [page, setPage] = useState(1);
	const fetchData = useAxios();

	useEffect(() => {
		fetchData("/market-jobs").then(({ data }) =>
			setNumber(Math.ceil(data.length / 5))
		);
	}, [fetchData]);

	useEffect(() => {
		if (page && number) {
			fetchData(`/all-jobs?page=${page - 1}&number=${number - 1}`).then(
				({ data }) => setAllJobs(data)
			);
		}
	}, [fetchData, number, page]);

	return (
		<div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
			<div>
				<div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
					<div>
						<select
							name="category"
							id="category"
							className="border p-4 rounded-lg"
						>
							<option value="">Filter By Category</option>
							<option value="Web Development">Web Development</option>
							<option value="Graphics Design">Graphics Design</option>
							<option value="Digital Marketing">Digital Marketing</option>
						</select>
					</div>

					<form>
						<div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
							<input
								className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
								type="text"
								name="search"
								placeholder="Enter Job Title"
								aria-label="Enter Job Title"
							/>

							<button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
								Search
							</button>
						</div>
					</form>
					<div>
						<select
							name="category"
							id="category"
							className="border p-4 rounded-md"
						>
							<option value="">Sort By Deadline</option>
							<option value="dsc">Descending Order</option>
							<option value="asc">Ascending Order</option>
						</select>
					</div>
					<ButtonContainer>Reset</ButtonContainer>
				</div>
				<div className="grid grid-cols-1 gap-6 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3">
					{allJobs?.map((job) => (
						<JobCard key={job._id} job={job} />
					))}
				</div>
			</div>

			<div className="flex justify-center mt-12">
				<Pagination
					count={number}
					color="primary"
					page={page}
					onChange={(e, value) => setPage(value)}
					renderItem={(item) => (
						<PaginationItem
							{...item}
							components={{
								previous: () => (
									<Typography
										sx={{
											background: "#1976D2",
											color: "white",
											paddingX: 2,
											paddingY: 1,
											marginLeft: 2,
										}}
									>
										Previous
									</Typography>
								),
								next: () => (
									<Typography
										sx={{
											background: "#1976D2",
											color: "white",
											paddingX: 2,
											paddingY: 1,
											marginLeft: 2,
										}}
									>
										Next
									</Typography>
								),
							}}
						/>
					)}
				/>
			</div>
		</div>
	);
};

export default AllJobs;
