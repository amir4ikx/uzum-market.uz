let navLoginText = document.querySelector('.nav__menu-log-in-text')
let locateRegionCity = document.querySelector('.locate__region-city')
let burgermenuCity = document.querySelector('.nav__burgermenu-main--city')

if (localStorage.getItem('accountName')) {
    navLoginText.textContent = localStorage.getItem('accountName')
}

if (localStorage.getItem('whichCity')) {
    locateRegionCity.textContent = localStorage.getItem('whichCity')
    burgermenuCity.textContent = localStorage.getItem('whichCity')
}

export default localStorageJs;