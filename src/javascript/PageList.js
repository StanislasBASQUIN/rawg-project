const PageList = (argument = "") => {
  
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          response.results.forEach((article) => {
            articles += `
                  <div class="card cardGame">
                    <img class="card-img-top" src="${article.background_image}" alt="Video Game Image">  
                    <div class="card-body">
                      <h1 class="card-title">${article.name}</h1>
                      <h2 class="card-text">Date de Sortie : ${article.released}</h2>
                      <a href="#pagedetail/${article.id}" class="btn btn-primary">Voir le détail</a>
                    </div>
                  </div>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};

export{ PageList };