import * as yup from 'yup';

export const validationCompanySchema = yup.object({
    name: yup.string().required('Ime je obavezno.'),
    address: yup.string().required('Adresa je obavezna.'),
    phoneNumber: yup.string().required('Broj telefona je obavezan.'),
    email: yup.string().required('Email je obavezan.').email('Unesite validan Email.'),
    city: yup.string().required('Grad je obavezan.')
})