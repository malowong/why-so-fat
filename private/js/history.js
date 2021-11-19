const historyContainer = document.querySelector('#history-container')

window.onload = async () => {
    await loadHistory()
}

async function loadHistory() {
    const resp = await fetch('/api/food/info')
    const foodList = await resp.json()

    let htmlStr = ``
    for (const food of foodList) {
        htmlStr += /*html*/ `
            <div>${food.food_name}</div>
            <div><img src="../../uploads/${food.food_photo}"></div>
            <div>Energy: ${food.energy}</div>
            <div>Protein: ${food.protein}</div>
            <div>Carbohydrates: ${food.carbohydrates}</div>
            <div>Total fat: ${food.total_fat}</div>
            <div>Saturated fat: ${food.saturated_fat}</div>
            <div>Trans fat: ${food.trans_fat}</div>
            <div>Sodium: ${food.sodium}</div>
            <hr>
        `
    }
    historyContainer.innerHTML = htmlStr
}
