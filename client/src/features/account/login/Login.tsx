import "../login/login.styles.css";
import { Avatar, Box, Container, Divider, Paper, TextField, Typography } from "@mui/material";
import { LoadingButton } from '@mui/lab';
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../app/store/configureStore";
import { logInUser } from "../accountSlice";
import { setVehicle } from "../../vehicles/vehiclesSlice";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';

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

const Login = () => {
    const dispatch = useAppDispatch();

    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}} = useForm({
        mode: 'onTouched'
    });

    async function submitForm(data: FieldValues) {
        try {
            await dispatch(logInUser(data)).unwrap();

            dispatch(setVehicle());
        } catch (error: any) {
            console.log(error.data?.message); 
            if (error.status === 401){
                const message = error.data?.message || "401";

                if (message.includes("nije pronadjen")) {
                    setError('username', {
                        type: 'manual',
                        message: message
                    });
                } else if (message.includes("Pogrešna lozinka!")) {
                    setError('password', {
                        type: 'manual',
                        message: message
                    });
                } else {
                    console.error("Neočekivana greška: ", error);
                }
            }
        }
    }

    return (
        <Container component={Paper} elevation={6} maxWidth='sm' sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 4, mt: 3, gap: 2}}>
                <Avatar sx={{bgcolor: '#339966', width: 50, height: 50}}>
                    <PersonOutlineOutlinedIcon fontSize="large" sx={{color: '#fff'}} />
                </Avatar>
                <Typography variant="h4" sx={{fontWeight: 'bold', color: '#339966'}}>Prijavi se</Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap={1} width={350}>
                    <TextField 
                    margin="normal" 
                    fullWidth 
                    label="Korisničko ime" 
                    autoFocus
                    {...register('username', {required: 'Unesite korisničko ime.'})} 
                    error={!!errors.username}
                    helperText={errors?.username?.message as string}
                    sx={textFieldSx}
                    />

                    <TextField 
                    margin="normal" 
                    fullWidth 
                    type="password"
                    label="Lozinka"
                    {...register('password', {required: 'Unesite lozinku.'})}
                    error={!!errors.password}
                    helperText={errors?.password?.message as string} 
                    sx={textFieldSx}
                    />
                </Box>
                <Box sx={{mb: 4, mt: 4}}>
                    <LoadingButton 
                    type="submit" 
                    className="submit" 
                    variant="contained" 
                    loading={isSubmitting}
                    disabled={!isValid}
                    sx={{backgroundColor: '#339966'}}
                    >
                        Prijavi se
                    </LoadingButton>
                </Box>
                <Divider />
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 4}}>
                    <Typography>Nemate nalog?</Typography>
                    <Link to='/register' className="signup-link">
                        {'Registruj se'}
                    </Link>
                </Box>
            </Box>
        </Container>

    )
}

export default Login;
