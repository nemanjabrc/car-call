import { Typography, Grid, Paper, Box, Button, Snackbar, Alert } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Company } from "../../app/models/company";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { setCompany } from "./companySlice";
import { LoadingButton } from "@mui/lab";
import {yupResolver} from '@hookform/resolvers/yup';
import { validationCompanySchema } from "./companyValidation";

interface Props {
    company?: Company;
    exitEditMode?: () => void;
    editMode?: boolean;
    refreshCompanies?: () => void;
}

const CompanyForm = ({company, exitEditMode = () => {}, editMode = false, refreshCompanies = () => {}}: Props) => {

    const { control, reset, handleSubmit, formState: { isSubmitting} } = useForm({
        resolver: yupResolver<any>(validationCompanySchema)
    });

    const [successAlert, setSuccessAlert] = useState(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
      if (company) 
        reset(company);
    }, [company, reset])

    async function handleSubmitData(data: FieldValues) {
        try {
            if (company) {
                await agent.Company.updateCompany(data);
            } else {
                await agent.Company.addCompany(data);
            }

            dispatch(setCompany());
            refreshCompanies();

            if(editMode) {
                exitEditMode();
            } else {
                reset();
            }

            setSuccessAlert(true);
            
        } catch (error: any) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} elevation={3} sx={{m: 5, p: 4}}>
            <Typography variant="h4" gutterBottom sx={{color: 'gray', mb: 4}}>
                Podaci o kompaniji
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Ime'/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} name='address' label='Adresa' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} name='phoneNumber' label='Broj telefona' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} name='email' label='Email adresa' type="email" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} name='city' label='Grad' />
                    </Grid>
                </Grid>
                {editMode ? (
                    <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                        <Button variant='outlined' sx={{color: '#339966', borderColor: '#339966'}} onClick={exitEditMode}>Odustani</Button>
                        <LoadingButton type="submit" loading={isSubmitting} variant='contained' sx={{backgroundColor: '#339966'}} endIcon={<AddCircleOutlineOutlinedIcon />}>Sačuvaj</LoadingButton>
                    </Box>
                ) : (
                    <Box display='flex' justifyContent='flex-end' sx={{mt: 3}}>
                        <LoadingButton type="submit" loading={isSubmitting} variant='contained' sx={{backgroundColor: '#339966'}} endIcon={<AddCircleOutlineOutlinedIcon />}>Sačuvaj</LoadingButton>
                    </Box>
                )}
            </form>
            <Snackbar open={successAlert} autoHideDuration={5000} onClose={() => setSuccessAlert(false)}>
                <Alert onClose={() => setSuccessAlert(false)} severity="success">
                    Uspješno je dodata nova kompanija!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default CompanyForm;

