// Log
const login = document.getElementById("login");

// Modal
const modal = document.querySelector(".modal-container");
const editedContainer = document.querySelector(".loged-container");
const galleryContainer = document.querySelector(".gallery-container");
const editGallery = document.querySelector(".edit-gallery");
const divFilter = document.querySelector(".filter");
const divGallery = document.querySelector(".gallery");
const edit = document.querySelector(".edit");
const postGallery = document.getElementById("add-project");
const modalAddFile = document.getElementById("modal-add-container");

// Icon
const cross = document.querySelector(".fa-xmark");
const cross2 = document.getElementById("cross2");
const arrowLeft = document.querySelector(".fa-arrow-left");

const form = document.querySelector(".modal-container form");
const titleModal = document.querySelector(".modal-container #title");
const categoryModal= document.querySelector(".modal-container #category");

// Bouton
const btnValidation = document.getElementById("button");

// Image Modal
const img = document.querySelector(".add-container img");
const label = document.querySelector(".add-container label")
const input = document.querySelector(".add-container input") 
const p = document.querySelector(".add-container p")
const logoImg = document.getElementById("logo-image")

let listWorks = [];



// Récuperer les travaux via les API
function getWorks(){
    fetch("http://localhost:5678/api/works", {method:"GET", headers:{"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(json => {
        listWorks = json;
       generateGallery(listWorks);
    })
    .catch();
}


// Récuperer les catégories via les API
async function getCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories", { method: "GET", headers: { "Content-Type": "application/json" } });
        listCategory = await response.json();
        generateFilter();
        return listCategory;
    } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        return [];
    }
}


// Genere les gallery via le DOM
function generateGallery(worksGallery){
    const divGallery = document.querySelector(".gallery");
    for (let i = 0; i < worksGallery.length; i++){
        const figure = document.createElement("figure");
        const imageElement = document.createElement("img");
        const figCaption = document.createElement("figcaption");

        imageElement.src = worksGallery[i].imageUrl;
        imageElement.alt = worksGallery[i].title;
        figCaption.innerText = worksGallery[i].title;

        divGallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(figCaption);
    }
}


// Genere les filtre
function generateFilter(){
    const divFilter = document.querySelector(".filter");
    listCategory.unshift({id:0, name:'Tous'});
    listCategory.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id;
        btn.classList.add("filter-button");
        divFilter.appendChild(btn);
        btn.addEventListener("click", () => filterWorks(category.id));
    })
}


// filtre la gallery
function filterWorks(id){
    
    const worksFiltered = listWorks.filter((work) => work.categoryId === id);
    console.log(worksFiltered);

    divGallery.innerHTML = "";
    if (worksFiltered.length === 0  ){
        generateGallery(listWorks);
    }else {
        generateGallery(worksFiltered);
    }   
}

// Affichage différent si l'user est connecté
function isUserConnected(){
    if  (window.sessionStorage.getItem("token") !== null) {
        console.log("Connexion Réussie !");
        login.textContent = "logout";
        editedContainer.style.display = "flex";
        divFilter.style.display = "none";
        edit.style.display = "flex" ;
        login.addEventListener("click", () => {
            window.sessionStorage.removeItem("token");
            window.location.reload();
        })
        postGallery.addEventListener("click", () => {
            modal.style.display = "flex";
            displayGallery();
        })
        cross.addEventListener("click", () =>  {
            modal.style.display = "none";

        })
        cross2.addEventListener("click", () => {
            modal.style.display = "none"
        })
        modal.addEventListener("click", (e) => {
            if (e.target.className === "modal-container"){
                modal.style.display = "none";
            }
        })
    }
}

// Affichage la gallery dans la modal
function displayGallery(){
    const gallery = document.querySelector(".gallery-container")
    gallery.innerHTML = "";
    listWorks.forEach(work => {

        const figure = document.createElement("figure");
        const imageElement = document.createElement("img");
        const trashContainer = document.createElement("div");
        const trash = document.createElement("i");
        
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        trashContainer.classList.add("trash-container");
        trash.classList.add("fa-solid", "fa-trash-can");
        trash.id = `trash-${work.id}`;
        
        gallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(trashContainer);
        trashContainer.appendChild(trash)
        
        trash.addEventListener("click", function() {
            deleteWorks(work.id)
            
        })
    })        
}

// Delete
function deleteWorks(workId){
    const gallery = document.querySelector(".gallery-container")
    fetch(`http://localhost:5678/api/works/${workId}`, 
        {method:"DELETE", 
        headers:{"Content-Type": "application/json",
         "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
        }
    })
    .then(response => {
        if (response.ok){
            listWorks = listWorks.filter(work => work.id !== workId);
            displayGallery()
        } else {
            console.error("Erreur de suppresion", error)
        }
    })
    .catch(error => console.error("Erreur lors de la suppression du travail:", error));
    
    
};

// ouverture et fermeture modal
function modalAddProject() {
    btnValidation.addEventListener("click", () => {
        modalAddFile.style.display = "flex"
        editGallery.style.display = "none"
    });
    arrowLeft.addEventListener("click", () => {
        modalAddFile.style.display = "none"
        editGallery.style.display = "flex"
    });
    cross.addEventListener("click", () => {
        editGallery.style.display = "flex"
    });
};

// insérer une image
input.addEventListener("change", () => {
    const file = input.files[0];
    console.log(file);
    if (file) {
        const reader = new FileReader ()
        reader.onload = function (e){
            img.src = e.target.result;
            img.style.display = "flex";
            input.style.display = "none";
            label.style.display = "none";
            logoImg.style.display = "none";
            p.style.display = "none";
        }
        reader.readAsDataURL(file);
    }
})

// Categories
async function modalCategory(){
        const categorys = await getCategories()
        const select = document.querySelector(".modal-container select")
        categorys.forEach(category => {
            const option = document.createElement("option")
            option.value = category.id
            option.textContent = category.name
            select.appendChild(option)
    })
}


// Post 
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form)
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${window.sessionStorage.getItem("token")}`
            }
        });
        const data = await response.json();
        console.log("Photo ajouté !", data);
        getWorks();
        modalCategory();
    } catch (error) {
        console.log("Erreur lors de l'ajout de la photo", error);
    }
});

// Remplissage des inputs
function inputsCompleted() {
    const btnEdit = document.querySelector(".add-info-container button")
    form.addEventListener("input", () => {
        if (!title.value =="" && !categoryModal =="" && !input.value =="") {
            btnEdit.classList.remove("validation")
            btnEdit.disabled = false
        }
        else{
            btnEdit.disabled = true
        }
    })
}


getWorks()
isUserConnected()
modalAddProject()
modalCategory()
inputsCompleted()
