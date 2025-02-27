import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchOperatorsAsync, operatorSelectors } from "./operatorSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Avatar, Box, Button, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import OperatorSearch from "./OperatorSearch";
const OperatorsList = () => {

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.account);
    const userCompanyId = user?.companyId;

    const operators = useAppSelector(operatorSelectors.selectAll);
    const {operatorsLoaded} = useAppSelector(state => state.operator);
    
    useEffect(() => {
        if(!operatorsLoaded)
            dispatch(fetchOperatorsAsync(userCompanyId!));
    }, [operatorsLoaded, dispatch, userCompanyId]);

    if(!operators)
        return <LoadingComponent message="Učitavanje operatera..." />

    return (
        <>
            <Box display='flex' flexDirection='column' justifyContent='space-between' sx={{m: 5}}>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant="h4" sx={{color: 'gray'}}>
                        Operateri
                    </Typography>
                    <OperatorSearch />
                </Box>
                <Divider sx={{mt: 1, mb: 2}} />
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead sx={{backgroundColor: '#339966'}}>
                            <TableRow sx={{color: 'white'}}>
                                <TableCell sx={{color: 'white'}}></TableCell>
                                <TableCell sx={{color: 'white'}} align="left">Ime</TableCell>
                                <TableCell sx={{color: 'white'}} align="center">Prezime</TableCell>
                                <TableCell sx={{color: 'white'}} align="center">Korisničko ime</TableCell>
                                <TableCell sx={{color: 'white'}} align="center">Email</TableCell>
                                <TableCell sx={{color: 'white'}} align="left"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {operators.map((operator) => (
                                <TableRow
                                    key={operator.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{color: 'gray'}} component="th" scope="row">
                                        <Avatar sx={{ bgcolor: '#99ddb3' }}>
                                            {operator.name[0].toUpperCase()}{operator.surname[0].toUpperCase()}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="left">
                                        <Box display='flex' alignItems='center'>
                                            <span>{operator.name}</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        {operator.surname}
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        @{operator.username}
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        {operator.email}
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        <Button 
                                            component={Link}
                                            to={`/operators/${operator.id}`}
                                            variant="contained" 
                                            sx={{backgroundColor: '#339966'}}
                                        >
                                            Otvori profil
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> 
                </TableContainer>
            </Box>
        </>
    )
}

export default OperatorsList;