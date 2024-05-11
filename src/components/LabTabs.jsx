import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

export default function LabTabs() {
	const [value, setValue] = useState("0");
	const [jobs, setJobs] = useState();
	const fetchData = useAxios();

	useEffect(() => {
		const getData = async () => {
			const { data } = await fetchData("/market-jobs");
			setJobs(data);
		};
		getData();
	}, [fetchData]);

	const categories = [...new Set(jobs?.map((item) => item.category))];

	return (
		<Box sx={{ width: "100%", typography: "body1" }}>
			<TabContext value={value}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<TabList
						onChange={(_, newValue) => setValue(newValue)}
						aria-label="lab API tabs example"
						centered={true}
					>
						{categories?.map((item, i) => (
							<Tab label={item} value={String(i)} key={i * 99} />
						))}
					</TabList>
				</Box>
				{categories?.map((category, i) => (
					<TabPanel value={String(i)} key={i * 999}>
						<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
							{jobs
								?.filter((item) => item.category === category)
								.map((job) => (
									<JobCard key={job._id} job={job} />
								))}
						</div>
					</TabPanel>
				))}
			</TabContext>
		</Box>
	);
}
