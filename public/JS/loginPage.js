window.onload = () => {
    loginForm()
}

function loginForm() {
    document
        .querySelector('#loginForm')
        .addEventListener('submit', async (e) => {
            e.preventDefault()
            const formObj = {
                username: e.target['username'].value,
                password: e.target['password'].value,
            }
            const resp = await fetch('/api/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formObj),
            })
            if (resp.status == 200) {
                window.location = '/homePage.html'
            } else if (resp.status == 400) {
                document.querySelector(
                    '.reminder'
                ).innerHTML = `<h3>Invalid username or password!!</h3>`
            }
        })
}

function redirectSignUp() {
    window.location = '/sign-up.html'
}
