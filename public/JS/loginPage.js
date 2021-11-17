window.onload = () => {
    loginForm()
}

function loginForm() {
    document
        .querySelector('#loginForm')
        .addEventListener('submit', async (e) => {
            e.preventDefault()
            const formObj = {
                username: form['username'].value,
                password: form['password'].value,
            }
            const resp = await fetch('/loginData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObject),
            })
            if (resp.status == 200) {
                window.location = '/'
            }
        })
}
