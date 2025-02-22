import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchCategories, fetchManufacturers, fetchModels, setSelectedCategory, setSelectedManufacturer } from "../lookupTables/lookupTablesSlice";
import { Alert, Box, Grid, InputAdornment, Paper, Snackbar, Typography } from "@mui/material";
import AppSelectList from "../../app/components/AppSelectList";
import { FieldValues, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationVehicleSchema } from "./vehicleValidation";
import AppTextInput from "../../app/components/AppTextInput";
import AppYearPicker from "../../app/components/AppYearPicker";
import AppDatePicker from "../../app/components/AppDatePicker";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { LoadingButton } from "@mui/lab";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import agent from "../../app/api/agent";
import { setVehicle } from "./vehiclesSlice";

const registrationPlateRegex = /^([AEOJKMT][0-9][0-9]-[AEOJKMT]-[0-9][0-9][0-9]|TA-[0-9][0-9][0-9][0-9][0-9][0-9]|[0-9][0-9][0-9]-[AEOJKMT]-[0-9][0-9][0-9])$/;

const VehicleForm = () => {

    const dispatch = useAppDispatch();
    const {categories, manufacturers, models, selectedCategory, selectedManufacturer} = useAppSelector(state => state.lookupTable);
    const [successAlert, setSuccessAlert] = useState(false);

    const { control, watch, reset, handleSubmit, formState: {isSubmitting} } = useForm({
        resolver: yupResolver<any>(validationVehicleSchema)
    });

    const [isPlateValid, setIsPlateValid] = useState<boolean | null>(null);
    const registrationPlate = watch("registrationPlate");

    useEffect(() => {
        if (!registrationPlate) {
            setIsPlateValid(null);
        } else {
            setIsPlateValid(registrationPlateRegex.test(registrationPlate));
        }
    }, [registrationPlate]);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleCategoryChange = (event: any) => {
        const categoryName = event.target.value; 
        const categoryId = categories.find(category => category.name === categoryName)?.id;
        dispatch(setSelectedCategory(categoryId)); 
        if (categoryId) dispatch(fetchManufacturers(categoryId));
    };
    
    const handleManufacturerChange = (event: any) => {
        const manufacturerName = event.target.value; 
        const manufacturerId = manufacturers.find(manufacturer => manufacturer.name === manufacturerName)?.id;
        dispatch(setSelectedManufacturer(manufacturerId)); 
        if (manufacturerId) dispatch(fetchModels(manufacturerId));
    }

    async function handleSubmitData(data: FieldValues) {
        try {
            await agent.Vehicle.addVehicle(data);
            dispatch(setVehicle());
            reset();
            setSuccessAlert(true);
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{color: 'gray', mb: 4}}>
                Podaci o vozilu
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <AppSelectList
                            control={control}
                            label="Kategorija" 
                            items={categories} 
                            name="category" 
                            onChange={handleCategoryChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={4}>
                        <AppSelectList 
                            control={control}
                            disabled={!selectedCategory}
                            label="Proizvodjač" 
                            items={manufacturers} 
                            name="manufacturer" 
                            onChange={handleManufacturerChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <AppSelectList 
                            control={control}
                            disabled={!selectedManufacturer}
                            label="Model" 
                            items={models} 
                            name="model" 
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <AppYearPicker
                            control={control}
                            label="Godina proizvodnje"
                            name="yearOfManufacture"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput
                            control={control}
                            label="Registarska oznaka"
                            name="registrationPlate"
                            InputProps={{  
                                endAdornment: (
                                    <InputAdornment position="end">
                                        {isPlateValid === true && <CheckCircleIcon sx={{ color: "green" }} />}
                                        {isPlateValid === false && <ErrorIcon sx={{ color: "red" }} />}
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppDatePicker 
                            control={control}
                            label="Datum registracije"
                            name="dateOfRegistration"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppDatePicker 
                            control={control}
                            label="Datum godišnjeg odrzavanja"
                            name="dateOfLastMaintenance"
                        />
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='flex-end' sx={{mt: 3}}>
                        <LoadingButton type="submit" loading={isSubmitting} variant='contained' sx={{backgroundColor: '#339966'}} endIcon={<AddCircleOutlineOutlinedIcon />}>Sačuvaj</LoadingButton>
                </Box>
            </form>
            <Snackbar open={successAlert} autoHideDuration={5000} onClose={() => setSuccessAlert(false)}>
                <Alert onClose={() => setSuccessAlert(false)} severity="success">
                    Uspješno ste dodali novo vozilo!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default VehicleForm;