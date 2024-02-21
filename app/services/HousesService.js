import { AppState } from "../AppState.js"
import { House } from "../models/House.js"
import { api } from "./AxiosService.js"

class HousesService {
    async getHouses() {
        const response = await api.get('api/Houses')
        const newHouses = response.data.map(housePOJO => new House(housePOJO))
        AppState.houses = newHouses
    }

    async createHouse(houseFormData) {
        const response = await api.post('api/Houses', houseFormData)
        const newHouse = new House(response.data)
        AppState.houses.push(newHouse)
    }

    async removeHouse(houseId) {
        const response = await api.delete(`api/houses/${houseId}`)
        const houseIndex = AppState.houses.findIndex(house => house.creatorId == houseId)
        if (houseIndex == -1) {
            throw new Error('Index was -1, you messes up the findIndex')
        }
        AppState.cars.splice(houseIndex, 1)
    }

}

export const housesService = new HousesService()