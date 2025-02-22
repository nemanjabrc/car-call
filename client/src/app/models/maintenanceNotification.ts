export interface MaintenanceNotification {
    id: number
    message: string
    startDate: string
    numberOfDays: number
    dateOfNotification: string
    repetitive: boolean
}