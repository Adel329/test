const email = document.querySelector("form #email");
const password = document.getElementById("mdp");
const form = document.querySelector("form");
const sectionLogin = document.getElementById("incorrect")
const donnees = { login: "Sophie Bluel" };


async function postJSON(donnees) {
  try {
    const reponse = await fetch("http://localhost:5678/api/users/login", {
         method: "POST", // ou 'PUT'
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(donnees),
       });
       const resultat = await reponse.json();
       if (resultat.userId) {
         console.log("Réussite :", resultat);
        return true;
        }
     } catch (erreur) {
       console.error("Erreur :", erreur);
     }
}




async function login() {
  try {
    const reponse = await postJSON({
      "email": email.value,
      "password": password.value,
      });
      if (reponse === true) {
        console.log("Connexion réussie !");
        window.location.href = 'index.html';
      } else {
        console.log("Identification incorrect !")
        email.classList.add("error")
        password.classList.add("error")
        const errorElement = document.createElement("p")
        errorElement.textContent = "Votre email ou votre mot de passe est incorrect"
        errorElement.classList.add("error-element")
        sectionLogin.appendChild(errorElement)
        errorElement.innerHTML
      }
  }catch (erreur) {
    console.error("Erreur:", erreur);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  login();
  
})


