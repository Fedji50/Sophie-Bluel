let modal = null;

/*const openModal = function (e) {
    e.preventDefault();
    console.log("e.target % o", e);

    let target = null;
    // debugger;
    if (e.target.nodeName === "A") {
        e.target.getAttribute("href");
    } if (e.target.parentElement.id === "modifyBtn") {
        e.target.querySelector(".fa-regular fa-pen-to-square");
    }
    target.style.display= null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".fa-xmark").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}*/

const openModal = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"))
    target.style.display= null;
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".fa-xmark").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault();
    modal.style.display= "none";
    modal.setAttribute("aria-hidden","true");
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".fa-xmark").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
};

// const modifyBtn = document.getElementById("modifyBtn");
const modifyBtn = document.querySelector(".js-modal");
modifyBtn.addEventListener("click", openModal);


//Récupération des fichiers depuis l'api SWAGGER
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();
console.log(works);

function generatePhotosModal (works) {
    // boucle qui parcoure le tableau works afin d'afficher toutes les photos
    for (let i = 0 ; i < works.length ; i++){
        //Création des différentes balises de la galerie de travaux sur la modale
        const demo = works[i];
        console.log(demo);

        const figureElement = document.createElement("figure");
        figureElement.classList.add("photo");
        figureElement.dataset.id_work = demo.id;
        const imageElement = document.createElement("img");
        const modalContainer = document.getElementById("works");
        //Insertion des balises dans le DOM de la modale
        imageElement.src = demo.imageUrl;
        figureElement.appendChild(imageElement);
        console.log(figureElement);
        modalContainer.appendChild(figureElement);
        imageElement.style.width = "76.86px";
        imageElement.style.height = "102.57px";
        
        // ajout de l'icone de suppression de projet:
        const iconElement = document.createElement("div");
        iconElement.classList.add("deletePhoto");
        iconElement.innerHTML='<i class="fa-solid fa-trash-can"></i>';
        figureElement.appendChild(iconElement);
        iconElement.dataset.id_work = demo.id;

        //****** Suppression d'une photo et d'un projet ******/
        let workId = demo.object;
        const token = localStorage.getItem("token");
            iconElement.addEventListener("click", function () {
                console.log(works[0]);
                console.log(iconElement);
                
                /*fetch (`http://localhost:5678/api/works/{workId}`,{
                    method : "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }}
                )
                .then(response => {
                if (response.status === 200) {
                    generatePhotosModal(works)
                    console.log("La suppression a réussi")
                    } else {
                    console.log("Erreur lors de la suppression de l'élément")
                    }})
                .catch(error => console.error("Error:", error));*/
                }
            );

    }
}

function deleteWorks () {
    // const deletePhotoBtns = document.querySelectorAll(".deletePhoto");

    for (let i = 0 ; i < works.length ; i++){
        const demo = works[i];
        // console.log(demo);
            const iconElement = document.querySelector(".deletePhoto");
            // const figureElement = iconElement.closest(".photo");
            figureElement.dataset.id_work = demo.id;
            iconElement.dataset.id_work = demo.id;
            const workId = iconElement.dataset.id;
            // let workId = demo.id;
            const token = localStorage.getItem("token");
            iconElement.addEventListener("click", function () {
                console.log(iconElement);
                console.log(workId);
                /*fetch (`http://localhost:5678/api/works/{workId}`,{
                    method : "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }}
                )
                .then(response => {
                if (response.status === 200) {
                    generatePhotosModal(works)
                    console.log("La suppression a réussi")
                    } else {
                    console.log("Erreur lors de la suppression de l'élément")
                    }})
                .catch(error => console.error("Error:", error));*/
                }
            );
        
       
    }    
};

generatePhotosModal(works);
// deleteWorks();