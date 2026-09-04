// ========================================
// Authentication Check
// ========================================

// Check whether a user is logged in before loading the profile.
window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect unauthenticated users to the login page.
  if (!user) {
    return (window.location.href = "/login.html");
  }

  // Get references to profile information elements.
  const userName = document.getElementById("user-name");
  const firstName = document.getElementById("first-name");
  const lastName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const age = document.getElementById("age");
  const gender = document.getElementById("gender");

  // Display the user's information on the profile page.
  userName.textContent =
    capitalize(user.firstName) + " " + capitalize(user.lastName);

  firstName.textContent = user.firstName;
  lastName.textContent = user.lastName;
  email.textContent = user.email;
  age.textContent = user.age;
  gender.textContent = user.gender;
});

// ========================================
// Capitalize Name
// ========================================

// Capitalize the first letter and lowercase the remaining letters.
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// ========================================
// Logout
// ========================================

// Handle the logout button.
const logoutBtn = document.getElementById("logout-btn");

logoutBtn.addEventListener("click", () => {
  // Remove the authenticated user from localStorage.
  localStorage.removeItem("user");

  // Redirect the user to the login page.
  window.location.href = "/login.html";
});

// ========================================
// Change Password Modal
// ========================================

const changePasswordModal = document.getElementById("change-password-modal");

const closeModalBtn = document.querySelector(".close-btn");
const changePasswordBtn = document.querySelector("#change-password-btn");

// ========================================
// Open Modal
// ========================================

// Show the change password modal.
changePasswordBtn.addEventListener("click", () => {
  changePasswordModal.style.display = "flex";
});

// ========================================
// Close Modal
// ========================================

// Close the modal using the close button.
closeModalBtn.addEventListener("click", () => {
  changePasswordModal.style.display = "none";
});

// Close the modal when clicking outside its content.
window.addEventListener("click", (e) => {
  if (e.target == changePasswordModal) {
    changePasswordModal.style.display = "none";
  }
});

// ========================================
// Change Password
// ========================================

const changePasswordForm = document.getElementById("change-password-form");

// Handle the change password form submission.
changePasswordForm.addEventListener("submit", async (e) => {
  // Prevent the browser from submitting the form normally.
  e.preventDefault();

  // Get the authenticated user from localStorage.
  const user = JSON.parse(localStorage.getItem("user"));

  // Get the password values from the form.
  const currentPassWord = document.getElementById("current-password").value;

  const newPassWord = document.getElementById("new-password").value;

  const confirmPassWord = document.getElementById("confirm-password").value;

  // Verify the current password.
  if (currentPassWord !== user.password) {
    return alert("Current password is incorrect");
  }

  // Make sure the new passwords match.
  if (newPassWord !== confirmPassWord) {
    return alert("New password and confirm password do not match.");
  }

  try {
    // Update the password in the local user object.
    user.password = newPassWord;

    // Update the user information in JSON Server.
    const res = await fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok == true) {
      alert("Password changed successfully");

      // Close the modal after a successful update.
      changePasswordModal.style.display = "none";

      // Update the stored user with the new password.
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      alert("Failed to change password");
    }
  } catch (error) {
    // Handle API or network errors.
    console.error(error);

    alert("Something went wrong. Please try again.");
  }
});
