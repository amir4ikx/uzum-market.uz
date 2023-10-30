import axios from "axios"
import localSearch from "./local-search"

let navCatalog = document.querySelector('.nav__catalog')
let navMenuLogIn = document.querySelector('.nav__menu-log-in')
let navMenuLogInText = document.querySelector('.nav__menu-log-in-text')
let catalogLinks = document.querySelector('.nav__catalog-links')
let logInBtn = document.querySelector('.log-in__enter')

navCatalog.onclick = () => {
    navCatalog.classList.toggle('nav__catalog-active')
    catalogLinks.classList.toggle('nav__catalog-links--active')
}

//SIGN IN
let signIn = document.querySelector('.sign-in')
let signInClose = document.querySelector('.sign-in__close')
let signInModal = document.querySelector('.sign-in__modal')
let signInBtn = document.querySelector('.sign-in__enter')
let signInSubmit = document.querySelector('.sign-in__btn')
let signInFormName = document.querySelector('.sign-in__form-name')
let signInFormLogin = document.querySelector('.sign-in__form-login')
let signInFormPassword = document.querySelector('.sign-in__form-password')

let logInClose = document.querySelector('.log-in__close')
let logInModal = document.querySelector('.log-in__modal')
let logInSubmit = document.querySelector('.log-in__btn')
let logInFormLogin = document.querySelector('.log-in__form-login')
let logInFormPassword = document.querySelector('.log-in__form-password')
let loginError = document.querySelector('.login-error')

signInClose.onclick = () => {
    signIn.style.opacity = '0'
    signIn.style.scale = '0'

    document.body.classList.remove('locked')
    signInFormName.classList.remove('red-outline')
    signInFormLogin.classList.remove('red-outline')
    signInFormPassword.classList.remove('red-outline')

    signInFormName.value = ''
    signInFormLogin.value = ''
    signInFormPassword.value = ''
}

logInClose.onclick = () => {
    signIn.style.opacity = '0'
    signIn.style.scale = '0'

    logInFormLogin.value = ''
    logInFormPassword.value = ''

    document.body.classList.remove('locked')
    logInFormLogin.classList.remove('red-outline')
    logInFormPassword.classList.remove('red-outline')
}


signInBtn.onclick = () => {
    logInModal.classList.toggle('non-active-modal')
    signInModal.classList.toggle('non-active-modal')
}

logInBtn.onclick = () => {
    logInModal.classList.toggle('non-active-modal')
    signInModal.classList.toggle('non-active-modal')
}

// Регистрация
signInSubmit.onclick = () => {

    signInFormName.value == '' ? signInFormName.classList.add('red-outline') : signInFormName.classList.remove('red-outline')

    signInFormLogin.value == '' ? signInFormLogin.classList.add('red-outline') : signInFormLogin.classList.remove('red-outline')

    signInFormPassword.value == '' ? signInFormPassword.classList.add('red-outline') : signInFormPassword.classList.remove('red-outline')

    if (signInFormName.value != '' && signInFormLogin.value != '' && signInFormPassword.value != '') {

        if (signInFormLogin.value.length >= 8 && signInFormPassword.value.length >= 8) {
            axios.post('http://localhost:3000/users', {
                name: signInFormName.value,
                login: signInFormLogin.value,
                password: signInFormPassword.value

            })

            localStorage.setItem('isAuthorized', 'true')
            localStorage.setItem('accountName', signInFormName.value)
            localStorage.setItem('accountLogin', signInFormLogin.value)
            navMenuLogInText.textContent = localStorage.getItem('accountName')
        }
    }
}

