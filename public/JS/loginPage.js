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
                window.location = '/index.html'
            }
        })
}
