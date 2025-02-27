import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { companySelectors, fetchCompaniesAsync } from "./companySlice";
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import LoadingComponent from "../../app/layout/LoadingComponent";
import CompanyForm from "./CompanyForm";
import { Company } from "../../app/models/company";

const CompaniesList = () => {

    const companies = useAppSelector(companySelectors.selectAll);
    const {companiesLoaded} = useAppSelector(state => state.company);
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState<Company | undefined>(undefined);

    function handleSelectCompany(company: Company) {
        setSelectedCompany(company);
        setEditMode(true);
    }

    function exitEditMode() {
        if (selectedCompany)
            setSelectedCompany(undefined);
        setEditMode(false);
    }

    function refreshCompanies() {
        dispatch(fetchCompaniesAsync());
    }

    useEffect(() => {
        if (!companiesLoaded)
            dispatch(fetchCompaniesAsync());
    }, [companiesLoaded, dispatch])

    if (editMode)
        return <CompanyForm company={selectedCompany} editMode={editMode} exitEditMode={exitEditMode} refreshCompanies={refreshCompanies} />

    return (
        <>
            {!companiesLoaded ? (
                <LoadingComponent message="Učitavanje kompanija..."/>
            ) : (
                <Box sx={{m: 5}}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant="h4" gutterBottom sx={{color: 'gray', mb: 4}}>Kompanije</Typography>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{backgroundColor: '#339966'}}>
                                <TableRow sx={{color: 'white'}}>
                                    <TableCell sx={{color: 'white'}}>Id</TableCell>
                                    <TableCell sx={{color: 'white'}} align="left">Naziv</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">Broj telefona</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">Email</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">Adresa</TableCell>
                                    <TableCell sx={{color: 'white'}} align="center">Grad</TableCell>
                                    <TableCell sx={{color: 'white'}} align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {companies.map((company) => (
                                    <TableRow
                                        key={company.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell sx={{color: 'gray'}} component="th" scope="row">
                                            {company.id}
                                        </TableCell>
                                        <TableCell sx={{color: 'gray'}} align="left">
                                            <Box display='flex' alignItems='center'>
                                                <span>{company.name}</span>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{color: 'gray'}} align="center">
                                            {company.phoneNumber}
                                        </TableCell>
                                        <TableCell sx={{color: 'gray'}} align="center">
                                            {company.email}
                                        </TableCell>
                                        <TableCell sx={{color: 'gray'}} align="center">
                                            {company.address}
                                        </TableCell>
                                        <TableCell sx={{color: 'gray'}} align="center">
                                            {company.city}
                                        </TableCell>
                                        <TableCell sx={{color: 'gray'}} align="right">
                                            <Button 
                                                sx={{
                                                '&:hover': {
                                                    backgroundColor: '#f2f2f2',
                                                    color: '#339966',
                                                }
                                                }}
                                                onClick={() => handleSelectCompany(company)}
                                                >
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                                        <EditOutlinedIcon htmlColor="#339966" />
                                                    </Box>
                                            </Button>
                                            <Button 
                                                sx={{
                                                '&:hover': {
                                                    backgroundColor: '#f2f2f2',
                                                    color: '#339966',
                                                }
                                                }}
                                                >
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                                        <DeleteOutlinedIcon htmlColor="#339966" />
                                                    </Box>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
        </>
    )
}

export default CompaniesList;