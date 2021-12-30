function redirectLoginIn() {
  window.location = '/login-page.html'
}

document.querySelector('#signUpForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  console.log(e.target['username'].value)
  console.log(e)
  console.log(e.target['energyIntake'].value)
  const formObj = {
    username: e.target['username'].value,
    password: e.target['password'].value,
    gender: e.target['dropbtn'].value,
    height: e.target['height'].value,
    weight: e.target['weight'].value,
    energy_intake: e.target['energyIntake'].value,
  }
  console.log(formObj)
  const resp = await fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formObj),
  })
  console.log(resp)
  if (resp.status == 200) {
    localStorage.setItem('user', e.target['username'].value)
    window.location = '/home-page.html'
  } else if (resp.status == 400) {
    document.querySelector('.reminder').innerHTML = `<h3>${
      (await resp.json()).message
    }</h3>`
  }
})
