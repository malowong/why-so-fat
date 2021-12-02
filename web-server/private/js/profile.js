const userInfo = document.querySelector('#user-info')
const logoutButton = document.querySelector('.logout-btn')
const editForm = document.querySelector('#edit-form')
const editMessage = document.querySelector('.edit-message')

window.onload = async () => {
  await loadProfile()
}

async function loadProfile() {
  const resp = await fetch('/api/user/profile')
  const user = await resp.json()
  const BMI = user.weight / (user.height / 100) ** 2

  let boyOrGirlImage = user.gender == 'male' ? 'boy.png' : 'girl.png'
  const htmlStr = /*html*/ `
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

editForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  const heightValue = parseInt(editForm.height.value)
  const weightValue = parseInt(editForm.weight.value)

  if (isNaN(heightValue) || isNaN(weightValue)) {
    editMessage.innerHTML = 'Please input number'
    return
  } else if (heightValue < 0 || weightValue < 0) {
    editMessage.innerHTML = 'Please input positive number'
    return
  }

  let formObj = {}
  formObj.height = heightValue
  formObj.weight = weightValue

  const resp = await fetch('/api/user/profile', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formObj),
  })

  if (resp.status == 200) {
    window.location = '/profile.html'
  }
})
