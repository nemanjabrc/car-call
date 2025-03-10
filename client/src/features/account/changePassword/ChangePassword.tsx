import { Avatar, Box, Container, Divider, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import agent from "../../../app/api/agent";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/configureStore";
import { updateUser } from "../accountSlice";
import { showSnackbar } from "../../snackbar/snackbarSlice";

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

const ChangePassword = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}, reset} = useForm({
        mode: 'onTouched'
    });

    function handleApiErrors(error: any) {
        if(error.response.data.errors) {
            const errors = error.response.data.errors;
            Object.keys(errors).forEach((key) => {
                console.error(`Validation error for ${key}:`, errors[key][0]);

                if(key === "PasswordMismatch" && errors[key][0].includes("Incorrect password.")) {
                    setError('oldPassword', {type: 'manual', message: 'Pogrešna lozinka!'})
                }
            });
        }
    }

    async function submitForm(data: FieldValues) {
        try {
            await agent.Account.changePassword(data);
            dispatch(updateUser({isPasswordTemporary: false}));
            reset();
            dispatch(showSnackbar("Uspješno ste promijenili lozinku!"));
            navigate('/myaccount');
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
        <Container component={Paper} elevation={6} maxWidth='sm' sx={{ mt: 5, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' mb={4} mt= {3} gap={2}>
                <Avatar sx={{bgcolor: '#339966', width: 50, height: 50}}>
                    <LockOutlinedIcon fontSize="medium" sx={{color: '#fff'}} />
                </Avatar>
                <Typography variant="h4" sx={{fontWeight: 'bold', color: '#339966'}}>
                    Promijeni lozinku
                </Typography>
            </Box>
            <Box component="form" 
                noValidate
                onSubmit={handleSubmit((data) => submitForm(data))}    
            >
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={1} mb={2} width={350}>
                    <TextField 
                        margin="normal" 
                        fullWidth
                        type="password"
                        label="Trenutna lozinka" 
                        autoFocus
                        {...register('oldPassword', {required: 'Unesite trenutnu lozinku.'})}
                        error={!!errors.oldPassword}
                        helperText={errors?.oldPassword?.message as string}
                        sx={textFieldSx}
                    />

                    <TextField 
                        margin="normal" 
                        fullWidth 
                        type="password"
                        label="Nova lozinka"
                        {...register('newPassword', {
                            required: 'Unesite novu lozinku.',
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+:;'?>.<])[A-Za-z\d!@#$%^&*()_+:;'?>.<]{6,10}$/,
                                message: 'Lozinka mora imati najmanje 6, a najviše 10 karaktera. Od toga mora biti bar jedan broj, jedno veliko slovo, jedno malo slovo i jedan specijalni karakter.'
                            }
                        })}
                        error={!!errors.newPassword}
                        helperText={errors?.newPassword?.message as string}
                        sx={textFieldSx}
                    />
                </Box>
                <Divider />
                <Box sx={{mb: 4, mt: 2}}>
                    <LoadingButton 
                        type="submit"
                        loading={isSubmitting}
                        disabled={!isValid}
                        fullWidth
                        variant="contained" 
                        sx={{backgroundColor: '#339966'}}
                    >
                        Potvrdi
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    )
}

export default ChangePassword;