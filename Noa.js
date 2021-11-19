const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const wordName = getEl("word");
const wordNameContent = getEl("word-name-content");
const wordPhonetics = getEl("phonetics");
const wordPhoneticsContent = getEl("phonetics-content");
const wordOrigin = getEl("origin");
const wordOriginContent = getEl("origin-content");
const partOfSpeech = getEl("part-of-speech");
const partOfSpeechContent = getEl("part-of-speech-content");
const definition = getEl("definition");
const definitionContent = getEl("definition-content");
const example = getEl("example");
const exampleContent = getEl("example-content");
const synonym = getEl("synonym");
const synonymContent = getEl("synonym-content");
const antonym = getEl("antonym");
const antonymContent = getEl("antonym-content");
// const secondPartOfSpeech = getEl("part-of-speech-2");
// const secondDefinition = getEl("definition-2");
// const secondExample = getEl("example-2");
// const thirdDefinition = getEl("definition-3");
// const firstMeaningHeading = getEl('first-meaning-heading')
// const secondMeaningHeading = getEl('second-meaning-heading')
// const thirdMeaningHeading = getEl('third-meaning-heading')

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
    // if (word.meanings.length === 0) {
    //   console.log("None available!");
    //   partOfSpeechContent.textContent = "Sorry, none available!";
    // } else {
    //   word.meanings.forEach((meaning) => {
    //     partOfSpeechContent.append(meaning.partOfSpeech + "\n");
    //   })
    //     word.meanings.definitions.forEach((definition) => {
    //       definitionContent.append(definition.definition + "\n");
    //       exampleContent.append(definition.example + "\n");
    //       console.log("definitions.synonyms: ", definition.synonyms);
    //     });
    //   // word.meaning.definition.synonyms.forEach((synonym) => console.log(synonym));
    // }

    wordName.innerText = "Word: ";
    wordNameContent.innerText = word.word;
    wordPhonetics.textContent = "Phonetic spelling: ";
    wordPhoneticsContent.textContent = word.phonetic;
    wordOrigin.textContent = "Word origin: ";
    wordOriginContent.textContent = word.origin;
    partOfSpeech.textContent = "Part of speech: ";
    partOfSpeechContent.textContent = word.meanings[0].partOfSpeech
    definition.textContent = "Definition: ";
    definitionContent.textContent = word.meanings[0].definitions[0].definition;
    example.textContent = "Example: ";
    exampleContent.textContent = `"${word.meanings[0].definitions[0].example}"`;
    synonym.textContent = "Synonym: ";
    synonymContent.textContent = word.meanings[0].definitions[0].synonyms;
    antonym.textContent = "Antonym: ";
    antonymContent.textContent = word.meanings[0].definitions[0].antonyms;
    // secondMeaningHeading.textContent = 'Second Meaning:'
    // secondPartOfSpeech.textContent = `Part of speech: ${word.meanings[1].partOfSpeech}`;
    // secondDefinition.textContent = `Definition: ${word.meanings[1].definitions[0].definition}`;
    // secondExample.textContent = `Example: "${word.meanings[0].definitions[0].example}"`;
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
  window.location.reload();
}

function getEl(id) {
  return document.getElementById(id);
}
