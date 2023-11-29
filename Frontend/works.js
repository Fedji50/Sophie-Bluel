//Récupération des fichiers depuis l'api SWAGGER
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
/*console.log(works);*/


//Création des différents projets
function generateProjects (works) {
    for (let i = 0 ; i < works.length ; i++){
        //Création des différentes balises de la galerie de travaux
        const demo = works[i];
        /*console.log(demo)*/

        const figureElement = document.createElement("figure");
        figureElement.dataset.id_work = demo.id;
        const imageElement = document.createElement("img");
        const nomElement = document.createElement("figcaption");
        const mainContainer = document.getElementById("gallery");
        //Insertion des balises dans le fichier index.html et dans le DOM
        imageElement.src = demo.imageUrl;
        figureElement.appendChild(imageElement);
        nomElement.innerHTML = demo.title;
        figureElement.appendChild(nomElement);
        /*console.log(figureElement);*/
        mainContainer.appendChild(figureElement);
    }
}
generateProjects(works);

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
    console.log(objectsList);
    document.querySelector(".gallery").innerHTML= "";
    generateProjects(objectsList);    
});
//Liste Appartements:
const appartmentsFilterBtn = document.getElementById("appartments");

appartmentsFilterBtn.addEventListener("click", function () {
    const appartmentsList = works.filter((work) => work.categoryId === 2);
    console.log(appartmentsList);
    document.querySelector(".gallery").innerHTML= "";
    generateProjects(appartmentsList);
});
//Liste Hôtels & Restaurants:
const hotelsRestoFilterBtn = document.getElementById("hotels-restaurants");

hotelsRestoFilterBtn.addEventListener("click", function () {
    const hotelsRestoList = works.filter((work) => work.categoryId === 3);
    console.log(hotelsRestoList);
    document.querySelector(".gallery").innerHTML= "";
    generateProjects(hotelsRestoList);
});

