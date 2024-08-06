import { fetchEventsData } from './api.js';
import { filterEvents } from './filters.js';
import { displayEvents } from './render.js';

document.addEventListener("DOMContentLoaded", async function () {
    const searchInput = document.getElementById("search-input");
    const categoryCheckboxes = document.querySelectorAll("#categories input[type='checkbox']");
    const allEventsContainer = document.getElementById("all-events");

    try {
        const data = await fetchEventsData();
        const currentDate = new Date(data.currentDate);

        // Función con console.log para debugging
        function filterAndRenderEvents() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategories = Array.from(categoryCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            console.log("searchTerm:", searchTerm);
            console.log("selectedCategories:", selectedCategories);

            const filteredEvents = filterEvents(
                data.events.filter(event => new Date(event.date) < currentDate),
                searchTerm,
                selectedCategories
            );

            console.log("filteredEvents:", filteredEvents);

            displayEvents(filteredEvents, allEventsContainer);
        }

        searchInput.addEventListener("input", filterAndRenderEvents);
        categoryCheckboxes.forEach(checkbox => checkbox.addEventListener("change", filterAndRenderEvents));

        // Llamada inicial para renderizar los eventos al cargar la página
        filterAndRenderEvents();
    } catch (error) {
        console.error('Error fetching events:', error);
    }
});