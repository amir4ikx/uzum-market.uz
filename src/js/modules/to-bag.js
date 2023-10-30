import axios from "axios"

window.onload = () => {

    // variables
    let bagBtns = document.querySelectorAll('.card__bag')
    let toBagSection = document.querySelector('.to-bag')
    let toBagModal = document.querySelector('.to-bag__modal')
    let toBagClose = document.querySelector('.to-bag__close')
    let toBagImg = document.querySelector('.to-bag__left-img')
    let toBagTitle = document.querySelector('.to-bag__title')
    let toBagInStock = document.querySelector('.to-bag__instock--number')
    let toBagInStockWrap = document.querySelector('.to-bag__instock')
    let toBagPriceSale = document.querySelector('.to-bag__price-sale')
    let toBagPriceOld = document.querySelector('.to-bag__price-oldprice')
    let toBagInstallmentPrice = document.querySelector('.to-bag__installment-price')
    let toBagBtn = document.querySelector('.to-bag__btn')
    let counterInput = document.querySelector('.to-bag__counter-input')
    let counterMinus = document.querySelector('.to-bag__counter-minus')
    let counterPlus = document.querySelector('.to-bag__counter-plus')
    let toBagImgSrc;

    //other information
    let toBagDescription = document.querySelector('.to-bag__description')
    let toBagSeller = document.querySelector('.to-bag__seller')
    let toBagRating = document.querySelector('.to-bag__rating')
    let toBagSalePercentage = document.querySelector('.to-bag__sale-percentage')
    let toBagSectionInfo = document.querySelector('.to-bag__section')
    let toBagType = document.querySelector('.to-bag__type')

    bagBtns.forEach(btn => {
        btn.onclick = () => {
            toBagSection.classList.remove('hide')
            document.body.classList.add('locked')
            toBagModal.classList.add('from-bottom')
            toBagModal.classList.remove('opacity-none')

            let card = btn.closest('.section__card')

            toBagImg.style.backgroundImage = `url(${card.querySelector('.section__card-img').src})`
            toBagTitle.textContent = card.querySelector('.section__card-title').textContent
            toBagInStock.textContent = card.querySelector('.card__in-stock').textContent
            toBagPriceSale.textContent = card.querySelector('.section__card-sale').textContent
            toBagPriceOld.textContent = card.querySelector('.section__card-price').textContent
            toBagInstallmentPrice.textContent = card.querySelector('.section__card-credit').textContent

            toBagImgSrc = card.querySelector('.section__card-img').src

            //other information
            toBagDescription.textContent = card.querySelector('.card__description').textContent
            toBagSeller.textContent = card.querySelector('.card__seller').textContent
            toBagRating.textContent = card.querySelector('.section__card-rating').textContent
            toBagSalePercentage.textContent = card.querySelector('.salePercentage').textContent
            toBagSectionInfo.textContent = card.querySelector('.card__section').textContent
            toBagType.textContent = card.querySelector('.card__type').textContent

            if (parseInt(toBagInStock.textContent) == 0) {
                toBagInStockWrap.style.color = 'red'
                toBagBtn.disabled = true
                counterInput.value = 0
            } else {
                toBagInStockWrap.style.color = 'green'
                toBagBtn.disabled = false
                counterInput.value = 1
            }
        }

        //close
        toBagClose.onclick = () => {
            document.body.classList.remove('locked')
            toBagModal.classList.add('opacity-none')

            setTimeout(() => {
                toBagSection.classList.add('hide')
            }, 400);
        }

        //counter
        counterPlus.onclick = () => {
            counterInput.value++
            if (counterInput.value > parseInt(toBagInStock.innerHTML)) {
                counterInput.value = toBagInStock.innerHTML
            }
        }

        counterMinus.onclick = () => {
            counterInput.value--
            if (parseInt(toBagInStock.textContent) == 0) {
                counterInput.value = 0
            }
            else if (counterInput.value < 1) {
                counterInput.value = 1
            }
        }

        toBagBtn.onclick = (event) => {
            let card = event.target.closest('.to-bag__modal')
            let oldPrice = card.querySelector('.to-bag__price-oldprice').textContent.replaceAll(' ', '')
            let goodAmount = card.querySelector('.to-bag__counter-input').value


            if (parseInt(card.querySelector('.to-bag__instock--number').textContent) != 0) {

                axios.post('http://localhost:3000/bag', {
                    media: [toBagImgSrc],
                    title: card.querySelector('.to-bag__title').textContent,
                    description: card.querySelector('.to-bag__description').textContent,
                    inStock: card.querySelector('.to-bag__instock--number').textContent,
                    seller: card.querySelector('.to-bag__seller').textContent,
                    rating: card.querySelector('.to-bag__rating').textContent,
                    salePercentage: card.querySelector('.to-bag__sale-percentage').textContent,
                    section: card.querySelector('.to-bag__section').textContent,
                    type: card.querySelector('.to-bag__type').textContent,
                    amount: goodAmount,
                    price: parseInt(oldPrice) * parseInt(goodAmount),
                })

                document.body.classList.remove('locked')
                toBagModal.classList.add('opacity-none')

                setTimeout(() => {
                    toBagSection.classList.add('hide')
                }, 400);
            }
        }
    })
}

export default toBag;