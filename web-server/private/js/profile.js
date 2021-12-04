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
        <div class="mt-2">${user.energy_intake}kcal</div>
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
  const energyIntakeValue = parseInt(editForm.energyIntake.value)

  if (
    isNaN(heightValue) ||
    isNaN(weightValue) ||
    isNaN(energyIntakeValue) ||
    heightValue < 0 ||
    weightValue < 0 ||
    energyIntakeValue < 0
  ) {
    editMessage.innerHTML = 'Your input must be a positive number!'
    return
  } else if (energyIntakeValue <= 1000) {
    editMessage.innerHTML = 'Your energy intake must be larger than 1000 kcal!'
  }

  let formObj = {}
  formObj.height = heightValue
  formObj.weight = weightValue
  formObj.energyIntake = energyIntakeValue

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
