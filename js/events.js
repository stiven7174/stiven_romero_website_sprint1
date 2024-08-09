export function createCard(event) {
    let card = document.createElement("div");
    card.className = "card card_tamaño_ultima col-md-4 m-1";
    card.innerHTML = `
        <img src="${event.image}" class="card-img-top tamaño_img_card" alt="${event.name}" />
        <div class="card-body">
            <h5 class="card-title">${event.name}</h5>
            <p class="card-text">${event.description}</p>
            <div class="border-top">
                <p class="btn m-1">Price: ${event.price}</p>
                <a href="./pages/more_info.html?id=${event._id}" class="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    `;
    return card;
}