// Вход
axios.get('http://localhost:3000/users')
    .then(res => {

        logInSubmit.onclick = (e) => {

            logInFormLogin.value == '' ? logInFormLogin.classList.add('red-outline') : logInFormLogin.classList.remove('red-outline')

            logInFormPassword.value == '' ? logInFormPassword.classList.add('red-outline') : logInFormPassword.classList.remove('red-outline')

            for (let data of res.data) {

                if (logInFormLogin.value == data.login && logInFormPassword.value == data.password) {

                    localStorage.setItem('isAuthorized', 'true')
                    localStorage.setItem('accountName', data.name)
                    localStorage.setItem('accountLogin', data.login)
                    navMenuLogInText.textContent = localStorage.getItem('accountName')

                    window.location.reload()
                }

                else if (logInFormLogin.value != data.login && logInFormPassword.value != data.password) {
                    loginError.textContent = 'Логин или пароль введены не правильно'
                    loginError.classList.add('login-error-active')

                    setTimeout(() => {
                        loginError.classList.remove('login-error-active')
                    }, 3500);

                    e.preventDefault()
                }
            }
        }

    })

// AUTHORIZED
let authorized = document.querySelector('.authorized')
let authorizedClose = document.querySelector('.authorized__close')
let authorizedLogOut = document.querySelector('.authorized__log-out')
let authorizedName = document.querySelector('.authorized__name')
let authorizedLogin = document.querySelector('.authorized__login')

if (localStorage.getItem('isAuthorized') == 'true') {

    navMenuLogIn.onclick = () => {
        authorized.classList.remove('authorized__non-active')
    }

    authorizedName.textContent = localStorage.getItem('accountName')
    authorizedLogin.textContent = localStorage.getItem('accountLogin')
}

else {
    navMenuLogIn.onclick = () => {
        signIn.style.opacity = '1'
        signIn.style.scale = '1'
        document.body.classList.add('locked')
    }
}

authorizedClose.onclick = () => {
    authorized.classList.add('authorized__non-active')
}

authorizedLogOut.onclick = () => {
    localStorage.setItem('isAuthorized', 'false')
    localStorage.removeItem('accountName')
    localStorage.removeItem('accountLogin')
    navMenuLogInText.textContent = 'Войти'

    window.location.reload()
}

//BURGERMENU
let burgermenu = document.querySelector('.nav__burgermenu')
let burgermenuClose = document.querySelector('.nav__burgermenu-close')
let burgermenuWrap = document.querySelector('.nav__burgermenu-wrap')
let burgermenuLogIn = document.querySelector('.nav__burgermenu-log-in')
let burgermenuSignIn = document.querySelector('.nav__burgermenu-sign-in')
let burgermenuCatalog = document.querySelector('.nav__burgermenu-catalog')
let burgermenuLinks = document.querySelector('.nav__burgermenu-links')
let burgermenuArrow = document.querySelector('.nav__burgermenu-catalog--arrow')


burgermenuCatalog.onclick = () => {
    burgermenuLinks.classList.toggle('nav__burgermenu-links--active')
    burgermenuArrow.classList.toggle('arrow-active')
}

burgermenuLogIn.onclick = () => {
    signIn.style.opacity = '1'
    signIn.style.scale = '1'
    document.body.classList.add('locked')
    logInModal.classList.remove('non-active-modal')
    signInModal.classList.add('non-active-modal')
}

burgermenuSignIn.onclick = () => {
    signIn.style.opacity = '1'
    signIn.style.scale = '1'
    document.body.classList.add('locked')
    logInModal.classList.add('non-active-modal')
    signInModal.classList.remove('non-active-modal')
}

burgermenu.onclick = () => {
    burgermenuWrap.classList.remove('burgermenu-non-active')
    document.body.classList.add('locked')
}

burgermenuClose.onclick = () => {
    burgermenuWrap.classList.add('burgermenu-non-active')
    document.body.classList.remove('locked')
}

//accordeon
document.querySelectorAll('.nav__accordeon-click').forEach(e => {
    e.onclick = () => {
        let content = e.nextElementSibling
        if (content.style.maxHeight) {
            document.querySelectorAll('.nav__accordeon-content').forEach(e => {
                e.style.maxHeight = null
            })
        } else {
            document.querySelectorAll('.nav__accordeon-content').forEach(e => {
                e.style.maxHeight = null
            })
            content.style.maxHeight = content.scrollHeight + 'px'
        }
    }
})

export default nav;