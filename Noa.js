const searchButton = document.querySelector('#search-button')
searchButton.addEventListener('click', handleSearchButton) 

function handleSearchButton (event) {
    event.preventDefault()
const searchInput = document.querySelector('.search-input')
const searchInputValue = searchInput.value
const API = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInputValue}`
fetch(API)
.then(resp => resp.json())
.then(data => console.log(data))
}

