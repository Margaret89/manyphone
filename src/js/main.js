//Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// //Inputmask
// import Inputmask from "inputmask";

//noUiSlider
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.min.css';
import wNumb from 'wnumb';


//Fancybox
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
window.Fancybox = Fancybox;// Делаем Fancybox глобально доступным
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
		preventInteractionOnTransition: true,
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
		preventInteractionOnTransition: true,
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
			preventInteractionOnTransition: true,
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
		preventInteractionOnTransition: true,
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
		preventInteractionOnTransition: true,
		navigation: {
			nextEl: '.js-news-slider-next',
			prevEl: '.js-news-slider-prev',
		},
	});
}


// // Маска для телефона
// document.addEventListener("DOMContentLoaded", function(){
// 	if(document.querySelector('.js-phone')){
// 		Inputmask('+7 (999) 999-9999').mask('.js-phone');
// 	}
// });


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
				// thousand: ' ',
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

				const event = new Event('change', {
					bubbles: true,
					cancelable: true
				});
				snapValues[handle].dispatchEvent(event);
			}

			
			// document.getElementById(snapValues[handle].id).value(snapValues[handle].value);


			// $('#'+snapValues[handle].id).text(snapValues[handle].value);

			// Затем создаем и dispatch событие change

			
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
			const sort = item.closest('.js-sort');
			const accBody = sort.querySelector('.js-sort-popup');
			const accContent = sort.querySelector('.js-sort-list');

			sort.querySelector('.js-sort-val').textContent = item.textContent;
			sort.classList.toggle('opened');

			if ( sort.classList.contains("opened")) {
				accBody.style.maxHeight = `${accContent.clientHeight}px`;
			} else {
				accBody.style.maxHeight = "0px";
			}
		}
	});

	// document.querySelectorAll('.js-sort-default').forEach(function(elem){
	// 	elem.onclick = function(event){
	// 		const sort = elem.closest('.js-sort');
	// 		const accBody = sort.querySelector('.js-sort-popup');
	// 		const accContent = sort.querySelector('.js-sort-list');
	// 		sort.classList.toggle('open');

	// 		if ( sort.classList.contains("open") ) {
	// 			accBody.style.maxHeight = `${accContent.clientHeight}px`;
	// 		} else {
	// 			accBody.style.maxHeight = "0px";
	// 		}
	// 	}
	// });

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

	///
	const sortItems = document.querySelectorAll('.js-sort-item');
	const catalogList = document.getElementById('catalog-list');

	// Функции для работы с куками
	function setCookie(name, value, days = 30) {
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		const expires = "expires=" + date.toUTCString();
		document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
	}

	function getCookie(name) {
		const nameEQ = name + "=";
		const cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i];
			while (cookie.charAt(0) === ' ') {
				cookie = cookie.substring(1);
			}
			if (cookie.indexOf(nameEQ) === 0) {
				return decodeURIComponent(cookie.substring(nameEQ.length));
			}
		}
		return null;
	}

	// Функция для переподключения скриптов в блоке
	function reloadScriptsInContainer(container) {
		const scripts = container.querySelectorAll('script');
		const scriptPromises = [];
		
		scripts.forEach(oldScript => {
			const newScript = document.createElement('script');
			
			// Копируем все атрибуты
			Array.from(oldScript.attributes).forEach(attr => {
				newScript.setAttribute(attr.name, attr.value);
			});
			
			// Копируем содержимое для inline скриптов
			if (oldScript.innerHTML) {
				newScript.innerHTML = oldScript.innerHTML;
			}
			
			// Удаляем старый скрипт
			oldScript.remove();
			
			// Создаем promise для отслеживания загрузки
			const promise = new Promise((resolve, reject) => {
				if (newScript.src) {
					// Для внешних скриптов
					newScript.onload = resolve;
					newScript.onerror = reject;
				} else {
					// Для inline скриптов выполняем сразу
					resolve();
				}
				document.head.appendChild(newScript);
			});
			
			scriptPromises.push(promise);
		});
		
		return Promise.all(scriptPromises);
	}

	// Загружаем значения из куков или устанавливаем по умолчанию
	let s_catalog_val = getCookie('s_catalog_val');
	let s_catalog_order = getCookie('s_catalog_order');

	// Если в куках нет значений, устанавливаем значения первого элемента
	if (!s_catalog_val || !s_catalog_order) {
		const firstItem = sortItems[0];
		s_catalog_val = firstItem.getAttribute('data-name');
		s_catalog_order = firstItem.getAttribute('data-order');
		
		// Сохраняем значения по умолчанию в куки
		setCookie('s_catalog_val', s_catalog_val);
		setCookie('s_catalog_order', s_catalog_order);
	}

	// Обновляем активный элемент на основе значений из куков
	function updateActiveSortFromCookies() {
		sortItems.forEach(item => {
			const itemName = item.getAttribute('data-name');
			const itemOrder = item.getAttribute('data-order');
			
			if (itemName === s_catalog_val && itemOrder === s_catalog_order) {
				const sort = item.closest('.js-sort');
				const accBody = sort.querySelector('.js-sort-popup');

				sort.querySelector('.js-sort-val').textContent = item.textContent;
				sort.classList.remove('opened');

				accBody.style.maxHeight = "0px";
			}
		});
	}

	updateActiveSortFromCookies();

	// Функция для обновления контента
	function updateCatalogContent() {
		if (catalogList) {
			// Делаем AJAX запрос
			fetchCatalogData();
		}
	}

	// Функция для AJAX запроса с переподключением скриптов
	function fetchCatalogData() {
		// Показываем индикатор загрузки (опционально)
		catalogList.classList.add('loading');
		
		fetch('?use_ajax=Y&sort=' + s_catalog_val + '&order=' + s_catalog_order)
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.text();
			})
			.then(html => {
				// Сохраняем текущую позицию скролла (опционально)
				const scrollPosition = window.scrollY;
				
				// Обновляем содержимое
				catalogList.innerHTML = html;
				
				// Переподключаем скрипты в обновленном блоке
				return reloadScriptsInContainer(catalogList)
					.then(() => {
						// Восстанавливаем позицию скролла
						window.scrollTo(0, scrollPosition);
						
						// Убираем индикатор загрузки
						catalogList.classList.remove('loading');
						
						console.log('Контент обновлен, скрипты переподключены');
						
						// Вызываем кастомное событие для дополнительной инициализации
						document.dispatchEvent(new CustomEvent('catalogUpdated', {
							detail: {
								sort: s_catalog_val,
								order: s_catalog_order
							}
						}));
					});
			})
			.catch(error => {
				console.error('Ошибка при загрузке данных:', error);
				catalogList.classList.remove('loading');
				
				// Показываем сообщение об ошибке (опционально)
				catalogList.innerHTML = '<div class="error-message">Ошибка загрузки данных</div>';
			});
	}

	// Обработчики кликов для элементов сортировки
	sortItems.forEach(item => {
		item.addEventListener('click', function() {
			// Получаем данные из атрибутов
			s_catalog_val = this.getAttribute('data-name');
			s_catalog_order = this.getAttribute('data-order');

			// Сохраняем в куки
			setCookie('s_catalog_val', s_catalog_val);
			setCookie('s_catalog_order', s_catalog_order);

			// Обновляем визуальное состояние
			updateActiveSortFromCookies();
			
			// Обновляем контент
			updateCatalogContent();
		});
	});

	// Инициализация с первоначальными значениями (опционально)
	if (sortItems.length > 0) {
		const firstItem = sortItems[0];
		s_catalog_val = firstItem.getAttribute('data-name');
		s_catalog_order = firstItem.getAttribute('data-order');
		firstItem.classList.add('active');
	}

	// Дополнительно: можно добавить обработчик для кастомного события
	document.addEventListener('catalogUpdated', function(event) {
		console.log('Каталог обновлен с параметрами:', event.detail);
		// Здесь можно добавить дополнительную логику инициализации
		// которая должна выполняться после обновления каталога
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

	function checkAllTabsWidth() {
	// Находим все контейнеры табов на странице
	const tabsContainers = document.querySelectorAll('.js-tabs-page-top');
	
	tabsContainers.forEach(container => {
		const tabsList = container.querySelector('.js-tabs-page-list');
		const tabsItems = container.querySelectorAll('.js-tabs-page-item');
		const nextArr = container.querySelector('.js-tabs-page-arr-next');
		const prevArr = container.querySelector('.js-tabs-page-arr-prev');
		
		if (!tabsList || tabsItems.length === 0) return;
		
		// Получаем ширину контейнера
		const listWidth = tabsList.offsetWidth;

		const listStyles = window.getComputedStyle(tabsList);
		const gap = parseFloat(listStyles.gap) || 0;
		
		// Суммируем ширину всех элементов
		let totalItemsWidth = 0;
		tabsItems.forEach((item, index) => {
			totalItemsWidth += item.offsetWidth;

			if (index < tabsItems.length - 1) {
				totalItemsWidth += gap;
			}
		});
		
		// Проверяем условие и выводим в консоль
		if (totalItemsWidth > listWidth) {
			prevArr.classList.add('disable');
			nextArr.classList.add('active');
		}else{
			prevArr.classList.add('hide');
			nextArr.classList.add('hide');
		}
	});
}

// Запускаем проверку когда DOM готов
document.addEventListener('DOMContentLoaded', function() {
	checkAllTabsWidth();
});

// Также отслеживаем изменения размера окна
window.addEventListener('resize', checkAllTabsWidth);

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

		// //Скрываем стрелки, если количество меньше 3
		// if(countTab <= 2){
		// 	tabs.querySelector('.js-tabs-page-arr-prev').classList.add('hide');
		// 	tabs.querySelector('.js-tabs-page-arr-next').classList.add('hide');
		// }else{
		// 	tabs.querySelector('.js-tabs-page-arr-prev').classList.add('disable');
		// }

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

				// if(screenWidth < 768){
				// }
				toggleTabs(activeTab.previousElementSibling);

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

				if(curCountTab == countTab){
					nextArr.classList.add('disable');
				}

				toggleTabs(activeTab.nextElementSibling);
				// if(screenWidth < 768){
				// }else{
				// 	if(curCountTab == countTab-1){
				// 		nextArr.classList.add('disable');
				// 	}
				// }
				
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
	preventInteractionOnTransition: true,
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
	preventInteractionOnTransition: true,
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
		preventInteractionOnTransition: true,
		pagination: {
			el: ".js-reviews-slider-pager",
			clickable: true,
			renderBullet: function (index, className) {
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
			// event.preventDefault();
			const id = btn.getAttribute('data-href');

			Fancybox.close();

			if (document.querySelector('#'+id)) {
				document.querySelector('#'+id).scrollIntoView({
					behavior: 'smooth'
				});
			}
		}
	});
}

