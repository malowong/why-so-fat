const searchBar = document.querySelector('.search-bar')
const clearButton = document.querySelector('.clear-btn')
const sortButtons = document.querySelectorAll('.sort-btn')
const backToTopButton = document.getElementById('myBtn')

window.onload = async () => {
  await loadFoodList()
}

let foodList
let uniqueFoodId

async function loadFoodList() {
  const resp = await fetch('/api/food/info')
  foodList = (await resp.json()).rows

  uniqueFoodId = foodList.reduce((acc, cur) => acc.add(cur.food_id), new Set())

  genHtmlStr(uniqueFoodId, foodList)
}

function genHtmlStr(uniqueFoodId, foodList) {
  let htmlStr = ``

  for (const i of Array.from(uniqueFoodId)) {
    let foodNutritionMap = new Map()
    for (const foodItem of foodList) {
      if (foodItem.food_id == i) {
        foodNutritionMap.set(foodItem.nutrition_name, foodItem.nutrition_value)
      }
    }

    for (const foodItem of foodList) {
      if (foodItem.food_photo == "undefined"){
        foodItem.food_photo = "../crop/dummy-image-square.jpeg"
      }

      if (foodItem.food_id == i) {
        htmlStr += /*html*/ `
                <div class="card mb-3">
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


            <div
                class="modal fade"
                id="target-${foodItem.food_id}"
                data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog"  style="top: 80px">
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
                                    <td>Per <input type="text" value="100" size="3" name="convert" id="convert-${
                                      foodItem.food_id
                                    }"> g</td>
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
                                    } g</td>
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
                            <button type="button" class="btn btn-primary" onclick= "convertFnc(${
                              foodItem.food_id
                            })">
                                Convert unit
                            </button>
                        </div>
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
  console.log(e)
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

async function convertFnc(foodId) {
  const resp = await fetch(`/api/food/convert/${foodId}`)

  const foodInfo = await resp.json()

  let convertedNutritionMap = new Map()
  for (const eachInfo of foodInfo) {
    convertedNutritionMap.set(eachInfo.nutrition_name, eachInfo.nutrition_value)
  }
  const userInput = Number(document.querySelector(`#convert-${foodId}`).value)
  let htmlStr = /*HTML */ `
      <table>  
        <tr>
        <td></td>
        <td></td>
            <td>Per <input type="text" value="${userInput}" size="1" name="convert" id="convert-${foodId}">g</td>
        </tr>

        <tr>
            <td>Energy/能量</td>
            <td></td>
            <td>${
              convertedNutritionMap.get('energy')
                ? Math.round(
                    (convertedNutritionMap.get('energy') / 100) *
                      userInput *
                      100
                  ) / 100
                : 0
            } kcal/千卡</td>
        </tr>
        <tr>
            <td>Protein/蛋白質</td>
            <td></td>
            <td>${
              convertedNutritionMap.get('protein')
                ? Math.round(
                    (convertedNutritionMap.get('protein') / 100) *
                      userInput *
                      100
                  ) / 100
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Total fat/總脂肪</td>
            <td></td>
            <td>${
              convertedNutritionMap.get('total_fat')
                ? Math.round(
                    (convertedNutritionMap.get('total_fat') / 100) *
                      userInput *
                      100
                  ) / 100
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Saturated fat/飽和脂肪</td>
            <td></td>
            <td>${
              convertedNutritionMap.get('saturated_fat')
                ? Math.round(
                    (convertedNutritionMap.get('saturated_fat') / 100) *
                      userInput *
                      100
                  ) / 100
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Trans fat/反式脂肪</td>
            <td></td>
            <td>${
              convertedNutritionMap.get('trans_fat')
                ? Math.round(
                    (convertedNutritionMap.get('trans_fat') / 100) *
                      userInput *
                      100
                  ) / 100
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Carbohydrates/碳水化合物</td>
            <td></td>
            <td>${
              convertedNutritionMap.get('carbohydrates')
                ? Math.round(
                    (convertedNutritionMap.get('carbohydrates') / 100) *
                      userInput *
                      100
                  ) / 100
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Sugar/糖</td>
            <td></td>
            <td>${
              convertedNutritionMap.get('sugars')
                ? Math.round(
                    (convertedNutritionMap.get('sugars') / 100) *
                      userInput *
                      100
                  ) / 100
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Sodium/鈉</td>
            <td></td>
            <td>${
              convertedNutritionMap.get('sodium')
                ? Math.round(
                    (convertedNutritionMap.get('sodium') / 100) *
                      userInput *
                      100
                  ) / 100
                : 0
            } mg/毫克</td>
        </tr>

        </tr>
        </table>
    `
  document.querySelector(`#nutrition-table-${foodId}`).innerHTML = htmlStr
}

sortButtons.forEach((sortButton) => {
  console.log(sortButton)
  sortButton.addEventListener('click', (e) => {
    sortByNutrition(
      sortButton,
      sortButton.classList[2][0].toUpperCase() +
        sortButton.classList[2].slice(1)
    )
  })
})

function sortByNutrition(sortButton, nutritionName) {
  let sortedFoodSet = foodList.filter((element) => {
    return element.nutrition_name === nutritionName.toLowerCase()
  })
  console.log(sortedFoodSet)
  if (sortButton.innerText === `${nutritionName} \u2193`) {
    sortedFoodSet = sortedFoodSet
      .sort((a, b) => {
        return a.nutrition_value - b.nutrition_value
      })
      .reduce((acc, cur) => acc.add(cur.food_id), new Set())

    sortButton.innerText = `${nutritionName} \u2191`
  } else {
    sortedFoodSet = sortedFoodSet
      .sort((a, b) => {
        return b.nutrition_value - a.nutrition_value
      })
      .reduce((acc, cur) => acc.add(cur.food_id), new Set())

    sortButton.innerText = `${nutritionName} \u2193`
  }

  genHtmlStr(sortedFoodSet, foodList)
}

//Get the button:

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction()
}

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = 'block'
  } else {
    backToTopButton.style.display = 'none'
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0 // For Safari
  document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
}
