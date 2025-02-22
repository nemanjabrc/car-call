import { Box, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useAppDispatch } from "../../app/store/configureStore";
import { LoadingButton } from "@mui/lab";
import agent from "../../app/api/agent";
import { showSnackbar } from "../snackbar/snackbarSlice";

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

const radioGroupSx = {
    '& .MuiFormLabel-root': {
        color: 'gray', 
        '&.Mui-focused': {
            color: '#339966', 
        },
    },
    '& .MuiRadio-root': {
        color: '#339966', 
        '&.Mui-checked': {
            color: '#339966',
        },
    },
    '& .MuiFormControlLabel-root': {
        '& .MuiRadio-root': {
            marginRight: '3px',
        },
    },
    '&:focus-within .MuiFormLabel-root': {
        color: '#339966',
    }
}

const RegisterOwnerForm = () => {

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
        if (data.phoneNumber && data.phoneNumber.startsWith('0')) {
            data.phoneNumber = '+387' + data.phoneNumber.slice(1); 
        }

        try {
            await agent.Account.registerOwner(data);
            reset();
            dispatch(showSnackbar("Uspješno ste dodali novog vlasnika!"));
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
            <Typography variant="h4" gutterBottom sx={{color:  'gray', mb: 4}}>
                Podaci o vlasniku
            </Typography>
            <Box component="form"
                noValidate
                onSubmit={handleSubmit((data) => submitForm(data))}
            >
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField 
                            margin="normal"
                            fullWidth
                            autoFocus
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
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField 
                            margin="normal" 
                            fullWidth 
                            type="email"
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
                    <Grid item xs={12} sm={6} md={6}>
                        <TextField 
                            margin="normal" 
                            fullWidth 
                            label="Broj telefona"
                            {...register('phoneNumber', 
                                {
                                    required: 'Unesite broj telefona.',
                                    pattern: {
                                        value: /^(\+387|0)[67]\d{7}$/,
                                        message: 'Unesite validan broj telefona.'
                                    }
                            })}
                            error={!!errors.phoneNumber}
                            helperText={errors?.phoneNumber?.message as string}
                            sx={textFieldSx}
                        /> 
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <FormControl
                        fullWidth
                        sx={radioGroupSx}
                        >
                            <FormLabel>Servis za notifikacije</FormLabel>
                            <RadioGroup 
                                defaultValue='EmailService'
                                row 
                                sx={{gap: 5}}
                            >
                                <FormControlLabel {...register('notificationService')} value="EmailService" control={<Radio />} 
                                    label={
                                        <Box display='flex' justifyContent='center' alignItems='center' gap={1} sx={{color: '#666666'}}>
                                            <EmailOutlinedIcon sx={{color: "#4285F4"}} />
                                            Email
                                        </Box>
                                    } 
                                />
                                <FormControlLabel {...register('notificationService')} value="SMSService" control={<Radio />} 
                                    label={
                                        <Box display='flex' justifyContent='center' alignItems='center' gap={1} sx={{color: '#666666'}}>
                                            <SmsOutlinedIcon sx={{color: "#42A5F5"}} />
                                            SMS
                                        </Box>
                                    } 
                                />
                                <FormControlLabel {...register('notificationService')} value="WhatsAppService" control={<Radio />} 
                                    label={
                                        <Box display='flex' justifyContent='center' alignItems='center' gap={1} sx={{color: '#666666'}}>
                                            <WhatsAppIcon sx={{color: "#25D366"}} />
                                            WhatsApp
                                        </Box>
                                    }     
                                />
                            </RadioGroup>
                        </FormControl>
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

export default RegisterOwnerForm;