// // Валидация форм

// //Функция добавления ошибки
// const generateError = function (text) {
// 	var error = document.createElement('div')
// 	error.className = 'error-msg'
// 	// error.style.color = 'red'
// 	error.innerHTML = text
// 	return error
// }

// document.querySelectorAll(".js-btn-submit").forEach(function(btn){
// 	btn.onclick = function(e){
		

// 		var form =  e.target.closest('form');
// 		var patternEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

// 		//Очистка ошибок
// 		form.querySelectorAll('.error').forEach(function(err){
// 			if(err.querySelector('.error-msg')){
// 				err.querySelector('.error-msg').remove();
// 			}
// 			err.querySelector('input').setAttribute('placeholder', '');
// 			err.classList.remove('error');
// 		});
	  
// 		//Проверка полей на пустоту
// 		form.querySelectorAll('.js-form-site-item input').forEach(function(field){
// 			//Проверка email
// 			// if(field.type == 'email' && field.value !== ''){
// 			if(field.type == 'email'){
// 				if (!patternEmail.test(field.value)) {
// 					// var errorMsg =  generateError('Укажите корректный E-mail');
// 					field.parentElement.classList.add('error');
// 					// field.parentElement.append(errorMsg);
// 				}
// 			}else{
// 				//Проверка всех полей
// 				if (field.value === '' &&  field.hasAttribute('required')) {
// 					// var errorMsg = generateError('Заполните поле');
// 					field.parentElement.classList.add('error');
// 					// field.parentElement.append(errorMsg);
// 				}
// 			}
// 		});

