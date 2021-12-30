const historyContainer = document.querySelector('#history-container')

window.onload = async () => {
  await loadHistory()
}

nameMap = new Map([
  ['energy', 'Energy'],
  ['protein', 'Protein'],
  ['total_fat', 'Total Fat'],
  ['saturated_fat', 'Saturated Fat'],
  ['trans_fat', 'Trans Fat'],
  ['carbohydrates', 'Carbohydrates'],
  ['sugars', 'Sugar'],
  ['sodium', 'Sodium'],
])

const unitMap = new Map([
  ['energy', 'Kcal'],
  ['protein', 'g'],
  ['total_fat', 'g'],
  ['saturated_fat', 'g'],
  ['trans_fat', 'g'],
  ['carbohydrates', 'g'],
  ['sugars', 'g'],
  ['sodium', 'mg'],
])

unitMap.set('energy', 'Kcal')

async function loadHistory() {
  const resp = await fetch('/api/consumption/history')
  const consumptions = (await resp.json()).rows

  const consumptionMap = new Map()

  for (const consumption of consumptions) {
    const consumptionDate = Date.parse(
      new Date(consumption['created_at'])
    ).toString('yyyy-MM-dd')

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
        })
      }
    } else {
      consumptionMap.set(consumptionDate, [
        {
          foodName: foodName,
          nutrition: [{ [nutritionName]: nutritionValue }],
          totalWeight: totalWeight,
        },
      ])
    }
  }

  const sortConsumptionMap = new Map(
    [...consumptionMap.entries()].sort().reverse()
  )

  const mapKeys = Array.from(sortConsumptionMap.keys())
  const mapValues = Array.from(sortConsumptionMap.values())

  let htmlStr = ``

  for (const mapKey of mapKeys) {
    htmlStr += /*html*/ `<div class="date-row mb-3"><h3>${mapKey}</h3>
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal-${mapKey}">
              Details
          </button></div>

          <div class="modal fade" id="exampleModal-${mapKey}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="top: 80px; overflow-y: initial !important;">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="exampleModalLabel">Details</h4>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div id="d-${mapKey}" class="modal-body" style="height: 61vh; overflow-y: auto;">

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`
  }

  historyContainer.innerHTML = htmlStr
  for (let i = 0; i < mapValues.length; i++) {
    let y = 0
    let modalStr = ``

    for (const mapValue of mapValues[i]) {
      // <h6>Quantity: ${mapValue.quantity}</h6>
      // <div>
      //     <button type="button" id="more-btn-${mapKeys[i]}-${y}" class="btn btn-success" onclick="showNutritionDetails('${mapKeys[i]}',${y})">
      //         More
      //     </button>
      //     <div data-id='${mapKeys[i]}-${y}' class="more"></div>
      // </div>
      modalStr += /*html*/ `
            <div class="food-row"> 
                <div class="food-info">
                    <h4>${mapValue.foodName}</h4>
                    <h6>Weight: ${mapValue.totalWeight} g</h6>
                </div>
        
            </div> 
            `

      modalStr += `<hr>`
      y++
    }

    document.querySelector(`#d-${mapKeys[i]}`).innerHTML = modalStr
  }

  // for (let i = 0; i < mapValues.length; i++) {
  //   let j = 0

  //   for (const mapValue of mapValues[i]) {
  //     let moreStr = ``

  //     for (const nutrition of mapValue['nutrition']) {
  //       moreStr += /*html*/ `
  //       <div>${nameMap.get(Object.keys(nutrition).toString())}: ${Object.values(
  //         nutrition
  //       )} ${unitMap.get(Object.keys(nutrition).toString())}</div>
  //       `
  //     }
  //     document.querySelector(`[data-id='${mapKeys[i]}-${j}']`).innerHTML =
  //       moreStr
  //     j++
  //   }
  // }
}

function showNutritionDetails(mapKey, i) {
  const moreText = document.querySelector(`[data-id='${mapKey}-${i}']`)
  const btnText = document.querySelector(`#more-btn-${mapKey}-${i}`)

  if (btnText.innerHTML === 'Hide') {
    btnText.innerHTML = 'More'
    moreText.style.display = 'none'
  } else {
    btnText.innerHTML = 'Hide'
    moreText.style.display = 'inline'
  }
}
