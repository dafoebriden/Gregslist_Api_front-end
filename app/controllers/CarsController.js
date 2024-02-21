import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCars() {
    // REVIEW not much has changed here
    const cars = AppState.cars
    let htmlString = ''
    cars.forEach(car => htmlString += car.CardHTMLTemplate)
    setHTML('carListings', htmlString)
}

function _drawCarForm() {

    const carFormElement = document.getElementById('carForm')

    // NOTE make sure getById found an element
    if (!carFormElement) {
        return
    }

    // NOTE removes d-none from our classlist, so our form renders
    carFormElement.classList.remove('d-none')
}


export class CarsController {
    constructor() {
        console.log('Cars controller loaded');
        this.getCars()
        _drawCars
        _drawCarForm // when someone logs in, allow them to create cars
        AppState.on('cars', _drawCars)
    }


    // REVIEW GET - READ
    async getCars() {
        try {
            await carsService.getCars()
            Pop.success('GOT CARS')
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    // REVIEW POST - CREATE
    async createCar() {
        try {
            // REVIEW not much has changed here

            event.preventDefault() // Don't refresh

            console.log('creating car');

            const form = event.target // grab HTML form

            console.log('car form', form);

            const carFormData = getFormData(form) // pull named input values out of HTML form

            console.log('object from form', carFormData);

            await carsService.createCar(carFormData) // pass data from form to service

            // @ts-ignore
            form.reset() // reset form
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    // REVIEW DELETE - DELETE
    async removeCar(carId) {
        try {
            // REVIEW not much has changed here
            console.log('removing car', carId);

            const wantsToRemove = await Pop.confirm('Are you sure you want to delete this car for forever and ever?')

            if (!wantsToRemove) {
                return
            }

            // NOTE the service will need the api supplied id for the car that we want to delete. Make sure your model saves that value and passes it here from the onclick
            await carsService.removeCar(carId)

            Pop.success('Car was deleted')
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }
}