import { LoadingButton } from "@mui/lab";
import { Container, Paper, Box, Typography, TextField, Divider, Avatar } from "@mui/material";
import { textFieldSx } from "../register/Register";
import { FieldValues, useForm } from "react-hook-form";
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import agent from "../../../app/api/agent";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../app/store/configureStore";
import { showSnackbar } from "../../snackbar/snackbarSlice";

const ResetPassword = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { email, token } = useParams();

    const {register, handleSubmit, formState: {isSubmitting, errors, isValid}, reset} = useForm({
        mode: 'onTouched'
    });

    async function submitForm(data: FieldValues) {
            const resetPasswordData = {
                email: email, 
                token: token,
                newPassword: data.newPassword
            };
            try {
                await agent.Account.resetPassword(resetPasswordData);
                reset();
                dispatch(showSnackbar("Uspješno ste resetovali Vašu lozinku!"));
                navigate('/login');               
            } catch (error: any) {
                console.log("Greška sa backend-a:", error);
            }
    }
    

    return (
        <Container component={Paper} elevation={6} maxWidth='sm' sx={{ mt: 5, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' mb={4} mt= {3} gap={2}>
                <Avatar sx={{bgcolor: '#339966', width: 50, height: 50}}>
                    <LockResetOutlinedIcon fontSize="large" sx={{color: '#fff'}} />
                </Avatar>
                <Typography variant="h5" sx={{fontWeight: 'bold', color: '#339966'}}>
                    Unesite novu lozinku
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

export default ResetPassword;