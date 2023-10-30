document.querySelectorAll('.footer__accordeon-click').forEach(e => {
    e.onclick = () => {
        let content = e.nextElementSibling
        if (content.style.maxHeight) {
            document.querySelectorAll('.footer__accordeon-content').forEach(e => {
                e.style.maxHeight = null
            })
        } else {
            document.querySelectorAll('.footer__accordeon-content').forEach(e => {
                e.style.maxHeight = null
            })
            content.style.maxHeight = content.scrollHeight + 'px'
        }
    }
})
export default footerAccordeon;