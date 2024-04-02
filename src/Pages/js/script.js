const title = document.querySelector('.title')
const floor = document.querySelector('.floor')
const bg = document.querySelector('.bg')
const girl = document.querySelector('.girl')
const lanterns = document.querySelector('.lanterns')


document.addEventListener('scroll', function() {
    let value = window.scrollY
    // console.log(value)
    bg.style.marginBottom = -value * 1.1 + 'px'
    girl.style.marginBottom = -value * 1.2 + 'px'

    title.style.marginTop = value * 0.5 + 'px'

    lanterns.style.marginTop = value * 1.5 + 'px'

})