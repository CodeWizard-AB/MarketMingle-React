import workHome from "../assets/slider/workHome.jpg";
import creativeTask from "../assets/slider/creativeTask.jpg";
import teamWork from "../assets/slider/teamWork.jpg";
import meetPeople from "../assets/slider/meetPeople.jpg";

class Link {
	constructor(title, link) {
		this.title = title;
		this.link = link;
	}
}

const navButtons = [new Link("Log in", "login"), new Link("Sign up", "signup")];

const sliderData = [
	{
		img: workHome,
		text: "Discover a world where work meets home seamlessly, fostering productivity and comfort",
	},
	{
		img: teamWork,
		text: "Experience the power of teamwork, collaborating with diverse talents to achieve shared goals and dreams",
	},
	{
		img: creativeTask,
		text: "Unleash your creativity through engaging tasks and challenges, sparking innovation and inspiration",
	},
	{
		img: meetPeople,
		text: "Connect with like-minded individuals, forging meaningful relationships while you work and play",
	},
];

const formLabel = [
	{
		title: "Price",
		type: "text",
		holder: "200",
		id: "price",
	},
	{
		title: "Email Address",
		type: "email",
		holder: "name@company.com",
		id: "email",
	},
	{
		title: "Message",
		type: "text",
		holder: "message",
		id: "message",
	},
	{
		title: "Deadline",
		type: "date",
		holder: "",
		id: "deadline",
	},
];

const jobDetials = [
	{
		label: "Job Title",
		type: "text",
		id: "job_title",
	},
	{
		label: "Email Address",
		type: "email",
		id: "buyer_email",
	},
	{
		label: "Minimum Price",
		type: "number",
		id: "min_price",
	},
	{
		label: "Maximum Price",
		type: "number",
		id: "max_price",
	},
	{
		label: "Deadline",
		type: "date",
		id: "deadline",
	},
	{
		label: "Job Description",
		type: "text",
		id: "description",
	},
];

export { navButtons, sliderData, formLabel, jobDetials };
