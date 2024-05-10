import { useLoaderData } from "react-router-dom";
import JobsTable from "../components/JobsTable";

function MyPostJobs() {
	const data = useLoaderData();
	return (
		<div className="my-16">
			<JobsTable data={data} />
		</div>
	);
}

export default MyPostJobs;
