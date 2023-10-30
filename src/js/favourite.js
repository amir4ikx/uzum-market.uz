//importing js files
import preloader from "./modules/preloader";
import headerRegion from "./modules/header-region";
import nav from "./modules/nav";
import toBag from "./modules/to-bag";

//importing functions
import createCard from './modules/functions'

//importing axios
import axios from 'axios';

let favouriteCards = document.querySelector('.favourite__cards')
let favouriteSignIn = document.querySelector('.sign-in')

//get request axios
axios.get('http://localhost:3000/favourite')
    .then(res => {
        //cycle for creating favourite cards
        for (let i = 0; i < res.data.length; i++) {

            let sectionCard = document.createElement('div')
            sectionCard.className = `favourite__card section__card`
            sectionCard.setAttribute('id', res.data[i].id)
            favouriteCards.append(sectionCard)

            let sectionCardImgWrap = document.createElement('div')
            sectionCardImgWrap.className = `favourite__card-img-wrap section__card-img-wrap`
            sectionCard.append(sectionCardImgWrap)

            let sectionCardImg = document.createElement('img')
            sectionCardImg.className = `favourite__card-img section__card-img`
            sectionCardImg.src = res.data[i].media[0]
            sectionCardImgWrap.append(sectionCardImg)

            let sectionCardInner = document.createElement('div')
            sectionCardInner.className = `favourite__card-inner section__card-inner`
            sectionCard.append(sectionCardInner)

            let inStocks = document.createElement('span')
            inStocks.className = 'hide card__in-stock'
            inStocks.innerText = res.data[i].inStock
            sectionCard.append(inStocks)

            let description = document.createElement('span')
            description.className = 'hide card__description'
            description.innerText = res.data[i].description
            sectionCard.append(description)

            let seller = document.createElement('span')
            seller.className = 'hide card__seller'
            seller.innerText = res.data[i].seller
            sectionCard.append(seller)

            let type = document.createElement('span')
            type.className = 'hide card__type'
            type.innerText = res.data[i].type
            sectionCard.append(type)

            let section = document.createElement('span')
            section.className = 'hide card__section'
            section.innerText = res.data[i].section
            sectionCard.append(section)

            let salePercentage = document.createElement('span')
            salePercentage.className = 'hide salePercentage'
            salePercentage.innerText = res.data[i].salePercentage
            sectionCard.append(salePercentage)

            let sectionCardTitle = document.createElement('h6')
            sectionCardTitle.className = `favourite__card-title section__card-title`
            sectionCardTitle.textContent = res.data[i].title
            sectionCardInner.append(sectionCardTitle)

            let sectionCardRating = document.createElement('p')
            sectionCardRating.className = `favourite__card-rating section__card-rating`
            sectionCardRating.textContent = res.data[i].rating
            sectionCardInner.append(sectionCardRating)

            let sectionCardCredit = document.createElement('span')
            sectionCardCredit.className = `favourite__card-credit section__card-credit`
            sectionCardInner.append(sectionCardCredit)

            let sectionCardPrice = document.createElement('span')
            sectionCardPrice.className = `favourite__card-price section__card-price`
            sectionCardPrice.textContent = res.data[i].price
            sectionCardInner.append(sectionCardPrice)

            let sectionCardSale = document.createElement('p')
            sectionCardSale.className = `favouritecard-sale section__card-sale`
            sectionCardSale.textContent = Math.round(res.data[i].price / 100 * (100 - res.data[i].salePercentage)) + ' сум'
            sectionCardInner.append(sectionCardSale)
            sectionCardCredit.textContent = Math.round(parseInt(sectionCardSale.textContent) / 6) + ' сум/мес'

            if (res.data[i].promotion == true) {
                let promotionMark = document.createElement('div')
                promotionMark.className = 'section__card-promotion'
                promotionMark.innerText = 'Акция'
                promotionMark.append(sectionCardImgWrap)
            }

            let favouriteBtn = document.createElement('button')
            favouriteBtn.className = `card__favourite card__favourite-clicked`
            favouriteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path d="M5.95 2.67004C8.51792 2.67004 10 4.82238 10 4.82238C10 4.82238 11.485 2.67004 14.05 2.67004C16.705 2.67004 19 4.74004 19 7.62004C19 11.8505 12.5604 16.2897 10.3651 18.2303C10.1582 18.4132 9.84179 18.4132 9.63488 18.2303C7.44056 16.2909 1 11.8503 1 7.62004C1 4.74004 3.295 2.67004 5.95 2.67004Z" fill="white" fill-opacity="0.8"/>
            <path d="M1 7.5349C1 4.87301 3.15017 2.67004 5.86486 2.67004C7.98685 2.67004 9.35921 4.0288 10 4.85677C10.6408 4.0288 12.0132 2.67004 14.1351 2.67004C16.8506 2.67004 19 4.87306 19 7.5349C19 8.69991 18.5328 9.85626 17.8534 10.935C17.1716 12.0176 16.252 13.0603 15.29 14.0077C13.9567 15.3208 12.4757 16.5087 11.4134 17.3607C10.9618 17.7229 10.5859 18.0244 10.3293 18.249C10.1407 18.4139 9.85926 18.4139 9.67075 18.249C9.41405 18.0244 9.03815 17.7229 8.58659 17.3607C7.52431 16.5087 6.04326 15.3208 4.70997 14.0077C3.74802 13.0603 2.82836 12.0176 2.14659 10.935C1.46724 9.85626 1 8.69991 1 7.5349ZM5.86486 3.67004C3.70929 3.67004 2 5.41842 2 7.5349C2 8.43747 2.36553 9.40611 2.99277 10.4021C3.61759 11.3942 4.47833 12.376 5.41165 13.2952C6.71033 14.5742 8.08423 15.675 9.13396 16.5161C9.45728 16.7752 9.74985 17.0096 10 17.217C10.2501 17.0096 10.5427 16.7752 10.866 16.5161C11.9158 15.675 13.2897 14.5742 14.5883 13.2952C15.5217 12.376 16.3824 11.3942 17.0072 10.4021C17.6345 9.40611 18 8.43747 18 7.5349C18 5.41837 16.2914 3.67004 14.1351 3.67004C12.0406 3.67004 10.8181 5.37215 10.5033 5.88032C10.2727 6.25254 9.72727 6.25253 9.4967 5.88031C9.1819 5.37214 7.95944 3.67004 5.86486 3.67004Z" fill="#15151A"/>
            </svg>`
            sectionCard.append(favouriteBtn)

            //favourite btn click settings
            favouriteBtn.onclick = (event) => {

                favouriteBtn.classList.toggle(`card__favourite-clicked`)

                let card = event.target.closest('.section__card')
                let btnId = card.getAttribute('id')

                if (!favouriteBtn.classList.contains(`card__favourite-clicked`)) {

                    axios.delete(`http://localhost:3000/favourite/${btnId}`)

                    card.style.scale = '0'

                    setTimeout(() => {
                        card.style.display = 'none'
                        window.location.reload()
                    }, 300);
                }

            }

            let bagBtn = document.createElement('button')
            bagBtn.className = `card__bag`
            bagBtn.innerHTML = `<img class='card__bag-img' src='./img/bag.svg' alt='bag'>`
            sectionCard.append(bagBtn)

            // adding space after each 3 symbol
            sectionCardPrice.textContent = sectionCardPrice.textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
            sectionCardSale.textContent = sectionCardSale.textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
            sectionCardCredit.textContent = sectionCardCredit.textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ')
        }

        //if there are no favourites hide main favourite
        let mainFavourite = document.querySelector('.favourite__main')
        let favouriteEmpty = document.querySelector('.favourite__empty')

        if (res.data.length == 0) {
            mainFavourite.classList.add('hide')
            favouriteEmpty.classList.remove('hide')
        } else {
            mainFavourite.classList.remove('hide')
            favouriteEmpty.classList.add('hide')
        }

    })


// sign in btn settings
let favouriteEmptyBtn = document.querySelector('.favourite__empty-button')
let favouriteToMainBtn = document.querySelector('.favourite__toMain-button')

favouriteEmptyBtn.onclick = () => {
    favouriteSignIn.style.opacity = '1'
    favouriteSignIn.style.scale = '1'
    document.body.classList.add('locked')
}

if(localStorage.getItem('isAuthorized') == 'true'){
    favouriteEmptyBtn.style.display = 'none'
    favouriteToMainBtn.style.display = 'table'
} else {
    favouriteToMainBtn.style.display = 'none'
    favouriteEmptyBtn.style.display = 'block'
}

//importing js files
import footerAccordeon from "./modules/footer-accordeon";
import topScroll from './modules/top-scroll';
import localStorageJs from "./modules/local-storage";