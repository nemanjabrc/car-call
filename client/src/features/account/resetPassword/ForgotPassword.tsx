import { LoadingButton } from "@mui/lab";
import { Container, Paper, Box, Typography, TextField, Divider } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import agent from "../../../app/api/agent";
import { toast } from "react-toastify";

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

const ForgotPassword = () => {

    const {register, handleSubmit, setError, formState: {isSubmitting, errors, isValid}, reset} = useForm({
        mode: 'onTouched'
    });

    async function submitForm(data: FieldValues) {
        try {
            await agent.Account.forgotPassword(data);
            reset();
            toast.success(`Link je poslat na email ${data.email}`, {
                autoClose: 5000,
                style: { padding: '15px' },
            });
        } catch (error: any) {
            console.log("Greška sa backend-a:", error);

            if (error.response && error.response.data) {
                console.log("Podaci greške:", error.response.data);
                if (error.response.data.message) {
                    setError("email", { type: "manual", message: error.response.data.message });
                }
            } else {
                console.log("Nema odgovora od servera ili nije u očekivanom formatu.");
            }
        }
    }

    return (
        <Container component={Paper} elevation={6} maxWidth='sm' sx={{ mt: 5, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box display='flex' justifyContent='center' alignItems='center' mb={4} mt={3}>
                <Typography variant="body1" sx={{fontWeight: 'bold', color: '#339966'}}>
                    Unesite Email na koji će biti poslat link za resetovanje lozinke
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
                        type="email"
                        label="Email" 
                        autoFocus
                        {...register('email', {required: 'Unesite Vaš email.'})}
                        error={!!errors.email}
                        helperText={errors?.email?.message as string}
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
                        Pošalji link
                    </LoadingButton>
                </Box>
            </Box>
        </Container>
    )
}

export default ForgotPassword;