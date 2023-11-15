document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.search-box');
  const inputSearch = document.querySelector('#input-search');
  const resultsContainer = document.querySelector('.results');
  const resultsCounter = document.querySelector('header p');

  const searchWikipedia = (searchValue) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=500&srsearch=${encodeURIComponent(searchValue)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        displayResults(data.query.search);
        console.log(data);
      })
      .catch(error => {
        alert('Error: ' + error);
      });

    const displayResults = (results) => {
      resultsContainer.innerHTML = "";
      resultsCounter.innerText = `Numarul de rezultate: ${results.length}`;
      const deleteButton = document.getElementById('delete');
      deleteButton.addEventListener('click', () => {
        window.location.reload();
      })
      deleteButton.style.display = 'block';
      results.forEach(result => {
        const resultElement = document.createElement('div');
        resultElement.className = 'result';
        resultElement.innerHTML = `
          <h3>${result.title}</h3>
          <p>${result.snippet}</p>
          <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">Vezi mai mult</a>
        `;
        resultsContainer.appendChild(resultElement);
      });
    };
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchValue = inputSearch.value;
    if (searchValue !== "") {
      searchWikipedia(searchValue);
    }
  });
});
