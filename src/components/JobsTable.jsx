/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import Modal from "./Modal";

function JobsTable({ data }) {
	const [open, setOpen] = useState(false);
	const [jobs, setJobs] = useState(data);
	const [updateId, setUpdateId] = useState(null);

	const handleDelete = function (id) {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.delete(`${import.meta.env.VITE_APP_URL}/market-jobs/${id}`)
					.then(() => {
						setJobs(jobs.filter((job) => job._id !== id));
						Swal.fire({
							title: "Deleted!",
							text: "Your file has been deleted.",
							icon: "success",
						});
					});
			}
		});
	};

	return (
		<section className="container px-4 mx-auto">
			<div className="flex items-center gap-x-3">
				<h2 className="text-lg font-medium text-gray-800 dark:text-white">
					Team jobs
				</h2>

				<span className="px-2 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
					{jobs.length}
				</span>
			</div>

			<div className="flex flex-col mt-6">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead className="bg-gray-50 dark:bg-gray-800">
									<tr>
										<th
											scope="col"
											className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											<div className="flex items-center gap-x-3">
												<span>Title</span>
											</div>
										</th>

										<th
											scope="col"
											className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											<button className="flex items-center gap-x-2">
												<span>Deadline</span>
											</button>
										</th>

										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											<button className="flex items-center gap-x-2">
												<span>Price Range</span>
											</button>
										</th>

										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Description
										</th>

										<th
											scope="col"
											className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Category
										</th>

										<th scope="col" className="relative py-3.5 px-4">
											<span className="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
									{jobs.map((job) => (
										<tr key={job._id}>
											<td className="px-4 py-4 text-sm font-medium text-gray-700 w-min">
												<p className="font-normal text-gray-800 dark:text-white">
													{job.job_title}
												</p>
											</td>
											<td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
												<div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800 font-normal">
													{new Date(job.deadline).toLocaleDateString()}
												</div>
											</td>
											<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
												${job.min_price} - ${job.max_price}
											</td>
											<td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
												{job.description.slice(0, 30)}.....
											</td>
											<td className="px-4 py-4 text-sm whitespace-nowrap">
												<div className="flex items-center gap-x-2">
													<p className="px-3 py-1 text-xs text-indigo-500 rounded-full dark:bg-gray-800 bg-indigo-100/60">
														{job.category}
													</p>
												</div>
											</td>
											<td className="px-4 py-4 text-sm whitespace-nowrap">
												<div className="flex items-center gap-x-6">
													<button
														className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
														onClick={handleDelete.bind(null, job._id)}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth="1.5"
															stroke="currentColor"
															className="w-5 h-5"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
															/>
														</svg>
													</button>

													<button
														className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
														onClick={() => {
															setUpdateId(job._id);
															setOpen(true);
														}}
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth="1.5"
															stroke="currentColor"
															className="w-5 h-5"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
															/>
														</svg>
													</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div className="flex items-center justify-between mt-6">
				<a
					href="#"
					className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-5 h-5 rtl:-scale-x-100"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
						/>
					</svg>

					<span>previous</span>
				</a>

				{/* <div className="items-center hidden lg:flex gap-x-3">
					<a
						href="#"
						className="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60"
					>
						1
					</a>
					<a
						href="#"
						className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						2
					</a>
					<a
						href="#"
						className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						3
					</a>
					<a
						href="#"
						className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						...
					</a>
					<a
						href="#"
						className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						12
					</a>
					<a
						href="#"
						className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						13
					</a>
					<a
						href="#"
						className="px-2 py-1 text-sm text-gray-500 rounded-md dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						14
					</a>
				</div> */}

				<a
					href="#"
					className="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
				>
					<span>Next</span>

					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-5 h-5 rtl:-scale-x-100"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
						/>
					</svg>
				</a>
			</div>
			<Modal open={open} setOpen={setOpen} id={updateId} setUserJobs={setJobs}/>
		</section>
	);
}

export default JobsTable;
