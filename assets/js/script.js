document.addEventListener("DOMContentLoaded", function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        setTimeout(() => {
            element.classList.add('visible');
        }, 100); // Délai pour un effet progressif
    });
});
document.addEventListener("DOMContentLoaded", function() {
const reposContainer = document.getElementById('github-repos');

// Gestion des erreurs
function showError(message) {
reposContainer.innerHTML = `<p class="error">${message}</p>`;
}

// Appel API avec authentification (optionnel)
fetch(`https://api.github.com/users/Grazex24/repos`, {
headers: {
    // Enlève le commentaire ci-dessous si tu veux utiliser un token
    // 'Authorization': 'token TON_TOKEN_GITHUB'
}
})
.then(response => {
if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
return response.json();
})
.then(repos => {
if (repos.length === 0) {
    showError("Aucun repository public trouvé.");
    return;
}

reposContainer.innerHTML = repos.map(repo => `
    <div class="repo-card">
        <h3>${repo.name}</h3>
        <p>${repo.description || "Pas de description"}</p>
        <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
        <a href="${repo.html_url}" target="_blank">Voir le code</a>
    </div>
`).join('');
})
.catch(error => {
showError(`Impossible de charger les repositories : ${error.message}`);
console.error("Erreur GitHub API:", error);
});
});AOS.init();
// Copie automatique de l'email au clic
document.querySelectorAll('.contact-link').forEach(link => {
link.addEventListener('click', (e) => {
if(link.href.startsWith('mailto:')) {
    navigator.clipboard.writeText('grazexdev@gmail.com');
    link.textContent = 'Email copié ! 📋';
    setTimeout(() => link.textContent = 'grazexdev@gmail.com', 2000);
}
});
});
