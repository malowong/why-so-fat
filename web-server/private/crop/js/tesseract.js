text = `
Nutrition Information
Servings Per Package: About 8
Serving Size: 31g (About 13 chips)
Per Serving
Energy 160 kcal
Protein 2.0lc
Total Fat 9﹒0 d
- Saturated Fat 3.0g
- Trans Fat 0 g
Carbohydrates 18.0g
- Sugars 4.0 g
Sodium 150 mg
`

text2 = `Nutrition Facts 營 養 標 示
ˇ Per1009 / 每 100 克
Energy 能 量 405kcal/ 千 卡
Protein 蛋 白 質 ﹍ ﹍ 5.39/=
Total Fat 總 脂 肯 11.89/%=
Saturated Fat 飽 和 脂 肢 5﹒50/ 光
Trans Fat 反 式 脂 肪 0d/ 充
Carbohydrates 碳 水 化 合 物 690/ 光
Sugars 糖 10﹒8d/ 克
Sodium 鈣 ′ 748md/ 霎 克`

let data = {}

const lines = text.split('\n')

console.log(lines)



function insertData(line, nutrition){
  const text = spellChecker(line.match(/\d+(.*)/)[0])

  if(line.includes("/")){
    data[nutrition] = text.match(/\d*\.?\d*(?=.{1}[\/])/g)[0]

  } else {
    data[nutrition] = text.match(/[+-]?\d+(\.\d+)?/g)[0]
  }

}

function insertDataTwoUnit(line, nutrition){
  const text = spellChecker(line.match(/\d+(.*)/)[0])

  if(line.includes("/")){
    data[nutrition] = text.match(/\d*\.?\d*(?=.{2}[\/])/g)[0]

  } else {
    data[nutrition] = text.match(/[+-]?\d+(\.\d+)?/g)[0]
  }
}

function insertDataFourUnit(line, nutrition){
  const text = spellChecker(line.match(/\d+(.*)/)[0])

  if(line.includes("/")){
    data[nutrition] = text.match(/\d*\.?\d*(?=.{4}[\/])/g)[0]

  } else {
    data[nutrition] = text.match(/[+-]?\d+(\.\d+)?/g)[0]
  }
}


function spellChecker(text){
  if(text.includes("i")){
    text = text.replace('i', '1')
  }
  if(text.includes("O")){
    text = text.replace("O", "0")
  }
  if(text.includes(";")){
    text = text.replace(";", ".")
  }
  if(text.includes(",")){
    text = text.replace(",", ".")
  }
  if(text.includes("G")){
    text = text.replace("G", "6")
  }
  if(text.includes("﹒")){
    text = text.replace("﹒", ".")
  }
  if(text.includes("T")){
    text = text.replace("T", "7")
  }
  return text
}

for (let line of lines) {
  if(line.toLowerCase().includes("per") && line.toLowerCase().includes("100")){
    data['per'] = 'per_100'
  } else if (line.toLowerCase().includes("per") && line.toLowerCase().includes("ser")){
    data['per'] = 'per_serving'
  } else if (line.toLowerCase().includes("per") && line.toLowerCase().includes("pac")){
    data['per'] = 'per_package'
  }

  if(line.toLowerCase().includes("ser") && line.toLowerCase().includes("size")){
    insertData(line, 'serving_size')
  }

  if(line.toLowerCase().includes("ener")){
    insertDataFourUnit(line, 'energy')
  }

  if(line.toLowerCase().includes("pro") || line.toLowerCase().includes("ein")){
    insertData(line, 'protein')
  }

  if(line.toLowerCase().includes("tot") && line.toLowerCase().includes("fat")){
    insertData(line, 'total_fat')
  }

  if(line.toLowerCase().includes("urated") && line.toLowerCase().includes("fat")){
    insertData(line, 'saturated_fat')
  }

  if(line.toLowerCase().includes("tran") && line.toLowerCase().includes("fat")){
    insertData(line, 'trans_fat')
  }

  if(line.toLowerCase().includes("carbo")){
    insertData(line, 'carbohydrates')
  }

  if(line.toLowerCase().includes("sug")){
    insertData(line, 'sugar')
  }

  if(line.toLowerCase().includes("sod")){
    insertDataTwoUnit(line, 'sodium')
  }

  // localStorage.setItem('result', JSON.stringify(data))

}

console.log(data)

// console.log(words)