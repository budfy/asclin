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
    $(".modal__content-wrapper").fadeOut(300);
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
      console.log(hintCount);
      sessionStorage.setItem("hintCount", hintCount);
    }
  });

  hint.click(function () {
    hintCount++;
    sessionStorage.setItem("hintCount", hintCount);
  });

  //!ANCHOR

  // ANCHOR: функция вызова плагина для выбора двойной даты

  // !ANCHOR

  // ANCHOR: маски форм

  // !ANCHOR
});