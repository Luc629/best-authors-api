

console.log('Loading best authors list...');
$(document).ready(async function() {
    const API_URL = 'http://localhost:3000/bestAuthors'; // Initialize the best authors list
console.log('Initializing best authors list...');

// Function fetches all authors from the API
    async function fetchBestAuthors() {
        try {
        const response = await fetch(API_URL);
        const bestAuthors = await response.json();
        return bestAuthors;
    } catch (error) {
        console.error('Error fetching bestAuthors:', error);
        return [];
    }
    }
;
const bestAuthors = await fetchBestAuthors(); // Fetch the initial list of authors
console.log('Best authors fetched:', bestAuthors);
// Function to create the best authors list
    async function addBestAuthors() {
        const bestAuthorsContainer = document.getElementById('bestAuthors');
        bestAuthorsContainer.addEventListener('add', async function(event) {
        event.preventDefault();
        await addBestAuthors();
    });
    }
// Adds a new author to the list in API (POST request)
    async function addBestAuthors(text) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text,
          completed: false,
        }),
      });
      const bestAuthors = await response.json();
      return bestAuthors;
    } catch (error) {
      console.error("Error adding bestAuthors:", error);
      return null;
    }
  }
// Deletes an author from the API list

    async function deleteBestAuthors(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });
        return true;
    } catch (error) {
        console.error("Error deleting bestAuthors:", error);
        return false;
    }
    }

// Function to render/integrating the best authors into the HTML and clears current list
    async function render() {
        this.bestauthors= bestAuthors;
        $(`bestAuthorsContainer`).empty();
    }
if(bestAuthors.length > 0) {
    bestAuthors.forEach(bestAuthors => {
            const li = document.createElement('li');
            li.textContent = bestAuthors.name;
        
        //Function appends the list  and provides delete button
        });
    console.log('No best authors found.');
    bestAuthors.forEach(function (bestAuthors) {
        let bestAuthorsItem = `<li class="list-group-item d-flex justify-content-between align-items-center">
            <span class="bestAuthors-text">
            // ${bestAuthors.completed ? "completed" : ""} ${bestAuthors.text}</span>
            <div>
                <button class="btn btn-sm btn-danger deleteBestAuthors" bestAuthor-id="${bestAuthors.id}">Delete</button>
            </div>
        </li>`;
        $("#bestAuthors").append(bestAuthorsItem);
    
    });

}
 // Adding new author to the list
 render();

 $("form").submit(async function (event) {
    event.preventDefault(); //Stops the page from refreshing
    const input = document.querySelector('.form-control');
    let bestAuthorsText = $("newBestAuthors");
    const text = input.value.trim();

    if (text) {
        const newBestAuthor = await addBestAuthors(bestAuthorsText);
        
        if (newBestAuthor) {
            $("#newBestAuthors").val("");
            render();
            input.value = ''; // Clear the input field
        }
    } else {
        alert('Please enter a valid author name.');
    }
  
    });

// render();

//   // Add a new to-do
//   $("form").submit(async function (event) {
//     event.preventDefault(); //stops the page from refreshing
//     let todoText = $("#newTodo").val().trim();
//     if (todoText !== "") {
//       const newTodo = await addTodo(todoText);
//       if (newTodo) {
//         $("#newTodo").val("");
//         render(); // Re-render the list
//       }
//     } else {
//       alert("Please enter a to-do");
//     }
//   });


// Editing an author (UPDATE request)
    $(document).on("click", ".editBestAuthors", async function () {
        const bestAuthors = $(this).data("id");
        const bestAuthorsTextElement = $(this).closest("li").find(".bestAuthors-text");
        let currentText = bestAuthorsTextElement.text();
        let newText = prompt("Edit your bestAuthors:", currentText);
    if (newText !== null && newText.trim() !== "") {
      const success = await updateBestAuthors(bestAuthors, { text: newText.trim() });
      if (success) {
        render(); // Re-render the list
      }
    }
    });
});
