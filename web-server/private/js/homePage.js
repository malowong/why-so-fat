let quotaMap = new Map()

const intakeStandard = {
  energy: 2000,
  carbohydrates: 275,
  total_fat: 60,
  sugars: 50,
  saturated_fat: 20,
  trans_fat: 2.2,
  sodium: 2000,
  protein: 0,
}

window.onload = async () => {
  await setProteinStandard()
  await loadQuota()
  await loadFoodProfile()
  loadAnimation()
  changeBarLength()
}

async function setProteinStandard() {
  const bodyWeightResp = await fetch('/api/consumption/userbodyweight')
  const bodyWeight = (await bodyWeightResp.json()).weight
  intakeStandard['protein'] = bodyWeight
}

async function loadQuota() {
  const quotaResp = await fetch('/api/consumption/quota')
  const quota = (await quotaResp.json()).rows

  const sortedIntakeStandardKeys = Object.keys(intakeStandard).sort()

  function calHelper(a, b, c) {
    return Math.round((a / 100) * b * c)
  }
  if (quota.length > 0) {
    for (let i = 0; i < quota.length; i++) {
      if (quota[i].nutrition_name !== 'protein') {
        let key = sortedIntakeStandardKeys[i]
        let initialQuota = intakeStandard[`${key}`]
        for (let j = 0; j < quota[i].food_name.length; j++) {
          initialQuota -= calHelper(
            quota[i].nutrition_value[j],
            quota[i].quantity[j],
            quota[i].total_weight[j]
          )
        }
        quotaMap.set(sortedIntakeStandardKeys[i], initialQuota)
      } else {
        let proteinQuota = quota[i].weight[0]
        for (let j = 0; j < quota[i].food_name.length; j++) {
          proteinQuota -= calHelper(
            quota[i].nutrition_value[j],
            quota[i].quantity[j],
            quota[i].total_weight[j]
          )
          quotaMap.set(sortedIntakeStandardKeys[i], proteinQuota)
        }
      }
    }
  } else {
    for (let i = 0; i < sortedIntakeStandardKeys.length; i++) {
      let key = sortedIntakeStandardKeys[i]
      quotaMap.set(key, intakeStandard[`${key}`])
    }
  }

  console.log(quotaMap)

  carbohydratesValue =
    parseInt(quotaMap.get('carbohydrates')) < 0
      ? 0
      : parseInt(quotaMap.get('carbohydrates'))
  sugarsValue =
    parseInt(quotaMap.get('sugars')) < 0 ? 0 : parseInt(quotaMap.get('sugars'))
  proteinValue =
    parseInt(quotaMap.get('protein')) < 0
      ? 0
      : parseInt(quotaMap.get('protein'))

  const carbsInfo = document.querySelector('#carbs-display')
  const sugarsInfo = document.querySelector('#sugars-display')
  const proteinInfo = document.querySelector('#protein-display')

  // document.querySelector('')children[2].innerHTML = `${Math.round(carbsLength)}%`
  // carbsInfo.children[2].innerHTML = `<p>${parseInt(
  document.querySelector(
    '#carbs-display'
  ).children[2].innerHTML = `<p>${carbohydratesValue} g left</p>`
  // sugarsInfo.children[1].innerHTML = `${Math.round(sugarsLength)}%`
  sugarsInfo.children[2].innerHTML = `<p>${sugarsValue} g left</p>`
  // proteinInfo.children[1].innerHTML = `${Math.round(proteinLength)}%`
  proteinInfo.children[2].innerHTML = `<p>${proteinValue} g left</p>`
}

