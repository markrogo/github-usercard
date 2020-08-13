import axios from 'axios';


/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

let resObject = {};

function getGit (name) {
    axios
      .get(`https://api.github.com/users/${name}`)
      .then((res) => {
        // if the call is successful, it runs this callback
        console.log('Here is the res: ', res);
        resObject = res.data;
        console.log (`resData --> ${res.data}`)
        console.log (`resObject --> ${resObject.name}`);

        let cards = document.querySelector ('.cards');
        let newCard = createCard (res.data);
        cards.appendChild (newCard);
        
        // res.data.message.forEach((url) => {
        // entrypoint.append(DogCard(url));
        // });
      })
      .catch((err) => {
        // if the call is unsuccessful, it runs this callback
        console.log('Here is the err: ', err);
      });

};

getGit ('markrogo');



let followersArray = [];

function getFollowers (name) {
    axios
    .get(`https://api.github.com/users/${name}/followers`)
    .then((res) => {
      // if the call is successful, it runs this callback
      console.log('Here is the res: ', res);
      followersArray = res.data;
      
      followersArray.forEach ((item) => { 
        console.log (item.login);
        let name = item.login;
        getGit (name);
      });
      
      
      // res.data.message.forEach((url) => {
      // entrypoint.append(DogCard(url));
      // });
    })
    .catch((err) => {
      // if the call is unsuccessful, it runs this callback
      console.log('Here is the err: ', err);
    });

  };

  getFollowers ('markrogo');
// 
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

// const followersArray = [];

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function createCard (githubObj) {
  // creates first three parts
  let cardDiv = document.createElement ('div');
  let cardImg = document.createElement ('img');
  let infoDiv = document.createElement ('div');

  // appends image and card info to main div
  cardDiv.appendChild(cardImg);
  cardDiv.appendChild(infoDiv);

  // create all remaining elements
  let infoHead = document.createElement ('h3');
  let infoName = document.createElement ('p');
  let infoLoc = document.createElement ('p');
  let infoProf = document.createElement ('p');
  let profLink = document.createElement ('a');

  let infoFollowers = document.createElement ('p');
  let infoFollowing = document.createElement ('p');

  let infoBio = document.createElement ('p');

  // append everything
  infoDiv.appendChild (infoHead);
  infoDiv.appendChild (infoName);
  infoDiv.appendChild (infoLoc);
  // add anchor to prof before adding prof to div ??
  infoProf.appendChild (profLink);
  infoDiv.appendChild (infoProf);

  infoDiv.appendChild (infoFollowers);
  infoDiv.appendChild (infoFollowing);

  // add styles 
  cardDiv.classList.add ('card');
  infoDiv.classList.add ('card-info');
  infoHead.classList.add ('name');
  infoName.classList.add ('username');

  // add attributes and text content
  cardImg.src = githubObj.avatar_url;
  infoHead.textContent = githubObj.login;
  infoName.textContent = githubObj.name;
  infoLoc.textContent = githubObj.location;
  profLink.textContent = githubObj.html_url;
  
  profLink.href = githubObj.html_url;
  infoFollowers.textContent = `Followers: ${githubObj.followers}`;
  infoFollowing.textContent = `Following: ${githubObj.following}`;
  infoBio.textContent = githubObj.bio;

  return cardDiv;
  
}



/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
