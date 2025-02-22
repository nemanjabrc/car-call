import { Box, Typography } from "@mui/material";
import Progress from "../components/progress/Progress";

interface Props {
    message?: string;
}

const LoadingComponent = ({message = 'Učitavanje...'}: Props) => {
    return(
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='80vh'>
            <Box position="relative" width="100px" height="100px">
                <Progress />
            </Box>
            <Box display='flex' justifyContent='center' alignItems='center'>
                <Typography variant='h6' sx={{ color: '#339966', fontWeight: 'light'}}>{message}</Typography>
            </Box>
        </Box>
    )
}

export default LoadingComponent;