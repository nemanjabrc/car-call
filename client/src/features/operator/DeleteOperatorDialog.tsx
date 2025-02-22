import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useAppDispatch } from '../../app/store/configureStore';
import agent from '../../app/api/agent';
import { Tooltip, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setOperator } from './operatorSlice';

interface Props {
    userId: string
    username: string;
    name: string;
    surname: string;
}

const LogOutDialog = ({userId, username, name, surname}: Props) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (userId: string) => {
    try {
        await agent.Account.deleteOperator(userId);
        dispatch(setOperator());
        navigate('/operators');
    } catch (error: any) {
        console.log(error);
    }
  }

  return (
    <React.Fragment>
        <Tooltip 
            title="Obriši nalog"
            sx={{
                backgroundColor: "#339966", 
                color: "#fff", 
            }} 
        >
            <IconButton 
                onClick={handleClickOpen}
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
                <DeleteOutlineIcon fontSize="inherit" />
            </IconButton>
        </Tooltip>
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
                        Da li želite da obrišete nalog operatera @{username}? 
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Korisnički nalog na ime {name} {surname} će biti obrisan.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" sx={{color: '#339966', borderColor: '#339966',  mb: 1, mt: 2, mr: 2}}>
                    Odustani
                </Button>
                <Button variant="contained" sx={{backgroundColor: '#339966', mb: 1, mt: 2, mr: 2}} onClick={() => handleDelete(userId)} autoFocus>
                    Potvrdi
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  );
}

export default LogOutDialog;
