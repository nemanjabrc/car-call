import { Box, Typography, Divider, Grid, Paper } from "@mui/material";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchMaintenanceNotificationAsync, maintenanceNotificationSelector } from "./notificationSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import LoadingComponent from "../../app/layout/LoadingComponent";

const MaintenanceNotificationDetails = () => {

    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    const notification = useAppSelector(state => maintenanceNotificationSelector.selectById(state, parseInt(id!)));

    useEffect(() => {
        if(!notification && id) {
            dispatch(fetchMaintenanceNotificationAsync(parseInt(id)));
        }
    }, [id, notification, dispatch])

    if(!notification)
        return <LoadingComponent message="Učitavanje notifikacije..." />

    return (
        <Box display='flex' flexDirection='column' sx={{m: 3}}>
            <Box display='flex' justifyContent='start' alignItems='center' gap={2} mb={2}>
                <Typography variant="h4" fontWeight='bold' color="#339966">
                    Podsjetnik za održavanje
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
                                    *Ovaj podsjetnik ne može biti promijenjen. Ukoliko ste napravili neku grešku, možete da ga obrišete i kreirate novi.
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant="h6" fontWeight='bold' color="#666666">
                                Postavljen {dayjs(notification.startDate).format('DD.MM.YYYY')}.
                            </Typography>
                            <Typography variant="h6" fontWeight='bold' color="#339966">
                                Podsjetnik će biti poslat {dayjs(notification.dateOfNotification).format('DD.MM.YYYY')}.
                            </Typography>
                            {notification.repetitive ? (
                                <Box>
                                    <Typography gutterBottom variant="h6" color="#666666">
                                        (za {notification.numberOfDays} dana)
                                    </Typography>
                                    <Box display='flex' alignItems='center' gap={1}>
                                        <RepeatOutlinedIcon sx={{color: '#339966'}} />
                                        <Typography variant="body1" color="#666666">
                                            Ovaj podsjetnik se šalje svakih {notification.numberOfDays} dana sa početkom od {dayjs(notification.startDate).format('DD.MM.YYYY')}.
                                        </Typography>
                                    </Box>
                                </Box>
                            ) : (
                                <Box>
                                <Typography gutterBottom variant="h6" color="#666666">
                                    (jednokratno)
                                </Typography>
                                <Box display='flex' alignItems='center' gap={1}>
                                    <InfoOutlinedIcon sx={{color: '#339966'}} />
                                    <Typography variant="body1" color="#666666">
                                        Nakon slanja, ovaj podsjetnik se briše.
                                    </Typography>
                                </Box>
                            </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default MaintenanceNotificationDetails;