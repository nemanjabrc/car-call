import "../home/homePage.styles.css";
import { Box, Grid, Paper, Step, StepLabel, Stepper, Tooltip, Typography } from "@mui/material";
import carCallLogo from "../../assets/images/carcall-icon.png";
import loopPattern from "../../assets/images/carlogo-pattern.png";
import smallCarCallLogo from "../../assets/images/car-call-logo-small-01.png"
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import dayjs from "dayjs";

const steps = [
    <Box display='flex' justifyContent='center' alignItems='center' gap={1}>
        <HowToRegOutlinedIcon sx={{color: '#fff'}} />
        <Typography variant="h6" color="#fff">
            Registruj se
        </Typography>
    </Box>,
    <Box display='flex' justifyContent='center' alignItems='center' gap={1}>
        <AddCircleOutlineOutlinedIcon sx={{color: '#fff'}} />
        <Typography variant="h6" color="#fff">
            Dodaj vozilo
        </Typography>
    </Box>,
    <Box display='flex' justifyContent='center' alignItems='center' gap={1}>
        <NotificationsActiveOutlinedIcon sx={{color: '#fff'}} />
        <Typography variant="h6" color="#fff">
            Očekuj podsjetnik
        </Typography>
    </Box>
]

const HomePage = () => {

    const currentYear = dayjs().year();

    return(
        <Grid container rowSpacing={0} spacing={0} sx={{width: "100%", maxWidth: "100%", bgcolor: '#F8F8F8'}}>
            <Grid item xs={12} sm={6} mt={2}>
                <Box 
                    component="img"
                    src={carCallLogo}
                    alt="Logo"
                    sx={{
                    width: 'auto', 
                    height: '55vh',    
                    maxWidth: '55vh', 
                    objectFit: 'contain',
                    ml: 22,
                    mt: 3
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h1" sx={{fontWeight: 'bold', color: '#339966', mt: 10}}>
                    carcall
                </Typography>
                <Typography variant="h5" sx={{fontWeight: 'bold', color: '#888888'}}>
                    Dobro došli u carcall!
                </Typography>
                <Typography variant="body1" sx={{color: 'gray', textAlign: 'justify', mr: 10}}>
                    Aplikacija koja omogućava praćenje važnih datuma i obaveza vezanih za Vaša vozila, kao što su registracija i godišnji servisi. Kreirajte profil, 
                    dodajte vozila i dobijajte automatske podsjetnike putem SMS-a, Email-a ili WhatsApp-a kako biste bili sigurni da ćete izvršiti Vaše obaveze na vrijeme.
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} mt={5}>
                <Box display='flex' flexDirection='column' justifyContent='center' alignItems='start' gap={10} sx={{bgcolor: '#339966'}} p={5}>
                    <Stepper 
                        alternativeLabel 
                        sx={{
                            width: '100%',
                            '& .MuiStepLabel-label': { 
                                color: 'white', 
                                fontSize: '1.5rem'
                            },
                            '& .MuiStepIcon-root': { 
                                color: '#339966 !important', 
                                width: '50px',
                                height: '50px',
                                fontSize: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            },
                            '& .MuiStepConnector-line': { 
                                borderColor: 'white', 
                                borderWidth: 1.5, 
                                minWidth: '100px' 
                            }
                        }}
                    >
                        {steps.map((label, idx) => (
                            <Step key={idx}>
                                <StepLabel StepIconProps={{ sx: { color: '#339966 !important' } }}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <Box display='flex' justifyContent='space-between' alignItems='center' width="100%" pl={4} pr={4}>
                        <Box>
                            <Box display='flex' justifyContent='start' alignItems='center' gap={2}>
                                <CheckCircleOutlineOutlinedIcon sx={{color: '#fff'}} />
                                <Typography variant="h6" sx={{ color: '#fff' }}>
                                    Mogućnost dodavanja više vozila na jedan profil
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='start' alignItems='center' gap={2}>
                                <CheckCircleOutlineOutlinedIcon sx={{color: '#fff'}} />
                                <Typography variant="h6" sx={{ color: '#fff' }}>
                                    Mogućnost dodavanja dodatnih podsjetnika
                                </Typography>
                            </Box>
                            <Box display='flex' justifyContent='start' alignItems='center' gap={2}>
                                <CheckCircleOutlineOutlinedIcon sx={{color: '#fff'}} />
                                <Typography variant="h6" sx={{ color: '#fff' }}>
                                    Pravovremene notifikacije putem odabranog servisa
                                </Typography>
                            </Box>
                        </Box>
                        <Box component={Paper} display='flex' flexDirection='column' justifyContent='center' alignItems='center' p={1.3} gap={2}>
                            <Tooltip title="Email" placement="left">
                                <EmailOutlinedIcon fontSize="large" sx={{color: '#D14836'}} />
                            </Tooltip>
                            <Tooltip title="SMS" placement="left">
                                <SmsOutlinedIcon fontSize="large" sx={{color: '#42A5F5'}} />    
                            </Tooltip>
                            <Tooltip title="WhatsApp" placement="left">
                                <WhatsAppIcon fontSize="large" sx={{color: '#25D366'}} />
                            </Tooltip>                            
                        </Box>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <Box 
                    className="looping-background"
                    sx={{
                        width: "100%",
                        height: "350px",
                        backgroundImage: `url(${loopPattern})`,
                        backgroundSize: "auto",
                        backgroundRepeat: "repeat"
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
                <footer>
                    <Box display='flex' justifyContent='space-between' alignItems='center' sx={{
                        backgroundColor: '#666666', 
                        padding: '1.5rem',
                        textAlign: 'center'
                    }}>
                        <Box 
                            component="img"
                            src={smallCarCallLogo}
                            alt="Logo"
                            sx={{
                            width: 'auto', 
                            height: '10vh',    
                            maxWidth: '10vh', 
                            objectFit: 'contain',
                            }}
                        />
                        <Typography variant="body1" sx={{color: '#fff'}}>
                            © {currentYear} carcall
                        </Typography>
                        <Box display='flex' justifyContent='center' alignItems='center' gap={1}>
                            <EmailOutlinedIcon fontSize="small" sx={{color: '#fff'}} />
                            <Typography variant="body2" sx={{color: '#fff'}}>
                                carcall101@gmail.com
                            </Typography>
                        </Box>
                    </Box>
                </footer>
            </Grid>
        </Grid>
    )
}

export default HomePage;