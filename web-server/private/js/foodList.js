const searchBar = document.querySelector('.search-bar')
const clearButton = document.querySelector('.clear-btn')

window.onload = async () => {
    await loadFoodList()
}

let foodList
let uniqueFoodId

async function loadFoodList() {
    const resp = await fetch('/api/food/info')
    foodList = (await resp.json()).rows

    uniqueFoodId = foodList.reduce(
        (acc, cur) => acc.add(cur.food_id),
        new Set()
    )

    genHtmlStr(uniqueFoodId, foodList)
}

function genHtmlStr(uniqueFoodId, foodList) {
    let htmlStr = ``
    for (const i of Array.from(uniqueFoodId)) {
        let foodNutritionMap = new Map()
        for (const foodItem of foodList) {
            if (foodItem.food_id == i) {
                foodNutritionMap.set(
                    foodItem.nutrition_name,
                    foodItem.nutrition_value
                )
            }
        }
        console.log(foodNutritionMap)
        console.log(foodList)

        for (const foodItem of foodList) {
            if (foodItem.food_id == i) {
                htmlStr += /*html*/ `
        <div class="card mt-3" style="width: 18rem">
        <img
            class="card-img-top"
            src="${foodItem.food_photo}"
            alt="Card image cap"
        />
        <div class="card-body">
            <h5 class="card-title food-name">${foodItem.food_name}</h5>

            <button
                type="button"
                class="btn btn-success"
                data-bs-toggle="modal"
                data-bs-target="#target-${foodItem.food_id}"
            >
                Nutrition Details
            </button>
        </div>
    </div>

    <div
        class="modal fade"
        id="target-${foodItem.food_id}"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                    ${foodItem.food_name}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body" id="nutrition-table-${
                    foodItem.food_id
                }">
                <table>
                        <tr>
                        <td></td>
                        <td></td>
                            <td>Per 100g / 每100克</td>
                        </tr>

                        <tr>
                            <td>Energy/能量</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('energy')
                                    ? foodNutritionMap.get('energy')
                                    : 0
                            } kcal/千卡</td>
                        </tr>
                        <tr>
                            <td>Protein/蛋白質</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('protein')
                                    ? foodNutritionMap.get('protein')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Total fat/總脂肪</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('total_fat')
                                    ? foodNutritionMap.get('total_fat')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Saturated fat/飽和脂肪</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('saturated_fat')
                                    ? foodNutritionMap.get('saturated_fat')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Trans fat/反式脂肪</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('trans_fat')
                                    ? foodNutritionMap.get('trans_fat')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates/碳水化合物</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('carbohydrates')
                                    ? foodNutritionMap.get('carbohydrates')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Sugar/糖</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('sugars')
                                    ? foodNutritionMap.get('sugars')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Sodium/鈉</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('sodium')
                                    ? foodNutritionMap.get('sodium')
                                    : 0
                            } mg/毫克</td>
                        </tr>

                        </tr>

                </table>
    
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button type="button" class="btn btn-primary">
                        Convert unit
                    </button>
                </div>
            </div>
        </div>
    </div>
        `
                break
            }
        }
    }

    document.querySelector('#food-container').innerHTML = htmlStr
}

searchBar.addEventListener('input', (e) => {
    const searchValue = searchBar.value.trim()

    if (searchValue.length == 0) {
        genHtmlStr(uniqueFoodId, foodList)
        return
    }

    let matchSet = new Set()
    for (let i of foodList) {
        i.food_name.toLowerCase().includes(searchValue.toLowerCase()) &&
            matchSet.add(i.food_id)
    }

    genHtmlStr(Array.from(matchSet), foodList)
})

clearButton.addEventListener('click', (e) => {
    searchBar.value = ''
    genHtmlStr(uniqueFoodId, foodList)
    return
})
