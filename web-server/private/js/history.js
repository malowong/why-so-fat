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
        const totalWeight = consumption.total_weight

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
                    totalWeight: totalWeight,
                    quantity: quantity,
                })
            }
        } else {
            consumptionMap.set(consumptionDate, [
                {
                    foodName: foodName,
                    nutrition: [{ [nutritionName]: nutritionValue }],
                    totalWeight: totalWeight,
                    quantity: quantity,
                },
            ])
        }
    }

    const mapKeys = Array.from(consumptionMap.keys())
    const mapValues = Array.from(consumptionMap.values())[0]

    let htmlStr = ``
    for (const mapKey of mapKeys) {
        htmlStr += /*html*/ `<div class="date-row"><h3>${mapKey}</h3>
        <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Details
        </button></div>
        
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title" id="exampleModalLabel">Details</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>`
    }
    historyContainer.innerHTML = htmlStr

    let modalStr = ``
    let i = 1
    for (const mapValue of mapValues) {
        modalStr += /*html*/ `
        <div class="food-row"> 
            <div class="food-info">
                <h4>${mapValue.foodName}</h4>
                <h6>Quantity: ${mapValue.quantity}</h6>
                <h6>Weight: ${mapValue.totalWeight}</h6>
            </div>
    
            <div class="ms-5"> 
                <button type="button" id="more-btn-${i}" class="btn btn-info" onclick="showNutritionDetails(${i})">
                    More
                </button>
                <div data-id=${i} class="more"></div>
            </div>
        </div> 
        `

        modalStr += `<hr>`
        i++
    }

    document.querySelector('.modal-body').innerHTML = modalStr

    let j = 1
    for (const mapValue of mapValues) {
        let moreStr = ``
        for (const nutrition of mapValue['nutrition']) {
            console.log(mapValue)
            moreStr += /*html*/ `
        <div>${Object.keys(nutrition)}: ${(
                (Object.values(nutrition) / 100) *
                mapValue.totalWeight *
                mapValue.quantity
            ).toFixed(1)}</div>
        `
        }
        document.querySelector(`[data-id='${j}']`).innerHTML = moreStr
        j++
    }
}

function showNutritionDetails(i) {
    const moreText = document.querySelector(`[data-id='${i}']`)
    const btnText = document.querySelector(`#more-btn-${i}`)

    if (btnText.innerHTML === 'Hide') {
        btnText.innerHTML = 'More'
        moreText.style.display = 'none'
    } else {
        btnText.innerHTML = 'Hide'
        moreText.style.display = 'inline'
    }
}
