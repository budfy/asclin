let partners;
$(function () {
	$("body").addClass("ie-active");
	//ANCHOR: определяем Internet Explorer и задаём свои стили
	$(window).on("load", function () {
		let userAgent = window.navigator.userAgent,
			is_ie = (/trident/gi).test(userAgent) || (/msie/gi).test(userAgent);
		console.log('is_ie :>> ', is_ie);
		if (is_ie != false) {
			console.log('is_ie :>> ', is_ie);
		} else {
			$("body").removeClass("ie-active");
			//ANCHOR: инициалитзация слайдера
			partners = new Swiper(".swiper-container", {
				loop: true,
				pagination: false,
				navigation: false,
				scrollbar: false,
				slidesPerView: 1,
				breakpoints: {
					565: {
						slidesPerView: 2
					},
					768: {
						slidesPerView: 3
					},
					1024: {
						slidesPerView: 4
					},
				}
			});
			//!ANCHOR
		}
	});
	//!ANCHOR


	// ANCHOR: функция для открытия модального окна
	// NOTE: весь контент модальных окон открывается в одном окне(блоке). Для вызова модального окна вызывающий элемент должен иметь класс js-modal-call и дата-атрибут data-modal со значением, равным ID обёртки вызываемого контента. Вызываемый контент оборачивается обёрткой с классом modal__content-wrapper. В случае, если заданного ID нет, внутри модального окна появится сообщение об ошибке.
	$(".js-modal-call").click(function () {
		let $modal = $(this).data("modal");
		$("body").addClass("no-scroll");
		$(".modal").fadeIn(260);
		$($modal).siblings().hide();
		$($modal).show();
		$("body *:not(.modal *)").attr("tabindex", -1); //NOTE - запрещает фокус элементов с клавиатуры, находящихся вне модального окна
		hintCount = sessionStorage.getItem("hintCount");
	});
	// !ANCHOR

	// ANCHOR: функция для закрытия модального окна
	$(".modal__overlay, .modal__close").click(function () {
		$("body").removeClass("no-scroll");
		$(".modal").fadeOut(260);
		$(".modal .modal__content-wrapper").fadeOut(300);
		setTimeout(() => {
			$("#modal-error").show();
		}, 350);
		$("body *:not(.modal *)").removeAttr("tabindex");
	});
	// !ANCHOR

	// ANCHOR: функция аккордеона
	$(".js-info-open").on("click focus", function () {
		$(this).addClass("info-box__title--open")
		$(this).parent().siblings().find(".info-box__content").slideUp(260);
		$(this).parent().siblings().find(".info-box__title").removeClass("info-box__title--open")
		$(this).siblings(".info-box__content").slideDown(260)
		if ($(this).parent().hasClass("modal__info-box")) {
			$(".modal").animate({
				scrollTop: $(this).offset().top
			}, 260)
		} else {
			$("body").animate({
				scrollTop: $(this).offset().top
			}, 260)
		}
	});
	// !ANCHOR

	//ANCHOR: функция показа фото при смене в настройках
	$("#settings-user-photo").change(function () {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$(".settings__input-wrapper--picture>img").attr("src", e.target.result);
			};
			reader.readAsDataURL(this.files[0]);
		}
	});

	$("#new-article-pic").change(function () {
		if (this.files && this.files[0]) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$(".new-article__image").attr("src", e.target.result);
			};
			reader.readAsDataURL(this.files[0]);
		}
	});
	//!ANCHOR

	//ANCHOR: функция добавления/удаления места работы по кнопке и сопотствующее
	let workCount = 1,
		hintCount = 0;
	hint = $('.settings__button-hint'),
		$(".settings__add-workplace").click(function () {
			if (workCount <= 5) {
				$(".settings__workplace:last-of-type").clone().insertBefore($(this))
					.find($("input"))
					.val("");
				workCount++;
				if (hintCount <= 1) {
					hint.text($(this).data("title")).show(60);
				}
			}
		});

	$(".settings__add-workplace").on("contextmenu", function (e) {
		if (workCount > 1) {
			$(".settings__workplace:last-of-type")
				.remove();
			workCount--;
			hintCount++;
			sessionStorage.setItem("hintCount", hintCount);
		}
		return false;
	});

	$('.settings__add-workplace').on({
		mouseenter: function () {
			if (hintCount <= 1) {
				hint.text($(this).data("title")).show(60);
			}
		},
		mouseleave: function () {
			hint.hide();
			hintCount++;
			sessionStorage.setItem("hintCount", hintCount);
		}
	});

	hint.click(function () {
		hintCount++;
		sessionStorage.setItem("hintCount", hintCount);
	});

	//!ANCHOR

	// ANCHOR: функция вызова плагина для выбора одинарной даты

	$("[type='date']").datepicker({
		maxDate: new Date(),
		dateFormat: "dd.mm.yyyy", //NOTE: можно включить полное отображение даты: 29 февраля 2020, задав значение dd MM yyyy но оно не всегда помещается в поле ввода целиком.
		position: "top left",
		view: "years",
		range: false,
		clearButton: true,
		todayButton: new Date(),
		autoClose: true,
		language: {
			months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
		}
	});

	$(window).on("load", function () {
		if (window.matchMedia('(max-width: 1023px)').matches) {
			$("[type='date']")
				.datepicker()
				.data("datepicker")
				.destroy();
		}
	});

	// !ANCHOR

	// ANCHOR: функция вызова плагина для выбора двойной даты

	$("#settings-work-date").datepicker({
		maxDate: new Date(),
		dateFormat: "dd.mm.yyyy", //NOTE: можно включить полное отображение даты: 29 февраля 2020, задав значение dd MM yyyy но оно не всегда помещается в поле ввода целиком.
		position: "top left",
		view: "years",
		range: true,
		clearButton: true,
		todayButton: new Date(),
		multipleDatesSeparator: " - ",
		autoClose: true,
		language: {
			months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
		}
	});

	// !ANCHOR

	// ANCHOR: маски форм
	$("#registration-username, #settings-username").inputmask({
		mask: "*{3,30} *{3,30} *{3,30}",
		greedy: true,
		validator: "[0-9A-Za-z!]",
		onincomplete: function () {
			$(this).parent().addClass("invalid");
			setTimeout(() => {
				$(this).parent().removeClass("invalid");
			}, 3000);
		},
	});

	$("input[type='tel']").inputmask({
		mask: "+7" + " " + "(" + "999" + ")" + " " + "999" + "-" + "99" + "-" + "99",
		greedy: true,
		validator: "[0-9]",
	});

	$("#contact-form-email, #settings-email, #registration-email").inputmask({
		alias: "email",
		definitions: {
			"*": {
				validator: "[0-9A-Za-z!_-]",
				cardinality: 1,
				casing: "lower",
			},
		},
	});

	$("#settings-insta").inputmask({
		mask: "https://inst\\agr\\am.com/*{1,30}",
		greedy: false,
		definitions: {
			'*': {
				validator: "[.@0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
				cardinality: 1,
				casing: "lower",
			}
		}
	});

	$("#settings-fb").inputmask({
		mask: "https://f\\acebook.com/*{1,30}",
		greedy: false,
		definitions: {
			'*': {
				validator: "[.@0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
				cardinality: 1,
				casing: "lower",
			}
		}
	});
	// !ANCHOR

	//ANCHOR: функция для скрытия формы добавления картинки, пока в фокусе поле для ввода текста
	$(".new-article__content").on("focus", function () {
		$(".new-article__input-wrapper--image").addClass("go-back");
	});

	$(".new-article__content").on("focusout", function () {
		$(".new-article__input-wrapper--image").removeClass("go-back");
	});
	//!ANCHOR

	//ANCHOR: функция для бургерного меню
	$(".header__burger").click(function () {
		$(".header__burger-row").toggleClass("header__burger-row--open")
		$(".header__menu").slideToggle(260)
	});

	$(document).mouseup(function (e) {
		let $targ = $(".header__menu, .header__burger"),
			maxWidth = window.matchMedia("(max-width: 1023px)").matches;
		if (
			!$targ.is(e.target) &&
			$targ.has(e.target).length === 0 &&
			maxWidth
		) {
			$(".header__menu").slideUp(260)
			$(".header__burger-row").removeClass("header__burger-row--open")
		}
	});
	//!!ANCHOR

	//ANCHOR: замена заполняющего текста для инпута при разрешении экрана меньше 699px
	$(window).on("load resize orientationchange", function () {
		if (window.matchMedia("(max-width: 699px)").matches) {
			$("#registration-add-spec, #settings-add-spec").attr("placeholder", "Доп. специальность");
		} else {
			$("#registration-add-spec, #settings-add-spec").attr("placeholder", "Дополнительная специальность");
		}
	})
	//!ANCHOR
});