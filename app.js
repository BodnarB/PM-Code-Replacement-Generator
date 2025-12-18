let homeTeam = document.querySelector('#home-team')
let guestTeam = document.querySelector('#guest-team')
let homePrefix = document.querySelector('#home-prefix')
let guestPrefix = document.querySelector('#guest-prefix')
let finalFormat = document.querySelector('.final-format')
let downloadBtn = document.querySelector('#download-btn')

function formatName(name) {
    return name.toLowerCase().split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

function generateCodes() {
    let output = ""

    const hPre = homePrefix.value.trim()
    const gPre = guestPrefix.value.trim()

    output += processLines(homeTeam.value, hPre)
    output += processLines(guestTeam.value, gPre)

    finalFormat.innerHTML = `<pre>${output}</pre>`
}

function processLines(text, prefix) {
    const lines = text.split('\n')
    let result = ""

    lines.forEach(line => {
        const match = line.match(/^\s*(\d+)[\s.\–\-\—\t]*(.*)/)

        if (match) {
            const number = match[1]
            const rawName = match[2].trim()
            if (rawName) {
                const cleanName = formatName(rawName)
                result += `${prefix}${number}\t${cleanName}\n`
            }
        }
    })
    return result
}

downloadBtn.addEventListener('click', () => {
    const text = finalFormat.innerText
    if (!text) return alert("Nincs generált tartalom!")

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', 'PM_Codes.txt')
    element.click()
});

[homeTeam, guestTeam, homePrefix, guestPrefix].forEach(el => {
    el.addEventListener('input', generateCodes)
})