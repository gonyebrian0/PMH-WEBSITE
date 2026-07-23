(function ($) {
  "use strict";

  function applyTheme(theme) {
    var isDark = theme === 'dark';
    $('body').toggleClass('dark-mode', isDark);
    var toggle = $('#darkModeToggle');
    if (toggle.length) {
      toggle.find('i').removeClass('fa-moon fa-sun').addClass(isDark ? 'fa-sun' : 'fa-moon');
      toggle.find('span').text(isDark ? 'Light mode' : 'Dark mode');
    }
  }

  function initDarkModeToggle() {
    if ($('#darkModeToggle').length) {
      return;
    }

    var toggleButton = $('<button type="button" class="dark-mode-toggle" id="darkModeToggle" aria-label="Toggle dark mode"><i class="fas fa-moon"></i><span>Dark mode</span></button>');
    $('.main_menu .navbar').append(toggleButton);

    toggleButton.on('click', function () {
      var nextTheme = $('body').hasClass('dark-mode') ? 'light' : 'dark';
      applyTheme(nextTheme);
      try {
        localStorage.setItem('pmh-theme', nextTheme);
      } catch (error) {
        console.warn('Unable to save theme preference', error);
      }
    });
  }

  function initQuoteModal() {
    if ($('.quote-contact-modal').length) {
      return;
    }

    var modal = $(
      '<div class="modal fade quote-contact-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
      '<div class="modal-dialog modal-dialog-centered" role="document">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<h5 class="modal-title">Choose a contact option</h5>' +
      '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
      '<span aria-hidden="true">&times;</span>' +
      '</button>' +
      '</div>' +
      '<div class="modal-body">' +
      '<p>Pick how you would like to request your quote.</p>' +
      '<div class="quote-contact-options">' +
      '<a href="mailto:professawsmediahouse@gmail.com?subject=Quote%20Request" class="btn_2 quote-option">Email</a>' +
      '<a href="https://wa.me/27718451313?text=Hello%20Professaw%27s%20Media%20House%2C%20I%20would%20like%20to%20request%20a%20quote." target="_blank" class="btn_2 quote-option">WhatsApp</a>' +
      '<a href="tel:+27718451313" class="btn_2 quote-option">Call</a>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    );

    $('body').append(modal);
  }

  // var client_logo = client_logo_slider

  var client_logo = $('.client_logo_slider')
  if (client_logo.length) {
    client_logo.owlCarousel({
      items: 6,
      loop: true,
      responsive: {
        0: {
          items: 3,
          margin: 15,
        },
        600: {
          items: 3,
          margin: 15,
        },
        991: {
          items: 5,
          margin: 15,
        },
        1200: {
          items: 6,
          margin: 15,
        }
      }
    });
  }



  // var review = $('.review_slider');
  // if (review.length) {
  //   review.owlCarousel({
  //     items: 1,
  //     loop: true,
  //     dots: true,
  //     autoplay: false,
  //     autoplayHoverPause: true,
  //     autoplayTimeout: 5000,
  //     nav: false,
  //   });
  // }

  $(document).ready(function () {
    $('select').niceSelect();
    initDarkModeToggle();
    initQuoteModal();

    try {
      var savedTheme = localStorage.getItem('pmh-theme') || 'light';
      applyTheme(savedTheme);
    } catch (error) {
      console.warn('Unable to load theme preference', error);
      applyTheme('light');
    }

    $('.gallery_part .img-gal').magnificPopup({
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  });
  // menu fixed js code
  $(window).scroll(function () {
    var window_top = $(window).scrollTop() + 1;
    if (window_top > 50) {
      $('.main_menu').addClass('menu_fixed animated fadeInDown');
    } else {
      $('.main_menu').removeClass('menu_fixed animated fadeInDown');
    }
  });

  // Search Toggle
  $("#search_input_box").hide();
  $("#search_1").on("click", function () {
    $("#search_input_box").slideToggle();
    $("#search_input").focus();
  });
  $("#close_search").on("click", function () {
    $('#search_input_box').slideUp(500);
  });

  //------- Mailchimp js --------//  
  function mailChimp() {
    $('#mc_embed_signup').find('form').ajaxChimp();
  }
  mailChimp();

  $('.portfolio-filter ul li').on('click', function () {
    $('.portfolio-filter ul li').removeClass('active');
    $(this).addClass('active');

    var filterValue = $(this).data('filter');
    $('.gallery_part .img-gal').each(function () {
      var category = $(this).data('category');
      var shouldShow = filterValue === 'all' || String(category) === String(filterValue);
      $(this).toggleClass('is-hidden', !shouldShow);
    });
  });

  $(document).on('click', '.single_pricing_part .btn_2', function (e) {
    e.preventDefault();
    $('.quote-contact-modal').modal('show');
  });

  var review = $('.review_slider');
  if (review.length) {
    review.owlCarousel({
      items: 1,
      loop: true,
      dots: true,
      autoplay: false,
      autoplayHoverPause: true,
      autoplayTimeout: 5000,
      nav: false,
    });
  }

}(jQuery));