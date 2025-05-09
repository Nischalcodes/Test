async function authenticateUser(email, password) {
    const url = "https://script.google.com/macros/s/AKfycbzirhQogd1PRSGTC4EZYcxdUm-6Hhr2mMX_gCw0sC1lzRU4SWQ3Rgr6IcoZgt8sYGuQjA/exec";
    const data = { email: email, password: password };
 
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', // Explicitly set CORS mode
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
      // More specific error handling
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('CORS error or network failure:', error);
        throw new Error('Cross-origin request blocked. Check server CORS configuration.');
      } else {
        console.error('Fetch error:', error);
        throw error;
      }
    }
  }
 
  // Add event listener for form submission
  document.addEventListener('DOMContentLoaded', () => {
    const formElement = document.getElementById('login-form');
   
    if (formElement) {
      formElement.addEventListener('submit', async (event) => {
        event.preventDefault();
   
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
   
        try {
          // Ensure CryptoJS is loaded
          if (typeof CryptoJS === 'undefined') {
            throw new Error('CryptoJS is not loaded. Please include the library.');
          }
         
          const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);
          const authResult = await authenticateUser(email, hashedPassword);
         
          if (authResult.error) {
            alert(authResult.error);
          } else {
            alert(`Welcome, ${authResult.name}! You have ${authResult.points} points.`);
            // Redirect to another page or update the UI as needed
          }
        } catch (error) {
          console.error("Error during authentication", error);
          alert("Authentication failed: " + error.message);
        }
      });
    } else {
      console.error("Form element with id 'login-form' not found!");
    }
  });
