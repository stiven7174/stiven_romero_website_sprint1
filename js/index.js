import { fetchEventsData } from './api.js';
import { filterEvents } from './filters.js';
import { displayEvents } from './render.js';

document.addEventListener("DOMContentLoaded", async function () {
    const searchInput = document.getElementById("search-input");
    const categoryCheckboxes = document.querySelectorAll("#categories input[type='checkbox']");
    const allEventsContainer = document.getElementById("all-events");

    try {
        const data = await fetchEventsData();

        function filterAndRenderEvents() {
            const searchTerm = searchInput.value.toLowerCase();
            const selectedCategories = Array.from(categoryCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            const filteredEvents = filterEvents(data.events, searchTerm, selectedCategories);
            displayEvents(filteredEvents, allEventsContainer);
        }

        searchInput.addEventListener("input", filterAndRenderEvents);
        categoryCheckboxes.forEach(checkbox => checkbox.addEventListener("change", filterAndRenderEvents));

        displayEvents(data.events, allEventsContainer);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
});