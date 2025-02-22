import * as yup from 'yup';

export const validationNotificationSchema = yup.object({
    message: yup.string().required('Unesite poruku.'),
    startDate: yup.string().required('Datum početka je obavezan.'),
    numberOfDays: yup.string().required('Unesite za koliko vremena želite da dobijete podsjetnik.')
})