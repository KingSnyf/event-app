import { eventManager } from "./services/EventManager.js";
import { Event } from "./models/Event.js";
function ajouterEventsDemo() {
    if (eventManager.obtenirTousLesEvents().length > 0) {
        console.log("✅ Événements existants chargés depuis localStorage");
        return;
    }
    console.log("📝 Ajout des événements de démonstration...");
    const demoEvents = [
        new Event("Conférence Tech 2025", "Découvrez les dernières innovations technologiques", new Date("2025-02-15"), "Auditorium Principal", "conférence", 100),
        new Event("Tournoi de Football", "Championnat inter-universitaire de football", new Date("2025-03-20"), "Stade Municipal", "sport", 50),
        new Event("Atelier Programmation Web", "Apprenez TypeScript, HTML et CSS", new Date("2025-02-10"), "Salle Informatique", "atelier", 30),
        new Event("Concert de Fin d'Année", "Soirée musicale avec artistes locaux", new Date("2025-12-20"), "Centre Culturel", "autre", 200)
    ];
    demoEvents.forEach(e => eventManager.ajouterEvent(e));
}
function afficherEvents(events) {
    const container = document.getElementById("events-list");
    if (!container)
        return;
    const eventsAfficher = events || eventManager.obtenirTousLesEvents();
    container.innerHTML = "";
    if (eventsAfficher.length === 0) {
        container.innerHTML = '<p class="no-events">Aucun événement trouvé</p>';
        return;
    }
    eventsAfficher.forEach(event => {
        const div = document.createElement("div");
        div.className = "event-card";
        const statusClass = event.estPasse() ? "passe" : event.estComplet() ? "complet" : "disponible";
        const statusText = event.estPasse()
            ? "Passé"
            : event.estComplet()
                ? "Complet"
                : `${event.placesRestantes()} places`;
        div.innerHTML = `
      <div class="event-header">
        <span class="event-category ${event.categorie}">${event.categorie}</span>
        <span class="event-status ${statusClass}">${statusText}</span>
      </div>
      <h3>${event.titre}</h3>
      <p class="event-description">${event.description}</p>
      <p><strong>📅</strong> ${event.getDateFormatee()}</p>
      <p><strong>📍</strong> ${event.lieu}</p>
      <p><strong>👥</strong> ${event.inscritsCount}/${event.capaciteMax} inscrits</p>
      <div class="event-actions">
        <button class="btn-secondary" onclick="window.afficherDetailEvent(${event.id})">Détails</button>
        <button class="btn-primary" onclick="window.location.href='src/pages/inscription.html?eventId=${event.id}'">S'inscrire</button>
      </div>
    `;
        container.appendChild(div);
    });
}
function afficherDetailEvent(eventId) {
    const event = eventManager.obtenirEventParId(eventId);
    if (!event)
        return;
    const modal = document.getElementById("event-detail-modal");
    const content = document.getElementById("modal-event-content");
    if (!modal || !content)
        return;
    const statusClass = event.estPasse() ? "passe" : event.estComplet() ? "complet" : "disponible";
    const statusText = event.estPasse()
        ? "Événement passé"
        : event.estComplet()
            ? "Événement complet"
            : "Places disponibles";
    content.innerHTML = `
    <div class="event-detail">
      <div class="detail-header">
        <span class="event-category ${event.categorie}">${event.categorie}</span>
        <span class="event-status ${statusClass}">${statusText}</span>
      </div>
      <h2>${event.titre}</h2>
      <p class="detail-description">${event.description}</p>
      <div class="detail-info">
        <p><strong>📅 Date:</strong> ${event.getDateFormatee()}</p>
        <p><strong>📍 Lieu:</strong> ${event.lieu}</p>
        <p><strong>👥 Inscrits:</strong> ${event.inscritsCount}/${event.capaciteMax}</p>
        <p><strong>🎫 Places restantes:</strong> ${event.placesRestantes()}</p>
      </div>
      <div class="detail-actions">
        <button class="btn-primary" onclick="window.location.href='src/pages/inscription.html?eventId=${event.id}'">
          S'inscrire à cet événement
        </button>
      </div>
    </div>
  `;
    modal.style.display = "block";
}
function fermerModal() {
    const modal = document.getElementById("event-detail-modal");
    if (modal)
        modal.style.display = "none";
}
function gererCreationEvent(e) {
    e.preventDefault();
    const titre = document.getElementById("event-titre").value.trim();
    const desc = document.getElementById("event-description").value.trim();
    const dateStr = document.getElementById("event-date").value;
    const lieu = document.getElementById("event-lieu").value.trim();
    const cat = document.getElementById("event-categorie").value;
    const cap = parseInt(document.getElementById("event-capacite").value);
    if (!titre || !desc || !dateStr || !lieu || !cap || cap < 1) {
        alert("❌ Veuillez remplir tous les champs correctement");
        return;
    }
    const nouvelEvent = new Event(titre, desc, new Date(dateStr), lieu, cat, cap);
    eventManager.ajouterEvent(nouvelEvent);
    e.target.reset();
    alert("✅ Événement créé avec succès !");
    afficherEvents();
}
function filtrerParCategorie() {
    const select = document.getElementById("filter-categorie");
    if (!select)
        return;
    const categorie = select.value;
    if (categorie === "toutes") {
        afficherEvents();
    }
    else {
        const eventsFiltres = eventManager.filtrerParCategorie(categorie);
        afficherEvents(eventsFiltres);
    }
}
window.afficherDetailEvent = afficherDetailEvent;
window.fermerModal = fermerModal;
document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Application démarrée");
    ajouterEventsDemo();
    afficherEvents();
    const btnReset = document.getElementById("btn-reset");
    if (btnReset) {
        btnReset.addEventListener("click", () => {
            if (confirm("⚠️ Voulez-vous vraiment réinitialiser toutes les données ?")) {
                eventManager.reinitialiser();
                location.reload();
            }
        });
    }
    const form = document.getElementById("create-event-form");
    if (form) {
        form.addEventListener("submit", gererCreationEvent);
    }
    const filterSelect = document.getElementById("filter-categorie");
    if (filterSelect) {
        filterSelect.addEventListener("change", filtrerParCategorie);
    }
    const modal = document.getElementById("event-detail-modal");
    const closeBtn = document.querySelector(".close-modal");
    if (closeBtn) {
        closeBtn.addEventListener("click", fermerModal);
    }
    if (modal) {
        modal.addEventListener("click", e => {
            if (e.target === modal)
                fermerModal();
        });
    }
    console.log("✅ Application prête");
});
//# sourceMappingURL=main.js.map