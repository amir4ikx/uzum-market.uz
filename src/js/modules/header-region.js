let locateRegion = document.querySelector('.locate__region')
let locateRegionCity = document.querySelector('.locate__region-city')
let locateRegionWrap = document.querySelector('.locateRegion__wrap')
let locateRegionSubtitle = document.querySelector('.locateRegion__subtitle')
let locateRegionClose = document.querySelector('.locateRegion__close')
let locateRegionInner = document.querySelector('.locateRegion__inner')
let locateRegionInput = document.querySelector('.locateRegion__input')
let burgermenuRegion = document.querySelector('.burgermenu-region')
let burgermenuCity = document.querySelector('.nav__burgermenu-main--city')

let regions = ['Аккурган', 'Алмазар (Чиназский район)', 'Алмалык', 'Ангрен', 'Андижан', 'Асака', 'Ахангаран', 'Бекабад', 'Бешарык', 'Бухара', 'Газалкент', 'Галаасия', 'Гиждуван', 'Гузар', 'Гулистан', 'Дангара', 'Денау', 'Джалакудук', 'Джизак', 'Жондор', 'Зангиота', 'Зарафшан', 'Ибрат', 'Каган', 'Каракитай', 'Каракуль', 'Карасу (Андижанская обл.)', 'Караулбазар', 'Карши', 'Касан', 'Каттакурган', 'Келес', 'Кибрай', 'Коканд', 'Кувасай', 'Куксарай', 'Кургантепа', 'Маргилан', 'Навои', 'Назарбек', 'Наманган', 'Нукус', 'Нурафшан', 'Пскент', 'Риштан', 'Самарканд', 'Ташкент', 'Термез', 'Туракурган', 'Ургенч', 'Учкудук', 'Фергана', 'Фуркат', 'Ханабад', 'Хива', 'Ходжаабад', 'Ходжейли', 'Чартак', 'Чирчик', 'Чуст', 'Шафиркан', 'Шахрисабз', 'Шахрихан', 'Эшангузар', 'Яйпан', 'Янгибазар', 'Янгийюль']

burgermenuRegion.onclick = (e) => {
    e.preventDefault()
    locateRegionWrap.style.scale = '1'
    locateRegionWrap.style.opacity = '1'
    document.body.classList.add('locked')
}

locateRegion.onclick = (e) => {
    e.preventDefault()
    locateRegionWrap.style.scale = '1'
    locateRegionWrap.style.opacity = '1'
    document.body.classList.add('locked')
}

locateRegionClose.onclick = () => {
    locateRegionWrap.style.scale = '0'
    locateRegionWrap.style.opacity = '0'
    document.body.classList.remove('locked')
}

locateRegionSubtitle.textContent = `Бесплатная доставка на следующий день в ${regions.length} городов Узбекистана:`

for (let i = 0; i < regions.length; i++) {

    let region = document.createElement('div')
    region.className = 'locateRegion__region'
    region.innerHTML = regions[i]
    locateRegionInner.append(region)

    region.onclick = () => {
        locateRegionCity.textContent = regions[i]
        burgermenuCity.textContent = regions[i]
        locateRegionWrap.style.scale = '0'
        locateRegionWrap.style.opacity = '0'
        document.body.classList.remove('locked')
        localStorage.setItem('whichCity', regions[i])
    }

    locateRegionInput.oninput = () => {

        let value = locateRegionInput.value.trim()
        let allRegions = document.querySelectorAll('.locateRegion__region')

        allRegions.forEach(region => {

            if (!region.innerHTML.toLowerCase().includes(value.toLowerCase())) {
                region.style.scale = '0'
                region.style.opacity = '0'
                
                setTimeout(() => {
                    region.style.display = 'none'
                }, 300);
                
            } else {
                region.style.scale = '1'
                region.style.opacity = '1'

                setTimeout(() => {
                    region.style.display = 'block'
                }, 300);
            }
        })
    }
}

export default headerRegion;