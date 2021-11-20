// Defining global variables
const BASE_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const wordName = getEl("word");
const wordNameContent = getEl("word-name-content");
const wordPhonetics = getEl("phonetics");
const wordPhoneticsContent = getEl("phonetics-content");
const wordOrigin = getEl("origin");
const wordOriginContent = getEl("origin-content");
const meaningsList = getEl("meanings-list");

//Search Button Event Listener
const searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSearchButton);

function handleSearchButton(event) {
  event.preventDefault();
  const searchInput = getEl("search-input");
  const searchInputValue = searchInput.value;
  const API = BASE_URL + searchInputValue;

  //GET Request to API
  fetch(API)
    .then((resp) => resp.json())
    .then(displayWord)
    .catch((error) => alert("Something went wrong!\n" + error));
}

// displayWord Function
function displayWord(wordData) {
  // If data empty, then return this message from API
  if (!Array.isArray(wordData)) {
    wordPhonetics.textContent = wordData.message;
    wordOrigin.textContent = "😢";
    return;
  }
  const word = wordData[0];
  //Adding text to word, phonetics, and origin
  wordName.textContent = "Word: ";
  wordNameContent.textContent = word.word;
  wordPhonetics.textContent = "Phonetics: ";
  wordPhoneticsContent.textContent = word.phonetic
    ? word.phonetic
    : "No phonetics provided.";

  wordOrigin.textContent = "Origin: ";
  wordOriginContent.textContent = word.origin
    ? word.origin
    : "No origin provided.";

  // If meanings array is empty, then return this message added to div
  if (word.meanings.length === 0) {
    const noMeanings = createEl("h2");
    noMeanings.className = "highlight-no-messages";
    noMeanings.textContent = "Sorry, no word meanings available!";
    meaningsList.append(noMeanings);
    return;
  }
  // For each through meaning array, create a parts of speech container, header, and content and, append to div
  word.meanings.forEach((meaning) => {
    const meaningsContainer = createEl("div");
    meaningsContainer.className = "part-of-speech-container";
    const partOfSpeechHeader = createEl("h2");
    partOfSpeechHeader.id = "part-of-speech-header";
    partOfSpeechHeader.className = "underline-word";
    const partOfSpeechContent = createEl("h2");
    partOfSpeechContent.id = "part-of-speech-content";
    partOfSpeechContent.className = "continue-sentence";
    partOfSpeechHeader.textContent = "Part of speech: ";
    partOfSpeechContent.textContent = meaning.partOfSpeech;
    meaningsContainer.append(partOfSpeechHeader, partOfSpeechContent);
    meaningsList.append(meaningsContainer);

    // If definitions array is empty, return this message added to div
    if (meaning.definitions.length === 0) {
      const noDefinitions = createEl("h2");
      noDefinitions.className = "highlight-no-messages";
      noDefinitions.textContent = "Sorry, no definitions available!";
      meaningsContainer.append(noDefinitions);
    } else {
      // Still part of the for each loop, looping through definitions array and creating definitions container, header, and content, and append to div
      meaning.definitions.forEach((definition) => {
        const definitionsContainer = createEl("div");
        definitionsContainer.className = "definitions-container";
        const definitionsHeader = createEl("h2");
        definitionsHeader.id = "definitions-header";
        definitionsHeader.className = "underline-word";
        const definitionsContent = createEl("h2");
        definitionsContent.id = "definitions-content";
        definitionsContent.className = "continue-sentence";
        definitionsHeader.textContent = "Definition: ";
        definitionsContent.textContent = definition.definition;
        definitionsContainer.append(definitionsHeader, definitionsContent);
        meaningsContainer.append(definitionsContainer);
        // Still part of the for each loop, looping through definitions array and creating examples container, header, and content, and append to div
        const examplesContainer = createEl("div");
        examplesContainer.className = "examples-container";
        const examplesHeader = createEl("h2");
        examplesHeader.id = "examples-header";
        examplesHeader.className = "underline-word";
        const examplesContent = createEl("h2");
        examplesContent.id = "examples-content";
        examplesContent.className = "continue-sentence";
        examplesHeader.textContent = "Example: ";
        examplesContent.textContent = definition.example
          ? `"${definition.example}."`
          : "No example provided.";
        examplesContainer.append(examplesHeader, examplesContent);
        meaningsContainer.append(examplesContainer);

        // Creating synonym div and antonym container div
        const synonymContainer = createEl("div");
        synonymContainer.className = "synonym-container";
        const antonymContainer = createEl("div");
        antonymContainer.className = "antonym-container";
        // If synonym array is empty, return this message added to h2 and append to div
        if (definition.synonyms.length === 0) {
          const noSynonym = createEl("h2");
          noSynonym.className = "highlight-no-messages";
          noSynonym.textContent = "Sorry, no synonyms available!";
          synonymContainer.append(noSynonym);
          meaningsContainer.append(synonymContainer);
        } else {
          // Creating synonym header, id, className, and textContent
          const synonymHeader = createEl("h2");
          synonymHeader.id = "synonym-header";
          synonymHeader.className = "underline-word";
          synonymHeader.textContent = "Synonyms: ";
          synonymContainer.append(synonymHeader);
          // For each loop through synonyms array and create synonym container and content, and append to synonym div and then to meanings div
          definition.synonyms.forEach((synonym) => {
            const synonymContent = createEl("h2");
            synonymContent.id = "synonym-content";
            synonymContent.className = "continue-sentence";
            synonymContent.textContent = synonym + ", ";
            synonymContainer.append(synonymContent);
          });
          meaningsContainer.append(synonymContainer);
        }
        // If antonym array is empty, return this message added to h2 and append to div
        if (definition.antonyms.length === 0) {
          const noAntonym = createEl("h2");
          noAntonym.className = "highlight-no-messages";
          noAntonym.textContent = "Sorry, no antonyms available!";
          antonymContainer.append(noAntonym);
          meaningsContainer.append(antonymContainer);
        } else {
          // Creating antonym header, id, className, and textContent
          const antonymHeader = createEl("h2");
          antonymHeader.id = "antonym-header";
          antonymHeader.className = "underline-word";
          antonymContainer.append(antonymHeader);
          // For each through antonym array and create antonym container and content, and append to antonym div and then to meanings div
          definition.antonyms.forEach((antonym) => {
            const antonymContent = createEl("h2");
            antonymContent.id = "antonym-content";
            antonymContent.className = "continue-sentence";
            antonymHeader.textContent = "Antonyms: ";
            antonymContent.textContent = antonym + ", ";
            antonymContainer.append(antonymContent);
          });
          meaningsContainer.append(antonymContainer);
        }
      });
    }
  });
}

