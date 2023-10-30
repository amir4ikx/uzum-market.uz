let preloaderElement = document.querySelector('.preloader')

document.body.classList.add('locked')

window.addEventListener('load', () => {
    preloaderElement.classList.add('hide')
    document.body.classList.remove('locked')
})


export default preloader;