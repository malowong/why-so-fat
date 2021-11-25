const todayContainer = document.querySelector('#today-container')

window.onload = async () => {
    await loadProfile()
}

async function loadProfile() {
    const resp = await fetch('/api/consumption/homePageRecord')
    const homePageRecord = (await resp.json()).rows

    let htmlStr = ``
    for (const eachRecord of homePageRecord) {
        htmlStr += /*html*/ `
        <div class="date-row"><h3>${eachRecord.food_name}</h3>
            <button type="button" class="btn btn-info mb-3" data-bs-toggle="modal" data-bs-target="#target-${eachRecord.food_id}" onclick="getConsumptionDetails(${eachRecord.food_id})">
                Details
            </button></div>
         <!-- Modal -->
            <div
                class="modal fade"
                id="target-${eachRecord.food_id}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-body" id="nutrition-table-${eachRecord.food_id}"></div>
                    </div>
                </div>
            </div>

    `
    }
    todayContainer.innerHTML += htmlStr
}

async function getConsumptionDetails(foodID) {
    const resp = await fetch(`/api/consumption/consumptiondetails/${foodID}`)

    const consumptionDetails = (await resp.json()).rows
    console.log(consumptionDetails[0])
    const details = consumptionDetails[0]
    const nutritionName = details.nutrition_name
    const nutritionValue = details.nutrition_value
    const totalWeight = details.total_weight[0]
    const quantity = details.quantity[0]
    const foodName = details.food_name[0]
    const totalGrams = totalWeight * quantity

    modalStr = /*HTML*/ `
        <h3>Nutrition of ${totalGrams}g of ${foodName}</<h3> 
        <img 
        class="card-img-top"
        src="${details.food_photo[0]}"
        alt="Card image cap"
        />
        <table>  
        <tr>
            <td>Energy/能量</td>
            <td></td>
            <td>${
                nutritionName.includes('energy')
                    ? Math.round(
                          (nutritionValue[nutritionName.indexOf('energy')] /
                              100) *
                              totalWeight *
                              quantity *
                              100
                      ) / 100
                    : 0
            } kcal/千卡</td>
        </tr>
        <tr>
            <td>Protein/蛋白質</td>
            <td></td>
            <td>${
                nutritionName.includes('protein')
                    ? Math.round(
                          (nutritionValue[nutritionName.indexOf('protein')] /
                              100) *
                              totalWeight *
                              quantity *
                              100
                      ) / 100
                    : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Total fat/總脂肪</td>
            <td></td>
            <td>${
                nutritionName.includes('total_fat')
                    ? Math.round(
                          (nutritionValue[nutritionName.indexOf('total_fat')] /
                              100) *
                              totalWeight *
                              quantity *
                              100
                      ) / 100
                    : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Saturated fat/飽和脂肪</td>
            <td></td>
            <td>${
                nutritionName.includes('saturated_fat')
                    ? Math.round(
                          (nutritionValue[
                              nutritionName.indexOf('saturated_fat')
                          ] /
                              100) *
                              totalWeight *
                              quantity *
                              100
                      ) / 100
                    : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Trans fat/反式脂肪</td>
            <td></td>
            <td>${
                nutritionName.includes('trans_fat')
                    ? Math.round(
                          (nutritionValue[nutritionName.indexOf('trans_fat')] /
                              100) *
                              totalWeight *
                              quantity *
                              100
                      ) / 100
                    : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Carbohydrates/碳水化合物</td>
            <td></td>
            <td>${
                nutritionName.includes('carbohydrates')
                    ? Math.round(
                          (nutritionValue[
                              nutritionName.indexOf('carbohydrates')
                          ] /
                              100) *
                              totalWeight *
                              quantity *
                              100
                      ) / 100
                    : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Sugar/糖</td>
            <td></td>
            <td>${
                nutritionName.includes('sugars')
                    ? Math.round(
                          (nutritionValue[nutritionName.indexOf('sugars')] /
                              100) *
                              totalWeight *
                              quantity *
                              100
                      ) / 100
                    : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Sodium/鈉</td>
            <td></td>
            <td>${
                nutritionName.includes('sodium')
                    ? Math.round(
                          (nutritionValue[nutritionName.indexOf('sodium')] /
                              100) *
                              totalWeight *
                              quantity *
                              100
                      ) / 100
                    : 0
            } mg/毫克</td>
        </tr>

        </tr>
        </table>
        <div class="modal-footer">
            <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
            >
                Close
            </button>
        </div>

    
    `
    document.querySelector(`#nutrition-table-${foodID}`).innerHTML = modalStr
}
