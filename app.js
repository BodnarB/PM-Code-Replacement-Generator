let homeTeam = document.querySelector('#home-team')
let guestTeam = document.querySelector('#guest-team')
let homePrefix = document.querySelector('#home-prefix')
let guestPrefix = document.querySelector('#guest-prefix')
let finalFormat = document.querySelector('.final-format')
let downloadBtn = document.querySelector('#download-btn')
let formatCheckbox = document.querySelector('#format-checkbox')

function formatName(name) {
    return name.toLowerCase()
        .split(' ')
        .map(word => {
            return word.split('-')
                .map(part => {
                    if (part.length === 0) return ""
                    return part.charAt(0).toUpperCase() + part.slice(1)
                })
                .join('-')
        })
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

// function processLines(text, prefix) {
//     const lines = text.split('\n')
//     let result = ""

//     lines.forEach(line => {
//         const match = line.match(/^\s*(\d+)[\s.\–\-\—\t]*(.*)/)

//         if (match) {
//             const number = match[1]
//             const rawName = match[2].trim()
//             if (rawName) {
//                 const cleanName = formatName(rawName)
//                 result += `${prefix}${number}\t${cleanName}\n`
//             }
//         }
//     })
//     return result
// }


function processLines(text, prefix) {
    const lines = text.split('\n')
    let result = ""
    const shouldFormat = formatCheckbox.checked // Megnézzük, be van-e pipálva

    lines.forEach(line => {
        const match = line.match(/^\s*(\d+)[\s.\–\-\—\t]*(.*)/)

        if (match) {
            const number = match[1]
            let name = match[2].trim()

            if (name) {
                // Csak akkor formázunk, ha a checkbox be van pipálva
                const finalName = shouldFormat ? formatName(name) : name
                result += `${prefix}${number}\t${finalName}\n`
            }
        }
    })
    return result
}

// Add hozzá a checkboxot is a figyelendő elemek listájához
[homeTeam, guestTeam, homePrefix, guestPrefix, formatCheckbox].forEach(el => {
    el.addEventListener('input', generateCodes)
})

downloadBtn.addEventListener('click', () => {
    const text = finalFormat.innerText
    if (!text) return alert("Nincs generált tartalom!")

    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', 'PM_Codes.txt')
    element.click()
});

