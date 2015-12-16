<?

if (isset($_GET['lang']) && $_GET['lang'] == 'en') $en = 1;
elseif (isset($_GET['lang']) && $_GET['lang'] == 'ru') $en = 0;
else {
	$langs  = array('en', 'ru');
	$lang   = explode(',', $_SERVER['HTTP_ACCEPT_LANGUAGE']);
	$locale = substr($lang[0], 0, 2);
	if (!in_array($locale, $langs)) $locale = $langs[0];
	if ($locale == 'en') header('Location: ?lang=en');
	$en = 0;
}

?>

<!doctype html>
<html lang="<?= (!$en ? 'ru' : 'en') ?>">
	<head>
		<meta charset="utf-8">
		<title><?= (!$en ? 'Картонбокс: правильные модальные окна' : 'CartonBox: correct modal windows') ?></title>
		<meta name="viewport" content="width=768">
		<link rel="stylesheet" href="css/cartonbox.min.css">
		<link rel="stylesheet" href="css/likely.css">
		<link rel="stylesheet" href="css/styles.css">
	</head>
	<body>
		<div class="wrapper">
			
			<div class="lang">
				<? if (!$en): ?>
					RU&nbsp; <a href="?lang=en">EN</a>
				<? else: ?>
					<a href="?lang=ru">RU</a> &nbsp;EN
				<? endif; ?>
			</div>
			
			<h1><?= (!$en ? 'Картонбокс' : 'CartonBox') ?></h1>
			<? if (!$en): ?>
				<p>Джейквери-плагин для вывода фотографий, блоков с&nbsp;контентом и&nbsp;айфреймов в&nbsp;красивых модальных окнах, которые можно группировать, создавая, например, фото- или видео галереи.</p>
				<p>Основное отличие от&nbsp;существующих подобных плагинов&nbsp;&mdash; правильная работа скролла на&nbsp;любых устройствах. При открытом модальном окне основное содержимое страницы, если оно имело полосу прокрутки, не&nbsp;прокручивается и&nbsp;никак не&nbsp;реагирует на&nbsp;изменение положения колеса мыши или на&nbsp;нажатие кнопок прокрутки на&nbsp;клавиатуре.</p>
			<? else: ?>
				<p>jQuery-powered plugin that can display photos, videos and text blocks content in&nbsp;beautiful modal windows.</p>
				<p>The main difference between existing similar plugins is&nbsp;correct scrolling on&nbsp;any device. Page body stay fixed till modal window opened and scrolled and does not react with mouse scroll and keyboard.</p>
			<? endif; ?>
			
			<? if (!$en): ?>
				<h2><a href="cartonbox-1.5.zip">Скачать архив</a></h2>
				<p class="gray">Версия 1.5 от 15 декабря 2015 года</p>
			<? else: ?>
				<h2><a href="cartonbox-1.5.zip">Download zip</a></h2>
				<p class="gray">Version 1.5 (12.15.2015)</p>
			<? endif; ?>
			
			<h2><?= (!$en ? 'Быстрый старт' : 'Quick start') ?></h2>
			<? if (!$en): ?>
				<p>Подключаем <em><a href="//jquery.com/">Джейквери</a></em> и&nbsp;<em><a href="cartonbox-1.5.zip">Картонбокс</a></em>:</p>
			<? else: ?>
				<p>Setting up&nbsp;<em><a href="//jquery.com/">jQuery</a></em> and&nbsp;<em><a href="cartonbox-1.5.zip">CartonBox</a></em>:</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;script src="<mark>jquery.min.js</mark>"&gt;&lt;/script&gt;</code>
				<code>&lt;script src="<mark>jquery.cartonbox.min.js</mark>"&gt;&lt;/script&gt;</code>
				<code>&lt;link rel="stylesheet" href="<mark>cartonbox.min.css</mark>"&gt;</code>
			</div>
			<? if (!$en): ?>
				<p>Добавляем к&nbsp;ссылке класс <code>.cartonbox</code> и,&nbsp;если это ссылка на&nbsp;картинку, параметр <code>data-cb-type="img"</code>:</p>
			<? else: ?>
				<p>Add class to&nbsp;a&nbsp;link <code>.cartonbox</code>, and if&nbsp;the link is&nbsp;to&nbsp;a&nbsp;picture, parameter <code>data-cb-type="img"</code>:</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;a href="image.jpg" <mark>class="cartonbox"</mark> <mark>data-cb-type="img"</mark>&gt;...&lt;/a&gt;</code>
			</div>
			<? if (!$en): ?>
				<p>Либо если это ссылка на&nbsp;блок с&nbsp;контентом или сторонний сайт, то&nbsp;параметры <code>data-cb-type="inline"</code> и&nbsp;<code>data-cb-type="iframe"</code>, соответственно:</p>
			<? else: ?>
				<p>If&nbsp;the link set to&nbsp;a&nbsp;content block or&nbsp;a&nbsp;third-party site, parameters <code>data-cb-type="inline"</code> and <code>data-cb-type="iframe"</code>, according to:</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;a href="#text" class="cartonbox" <mark>data-cb-type="inline"</mark>&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="//apple.com/" class="cartonbox" <mark>data-cb-type="iframe"</mark>&gt;...&lt;/a&gt;</code>
			</div>
			<? if (!$en): ?>
				<p>Для блока с&nbsp;контентом в&nbsp;теле ХТМЛ-страницы должен присутствовать элемент с&nbsp;<code>id="text"</code> (такой же&nbsp;как название ссылки без хештега) и&nbsp;содержимым, которое отобразится в&nbsp;модальном окне, например:</p>
			<? else: ?>
				<p>For a&nbsp;content block in&nbsp;the body of&nbsp;html-pages there should be&nbsp;an&nbsp;element with <code>id="text"</code> (the same as&nbsp;the name of&nbsp;the link without a&nbsp;hash tag) and the content that will be&nbsp;displayed in&nbsp;a&nbsp;modal window, for example:</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;div style="display: none;"&gt;</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div <mark>id="text"</mark>&gt;</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;... <?= (!$en ? 'ХТМЛ-код' : 'HTML code') ?> ...</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</code>
				<code>&lt;/div&gt;</code>
			</div>
			<? if (!$en): ?>
				<p>Инициализация:</p>
			<? else: ?>
				<p>Initialization:</p>
			<? endif; ?>
			<div class="code">
				<code>$(function() {</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>$.cartonbox();</mark></code>
				<code>});</code>
			</div>
			
			<h2><?= (!$en ? 'Параметры' : 'Parameters') ?></h2>
			
			<h3><?= (!$en ? 'Группировка' : 'Grouping') ?></h3>
			<? if (!$en): ?>
				<p>Чтобы модальные окна можно было листать, группе ссылок достаточно добавить параметр <code>data-cb-group="NAME"</code>, где значение <em>NAME</em> должно отличаться у&nbsp;разных групп.</p>
				<p>Например, фотогалерею можно создать так:</p>
			<? else: ?>
				<p>To&nbsp;cycle thru modal windows, it&nbsp;is&nbsp;enough to&nbsp;add parameter <code>data-cb-group="NAME"</code> to&nbsp;a&nbsp;group of&nbsp;links, where the value of&nbsp;<em>NAME</em> should be&nbsp;different for different groups.</p>
				<p>For example, you can create photo gallery this way:</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;a href="image-1.jpg" class="cartonbox" data-cb-type="img" <mark>data-cb-group="gallery"</mark>&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="image-2.jpg" class="cartonbox" data-cb-type="img" <mark>data-cb-group="gallery"</mark>&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="image-3.jpg" class="cartonbox" data-cb-type="img" <mark>data-cb-group="gallery"</mark>&gt;...&lt;/a&gt;</code>
			</div>
			<? if (!$en): ?>
				<p>Сгруппировать блоки с&nbsp;контентом так:</p>
			<? else: ?>
				<p>Group content blocks like this:</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;a href="#text-1" class="cartonbox" data-cb-type="inline" <mark>data-cb-group="group"</mark>&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="#text-2" class="cartonbox" data-cb-type="inline" <mark>data-cb-group="group"</mark>&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="#text-3" class="cartonbox" data-cb-type="inline" <mark>data-cb-group="group"</mark>&gt;...&lt;/a&gt;</code>
			</div>
			<? if (!$en): ?>
				<p>Создать разнотипные модальные окна так:</p>
			<? else: ?>
				<p>Create different types of&nbsp;modal windows like this:</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;a href="image.jpg" class="cartonbox" data-cb-type="img" <mark>data-cb-group="qwerty"</mark>&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="#text" class="cartonbox" data-cb-type="inline" <mark>data-cb-group="qwerty"</mark>&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="//apple.com/" class="cartonbox" data-cb-type="iframe"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>data-cb-group="qwerty"</mark></code>
				<code>&gt;...&lt;/a&gt;</code>
			</div>
			<? if (!$en): ?>
				<p>Перемещаться между окнами можно стрелками вправо-влево на&nbsp;клавиатуре, а&nbsp;закрыть окно&nbsp;— нажав клавишу Эскейп.</p>
			<? else: ?>
				<p>You can navigate between windows using the left and right arrows on&nbsp;the keyboard, and you can close the window by&nbsp;pushing Esc.</p>
			<? endif; ?>
			
			<h3><?= (!$en ? 'Хеш-навигация' : 'Hash navigation') ?></h3>
			<? if (!$en): ?>
				<p>Параметр <code>data-cb-hash</code> добавляет хеш к&nbsp;адресу веб-страницы. Открытие такой ссылки в&nbsp;браузере сразу приводит к&nbsp;запуску нужного модального окна. Например:</p>
			<? else: ?>
				<p>Parameter <code>data-cb-hash="NAME"</code> adds a&nbsp;hash tag to&nbsp;a&nbsp;Web page address. Opening such a&nbsp;link in&nbsp;the browser leads to&nbsp;immediate launch of&nbsp;a&nbsp;desired modal window.</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;a href="image.jpg" class="cartonbox" data-cb-type="img" <mark>data-cb-hash="picture"</mark>&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="#text" class="cartonbox" data-cb-type="inline" <mark>data-cb-hash="about"</mark>&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="//apple.com/" class="cartonbox" data-cb-type="iframe"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>data-cb-hash="website"</mark></code>
				<code>&gt;...&lt;/a&gt;</code>
			</div>
			
			<h3><?= (!$en ? 'Опции' : 'Options') ?></h3>
			<? if (!$en): ?>
				<p>Через параметр <code>data-cb-options</code> можно передавать дополнительные опции. Например:</p>
			<? else: ?>
				<p>Through parameter <code>data-cb-options</code> you can transfer extra options.</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;a href="image.jpg" class="cartonbox" data-cb-type="img"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>data-cb-options="{brand: 'ford', model: 'focus', generation: 3}"</mark></code>
				<code>&gt;...&lt;/a&gt;</code>
			</div>
			
			<h2><?= (!$en ? 'Ещё параметры и примеры' : 'More parameters and examples') ?></h2>
			
			<h3><?= (!$en ? 'Фотографии' : 'Photos') ?></h3>
			<div class="photo cf">
				<a href="img/image-1.jpg" class="cartonbox" data-cb-type="img"><img src="img/image-1-small.jpg" alt="" width="151" height="100"></a>
				<a href="img/image-2.jpg" class="cartonbox" data-cb-type="img" data-cb-caption="#caption"><img src="img/image-2-small.jpg" alt="" width="151" height="100"></a>
				<div style="display: none;">
					<div id="caption">
						<h2><?= (!$en ? 'Асфальт&nbsp;&mdash;' : 'Asphalt&nbsp;') ?></h2>
						<? if (!$en): ?>
							смесь <a href="//ru.wikipedia.org/wiki/%D0%91%D0%B8%D1%82%D1%83%D0%BC">битумов</a> с&nbsp;минеральными материалами: гравием и&nbsp;песком (щебнем или гравием, песком и&nbsp;минеральным порошком в&nbsp;искусственном асфальте). Применяют для устройства покрытий на&nbsp;автомобильных дорогах, как кровельный, гидро- и&nbsp;электроизоляционный материал, для приготовления замазок, клеев, лаков и&nbsp;др. Асфальт наивысшего качества используется в&nbsp;живописи и&nbsp;при создании литографий.
						<? else: ?>
							also known as&nbsp;bitumen, is&nbsp;a&nbsp;sticky, black and highly viscous liquid or&nbsp;semi-solid form of&nbsp;petroleum. It&nbsp;may be&nbsp;found in&nbsp;natural deposits or&nbsp;may be&nbsp;a&nbsp;refined product; it&nbsp;is&nbsp;a&nbsp;substance classed as&nbsp;a&nbsp;pitch. Until the 20th century, the term asphaltum was also used.
						<? endif; ?>
					</div>
				</div>
				<a href="img/image-3.jpg" class="cartonbox" data-cb-type="img"><img src="img/image-3-small.jpg" alt="" width="64" height="100"></a>
				<a href="img/image-4.jpg" class="cartonbox" data-cb-type="img" data-cb-caption="<?= (!$en ? 'Фотографии Девида Гёринга (David Goehring)' : 'Photo by David Goehring.') ?>"><img src="img/image-4-small.jpg" alt="" width="100" height="100"></a>
			</div>
			<div class="code">
				<code>&lt;a href="image-1.jpg" class="cartonbox" data-cb-type="img"&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="image-2.jpg" class="cartonbox" data-cb-type="img"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>data-cb-caption="#caption"</mark></code>
				<code>&gt;...&lt;/a&gt;</code>
				<code>&lt;div style="display: none;"&gt;</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div id="caption"&gt;</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;... <?= (!$en ? 'ХТМЛ-код' : 'HTML code') ?> ...</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</code>
				<code>&lt;/div&gt;</code>
				<code>&lt;a href="image-3.jpg" class="cartonbox" data-cb-type="img"&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="image-4.jpg" class="cartonbox" data-cb-type="img"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>data-cb-caption="... <?= (!$en ? 'Какой-то текст' : 'Some text') ?> ..."</mark></code>
				<code>&gt;...&lt;/a&gt;</code>
			</div>
			<? if (!$en): ?>
				<p>К&nbsp;любой фотографии можно делать подпись, добавив параметр <code>data-cb-caption</code>, содержащий либо ID&nbsp;блока, который нужно загрузить, либо какой-то обычный текст, который будет просто отображён.</p>
			<? else: ?>
				<p>You can make a&nbsp;label for any picture by&nbsp;adding parameter <code>data-cb-caption</code>. The parameter that contains a&nbsp;block&nbsp;ID that you want to&nbsp;display, or&nbsp;some plain text that will be&nbsp;displayed.</p>
			<? endif; ?>
			
			<h3><?= (!$en ? 'Фотогалерея' : 'Gallery') ?></h3>
			<div class="photo cf">
				<a href="img/image-5.jpg" class="cartonbox" data-cb-type="img" data-cb-group="gallery"><img src="img/image-5-small.jpg" alt="" width="151" height="100"></a>
				<a href="img/image-6.jpg" class="cartonbox" data-cb-type="img" data-cb-group="gallery"><img src="img/image-6-small.jpg" alt="" width="151" height="100"></a>
				<a href="img/image-7.jpg" class="cartonbox" data-cb-type="img" data-cb-group="gallery"><img src="img/image-7-small.jpg" alt="" width="150" height="100"></a>
				<a href="img/image-8.jpg" class="cartonbox" data-cb-type="img" data-cb-group="gallery" data-cb-hash="picture" data-cb-caption="<?= (!$en ? 'Фотографии Девида Гёринга (David Goehring)' : 'Photo by&nbsp;David Goehring.') ?>"><img src="img/image-8-small.jpg" alt="" width="151" height="100"></a>
			</div>
			<div class="code">
				<code>&lt;a href="image-1.jpg" class="cartonbox" data-cb-type="img" data-cb-group="gallery"&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="image-2.jpg" class="cartonbox" data-cb-type="img" data-cb-group="gallery"&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="image-3.jpg" class="cartonbox" data-cb-type="img" data-cb-group="gallery"&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="image-4.jpg" class="cartonbox" data-cb-type="img" data-cb-group="gallery"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;data-cb-hash="picture"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;data-cb-caption="<?= (!$en ? 'Фотографии Девида Гёринга (David Goehring)' : 'Photo by&nbsp;David Goehring.') ?>"</code>
				<code>&gt;...&lt;/a&gt;</code>
			</div>
			
			<h3><?= (!$en ? 'Блоки с&nbsp;контентом' : 'Blocks of&nbsp;content') ?></h3>
			<? if (!$en): ?>
				<p>Простой <a href="#text" class="cartonbox" data-cb-type="inline" data-cb-hash="text">текстовый блок</a>.</p>
				<p>Большая <a href="#article" class="cartonbox" data-cb-type="inline" data-cb-hash="article" data-cb-design="earth">статья</a> со&nbsp;множеством разнообразных элементов и&nbsp;уникальным оформлением.</p>
			<? else: ?>
				<p>Basic <a href="#text" class="cartonbox" data-cb-type="inline" data-cb-hash="text">text block</a>.</p>
				<p>Big <a href="#article" class="cartonbox" data-cb-type="inline" data-cb-hash="article" data-cb-design="earth">article</a> with a&nbsp;lot of&nbsp;elements and custom layout.</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;a href="#text" class="cartonbox" data-cb-type="inline" data-cb-hash="text"&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="#article" class="cartonbox" data-cb-type="inline" data-cb-hash="article"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>data-cb-design="earth"</mark></code>
				<code>&gt;...&lt;/a&gt;</code>
				<code>&lt;div style="display: none;"&gt;</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div id="text"&gt;</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;... <?= (!$en ? 'ХТМЛ-код' : 'HTML code') ?> ...</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;div id="article"&gt;</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;... <?= (!$en ? 'ХТМЛ-код' : 'HTML code') ?> ...</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;</code>
				<code>&lt;/div&gt;</code>
			</div>
			<? if (!$en): ?>
				<p>Каждое окно можно уникально оформить, добавив параметр <code>data-cb-design</code>.</p>
			<? else: ?>
				<p>You can style each window in&nbsp;a&nbsp;unique way by&nbsp;adding parameter <code>data-cb-design</code>.</p>
			<? endif; ?>
			<div style="display: none;">
				<div id="text">
					<h2><?= (!$en ? 'Космос&nbsp;&mdash;' : 'Cosmos&nbsp;&mdash;') ?></h2>
					<? if (!$en): ?>
						относительно пустые участки <a href="#universe" class="cartonbox" data-cb-type="inline" data-cb-hash="universe">Вселенной</a>, которые лежат вне границ атмосфер небесных тел. Вопреки распространённым представлениям, космос не&nbsp;является абсолютно пустым пространством&nbsp;&mdash; в&nbsp;нём существует очень низкая плотность некоторых частиц (преимущественно водорода), а&nbsp;также электромагнитное излучение и&nbsp;межзвездное вещество. Слово &laquo;космос&raquo; имеет несколько различных значений. Иногда под космосом понимают всё пространство вне Земли, включая небесные тела.
					<? else: ?>
						is&nbsp;the <a href="#universe" class="cartonbox" data-cb-type="inline" data-cb-hash="universe">universe</a> regarded as&nbsp;a&nbsp;complex and orderly system; the opposite of&nbsp;chaos. The philosopher Pythagoras used the term cosmos for the order of&nbsp;the universe, but the term was not part of&nbsp;modern language until the 19th century geographer and polymath, Alexander von Humboldt, resurrected the use of&nbsp;the word from the ancient Greek, assigned it&nbsp;to&nbsp;his multi-volume treatise, Kosmos, and, along the way, influenced our present and somewhat holistic perception of&nbsp;the universe as&nbsp;one interacting entity.
					<? endif; ?>
				</div>
				<div id="universe">
					<h2><?= (!$en ? 'Вселенная&nbsp;&mdash;' : 'Universe&nbsp;&mdash;') ?></h2>
					<? if (!$en): ?>
						не&nbsp;имеющее строгого определения понятие в&nbsp;астрономии и&nbsp;философии. Оно делится на&nbsp;две принципиально отличающиеся сущности: умозрительную (философскую) и&nbsp;материальную, доступную наблюдениям в&nbsp;настоящее время или в&nbsp;обозримом будущем. Если автор различает эти сущности, то, следуя традиции, первую называют Вселенной, а&nbsp;вторую&nbsp;&mdash; астрономической Вселенной или Метагалактикой (в&nbsp;последнее время этот термин практически вышел из&nbsp;употребления). Вселенная является предметом исследования космологии.<br>
						<br>
						&larr; <a href="#text" class="cartonbox" data-cb-type="inline" data-cb-hash="text">Космос</a>
					<? else: ?>
						 is&nbsp;all of&nbsp;time and space and its contents. The Universe includes planets, stars, galaxies, the contents of&nbsp;intergalactic space, the smallest subatomic particles, and all matter and energy. The observable universe is&nbsp;about 28&nbsp;billion parsecs (91&nbsp;billion light-years) in&nbsp;diameter at&nbsp;the present time. The size of&nbsp;the whole Universe is&nbsp;not known and may be&nbsp;infinite.<br>
						<br>
						&larr; <a href="#text" class="cartonbox" data-cb-type="inline" data-cb-hash="text">Cosmos</a>
					<? endif; ?>
				</div>
				<div id="article">
					<h2><?= (!$en ? 'Земля&nbsp;&mdash;' : 'Earth&nbsp;&mdash;') ?></h2>
					<? if (!$en): ?>
						третья от&nbsp;Солнца планета. Пятая по&nbsp;размеру среди всех планет Солнечной системы. Она является также крупнейшей по&nbsp;диаметру, массе и&nbsp;плотности среди планет земной группы. Единственное известное человеку на&nbsp;данный момент тело Солнечной системы в&nbsp;частности и&nbsp;Вселенной вообще, населённое живыми организмами.
					<? else: ?>
						is&nbsp;the third planet from the Sun, the densest planet in&nbsp;the Solar System, the largest of&nbsp;the Solar System&rsquo;s four terrestrial planets, and the only astronomical object known to&nbsp;harbor life. The earliest life on&nbsp;Earth arose at&nbsp;least 3.5 billion years ago.
					<? endif; ?>
					<br>
					<br>
					<div style="background: url(img/pic-2.jpg) 50% 50% no-repeat; height: 350px;"></div><br>
					<? if (!$en): ?>
						Приблизительно&nbsp;70,8% поверхности планеты занимает Мировой океан, остальную часть поверхности занимают континенты и&nbsp;острова. На&nbsp;материках расположены реки, озёра, подземные воды и&nbsp;льды, вместе с&nbsp;Мировым океаном они составляют гидросферу. Жидкая вода, необходимая для всех известных жизненных форм, не&nbsp;существует на&nbsp;поверхности какой-либо из&nbsp;известных планет и&nbsp;планетоидов Солнечной системы, кроме Земли. Полюсы Земли покрыты ледяным панцирем, который включает в&nbsp;себя морской лёд Арктики и&nbsp;антарктический ледяной щит.
					<? else: ?>
						According to&nbsp;evidence from radiometric dating and other sources, Earth was formed about 4.54 billion years ago. Within its first billion years, life appeared in&nbsp;its oceans and began to&nbsp;affect its atmosphere and surface, promoting the proliferation of&nbsp;aerobic as&nbsp;well as&nbsp;anaerobic organisms. Since then, the combination of&nbsp;Earth&rsquo;s distance from the Sun, its physical properties and its geological history have allowed life to&nbsp;thrive and evolve.
					<? endif; ?>
					<br>
					<br>
					<img src="img/pic-3.jpg" alt="" width="100%"><br>
					<br>
					<? if (!$en): ?>
						Планета является домом для миллионов видов живых существ, включая человека. Территория Земли разделена на&nbsp;195 независимых государств, которые взаимодействуют между собой путём дипломатических отношений, путешествий, торговли или военных действий. Человеческая культура сформировала много представлений об&nbsp;устройстве мироздания&nbsp;&mdash; таких, как концепция о&nbsp;плоской Земле, геоцентрическая система мира и&nbsp;гипотеза Геи, по&nbsp;которой Земля представляет собой единый суперорганизм.
					<? else: ?>
						Earth gravitationally interacts with other objects in&nbsp;space, especially the Sun and the Moon. During one orbit around the Sun, Earth rotates about its own axis 366.26&nbsp;times, creating 365.26 solar days or&nbsp;one sidereal year. Earth&rsquo;s axis of&nbsp;rotation is&nbsp;tilted 23.4&deg; away from the perpendicular of&nbsp;its orbital plane, producing seasonal variations on&nbsp;the planet&rsquo;s surface with a&nbsp;period of&nbsp;one tropical year (365.24 solar days). The Moon is&nbsp;Earth&rsquo;s only permanent natural satellite. Its gravitational interaction with Earth causes ocean tides, stabilizes the orientation of&nbsp;Earth&rsquo;s rotational axis, and gradually slows Earth&rsquo;s rotational rate.
					<? endif; ?>
					<br>
					<br>
					<iframe src="//youtube.com/embed/6v2L2UGZJAM?rel=0&amp;showinfo=0&amp;wmode=transparent" width="520" height="293" frameborder="0" wmode="Opaque" allowfullscreen></iframe>
				</div>
			</div>
			
			<h3><?= (!$en ? 'Айфрейм' : 'Iframe') ?></h3>
			<? if (!$en): ?>
				<p><a href="//apple.com/" class="cartonbox" data-cb-type="iframe">Сайт американской корпорации «Эппл»</a>.</p>
			<? else: ?>
				<p><a href="//apple.com/" class="cartonbox" data-cb-type="iframe">Apple website</a>.</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;a href="//apple.com/" class="cartonbox" data-cb-type="iframe"&gt;...&lt;/a&gt;</code>
			</div>
			<? if (!$en): ?>
				<p>Также можно загрузить фрагмент страницы, указав через пробел айди элемента, содержимое которого нужно отобразить:</p>
			<? else: ?>
				<p>You can also display a&nbsp;fragment of&nbsp;the page, specifying element ID&nbsp;whose contents you want to&nbsp;display, separated by&nbsp;space.</p>
			<? endif; ?>
			<div class="code">
				<code>&lt;a href="<mark>//apple.com/ #content</mark>" class="cartonbox" data-cb-type="iframe"&gt;...&lt;/a&gt;</code>
			</div>
			
			<h3><?= (!$en ? 'Видеогалерея' : 'Video') ?></h3>
			<div class="photo cf">
				<a href="//youtube.com/embed/yRuGhX791FQ?rel=0&amp;showinfo=0&amp;autoplay=1&amp;wmode=transparent" class="cartonbox" data-cb-type="iframe" data-cb-group="video" data-cb-design="video16x9"><img src="img/video-1-small.jpg" alt="" width="178" height="100"></a>
				<a href="//player.vimeo.com/video/79804777?autoplay=1&color=ffffff&title=0&byline=0&portrait=0" class="cartonbox" data-cb-type="iframe" data-cb-group="video" data-cb-design="video21x9"><img src="img/video-2-small.jpg" alt="" width="178" height="100"></a>
				<a href="//vk.com/video_ext.php?oid=5713686&id=170265723&hash=5296394ecc50acbd&hd=2&autoplay=1" class="cartonbox" data-cb-type="iframe" data-cb-group="video" data-cb-design="video16x9" data-cb-hash="video" data-cb-caption="John Butler — Ocean"><img src="img/video-3-small.jpg" alt="" width="178" height="100"></a>
			</div>
			<div class="code">
				<code>&lt;a href="//youtube.com/embed/yRuGhX791FQ?rel=0&amp;showinfo=0&amp;autoplay=1&amp;wmode=transparent"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;class="cartonbox" data-cb-type="iframe" data-cb-group="video" data-cb-design="video16x9"</code>
				<code>&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="//player.vimeo.com/video/79804777?autoplay=1&color=ffffff&title=0&byline=0&portrait=0"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;class="cartonbox" data-cb-type="iframe" data-cb-group="video"  data-cb-design="video21x9"</code>
				<code>&gt;...&lt;/a&gt;</code>
				<code>&lt;a href="//vk.com/video_ext.php?oid=5713686&id=170265723&hash=5296394ecc50acbd&hd=2&autoplay=1"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;class="cartonbox" data-cb-type="iframe" data-cb-group="video"  data-cb-design="video16x9"</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;data-cb-hash="video" data-cb-caption="John Butler — Ocean"</code>
				<code>&gt;...&lt;/a&gt;</code>
			</div>
			
			<h2><?= (!$en ? 'Настройка' : 'Settings') ?></h2>
			<div class="code">
				<code>var options = {</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<span class="gray">// <?= (!$en ? 'Опции' : 'Options') ?></span></code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>wrap</mark>: &nbsp;&nbsp;'body', &nbsp;&nbsp;<span class="gray">// <?= (!$en ? 'Селектор или DOM-элемент, содержимое которого оборачиватся плагином.' : 'Selector or&nbsp;DOM-element, whose contents are wrapped plugin.') ?></span></code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>speed</mark>: &nbsp;200, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="gray">// <?= (!$en ? 'Скорость анимации в&nbsp;милисекундах.' : 'Animation speed in&nbsp;milliseconds.') ?></span></code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>nav</mark>: &nbsp;&nbsp;&nbsp;'dotted', <span class="gray">// <em>'false'</em> <?= (!$en ? 'отключает навигацию в&nbsp;виде точек.' : 'disables dotted-style navigation.') ?></span></code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>cycle</mark>: &nbsp;false, &nbsp;&nbsp;&nbsp;<span class="gray">// <em>'true'</em> <?= (!$en ? 'включает зацикливание групповых модальных окон.' : 'enables cycling of&nbsp;grouped modal windows.') ?></span></code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<span class="gray">// <?= (!$en ? 'Функции обратного вызова' : 'Callback') ?></span></code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>onStartBefore</mark>:&nbsp; function() {},</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>onStartAfter</mark>:&nbsp;&nbsp; function() {},</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>onLoadBefore</mark>:&nbsp;&nbsp; function() {},</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>onLoadAfter</mark>:&nbsp;&nbsp;&nbsp; function() {},</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>onShowBefore</mark>:&nbsp;&nbsp; function() {},</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>onShowNow</mark>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; function() {},</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>onShowAfter</mark>:&nbsp;&nbsp;&nbsp; function() {},</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>onClosedBefore</mark>: function() {},</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>onClosedAfter</mark>:&nbsp; function() {},</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>onLeft</mark>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; function() {},</code>
				<code>&nbsp;&nbsp;&nbsp;&nbsp;<mark>onRight</mark>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; function() {},</code>
				<code>};</code>
			</div>
			
			<h3><?= (!$en ? 'Методы' : 'Methods') ?></h3>
			<? if (!$en): ?>
				<p>Инициализация. Пригодится если Картонбокс нужно запустить заново.</p>
			<? else: ?>
				<p>Initialization. It is useful if you want to start anew CartonBox.</p>
			<? endif; ?>
			<div class="code">
				<code>$.cartonbox('<mark>init</mark>', [options]);</code>
			</div>
			<? if (!$en): ?>
				<p>Обновление. Нужно, например, если на&nbsp;странице динамически подгрузились новые элементы, которые необходимо открывать в&nbsp;модальном окне.</p>
			<? else: ?>
				<p>Refresh. It should, for example, if a page dynamically load the new items that you want to open in a modal window.</p>
			<? endif; ?>
			<div class="code">
				<code>$.cartonbox('<mark>refresh</mark>');</code>
			</div>
			<? if (!$en): ?>
				<p>Деинициализация. Полностью вычищает Картонбокс из&nbsp;кода.</p>
			<? else: ?>
				<p>Destroy. Completely clean CartonBox from code</p>
			<? endif; ?>
			<div class="code">
				<code>$.cartonbox('<mark>destroy</mark>');</code>
			</div>
			
			<h2><?= (!$en ? 'Поддержка браузерами' : 'Browser Support') ?></h2>
			<? if (!$en): ?>
				<p>Плагин проверялся и&nbsp;стабильно работает в&nbsp;последних версиях браузеров:</p>
				<ul>
					<li>на&nbsp;десктопе: Chrome, Firefox, Safari, Opera, Я.Браузер, IE&nbsp;(включая 10&nbsp;версию);</li>
					<li>на&nbsp;мобильных: Chrome, Safari, Opera Mini, Я.Браузер.</li>
				</ul>
			<? else: ?>
				<p>CartonBox supported in&nbsp;all modern browsers:</p>
				<ul>
					<li>desktop: Chrome, Firefox, Safari, Opera, Internet Explorer (ver 10&nbsp;and higher)</li>
					<li>mobile: Chrome, Safari, Opera Mini</li>
				</ul>
			<? endif; ?>
			
			<h2><?= (!$en ? 'Копирайты и&nbsp;лицензия' : 'Copyright and license') ?></h2>
			<? if (!$en): ?>
				<p>Плагин написан разработчиками дизайн-лаборатории «<a href="//constlab.ru/">Конст Лаб</a>» в&nbsp;2015&nbsp;году. Распространяется на&nbsp;беcплатной основе под лицензией MIT.</p>
			<? else: ?>
				<p>All credit goes to&nbsp;«<a href="//constlab.com/">Const Lab</a>» in&nbsp;2015. Distributed free of&nbsp;charge under MIT&nbsp;License.</p>
			<? endif; ?>
			
			<div class="likely">
				<div class="twitter">Твитнуть</div>
				<div class="facebook">Поделиться</div>
				<div class="vkontakte">Поделиться</div>
				<div class="gplus">Плюсануть</div>
			</div>
			
		</div>
		<script src="js/jquery.min.js"></script>
		<script src="js/jquery.cartonbox.min.js"></script>
		<script src="js/likely.js"></script>
		<script src="js/custom.js"></script>
		<script>(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter34208800 = new Ya.Metrika({id:34208800, webvisor:true, clickmap:true, trackLinks:true, accurateTrackBounce:true, trackHash:true}); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");</script>
	</body>
</html>