import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchOwnersAsync, ownerSelectors } from "./ownerSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Box, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Avatar, Button } from "@mui/material";
import { Link } from "react-router-dom";

const OwnersList = () => {

    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.account);
    const userCompanyId = user?.companyId;

    const owners = useAppSelector(ownerSelectors.selectAll);
    const {ownersLoaded} = useAppSelector(state => state.owner);

    useEffect(() => {
        if(!ownersLoaded) {
            dispatch(fetchOwnersAsync(userCompanyId!));
        }
    }, [ownersLoaded, dispatch, userCompanyId]);   

    if(!ownersLoaded)
        return <LoadingComponent message="Učitavanje vlasnika..." />

    return (
        <>
            <Box display='flex' flexDirection='column' justifyContent='space-between'>
                <Typography variant="h4" gutterBottom sx={{color: 'gray', mb: 4}}>
                    Vlasnici
                </Typography>
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
                            {owners.map((owner) => (
                                <TableRow
                                    key={owner.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{color: 'gray'}} component="th" scope="row">
                                        <Avatar sx={{ bgcolor: '#99ddb3' }}>
                                            {owner.name[0].toUpperCase()}{owner.surname[0].toUpperCase()}
                                        </Avatar>
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="left">
                                        <Box display='flex' alignItems='center'>
                                            <span>{owner.name}</span>
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        {owner.surname}
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        @{owner.username}
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        {owner.email}
                                    </TableCell>
                                    <TableCell sx={{color: 'gray'}} align="center">
                                        <Button 
                                            component={Link}
                                            to={`/owners/${owner.id}`}
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

export default OwnersList;