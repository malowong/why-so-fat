window.onload = async () => {
    await loadFoodList()
}

async function loadFoodList() {
    const resp = await fetch('/api/food/info')
    const foodList = (await resp.json()).rows

    // const resp1 = await fetch('/api/food/nutritionValue')

    // console.log(foodList)
    const uniqueFoodId = foodList.reduce(
        (acc, cur) => acc.add(cur.food_id),
        new Set()
    )
    // console.log(foodList)
    // console.log(Array.from(uniqueFoodId))

    let htmlStr = ``
    for (const i of Array.from(uniqueFoodId)) {
        for (const foodItem of foodList) {
            if (foodItem.food_id == i) {
                console.log(foodItem.nutrition_name)
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
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#target-${foodItem.food_id}"
            >
                Nutrition Label
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
                <div class="modal-body" id="nutrition-table-${foodItem.food_id}">
                <img
                class="card-img-top"
                src="${foodItem.food_photo}"
                alt="Card image cap"
            />
    
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
                        Save changes
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
