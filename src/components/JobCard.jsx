import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

function JobCard({ job }) {
	const navigate = useNavigate();
	return (
		<div className="max-w-2xl px-8 py-6 bg-white rounded-lg shadow-md dark:bg-gray-800 h-full flex flex-col justify-between border">
			<div className="flex items-center justify-between">
				<span className="text-sm text-gray-600 dark:text-gray-400">
					Deadline: {new Date(job.deadline).toLocaleDateString()}
				</span>
				<span className="px-3 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full dark:bg-blue-300 dark:text-blue-900">
					{job.category}
				</span>
			</div>

			<div className="mt-2">
				<p className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline mt-2">
					{job.job_title}
				</p>
				<p className="mt-2 text-gray-600 dark:text-gray-300">
					{job.description}
				</p>
			</div>

			<div className="flex items-center justify-between mt-4">
				<p className="font-medium my-1">
					Range: ${job.min_price} - ${job.max_price}
				</p>

				<Button
					variant="text"
					sx={{
						borderBottom: "2px #74c0fc solid",
						borderRadius: 0,
						padding: 0,
					}}
					onClick={() => navigate(`/job/${job._id}`)}
				>
					Read More
				</Button>
			</div>
		</div>
	);
}

JobCard.propTypes = {
	job: PropTypes.object.isRequired,
};

export default JobCard;
