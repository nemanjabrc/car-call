import { LoadingButton } from "@mui/lab";
import { Box, Paper, Typography, Grid } from "@mui/material";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { companySelectors, fetchCompaniesAsync } from "../company/companySlice";
import { useEffect } from "react";
import AppSelectList3 from "../../app/components/AppSelectList3";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationAdminRegistrationSchema } from "./adminRegistrationValidation";
import AppTextInput from "../../app/components/AppTextInput";
import agent from "../../app/api/agent";
import { showSnackbar } from "../snackbar/snackbarSlice";

const RegisterAdminForm = () => {

    const dispatch = useAppDispatch();
    const companies = useAppSelector(companySelectors.selectAll);
    const {companiesLoaded} = useAppSelector(state => state.company);
    console.log(companies);

    const { control, handleSubmit, reset, setError, formState: {isSubmitting} } = useForm({
        resolver: yupResolver<any>(validationAdminRegistrationSchema)
    });

    function handleApiErrors(error: any) {
        if(error.response.data.errors) {
            const errors = error.response.data.errors;
            Object.keys(errors).forEach((key) => {
                console.error(`Validation error for ${key}:`, errors[key][0]);

                if(key === "DuplicateEmail" && errors[key][0].includes("is already taken.")) {
                    setError('email', {type: 'manual', message: 'Već postoji nalog sa ovom email adresom.'})
                }
            });
        }
    }

    const submitForm = async (data: any) => {
        try {
            await agent.Account.registerAdmin(data);
            reset();
            dispatch(showSnackbar("Uspješno ste dodali novog administratora!"));
        } catch (error: any) {
            if (error.response) {
                console.log("Response status:", error.response.status); 
                console.log("Response data:", error.response.data);
                
                handleApiErrors(error);
            } else {
                console.log("Unexpected error:", error);
            }
        }
    }

    useEffect(() => {
        if (!companiesLoaded)
            dispatch(fetchCompaniesAsync());
    }, [companiesLoaded, dispatch])

    return (
        <Box component={Paper} elevation={3} sx={{m: 5, p: 4}}>
            <Typography variant="h4" gutterBottom sx={{color: 'gray', mb: 4}}>
                Podaci o administratoru
            </Typography>
            <Box component="form"
                noValidate
                onSubmit={handleSubmit((data) => submitForm(data))}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                        <AppTextInput 
                            control={control} 
                            name='name' 
                            label='Ime'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <AppTextInput 
                            control={control} 
                            name='surname' 
                            label='Prezime'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <AppTextInput 
                            control={control}
                            type="email" 
                            name='email' 
                            label='Email'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <AppSelectList3
                            control={control} 
                            label={"Kompanija"} 
                            items={companies} 
                            name={"companyId"}                        
                        />
                    </Grid>     
                </Grid>
                <Box display='flex' justifyContent='flex-end' sx={{mt: 3}}>
                    <LoadingButton 
                        type="submit" 
                        loading={isSubmitting} 
                        variant='contained' 
                        sx={{backgroundColor: '#339966'}} 
                        endIcon={<AddCircleOutlineOutlinedIcon />}>
                            Sačuvaj
                    </LoadingButton>
                </Box>
            </Box>
        </Box>
    )
}

export default RegisterAdminForm;