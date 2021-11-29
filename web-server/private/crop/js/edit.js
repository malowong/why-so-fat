
export function insertData(line, nutrition){
    const text = spellChecker(line.match(/\d+(.*)/)[0])
    data[nutrition] = text.match(/[+-]?\d+(\.\d+)?/g)[0]
}
  
export function spellChecker(text){
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
    if(text.includes("T")){
        text = text.replace("T", "7")
    }
    return text
}

export async function sendOcr(blob, imageName) {
    console.log(imageName)
    const file = new File([blob], imageName); 
    const formData = new FormData()
    formData.append('image', file)

    const header = document.querySelector('.header')
    const loader = document.querySelector('.video-loader')
    const footer = document.querySelector('.tui-image-editor-controls')

    loader.style.display = 'flex'
    header.innerHTML = /* html */ `<h1>LOADING</h1>`
    footer.innerHTML = /* html */ `<h1>This may take a while...</h1>`

    const resp = await fetch('/api/food/ocr', {
        method: 'POST',
        body: formData,
    })

    loader.style.display = 'none'
    
    const result = (await resp.json()).data;
    
    console.log(result)
    
    // window.location = '../../upload.html'

}

// const fetchButton = document.querySelector('#fetchButton')
// const loader = document.querySelector('#loader')
// const content = document.querySelector('#content')

// function fetchData() {
//   // Here should be your api call, I`m using setTimeout here just for async example
//   return new Promise(resolve => setTimeout(resolve, 2000, 'my content'))
// }

// fetchButton.onclick = async function () {
//   content.innerHTML = ''

//   // Your loader styling, mine is just text that I display and hide
//   loader.style.display = 'block'
//   const nextContent = await fetchData()
//   loader.style.display = 'none'

//   content.innerHTML = nextContent
// }