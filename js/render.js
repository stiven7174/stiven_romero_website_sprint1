import { createCard } from './events.js';

export function displayEvents(events, container) {
    container.innerHTML = "";
    if (events.length === 0) {
        container.innerHTML = "<p class='error-message'>No events found matching your criteria.</p>";
    } else {
        events.forEach(event => {
            let card = createCard(event);
            container.appendChild(card);
        });
    }
}