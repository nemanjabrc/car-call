import * as yup from 'yup';

export const validationVehicleSchema = yup.object({
    category: yup.string().required('Kategorija je obavezna.'),
    manufacturer: yup.string().required('Proizvodjač je obavezan.'),
    model: yup.string().required('Model je obavezan.'),
    yearOfManufacture: yup.string().required('Godina proizvodnje je obavezna.'),
    registrationPlate: yup.string()
    .required('Registarska oznaka je obavezna.')
    .test('is-valid-plate', 'Neispravna registarska oznaka.', value => 
        !value || /^([AEOJKMT][0-9][0-9]-[AEOJKMT]-[0-9][0-9][0-9]|TA-[0-9][0-9][0-9][0-9][0-9][0-9]|[0-9][0-9][0-9]-[AEOJKMT]-[0-9][0-9][0-9])$/.test(value)
    ),
    dateOfRegistration: yup.string().required('Datum registracije je obavezan.'),
    dateOfLastMaintenance: yup.string().required('Datum godišnjeg održavanja je obavezan.'),
})