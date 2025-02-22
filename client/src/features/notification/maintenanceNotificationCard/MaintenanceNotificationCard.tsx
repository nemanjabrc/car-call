import { Box, Button, CardActions, CardContent, Paper, Typography } from "@mui/material";
import "../maintenanceNotificationCard/maintenanceNotificationCard.styles.css";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import RepeatOutlinedIcon from '@mui/icons-material/RepeatOutlined';
import { MaintenanceNotification } from "../../../app/models/maintenanceNotification";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import DeleteNotificationDialog from "../DeleteNotificationDialog";

interface Props {
    notification: MaintenanceNotification;
}

const MaintenanceNotificationCard = ({notification}: Props) => {
    
    const dateOfNotification = dayjs(notification.dateOfNotification);

    return (
        <Box className="maintenace-notification-card-box" sx={{ maxWidth: 250 }}>
            <Box display='flex' flexDirection='column' justifyContent='start' alignItems='start'>
                <Box display='flex' justifyContent='start' alignItems='center'>
                    <Typography gutterBottom variant="h5" color="#339966" fontWeight='bold'>Podsjetnik za održavanje</Typography>
                    <NotificationsActiveOutlinedIcon sx={{color: "#339966"}} />
                </Box>
                <Box>
                    <Typography variant="body1" color="grey">
                        {dateOfNotification.format('DD.MM.YYYY')}.
                    </Typography>
                    {notification.repetitive ? (
                        <Box display='flex' alignItems='center' gap={1}>
                            <RepeatOutlinedIcon fontSize="small" sx={{color: '#339966'}} />
                            <Typography variant="body2" color="grey">
                                (svakih {notification.numberOfDays} dana)
                            </Typography>
                        </Box>        
                    ) : (
                        <Typography variant="body2" color="grey">
                            (jednokratno)
                        </Typography>
                    )}
                </Box>
            </Box>
            <CardContent>
                <Box component={Paper} sx={{p: 0.5}}>
                    <Typography variant="caption" color="grey" className="text-truncate">
                        {notification.message}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: -0.5}}>
                <Button
                    component={Link}
                    to={`/vehiclemaintenancenotification/${notification.id}`}
                    sx={{
                    backgroundColor: '#339966',
                    color: '#fff',
                    }}
                >
                    Otvori
                </Button>
                <DeleteNotificationDialog notificationId={notification.id} notificationMessage={notification.message} />
            </CardActions>
        </Box>
    )
}

export default MaintenanceNotificationCard;