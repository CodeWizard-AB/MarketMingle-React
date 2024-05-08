import Banner from "../components/Banner";
import LabTabs from "../components/LabTabs";

function Home() {
	return (
		<div>
			<Banner />
			<section className="my-28">
				<div className="text-center first:*:text-3xl first:*:font-semibold space-y-2 max-w-screen-sm mx-auto last:*:text-lg mb-10">
					<h1>Browse Jobs By Categories</h1>
					<p>
						Explore an array of job opportunities categorized by industry,
						expertise, and interests for tailored career exploration.
					</p>
				</div>
				<LabTabs />
			</section>
		</div>
	);
}

export default Home;
