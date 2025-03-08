import { Dialog, DialogTitle, Box, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import agent from '../../app/api/agent';
import { useAppDispatch } from '../../app/store/configureStore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { setCompany } from './companySlice';

interface Props {
    companyId: number
    name: string;
    city: string;
}

const DeleteCompanyDialog = ({companyId, name, city}: Props) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDelete = async (companyId: number) => {
      try {
        await agent.Company.deleteCompany(companyId);
        dispatch(setCompany());
        navigate('/companies');
      } catch (error: any) {
          console.log(error);
      }
    }
  
    return (
      <React.Fragment>
        <Button
            onClick={handleClickOpen} 
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
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Box display='flex' justifyContent='start' alignItems='center' gap={2}>
                    <DeleteOutlineIcon sx={{color: '#339966'}} />
                    <Box>
                        Da li želite da obrišete kompaniju {name}?
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Kompanija {name} ({city}) će biti obrisana kao i svi nalozi koji pripadaju ovoj kompaniji.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" sx={{color: '#339966', borderColor: '#339966',  mb: 1, mt: 2, mr: 2}}>
                    Odustani
                </Button>
                <Button variant="contained" sx={{backgroundColor: '#339966', mb: 1, mt: 2, mr: 2}} onClick={() => handleDelete(companyId)} autoFocus>
                    Potvrdi
                </Button>
            </DialogActions>
        </Dialog>
      </React.Fragment>
    )
}

export default DeleteCompanyDialog;