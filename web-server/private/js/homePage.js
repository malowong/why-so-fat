const todayContainer = document.querySelector('#today-container')

window.onload = async () => {
    await loadProfile()
}

async function loadProfile() {
    const resp = await fetch('/api/user/homePageRecord')
    const homePageRecord = await resp.json()
    console.log(homePageRecord)

    let htmlStr = ``
    for (const eachRecord of homePageRecord) {
        htmlStr += /*html*/ `<div class="date-row"><h3>${eachRecord.food_name}</h3>
            <button type="button" class="btn btn-info mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Details
            </button></div>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title" id="exampleModalLabel">Details</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>`
    }
    todayContainer.innerHTML += htmlStr
}
