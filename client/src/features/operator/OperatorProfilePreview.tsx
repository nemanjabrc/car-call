import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchOperatorAsync, operatorSelectors } from "./operatorSlice";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import dayjs from "dayjs";
import DeleteOperatorDialog from "./DeleteOperatorDialog";

const OperatorProfilePreview = () => {

    const dispatch = useAppDispatch();
    const {id} = useParams<{id: string}>();
    const operator = useAppSelector(state => operatorSelectors.selectById(state, id!));
    const {operatorLoaded} = useAppSelector(state => state.operator);

    useEffect(() => {
        if(!operator && id || operatorLoaded == false) {
            dispatch(fetchOperatorAsync(id!));
        }
    }, [id, operator, operatorLoaded, dispatch]);


    if(!operator)
        return <LoadingComponent message="Učitavanje profila operatera..." />
    
    const creationDate = dayjs(operator.creationDate);
    
    return (
        <Box display='flex' justifyContent='center' alignItems='center' sx={{p: 4}}>
             <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                        <Box display='flex' justifyContent='start' alignItems='center' gap={4}>
                            <Avatar
                                sx={{ width: 150, height: 150, bgcolor: '#99ddb3' }}
                            >
                                <Typography variant="h2" sx={{color: '#fff'}}>
                                    {operator.name[0].toUpperCase()}{operator.surname[0].toUpperCase()}
                                </Typography>
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
                                    operater
                                </Typography>
                            </Avatar>
                            <Box display='flex' flexDirection='column' justifyContent='center' gap={1.5}>
                                <Box>
                                    <Typography variant="h3" fontWeight='bold' color='#339966'>
                                        @{operator.username}
                                    </Typography>
                                </Box>
                                <Box display='flex' justifyContent='start' alignItems='center' gap={1.5}>
                                    <Typography variant="h4" color="gray">
                                        {operator.name}
                                    </Typography>
                                    <Typography variant="h4" color="gray">
                                        {operator.surname}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box>
                            <DeleteOperatorDialog userId={operator.id} username={operator.username} name={operator.name} surname={operator.surname} /> 
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={6} md={6}>
                    <Box display='flex' flexDirection='column' justifyContent='start' mt={10}>
                        <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                            <EmailOutlinedIcon />
                            <Typography variant="h6" color="gray">
                                {operator.email}
                            </Typography>
                        </Box>
                        <Box display='flex' justifyContent='start' alignItems='center' gap={2} color='gray'>
                            <BusinessOutlinedIcon />
                            <Typography variant="h6">
                                {operator.companyName}
                            </Typography>
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

export default OperatorProfilePreview;