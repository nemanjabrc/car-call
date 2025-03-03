import * as yup from 'yup';

export const validationRegistrationNotificationSchema = yup.object({
    message: yup.string().required('Unesite poruku.'),
})