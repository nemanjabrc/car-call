import "../registrationNotificationCard/registrationNotificationCard.styles.css";

import { Box, Button, CardActions, CardContent, Paper, Typography } from "@mui/material";
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { RegistrationNotification } from "../../../app/models/registrationNotification";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Vehicle } from "../../../app/models/vehicle";

interface Props {
    notification: RegistrationNotification[];
    vehicle: Vehicle;
}

const RegistrationNotificationCard = ({notification, vehicle}: Props) => {

    const dateOfExpiration = dayjs(notification[0].dateOfExpiration);

    return (
        <Box className="registration-notification-card-box" sx={{ maxWidth: 250 }}>
            <Box display='flex' flexDirection='column' justifyContent='start' alignItems='start'>
                <Box display='flex' justifyContent='start' alignItems='center'>
                    <Typography gutterBottom variant="h5" color="#339966" fontWeight='bold'>
                        Podsjetnik za registraciju
                    </Typography>
                    <NotificationsActiveOutlinedIcon sx={{color: "#339966"}} />
                </Box>
                <Box>
                    <Typography variant="body1" color="grey">
                        {dateOfExpiration.format('DD.MM.YYYY')}.
                    </Typography>
                </Box>
            </Box>
            <CardContent>
                <Box component={Paper} sx={{p: 0.5}}>
                    <Typography variant="caption" color="grey" className="message-truncate">
                        {notification[0].message}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button
                    component={Link}
                    to={`/vehicleregistrationnotification/${notification[0].id}/${vehicle.id}`}
                    sx={{
                    backgroundColor: '#339966',
                    color: '#fff',
                    }}
                >
                    Otvori
                </Button>

            </CardActions>
        </Box>
    )
}

export default RegistrationNotificationCard;