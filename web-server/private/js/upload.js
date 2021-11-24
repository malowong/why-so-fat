const form = document.querySelector('#upload-form')

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
    console.log(formData)
    form.reset()
    document.getElementById('blah').removeAttribute('src')
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

const storage = localStorage.getItem('result')
const result = JSON.parse(storage).data

document.getElementById("energy").value = parseInt(result.energy)
document.getElementById("protein").value = parseInt(result.protein)
document.getElementById("total_fat").value = parseInt(result.total_fat)
document.getElementById("saturated_fat").value = parseInt(result.saturated_fat)
document.getElementById("trans_fat").value = parseInt(result.trans_fat)
document.getElementById("carbohydrates").value = parseInt(result.carbohydrates)
document.getElementById("sugars").value = parseInt(result.sugar)
document.getElementById("sodium").value = parseInt(result.sodium)

