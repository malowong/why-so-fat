window.onload = async () => {
    await loadFoodList()
}

async function loadFoodList() {
    const resp = await fetch('/api/food/info')
    const foodList = (await resp.json()).rows

    // const resp1 = await fetch('/api/food/nutritionValue')

    const uniqueFoodId = foodList.reduce(
        (acc, cur) => acc.add(cur.food_id),
        new Set()
    )
    // console.log(foodList)
    // console.log(Array.from(uniqueFoodId))

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

        for (const foodItem of foodList) {
            if (foodItem.food_id == i) {
                htmlStr += /*html*/ `
        <div class="card" style="width: 18rem">
        <img
            class="card-img-top"
            src="${foodItem.food_photo}"
            alt="Card image cap"
        />
        <div class="card-body">
            <h5 class="card-title">${foodItem.food_name}</h5>

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
                            <td>Per ${foodItem.per_unit}g / 每${
                    foodItem.per_unit
                }克</td>
                        </tr>

                        <tr>
                            <td>Energy/能量</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('Energy')
                                    ? foodNutritionMap.get('Energy')
                                    : 0
                            } kcal/千卡</td>
                        </tr>
                        <tr>
                            <td>Protein/蛋白質</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('Protein')
                                    ? foodNutritionMap.get('Energy')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Total fat/總脂肪</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('Total fat')
                                    ? foodNutritionMap.get('Total fat')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Saturated fat/飽和脂肪</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('Saturated fat')
                                    ? foodNutritionMap.get('Saturated fat')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Trans fat/反式脂肪</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('Trans fat')
                                    ? foodNutritionMap.get('Trans fat')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Carbohydrates/碳水化合物</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('Carbohydrates')
                                    ? foodNutritionMap.get('Carbohydrates')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Sugar/糖</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('Sugar')
                                    ? foodNutritionMap.get('Sugar')
                                    : 0
                            } g/克</td>
                        </tr>
                        <tr>
                            <td>Sodium/鈉</td>
                            <td></td>
                            <td>${
                                foodNutritionMap.get('Sodium')
                                    ? foodNutritionMap.get('Sodium')
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

// let htmlStr = ``
// for (const food of foodList) {
//     htmlStr += /*html*/ `
//         <div>${food.food_name}</div>
//         <div><img src="../../uploads/${food.food_photo}"></div>
//         <div>Energy: ${food.energy}</div>
//         <div>Protein: ${food.protein}</div>
//         <div>Carbohydrates: ${food.carbohydrates}</div>
//         <div>Total fat: ${food.total_fat}</div>
//         <div>Saturated fat: ${food.saturated_fat}</div>
//         <div>Trans fat: ${food.trans_fat}</div>
//         <div>Sodium: ${food.sodium}</div>
//         <hr>
//     `
// }
