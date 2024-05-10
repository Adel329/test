const email = document.querySelector("form #email");
const password = document.querySelector("form #password");
const form = document.querySelector("form");
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
       console.log("Réussite :", resultat);
     } catch (erreur) {
       console.error("Erreur :", erreur);
     }
    }

postJSON({
  "email": "sophie.bluel@test.tld",
  "password": "S0phie"
})


async function login() {
  const log = await postJSON(donnees);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userEmail = email.value;
    const userPassword = password.value;
    console.log(userEmail, userPassword)
    log.forEach(user => {
      user.email == userEmail && user.password == userPassword == true
    });
  })
}
login()