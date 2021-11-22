const historyContainer = document.querySelector('#history-container')

window.onload = async () => {
    await loadHistory()
}

async function loadHistory() {
    const resp = await fetch('/api/consumption/history')
    const consumptions = await resp.json()

    let htmlStr = ``
    for (const consumption of consumptions) {
        htmlStr += /*html*/ `
            <div>${consumption.quantity}</div>
            <hr>
        `
    }
    historyContainer.innerHTML = htmlStr
}
