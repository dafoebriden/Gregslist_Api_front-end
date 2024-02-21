import { AppState } from "../AppState.js"

export class House {
    constructor(data) {
        this.id = data.id
        this.owner = data.owner
        this.street = data.address.street
        this.aptNum = data.address.apartmentNumber
        this.city = data.address.city
        this.city = data.address.city
        this.state = data.address.state
        this.zip = data.address.zip
        this.year = data.year
        this.price = data.price
        this.color = data.color
        this.levels = data.levels // NOTE make in backend
        this.imgUrl = data.imgUrl
        this.description = data.description
        this.bedrooms = data.spaces.bedrooms
        this.bathrooms = data.spaces.bathrooms
        this.playrooms = data.spaces.playrooms
        this.movierooms = data.spaces.movierooms
        this.garageSpaces = data.spaces.garageSpaces
        this.library = data.spaces.library
        this.backyard = data.spaces.backyard
        this.porch = data.spaces.porch
        this.garden = data.spaces.garden
        this.squareFootage = data.area.squareFootage
        this.fireplaces = data.details.fireplaces
        this.fridge = data.details.fridge
        this.freezer = data.details.freezer
        this.washer = data.details.washer
        this.dryer = data.details.dryer
        this.furnished = data.details.furnished
        this.description = data.description

        this.createdAt = data.createdAt || Date()


    }
    get CardHTMLTemplate() {
        return `
        <div class="col-12 mb-3">
        <div class="row bg-light rounded shadow border border-dark">
            <div class="col-md-4 px-0">
                <img src="${this.imgUrl}" alt="House Image" class="img-fluid rounded-start car-picture">
            </div>
            <div class="col-md-8 p-3">
                <h3>Address......</h3>
                <h4>${this.price}</h4>
                <h5>${this.year}</h5>
                <p>${this.bedrooms} Bed <br>${this.bathrooms} Bath</p>
                <p>${this.description}</p>
                <div class="d-flex">
                    <h4>Listed by ${this.owner}</h4>
                </div>
                <div>
                    ${this.DeleteButton}
                </div>
            </div>
        </div>
    </div>
    `

    }

    get DeleteButton() {
        return `<Button button onclick = "app.HousesController.removeHouse('${this.id}')" class="btn btn-danger"> Delete House</Button> `
    }

}

