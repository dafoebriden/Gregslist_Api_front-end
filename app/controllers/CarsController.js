import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCars() {
    const cars = AppState.cars
    let htmlString = ''
    cars.forEach(car => htmlString += car.CardHTMLTemplate)
    setHTML('carListings', htmlString)
}

function _drawCarForm() {
    const carFormElement = document.getElementById('carForm')
    if (!carFormElement) {
        return
    }
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

    async getCars() {
        try {
            await carsService.getCars()
            Pop.success('GOT CARS')
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    async createCar() {
        try {
            event.preventDefault()
            const form = event.target
            const carFormData = getFormData(form)
            await carsService.createCar(carFormData)
            // @ts-ignore
            form.reset() // reset form
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }

    async removeCar(carId) {
        try {
            const wantsToRemove = await Pop.confirm('Are you sure you want to delete this car for forever and ever?')
            if (!wantsToRemove) {
                return
            }
            await carsService.removeCar(carId)
            Pop.success('Car was deleted')
        } catch (error) {
            console.error(error)
            Pop.error(error)
        }
    }
}