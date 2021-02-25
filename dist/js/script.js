$(document).ready(function(){
    $('.carousel').slick({
        infinite: true,
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/arrowLeft.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/arrowRight.png"></button>',
        autoplay: false,
        autoplaySpeed: 2500,
        pauseOnHover: true,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              arrows: true,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              arrows: false,
              centerMode: true,
              centerPadding: '40px',
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
});

 function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.price-card__face').eq(i).toggleClass('price-card__face_active');
        $('.price-card__back').eq(i).toggleClass('price-card__back_active');
      })
    });
  };

  toggleSlide('.detail');
  toggleSlide('.back');

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1500) {
      $('#scroll').addClass('scrollUp_flex').removeClass('scrollUp');
    } else {
      $('#scroll').addClass('scrollUp').removeClass('scrollUp_flex');
    }
  });

  // Slow scroll

  $("a[href^='#up']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

   //Modal

   $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
  
  $('[data-modal=confidentiality]').on('click', function() {
    $('.overlay, #confidentiality').fadeIn('slow');
  });

  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #thanks, #confidentiality').fadeOut('slow');
  });

   //Validate

     // Валидация телефона jQuery
  //  jQuery.validator.addMethod('phonenu', function (value, element) {
  //   return this.optional(element) || /^\d{3}-?\d{3}-?\d{4}$/.test(value) || /^\d{3}?\d{3}?\d{4}$/.test(value);
  //   }, 'Введите номер в формате<br> 999-888-66-55 или 9998886655');

   function validate(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        },
        message: {
          required: true,
          minlength: 20
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format("Введите не менее {0} символов!")
        },
        phone: {
          required: "Пожалуйста, введите свой номер<br> телефона!"
        },
        email: {
          required: "Пожалуйста, введите свою почту!",
          email: "Введите почтовый адрес почты<br> в формате name@mail.ru"
        },
        message:  {
          required: "Пожалуйста,введите сообщение",
          minlength: jQuery.validator.format("Введите не менее {0} символов!")
        }
      }
    });
  };

  validate('#consultation form');
  validate('#questions form');
  validate('#priceForm form');
  
   //mask plagin

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  $('form').submit(function(e) {
    e.preventDefault();
    let $form = $(this);
    if(! $form.valid()) return false;
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      $('#consultation, #questions, #priceForm').validate();
      $('#consultation').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');
    });
    return false;
  });

// Инициализация animation library

new WOW().init();

// hamburger

window.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.hamburger__menu'),
  menuItem = document.querySelectorAll('.hamburger__item'),
  hamburger = document.querySelector('.hamburger__hamburger');

  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('hamburger__hamburger_active');
      menu.classList.toggle('hamburger__menu_active');
  });

  menuItem.forEach(item => {
      item.addEventListener('click', () => {
          hamburger.classList.toggle('hamburger__hamburger_active');
          menu.classList.toggle('hamburger__menu_active');
      })
  })
})