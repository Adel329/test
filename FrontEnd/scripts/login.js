const email = document.querySelector("form #email");
const password = document.getElementById("mdp");
const form = document.querySelector("form");
const sectionLogin = document.getElementById("incorrect");
const errorElement = document.querySelector(".error-loged");


async function postJSON(datas) {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
         method: "POST", // ou 'PUT'
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(datas),
       });
       const resultat = await response.json();
       if (resultat.userId) {
         console.log("Réussite :", resultat);
         return resultat;
        } 
     } catch (error) {
       console.error("Erreur :", error);
     }
}

async function login() {
  try {
    
    const response = await postJSON({
      "email": email.value,
      "password": password.value
      });
      if (response.token) {
        console.log("Connexion réussie !");
        window.sessionStorage.setItem("token", response.token)
        window.location.href = 'index.html';
      } 
    }catch (error) {
      console.log("Identification incorrect !")
      console.error("Erreur:", error);
      errorElement.style.display = "flex"

  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (email.value.length > 0 && password.value.length > 0) {
    console.log(email.value);
    login();  
  }
  
})

