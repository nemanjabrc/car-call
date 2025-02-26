export interface Vehicle {
  id: number
  category: string
  manufacturer: string
  model: string
  yearOfManufacture: string
  registrationPlate: string
  dateOfRegistration: string
  dateOfExpiration: string
  isRegistered: boolean
  numberOfNotifications: number
  ownerId: number
}

export interface VehicleParams {
  searchTerm?: string;
  categories?: string[];
}