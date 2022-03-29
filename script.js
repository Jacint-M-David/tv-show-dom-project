const allEpisodes = getAllEpisodes(),
rootElem = document.getElementById("root"),
searchBar = document.getElementById("searchBar"),
matches = document.getElementById("matches"),
select = document.getElementById("selectEpisode");

//You can edit ALL of the code here
function setup() {
  render(getAllEpisodes());
}

function makePageForEpisodes(episodeList) {
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

const episodeContainsTerm = (episode, searchTerm) => {
  const inTitle = episode.name,
  inDescription = episode.summary;
  return searchTerm.test(inTitle) || searchTerm.test(inDescription);
}

const searchCollection = () => {
  let searchTerm;
  if (!searchBar.value) {
    rootElem.replaceChildren();
    render(getAllEpisodes());
    return;
  } else {
    searchTerm = new RegExp(searchBar.value, 'i')
    let episodesFound = getAllEpisodes().filter((episode) => {return episodeContainsTerm(episode, searchTerm)});
    rootElem.replaceChildren();
    render(episodesFound);
    return;
  }
}

const minTwoDigits = (num) => {
  if (num < 10) {return "0" + num}
  else {return num};
}

const episodeCode = (item) => {
  const S = minTwoDigits(item.season),
  E = minTwoDigits(item.number);
  return `S${S}E${E}`;
  
}

const render = (renderedList) => {
  
  // SELECT EPISODE
  select.replaceChildren();
  renderedList.forEach(episode => {

    let option = document.createElement("option");
    option.value = episode.name;
    option.innerText = `${episodeCode(episode)} - ${episode.name}`;
    
    select.append(option);
  })
  
  // DISPLAY NUMBER OF MATCHES
  let numberOfAllEpisodes = getAllEpisodes().length;
  matches.innerText = "Currently showing " + renderedList.length + " episodes out of the " + numberOfAllEpisodes + " total.";
  console.log(searchBar.value);

  // ITERATE THROUGH COLLECTED DATA
  renderedList.forEach( item => {

    // CREATE ELEMENTS
    let div = document.createElement("div"),
    title = document.createElement("h1"),
    img = document.createElement("img"),
    description = document.createElement("p");

    // FILL WITH CONTENT
    title.innerText = `${item.name}\n(${episodeCode(item)})`;
    img.src = item.image.medium;
    description.innerHTML = item.summary;

    // ADD CLASSES
    div.classList.add("epDiv");
    title.classList.add("epTitle");
    img.classList.add("epImg");
    description.classList.add("epDescription");

    // APPEND
    div.append(title, img, description);
    rootElem.append(div);
  });
}

window.onload = setup;
