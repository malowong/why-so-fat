const profileContainer = document.querySelector('#profile-container')

window.onload = async () => {
    await loadProfile()
}

async function loadProfile() {
    const resp = await fetch('/api/user/profile')
    const user = await resp.json()

    let htmlStr = ``
    htmlStr += /*html*/ `
        <div>Name: ${user.username}</div>
        <div>Gender: ${user.gender}</div>
        <div>Height: ${user.height}</div>
        <div>Weight: ${user.weight}</div>
    `

    profileContainer.innerHTML = htmlStr
}
