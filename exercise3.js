//Create DOM selectors for usergrid container, view toggle button (viewToggleBtn), the delete input (deleteIdInput), the delete button (deleteBtn), the sort by group button (sortByGroupBtn), the sort by ID button (sortByIdBtn)
const usergridContainer = document.getElementById('userGrid');
const viewToggleBtn = document.getElementById('viewToggleBtn');
const deleteInput = document.getElementById('deleteIdInput');
const deleteBtn = document.getElementById('deleteBtn');
const sortBygroupBtn = document.getElementById('sortByGroupBtn');
const sortByIdBtn = document.getElementById('sortByIdBtn');

let users = [];

// Function to fetch users from the API and store them in the users array
async function retrieveData() {
    try {
        const response = await fetch('https://69a1df572e82ee536fa26e9c.mockapi.io/users_api');
        users = await response.json();
        console.log(users);

        // Render AFTER data is loaded
        renderUsers(users);
    }
    catch (error) {
        console.error("Failed to retrieve user data:", error);
    }
}

function renderUsers(users) {

    usergridContainer.innerHTML = '';
    users.forEach(user => {
        usergridContainer.innerHTML += `
        <article class="user-card">
            <h3>${user.first_name ?? ""}</h3>
            <p>first_name: ${user.first_name ?? ""}</p>
            <p>user_group: ${user.user_group ?? ""}</p>
            <p>id: ${user.id ?? ""}</p>
        </article>
        `;
    });

}

retrieveData()

viewToggleBtn.addEventListener('click', () => {
    if (usergridContainer.classList.contains('list-view')) {
        usergridContainer.classList.remove('list-view');
        usergridContainer.classList.add('grid-view');
    } else {
        usergridContainer.classList.remove('grid-view');
        usergridContainer.classList.add('list-view');
    }
});


sortBygroupBtn.addEventListener('click', () => {
    const sortedByGroup = users.sort((a, b) => {
        return a.user_group - b.user_group;
    });
    renderUsers(sortedByGroup);
});

sortByIdBtn.addEventListener('click', () => {
    const sortedById = users.sort((a, b) => {
        return a.id - b.id;
    });
    renderUsers(sortedById);
});



deleteBtn.addEventListener('click', async () => {
    const userIdToDelete = deleteInput.value.trim();
    try {
        const response = await fetch(`https://69a1df572e82ee536fa26e9c.mockapi.io/users_api/${userIdToDelete}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            // Remove the deleted user from the users array
            users = users.filter(user => user.id !== userIdToDelete);
            renderUsers(users);
            console.log(`User with ID ${userIdToDelete} has been deleted.`);
        } else {
            console.error(`Failed to delete user with ID ${userIdToDelete}. Status: ${response.status}`);
        }

    } catch (error) {
        console.error("Error occurred while trying to delete user:", error);
    }
});