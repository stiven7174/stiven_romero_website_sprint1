export async function fetchEventsData() {
    try {
        let response = await fetch('https://aulamindhub.github.io/amazing-api/events.json');
        return await response.json();
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}