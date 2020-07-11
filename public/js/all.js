$(document).ready(function () {
  let cartCount = 0
  $('.show-link').click(function (e) {
    e.preventDefault()
    $('.nav-link').toggleClass('jq-show-link')
  })
  $('.heart').click(function (e) {
    e.preventDefault()
    $(this).toggleClass('far')
    $(this).toggleClass('fas')
  })
  $('.truck').click(function (e) {
    e.preventDefault()
    cartCount += 1
    $('.cart-num').text(cartCount)
  })
  $('.scroll').click(function (e) {
    e.preventDefault()
    const target = $(this).attr('href')
    const pos = $(target).offset().top
    console.log(target, pos)
    $('html, body').animate({ scrollTop: pos }, 750)
  })
})
