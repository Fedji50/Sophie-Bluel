let modal = null;

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
    modal.querySelector("#addProjects").addEventListener("click",  stopPropagation);
    modal.querySelector("#close").addEventListener("click",  closeModal);
    let deleteProjects = document.getElementById("deleteProjects");
    deleteProjects.style.display = "flex";
    let addProjects = document.getElementById("addProjects");
    addProjects.style.display = "none";
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
    modal.querySelector("#addProjects").removeEventListener("click",  stopPropagation)
    modal.querySelector("#close").removeEventListener("click",  closeModal);
    modal = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
};

const modifyBtn = document.querySelector(".js-modal");
modifyBtn.addEventListener("click", openModal);

const modalContainer = document.getElementById("works");

//Récupération des fichiers depuis l'api SWAGGER

async function generatePhotosModal () {

    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();

    // boucle qui parcoure le tableau works afin d'afficher toutes les photos
    for (let i = 0 ; i < works.length ; i++){
        //Création des différentes balises de la galerie de travaux sur la modale
        const demo = works[i];
       
        const figureElement = document.createElement("figure");
        figureElement.classList.add("photo");
        figureElement.dataset.id_work = demo.id;
        const imageElement = document.createElement("img");
        //Insertion des balises dans le DOM de la modale
        imageElement.src = demo.imageUrl;
        figureElement.appendChild(imageElement);
        modalContainer.appendChild(figureElement);
        // ajout de l'icone de suppression de projet:
        const iconElement = document.createElement("div");
        iconElement.classList.add("deletePhoto");
        iconElement.innerHTML='<i class="fa-solid fa-trash-can"></i>';
        iconElement.dataset.id_work = demo.id;
        figureElement.appendChild(iconElement);
   
        //****** Suppression d'une photo et d'un projet ******/
        iconElement.addEventListener("click", (event) => {
            event.preventDefault();
            const token = localStorage.getItem("token");
            let id = demo.id; // Important //

            // Changer la dernière partie de l'url du fetch 
            fetch (`http://localhost:5678/api/works/${id}`,{
                method : "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }}
            )
            .then(response => {
            if (response.status === 200 || response.status === 204) {
                let gallery = document.getElementById("gallery");
                let galleryDeletedFigure = gallery.querySelector(`[data-id_work="${id}"]`);
                let modalDeletedFigure = modalContainer.querySelector(`[data-id_work="${id}"]`);
                galleryDeletedFigure.remove()
                modalDeletedFigure.remove()
                };
            })
            .catch(error => console.error("Error:", error));
            }
        );
    }
};

// Récupération des constantes pour afficher la page d'ajout de projet et masquer celle suppression de projet:
const addPhotoBtn = document.getElementById("addPhoto");
const deleteProjectsModal = document.getElementById("deleteProjects");
const addProjectsModal = document.getElementById("addProjects");
const returnBtn = document.querySelector(".return");
const closeBtn = document.getElementById("close")

function emptyFields() {
    let icon = document.querySelector(".fa-image");
    let note = document.querySelector(".note");
    let addFileBtn = document.querySelector(".file-upload");
    const title = document.getElementById("title");
    const category = document.getElementById("category");
    const input = document.getElementById("image");
    let preview = document.getElementById("preview");

    title.value = "";
    category.value = "";
    input.value = "";
    preview.removeAttribute("src");
    addFileBtn.style.visibility = "visible";
    input.style.visibility = "visible";
    icon.style.visibility = "visible";
    note.style.visibility = "visible";
};

addPhotoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    deleteProjectsModal.style.display = "none";
    addProjectsModal.style.display = "flex";
    emptyFields();
});

returnBtn.addEventListener("click", (event) => {
    event.preventDefault();
    deleteProjectsModal.style.display = "flex";
    addProjectsModal.style.display = "none";
    emptyFields();
});

closeBtn.addEventListener ("click", (event) => {
    event.preventDefault();
    emptyFields();
});

// Récupération des constantes pour le formulaire :
const addProjectForm = document.getElementById("addProjectForm");

// Fonction d'ajout de projet avec FormData: 
function addNewProject (event) { 
    const token = localStorage.getItem("token");
    const title = document.getElementById("title");
    const category = document.getElementById("category");
    const input = document.getElementById("image");
    const preview = document.getElementById("preview");
    let files = input.files;

    event.preventDefault();

    // Création d'un objet formData:  
    const formData = new FormData (addProjectForm);
    
    // Condition : si les champs sont remplis correctement => déclenchement du fetch sinon message d'erreur
    if (files.length > 0 && preview.src !== "" && title.value !== "" && category.value !== "") {
        fetch ("http://localhost:5678/api/works", {
            method : "post",
            headers : {
                "accept": "application/json",
                "Authorization" : `Bearer ${token}`
                },
            body: formData
            })
            .then (response => {
                console.log("Réponse du serveur :", response);
                emptyFields();
                return response.json()
            })
            .then (result => {
                if (result && !result.error ) {
                    const figureGallery = document.createElement("figure");
                    const figureWorks = document.createElement("figure");
                    figureWorks.classList.add("photo");
                    const imageGallery = document.createElement("img");
                    const imageWorks = document.createElement("img");
                    const nomElement = document.createElement("figcaption");
                    const iconWorks = document.createElement("div");
                    iconWorks.classList.add("deletePhoto");
                    iconWorks.innerHTML='<i class="fa-solid fa-trash-can"></i>';
                    figureGallery.dataset.id_work = result.id;
                    figureWorks.dataset.id_work = result.id;
                    iconWorks.dataset.id_work = result.id;
                    imageGallery.src = result.imageUrl;
                    imageWorks.src = result.imageUrl;
                    nomElement.innerHTML = result.title;
                    // Insertion des balises dans le DOM
                    // Insertion dans "gallery":
                    const mainContainer = document.getElementById("gallery");
                    figureGallery.appendChild(imageGallery);
                    figureGallery.appendChild(nomElement);
                    mainContainer.appendChild(figureGallery);
                    //  insertion dans "Works":
                    const modalContainer = document.getElementById("works");
                    modalContainer.appendChild(figureWorks);
                    figureWorks.appendChild(imageWorks);
                    figureWorks.appendChild(iconWorks);

                    // Partie pour la suppression du nouveau projet créé:
                    iconWorks.addEventListener("click", (event) => {
                        event.preventDefault();
                        const token = localStorage.getItem("token");
                        let id = result.id; // Important //
                       
                        // Appel à fetch avec méthode Delete:
                        fetch (`http://localhost:5678/api/works/${id}`,{
                            method : "DELETE",
                            headers: {
                                "Authorization": `Bearer ${token}`
                            }}
                        )
                        .then(response => {
                        if (response.status === 200 || response.status === 204) {
                            let gallery = document.getElementById("gallery");
                            let galleryDeletedFigure = gallery.querySelector(`[data-id_work="${id}"]`);
                            let modalDeletedFigure = modalContainer.querySelector(`[data-id_work="${id}"]`);
                            galleryDeletedFigure.remove();
                            modalDeletedFigure.remove();
                            }
                        })
                        .catch(error => console.error("Error:", error));
                        })
                };   
            })
            .catch (error => 
                console.error("Erreur de la requête fetch :",error));
    } else {
        alert("L'un des champs du formulaire n'est pas rempli correctement."); 
    };    
};

// Écouteur d'évènement à la soummision du formulaire:
addProjectForm.addEventListener("submit", addNewProject);
              
generatePhotosModal();