// 		//Проверка checkbox на checked
// 		form.querySelectorAll('.js-form-site-check input').forEach(function(field){
// 			if(!field.checked && field.hasAttribute('required')){
// 				// var errorMsg = generateError('Заполните поле');
// 				field.closest('.js-form-site-check').classList.add('error');
// 				// field.parentElement.after(errorMsg);
// 			}
// 		});

// 		// var idRecaptcha = btn.closest('form').querySelector('.g-recaptcha').getAttribute('data-widget');

// 		// console.log('idRecaptcha = ', idRecaptcha);
// 		// var response = grecaptcha.getResponse(idRecaptcha);
// 		// var captcha = btn.closest('form').querySelector('.js-form-site-captcha');

// 		// if(response.length == 0) {
// 		// 	var errorMsg = generateError('Пройдите проверку');
// 		// 	captcha.classList.add('error');
// 		// 	captcha.append(errorMsg);
// 		// }

// 		if(form.querySelectorAll('.error').length === 0){
// 			// form.submit();
// 			// form.reset();
// 			// Fancybox.close();
// 			// Fancybox.show([{ src: "#msg-success", type: "inline" }]);
// 			// let url = form.getAttribute('action');
// 			// const formData=new FormData(form);
// 			// formData.append('web_form_submit', 'Отправить');

// 			// sendForm(url, formData, function(){
// 			// 	form.reset();
// 			// });

// 		}else{
// 			e.preventDefault();
// 		}
// 	};
// });

// var successTitle = document.querySelector('.js-success-alert-title').innerHTML;
// var successText = document.querySelector('.js-success-alert-text').innerHTML;

// document.addEventListener('openSuccessPopupForm',function(e){
// 	let curSuccessTitle = e.target.activeElement.closest('.js-valid-form').getAttribute('data-title');
// 	let curSsuccessText = e.target.activeElement.closest('.js-valid-form').getAttribute('data-text');

// 	if(curSuccessTitle){
// 		document.querySelector('.js-success-alert-title').innerHTML = curSuccessTitle;
// 	}else{
// 		document.querySelector('.js-success-alert-title').innerHTML = successTitle;
// 	}

// 	if(curSsuccessText){
// 		document.querySelector('.js-success-alert-text').innerHTML = curSsuccessText;
// 	}else{
// 		document.querySelector('.js-success-alert-text').innerHTML = successText;
// 	}

// 	Fancybox.close();
// 	Fancybox.show([{ src: "#msg-success", type: "inline" }]);
// });