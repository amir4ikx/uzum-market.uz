import { partialRight } from "lodash"

let navSearchInput = document.querySelector('.nav__search-input')
let propertyCardsSection = document.querySelector('.property__cards')
let main = document.querySelector('.main')

navSearchInput.oninput = () => {
    let value = navSearchInput.value
    let allCards = document.querySelectorAll('.section__card')

    allCards.forEach(card => {
        let title = card.querySelector('.section__card-title').textContent


        if (title.toLowerCase().includes(value.toLowerCase())) {
            propertyCardsSection.append(card)
            card.style.scale = '1'
            card.style.opacity = '1'
            card.style.display = 'block'
        }
        else {
            card.style.scale = '0'
            card.style.opacity = '0'
            card.style.display = 'none'
        }

        if (value != '') {
            main.style.display = 'none'
            propertyCardsSection.style.display = 'grid'
            
        }

        else {
            main.style.display = ''
            propertyCardsSection.style.display = 'none'
            
            card.style.scale = '1'
            card.style.opacity = '1'
            card.style.display = 'block'
        }

    })
}

export default localSearch;