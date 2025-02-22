import { Box, Divider, Grid, Paper, Typography } from "@mui/material";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useParams } from "react-router-dom";
import { fetchRegistrationNotificationAsync, registrationNotificationSelector } from "./notificationSlice";
import { useEffect } from "react";
import dayjs from "dayjs";
import LoadingComponent from "../../app/layout/LoadingComponent";

const RegistrationNotificationDetails = () => {

    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    const {vehicleId} = useParams<{vehicleId: string}>();
    const notification = useAppSelector(state => registrationNotificationSelector.selectById(state, parseInt(id!)));

    useEffect(() => {
        if(!notification && vehicleId) {
            dispatch(fetchRegistrationNotificationAsync(parseInt(vehicleId)));
        }
    }, [vehicleId, notification, dispatch])

    if(!notification)
        return <LoadingComponent message="Učitavanje notifikacije..." />

    const dateOfExpiration = dayjs(notification.dateOfExpiration);

    return (
        <Box display='flex' flexDirection='column'>
            <Box display='flex' justifyContent='start' alignItems='center' gap={2} mb={2}>
                <Typography variant="h4" fontWeight='bold' color="#339966">
                    Podsjetnik za registraciju
                </Typography>
                <NotificationsActiveOutlinedIcon fontSize="large" sx={{color: "#339966"}} /> 
            </Box>
            <Divider />
            <Box display='flex' justifyContent='center' alignItems='center' mt={5}>
                <Grid container spacing={10}>
                    <Grid item xs={12} sm={6} md={6}>
                        <Box display='flex' flexDirection='column'>
                            <Box component={Paper} p={5} sx={{bgcolor: '#EEEEEE'}}>
                                <Typography gutterBottom variant="h6" color="#339966">
                                    Poruka:
                                </Typography>
                                <Typography variant="body1" color="#666666">
                                    {notification.message}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" color="grey">
                                    *Podsjetnik za registraciju ne može biti promijenjen niti obrisan.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant="h6" fontWeight='bold' color="#339966">
                                Registracija ističe {dateOfExpiration.format('DD.MM.YYYY')}.
                            </Typography>
                            <Typography variant="body1" fontWeight='bold' color="#666666">
                                Obnovu registracije vozila moguće je izvršiti već 30 dana prije
                                isteka važenja tekuće registracije.
                            </Typography>
                            <Typography variant="body1" color="#666666">
                                Podsjetnik se prvi put šalje <b>30 dana</b> prije isteka važenja registracije.
                                Ukoliko se u medjuvremenu registracija ne obnovi, podsjetnik će biti poslat ponovo <b>15</b>, 
                                odnosno <b>7 dana</b> prije isteka. Posljednji podsjetnik se šalje <b>1 dan</b> prije
                                isteka važenja registracije.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default RegistrationNotificationDetails;