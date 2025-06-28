const form = document.getElementById('urlForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const url = document.getElementById('urlInput').value;
  resultDiv.textContent = "Loading...";

  try {
    const response = await fetch('http://127.0.0.1:8000/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Network response was ass lmaooo');
    }

    const data = await response.json();
    resultDiv.innerHTML = `<strong>Response:</strong> ${JSON.stringify(data)}`;
  } catch (err) {
    resultDiv.textContent = "Error: " + err.message;
  }
});
