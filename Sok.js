const addBtn = document.getElementById("add");
addBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="delete">
                <i>Delete</i>
                </button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <div class="space">
            <textarea class="${text ? "hidden" : ""}"></textarea>
            </div>
        </div>
    `
    const deleteBtn = note.querySelector(".delete");
    deleteBtn.addEventListener("click", () => {
        note.remove();
    });
    document.body.appendChild(note);
}

