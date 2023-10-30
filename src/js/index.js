//importing js files
import preloader from "./modules/preloader";
import scrollTop from "./modules/top-scroll";
import headerRegion from "./modules/header-region";
import nav from "./modules/nav";
import mainSlider from "./modules/main-slider";
import toBag from "./modules/to-bag";

//importing createSection function
import { createSection } from "./modules/functions"
import { buttonCreateFunction } from "./modules/functions"

//importing axios
import axios from "axios"


//eid section
createSection('eid', 'Хаитлик')

buttonCreateFunction('eid')

//instalment section
createSection('instalment', 'Рассрочка без переплат')

//market section
createSection('market', 'Базар не выходя из дома')

//popular section
createSection('popular', 'Популярное')

//motors section
createSection('motors', 'UzAuto Motors')

//sport section
createSection('sport', 'Спортивная одежда')

//rest section
createSection('rest', 'Активный отдых')

//purity section
createSection('purity', 'Чистота и уют')

// spring section
createSection('spring', 'Весенний сезон')

// smartphone section
createSection('smartphone', 'Смартфоны')

// menClothing section
createSection('men-clothing', 'Мужская одежда')

// womenClothing section
createSection('women-clothing', 'Женская одежда')

// forHer section
createSection('for-her', 'Только для неё')

// books section
createSection('books', 'Читать - не перечитать')

// forKids section
createSection('for-kids', 'Все лучшее детям')

// kidsClothing section
createSection('kids-clothing', 'Детская одежда')

// forPets section
createSection('for-pets', 'Для братьев меньших')

// sales section
createSection('sales', 'Скидки')

buttonCreateFunction('sales')

// news section
createSection('news', 'Новинки')

buttonCreateFunction('news')

//importing js files
import footerAccordeon from "./modules/footer-accordeon";
import localStorageJs from "./modules/local-storage";