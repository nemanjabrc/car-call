import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { showSnackbar } from "../snackbar/snackbarSlice";
import { LoadingButton } from "@mui/lab";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { setOperator } from "./operatorSlice";

const textFieldSx = {
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
            borderColor: '#339966',
        },
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: '#339966',
    },
};

const RegisterOperatorForm = () => {

    const dispatch = useAppDispatch();

    const {register, handleSubmit, reset, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'onTouched'
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
            await agent.Account.registerOperator(data);
            dispatch(setOperator());
            reset();
            dispatch(showSnackbar("Uspješno ste dodali novog operatera."));
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

    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{color: 'gray', mb: 4}}>
                Podaci o operateru
            </Typography>
            <Box component="form"
                noValidate
                onSubmit={handleSubmit((data) => submitForm(data))}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            margin="normal"
                            autoFocus
                            fullWidth
                            label="Ime"
                            {...register('name', {required: 'Unesite ime.'})}
                            error={!!errors.name}
                            helperText={errors?.name?.message as string}
                            sx={textFieldSx}                          
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Prezime"
                            {...register('surname', {required: 'Unesite prezime.'})}
                            error={!!errors.surname}
                            helperText={errors?.surname?.message as string}
                            sx={textFieldSx}                          
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Email"
                            {...register('email', 
                                {
                                    required: 'Unesite email.',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})*$/,
                                        message: 'Email adresa nije validna.'
                                    }
                            })}
                            error={!!errors.email}
                            helperText={errors?.email?.message as string}
                            sx={textFieldSx}                          
                        />
                    </Grid>
                </Grid>
                <Box display='flex' justifyContent='flex-end' sx={{mt: 3}}>
                    <LoadingButton 
                        type="submit" 
                        loading={isSubmitting} 
                        disabled={!isValid} 
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

export default RegisterOperatorForm;