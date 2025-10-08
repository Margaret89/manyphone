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
			1280: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 3,
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
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: '.js-hits-slider-next',
			prevEl: '.js-hits-slider-prev',
		},
		breakpoints: {
			1440: {
				slidesPerView: 5,
				spaceBetween: 90,
			},
			992: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 30,
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
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: '.js-sale-slider-next',
			prevEl: '.js-sale-slider-prev',
		},
		breakpoints: {
			1440: {
				slidesPerView: 5,
				spaceBetween: 90,
			},
			992: {
				slidesPerView: 4,
				spaceBetween: 30,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 30,
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

// Открыть/закрыть мобильное меню
// if(document.querySelector('.js-btn-menu')){
// 	let levelMenu = 0;



// 	document.querySelectorAll(".js-main-menu-arr").forEach(function(arrow){
// 		arrow.onclick = function(event){
// 			event.preventDefault();
// 			levelMenu = 1;

// 			document.querySelector('.js-catalog-menu').classList.toggle('open');
// 			document.querySelector('.js-main-menu-back').classList.toggle('active');
// 		}
// 	});

// 	document.querySelectorAll(".js-catalog-menu-arr").forEach(function(arrow){
// 		arrow.onclick = function(event){
// 			event.preventDefault();
// 			levelMenu = 1;
// 			const nextElement = this.closest('.js-catalog-menu-link').nextElementSibling;
// 			const level = this.closest('.js-catalog-menu-link').getAttribute('data-level');

// 			if (nextElement && nextElement.classList.contains('js-catalog-menu-sub')) {
// 				nextElement.classList.add('open');
// 			}
// 		}
// 	});
// }

//Открыть/закрыть мобильное меню
if(document.querySelector('.js-btn-menu')){
	document.querySelector('.js-btn-menu').addEventListener('click', function(){
		this.classList.toggle('active');
		document.querySelector('.js-main-menu-wrap').classList.toggle('open');
		document.querySelector('.js-body').classList.toggle('no-scroll');
	})
}

// Перемещение мобильного меню
var levelMenu = 0;
var arrNavMenu = [];

document.querySelectorAll(".js-main-menu-arr").forEach(function(arrow){
	arrow.onclick = function(event){
		event.preventDefault();

		var curItem = arrow.closest('.js-main-menu-link');
		var subMenu = curItem.parentElement.querySelector('.js-main-menu-sub');
		var valItem = curItem.parentElement.querySelector('.js-main-menu-text').textContent;

		document.querySelectorAll('.js-main-menu-sub[data-level="'+levelMenu+'"]').forEach(function(sub){
			sub.classList.add('overflow-hidden');
		});
	
		levelMenu++;

		subMenu.classList.add('active');
		document.querySelector(".js-main-menu-back").classList.add('active');
		document.querySelector(".js-main-menu-wrap").classList.add('active');
		document.querySelector(".js-main-menu-back-text").textContent = valItem;
		document.querySelector(".js-main-menu-wrap-content").classList.add('overflow-hidden');
		
		arrNavMenu.push(valItem);
		console.log('arrNavMenu = ', arrNavMenu);
	}
});

document.querySelector('.js-main-menu-back').addEventListener('click', function(){
	document.querySelectorAll('.js-main-menu-sub[data-level="'+levelMenu+'"]').forEach(function(sub){
		sub.classList.remove('active');
	});

	levelMenu--;
	arrNavMenu.pop();

	console.log('arrNavMenu = ', arrNavMenu);

	if (levelMenu == 0) {
		this.classList.remove('active');
		document.querySelector(".js-main-menu-wrap").classList.remove('overflow-hidden');
		document.querySelector(".js-main-menu-wrap-content").classList.remove('overflow-hidden');
	}

	document.querySelector('.js-main-menu-sub[data-level="'+levelMenu+'"]').classList.remove('overflow-hidden');
	console.log('levelMenu = ', levelMenu);
	// var valBack = document.querySelector('.js-main-menu-sub.active[data-level="'+levelMenu+'"]').textContent;
	// document.querySelector(".js-main-menu-back-text").textContent = valBack;
	document.querySelector(".js-main-menu-back-text").textContent = arrNavMenu[arrNavMenu.length - 1];

});

