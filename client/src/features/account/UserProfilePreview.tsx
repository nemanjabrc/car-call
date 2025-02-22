import { Avatar, AvatarGroup, Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { UserProfile } from "../../app/models/userProfile";
import dayjs from "dayjs";
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';

interface Props {
  profileData: UserProfile | null;
  userRole: string | undefined;
}

const getServiceName = (service: string | undefined) => {
    switch (service) {
        case "EmailService":
            return "Email"
        case "SMSService":
            return "SMS"
        case "WhatsAppService":
            return "WhatsApp"
        default:
            break;
    }
}

const getServiceIcon = (service: string | undefined) => {
    switch (service) {
        case "EmailService":
            return <EmailOutlinedIcon sx={{color: "#4285F4"}} />
        case "SMSService":
            return <SmsOutlinedIcon sx={{color: "#42A5F5"}} /> 
        case "WhatsAppService":
            return <WhatsAppIcon sx={{color: "#25D366"}} /> 
        default:
            break;
    }
}

const getRoleName = (userRole: string | undefined) => {
    switch (userRole) {
        case "Owner":
            return "vlasnik";
        case "Operator":
            return "operater";
        case "Admin":
            return "admin";
        case "SuperAdmin":
                return "superadmin";
        default:
            break;
    }
}

const UserProfilePreview = ({profileData, userRole}: Props) => {

    const creationDate = dayjs(profileData?.creationDate);

    return(
        <Box display='flex' justifyContent='center' alignItems='center' ml={5} mr={3}>
            <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Box display='flex' justifyContent='start' alignItems='center' gap={4}>
                            <Avatar
                                sx={{ width: 150, height: 150, bgcolor: '#99ddb3' }}
                            >
                                <Typography 
                                    sx={{
                                        position: 'absolute',
                                        bottom: 20,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        color: '#fff',
                                    }}
                                >
                                    {getRoleName(userRole)}
                                </Typography>
                                <PersonOutlineOutlinedIcon sx={{ fontSize: '90px'}}/>
                            </Avatar>
                            <Box display='flex' flexDirection='column' justifyContent='center' gap={1.5}>
                                <Box>
                                    <Typography variant="h3" fontWeight='bold' color='#339966'>
                                        @{profileData?.username}
                                    </Typography>
                                </Box>
                                <Box display='flex' justifyContent='start' alignItems='center' gap={1.5}>
                                    <Typography variant="h4" color="gray">
                                        {profileData?.name}
                                    </Typography>
                                    <Typography variant="h4" color="gray">
                                        {profileData?.surname}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <Tooltip 
                                title="Uredi"
                                sx={{
                                    backgroundColor: "#339966", 
                                    color: "#fff", 
                                }} 
                            >
                                <IconButton 
                                    size="large" 
                                    sx={{ 
                                        backgroundColor: "lightgray", 
                                        color: "#fff", 
                                        "&:hover": { 
                                            backgroundColor: "#339966", 
                                            color: "#fff" 
                                        } 
                                    }} 
                                >
                                    <EditOutlinedIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <Box display='flex' flexDirection='column' justifyContent='start' mt={10}>
                        <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                            <EmailOutlinedIcon />
                            <Typography variant="h6" color="gray">
                                {profileData?.email}
                            </Typography>
                        </Box>
                        {profileData?.companyName && (
                            <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                                <BusinessOutlinedIcon />
                                <Typography variant="h6">
                                    {profileData.companyName}
                                </Typography>
                            </Box>
                        )}
                        <Box display='flex' flexDirection='column' gap={2}> 
                            {userRole === "Owner" && (
                                <>
                                    <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                                        <LocalPhoneOutlinedIcon />
                                        <Typography variant="h6">
                                            {profileData?.phoneNumber}
                                        </Typography>
                                    </Box>
                                    
                                    <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                                        {profileData?.numberOfVehicles! > 0 ? (
                                            <AvatarGroup total={profileData?.numberOfVehicles}>
                                                <Avatar>
                                                    <DirectionsCarFilledOutlinedIcon />
                                                </Avatar>
                                            </AvatarGroup>
                                        ): (
                                            <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                                                <InfoOutlinedIcon />
                                                <Typography variant="h6">
                                                    Nema dodatih vozila.
                                                </Typography>
                                            </Box>
                                        )}
                                    </Box>
                                    <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                                        {getServiceIcon(profileData?.notificationService)}
                                        <Typography variant="h6">
                                            {getServiceName(profileData?.notificationService)}
                                        </Typography>
                                    </Box>
                                </>
                            )}
                        </Box>
                        <Box position='absolute' bottom={20}>
                            <Typography variant="body2" color="gray">
                                Nalog kreiran {creationDate.format('DD.MM.YYYY')}.
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default UserProfilePreview;