const form = document.getElementById('urlForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const url = document.getElementById('urlInput').value;

  let dotCount = 1;
  resultDiv.textContent = 'Loading.';
  const loadingInterval = setInterval(() => {
    dotCount = (dotCount % 3) + 1;
    resultDiv.textContent = 'Loading' + '.'.repeat(dotCount);
  }, 500);

  try {
    const response = await fetch('https://reseller-checker-backend.onrender.com/track', {
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
