export function filterEvents(events, searchTerm, selectedCategories, currentDate = null) {
    let filteredEvents = events.filter(event => {
        let matchesSearch = event.name.toLowerCase().includes(searchTerm) || 
                              event.description.toLowerCase().includes(searchTerm);
        let matchesCategory = selectedCategories.length === 0 || 
                                selectedCategories.includes(event.category);
        let eventDate = new Date(event.date);
        let matchesDate = currentDate ? 
                            (eventDate >= currentDate ? true : false) : true;
        return matchesSearch && matchesCategory && matchesDate;
    });
    return filteredEvents;
}