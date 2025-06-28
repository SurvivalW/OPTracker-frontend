const form = document.getElementById('urlForm');
const resultDiv = document.getElementById('result');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const urlInput = document.getElementById('urlInput');
  const url = urlInput.value.trim();

  if (!url)
  {
    resultDiv.textContent = "Please enter a URL."
    return;
  }
  else if (!isValidUrl(url) || !url.includes("amazon."))
  {
    resultDiv.textContent = "Only Amazon URLs for now. (;"
    return;
  }

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

    clearInterval(loadingInterval);
    resultDiv.textContent = "";

    if (!response.ok) {
      throw new Error('Network response was ass lmaooo');
    }

    const data = await response.json();

    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
        <h3><a href="${data.url}" target="_blank">${data.title}</a></h3>
        <p><strong>Price:</strong> ${data.price}</p>
        <p><strong>Availability:</strong> ${data.availability}</p>
    `;

    resultDiv.appendChild(card);
    urlInput.value = "";
  } catch (err) {
    resultDiv.textContent = "Error: " + err.message;
  }
});

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}