async function loadFoodProfile() {
  const resp = await fetch('/api/consumption/homePageRecord')
  const homePageRecord = (await resp.json()).rows
  console.log(homePageRecord)
  let htmlStr = ``
  let modalStr = ``
  for (const eachRecord of homePageRecord) {
    console.log(eachRecord)
    htmlStr += /*html*/ `
        <div class="date-row">
            <h3>${eachRecord.food_name} X ${eachRecord.sum}</h3>
            <button type="button" class="btn btn-info mb-3" data-bs-toggle="modal" data-bs-target="#target-${eachRecord.food_id}" onclick="getConsumptionDetails(${eachRecord.food_id}, ${eachRecord.user_id})">
                Details
            </button>
        </div>
    `
    modalStr += /* html */ `
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
  document.querySelector('#today-container').innerHTML += htmlStr
  if (document.getElementById('today-container').innerHTML != '') {
    document.getElementById('my-modal-container').innerHTML += modalStr
  }
}

async function getConsumptionDetails(foodID, userID) {
  const resp = await fetch(
    `/api/consumption/consumptiondetails/${foodID}/${userID}`
  )

  const consumptionDetails = (await resp.json()).rows
  console.log(consumptionDetails[0])
  const details = consumptionDetails[0]
  const nutritionName = details.nutrition_name
  const nutritionValue = details.nutrition_value
  const totalWeight = details.total_weight[0]
  const quantity = details.quantity[0]
  const foodName = details.food_name[0]
  let foodPhoto = details.food_photo[0]
  const totalGrams = totalWeight * quantity

  if (foodPhoto == 'undefined') {
    foodPhoto = '../crop/dummy-image-square.jpeg'
  }

  console.log(Math.round(nutritionValue[0] * quantity))
  console.log(quantity * totalWeight)

  modalStr = /*HTML*/ `
          <img 
          class="card-img-top"
          src="${foodPhoto}"
          alt="Card image cap"
          />
          <h4><strong>${totalGrams}g ${foodName} contain...</strong></<h4> 
        <table>  
        <tr>
            <td>Energy/能量</td>
            <td></td>
            <td>${
              nutritionName.includes('energy')
                ? Math.round(nutritionValue[0] * quantity)
                : 0
            } kcal/千卡</td>
        </tr>
        <tr>
            <td>Protein/蛋白質</td>
            <td></td>
            <td>${
              nutritionName.includes('protein')
                ? Math.round(nutritionValue[1] * quantity)
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Total fat/總脂肪</td>
            <td></td>
            <td>${
              nutritionName.includes('total_fat')
                ? Math.round(nutritionValue[2] * quantity)
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Saturated fat/飽和脂肪</td>
            <td></td>
            <td>${
              nutritionName.includes('saturated_fat')
                ? Math.round(nutritionValue[3] * quantity)
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Trans fat/反式脂肪</td>
            <td></td>
            <td>${
              nutritionName.includes('trans_fat')
                ? Math.round(nutritionValue[4] * quantity)
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Carbohydrates/碳水化合物</td>
            <td></td>
            <td>${
              nutritionName.includes('carbohydrates')
                ? Math.round(nutritionValue[5] * quantity)
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Sugars/糖</td>
            <td></td>
            <td>${
              nutritionName.includes('sugars')
                ? Math.round(nutritionValue[6] * quantity)
                : 0
            } g/克</td>
        </tr>
        <tr>
            <td>Sodium/鈉</td>
            <td></td>
            <td>${
              nutritionName.includes('sodium')
                ? Math.round(nutritionValue[7] * quantity)
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

function loadAnimation() {
  var chartDom = document.querySelector('#kcal-display').children[0]
  var myChart = echarts.init(chartDom)
  var option

  option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 2000,
        splitNumber: 4,
        itemStyle: {
          color: '#58D9F9',
          shadowColor: 'rgba(0,138,255,0.45)',
          shadowBlur: 10,
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
        progress: {
          show: true,
          roundCap: false,
          width: 18,
        },
        pointer: {
          icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
          length: '75%',
          width: 16,
          offsetCenter: [0, '5%'],
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: 18,
          },
        },
        axisTick: {
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: '#fff',
          },
        },
        splitLine: {
          length: 12,
          lineStyle: {
            width: 3,
            color: '#fff',
          },
        },
        axisLabel: {
          distance: 30,
          color: '#fff',
          fontSize: 20,
        },
        title: {
          show: false,
        },
        detail: {
          backgroundColor: '#488747',
          borderColor: '#fff',
          borderWidth: 0,
          width: '60%',
          lineHeight: 40,
          height: 40,
          borderRadius: 8,
          offsetCenter: [0, '30%'],
          valueAnimation: true,
          formatter: function (value) {
            value = 2000 - value < 0 ? 0 : value
            return '{value|' + value.toFixed(0) + '}{unit|kcal left}'
          },
          rich: {
            value: {
              fontSize: 50,
              fontWeight: 'bolder',
              color: '#fff',
            },
            unit: {
              fontSize: 20,
              color: '#fff',
              padding: [0, 0, -20, 10],
            },
          },
        },
        data: [
          {
            value: 2000 - quotaMap.get('energy'),
          },
        ],
      },
    ],
  }

  myChart.setOption(option)
}

function changeBarLength() {
  const carbsLength =
    ((intakeStandard['carbohydrates'] - quotaMap.get('carbohydrates')) /
      intakeStandard['carbohydrates']) *
    100

  const sugarsLength =
    ((intakeStandard['sugars'] - quotaMap.get('sugars')) /
      intakeStandard['sugars']) *
    100

  const proteinLength =
    ((intakeStandard['protein'] - quotaMap.get('protein')) /
      intakeStandard['protein']) *
    100

  document.querySelector('#carbs-bar').style.width = `${carbsLength}%`

  document.querySelector('#sugars-bar').style.width = `${sugarsLength}%`

  document.querySelector('#protein-bar').style.width = `${proteinLength}%`
}

function getOtherIntake() {
  var chartDom = document.querySelector('#quota-display').children[0]
  var myChart = echarts.init(chartDom)
  var option

  const gaugeData = [
    {
      value: Math.round(
        ((intakeStandard['total_fat'] - quotaMap.get('total_fat')) /
          intakeStandard['total_fat']) *
          100
      ),
      name: 'Total fat',
      title: {
        offsetCenter: ['0%', '-52%'],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '-40%'],
      },
    },
    {
      value: Math.round(
        ((intakeStandard['saturated_fat'] - quotaMap.get('saturated_fat')) /
          intakeStandard['saturated_fat']) *
          100
      ),
      name: 'Saturated fat',
      title: {
        offsetCenter: ['0%', '-22%'],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '-10%'],
      },
    },
    {
      value: Math.round(
        ((intakeStandard['trans_fat'] - quotaMap.get('trans_fat')) /
          intakeStandard['trans_fat']) *
          100
      ),
      name: 'Trans fat',
      title: {
        offsetCenter: ['0%', '10%'],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '22%'],
      },
    },
    {
      value: Math.round(
        ((intakeStandard['sodium'] - quotaMap.get('sodium')) /
          intakeStandard['sodium']) *
          100
      ),
      name: 'Sodium',
      title: {
        offsetCenter: ['0%', '40%'],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ['0%', '52%'],
      },
    },
  ]
  option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: '#464646',
          },
        },
        axisLine: {
          lineStyle: {
            width: 40,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: gaugeData,
        title: {
          fontSize: 10,
        },
        detail: {
          width: 30,
          height: 8,
          fontSize: 10,
          color: 'auto',
          borderColor: 'auto',
          borderRadius: 20,
          borderWidth: 1,
          formatter: '{value}%',
        },
      },
    ],
  }
  // setInterval(function () {
  //   gaugeData[0].value = +(Math.random() * 100).toFixed(2)
  //   gaugeData[1].value = +(Math.random() * 100).toFixed(2)
  //   gaugeData[2].value = +(Math.random() * 100).toFixed(2)
  //   myChart.setOption({
  //     series: [
  //       {
  //         data: gaugeData,
  //         pointer: {
  //           show: false,
  //         },
  //       },
  //     ],
  //   })
  // }, 2000)

  myChart.setOption(option)
}

