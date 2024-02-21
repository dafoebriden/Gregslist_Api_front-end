import { AppState } from "../AppState.js"

export class House {
    constructor(data) {
        this.bedrooms = data.bedrooms
        this.bathrooms = data.bathrooms
        this.levels = data.levels
        this.imgUrl = data.imgUrl
        this.year = data.year
        this.price = data.price
        this.description = data.description
        this.creatorId = data.creatorId
        this.createdAt = data.createdAt || Date()
    }

    get HousesCardHTMLTemplate() {
        return `
<div class="col-12 mb-3">
    <div class="row bg-light rounded shadow border border-dark">
        <div class="col-md-4 px-0">
            <img
                src="${this.imgUrl}"
                alt="House Image" class="img-fluid rounded-start car-picture">
        </div>
        <div class="col-md-8 p-3">
            <h2>${this.price}</h2>
            <h3>$${this.year}</h3>
            <h3>Listed on ${this.createdAt.toLocaleDateString()}</h3>
            <div class="d-flex">
                <h4>Listed by Owner</h4>
            </div>
            <p>Bedrooms: ${this.bedrooms} Bathrooms:${this.bathrooms}</p>
            <p>${this.description}</p>
            <div>
                ${this.DeleteButton}
            </div>
        </div>
    </div>
</div>
`

    }

    get DeleteButton() {

        // NOTE shows delete button only for the creator of the car
        return `< button onclick = "app.CarsController.removeCar('${this.creatorId}')" class="btn btn-danger" > Delete Car</ > `
    }

}

