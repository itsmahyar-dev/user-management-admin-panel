// ========================================
// DOM References
// ========================================

const usersTableBody = document.querySelector("tbody");
const logoutBtn = document.getElementById("logout-btn");

const closeEditModalBtn = document.querySelector(".close-btn");
const editUserModal = document.getElementById("edit-user-modal");

// ========================================
// Admin Authentication Check
// ========================================

// Verify that a logged-in user exists and has admin privileges
// before allowing access to the admin panel.
window.addEventListener("load", async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (window.location.href = "/login.html");
  }

  if (user.role != "admin") {
    return (window.location.href = "/login.html");
  }

  // Fetch users from the API and render them in the table.
  const users = await getUsers();
  renderUsers(users);
});

// ========================================
// Logout
// ========================================

// Remove the current user from localStorage
// and redirect back to the login page.
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");

  window.location.href = "/login.html";
});

// ========================================
// Delete User
// ========================================

// Delete a specific user from the API using their ID.
async function deleteUserById(userId) {
  const confirmResult = confirm("Are you sure you want to delete this user?");

  if (confirmResult == true) {
    try {
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("user deleted successfully!");

        // Refresh the table after successful deletion.
        const users = await getUsers();
        renderUsers(users);
      } else {
        alert("failed to delete user.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  }
}

// ========================================
// Edit User
// ========================================

// Open the edit modal, load the selected user's data,
// and update the user after the form is submitted.
async function editUserById(userId) {
  // Display the modal before loading the selected user.
  editUserModal.style.display = "flex";

  const res = await fetch(`http://localhost:3000/users/${userId}`);

  const user = await res.json();

  // Populate the form with the current user's information.
  document.getElementById("edit-first-name").value = user.firstName;
  document.getElementById("edit-last-name").value = user.lastName;
  document.getElementById("edit-age").value = user.age;
  document.getElementById("edit-gender").value = user.gender;
  document.getElementById("edit-email").value = user.email;
  document.getElementById("edit-password").value = user.password;
  document.getElementById("edit-role").value = user.role;

  const editUserBtn = document.querySelector(".edit-user-btn");

  // Handle the form submission for the selected user.
  editUserBtn.onclick = async function (e) {
    e.preventDefault();

    // Collect the updated values from the form.
    const editUserInfo = {
      firstName: document.getElementById("edit-first-name").value,
      lastName: document.getElementById("edit-last-name").value,
      age: Number(document.getElementById("edit-age").value),
      gender: document.getElementById("edit-gender").value,
      email: document.getElementById("edit-email").value,
      password: document.getElementById("edit-password").value,
      role: document.getElementById("edit-role").value,
    };

    try {
      // Send the updated user data to the API.
      const res = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(editUserInfo),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        alert("user info edited successfully!");

        // Close the modal after a successful update.
        editUserModal.style.display = "none";

        // Fetch and render the updated user list.
        const updatedUsers = await getUsers();
        renderUsers(updatedUsers);
      } else {
        alert("edit failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };
}

// ========================================
// Render Users
// ========================================

// Generate table rows dynamically from the users received
// from the API and insert them into the table body.
function renderUsers(users) {
  // Clear existing rows before rendering the updated list.
  usersTableBody.innerHTML = "";

  users.forEach((user) => {
    usersTableBody.innerHTML += `
      <tr>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.email}</td>

        <td class="${user.role === "admin" ? "admin-role" : "user-role"}">
          ${user.role}
        </td>

        <td>
          <button
            class="edit-btn"
            onclick="editUserById('${user.id}')"
          >
            <i class="fas fa-edit"></i>
            Edit
          </button>

          <button
            class="delete-btn"
            onclick="deleteUserById('${user.id}')"
          >
            <i class="fas fa-trash-alt"></i>
            Delete
          </button>
        </td>
      </tr>
    `;
  });
}

// ========================================
// Get Users
// ========================================

// Fetch the complete user list from the JSON Server API.
async function getUsers() {
  const res = await fetch("http://localhost:3000/users");

  const users = await res.json();

  return users;
}

// ========================================
// Close Edit Modal
// ========================================

// Close the edit modal when the close button is clicked.
closeEditModalBtn.addEventListener("click", () => {
  editUserModal.style.display = "none";
});

// Close the modal when the user clicks outside
// the modal content area.
window.addEventListener("click", (e) => {
  if (e.target == editUserModal) {
    editUserModal.style.display = "none";
  }
});
