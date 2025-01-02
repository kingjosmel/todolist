let btnAdd = document.getElementById('btn');
let ul = document.getElementById('item-list');
let clearBtn = document.getElementById('clear');

// Function to load items from localStorage when the page loads
function loadItems() {
    // Retrieve the items array from localStorage, or initialize it as an empty array if it doesn't exist
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(item => {
        // Create and append list items for each stored value
        createListItem(item);
    });
}

// Function to create a list item (to avoid repeating code)
function createListItem(text) {
    let li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = text;
    // li.textContent = text;
    li.appendChild(p)
    console.log(p)
    li.classList.add('style')
    // li.attributes('class', 'style' )
    console.log(li)

    // Create a delete button
    let btnDelete = document.createElement('button');
    btnDelete.classList.add('remove-item', 'btn-link', 'text-red');

    // Create an icon for the delete button
    let icon = document.createElement('i');
    icon.classList.add('fa-solid', 'fa-xmark');
    btnDelete.appendChild(icon);

    // Append the delete button to the list item
    li.appendChild(btnDelete);

    // Append the list item to the ul
    ul.appendChild(li);
}

// Function to add an item to the list and localStorage
function addItem() {
    let input = document.getElementById('item-input').value;

    // Check if the input is not empty
    if (input.trim() === '') {
        alert('Please enter a valid item.');
        return;
    }

    // Retrieve the existing items array from localStorage
    let items = JSON.parse(localStorage.getItem('items')) || [];

    // Add the new item to the array
    items.push(input);

    // Update localStorage with the new array
    localStorage.setItem('items', JSON.stringify(items));

    // Create and append a new list item
    createListItem(input);

    // Clear the input field
    document.getElementById('item-input').value = '';
}

// Add event listener to the Add button
btnAdd.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default form submission
    addItem();
});

// Event delegation to handle clicks on delete icons
ul.addEventListener('click', (e) => {
    if (e.target.tagName === 'I') {
        // Find the parent list item of the clicked icon
        let li = e.target.closest('li');
        if (li) {
            // Remove the item from the DOM
            ul.removeChild(li);

            // Retrieve the existing items array from localStorage
            let items = JSON.parse(localStorage.getItem('items')) || [];

            // Remove the clicked item from the array
            let updatedItems = items.filter(item => item !== li.textContent);

            // Update localStorage with the modified array
            localStorage.setItem('items', JSON.stringify(updatedItems));
        }
    }
});

// Add event listener to the Clear button
clearBtn.addEventListener('click', () => {
    // Clear the list from the DOM
    ul.innerHTML = '';

    // Clear all items from localStorage
    localStorage.removeItem('items');
});

// Load items from localStorage on page load
loadItems();


// function for the filter 
function search() {
    const filter = document.getElementById('filter').value;
    const product = document.querySelectorAll('.style');
    const pname = document.getElementsByTagName('p');

    for(let i=0; i < pname.length; i++){
        let matchingValues = product[i].getElementsByTagName('p')[0];

        if(matchingValues){
            const textValue = matchingValues.textContent || matchingValues.innerHTML

            if(textValue.indexOf(filter) > -1){
                product[i].style.display = '';
            }else{
                product[i].style.display = 'none';

            }
        }
    }
}
