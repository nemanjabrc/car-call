import "../register/register.styles.css";
import { Box, Container, Divider, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import { Link, useNavigate } from "react-router-dom";
import agent from "../../../app/api/agent";
import { useAppDispatch } from "../../../app/store/configureStore";
import { showSnackbar } from "../../snackbar/snackbarSlice";


export const textFieldSx = {
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

const Register = () => {

    const navigate = useNavigate();
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
                else if(key == "DuplicateUserName" && errors[key][0].includes("is already taken.")) {
                    setError('username', {type: 'manual', message: 'Korisničko ime je zauzeto.'})
                }
            });
        }
    }
    
    const submitForm = async (data: any) => {
        if (data.phoneNumber && data.phoneNumber.startsWith('0')) {
            data.phoneNumber = '+387' + data.phoneNumber.slice(1);
        }
        try {
            await agent.Account.register(data);
            reset();
            dispatch(showSnackbar("Uspješno ste se registrovali!"))
            navigate('/login');
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
        <Container component={Paper} elevation={6} maxWidth='md' sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box display='flex' justifyContent='center' alignItems='center' gap={2} mb={4} mt={2}>
                <Typography variant="h4" color="#339966" fontWeight="bold">
                    Registruj se
                </Typography>
                <HowToRegOutlinedIcon fontSize="large" sx={{color: '#339966'}} />
            </Box>
           <Box component="form"
                noValidate
                onSubmit={handleSubmit((data) => submitForm(data))}
           >
                {/* Ime i prezime */}
                <Box display='flex' justifyContent='center' alignItems='center' gap={2} width={700}>
                    <TextField 
                        margin="normal" 
                        fullWidth 
                        label="Ime"
                        autoFocus
                        {...register('name', {required: 'Unesite ime.'})}
                        error={!!errors.name}
                        helperText={errors?.name?.message as string}
                        sx={textFieldSx}
                    /> 
                    <TextField 
                        margin="normal" 
                        fullWidth 
                        label="Prezime"
                        {...register('surname', {required: 'Unesite prezime.'})}
                        error={!!errors.surname}
                        helperText={errors?.surname?.message as string}
                        sx={textFieldSx}
                    /> 
                </Box>

                {/* Email i broj telefona */}
                <Box display='flex' justifyContent='center' alignItems='center' gap={2} width={700}>
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

                </Box>

                {/* Korisničko ime i lozinka */}
                <Box display='flex' justifyContent='center' alignItems='center' gap={2} width={700}>
                    <TextField 
                        margin="normal" 
                        fullWidth 
                        label="Korisničko ime"
                        {...register('username', {
                            required: 'Unesite korisničko ime.',
                            pattern: {
                                value: /^[a-zA-Z0-9]+$/,
                                message: 'Dozvoljena su samo slova alfabeta.'
                            }
                        })} 
                        error={!!errors.username}
                        helperText={errors?.username?.message as string}
                        sx={textFieldSx}
                    /> 
                    <TextField 
                        margin="normal" 
                        fullWidth 
                        type="password"
                        label="Lozinka"
                        {...register('password', { 
                            required: 'Unesite lozinku.',
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+:;'?>.<])[A-Za-z\d!@#$%^&*()_+:;'?>.<]{6,10}$/,
                                message: 'Lozinka mora imati najmanje 6, a najviše 10 karaktera. Od toga mora biti bar jedan broj, jedno veliko slovo, jedno malo slovo i jedan specijalni karakter.'
                            } 
                        })}
                        error={!!errors.password}
                        helperText={errors?.password?.message as string}
                        sx={textFieldSx}
                    /> 
                </Box>

                {/* Izbor servisa */}
                <Box display='flex' justifyContent='center' alignItems='center' gap={2} width={700} mt={2}>
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
                </Box>
                <Box sx={{mb: 2, mt: 2}}>
                    <LoadingButton
                        loading={isSubmitting}
                        disabled={!isValid}
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{backgroundColor: '#339966', mt: 3}}
                    >
                        Registruj se
                    </LoadingButton>
                </Box>
                <Divider />
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 1}}>
                    <Typography>Već imate nalog?</Typography>
                    <Link to='/login' className="login-link">
                        {'Prijavi se'}
                    </Link>
                </Box>
           </Box>
        </Container>
    )
}

export default Register;