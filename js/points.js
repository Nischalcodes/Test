async function authenticateUser(email, password) {
    const url = "https://script.google.com/macros/s/AKfycbzirhQogd1PRSGTC4EZYcxdUm-6Hhr2mMX_gCw0sC1lzRU4SWQ3Rgr6IcoZgt8sYGuQjA/exec"; // Replace with your deployed web app URL
    const data = { email: email, password: password };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
  
  
  // Add event listener for form submission
  const formElement = document.getElementById('login-form');
  
  if (formElement) {
    formElement.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent the default form submission
  
      const email = document.getElementById('email').value; // Get the email
      const password = document.getElementById('password').value; // Get the password
  
      // Hash the password using SHA-256 (ensure you have CryptoJS loaded)
      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
  
      try {
        const authResult = await authenticateUser(email, hashedPassword); // Call your authentication function
        console.log('Authentication result:', authResult);
  
        // Handle the result (e.g., redirect, display a message, etc.)
        if (authResult.error) {
          alert(authResult.error);
        } else {
          alert(`Welcome, ${authResult.name}! You have ${authResult.points} points.`);
          // Redirect to another page or update the UI as needed
        }
      } catch (error) {
        console.error("Error during authentication", error);
        alert("Authentication failed. Please check your credentials.");
      }
    });
  } else {
    console.error("Form element with id 'login-form' not found!");
  }
  