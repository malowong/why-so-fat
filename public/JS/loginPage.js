const e = require('cors')

window.onload = () => {
    loginForm()
}

function loginForm() {
    const loginForm = document.querySelector('#loginForm')
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const formObj = {
            username: form['username'].value,
            password: form['password'].value,
        }
        const resp = await fetch('/loginData')
    })
}
