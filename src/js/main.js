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
		// loop: true,
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
			// loop: true,
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
		// loop: true,
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
		// loop:true,
		navigation: {
			nextEl: '.js-news-slider-next',
			prevEl: '.js-news-slider-prev',
		},
	});
}

// Слайдер сравнения
function compareSlider() {
	const topSlider = new Swiper('.js-compare-slider',
	{
		modules: [Navigation],
		slidesPerView: 2,
		spaceBetween: 4,
		// loop:true,
		navigation: {
			nextEl: '.js-compare-slider-next',
			prevEl: '.js-compare-slider-prev',
		},
		breakpoints: {
			1280: {
				slidesPerView: 3,
				spaceBetween: 22,
			},
			992: {
				slidesPerView: 2,
				spaceBetween: 22,
			},
		},
	});
}

if(document.querySelector('.js-compare-slider')){
	compareSlider();
}


// // Маска для телефона
// document.addEventListener("DOMContentLoaded", function(){
// 	if(document.querySelector('.js-phone')){
// 		Inputmask('+7 (999) 999-9999').mask('.js-phone');
// 	}
// });

//Меню на десктопе
document.addEventListener('DOMContentLoaded', function() {
	const catalogMenu = document.querySelector('.js-catalog-menu-column');
	if (!catalogMenu) return;

	const allItems = catalogMenu.querySelectorAll('.js-catalog-menu-column-item');
	const allSections = catalogMenu.querySelectorAll('.js-catalog-menu-column-sect');
	const allSubsections = catalogMenu.querySelectorAll('.js-catalog-menu-column-sub');
	
	let activeItems = new Map();

	// Обработчик для всех элементов меню
	allItems.forEach(item => {
		item.addEventListener('mouseenter', function() {
			const currentLevel = getCurrentLevel(this);
			const itemId = this.getAttribute('data-id-item');
			
			// Сбрасываем активные элементы на ТЕКУЩЕМ уровне
			resetCurrentLevelItems(currentLevel);
			
			// Сбрасываем уровни НИЖЕ текущего
			resetLevelsBelow(currentLevel);
			
			// Активируем текущий элемент
			this.classList.add('active');
			activeItems.set(currentLevel, this);
			
			// Показываем следующий уровень
			showNextLevel(currentLevel, itemId);
		});
	});

	// Сброс при выходе из меню
	catalogMenu.addEventListener('mouseleave', function() {
		resetAll();
	});

	// Функция для получения текущего уровня элемента
	function getCurrentLevel(element) {
		const section = element.closest('.js-catalog-menu-column-sect');
		return section ? parseInt(section.getAttribute('data-level')) : 1;
	}

	// Функция для показа следующего уровня
	function showNextLevel(currentLevel, itemId) {
		const nextLevel = currentLevel + 1;
		const nextLevelSection = catalogMenu.querySelector(`.js-catalog-menu-column-sect[data-level="${nextLevel}"]`);
		
		if (!nextLevelSection) return;
		
		// Показываем следующий уровень
		nextLevelSection.classList.add('active');
		
		// Показываем соответствующий подраздел
		const targetSub = nextLevelSection.querySelector(`[data-id-sub="${itemId}"]`);
		if (targetSub) {
			targetSub.classList.add('active');
		}
	}

	// Функция для сброса активных элементов на текущем уровне
	function resetCurrentLevelItems(level) {
		const currentLevelSection = catalogMenu.querySelector(`.js-catalog-menu-column-sect[data-level="${level}"]`);
		if (currentLevelSection) {
			currentLevelSection.querySelectorAll('.js-catalog-menu-column-item.active').forEach(item => {
				item.classList.remove('active');
			});
		}
	}

	// Функция для сброса уровней НИЖЕ указанного
	function resetLevelsBelow(level) {
		allSections.forEach(section => {
			const sectionLevel = parseInt(section.getAttribute('data-level'));
			if (sectionLevel > level) {
				section.classList.remove('active');
				
				// Сбрасываем подразделы в этой секции
				section.querySelectorAll('.js-catalog-menu-column-sub').forEach(sub => {
					sub.classList.remove('active');
				});
				
				// Сбрасываем активные элементы в этой секции
				section.querySelectorAll('.js-catalog-menu-column-item').forEach(item => {
					item.classList.remove('active');
				});
				
				// Удаляем из активных элементов
				if (activeItems.has(sectionLevel)) {
					activeItems.delete(sectionLevel);
				}
			}
		});
	}

	// Функция для полного сброса
	function resetAll() {
		// Сбрасываем все секции кроме первой
		allSections.forEach(section => {
			const sectionLevel = parseInt(section.getAttribute('data-level'));
			if (sectionLevel !== 1) {
				section.classList.remove('active');
			}
		});
		
		// Сбрасываем все подразделы
		allSubsections.forEach(sub => sub.classList.remove('active'));
		
		// Сбрасываем все активные элементы
		allItems.forEach(item => item.classList.remove('active'));
		
		// Очищаем карту активных элементов
		activeItems.clear();
	}

	// Дополнительно: обработка наведения на секции для поддержания активного состояния
	allSections.forEach(section => {
		section.addEventListener('mouseenter', function() {
			const level = parseInt(this.getAttribute('data-level'));
			
			// Если это не первая секция, убедимся что предыдущие уровни активны
			if (level > 1) {
				ensurePreviousLevelsActive(level);
			}
		});
	});

	// Функция для обеспечения активности предыдущих уровней
	function ensurePreviousLevelsActive(currentLevel) {
		for (let level = 1; level < currentLevel; level++) {
			const section = catalogMenu.querySelector(`.js-catalog-menu-column-sect[data-level="${level}"]`);
			if (section && !section.classList.contains('active')) {
				section.classList.add('active');
				
				// Восстанавливаем активный элемент предыдущего уровня если он был
				if (activeItems.has(level)) {
					const activeItem = activeItems.get(level);
					if (activeItem && !activeItem.classList.contains('active')) {
						activeItem.classList.add('active');
					}
				}
			}
		}
	}

	// Обработка наведения на подразделы для поддержания активного состояния родительских элементов
	allSubsections.forEach(sub => {
		sub.addEventListener('mouseenter', function() {
			const parentSection = this.closest('.js-catalog-menu-column-sect');
			if (parentSection) {
				const level = parseInt(parentSection.getAttribute('data-level'));
				ensurePreviousLevelsActive(level);
			}
		});
	});
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
		
		fetch('?use_sort=Y&sort=' + s_catalog_val + '&order=' + s_catalog_order)
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

//Удаление из сравнения
// if(document.querySelector('.js-compare-item-close')){
// 	const compareElemClose = document.querySelectorAll('.js-compare-item-close');
// 	const compareList = document.getElementById('compare-list');

// 	// Обработчики кликов по кнопке удаления
// 	compareElemClose.forEach(item => {
// 		item.addEventListener('click', function() {
// 			if (compareList) {
// 				// Делаем AJAX запрос
// 				fetchCompareData();
// 			}
// 		});
// 	});

// 	// Функция для переподключения скриптов в блоке
// 	function reloadScriptsInContainer(container) {
// 		const scripts = container.querySelectorAll('script');
// 		const scriptPromises = [];
		
// 		scripts.forEach(oldScript => {
// 			const newScript = document.createElement('script');
			
// 			// Копируем все атрибуты
// 			Array.from(oldScript.attributes).forEach(attr => {
// 				newScript.setAttribute(attr.name, attr.value);
// 			});
			
// 			// Копируем содержимое для inline скриптов
// 			if (oldScript.innerHTML) {
// 				newScript.innerHTML = oldScript.innerHTML;
// 			}
			
// 			// Удаляем старый скрипт
// 			oldScript.remove();
			
// 			// Создаем promise для отслеживания загрузки
// 			const promise = new Promise((resolve, reject) => {
// 				if (newScript.src) {
// 					// Для внешних скриптов
// 					newScript.onload = resolve;
// 					newScript.onerror = reject;
// 				} else {
// 					// Для inline скриптов выполняем сразу
// 					resolve();
// 				}
// 				document.head.appendChild(newScript);
// 			});
			
// 			scriptPromises.push(promise);
// 		});
		
// 		return Promise.all(scriptPromises);
// 	}

// 	// Функция для AJAX запроса с переподключением скриптов
// 	function fetchCompareData() {
// 		// Показываем индикатор загрузки (опционально)
// 		compareList.classList.add('loading');
		
// 		fetch('?use_ajax=Y')
// 			.then(response => {
// 				if (!response.ok) {
// 					throw new Error('Network response was not ok');
// 				}
// 				return response.text();
// 			})
// 			.then(html => {
// 				// Сохраняем текущую позицию скролла (опционально)
// 				const scrollPosition = window.scrollY;
				
// 				// Обновляем содержимое
// 				compareList.innerHTML = html;
				
// 				// Слайдер сравнения
// 				compareSlider();

// 				// Обработчики кликов по кнопке удаления
// 				compareElemClose.forEach(item => {
// 					item.addEventListener('click', function() {
// 						if (compareList) {
// 							// Делаем AJAX запрос
// 							fetchCompareData();
// 						}
// 					});
// 				});
				
// 				// Переподключаем скрипты в обновленном блоке
// 				return reloadScriptsInContainer(compareList)
// 					.then(() => {
// 						// Восстанавливаем позицию скролла
// 						window.scrollTo(0, scrollPosition);
						
// 						// Убираем индикатор загрузки
// 						compareList.classList.remove('loading');
						
// 						console.log('Контент обновлен, скрипты переподключены');
						
// 						// // Вызываем кастомное событие для дополнительной инициализации
// 						// document.dispatchEvent(new CustomEvent('catalogUpdated', {
// 						// 	detail: {
// 						// 		// sort: s_catalog_val,
// 						// 		// order: s_catalog_order
// 						// 	}
// 						// }));
// 					});
// 			})
// 			.catch(error => {
// 				console.error('Ошибка при загрузке данных:', error);
// 				compareList.classList.remove('loading');
				
// 				// Показываем сообщение об ошибке (опционально)
// 				compareList.innerHTML = '<div class="error-message">Ошибка загрузки данных</div>';
// 			});
// 	}
// }




// Открыть.Закрыть многостросчный текст

document.addEventListener('DOMContentLoaded', function() {
	if(document.querySelector('.js-more-text-content')){
	const textMore = document.querySelectorAll('.js-more-text-content');

	textMore.forEach(content => {
		const maxLines = content.getAttribute('data-max-lines');
		const container = content.closest('.js-more-text');
		const btn = container.querySelector('.js-more-text-btn');

		let countLines = analyzeChildElements(content);

		content.setAttribute('data-lines', countLines + 5);

		if(countLines > maxLines){
			btn.classList.add('visible');
			content.style.webkitLineClamp = maxLines;
			content.style.lineClamp = maxLines;
			container.classList.add('truncated');
		}


		btn.addEventListener('click', function(){
			let secondText = this.getAttribute('data-text') || 'Свернуть';
			this.setAttribute('data-text', this.textContent);
			this.textContent = secondText;

			if(container.classList.contains('truncated')){
				content.style.webkitLineClamp = content.getAttribute('data-lines');
				content.style.lineClamp = content.getAttribute('data-lines');
				container.classList.remove('truncated');
			}else{
				content.style.lineClamp = maxLines;
				content.style.webkitLineClamp = maxLines;
				content.style.lineClamp = maxLines;
				container.classList.add('truncated');
			}
		})
	});
}
});


function analyzeChildElements(container) {
	// Получаем всех непосредственных детей контейнера
	const childElements = container.children;
	let sumLines = 0;

	// Анализируем каждый элемент
	for (let i = 0; i < childElements.length; i++) {
		const child = childElements[i];

		// Получаем высоту элемента
		const height = child.offsetHeight;
		
		// Получаем стили элемента
		const computedStyle = window.getComputedStyle(child);
		const lineHeight = parseInt(computedStyle.lineHeight) || parseInt(computedStyle.fontSize) * 1.2;

		// Рассчитываем количество строк
		const estimatedLines = Math.round(height / lineHeight);
		sumLines = sumLines + estimatedLines;
	}

	return sumLines;
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
		let items = tabs.querySelectorAll('.js-tabs-page-item');
		let countTab = tabs.getElementsByClassName('js-tabs-page-item').length;
		let curCountTab = 1;
		let prevArr = tabs.querySelector(".js-tabs-page-arr-prev");
		let nextArr = tabs.querySelector(".js-tabs-page-arr-next");
		let firstTab = tabs.querySelector('.js-tabs-page-item:first-child');
		let firstTabContent = tabs.querySelector('.js-tabs-page-content-item:first-child');
		let tabList = tabs.querySelector('.js-tabs-page-list');
		let widthTabList = tabList.offsetWidth;
		
		// let widthTabList = tabList.offsetWidth;

		let containerStyles = window.getComputedStyle(tabList);
		let gap = parseFloat(containerStyles.gap) || 0;

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
				let totalWidth = 0;

				items.forEach((item, index) => {
					totalWidth += item.offsetWidth;

					if (index < items.length - 1) {
						totalWidth += gap;
					}
				});

				curCountTab--;

				if(curCountTab < countTab){
					nextArr.classList.remove('disable');
				}

				if(curCountTab == 1){
					prevArr.classList.add('disable');
				}

				let curTab = activeTab.previousElementSibling;

				toggleTabs(curTab);

				let marginList = curTab.offsetLeft;

				// firstTab.style.marginLeft = firstTab.offsetWidth * (curCountTab - 1) * -1+'px';
				if(widthTabList + marginList < totalWidth){
					tabList.style.marginLeft = marginList * -1+'px';
				}else{
					marginList =  totalWidth - widthTabList;
					tabList.style.marginLeft = marginList * -1+'px';
				}
			}
		});

		//Перелистывание табов вправо
		nextArr.addEventListener("click", function(e){
			if (!e.target.classList.contains("disable") ) {
				let activeTab = tabs.querySelector('.js-tabs-page-item.active');
				let totalWidth = 0;

				items.forEach((item, index) => {
					totalWidth += item.offsetWidth;

					if (index < items.length - 1) {
						totalWidth += gap;
					}
				});

				curCountTab++;


				if(curCountTab > 1){
					prevArr.classList.remove('disable');
				}

				if(curCountTab == countTab){
					nextArr.classList.add('disable');
				}

				let curTab = activeTab.nextElementSibling;

				toggleTabs(curTab);
				// if(screenWidth < 768){
				// }else{
				// 	if(curCountTab == countTab-1){
				// 		nextArr.classList.add('disable');
				// 	}
				// }

				// let marginList = curTab.offsetWidth * (curCountTab - 1);
				let marginList = curTab.offsetLeft;

				if(widthTabList + marginList < totalWidth){
					tabList.style.marginLeft = marginList * -1+'px';
				}else{
					marginList =  totalWidth - widthTabList;
					tabList.style.marginLeft = marginList * -1+'px';
				}
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
		// loop: true,
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
					behavior: 'smooth',
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

