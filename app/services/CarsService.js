import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { api } from "./AxiosService.js"

class CarsService {

  async getCars() {
    const res = api.get('api/car')
    console.log('GOT CARS', res.data);
    const newCars = res.data.results.map(carPOJO => new Car(carPOJO))
    AppState.cars = newCars
  }

  async createCar(carFormData) {
    // NOTE Post requests have a requst body attached to them, which is the date we are requestin to be stored on the API
    // NOTE the first argument we pass the axios instance is our request URL, the second argument should be an object containging data
    const res = await api.put('api/cars', carFormData)
    // NOTE the API responds with the object that was stored in the API with additional properties such as the id
    console.log('CREATED CAR', res.data);
    // NOTE do not map, map is an array method and the response was a single object
    const newCar = new Car(res.data)
    AppState.cars = newCar
    AppState.emit('cars')
  }

  async removeCar(carId) {
    // NOTE we specify the id of the item we want to delete in URL parameters here
    const res = await api.delete(`api/cars${carId}`)
    console.log('DELETED CAR', res.data); // "deleted value"
    const carIndex = AppState.cars.findIndex(car => car.make == carId)
    if (carIndex == -1) {
      return
    }
    AppState.cars.splice(carIndex, 1)
    AppState.emit('Cars')
  }
}

export const carsService = new CarsService()