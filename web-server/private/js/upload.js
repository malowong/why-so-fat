const form = document.querySelector('#upload-form')
const consumedBtn = document.querySelector('#consumedBtn')
const consumedDropdownItem = document.querySelector('#consumedDropdown')
const quantity = document.querySelector('#quantity')

form.addEventListener('submit', async (e) => {
  console.log(e)
  e.preventDefault()

  const formData = new FormData()
  formData.append('food_name', form.food_name.value)
  formData.append('per_unit', form.per_unit.value)
  formData.append('total_weight', form.total_weight.value)
  formData.append('serving_size', form.serving_size.value)
  formData.append('image', form.image.files[0])
  formData.append('energy', form.energy.value)
  formData.append('protein', form.protein.value)
  formData.append('total_fat', form.total_fat.value)
  formData.append('saturated_fat', form.saturated_fat.value)
  formData.append('trans_fat', form.trans_fat.value)
  formData.append('carbohydrates', form.carbohydrates.value)
  formData.append('sugars', form.sugars.value)
  formData.append('sodium', form.sodium.value)
  formData.append('is_consumed', form.is_consumed.value)
  formData.append('quantity', parseFloat(form.quantity.value))

  const resp = await fetch('/api/food/upload', {
    method: 'POST',
    body: formData,
  })

  if (resp.status === 200) {
    console.log('OK')
    form.reset()
    localStorage.removeItem('result')
    window.location = '/home-page.html'
  } else {
    document.querySelector('#db-feedback-msg').innerHTML = `<h3>${
      (await resp.json()).message
    }</h3>`
  }
})

document.querySelector('#per_unit').addEventListener('input', () => {
  if (form.per_unit.value == 'per_serving') {
    document.getElementById('serving_size').hidden = false
    document.getElementById('serving_size').setAttribute('required', '')
  } else {
    document.getElementById('serving_size').hidden = true
    document.getElementById('serving_size').removeAttribute('required')
  }
})

document.querySelector('#is_consumed').addEventListener('input', () => {
  if (form.is_consumed.value == 'YES') {
    quantity.hidden = false
  } else if (form.is_consumed.value == 'NO') {
    quantity.hidden = true
  }
})

const storage = localStorage.getItem('result')
const result = JSON.parse(storage).data
console.log(result)

if (storage != null) {
  document.getElementById('per_unit').value = result.per

  if(result.per = 'per_serving'){
    document.getElementById('serving_size').hidden = false
    document.getElementById('serving_size_input').value = parseFloat(result.serving_size)
  }

  document.getElementById('energy').value = parseFloat(result.energy)
  document.getElementById('protein').value = parseFloat(result.protein)
  document.getElementById('total_fat').value = parseFloat(result.total_fat)
  document.getElementById('saturated_fat').value = parseFloat(
    result.saturated_fat
  )
  document.getElementById('trans_fat').value = parseFloat(result.trans_fat)
  document.getElementById('carbohydrates').value = parseFloat(
    result.carbohydrates
  )
  document.getElementById('sugars').value = parseFloat(result.sugar)
  document.getElementById('sodium').value = parseFloat(result.sodium)
}

document.getElementById('blah').addEventListener('click', () => {
  document.getElementById('image').click()
})

document.getElementById('next-btn').addEventListener('click', () => {
  const a = document.querySelector('#upload-form').food_name.reportValidity()
  const b = document.querySelector('#upload-form').total_weight.reportValidity()
  const c = document.querySelector('#upload-form').is_consumed.reportValidity()

  if (a == true && b == true && c == true) {
    console.log('hi')
    document.querySelector('.first-page').hidden = true
    document.querySelector('.second-page').hidden = false
    document.getElementById('serving_size').hidden = true
  }
})

document.getElementById('back-btn').addEventListener('click', () => {
  document.querySelector('.second-page').hidden = true
  document.querySelector('.first-page').hidden = false
})