const divFilter = document.querySelector(".filter");
const divGallery = document.querySelector(".gallery");
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
function getCategories(){
    fetch("http://localhost:5678/api/categories", {method:"GET", headers:{"Content-Type": "application/json"}})
    .then(response => response.json())
    .then(json => {
        listCategory = json;
        generateFilter();
        console.log(listCategory);
    })
    .catch()
}


// Genere les gallery via le DOM
function generateGallery(worksGallery){
    const divGallery = document.querySelector(".gallery");
    for (let i = 0; i < worksGallery.length; i++){
        const figure = document.createElement("figure");
        const imageElement = document.createElement("img");
        imageElement.src = worksGallery[i].imageUrl;
        imageElement.alt = worksGallery[i].title;
        const figCaption = document.createElement("figcaption");
        figCaption.innerText = worksGallery[i].title;
        divGallery.appendChild(figure);
        figure.appendChild(imageElement);
        figure.appendChild(figCaption);
    }
}


// Genere les filtre(button)
function generateFilter(){
    const divFilter = document.querySelector(".filter");
    listCategory.unshift({id:0, name:'Tous'});
    listCategory.forEach(category => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id
        btn.classList.add("filter-button")
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
        generateGallery(listWorks)
    }else {
        generateGallery(worksFiltered)
    }   
}

function isUserConnected(){
    if  (window.sessionStorage.getItem("token") !== null) {
        
    }
}


getWorks()
getCategories()
