/*
 * CartonBox 1.3.3 by Const Lab, cartonbox.constlab.com
 */

(function($) {
	
	$.cartonbox = function(options) {
		
		// Настройки
		var settings = $.extend({
			// Options
			wrap: 'body',
			source: 'cartonbox',
			speed: 200,
			nav: 'dotted',
			cycle: false,
			
			// Callbacks
			onStartBefore: function() {},
			onStartAfter: function() {},
			onLoadBefore: function() {},
			onLoadAfter: function() {},
			onShowBefore: function() {},
			onShowNow: function() {},
			onShowAfter: function() {},
			onClosedBefore: function() {},
			onClosedAfter: function() {},
			onLeft: function() {},
			onRight: function() {},
			onError: function() { alert('Unable to load data!'); }
		}, options);
		
		// Оборачиваем весь контент в блок
		if (!$('.cartonbox-body').length) $(settings.wrap).wrapInner('<div class="cartonbox-body"></div>');
		
		// Добовляем бэк
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
			  '<div class="cartonbox-close">' +
				   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><polygon points="24.4,1.4 23.6,0.6 12.5,11.8 1.4,0.6 0.6,1.4 11.8,12.5 0.6,23.6 1.4,24.4 12.5,13.2 23.6,24.4 24.4,23.6 13.2,12.5"></polygon></svg>' +
			  '</div>' +
			  '<div class="cartonbox-prev"></div>' +
			  '<div class="cartonbox-next"></div>').insertAfter('.cartonbox-preloader');
		}
		
		// Ищем групповые ссылки
		// и добавляем индекс
		$('.' + settings.source).each(function() {
			if ($(this).data('cb-group') && !$(this).attr('data-cb-group-index')) {
				$('.' + settings.source + '[data-cb-group=' +  $(this).data('cb-group') + ']').each(function(i) {
					$(this).attr('data-cb-group-index', i);
				});
			}
		});
		
		// Запуск из Hash
		var cpHash = window.location.hash;
		if (cpHash != '' && cpHash != '#') {
			cpHash = cpHash.replace('#', '');
			if ($('.' + settings.source + '[data-cb-hash=' + cpHash + ']').length) {
				$('.cartonbox-body').data('cb-source', settings.source);
				cbFuncStart($('.' + settings.source + '[data-cb-hash=' + cpHash + ']'));
			}
		}
		
		// Работа по клику
		$('.' + settings.source).on('click', function() {
			$('.cartonbox-body').data('cb-source', settings.source);
			cbFuncStart($(this));
			return false;
		});
		
		// Работа по клику влево/вправо или при клике по навигации
		$('body').on('click', '.cartonbox-prev a, .cartonbox-next a, .cartonbox-nav li:not(.active) a', function() {
			if ($(this).parent().hasClass('cartonbox-prev')) settings.onLeft($(this));
			if ($(this).parent().hasClass('cartonbox-next')) settings.onRight($(this));
			
			// Загрузка контента
			cbFuncContent($(this));
			
			return false;
		});
		$('.cartonbox-wrap').on('click', '.cartonbox-nav .active a', function() {
			return false;
		});
		
		// Навигация по стрелкам
		$(window).on('keydown', function(e) {
			if ($('.cartonbox-on').length) {
				if (e.which == 37) { // left
					if ($('.cartonbox-prev a').length) {
						settings.onLeft($('.cartonbox-prev a'));
						cbFuncContent($('.cartonbox-prev a'));
					}
				} else if (e.which == 39) { // right
					if ($('.cartonbox-next a').length) {
						settings.onRight($('.cartonbox-next a'));
						cbFuncContent($('.cartonbox-next a'));
					}
				}
			}
		});
		
		// Функция первого запуска окна
		function cbFuncStart(cbThis) {
			settings.onStartBefore(cbThis);
			
			// Если на странице присутствовал хеш до запуска,
			// то сохраняем его
			if (!$('.cartonbox-body').data('cb-existing-hash')) {
				cpHash = window.location.hash;
				cpHash = cpHash.replace('#', '');
				$('.cartonbox-body').data('cb-existing-hash', cpHash);
			}
			
			// Делаем кишки неподвижными
			if (!$('.cartonbox-body').data('cb-top')) {
				var cbScrollTop = $(window).scrollTop();
				$('.cartonbox-body').data('cb-top', cbScrollTop).css({
					'position': 'fixed',
					'top': -cbScrollTop,
					'left': 0,
					'right': 0,
					'bottom': 0,
					'overflow': 'hidden'
				}).addClass('cartonbox-on');
			}
			
			// Показываем бэк
			$('.cartonbox-back').fadeIn(settings.speed);
			
			// Навигация
			if (cbThis.data('cb-group') && cbThis.data('cb-group') != '' && settings.nav == 'dotted') {
				var cbGroupTotal = $('.' + settings.source + '[data-cb-group=' +  cbThis.data('cb-group') + ']').not('.cartonbox-prev a, .cartonbox-next a, .cartonbox-nav a').length;
				if (cbGroupTotal > 1) {
					var cbNav = '';
					for (var i = 0; i < cbGroupTotal; i++) {
						var cbNavLink = $('.' + settings.source + '[data-cb-group=' + cbThis.data('cb-group') + '][data-cb-group-index=' + i + ']');
						var cbNavHref = cbNavLink.attr('href');
						var cbNavType = cbNavLink.data('cb-type');
						var cbNavCaption = cbNavLink.data('cb-caption');
						var cbNavHash = cbNavLink.data('cb-hash');
						var cbNavDesign = cbNavLink.data('cb-design');
						cbNav = cbNav + '<li><a href="' + cbNavHref + '" class="' + settings.source + '" data-cb-type="' + cbNavType + '" data-cb-group="' + cbThis.data('cb-group') + '" data-cb-group-index="' + i + '"' + (cbNavCaption && cbNavCaption !="" ? ' data-cb-caption="' + cbNavCaption + '"' : '') + '' + (cbNavHash && cbNavHash !="" ? ' data-cb-hash="' + cbNavHash + '"' : '') + '' + (cbNavDesign && cbNavDesign !="" ? ' data-cb-design="' + cbNavDesign + '"' : '') + '></a></li>';
					}
					$('.cartonbox-nav').html('<ul class="cartonbox-nav-dotted">' + cbNav + '</ul>');
					$('.cartonbox-nav').show();
				}
			}
			
			settings.onStartAfter(cbThis);
			
			// Загрузка контента
			cbFuncContent(cbThis);
		}
		
		// Функция загрузки контента
		function cbFuncContent(cbThis) {
			if ($('.cartonbox-body').data('cb-source') == settings.source) {
				cbFuncArrows(cbThis);
				
				// Переключаем на нужную позицию в навигации
				if ($('.cartonbox-nav-dotted').length) $('.cartonbox-nav-dotted li').removeClass('active').eq(cbThis.data('cb-group-index')).addClass('active');
				
				$('.cartonbox-content').hide().html('');
				cbFuncTypeClassDel();
				
				settings.onLoadBefore(cbThis);
				
				// Показываем прелоадер
				$('.cartonbox-preloader').show();
				
				// Link
				var cbHref = cbThis.attr('href');
				
				// Type
				var cbType = cbThis.data('cb-type');
				
				// Hash
				var cbHash = cbThis.data('cb-hash');
				if (cbHash && cbHash != '') window.history.replaceState(null, null, '#' + cbHash);
				else window.history.replaceState(null, null, '#');
				
				// Design
				var cbDesign = cbThis.data('cb-design');
				if (cbDesign && cbDesign != '') $('.cartonbox-wrap').addClass(cbDesign);
				
				if (cbType == 'inline') { // Inline
					if ($(cbHref).length) {
						$(cbHref).clone(true).prependTo('.cartonbox-content');
						$('.cartonbox-wrap').addClass('cartonbox-inline');
						cbFuncPreload(cbThis);
					} else {
						cbFuncEndLoad(cbThis);
						settings.onError(cbThis);
					}
				} else if (cbType == 'iframe') { // Iframe
					if (/ /.test(cbHref)) {
						$('.cartonbox-content').load(cbHref, function() {
							cbFuncPreload(cbThis);
							// тут неплохо бы ошибку вывести если контент не загрузился
						});
						$('.cartonbox-wrap').addClass('cartonbox-inline');
					} else {
						$('.cartonbox-content').html('<iframe src="' + cbHref + '" frameborder="0"></iframe>');
						cbFuncPreload(cbThis);
						$('.cartonbox-wrap').addClass('cartonbox-iframe');
					}
				} else if (cbType == 'img') { // Image
					$('.cartonbox-content').html('<img src="' + cbHref + '">');
					$('.cartonbox-wrap').addClass('cartonbox-img');
					cbFuncPreload(cbThis);
				}
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
				if ($(this).is('img')) cbImgArr.push($(this).attr('src'));
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
						$(cbNewImage).attr('src', cbImgArr[i]).on('error', function() {
							n++;
							if (cbArrCount == n) cbFuncEndLoad(cbThis);
							settings.onError(cbThis);
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
				if (cbThis.data('cb-group') && cbThis.data('cb-group') != '' && settings.nav == 'dotted') cbWrapPaddingTB = cbWrapPaddingTB + $('.cartonbox-nav').innerHeight();
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
			
			// Caption
			var cbCaption = cbThis.data('cb-caption');
			if (cbCaption && cbCaption != "") {
				var cbCaptionHash = /^#[\w-]+$/.test(cbCaption);
				if (cbCaptionHash && $(cbCaption).length) {
					$('<div class="cartonbox-caption"><div class="cartonbox-caption-text"></div></div>').appendTo('.cartonbox-content');
					$(cbCaption).clone(true).prependTo('.cartonbox-caption-text');
				} else $('<div class="cartonbox-caption"><div class="cartonbox-caption-text">' + cbCaption + '</div></div>').appendTo('.cartonbox-content');
			}
			
			$('.cartonbox-content').show();
			$('.cartonbox-container').width('').height('');
			if (!$('.cartonbox-wrap:visible').length) {
				$('.cartonbox-wrap, .cartonbox-close').fadeIn(settings.speed, function() {
					settings.onShowAfter(cbThis);
				});
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
			if (cbThis.data('cb-group')) {
				var cbGroupTotal = $('.' + settings.source + '[data-cb-group=' +  cbThis.data('cb-group') + ']').not('.cartonbox-prev a, .cartonbox-next a, .cartonbox-nav a').length;
				if ((cbThis.data('cb-group-index') != 0 || settings.cycle) && cbGroupTotal > 1) {
					var cbPrev = $('.' + settings.source + '[data-cb-group=' + cbThis.data('cb-group') + '][data-cb-group-index=' + (cbThis.data('cb-group-index') * 1 - 1) + ']');
					var cbPrevIndex = cbThis.data('cb-group-index') * 1 - 1;
					if (cbThis.data('cb-group-index') == 0) {
						cbPrev = $('.' + settings.source + '[data-cb-group=' + cbThis.data('cb-group') + '][data-cb-group-index=' + (cbGroupTotal - 1) + ']');
						cbPrevIndex = cbGroupTotal - 1;
					}
					var cbPrevHref = cbPrev.attr('href');
					var cbPrevType = cbPrev.data('cb-type');
					var cbPrevCaption = cbPrev.data('cb-caption');
					var cbPrevHash = cbPrev.data('cb-hash');
					var cbPrevDesign = cbPrev.data('cb-design');
					$('.cartonbox-prev').html('<a href="' + cbPrevHref + '" class="' + settings.source + '" data-cb-type="' + cbPrevType + '" data-cb-group="' + cbThis.data('cb-group') + '" data-cb-group-index="' + cbPrevIndex + '"' + (cbPrevCaption && cbPrevCaption !="" ? ' data-cb-caption="' + cbPrevCaption + '"' : '') + '' + (cbPrevHash && cbPrevHash !="" ? ' data-cb-hash="' + cbPrevHash + '"' : '') + '' + (cbPrevDesign && cbPrevDesign !="" ? ' data-cb-design="' + cbPrevDesign + '"' : '') + '><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 55"><polygon points="23.7,54.3 24.6,53.7 1.5,26.5 24.6,1.3 23.7,0.7 0.3,26.5"></polygon></svg></a>');
					if ($('.cartonbox-wrap:visible').length) $('.cartonbox-prev').show();
				} else $('.cartonbox-prev').html('').hide();
				if ((cbThis.data('cb-group-index') != (cbGroupTotal - 1) || settings.cycle) && cbGroupTotal > 1) {
					var cbNext = $('.' + settings.source + '[data-cb-group=' + cbThis.data('cb-group') + '][data-cb-group-index=' + (cbThis.data('cb-group-index') * 1 + 1) + ']');
					var cbNextIndex = cbThis.data('cb-group-index') * 1 + 1;
					if (cbThis.data('cb-group-index') == cbGroupTotal - 1) {
						cbNext = $('.' + settings.source + '[data-cb-group=' + cbThis.data('cb-group') + '][data-cb-group-index=0]');
						cbNextIndex = 0;
					}
					var cbNextHref = cbNext.attr('href');
					var cbNextType = cbNext.data('cb-type');
					var cbNextCaption = cbNext.data('cb-caption');
					var cbNextHash = cbNext.data('cb-hash');
					var cbNextDesign = cbNext.data('cb-design');
					$('.cartonbox-next').html('<a href="' + cbNextHref + '" class="' + settings.source + '" data-cb-type="' + cbNextType + '" data-cb-group="' + cbThis.data('cb-group') + '" data-cb-group-index="' + cbNextIndex + '"' + (cbNextCaption && cbNextCaption !="" ? ' data-cb-caption="' + cbNextCaption + '"' : '') + '' + (cbNextHash && cbNextHash !="" ? ' data-cb-hash="' + cbNextHash + '"' : '') + '' + (cbNextDesign && cbNextDesign !="" ? ' data-cb-design="' + cbNextDesign + '"' : '') + '><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 55"><polygon points="1.4,54.3 0.6,53.7 23.1,26.5 0.6,1.3 1.4,0.7 24.3,26.5"></polygon></svg></a>');
					if ($('.cartonbox-wrap:visible').length) $('.cartonbox-next').show();
				} else $('.cartonbox-next').html('').hide();
			}
		}
		
		// Функция удаления классов соответствующих типу загруженного контента
		function cbFuncTypeClassDel() {
			$('.cartonbox-wrap').removeAttr('class').addClass('cartonbox-wrap');
		}
		
		// Функция закрытия модального окна
		function cbFuncClosed() {
			settings.onClosedBefore();
				
			// Скрываем бэк и прелоадер
			$('.cartonbox-back, .cartonbox-close, .cartonbox-prev, .cartonbox-next').fadeOut(settings.speed);
			$('.cartonbox-preloader').hide();
			$('.cartonbox-body').removeClass('cartonbox-on');
			
			// Удаляем hash
			if (window.location.hash != '') window.history.replaceState(null, null, '#');
			if ($('.cartonbox-body').data('cb-existing-hash') != '') {
				var cbHash = $('.cartonbox-body').data('cb-existing-hash');
				if (!$('.' + settings.source + '[data-cb-hash=' + cbHash + ']').length) window.history.replaceState(null, null, '#' + $('.cartonbox-body').data('cb-existing-hash'));
			}
			
			// Скрываем модальное окно
			$('.cartonbox-wrap').fadeOut(settings.speed, function() {
				$('.cartonbox-nav').hide();
				
				// Удаляем все из контентной части
				cbFuncTypeClassDel();
				$('.cartonbox-content, .cartonbox-prev, .cartonbox-next, .cartonbox-nav').html('');
				
				// Убираем лишние стили
				$('.cartonbox-wrap, .cartonbox-container').removeAttr('style');
				
				// Делаем кишки подвижными
				var cbScrollTop = $('.cartonbox-body').data('cb-top') * 1;
				$('.cartonbox-body').removeData('cb-top').removeData('cb-source').removeData('cb-existing-hash').removeAttr('style');
				$(window).scrollTop(cbScrollTop);
				
				settings.onClosedAfter();
			});
			
		}
		
		// Закрытие модального окна
		$('.cartonbox-back, .cartonbox-preloader, .cartonbox-wrap, .cartonbox-flex, .cartonbox-item, .cartonbox-close, .cartonbox-close svg, .cartonbox-close polygon, .cartonbox-nav').on('click', function(e) {
			if (e.target == this && $('.cartonbox-body').data('cb-source') == settings.source) cbFuncClosed();
		});
		
		// Закрытие модального окна по клавише Esc
		$(window).on('keydown', function(e) {
			if ($('.cartonbox-on').length) {
				if (e.which == 27) cbFuncClosed();
			}
		});
		
	};

})(jQuery);