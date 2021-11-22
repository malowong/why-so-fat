const historyContainer = document.querySelector('#history-container')

window.onload = async () => {
    await loadHistory()
}

async function loadHistory() {
    const resp = await fetch('/api/consumption/history')
    const consumptions = await resp.json()

    const consumptionMap = new Map()

    for (const consumption of consumptions) {
        const consumptionDate = consumption['created_at'].slice(0, 10)
        const foodName = consumption.food_name
        const nutritionName = consumption.nutrition_name
        const nutritionValue = consumption.nutrition_value
        const quantity = consumption.quantity

        if (consumptionMap.has(consumptionDate)) {
            if (
                consumptionMap
                    .get(consumptionDate)
                    .some((element) => element.foodName === foodName)
            ) {
                consumptionMap
                    .get(consumptionDate)
                    .find((element) => element.foodName === foodName)
                    .nutrition.push({ [nutritionName]: nutritionValue })
            } else {
                consumptionMap.get(consumptionDate).push({
                    foodName: foodName,
                    nutrition: [{ [nutritionName]: nutritionValue }],
                    quantity: quantity,
                })
            }
        } else {
            consumptionMap.set(consumptionDate, [
                {
                    foodName: foodName,
                    nutrition: [{ [nutritionName]: nutritionValue }],
                    quantity: quantity,
                },
            ])
        }
    }

    const mapKeys = Array.from(consumptionMap.keys())
    const mapValues = Array.from(consumptionMap.values())[0]
    console.log(mapValues)

    let htmlStr = ``
    for (const mapKey of mapKeys) {
        htmlStr += `<h1>${mapKey}</h1>`
        for (const mapValue of mapValues) {
            htmlStr += /*html*/ `
                <h5>${mapValue.foodName}</h5>
                <h6>${mapValue.quantity}</h6>
            `
            for (const nutrition of mapValue['nutrition']) {
                htmlStr += /*html*/ `
                    <div>${Object.keys(nutrition)}: ${Object.values(
                    nutrition
                )}</div>
                `
            }
        }
    }
    historyContainer.innerHTML = htmlStr
}
