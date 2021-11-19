const notesContainer = document.getElementById("app");
const addNoteButton = notesContainer.querySelector(".add-note");

// when the page load
getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content); //id and content come from the json that exist in the local storage
  notesContainer.insertBefore(noteElement, addNoteButton); //insert the noteElement before the + sign
});

addNoteButton.addEventListener("click", () => addNote());

function getNotes() {
  //retrieve existing notes from our local storage in the client's browser
  // default the note to empty array
  addNoteButton.addEventListener("click", () => addNote());
}

function getNotes() {
  //retrieve existing notes from our local storage in the client's browser
  // default the note to empty array
  return JSON.parse(localStorage.getItem("sticky-notes-notes") || "[]"); // convert json string into native js array
} //local storage store stuffs as string and value is also a string

function saveNotes(notes) {
  localStorage.setItem("sticky-notes-notes", JSON.stringify(notes)); //match the key and stringify as json then save
}

function createNoteElement(id, content) {
  const element = document.createElement("textarea"); //js representation of textarea

  element.classList.add("note"); //create a class
  element.value = content; //pass in id and default content
  element.placeholder = "✏️ Take notes here...";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

  element.addEventListener("dblclick", () => {
    const doDelete = confirm("⚠️Click OK to delete!");

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}

function addNote() {
  // add new note and save to local storage
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: "", //default content of the note should be empty
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton); // add the element to the page

  notes.push(noteObject);
  saveNotes(notes); //keep the note when refreshing the page
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0]; //looking for every and find the note that match with id

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id); //filter the note which do not have the same id as we pass in

  saveNotes(notes);
  notesContainer.removeChild(element);
  console.log("deleting");
  console.log(id);
}
