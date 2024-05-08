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

const navigation = [];

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

export { navigation, navButtons, sliderData };
