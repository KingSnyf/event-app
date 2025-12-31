import { eventManager } from "./EventManager.js";
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const eventIdParam = params.get("eventId");
    if (!eventIdParam) {
        console.error("Erreur : aucun eventId fourni dans l'URL");
        return;
    }
    const eventId = parseInt(eventIdParam);
    if (isNaN(eventId)) {
        console.error("Erreur : eventId invalide");
        return;
    }
    const detailDiv = document.getElementById("event-detail");
    const form = document.getElementById("inscription-form");
    const listeDiv = document.getElementById("liste-inscrits");
    const event = eventManager.obtenirEventParId(eventId);
    if (!event || !detailDiv || !form || !listeDiv) {
        console.error("Erreur : élément manquant ou événement introuvable");
        console.log({ eventId, event, detailDiv, form, listeDiv });
        return;
    }
    function miseAJourDetail() {
        const nombreInscrits = eventManager.obtenirInscriptionsPourEvent(eventId).length;
        detailDiv.innerHTML = `
      <h2>${event.titre}</h2>
      <p>${event.description}</p>
      <p><strong>📅</strong> ${event.getDateFormatee()}</p>
      <p><strong>📍</strong> ${event.lieu}</p>
      <p id="inscrits-count"><strong>👥</strong> ${nombreInscrits}/${event.capaciteMax} inscrits</p>
    `;
    }
    function afficherInscriptions() {
        const inscrits = eventManager.obtenirInscriptionsPourEvent(eventId);
        if (inscrits.length === 0) {
            listeDiv.innerHTML = "<p>Aucun inscrit pour le moment.</p>";
            return;
        }
        listeDiv.innerHTML = "<h3>Participants :</h3><ul>" +
            inscrits.map(r => {
                const user = eventManager.obtenirTousLesUsers().find(u => u.id === r.userId);
                return `<li>${user === null || user === void 0 ? void 0 : user.nom} (${user === null || user === void 0 ? void 0 : user.email})</li>`;
            }).join("") +
            "</ul>";
    }
    miseAJourDetail();
    afficherInscriptions();
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nomInput = document.getElementById("user-nom");
        const emailInput = document.getElementById("user-email");
        const nom = nomInput.value.trim();
        const email = emailInput.value.trim();
        if (!nom || !email) {
            alert("❌ Veuillez remplir tous les champs !");
            return;
        }
        const result = eventManager.inscrireUserAEvent(eventId, nom, email);
        alert(result.message);
        if (result.success) {
            miseAJourDetail();
            afficherInscriptions();
            form.reset();
        }
    });
});
//# sourceMappingURL=inscription.js.map