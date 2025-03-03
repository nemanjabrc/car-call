import axios, { AxiosResponse } from "axios";
import { store } from "../store/configureStore";

axios.defaults.baseURL = 'http://localhost:5097/api/';
axios.defaults.withCredentials = true;

const responseBody = (response : AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token)
        config.headers.Authorization = `Bearer ${token}`;

    return config;
})

const requests = {
    get: (url: string, params?:URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body?: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    registerOwner: (values: any) => requests.post('account/registerOwner', values),
    registerOperator: (values: any) => requests.post('account/registerOperator', values),
    registerAdmin: (values: any) => requests.post('account/registerAdmin', values),
    currentUser : () => requests.get('account/currentUser'),
    getCurrentOwnerProfile: () => requests.get('account/getCurrentOwnerProfile'),
    getSuperadminProfile: () => requests.get('account/getSuperadminProfile'),
    getCurrentAdminProfile: () => requests.get('account/getCurrentAdminProfile'),
    getCurrentOperatorProfile: () => requests.get('account/getCurrentOperatorProfile'),
    getAllOperatorsFromCompany: (companyId: number, params: URLSearchParams) => requests.get(`account/getAllOperatorsFromCompany/${companyId}`, params),
    getOperatorProfile: (operatorId: string) => requests.get(`account/getOperatorProfile/${operatorId}`),
    deleteOperator: (operatorId: string) => requests.delete(`account/deleteOperator/${operatorId}`),
    getAllOwnersFromCompany: (companyId: number, params: URLSearchParams) => requests.get(`account/getAllOwnersFromCompany/${companyId}`, params),
    getOwnerFromCompany: (ownerId: number) => requests.get(`account/getOwnerFromCompany/${ownerId}`),
}

const Company = {
    getAll: () => requests.get('company/getAll'), 
    addCompany: (company: any) => requests.post('company/addCompany', company), 
    updateCompany: (company: any) => requests.put('company/updateCompany', company), 
}

const LookupTables = {
    getCategories: () => requests.get('lookupTables/getCategories'),
    getVehicleManufacturers: (categoryId: number) => requests.get('lookupTables/getManufacturers', new URLSearchParams({categoryId: categoryId.toString()})),
    getVehicleModels: (manufacturerId: number) => requests.get('lookupTables/getModels', new URLSearchParams({manufacturerId: manufacturerId.toString()})),
}

const Vehicle = {
    getVehicle: (id: number) => requests.get(`vehicle/getVehicle/${id}`),
    getVehicles: () => requests.get('vehicle/getVehicles'),
    addVehicle: (vehicle: any) => requests.post('vehicle/addVehicle', vehicle),
    addOwnersVehicle: (ownerId:number, vehicle: any) => requests.post(`vehicle/addOwnersVehicle/${ownerId}`, vehicle),
    renewVehicleRegistration: (vehicleId: number) => requests.put(`vehicle/renewRegistration/${vehicleId}`),
    deleteVehicle: (vehicleId: number) => requests.delete(`vehicle/deleteVehicle/${vehicleId}`),
    getAllVehiclesFromCompany: (companyId: number, params: URLSearchParams) => requests.get(`vehicle/getAllVehiclesFromCompany/${companyId}`, params),
    getOwnersVehicles: (ownerId: number) => requests.get(`vehicle/getOwnersVehicles/${ownerId}`),
}

const Notification = {
    addNotification: (vehicleId: number, notification: any) => requests.post(`maintenanceNotification/addMaintenanceNotification/${vehicleId}`, notification),
    getAllVehicleMaintenanceNotifications: (vehicleId: number) => requests.get(`maintenanceNotification/getAllVehicleMaintenanceNotifications/${vehicleId}`),
    getSingleVehicleMaintenanceNotification: (notificationId: number) => requests.get(`maintenanceNotification/getSingleVehicleMaintenanceNotification/${notificationId}`),
    getRegistrationNotification: (vehicleId: number) => requests.get(`registrationNotification/getRegistrationNotification/${vehicleId}`),
    deleteMaintenanceNotification: (notificationId: number) => requests.delete(`maintenanceNotification/deleteMaintenanceNotification/${notificationId}`),
    getCompanyRegistrationNotification: (companyId: number) => requests.get(`registrationNotification/getCompanyRegistrationNotification/${companyId}`),
    changeRegistrationNotificationMessage: (notification: any) => requests.put(`registrationNotification/changeRegistrationNotificationMessage`, notification),
}

const agent = {
    Account,
    Company,
    LookupTables,
    Vehicle,
    Notification
}

export default agent;