//importing js files
import preloader from "./modules/preloader";
import headerRegion from "./modules/header-region";
import nav from "./modules/nav";

//importing axios
import axios from "axios";

let bagCards = document.querySelector('.bag__cards')
let mainBag = document.querySelector('.bag')
let bagEmpty = document.querySelector('.bag__empty')
let goodsQuantity = document.querySelector('.bag__title-number')
let goodsWord = document.querySelector('.bag__title-goods')
let bagCheckoutInfoGoods = document.querySelector('.bag__checkout-info--goods')
let bagCheckoutInfoPrice = document.querySelector('.bag__checkout-info--price')
let bagCheckoutPrice = document.querySelector('.overall__price')
let overallSaveNumber = document.querySelector('.overall__save-number')
let allPrices = []
let allOldPrices = []
let allQuantities = []

axios.get('http://localhost:3000/bag')
    .then(res => {
        goodsQuantity.textContent = res.data.length
        let goodsQuantityLastLetter = parseInt(goodsQuantity.textContent[goodsQuantity.textContent.length - 1])

        //changing inflectional suffix depending on the quantity of goods 
        if (goodsQuantityLastLetter >= 5 && goodsQuantityLastLetter <= 9 || goodsQuantityLastLetter == 0 || goodsQuantityLastLetter >= 11 && goodsQuantityLastLetter <= 20) {
            goodsWord.textContent = 'товаров'
        }
        else if (goodsQuantityLastLetter == 1) {
            goodsWord.textContent = 'товар'
        }
        else {
            goodsWord.textContent = 'товара'
        }
        for (let i = 0; i < res.data.length; i++) {
            // CARD
            let bagCard = document.createElement('div')
            bagCard.setAttribute('id', res.data[i].id)
            bagCard.className = 'bag__card'
            bagCards.append(bagCard)

            // LEFT
            let bagCardLeft = document.createElement('div')
            bagCardLeft.className = 'bag__card-left'
            bagCard.append(bagCardLeft)

            let bagCardImage = document.createElement('img')
            bagCardImage.className = 'bag__card-image'
            bagCardImage.src = res.data[i].media[0]
            bagCardLeft.append(bagCardImage)

            let bagCardInfo = document.createElement('div')
            bagCardInfo.className = 'bag__card-info'
            bagCardLeft.append(bagCardInfo)

            let bagCardTitleWrap = document.createElement('div')
            bagCardInfo.append(bagCardTitleWrap)

            let bagCardTitle = document.createElement('h4')
            bagCardTitle.className = 'bag__card-title'
            bagCardTitle.textContent = res.data[i].title
            bagCardTitleWrap.append(bagCardTitle)

            let bagCardSellerWrap = document.createElement('div')
            bagCardSellerWrap.className = 'bag__card-seller--wrap'
            bagCardInfo.append(bagCardSellerWrap)

            let bagCardSeller = document.createElement('span')
            bagCardSeller.className = 'bag__card-seller'
            bagCardSeller.textContent = 'Продавец: '
            bagCardSellerWrap.append(bagCardSeller)

            let bagCardSellerName = document.createElement('span')
            bagCardSellerName.className = 'bag__card-seller--name'
            bagCardSellerName.textContent = res.data[i].seller
            bagCardSeller.append(bagCardSellerName)

            let bagCardRating = document.createElement('span')
            bagCardRating.className = 'bag__card-rating'
            bagCardRating.textContent = 'Оценка: '
            bagCardSellerWrap.append(bagCardRating)

            let bagCardRatingNumber = document.createElement('span')
            bagCardRatingNumber.className = 'bag__card-rating--number'
            bagCardRatingNumber.textContent = res.data[i].rating
            bagCardRating.append(bagCardRatingNumber)

            // COUNTER
            let bagCardCounter = document.createElement('div')
            bagCardCounter.className = 'bag__card-counter'
            bagCard.append(bagCardCounter)

            let bagCardCounterMinus = document.createElement('button')
            bagCardCounterMinus.className = 'bag__counter-minus'
            bagCardCounterMinus.textContent = '-'
            bagCardCounter.append(bagCardCounterMinus)

            let bagCardCounterInput = document.createElement('input')
            bagCardCounterInput.className = 'bag__counter-input'
            bagCardCounterInput.readOnly = true
            bagCardCounterInput.type = 'text'
            bagCardCounterInput.value = 1
            bagCardCounter.append(bagCardCounterInput)

            let bagCardCounterPlus = document.createElement('button')
            bagCardCounterPlus.className = 'bag__counter-plus'
            bagCardCounterPlus.textContent = '+'
            bagCardCounter.append(bagCardCounterPlus)

            // RIGHT
            let bagCardRight = document.createElement('div')
            bagCardRight.className = 'bag__card-right'
            bagCard.append(bagCardRight)

            let bagCardDelete = document.createElement('button')
            bagCardDelete.className = 'bag__card-delete'
            bagCardDelete.innerHTML = `<img src="img/bin.svg"> Удалить`
            bagCardRight.append(bagCardDelete)

            let bagCardPrice = document.createElement('h4')
            bagCardPrice.className = 'bag__card-price'
            bagCardRight.append(bagCardPrice)

            let bagCardPriceInner = document.createElement('span')
            bagCardPriceInner.textContent = Math.round(res.data[i].price / 100 * (100 - res.data[i].salePercentage) * res.data[i].amount) + ' сум'
            bagCardPriceInner.textContent = bagCardPriceInner.textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') //adding gap after each 3 symbols
            bagCardPrice.append(bagCardPriceInner)

            let bagCardPriceOld = document.createElement('span')
            bagCardPriceOld.textContent = res.data[i].price * res.data[i].amount
            bagCardPriceOld.textContent = bagCardPriceOld.textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') //adding gap after each 3 symbols
            bagCardPriceOld.className = 'bag__card-price--old'
            bagCardRight.append(bagCardPriceOld)

            // COUNTER
            bagCardCounterInput.value = res.data[i].amount

            bagCardCounterPlus.onclick = () => {
                bagCardCounterInput.value++

                if (bagCardCounterInput.value > parseInt(res.data[i].inStock)) {
                    bagCardCounterInput.value = res.data[i].inStock
                }

                axios.patch(`http://localhost:3000/bag/${cardId}`, {
                    amount: bagCardCounterInput.value
                })

                setTimeout(() => {
                    window.location.reload()
                }, 200); //refreshing page after 200ms

            }

            bagCardCounterMinus.onclick = () => {
                bagCardCounterInput.value--

                if (bagCardCounterInput.value < 1) {
                    bagCardCounterInput.value = 1
                }

                axios.patch(`http://localhost:3000/bag/${cardId}`, {
                    amount: bagCardCounterInput.value
                })

                setTimeout(() => {
                    window.location.reload()
                }, 200); //refreshing page after 200ms
            }

            // CHECKOUT
            let reg = /[A-Za-zA-Яа-яЁё]/g;

            allOldPrices.push(parseInt(res.data[i].price) * parseInt(res.data[i].amount))
            allQuantities.push(parseInt(res.data[i].amount))
            allPrices.push(parseInt(bagCardPriceInner.textContent.replace(' ', '').replace(reg, '')))
            console.log(allPrices);
            console.log(allOldPrices);

            bagCheckoutInfoGoods.textContent = `Товары (${allQuantities.reduce((a, b) => a + b)}):`

            bagCheckoutInfoPrice.textContent = allPrices.reduce((a, b) => a + b)

            bagCheckoutPrice.textContent = allPrices.reduce((a, b) => a + b)

            overallSaveNumber.textContent = allOldPrices.reduce((a, b) => a + b) - allPrices.reduce((a, b) => a + b)

            bagCheckoutInfoPrice.textContent = bagCheckoutInfoPrice.textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') //adding gap after each 3 symbols
            bagCheckoutPrice.textContent = bagCheckoutPrice.textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') //adding gap after each 3 symbols
            overallSaveNumber.textContent = overallSaveNumber.textContent.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ') //adding gap after each 3 symbols

            // DELETE
            let cardId = bagCard.getAttribute('id')
            bagCardDelete.onclick = () => {
                axios.delete(`http://localhost:3000/bag/${cardId}`)

                bagCardDelete.closest('.bag__card').style.opacity = '0'
                bagCardDelete.closest('.bag__card').style.scale = '0'

                setTimeout(() => {
                    bagCardDelete.closest('.bag__card').classList.add('hide')
                    window.location.reload() // refreshing page after 400ms
                }, 400);
            }
        }

        if (res.data.length == 0) {
            mainBag.classList.add('hide')
            bagEmpty.classList.remove('hide')
        } else {
            mainBag.classList.remove('hide')
            bagEmpty.classList.add('hide')
        }
    })



//importing js files
import footerAccordeon from "./modules/footer-accordeon";
import localStorageJs from "./modules/local-storage";
import topScroll from './modules/top-scroll';