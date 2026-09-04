// ========================================
// DOM References
// ========================================

const registerForm = document.getElementById("register-form");

// ========================================
// Registration
// ========================================

// Handle the registration form submission.
registerForm.addEventListener("submit", async (e) => {
  // Prevent the browser from submitting the form normally.
  e.preventDefault();

  // Get registration information from the form.
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const age = Number(document.getElementById("age").value);
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  let newUser = null;

  // Get the current number of registered users.
  const usersCount = await getUsersLength();

  // Make the first registered user an administrator.
  if (usersCount == 0) {
    newUser = {
      firstName,
      lastName,
      age,
      gender,
      email,
      password,
      role: "admin",
    };
  } else {
    // All users registered after the first user are regular users.
    newUser = {
      firstName,
      lastName,
      age,
      gender,
      email,
      password,
      role: "user",
    };
  }

  try {
    // Send the new user data to JSON Server.
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      alert("Account created successfully!");

      // Redirect the user to the login page.
      window.location.href = "/login.html";
    } else {
      alert("Failed to create account. Please try again.");
    }
  } catch (error) {
    // Handle API or network errors.
    console.error(error);

    alert("Something went wrong. Please try again.");
  }
});

// ========================================
// Authentication State Check
// ========================================

// Prevent logged-in users from accessing the registration page.
window.addEventListener("load", () => {
  const user = localStorage.getItem("user");

  // Redirect logged-in users to their profile.
  if (user) {
    window.location.href = "/profile.html";
  }
});

// ========================================
// Get Users Count
// ========================================

// Get the total number of registered users from the API.
async function getUsersLength() {
  const res = await fetch("http://localhost:3000/users");
  const users = await res.json();

  return users.length;
}
