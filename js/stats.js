let currentDate = new Date("2023-03-10");
fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json())
    .then(data => {
        let events = data.events;
        let maxAttendanceEvent = null;
        let minAttendanceEvent = null;
        let maxCapacityEvent = null;
        let maxAttendancePercent = -1;
        let minAttendancePercent = 101;
        let maxCapacity = -1;
        let pastEvents = events.filter(event => new Date(event.date) < currentDate);
        let upcomingEvents = events.filter(event => new Date(event.date) >= currentDate);
        let pastCategories = {};
        let upcomingCategories = {};
        pastEvents.forEach(event => {
            let attendancePercent = (event.assistance / event.capacity) * 100;
            let revenue = event.price * event.assistance;
            if (attendancePercent > maxAttendancePercent) {
                maxAttendancePercent = attendancePercent;
                maxAttendanceEvent = event;
            }
            if (attendancePercent < minAttendancePercent) {
                minAttendancePercent = attendancePercent;
                minAttendanceEvent = event;
            }
            if (event.capacity > maxCapacity) {
                maxCapacity = event.capacity;
                maxCapacityEvent = event;
            }
            if (!pastCategories[event.category]) {
                pastCategories[event.category] = {
                    revenue: 0,
                    attendancePercent: 0,
                    totalCapacity: 0,
                    totalAssistance: 0,
                };
            }
            pastCategories[event.category].revenue += revenue;
            pastCategories[event.category].totalCapacity += event.capacity;
            pastCategories[event.category].totalAssistance += event.assistance;
        });
        upcomingEvents.forEach(event => {
            if (!upcomingCategories[event.category]) {
                upcomingCategories[event.category] = {
                    estimatedRevenue: 0,
                    totalCapacity: 0,
                    estimatedTotalAttendance: 0,
                    estimatedAttendancePercent: 0,
                };
            }
            let estimatedAttendance = event.estimate || 0;
            let estimatedRevenue = event.price * estimatedAttendance;
            let estimatedAttendancePercent = (estimatedAttendance / event.capacity) * 100;
            upcomingCategories[event.category].estimatedRevenue += estimatedRevenue;
            upcomingCategories[event.category].totalCapacity += event.capacity;
            upcomingCategories[event.category].estimatedTotalAttendance += estimatedAttendance;
            upcomingCategories[event.category].estimatedAttendancePercent += estimatedAttendancePercent;
        });
        for (let category in pastCategories) {
            pastCategories[category].attendancePercent = (pastCategories[category].totalAssistance / pastCategories[category].totalCapacity) * 100;
        }
        for (let category in upcomingCategories) {
        }
        document.getElementById('maxAttendanceEvent').innerText = `${maxAttendanceEvent.name} (${maxAttendancePercent.toFixed(2)}%)`;
        document.getElementById('minAttendanceEvent').innerText = `${minAttendanceEvent.name} (${minAttendancePercent.toFixed(2)}%)`;
        document.getElementById('maxCapacityEvent').innerText = `${maxCapacityEvent.name} (${maxCapacityEvent.capacity})`;
        let pastEventsTable = document.getElementById('pastEventsTable');
        for (let category in pastCategories) {
            let row = document.createElement('tr');
            let categoryCell = document.createElement('td');
            categoryCell.innerText = category;
            let revenueCell = document.createElement('td');
            revenueCell.innerText = `$${pastCategories[category].revenue.toFixed(2)}`;
            let attendancePercentCell = document.createElement('td');
            attendancePercentCell.innerText = `${pastCategories[category].attendancePercent.toFixed(2)}%`;
            row.appendChild(categoryCell);
            row.appendChild(revenueCell);
            row.appendChild(attendancePercentCell);
            pastEventsTable.appendChild(row);
        }
        let upcomingEventsTable = document.getElementById('upcomingEventsTable');
        for (let category in upcomingCategories) {
            let row = document.createElement('tr');
            let categoryCell = document.createElement('td');
            categoryCell.innerText = category;
            let estimatedRevenueCell = document.createElement('td');
            estimatedRevenueCell.innerText = `$${upcomingCategories[category].estimatedRevenue.toFixed(2)}`;
            let estimatedAttendancePercentCell = document.createElement('td');
            estimatedAttendancePercentCell.innerText = `${upcomingCategories[category].estimatedAttendancePercent.toFixed(2)}%`;
            row.appendChild(categoryCell);
            row.appendChild(estimatedRevenueCell);
            row.appendChild(estimatedAttendancePercentCell);
            upcomingEventsTable.appendChild(row);
        }
    })
    .catch(error => console.error('Error fetching data:', error));