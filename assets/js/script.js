document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Initialisation des animations AOS (Scroll Animations)
    AOS.init({
        duration: 800,
        once: true,
    });

    // 2. Effet Fade-in manuel pour la section Hero
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200);
    });

    // 3. Gestion de la copie d'email au clic
    document.querySelectorAll('.contact-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if(link.href.startsWith('mailto:') || link.textContent.includes('@')) {
                // On laisse le mailto s'ouvrir, mais on copie aussi l'adresse
                // e.preventDefault(); // Décommenter si tu veux bloquer l'ouverture de l'app mail
                navigator.clipboard.writeText('grazexdev@gmail.com');
                
                const originalText = link.textContent;
                link.textContent = 'Email copié ! 📋';
                link.style.color = '#00b894'; // Vert succès
                
                setTimeout(() => {
                    link.textContent = originalText;
                    link.style.color = '';
                }, 2000);
            }
        });
    });

    // 4. Chargement API GitHub
    const reposContainer = document.getElementById('github-repos');
    
    if(reposContainer) {
        // Appel à l'API GitHub pour tes repos publics
        fetch(`https://api.github.com/users/Grazex24/repos?sort=updated`)
        .then(response => {
            if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
            return response.json();
        })
        .then(repos => {
            if (repos.length === 0) {
                reposContainer.innerHTML = `<p>Aucun repository public trouvé.</p>`;
                return;
            }

            // On prend les 4 derniers repos mis à jour pour ne pas surcharger
            const recentRepos = repos.slice(0, 4);

            reposContainer.innerHTML = recentRepos.map(repo => `
                <div class="repo-card" data-aos="fade-up">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || "Projet personnel sans description."}</p>
                    <p style="font-size: 0.9em; color: #888; margin-top:10px;">
                        ⭐ ${repo.stargazers_count} | 🟢 ${repo.language || 'Autre'}
                    </p>
                    <a href="${repo.html_url}" target="_blank" style="display:inline-block; margin-top:10px;">Voir le code <i class="fas fa-external-link-alt"></i></a>
                </div>
            `).join('');
        })
        .catch(error => {
            reposContainer.innerHTML = `<p style="color: #e94560;">Impossible de charger les projets GitHub (API Limit).</p>`;
            console.error("Erreur GitHub:", error);
        });
    }
});