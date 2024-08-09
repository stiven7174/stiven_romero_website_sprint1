import { fetchEventsData } from './api.js';
import { filterEvents } from './filters.js';
import { displayEvents } from './render.js';

document.addEventListener("DOMContentLoaded", async function () {
    let searchInput = document.getElementById("search-input");
    let categoryCheckboxes = document.querySelectorAll("#categories input[type='checkbox']");
    let allEventsContainer = document.getElementById("all-events");

    try {
        let data = await fetchEventsData();
        let currentDate = new Date(data.currentDate);

        function filterAndRenderEvents() {
            let searchTerm = searchInput.value.toLowerCase();
            let selectedCategories = Array.from(categoryCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value);

            console.log("searchTerm:", searchTerm);
            console.log("selectedCategories:", selectedCategories);

            let filteredEvents = filterEvents(
                data.events.filter(event => new Date(event.date) < currentDate),
                searchTerm,
                selectedCategories
            );

            console.log("filteredEvents:", filteredEvents);

            displayEvents(filteredEvents, allEventsContainer);
        }

        searchInput.addEventListener("input", filterAndRenderEvents);
        categoryCheckboxes.forEach(checkbox => checkbox.addEventListener("change", filterAndRenderEvents));

        filterAndRenderEvents();
    } catch (error) {
        console.error('Error fetching events:', error);
    }
});