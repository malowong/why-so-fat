const userInfo = document.querySelector('#user-info')
const logoutButton = document.querySelector('.btn')

window.onload = async () => {
    await loadProfile()
}

async function loadProfile() {
    const resp = await fetch('/api/user/profile')
    const user = await resp.json()
    const BMI = user.weight / (user.height / 100) ** 2

    let htmlStr = ``
    htmlStr += /*html*/ `
        <div>Hello ${user.username}</div>
        <div>Height: ${user.height}cm</div>
        <div>Weight: ${user.weight}kg</div>
        <div>BMI: ${BMI.toFixed(1)}</div>
    `

    userInfo.innerHTML = htmlStr
}

logoutButton.addEventListener('click', async () => {
    const resp = await fetch('/api/user/logout')
    if (resp.status == 200) {
        localStorage.clear()
        window.location = '/login-page.html'
    }
})
