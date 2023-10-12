import { AppState } from "../AppState.js";
import { Car } from "../models/Car.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawCars() {
  console.log('DRAWING CARS');
  const cars = AppState.cars
  let content = ''
  cars.forEach(car => content += car.CarsCardTemplate)
  setHTML('carCards', content)
}
function _drawCarForm() {
  if (!AppState.account) {
    return
  }
  setHTML('carForm', new Car().CarFormTemplate)
}

export class CarsController {
  constructor () {
    console.log('cars controller loaded');
    this.createCar()
    _drawCarForm()

    AppState.on('cars', _drawCars())
    AppState.on('acount', _drawCars())
    AppState.on('acount', _drawCarForm())
  }

  async getCars() {
    try {
      await carsService.getCars()
    } catch (error) {
      Pop.error('error')

    }
  }

  async createCar(event) {
    try {
      console.log('form submitted');
      const form = event.target
      const carFormData = getFormData(form)
      console.log(carFormData);
      carsService.createCar(carFormData)
      Pop.success('New car posted!')
      form.reset()
    } catch (error) {
      Pop.error('error')

    }
  }

  async removeCar(carId) {
    try {
      const wantsToDelete = Pop.confirm('Are you sure you want to delete this car?')
      if (!wantsToDelete) {
        return
      }

      await carsService.removeCar(carId)
    } catch (error) {
      Pop.error('error')

    }
  }
}