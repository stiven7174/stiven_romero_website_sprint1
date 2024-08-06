export function filterEvents(events, searchTerm, selectedCategories, currentDate = null) {
    const filteredEvents = events.filter(event => {
        const matchesSearch = event.name.toLowerCase().includes(searchTerm) || 
                              event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategories.length === 0 || 
                                selectedCategories.includes(event.category);
        const eventDate = new Date(event.date);
        const matchesDate = currentDate ? 
                            (eventDate >= currentDate ? true : false) : true;
        return matchesSearch && matchesCategory && matchesDate;
    });
    return filteredEvents;
}