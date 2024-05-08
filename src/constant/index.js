class Link {
	constructor(title, link) {
		this.title = title;
		this.link = link;
	}
}

const navigation = [];

const navButtons = [new Link("Log in", "login"), new Link("Sign up", "signup")];

const sliderImages = [
	"https://i.postimg.cc/g2Q3JfPw/Germany.jpg",
	"https://i.postimg.cc/cHM3FCtY/Italy.jpg",
	"https://i.postimg.cc/MH9Q8LDp/Netherland.jpg",
	"https://i.postimg.cc/vTYVky5K/Swiss.jpg",
];

export { navigation, navButtons, sliderImages };
