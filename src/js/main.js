//Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//Inputmask
import Inputmask from "inputmask";

// Верхний слайдер
if(document.querySelector('.js-top-slider')){
	const topSlider = new Swiper('.js-top-slider',
	{
		modules: [Pagination],
		loop:true,
		pagination:{
			el:".js-top-slider-pagination",
			clickable:true
		},
	});
}

// Слайдер популярных категорий
if(document.querySelector('.js-popular-slider')){
	const topSlider = new Swiper('.js-popular-slider',
	{
		modules: [Navigation],
		slidesPerView: 1,
		spaceBetween: 15,
		loop: true,
		navigation: {
			nextEl: '.js-popular-slider-next',
			prevEl: '.js-popular-slider-prev',
		},
		breakpoints: {
			992: {
				slidesPerView: 4,
			},
			768: {
				slidesPerView: 3,
			},
		},
	});
}

// Слайдер хитов
if(document.querySelector('.js-hits-slider')){
	const topSlider = new Swiper('.js-hits-slider',
	{
		modules: [Navigation],
		slidesPerView: 1,
		spaceBetween: 90,
		loop: true,
		navigation: {
			nextEl: '.js-hits-slider-next',
			prevEl: '.js-hits-slider-prev',
		},
		breakpoints: {
			992: {
				slidesPerView: 5,
			},
			768: {
				slidesPerView: 3,
			},
		},
	});
}

// Слайдер распродажи
if(document.querySelector('.js-sale-slider')){
	const topSlider = new Swiper('.js-sale-slider',
	{
		modules: [Navigation],
		slidesPerView: 1,
		spaceBetween: 90,
		loop: true,
		navigation: {
			nextEl: '.js-sale-slider-next',
			prevEl: '.js-sale-slider-prev',
		},
		breakpoints: {
			992: {
				slidesPerView: 5,
			},
			768: {
				slidesPerView: 3,
			},
		},
	});
}

// Маска для телефона
document.addEventListener("DOMContentLoaded", function(){
	if(document.querySelector('.js-phone')){
		Inputmask('+7 (999) 999-9999').mask('.js-phone');
	}
});