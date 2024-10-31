const dataArray = [
    "Max Verstappen",
    "Charles Leclerc",
    "Lewis Hamilton",
    "Valtteri Bottas",
    "Sergio Perez",
    "Pierre Gasly",
    "Lance Stroll",
    "Daniel Ricciardo",
    "Sebastian Vettel",
    "Esteban Ocon",
    "Carlos Sainz",
    "Lando Norris",
    "Yuki Tsunoda",
    "Mick Schumacher",
    "Antonio Giovinazzi",
    "Kimi Raikkonen",
    "George Russell",
    "Nikita Mazepin",
    "Fernando Alonso",
    "Nicholas Latifi",
    "Alexander Albon",
    "Guanyu Zhou",
    "Guilhem Loter",
    "Romain Grosjean",
    "Kevin Magnussen",
    "Pietro Fittipaldi",
    "Marcus Ericsson"
]


function renderData() {
    const dataList = document.getElementById("dataList")
    dataList.innerHTML = ""
    const ul = document.createElement("ul")
    dataList.appendChild(ul)
    dataArray.forEach((driver) => {
        const listItem = document.createElement("li")
        listItem.classList.add('driverListItem')
        listItem.innerText = driver
        ul.appendChild(listItem)
        const driverRemovalButton = createDriverRemovalButton(driver)
        listItem.appendChild(driverRemovalButton)
    })
}

renderData()


function addEventListenersToRemovalButtons() {
    document.querySelectorAll(".driverListItem").forEach(listItem => {
        listItem.addEventListener("mouseover", () => {
            const button = listItem.querySelector(".driverRemovalButton")
            button.style.display = "flex"
        })
        listItem.addEventListener("mouseout", () => {
            const button = listItem.querySelector(".driverRemovalButton")
            button.style.display = "none"
        })
    })
    document.querySelectorAll(".driverRemovalButton").forEach(button => {
        button.addEventListener("click", () => {
            const driver = button.id.split("-")[1]
            removeDriver(driver)
        })
    })
}

addEventListenersToRemovalButtons()

// Ensure new buttons get the event listeners
const observer = new MutationObserver(() => {
    addEventListenersToRemovalButtons()
})

observer.observe(document.getElementById("dataList"), { childList: true })

function createDriverRemovalButton(driver) {
    const driverRemovalButton = document.createElement("button")

    driverRemovalButton.classList.add("driverRemovalButton")
    driverRemovalButton.innerText = "x"
    driverRemovalButton.style.display = "none"
    driverRemovalButton.id = `remove-${driver.toLowerCase().replace(/\s/g, '_')}`

    return driverRemovalButton
}

function addDriver(driverInput) {
    if (!driverInput) return

    dataArray.push(driverInput)
    renderData()
}

function removeDriver(driver) {
    const formattedDriver = driver.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase())
    dataArray.splice(dataArray.indexOf(formattedDriver), 1)
    renderData()
}

document.getElementById("driverInputButton").addEventListener("click", () => {
    const form = document.getElementById("driverInput")
    addDriver(form.value)
    form.value = ""
    form.focus()
})




