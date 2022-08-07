$(document).ready(function () {
  $(".slider").slick({
    dots: true,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 2,
    // autoplay: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });
});
