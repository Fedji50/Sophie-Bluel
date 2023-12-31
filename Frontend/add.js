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
}

const closeModal = function (e) {
    // console.log("modal:%o",modal)
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
        // console.log(demo);

        const figureElement = document.createElement("figure");
        figureElement.classList.add("photo");
        figureElement.dataset.id_work = demo.id;
        const imageElement = document.createElement("img");
        // const modalContainer = document.getElementById("works");

        //Insertion des balises dans le DOM de la modale
        imageElement.src = demo.imageUrl;
        figureElement.appendChild(imageElement);
        modalContainer.appendChild(figureElement);
        // console.log(figureElement);

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
                let iconElement = demo;
                let id = demo.id; /* utile */
                console.log("token:",token);
                console.log(iconElement);
                
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
                    console.log("La suppression a réussi")
                    } else {
                    console.log("Erreur lors de la suppression de l'élément")
                    }})
                .catch(error => console.error("Error:", error));
                }
            );
        
    }
}

// Récupération des constantes pour afficher la page d'ajout de projet et masquer celle suppression de projet:
const addPhotoBtn = document.getElementById("addPhoto");
const deleteProjectsModal = document.getElementById("deleteProjects");
const addProjectsModal = document.getElementById("addProjects");
const returnBtn = document.querySelector(".return");
const title = document.getElementById("title");
const category = document.getElementById("cat-select");


addPhotoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    deleteProjectsModal.style.display = "none"
    addProjectsModal.style.display = "flex"
    title.value = "";
    category.value = ""; 
    // validationBtn.style.backgroundColor = "#a7a7a7";
});

returnBtn.addEventListener("click", (event) => {
    event.preventDefault();
    deleteProjectsModal.style.display = "flex";
    addProjectsModal.style.display = "none";
    title.value = "";
    category.value = "";
    // validationBtn.style.backgroundColor = "#a7a7a7";
})


// Récupération des constantes pour le formulaire :
const input = document.getElementById("file");
const file = input.files;
const addProjectForm = document.getElementById("addProjectForm");
const validationBtn = document.getElementById("validation");

// Ajout d'un écouteur d'évènement sur chaque chammp du formulaire:
// input.addEventListener("input", updateValidationBtnColor);
// title.addEventListener("input", updateValidationBtnColor);
// category.addEventListener("input", updateValidationBtnColor);

// Fonction pour mettre à jour la couleur du bouton :
// function updateValidationBtnColor () {
//     if (file.length > 0 && title.value !== "" && category.value !== "") {
//         validationBtn.removeAttribute("disabled");
//         validationBtn.style.backgroundColor = "#1D6154";
//     } else {
//         validationBtn.setAttribute("disabled", true);
//         validationBtn.style.backgroundColor = "#a7a7a7";
//     }
// }

// Fontion pour afficher un message d'erreur si l'un des champs n'est pas correctement rempli
// à la soumission du formulaire : 
function errorMessageForm () {
    if (file.length = 0 || title.value === "" || category.value === "") {
        alert("L'un des champs du formulaire n'est pas rempli correctement.");
        validationBtn.setAttribute("disabled");
    }
};

// Fonction d'ajout de projet avec FormData: 
function addNewProject (event) {
    
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    
    event.preventDefault();
    console.log("Formulaire soumis");

    // Création d'un objet formData:
    
    const formData = new FormData (addProjectForm);
    const photoProject = formData.get("file");
    const titleProject = formData.get("title");
    const categoryProject = formData.get("cat-select");
    console.log("Projet :", {photoProject, titleProject, categoryProject});


};
// Écouteur d'évènement à la soummision du formulaire:
addProjectForm.addEventListener("submit", errorMessageForm, addNewProject);

generatePhotosModal();
