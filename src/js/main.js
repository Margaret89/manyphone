//Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//Inputmask
import Inputmask from "inputmask";

//noUiSlider
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.min.css';
import wNumb from 'wnumb';


//Fancybox
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
Fancybox.bind("[data-fancybox]", {
	on: {
		done: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.remove('hide');
			}
		},
		close: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.add('hide');
			}
		}
	}
});


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

// Слайдер каталога
if(document.querySelector('.js-catalog-slider')){
	document.querySelectorAll(".js-catalog-slider").forEach(function(slider){
		const catalogSliderNext = slider.closest('.js-catalog-slider-wrap').querySelector('.js-catalog-slider-next');
		const catalogSliderPrev = slider.closest('.js-catalog-slider-wrap').querySelector('.js-catalog-slider-prev');

		const catalogSlider = new Swiper(slider,
		{
			modules: [Navigation],
			slidesPerView: 1,
			spaceBetween: 30,
			loop: true,
			navigation: {
				nextEl: catalogSliderNext,
				prevEl: catalogSliderPrev,
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
	});
}

// Слайдер услуг
if(document.querySelector('.js-services-slider')){
	const servicesSlider = new Swiper('.js-services-slider',
	{
		modules: [Navigation],
		slidesPerView: 1,
		spaceBetween: 30,
		loop: true,
		navigation: {
			nextEl: '.js-services-slider-next',
			prevEl: '.js-services-slider-prev',
		},
		breakpoints: {
			1280: {
				slidesPerView: 4,
				spaceBetween: 47,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
			768: {
				slidesPerView: 3,
				spaceBetween: 30,
			},
		},
	});
}

// Слайдер новостей
if(document.querySelector('.js-news-slider')){
	const topSlider = new Swiper('.js-news-slider',
	{
		modules: [Navigation],
		loop:true,
		navigation: {
			nextEl: '.js-news-slider-next',
			prevEl: '.js-news-slider-prev',
		},
	});
}


// Маска для телефона
document.addEventListener("DOMContentLoaded", function(){
	if(document.querySelector('.js-phone')){
		Inputmask('+7 (999) 999-9999').mask('.js-phone');
	}
});

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
	}
});

document.querySelector('.js-main-menu-back').addEventListener('click', function(){
	document.querySelectorAll('.js-main-menu-sub[data-level="'+levelMenu+'"]').forEach(function(sub){
		sub.classList.remove('active');
	});

	levelMenu--;
	arrNavMenu.pop();

	if (levelMenu == 0) {
		this.classList.remove('active');
		document.querySelector(".js-main-menu-wrap").classList.remove('overflow-hidden');
		document.querySelector(".js-main-menu-wrap-content").classList.remove('overflow-hidden');
	}

	document.querySelector('.js-main-menu-sub[data-level="'+levelMenu+'"]').classList.remove('overflow-hidden');
	document.querySelector(".js-main-menu-back-text").textContent = arrNavMenu[arrNavMenu.length - 1];

});

// Раскрывающийся блок фильтра
if(document.querySelector('.js-filter-item')){
	document.querySelectorAll('.js-filter-item').forEach((accSection) => {
		const accHeader = accSection.querySelector('.js-filter-head');
		const accBody = accSection.querySelector('.js-filter-content');
		const accContent = accSection.querySelector('.js-filter-info');

		if ( accSection.classList.contains("opened") ) {
			accBody.style.maxHeight = `${accContent.clientHeight}px`;
		}
		
		accHeader.addEventListener('click', () => {
			accSection.classList.toggle("opened");
			
			if ( accSection.classList.contains("opened") ) {
				accBody.style.maxHeight = `${accContent.clientHeight}px`;
			} else {
				accBody.style.maxHeight = "0px";
			}
		})
	});
}

// Раскрывающийся блок меню каталога
if(document.querySelector('.js-section-menu')){
	document.querySelectorAll('.js-section-menu').forEach((accSection) => {
		const accHeader = accSection.querySelector('.js-section-menu-head');
		const accBody = accSection.querySelector('.js-section-menu-content');
		const accContent = accSection.querySelector('.js-section-menu-info');

		if ( accSection.classList.contains("opened") ) {
			accBody.style.maxHeight = `${accContent.clientHeight}px`;
		}
		
		accHeader.addEventListener('click', () => {
			accSection.classList.toggle("opened");
			
			if ( accSection.classList.contains("opened") ) {
				accBody.style.maxHeight = `${accContent.clientHeight}px`;
			} else {
				accBody.style.maxHeight = "0px";
			}
		})
	});
}

// range slider
if(document.querySelector('.js-slider-range')){
	document.querySelectorAll('.js-slider-range').forEach(function(slider){
		var minRange = Number(slider.getAttribute('data-min'));
		var maxRange = Number(slider.getAttribute('data-max'));
		var start = Number(slider.getAttribute('data-cur-min'));
		var finish = Number(slider.getAttribute('data-cur-max'));
		var idMinElem = slider.closest('.js-range').querySelector('.js-slider-range-min').getAttribute('id');
		var idMaxElem = slider.closest('.js-range').querySelector('.js-slider-range-max').getAttribute('id');
		
		noUiSlider.create(slider, {
			start: [start, finish],
			step: 1,
			connect: true,
			range: {
				'min': minRange,
				'max': maxRange
			},
			format: wNumb({
				decimals: 0,
				thousand: ' ',
			})
		});

		var snapValues = [
			document.getElementById(idMinElem),
			document.getElementById(idMaxElem)
		];

		var initRange = false;

		slider.noUiSlider.on('update', function (values, handle) {
			snapValues[handle].value = values[handle];

			if(initRange == false){
				if(handle == 1){
					initRange = true;
				}
			}else{
				// $('.js-slider-range-min').trigger("change");
				// $('.js-slider-range-max').trigger("change");
			}

			
			// document.getElementById(snapValues[handle].id).value(snapValues[handle].value);


			// $('#'+snapValues[handle].id).text(snapValues[handle].value);
		});

		snapValues.forEach(function (input, handle) {
			input.addEventListener('change', function () {
				var valItem = this.value;
				var minValItem = Number(snapValues[0].value);
				var maxValItem = Number(snapValues[1].value);

				if(handle == 0){
					if((valItem < minRange) || (valItem > maxRange) || (valItem >= maxValItem)){
						valItem = minRange;
					}
				}else{
					if((valItem < minRange) || (valItem > maxRange) || (valItem <= minValItem)){
						valItem = maxRange;
					}
				}
				slider.noUiSlider.setHandle(handle, valItem);
			});
		});

		
	});

	// Проверка полей на ввод цифор
	function allowOnlyNumbers(inputSelector) {
		const input = document.querySelector(inputSelector);
		
		input.addEventListener('input', function(e) {
			// Удаляем все символы, кроме цифр
			this.value = this.value.replace(/[^\d]/g, '');
		});
	}
	
	// Использование
	allowOnlyNumbers('.js-slider-range-min');
	allowOnlyNumbers('.js-slider-range-max');
}

// select сортировки
if(document.querySelector('.js-sort')){
	document.querySelectorAll('.js-sort-item').forEach(function(item){
		item.onclick = function(event){
			item.closest('.js-sort').querySelector('.js-sort-val').textContent = item.textContent;
		}
	});

	document.querySelectorAll('.js-sort-default').forEach(function(elem){
		elem.onclick = function(event){
			const sort = elem.closest('.js-sort');
			const accBody = accSection.querySelector('.js-section-menu-content');
		const accContent = accSection.querySelector('.js-section-menu-info');
			sort.classList.toggle('open');

			if ( sort.classList.contains("open") ) {
				accBody.style.maxHeight = `${accContent.clientHeight}px`;
			} else {
				accBody.style.maxHeight = "0px";
			}
		}
	});

	document.querySelectorAll('.js-sort').forEach((accSection) => {
		const accHeader = accSection.querySelector('.js-sort-default');
		const accBody = accSection.querySelector('.js-sort-popup');
		const accContent = accSection.querySelector('.js-sort-list');

		if ( accSection.classList.contains("opened") ) {
			accBody.style.maxHeight = `${accContent.clientHeight}px`;
		}
		
		accHeader.addEventListener('click', () => {
			accSection.classList.toggle("opened");
			
			if ( accSection.classList.contains("opened") ) {
				accBody.style.maxHeight = `${accContent.clientHeight}px`;
			} else {
				accBody.style.maxHeight = "0px";
			}
		})
	});
}

// Открыть.Закрыть многостросчный текст
document.addEventListener('DOMContentLoaded', function() {
	initializeTextBlocks();
});

function initializeTextBlocks() {
	const textBlocks = document.querySelectorAll('.js-more-text');
	
	textBlocks.forEach(block => {
		const content = block.querySelector('.js-more-text-content');
		const toggleBtn = block.querySelector('.js-more-text-btn');
		const lineHeight = parseInt(getComputedStyle(content).lineHeight);
		const maxHeight = lineHeight * content.getAttribute('data-max-lines');
		const allHeight = content.scrollHeight;

		// Проверяем, превышает ли текст 2 строки
		if (content.scrollHeight > maxHeight + 2) { // +2 для погрешности
			content.classList.add('truncated');
			content.style.maxHeight = `${maxHeight}px`;

			toggleBtn.classList.add('visible');
			
			// Добавляем обработчик клика
			toggleBtn.addEventListener('click', function() {
				const tempText = this.textContent;
				this.textContent = this.getAttribute('data-text');
				this.setAttribute('data-text', tempText);

				if (content.classList.contains('truncated')) {
					// Разворачиваем текст
					content.classList.remove('truncated');
					content.style.maxHeight = `${allHeight}px`;
				} else {
					// Сворачиваем текст
					content.classList.add('truncated');
					content.style.maxHeight = `${maxHeight}px`;
				}
			});
		}
	});
}


//Открыть/Закрыть фильтр
if(document.querySelector('.js-filter-btn')){
	document.querySelector('.js-filter-btn').addEventListener('click', function(){
		this.classList.toggle('active');
		document.querySelector('.js-filter-wrap').classList.toggle('open');
		// document.querySelector('.js-body').classList.toggle('no-scroll');
	})

	document.querySelector('.js-filter-wrap-close').addEventListener('click', function(){
		this.classList.remove('active');
		document.querySelector('.js-filter-wrap').classList.remove('open');
		// document.querySelector('.js-body').classList.remove('no-scroll');
	})
}

// Табуляция
if(document.querySelector('.js-tabs-page')){
	document.querySelectorAll('.js-tabs-page').forEach(function(tabs){
		let countTab = tabs.getElementsByClassName('js-tabs-page-item').length;
		let curCountTab = 1;
		let prevArr = tabs.querySelector(".js-tabs-page-arr-prev");
		let nextArr = tabs.querySelector(".js-tabs-page-arr-next");
		let firstTab = tabs.querySelector('.js-tabs-page-item:first-child');
		let firstTabContent = tabs.querySelector('.js-tabs-page-content-item:first-child');

		//Активируем пункты по умолчанию
		firstTab.classList.add('active');
		firstTabContent.classList.add('active');

		//Скрываем стрелки, если количество меньше 3
		if(countTab <= 2){
			tabs.querySelector('.js-tabs-page-arr-prev').classList.add('hide');
			tabs.querySelector('.js-tabs-page-arr-next').classList.add('hide');
		}else{
			tabs.querySelector('.js-tabs-page-arr-prev').classList.add('disable');
		}

		//Перелистывание табов влево
		prevArr.addEventListener("click", function(e){
			if (!e.target.classList.contains("disable") ) {
				let activeTab = tabs.querySelector('.js-tabs-page-item.active');
				
				curCountTab--;

				if(curCountTab < countTab){
					nextArr.classList.remove('disable');
				}

				if(curCountTab == 1){
					prevArr.classList.add('disable');
				}

				if(screenWidth < 768){
					toggleTabs(activeTab.previousElementSibling);
				}

				firstTab.style.marginLeft = firstTab.offsetWidth * (curCountTab - 1) * -1+'px';
			}
		});

		//Перелистывание табов вправо
		nextArr.addEventListener("click", function(e){
			if (!e.target.classList.contains("disable") ) {
				let activeTab = tabs.querySelector('.js-tabs-page-item.active');
			
				curCountTab++;

				if(curCountTab > 1){
					prevArr.classList.remove('disable');
				}

				if(screenWidth < 768){
					if(curCountTab == countTab){
						nextArr.classList.add('disable');
					}

					toggleTabs(activeTab.nextElementSibling);
				}else{
					if(curCountTab == countTab-1){
						nextArr.classList.add('disable');
					}
				}
				
				firstTab.style.marginLeft = firstTab.offsetWidth * (curCountTab - 1) * -1+'px';
			}
		});
		
	});

	//Переключение табов
	document.querySelectorAll('.js-tabs-page-item').forEach(function(elem){
		elem.addEventListener('click', function(){
			toggleTabs(elem);
		})
	});

	function toggleTabs(elem) {
		let idTab = elem.getAttribute('data-item');
		let tabContent = document.querySelector('.js-tabs-page-content-item[id="'+idTab+'"]');
		let tabDesc = tabContent.querySelector('.js-tabs-page-desc-item');
		let parent = elem.closest('.js-tabs-page');
		let content = parent.querySelector('.js-tabs-page-content');
		let list = parent.querySelector('.js-tabs-page-list');

		list.querySelectorAll(':scope > .js-tabs-page-item').forEach(function(item){
			item.classList.remove('active');
		});

		content.querySelectorAll(':scope > .js-tabs-page-content-item').forEach(function(item){
			item.classList.remove('active');
			item.style.maxHeight = "0px";
		});
		
		elem.classList.add("active");
		tabContent.classList.add("active");
		
		if ( tabContent.classList.contains("active") ) {
			tabContent.style.maxHeight = `${tabDesc.clientHeight}px`;
		} else {
			tabContent.style.maxHeight = "0px";
		}
	}
}


//Слайдер детального изображения каталога
var prodDetailSliderThumb = new Swiper('.js-prod-detail-thumb-slider', {
	modules: [Navigation],
	slidesPerView: 4,
	spaceBetween: 20,
	// freeMode: true,
	// watchSlidesProgress: true,
	// direction: "vertical",

	// slidesPerView: "auto",
	// centeredSlides: true,
	// autoScrollOffset: 1,

	navigation: {
		nextEl: ".js-prod-detail-thumb-slider-next",
		prevEl: ".js-prod-detail-thumb-slider-prev",
	},
	// breakpoints: {
	// 	992: {
	// 		slidesPerView: 9,
	// 		spaceBetween: 0,
	// 	},
	// 	768: {
	// 		slidesPerView: 3,
	// 		spaceBetween: 0,
	// 	}
	// }
	// loop: true,
});

var prodDetailSlider = new Swiper('.js-prod-detail-slider', {
	modules: [Thumbs, Pagination],
	spaceBetween: 20,
	loop: true,
	thumbs: {
		swiper: prodDetailSliderThumb,
	},
	pagination:{
		el:".js-prod-detail-slider-pager",
		clickable:true
	},
	// breakpoints: {
	// 	// 768: {
	// 	// 	direction: "horizontal",
	// 	// }
	// }
});

//Слайдер отзывов
if(document.querySelector('.js-reviews-slider')){
	const topSlider = new Swiper('.js-reviews-slider',
	{
		modules: [Pagination, Navigation],
		slidesPerView: 1,
		spaceBetween: 20,
		loop: true,
		pagination: {
			el: ".js-reviews-slider-pager",
			clickable: true,
			renderBullet: function (index, className) {
				console.log('11 = ', );
			  return '<span class="' + className + '">' + (index + 1) + "</span>";
			},
		},
		navigation: {
			nextEl: ".js-reviews-slider-next",
			prevEl: ".js-reviews-slider-prev",
		},
		breakpoints: {
			1440: {
				slidesPerView: 2.4,
				spaceBetween: 40,
			},
			992: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
		},
	});
}

// Плавный переход к ссылке
if (document.querySelector('.js-link-move')) {
	document.querySelectorAll(".js-link-move").forEach(function(btn){
		btn.onclick = function(event){
			event.preventDefault();
			const id = btn.getAttribute('href');

			if (document.querySelector('#'+id)) {
				document.querySelector('#'+id).scrollIntoView({
					behavior: 'smooth'
				});
			}
		}
	});
}
