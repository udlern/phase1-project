# phase1-project

User Deliverables:

As a user, I can type in a word into a search box
As a user, I can press the submit/search button to submit the word
As a user, I will see the dictionary information about that word displaying below the search box
As a user, I will be able to reset my input in the search box by clicking the reset button below the search box
As a user, I will be able to like or dislike the information displayed in the browser if that was the information I needed
As a user, I will be able to click the add a new note button to display however many note text boxes I click the button for
As a user, I will be able to type notes into the text box
As a user, I will be able to double click the note, get an alert and confirm that I want to delete the note, and then have my notes disappear from the browser
As a user, I will get an error message displayed if I type in and search a word that is not available on the API
As a user, I will get a message displayed next to the label of the word properties for any word properties that aren't available on the API

Basic Story: a user can type in a word and get a variety of Oxford dictionary information about that word
Core Features: user typing in the word in input text box, submitting the word, fetching word data from API, resetting input text box after submit
We’ll be using the oxford dictionary API : https://dictionaryapi.dev/, and will fetch the word information received by the user word input in the search box
We will be using 3 event listeners(submit button, like button, and reset input button)

We are expecting to see some issue on putting all the features to work together, and pulling down the information from the API.

To access the API: 

Get word definitions
Usage : The basic syntax of a URL request to the API is shown below:

https://api.dictionaryapi.dev/api/v2/entries/en/<word>

As an example, to get definition of English word hello, you can send request to

https://api.dictionaryapi.dev/api/v2/entries/en/hello