// Like Button Event Listener
const likeButton = getEl("like-button");
likeButton.addEventListener("click", handleLikeButtonClick);

function handleLikeButtonClick() {
  if (likeButton.style.backgroundColor === "green") {
    likeButton.style.backgroundColor = "";
    dislikeButton.disabled = false;
  } else {
    likeButton.style.backgroundColor = "green";
    dislikeButton.disabled = true;
  }
}

// Dislike Button Event Listener
const dislikeButton = getEl("dislike-button");
dislikeButton.addEventListener("click", handleDislikeButton);

function handleDislikeButton() {
  if (dislikeButton.style.backgroundColor === "red") {
    dislikeButton.style.backgroundColor = "";
    likeButton.disabled = false;
  } else {
    dislikeButton.style.backgroundColor = "red";
    likeButton.disabled = true;
  }
}

// Reset Button Event Listener
const resetButton = getEl("reset-button");
resetButton.addEventListener("click", handleResetButtonClick);

function handleResetButtonClick() {
  document.querySelector("#search-input").value = "";
  const wordInfoDiv = document.querySelector("#word-info");
  wordInfoDiv.innerHTML = "";
  window.location.reload();
}

// Get Element by Id Function
function getEl(id) {
  return document.getElementById(id);
}

// Create Element Function
function createEl(element) {
  return document.createElement(element);
}
