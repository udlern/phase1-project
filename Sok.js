// console.log('test1')
// console.log('test2')
// console.log('test3')

const API = 'https://api.dictionaryapi.dev/api/v2/entries/en/hello'

// const API1 = 'https://api.dictionaryapi.dev/api/v2/entries/en/<word>'
fetch(API)
.then(res => res.json())
.then(word => {
    document.getElementById('definition').innerText = word.word
})

document
.getElementById('search-form')
.addEventListener('submit', addWord)

document
.getElementById('search-button')
.addEventListener('submit', button)

function button(event){
    event.preventDefault()
}

function addWord(event){
    event.preventDefault()
}
