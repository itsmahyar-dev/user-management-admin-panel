// ========================================
// DOM References
// ========================================

const loginForm = document.getElementById("login-form");

// ========================================
// Login
// ========================================

// Handle the login form submission and authenticate
// the user against the API.
loginForm.addEventListener("submit", async (e) => {
  // Prevent the browser from submitting the form normally.
  e.preventDefault();

  // Get login credentials from the form.
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    // Search for a user with the provided email.
    const res = await fetch(`http://localhost:3000/users?email=${email}`);

    const users = await res.json();

    // Check whether a matching user was found.
    if (users.length > 0) {
      const user = users[0];

      // Verify the provided password.
      if (user.password == password) {
        alert("Login successful!");

        // Store the authenticated user for later access checks.
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect the user based on their role.
        if (user.role == "admin") {
          window.location.href = "/admin.html";
        } else {
          window.location.href = "/profile.html";
        }
      } else {
        alert("Invalid email or password.");
      }
    } else {
      alert("User not found.");
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

// Prevent already authenticated users from returning
// to the login page.
window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Continue normally if no user is logged in.
  if (!user) return;

  // Redirect regular users to their profile.
  if (user.role == "user") {
    return (window.location.href = "/profile.html");
  }

  // Redirect administrators to the admin panel.
  if (user.role == "admin") {
    return (window.location.href = "/admin.html");
  }
});
