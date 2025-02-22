import { Box, Grid, Typography } from "@mui/material";
import carCallLogo from "../../assets/images/carcall-icon.png";


const HomePage = () => {
    return(
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <Box 
            component="img"
            src={carCallLogo}
            alt="Logo"
            sx={{
            width: 'auto', 
            height: '75vh',    
            maxWidth: '75vh', 
            objectFit: 'contain',
            ml: 12,
            mt: 3
            }}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
                <Typography variant="h1" sx={{fontWeight: 'bold', color: '#339966'}}>carcall</Typography>
                <Typography variant="body1" sx={{color: 'grey'}}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Hic, aut in facere doloribus possimus laborum molestiae sapiente quo dolor, 
                    maxime autem velit deleniti incidunt sunt soluta similique nobis natus harum.
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                    Hic, aut in facere doloribus possimus laborum molestiae sapiente quo dolor, 
                    maxime autem velit deleniti incidunt sunt soluta similique nobis natus harum.
                </Typography>
            </Grid>
        </Grid>
    )
}

export default HomePage;