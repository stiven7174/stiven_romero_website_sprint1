// scripts/more_info.js
import { fetchEventsData } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetchEventsData();

        const urlParams = new URLSearchParams(window.location.search);
        const eventId = urlParams.get('id');

        const event = data.events.find(event => event._id.toString() === eventId);

        if (event) {
            const eventCardContainer = document.getElementById('event-card-container');
            eventCardContainer.innerHTML = `
                <div class="card mb-3 tamaño_card_horizontal">
                    <div class="d-flex">
                        <div class="">
                            <img src="${event.image}" class="tamaño_img_card_horizontal rounded-start m-1" alt="${event.name}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title centrar">${event.name}</h5>
                                <p class="card-text negrita">${event.description}</p>
                                <p class="card-text negrita"><span class="subtitle">Date:</span> ${event.date}</p>
                                <p class="card-text negrita"><span class="subtitle">Category:</span> ${event.category}</p>
                                <p class="card-text negrita"><span class="subtitle">Place:</span> ${event.place}</p>
                                <p class="card-text negrita"><span class="subtitle">Price:</span> $${event.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            console.error('Event not found!');
            const eventCardContainer = document.getElementById('event-card-container');
            eventCardContainer.innerHTML = "<p class='error-message'>Event not found.</p>";
        }
    } catch (error) {
        console.error('Error fetching event:', error);
        const eventCardContainer = document.getElementById('event-card-container');
        eventCardContainer.innerHTML = "<p class='error-message'>There was an error fetching the event details.</p>";
    }
});