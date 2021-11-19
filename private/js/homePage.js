const profileContainer = document.querySelector('#profile-container')

window.onload = async () => {
    await loadProfile()
}

async function loadProfile() {
    const resp = await fetch('/api/user/profile')
    const user = await resp.json()
    const BMI = user.weight / (user.height / 100) ** 2

    profileContainer.innerHTML = `<div>Hello ${user.username}</div>`
}
