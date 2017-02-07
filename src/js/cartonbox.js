(function($) {
	'use strict';

	// Методы
	var methods = {

		// Инициализация
		init: function(options) {

			// Настройка
			var settings = $.extend({
				// Опции
				wrap:        'body',
				speed:       200,
				nav:         'dotted',
				cycle:       false,
				preload:     true,
				historyPush: false,
				closeHtml:   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><polygon points="24.4,1.4 23.6,0.6 12.5,11.8 1.4,0.6 0.6,1.4 11.8,12.5 0.6,23.6 1.4,24.4 12.5,13.2 23.6,24.4 24.4,23.6 13.2,12.5"></polygon></svg>',
				prevHtml:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 55"><polygon points="23.7,54.3 24.6,53.7 1.5,26.5 24.6,1.3 23.7,0.7 0.3,26.5"></polygon></svg>',
				nextHtml:    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 55"><polygon points="1.4,54.3 0.6,53.7 23.1,26.5 0.6,1.3 1.4,0.7 24.3,26.5"></polygon></svg>',

				// Функции обратного вызова
				onStartBefore:  function() {},
				onStartAfter:   function() {},
				onLoadBefore:   function() {},
				onLoadAfter:    function() {},
				onShowBefore:   function() {},
				onShowNow:      function() {},
				onShowAfter:    function() {},
				onClosedBefore: function() {},
				onClosedAfter:  function() {},
				onLeft:         function() {},
				onRight:        function() {}
			}, options);

			// Оборачиваем весь контент в блок
			if (!$('.cartonbox-body').length) $(settings.wrap).wrapInner('<div class="cartonbox-body"></div>');

			// Добавляем бэк
			if (!$('.cartonbox-back').length) $('<div class="cartonbox-back"></div>').insertAfter('.cartonbox-body');

			// Добовляем анимацию загрузки
			if (!$('.cartonbox-preloader').length) $('<div class="cartonbox-preloader"></div>').insertAfter('.cartonbox-back');

			// Добавляем обертку для модального окна,
			// блок для контента,
			// кнопку закрытия
			// стрелки влево-вправо
			// и навигацию
			if (!$('.cartonbox-wrap').length) {
				$('<div class="cartonbox-wrap">' +
					   '<div class="cartonbox-flex">' +
						   '<div class="cartonbox-item">' +
							   '<div class="cartonbox-container">' +
								   '<div class="cartonbox-content"></div>' +
							   '</div>' +
						   '</div>' +
						   '<div class="cartonbox-nav"></div>' +
					   '</div>' +
				  '</div>' +
				  '<div class="cartonbox-close">' + settings.closeHtml + '</div>' +
				  '<div class="cartonbox-prev"></div>' +
				  '<div class="cartonbox-next"></div>').insertAfter('.cartonbox-preloader');
			}

			// Ищем групповые ссылки
			// и добавляем индекс
			$('.cartonbox').each(function() {
				if ($(this).attr('data-cb-group') && !$(this).attr('data-cb-group-index')) {
					$('.cartonbox[data-cb-group=' +  $(this).attr('data-cb-group') + ']').each(function(i) {
						$(this).attr('data-cb-group-index', i);
					});
				}
			});

			// Запуск из хеша
			var cpHash = window.location.hash;
			if (cpHash != '' && cpHash != '#') {
				cpHash = cpHash.replace('#', '');
				if ($('.cartonbox[data-cb-hash=' + cpHash + ']').length) {
					cbFuncStart($('.cartonbox[data-cb-hash=' + cpHash + ']'));
				}
			}

			// Удаляем пространство имен
			$('body, .cartonbox-back, .cartonbox-preloader, .cartonbox-wrap, .cartonbox-flex, .cartonbox-item, .cartonbox-close, .cartonbox-close svg, .cartonbox-close polygon, .cartonbox-nav').unbind('.onClick');
			$(window).unbind('.onClick');

			// Обработчик по клику
			$('body').on('click.onClick', '.cartonbox-body .cartonbox, .cartonbox-content .cartonbox', function() {
				cbFuncStart($(this));
				return false;
			});

			// Обработчик по клику влево/вправо или при клике по навигации
			$('body').on('click.onClick', '.cartonbox-prev a, .cartonbox-next a, .cartonbox-nav li:not(.active) a', function() {
				if ($(this).parent().hasClass('cartonbox-prev')) settings.onLeft($(this));
				if ($(this).parent().hasClass('cartonbox-next')) settings.onRight($(this));

				// Загрузка контента
				cbFuncContent($(this));

				return false;
			});
			$('.cartonbox-wrap').on('click.onClick', '.cartonbox-nav .active a', function() {
				return false;
			});

			// Навигация по стрелкам
			$(window).on('keydown.onClick', function(e) {
				if ($('.cartonbox-body').data('cb-top') != undefined && !$(':input:focus').length) {
					// Влево
					if (e.which == 37) {
						if ($('.cartonbox-prev a').length) {
							settings.onLeft($('.cartonbox-prev a'));
							cbFuncContent($('.cartonbox-prev a'));
						}

					// Вправо
					} else if (e.which == 39) {
						if ($('.cartonbox-next a').length) {
							settings.onRight($('.cartonbox-next a'));
							cbFuncContent($('.cartonbox-next a'));
						}
					}
				}
			});

			// Функция работы с историей
			function cbFuncHistory(data, title, url) {
				if (settings.historyPush) window.history.pushState(data, title, url);
				else window.history.replaceState(data, title, url);
			}

			// Функция построения навигации
			function cbFuncNav(cbThis) {
				if (cbThis.attr('data-cb-group') && cbThis.attr('data-cb-group') != '' && settings.nav == 'dotted') {
					var cbGroupTotal = $('.cartonbox[data-cb-group=' +  cbThis.attr('data-cb-group') + ']').not('.cartonbox-prev a, .cartonbox-next a, .cartonbox-nav a').length;
					if (cbGroupTotal > 1) {
						var cbNav = '';
						for (var i = 0; i < cbGroupTotal; i++) {
							var cbNavLink = $('.cartonbox[data-cb-group=' + cbThis.attr('data-cb-group') + '][data-cb-group-index=' + i + ']');
							var cbNavHref = cbNavLink.attr('href');
							var cbNavType = cbNavLink.attr('data-cb-type');
							var cbNavCaption = cbNavLink.attr('data-cb-caption');
							var cbNavHash = cbNavLink.attr('data-cb-hash');
							var cbNavDesign = cbNavLink.attr('data-cb-design');
							var cbNavFragment = cbNavLink.attr('data-cb-fragment');
							var cbNavOptions = cbNavLink.attr('data-cb-options');
							cbNav = cbNav + '<li><a href="' + cbNavHref + '" class="cartonbox" data-cb-type="' + cbNavType + '" data-cb-group="' + cbThis.attr('data-cb-group') + '" data-cb-group-index="' + i + '"' + (cbNavCaption && cbNavCaption !="" ? ' data-cb-caption="' + cbNavCaption + '"' : '') + '' + (cbNavHash && cbNavHash !="" ? ' data-cb-hash="' + cbNavHash + '"' : '') + '' + (cbNavDesign && cbNavDesign !="" ? ' data-cb-design="' + cbNavDesign + '"' : '') + '' + (cbNavOptions && cbNavOptions !="" ? ' data-cb-options="' + cbNavOptions + '"' : '') + '' + (cbNavFragment && cbNavFragment !="" ? ' data-cb-fragment="' + cbNavFragment + '"' : '') + '></a></li>';
						}
						$('.cartonbox-nav').html('<ul class="cartonbox-nav-dotted">' + cbNav + '</ul>');
						$('.cartonbox-nav').show();
					}
				}
			}

			// Функция первого запуска окна
			function cbFuncStart(cbThis) {
				if ($('.cartonbox-body').data('cb-top') == undefined) {
					settings.onStartBefore(cbThis);

					// Если на странице присутствовал хеш до запуска,
					// то сохраняем его
					if ($('.cartonbox-body').data('cb-existing-hash') == undefined) {
						cpHash = window.location.hash;
						cpHash = cpHash.replace('#', '');
						$('.cartonbox-body').data('cb-existing-hash', cpHash);
					}

					// Делаем кишки неподвижными
					if ($('.cartonbox-body').data('cb-top') == undefined) {
						var cbScrollTop = $(window).scrollTop();
						$('.cartonbox-body').data('cb-top', cbScrollTop).css({
							'position': 'fixed',
							'top': -cbScrollTop,
							'left': 0,
							'right': 0,
							'bottom': 0,
							'overflow': 'hidden'
						});
					}

					// Показываем бэк
					$('.cartonbox-back').fadeIn(settings.speed);

					// Навигация
					cbFuncNav(cbThis);

					settings.onStartAfter(cbThis);
				}

				// Загрузка контента
				cbFuncContent(cbThis);
			}

			// Функция загрузки контента
			function cbFuncContent(cbThis) {
				cbFuncArrows(cbThis);

				// Обновление навигации если был рефреш
				var cbGroupTotal = $('.cartonbox[data-cb-group=' +  cbThis.attr('data-cb-group') + ']').not('.cartonbox-prev a, .cartonbox-next a, .cartonbox-nav a').length;
				var cbNavTotal = $('.cartonbox-nav li').length;
				if (cbGroupTotal > cbNavTotal) cbFuncNav(cbThis);

				// Переключаем на нужную позицию в навигации
				if ($('.cartonbox-nav-dotted').length) $('.cartonbox-nav-dotted li').removeClass('active').eq(cbThis.attr('data-cb-group-index')).addClass('active');

				// Возвращаем содержимое на место если оно было вырезано
				if ($('.cartonbox-mark').length) {
					var mark = $('.cartonbox-mark').attr('data-cb-mark');
					$('.cartonbox-content').find(mark).prependTo('.cartonbox-mark');
					$('.cartonbox-mark').children().unwrap();
				}

				// Чистим лишнее
				$('.cartonbox-content').hide().html('');
				$('.cartonbox-wrap').removeAttr('class data-cb-options').addClass('cartonbox-wrap');

				// Опции
				var cbOptions = cbThis.attr('data-cb-options');
				if (cbOptions && cbOptions != '') $('.cartonbox-wrap').attr('data-cb-options', cbOptions);

				settings.onLoadBefore(cbThis);

				// Показываем прелоадер
				$('.cartonbox-preloader').show();

				// Ссылка
				var cbHref = cbThis.attr('href');

				// Тип контента
				var cbType = cbThis.attr('data-cb-type');

				// Хеш
				var cbHash = cbThis.attr('data-cb-hash');
				if (cbHash && cbHash != '') cbFuncHistory(null, null, '#' + cbHash);
				else cbFuncHistory(null, null, ' ');

				// Дизайн
				var cbDesign = cbThis.attr('data-cb-design');
				if (cbDesign && cbDesign != '') $('.cartonbox-wrap').addClass(cbDesign);

				// Фрагмент
				var cbFragment = cbThis.attr('data-cb-fragment');

				// Inline
				if (cbType == 'inline') {
					if ($(cbHref).length) {
						$(cbHref).wrap('<div class="cartonbox-mark" data-cb-mark="' + cbHref + '"></div>');
						$(cbHref).prependTo('.cartonbox-content');
						$('.cartonbox-wrap').addClass('cartonbox-inline');
						if (settings.preload) cbFuncPreload(cbThis);
						else cbFuncEndLoad(cbThis);
					} else {
						cbFuncEndLoad(cbThis);
						$.error('Unable to load data!');
					}

				// Iframe
				} else if (cbType == 'iframe') {
					if (/ /.test(cbHref) || (cbFragment && cbFragment != '')) {
						if (cbFragment) cbHref = cbHref + ' ' + cbFragment;
						$('.cartonbox-content').load(cbHref, function() {
							if (settings.preload) cbFuncPreload(cbThis);
							else cbFuncEndLoad(cbThis);
						});
						$('.cartonbox-wrap').addClass('cartonbox-inline');
					} else {
						$('.cartonbox-content').html('<iframe src="' + cbHref + '" frameborder="0"></iframe>');
						cbFuncPreload(cbThis);
						$('.cartonbox-wrap').addClass('cartonbox-iframe');
					}

				// Image
				} else if (cbType == 'img') {
					$('.cartonbox-content').html('<img src="' + cbHref + '">');
					$('.cartonbox-wrap').addClass('cartonbox-img');
					cbFuncPreload(cbThis);
				}
			}

			// Функция предварительной загрузки окна
			function cbFuncPreload(cbThis) {
				// Создаем массивы со списком загрузок
				var cbImgArr = new Array();
				var cbIframeArr = new Array();

				// Добавляем в массив загружаемые элементы
				$('.cartonbox-container, .cartonbox-container *').each(function() {
					if ($(this).css('background-image') != 'none') {
						var string = $(this).css('background-image');
						if (/url\(/i.test(string)) {
							string = string.replace(/^(url\()?\"?\'?/i, '');
							string = string.replace(/\"?\'?\)?$/i, '');
							cbImgArr.push(string);
						}
					}
					if ($(this).is('img[src]')) cbImgArr.push($(this).attr('src'));
					if ($(this).is('iframe')) cbIframeArr.push($(this));
				});

				// Общее кол-во загружаемых элементов
				var cbArrCount = cbImgArr.length + cbIframeArr.length;

				// Прогружаем все заранее и показываем попап
				if (cbArrCount > 0) {
					var n = 0;
					if (cbImgArr.length > 0) {
						for (var i = 0; i < cbImgArr.length; i++) {
							var cbNewImage = new Image();
							$(cbNewImage).attr('src', (/^https:/.test(cbImgArr[i]) ? 'https:' : (/^http:/.test(cbImgArr[i]) ? 'http:' : '')) + cbImgArr[i].replace(/^http(s)?:/i, '')).on('error', function() {
								n++;
								if (cbArrCount == n) cbFuncEndLoad(cbThis);
								$.error('Unable to load data!');
							}).load(function() {
								n++;
								if (cbArrCount == n) cbFuncEndLoad(cbThis, cbNewImage.naturalWidth, cbNewImage.naturalHeight);
							});
						}
					}
					if (cbIframeArr.length > 0) {
						for (var i = 0; i < cbIframeArr.length; i++) {
							$(cbIframeArr[i]).load(function() {
								n++;
								if (cbArrCount == n) cbFuncEndLoad(cbThis);
							});
						}
					}
				} else cbFuncEndLoad(cbThis);
			}

			// Действия после полной загрузки содержимого
			function cbFuncEndLoad(cbThis, cbImgW, cbImgH) {
				settings.onLoadAfter(cbThis);
				settings.onShowBefore(cbThis);

				// Скрываем прелоадер
				$('.cartonbox-preloader').hide();

				// Делаем картинку видной целиком
				if ($('.cartonbox-wrap').hasClass('cartonbox-img')) {
					// Соотношение сторон
					var cbWrapPaddingTB = $('.cartonbox-flex').css('padding-top').replace(/px/i, '') * 1 + $('.cartonbox-flex').css('padding-bottom').replace(/px/i, '') * 1;
					var cbWrapPaddingLR = $('.cartonbox-wrap').css('padding-left').replace(/px/i, '') * 1 + $('.cartonbox-wrap').css('padding-right').replace(/px/i, '') * 1;
					if (cbThis.attr('data-cb-group') && cbThis.attr('data-cb-group') != '' && settings.nav == 'dotted') cbWrapPaddingTB = cbWrapPaddingTB + $('.cartonbox-nav').innerHeight();
					var cbImgRatio = cbImgH / cbImgW;
					if (cbImgW + cbWrapPaddingLR >= $(window).width()) {
						cbImgW = $(window).width() - cbWrapPaddingLR;
						cbImgH = cbImgW * cbImgRatio;
						if (cbImgH > $(window).height() - cbWrapPaddingTB) {
							cbImgW = ($(window).height() - cbWrapPaddingTB) / cbImgRatio;
							cbImgH = cbImgW * cbImgRatio;
						}
					} else if (cbImgH + cbWrapPaddingTB >= $(window).height()) {
						cbImgH = $(window).height() - cbWrapPaddingTB;
						cbImgW = cbImgH / cbImgRatio;
						if (cbImgW > $(window).width() - cbWrapPaddingLR) cbImgW = $(window).width() - cbWrapPaddingLR;
					}
					$('.cartonbox-content img').attr({'width': Math.ceil(cbImgW), 'height': Math.ceil(cbImgH)});
					$('.cartonbox-wrap').css('width', cbImgW + cbWrapPaddingLR);
				} else $('.cartonbox-wrap').css('width', '');

				// Подпись
				var cbCaption = cbThis.attr('data-cb-caption');
				if (cbCaption && cbCaption != "") {
					var cbCaptionHash = /^#[\w-]+$/.test(cbCaption);
					if (cbCaptionHash && $(cbCaption).length) {
						$('<div class="cartonbox-caption"><div class="cartonbox-caption-text"></div></div>').appendTo('.cartonbox-content');
						$(cbCaption).wrap('<div class="cartonbox-mark" data-cb-mark="' + cbCaption + '"></div>');
						$(cbCaption).prependTo('.cartonbox-caption-text');
					} else $('<div class="cartonbox-caption"><div class="cartonbox-caption-text">' + cbCaption + '</div></div>').appendTo('.cartonbox-content');
				}

				// Показываем
				$('.cartonbox-content').show();
				$('.cartonbox-container').width('').height('');
				if (!$('.cartonbox-wrap:visible').length) {
					$('.cartonbox-wrap').fadeIn(settings.speed, function() {
						settings.onShowAfter(cbThis);
					});
					$('.cartonbox-close').fadeIn(settings.speed);
					if ($('.cartonbox-prev a').length) $('.cartonbox-prev').fadeIn(settings.speed);
					if ($('.cartonbox-next a').length) $('.cartonbox-next').fadeIn(settings.speed);
					settings.onShowNow(cbThis);
				} else {
					settings.onShowNow(cbThis);
					settings.onShowAfter(cbThis);
				}
				$('.cartonbox-container').width($('.cartonbox-container').width()).height($('.cartonbox-container').height());
				$(window).scrollTop(0);
			}

			// Стрелки
			function cbFuncArrows(cbThis) {
				if (cbThis.attr('data-cb-group')) {
					var cbGroupTotal = $('.cartonbox[data-cb-group=' +  cbThis.attr('data-cb-group') + ']').not('.cartonbox-prev a, .cartonbox-next a, .cartonbox-nav a').length;

					// Предыдущее
					if ((cbThis.attr('data-cb-group-index') != 0 || settings.cycle) && cbGroupTotal > 1) {
						var cbPrev = $('.cartonbox[data-cb-group=' + cbThis.attr('data-cb-group') + '][data-cb-group-index=' + (cbThis.attr('data-cb-group-index') * 1 - 1) + ']');
						var cbPrevIndex = cbThis.attr('data-cb-group-index') * 1 - 1;
						if (cbThis.attr('data-cb-group-index') == 0) {
							cbPrev = $('.cartonbox[data-cb-group=' + cbThis.attr('data-cb-group') + '][data-cb-group-index=' + (cbGroupTotal - 1) + ']');
							cbPrevIndex = cbGroupTotal - 1;
						}
						var cbPrevHref = cbPrev.attr('href');
						var cbPrevType = cbPrev.attr('data-cb-type');
						var cbPrevCaption = cbPrev.attr('data-cb-caption');
						var cbPrevHash = cbPrev.attr('data-cb-hash');
						var cbPrevDesign = cbPrev.attr('data-cb-design');
						var cbPrevFragment = cbPrev.attr('data-cb-fragment');
						var cbPrevOptions = cbPrev.attr('data-cb-options');
						$('.cartonbox-prev').html('<a href="' + cbPrevHref + '" class="cartonbox" data-cb-type="' + cbPrevType + '" data-cb-group="' + cbThis.attr('data-cb-group') + '" data-cb-group-index="' + cbPrevIndex + '"' + (cbPrevCaption && cbPrevCaption !="" ? ' data-cb-caption="' + cbPrevCaption + '"' : '') + '' + (cbPrevHash && cbPrevHash !="" ? ' data-cb-hash="' + cbPrevHash + '"' : '') + '' + (cbPrevDesign && cbPrevDesign !="" ? ' data-cb-design="' + cbPrevDesign + '"' : '') + '' + (cbPrevOptions && cbPrevOptions !="" ? ' data-cb-options="' + cbPrevOptions + '"' : '') + '' + (cbPrevFragment && cbPrevFragment !="" ? ' data-cb-fragment="' + cbPrevFragment + '"' : '') + '>' + settings.prevHtml + '</a>');
						if ($('.cartonbox-wrap:visible').length) $('.cartonbox-prev').show();
					} else $('.cartonbox-prev').html('').hide();

					// Следующее
					if ((cbThis.attr('data-cb-group-index') != (cbGroupTotal - 1) || settings.cycle) && cbGroupTotal > 1) {
						var cbNext = $('.cartonbox[data-cb-group=' + cbThis.attr('data-cb-group') + '][data-cb-group-index=' + (cbThis.attr('data-cb-group-index') * 1 + 1) + ']');
						var cbNextIndex = cbThis.attr('data-cb-group-index') * 1 + 1;
						if (cbThis.attr('data-cb-group-index') == cbGroupTotal - 1) {
							cbNext = $('.cartonbox[data-cb-group=' + cbThis.attr('data-cb-group') + '][data-cb-group-index=0]');
							cbNextIndex = 0;
						}
						var cbNextHref = cbNext.attr('href');
						var cbNextType = cbNext.attr('data-cb-type');
						var cbNextCaption = cbNext.attr('data-cb-caption');
						var cbNextHash = cbNext.attr('data-cb-hash');
						var cbNextDesign = cbNext.attr('data-cb-design');
						var cbNextFragment = cbNext.attr('data-cb-fragment');
						var cbNextOptions = cbNext.attr('data-cb-options');
						$('.cartonbox-next').html('<a href="' + cbNextHref + '" class="cartonbox" data-cb-type="' + cbNextType + '" data-cb-group="' + cbThis.attr('data-cb-group') + '" data-cb-group-index="' + cbNextIndex + '"' + (cbNextCaption && cbNextCaption !="" ? ' data-cb-caption="' + cbNextCaption + '"' : '') + '' + (cbNextHash && cbNextHash !="" ? ' data-cb-hash="' + cbNextHash + '"' : '') + '' + (cbNextDesign && cbNextDesign !="" ? ' data-cb-design="' + cbNextDesign + '"' : '') + '' + (cbNextOptions && cbNextOptions !="" ? ' data-cb-options="' + cbNextOptions + '"' : '') + '' + (cbNextFragment && cbNextFragment !="" ? ' data-cb-fragment="' + cbNextFragment + '"' : '') + '>' + settings.nextHtml + '</a>');
						if ($('.cartonbox-wrap:visible').length) $('.cartonbox-next').show();
					} else $('.cartonbox-next').html('').hide();
				}
			}

			// Функция закрытия модального окна
			function cbFuncClosed() {
				settings.onClosedBefore();

				// Скрываем бэк и прелоадер
				$('.cartonbox-back, .cartonbox-close, .cartonbox-prev, .cartonbox-next').fadeOut(settings.speed);
				$('.cartonbox-preloader').hide();

				// Удаляем hash
				if (window.location.hash != '') cbFuncHistory(null, null, ' ');
				if ($('.cartonbox-body').data('cb-existing-hash') != '') {
					var cbHash = $('.cartonbox-body').data('cb-existing-hash');
					if (!$('.cartonbox[data-cb-hash=' + cbHash + ']').length) cbFuncHistory(null, null, '#' + $('.cartonbox-body').data('cb-existing-hash'));
				}

				// Скрываем модальное окно
				$('.cartonbox-wrap').fadeOut(settings.speed, function() {
					$('.cartonbox-nav').hide();

					// Возвращаем содержимое на место если оно было вырезано
					if ($('.cartonbox-mark').length) {
						var mark = $('.cartonbox-mark').attr('data-cb-mark');
						$('.cartonbox-content').find(mark).prependTo('.cartonbox-mark');
						$('.cartonbox-mark').children().unwrap();
					}

					// Удаляем все из контентной части
					$('.cartonbox-wrap').removeAttr('class data-cb-options').addClass('cartonbox-wrap');
					$('.cartonbox-content, .cartonbox-prev, .cartonbox-next, .cartonbox-nav').html('');

					// Убираем лишние стили
					$('.cartonbox-wrap, .cartonbox-container').removeAttr('style');

					// Делаем кишки подвижными
					var cbScrollTop = $('.cartonbox-body').data('cb-top') * 1;
					$('.cartonbox-body').removeData('cb-top cb-existing-hash').removeAttr('style');
					$(window).scrollTop(cbScrollTop);

					settings.onClosedAfter();
				});

			}

			// Закрытие модального окна
			$('.cartonbox-back, .cartonbox-preloader, .cartonbox-wrap, .cartonbox-flex, .cartonbox-item, .cartonbox-close, .cartonbox-close svg, .cartonbox-close use, .cartonbox-close polygon, .cartonbox-nav').on('click.onClick', function(e) {
				if (e.target == this) cbFuncClosed();
			});

			// Закрытие модального окна по клавише Esc
			$(window).on('keydown.onClick', function(e) {
				if ($('.cartonbox-body').data('cb-top') != undefined) {
					if (e.which == 27) cbFuncClosed();
				}
			});

		},

		// Обновление
		refresh: function() {

			// Удаляем индекс у групповых ссылок
			$('.cartonbox').not('.cartonbox-prev a, .cartonbox-next a, .cartonbox-nav a').removeAttr('data-cb-group-index');

			// Ищем групповые ссылки
			// и добавляем индекс
			$('.cartonbox').not('.cartonbox-prev a, .cartonbox-next a, .cartonbox-nav a').each(function() {
				if ($(this).attr('data-cb-group') && !$(this).attr('data-cb-group-index')) {
					$('.cartonbox[data-cb-group=' +  $(this).attr('data-cb-group') + ']').not('.cartonbox-prev a, .cartonbox-next a, .cartonbox-nav a').each(function(i) {
						$(this).attr('data-cb-group-index', i);
					});
				}
			});

		},

		// Деинициализация
		destroy: function() {

			// Удаляем индекс у групповых ссылок
			$('.cartonbox').removeAttr('data-cb-group-index');

			// Удаляем пространство имен
			$('body').unbind('.onClick');
			$(window).unbind('.onClick');

			// Удаляем только текущий блок, содержимое остается на месте
			$('.cartonbox-body').children().unwrap();

			// Удаляем все созданные блоки
			$('.cartonbox-back, .cartonbox-preloader, .cartonbox-wrap, .cartonbox-close, .cartonbox-prev, .cartonbox-next').remove();

		}

	};

	$.cartonbox = function(method) {
		if (methods[method]) return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		else if (typeof method == 'object' || !method) return methods.init.apply(this, arguments);
		else $.error('Method ' + method + ' not found!');
	};
})(jQuery);
