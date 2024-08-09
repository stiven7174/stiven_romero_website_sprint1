import { fetchEventsData } from './api.js';
import { filterEvents } from './filters.js';
import { displayEvents } from './render.js';

document.addEventListener("DOMContentLoaded", async function () {
    let searchInput = document.getElementById("search-input");
    let categoryCheckboxes = document.querySelectorAll("#categories input[type='checkbox']");
    let allEventsContainer = document.getElementById("all-events");

    try {
        let data = await fetchEventsData();

        function filterAndRenderEvents() {
            let searchTerm = searchInput.value.toLowerCase();
            let selectedCategories = Array.from(categoryCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            let filteredEvents = filterEvents(data.events, searchTerm, selectedCategories);
            displayEvents(filteredEvents, allEventsContainer);
        }

        searchInput.addEventListener("input", filterAndRenderEvents);
        categoryCheckboxes.forEach(checkbox => checkbox.addEventListener("change", filterAndRenderEvents));

        displayEvents(data.events, allEventsContainer);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
});