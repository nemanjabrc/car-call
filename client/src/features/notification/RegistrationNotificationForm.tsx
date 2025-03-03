import { Alert, Box, Grid, Paper, Snackbar, Typography } from "@mui/material";
import AppTextInput from "../../app/components/AppTextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import {useForm } from "react-hook-form";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useAppSelector } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { validationRegistrationNotificationSchema } from "./registrationNotificationValidation";

const RegistrationNotificationForm = () => {

    const [loading, setLoading] = useState(true);
    const [loadedMessage, setLoadedMessage] = useState<string>("");
    const [disabled, setDisabled] = useState(true);
    const [successAlert, setSuccessAlert] = useState(false);

    const {user} = useAppSelector(state => state.account);
    const userCompanyId = user?.companyId;

    const { control, watch, reset, handleSubmit, formState: { isSubmitting} } = useForm({
        resolver: yupResolver<any>(validationRegistrationNotificationSchema)
    });

    const message = watch("message");

    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const response = await agent.Notification.getCompanyRegistrationNotification(userCompanyId!);
                setLoadedMessage(response.message);
                reset({ message: response.message });
            } catch (error) {
                console.error("Greška pri učitavanju notifikacije:", error);
            } finally {
                setLoading(false);
                
            }
        };

        fetchNotification();
    }, [reset]);

    useEffect(() => {
        if(message === loadedMessage) {
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }, [message]);

    const handleSubmitData = async (data: any) => {
        try {
            setLoading(true);
    
            const payload = {
                companyId: userCompanyId,
                message: data.message
            };
    
            await agent.Notification.changeRegistrationNotificationMessage(payload);

            setLoadedMessage(data.message);
            reset({ message: data.message });
            setDisabled(true);
            setSuccessAlert(true);
        } catch (error) {
            console.error("Greška pri ažuriranju notifikacije:", error);
        } finally {
            setLoading(false);
        }
    }

    if(loading) {
        return <LoadingComponent message="Učitavanje podsjetnika..." />
    }

    return (
        <Box component={Paper} elevation={3} sx={{m: 5, p: 4}}>
            <Box display='flex' justifyContent='start' alignItems='center' gap={2} mb={4}>
                <Typography variant="h4" sx={{color: 'gray'}}>
                    Podsjetnik za registraciju
                </Typography>
            </Box>
                <form onSubmit={handleSubmit((data) => handleSubmitData(data))}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <AppTextInput 
                                control={control} 
                                name='message' 
                                label='Poruka' 
                                multiline={true} 
                                rows={7} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body1" color="gray">
                                Ovo je sadržaj podsjetnika za registraciju koji se šalje svim vlasnicima koji pripadaju ovoj kompaniji. 
                                <b> Osim ovoga u uvodu se šalje naslov (Podsjetnik za registraciju ⏰), podaci o vozilu za koje se šalje podsjetnik i 
                                ime i prezime vlasnika kome se šalje.</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display='flex' justifyContent='flex-end' sx={{mt: 3}}>
                                <LoadingButton 
                                    type="submit" 
                                    loading={isSubmitting} 
                                    disabled={disabled}
                                    variant='contained' 
                                    sx={{backgroundColor: '#339966'}} 
                                    endIcon={<AddCircleOutlineOutlinedIcon />}
                                >
                                    Sačuvaj
                                </LoadingButton>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            <Snackbar open={successAlert} autoHideDuration={5000} onClose={() => setSuccessAlert(false)}>
                <Alert onClose={() => setSuccessAlert(false)} severity="success">
                    Uspješno ste promijenili poruku podsjetnika!
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default RegistrationNotificationForm;