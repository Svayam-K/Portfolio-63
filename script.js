document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const status = document.getElementById("status");

  try {
    const response = await fetch("http://localhost:4000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();
    status.textContent = data.message;
    status.style.color = "lightgreen";
  } catch (err) {
    status.textContent = "Error connecting to server";
    status.style.color = "red";
  }
});