// test

let homePageFoodListMap = new Map()

async function getFoodData() {
  const resp = await fetch('/api/food/info/name')
  const foodList = await resp.json()

  let htmlStr = ``
  for (const food of foodList) {
    htmlStr += /*html*/ `
    <div class="food-row" id="food-id-${food.id}" >
      <div class="form-food-name">${food.food_name}</div>
      <label class="quantity">
          <select name="quantity" data-id=${food.id}>
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>0.25</option>
            <option>0.5</option>
          </select>
          pack
      </label>
    </div>
    `
  }

  const eatenFoodForm = document.querySelector('#eaten-food-form')

  eatenFoodForm.innerHTML = htmlStr
  document.querySelectorAll('select').forEach((selectElement) => {
    selectElement.addEventListener('input', (e) => {
      console.log(e.target.dataset.id)
      console.log(e.target.value)
      homePageFoodListMap.set(e.target.dataset.id, e.target.value)
      console.log(homePageFoodListMap)
      console.log(JSON.stringify(Object.fromEntries(homePageFoodListMap)))
    })
  })

  eatenFoodForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    // const foodList = document.querySelectorAll('.food-row')
    // console.log(foodList)
    // let formObj = {
    //   foodList: [],
    // }
    // console.log(formObj)

    // for (const food of foodList) {
    //   if (food.querySelector('.eaten').querySelector('input').checked == true) {
    //     formObj.foodList.push({
    //       food_id: parseInt(food.dataset.id),
    //       quantity: parseFloat(
    //         food.querySelector('.quantity').querySelector('[name=quantity')
    //           .value
    //       ),
    //     })
    //   }
    // }

    const resp = await fetch('/api/consumption/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Object.fromEntries(homePageFoodListMap)),
    })

    if (resp.status === 200) {
      console.log('Success add consumption')
      window.location = '/home-page.html'
    }
  })
}
