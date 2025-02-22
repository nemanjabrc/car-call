import * as yup from 'yup';

export const validationAdminRegistrationSchema = yup.object({
    name: yup.string().required('Unesite ime.'),
    surname: yup.string().required('Unesite prezime.'),
    email: yup.string()
    .required('Unesite email.')
    .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})*$/,
        "Email adresa nije validna"
    ),
    companyId: yup.string().required('Unesite kompaniju kojoj adminitrator pripada.'),
})