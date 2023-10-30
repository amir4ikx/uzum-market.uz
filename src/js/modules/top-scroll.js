let topScroller = document.querySelector('.scroll__top');

window.onscroll = () => {
    window.scrollY > 400 ? topScroller.classList.remove('scroll__top-hide') : topScroller.classList.add('scroll__top-hide')
}

topScroller.onclick = () => {
    window.scrollTo(0, 0)
}

export default scrollTop;