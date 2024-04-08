const form = document.querySelector("#github-form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = e.target.search.value;
  searchResults(username);
  form.reset();
});

function searchResults(username) {
  fetch("https://api.github.com/search/users?q=octocat")
    .then((res) => res.json())
    .then((data) => {
      const user = data.items.find((item) => item.login === username);
      if (user) {
        displaySearchResults(user);
      } else {
        console.log("User not found");
      }
    })
    .catch((error) => console.log("error", error));
};
console.log(searchResults);

//   This will show the results of the search - when we search our data will be represented here
function displaySearchResults(item) {
  let userList = document.querySelector("#user-list");
  let a = document.createElement("a");
  let results = document.createElement("li");
  a.innerHTML = `
  <h3> Login: ${item.login.toUpperCase()}</h3>
   <h3> ID: ${item.id} </h3>
   <a href=${item.url}>${item.login}</a>
   <a id="repos"href=${item.repos_url}>Repo</a>
   <img width="200px"src=${item.avatar_url} alt=${item.login}/>
   `;
  results.appendChild(a);
  userList.appendChild(results);

  let repository = a.querySelector("#repos");
  repository.addEventListener("click", fetchUserRepositories());
}

function fetchUserRepositories(username) {
  fetch("https://api.github.com/users/octocat/repos")
    .then((res) => res.json())
    .then((data) => data.forEach((item) => displayUserRepository(item)))
    .catch((error) => console.log("error", error));
}
function displayUserRepository(item) {
  let repo = document.querySelector("#repos-list");
  let repoList = document.createElement("li");
  repoList.innerHTML = `
  <h3>${item.name}</h3>
  <h3>${item.owner.login}</h3>
  <a href="${item.repos_url}">Repo:</a>`;
  repo.appendChild(repoList);
}