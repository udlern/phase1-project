const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const wordName = getEl("word");
const wordNameContent = getEl('word-name-content')
const wordPhonetics = getEl("phonetics");
const wordOrigin = getEl("origin");
const firstPartOfSpeech = getEl("part-of-speech-1");
const firstDefinition = getEl("definition-1");
const firstExample = getEl("example-1");
const secondPartOfSpeech = getEl("part-of-speech-2");
const secondDefinition = getEl("definition-2");
const secondExample = getEl("example-2");
const thirdDefinition = getEl("definition-3");
const firstMeaningHeading = getEl('first-meaning-heading')
const secondMeaningHeading = getEl('second-meaning-heading')
const thirdMeaningHeading = getEl('third-meaning-heading')

const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSearchButton);

function handleSearchButton(event) {
  event.preventDefault();
  const searchInput = getEl("search-input");
  const searchInputValue = searchInput.value;
  const API = BASE_URL + searchInputValue;

  fetch(API)
    .then((resp) => resp.json())
    .then(displayWord)
    .catch((error) => alert("Something went wrong!\n" + error));
}

function displayWord(wordData) {
  if (!Array.isArray(wordData)) {
    wordName.textContent = wordData.title;
    wordPhonetics.textContent = wordData.message;
  } else {
    const word = wordData[0];
    wordName.textContent = "Word: "
    wordNameContent.textContent = word.word
    wordPhonetics.textContent = `Phonetic Spelling: ${word.phonetic}`;
    wordOrigin.textContent = `Word Origin: ${word.origin}`;
    firstMeaningHeading.textContent = 'First Meaning:'
    firstPartOfSpeech.textContent = `Part of Speech: ${word.meanings[0].partOfSpeech}`
    firstDefinition.textContent = `Definition: ${word.meanings[0].definitions[0].definition}`;
    firstExample.textContent = `Example: "${word.meanings[0].definitions[0].example}"`;
    secondMeaningHeading.textContent = 'Second Meaning:'
    secondPartOfSpeech.textContent = `Part of Speech: ${word.meanings[1].partOfSpeech}`;
    secondDefinition.textContent = `Definition: ${word.meanings[1].definitions[0].definition}`;
    secondExample.textContent = `Example: "${word.meanings[0].definitions[0].example}"`;
  }
}

const likeButton = getEl("like-button");
likeButton.addEventListener("click", handleLikeButtonClick);

function handleLikeButtonClick() {
  if (likeButton.style.backgroundColor === "green") {
    likeButton.style.backgroundColor = "";
  } else {
    likeButton.style.backgroundColor = "green";
  }
}

const dislikeButton = getEl("dislike-button");
dislikeButton.addEventListener("click", handleDislikeButton);

function handleDislikeButton() {
  if (dislikeButton.style.backgroundColor === "red") {
    dislikeButton.style.backgroundColor = "";
  } else {
    dislikeButton.style.backgroundColor = "red";
  }
}

const resetButton = getEl("reset-button");
resetButton.addEventListener("click", handleResetButtonClick);

function handleResetButtonClick() {
  document.querySelector("#search-input").value = "";
  const wordInfoDiv = document.querySelector("#word-info");
  wordInfoDiv.innerHTML = "";
  window.location.reload()
}

function getEl(id) {
  return document.getElementById(id);
}
