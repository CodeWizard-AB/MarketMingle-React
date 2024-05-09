// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderData } from "../constant";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";

export default function Carousel() {
	return (
		<>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
				navigation={true}
				loop={true}
				modules={[Autoplay, Pagination, Navigation]}
				className="mySwiper"
			>
				{sliderData.map(({ img, text }, i) => (
					<SwiperSlide key={i * 10}>
						<Slide image={img} content={text} />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
