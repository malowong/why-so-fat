const foodContainer = document.querySelector('#food-container')

window.onload = async () => {
    await loadFoodList()
}

async function loadFoodList() {
    const resp = await fetch('/api/food/info')
    const foodList = await resp.json()

    let htmlStr = ``
    for (const food of foodList) {
        htmlStr += /*html*/ `
        <div class="card" style="width: 18rem">
        <img
            class="card-img-top"
            src="${food.food_photo}"
            alt="Card image cap"
        />
        <div class="card-body">
            <h5 class="card-title">${food.food_name}</h5>

            <button
                type="button"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
                Nutrition Label
            </button>
        </div>
    </div>

    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                    ${food.food_name}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <table>
                        <tr>
                            <td>Energy/能量</td>
                            <td>${food.energy} kcal/千卡</td>
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
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    </div>
        `
    }
    foodContainer.innerHTML = htmlStr
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
