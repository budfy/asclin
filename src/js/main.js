//ANCHOR: инициалитзация слайдера
let partners = new Swiper(".swiper-container", {
  loop: true,
  pagination: false,
  navigation: false,
  scrollbar: false,
  slidesPerView: 1,
  breakpoints: {
    768: {
      slidesPerView: 2
    },
    1024: {
      slidesPerView: 4
    },
  }
})
//!ANCHOR

$(function () {
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
  $(".js-info-open").on("click, focus", function () {
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

  // ANCHOR: функция вызова плагина для выбора двойной даты
  // $("#settings-work-date").daterangepicker({
  //   opens: "left",
  //   drops: "up",

  //   locale: "ru",
  //   autoApply: true,
  //   showDropdowns: true
  // })

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

  // !ANCHOR

  //ANCHOR: функция для скрытия формы добавления картинки, пока в фокусе поле для ввода текста
  $(".new-article__content").on("focus", function () {
    $(".new-article__input-wrapper--image").addClass("go-back");
  });

  $(".new-article__content").on("focusout", function () {
    $(".new-article__input-wrapper--image").removeClass("go-back");
  });
  //!ANCHOR

});