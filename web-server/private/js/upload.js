import result from '../crop/js/edit.js'

const form = document.querySelector('#upload-form')
const toggle = document.querySelector('.dropdown-toggle')
const item = document.querySelector('.dropdown-item')
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
    formData.append('is_consumed', toggle.innerHTML)
    console.log(formData)
    form.reset()
    const resp = await fetch('/api/food/upload', {
        method: 'POST',
        body: formData,
    })
    if (resp.status === 200) {
        console.log('OK')
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

item.addEventListener('click', () => {
    const text = toggle.innerHTML.trim()
    if (text == 'YES') {
        toggle.innerHTML = 'NO'
        quantity.hidden = true
        item.innerHTML = 'YES'
    } else {
        toggle.innerHTML = 'YES'
        quantity.hidden = false
        item.innerHTML = 'NO'
    }
})
