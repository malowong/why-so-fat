const form = document.querySelector('#upload-form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('food_name', form.food_name.value)
    formData.append('total_weight', form.total_weight.value)
    formData.append('image', form.image.files[0])
    console.log({
        a: form.food_name.value,
        b: form.image.files[0],
    })
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
