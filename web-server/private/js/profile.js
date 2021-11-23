const userInfo = document.querySelector('#user-info')
const logoutButton = document.querySelector('.btn')

window.onload = async () => {
    await loadProfile()
}

async function loadProfile() {
    const resp = await fetch('/api/user/profile')
    const user = await resp.json()
    const BMI = user.weight / (user.height / 100) ** 2

    let boyOrGirlImage
    if (user.gender == 'male') {
        boyOrGirlImage = 'boy.png'
    } else if (user.gender == 'female') {
        boyOrGirlImage = 'girl.png'
    }

    let htmlStr = ``
    htmlStr += /*html*/ `
        <img class="user-img" src=${boyOrGirlImage}>
        <div class="mt-3">${user.username}</div>
        <div class="mt-2">${user.height}cm</div>
        <div class="mt-2">${user.weight}kg</div>
        <div class="mt-2">BMI: ${BMI.toFixed(1)}</div>
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
