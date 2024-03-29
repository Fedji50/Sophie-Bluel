//Récupération des fichiers depuis l'api SWAGGER
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

//Création des différents projets
function generateProjects (works) {
    for (let i = 0 ; i < works.length ; i++){
        // Création de la variable demo pour traiter tous les éléments de la boucle: 
        const demo = works[i];
        
        //Création des différentes balises de la galerie de travaux:
        const figureElement = document.createElement("figure");
        figureElement.dataset.id_work = demo.id;
        const imageElement = document.createElement("img");
        imageElement.src = demo.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.innerHTML = demo.title;
        const mainContainer = document.getElementById("gallery");
        //Insertion des balises dans le fichier index.html et dans le DOM:
        figureElement.appendChild(imageElement);
        figureElement.appendChild(nomElement);
        mainContainer.appendChild(figureElement);
    }
};

//Création des listes objets, appartements et Hotels & restaurants
//Liste complète:
const allFilterBtn = document.getElementById("all");

allFilterBtn.addEventListener("click", function () {
    document.querySelector(".gallery").innerHTML= "";
    generateProjects(works);
})
//Liste objets:
const objectsFilterBtn = document.getElementById("objects");

objectsFilterBtn.addEventListener("click", function () {
    const objectsList = works.filter((work) => work.categoryId === 1);
    document.querySelector(".gallery").innerHTML= ""; // Sert à vider le contenu de la galerie pour y afficher le contenu trié:
    generateProjects(objectsList);    
});
//Liste Appartements:
const appartmentsFilterBtn = document.getElementById("appartments");

appartmentsFilterBtn.addEventListener("click", function () {
    const appartmentsList = works.filter((work) => work.categoryId === 2);
    document.querySelector(".gallery").innerHTML= "";
    generateProjects(appartmentsList);
});
//Liste Hôtels & Restaurants:
const hotelsRestoFilterBtn = document.getElementById("hotels-restaurants");

hotelsRestoFilterBtn.addEventListener("click", function () {
    const hotelsRestoList = works.filter((work) => work.categoryId === 3);
    document.querySelector(".gallery").innerHTML= "";
    generateProjects(hotelsRestoList);
});

let userId = window.localStorage.getItem("userId");
userId = userId || "";
let token = window.localStorage.getItem("token");
token = token || "";

//fonction pour afficher les éléments du mode édition quand l'utilisateur est loggé:
function editionMode (userId, token) {
    //Récupération des différents éléments du DOM:
    const editionMode = document.querySelector(".editionMode");
    const loginHref = document.querySelector("#loginHref");
    const logoutHref = document.querySelector("#logoutHref");
    const modifyBtn = document.querySelector(".js-modal");
    const filters = document.querySelector(".filters");
    const projects = document.querySelector(".projects");
    const projectsH2 = projects.querySelector("h2"); 
    //Mise place d'une condition en fonction de la présence de l'Id et du token
    if (userId === "" && token === "") {
        editionMode.style.display = "none";
        modifyBtn.style.display = "none";
        logoutHref.style.display = "none";
        projectsH2.style.marginRight = "2.5em";
    } else {
        filters.style.display = "none";
        loginHref.style.display = "none";
        projects.style.marginBottom = "4em";    
    }
};

function removeLocalStorage() {
    const logoutHref = document.querySelector("#logoutHref");
    // Au clic sur le lien logout, on supprime le userId et le token du localStorage et des cookies
    logoutHref.addEventListener("click", function () {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        document.location.href="login.html";

    });
};

function loginDetection () {
    if (userId === userId && token === token) {
        editionMode(userId,token);
    }
};

generateProjects(works);
loginDetection();
removeLocalStorage();

