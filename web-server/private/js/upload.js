const form = document.querySelector('#upload-form')
const consumedBtn = document.querySelector('#consumedBtn')
const consumedDropdownItem = document.querySelector('#consumedDropdown')
const quantity = document.querySelector('#quantity')

form.addEventListener('submit', async (e) => {
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
  } else {
    console.log('error')
  }
})

document.querySelector('#per_unit').addEventListener('click', () => {
  if (form.per_unit.value == 'per_serving') {
    document.getElementById('serving_size').hidden = false
  } else if (form.per_unit.value == 'per_package') {
    document.getElementById('serving_size').hidden = true
  } else {
    document.getElementById('serving_size').hidden = true
  }
})

document.querySelector('#is_consumed').addEventListener('click', () => {
  if (form.is_consumed.value == 'YES') {
    quantity.hidden = false
  } else if (form.is_consumed.value == 'NO') {
    quantity.hidden = true
  }
})

const storage = localStorage.getItem('result')

if (storage != null) {
  const result = JSON.parse(storage).data
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


// consumedDropdownItem.addEventListener('click', () => {
//     const text = consumedBtn.innerHTML.trim()
//     console.log(text)
//     if (text == 'YES') {
//         consumedBtn.innerHTML = 'NO'
//         quantity.hidden = true
//         consumedDropdownItem.innerHTML = 'YES'
//     } else {
//         consumedBtn.innerHTML = 'YES'
//         quantity.hidden = false
//         consumedDropdownItem.innerHTML = 'NO'
//     }
// })
