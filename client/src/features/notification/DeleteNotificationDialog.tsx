import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAppDispatch } from '../../app/store/configureStore';
import agent from '../../app/api/agent';
import { setNotification } from './notificationSlice';
import { Tooltip, IconButton, Box } from '@mui/material';
import { updateVehicle } from '../vehicles/vehiclesSlice';

interface Props {
    notificationId: number;
    notificationMessage: string;
}

const LogOutDialog = ({notificationId, notificationMessage}: Props) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (notificationId: number) => {
    try {
        await agent.Notification.deleteMaintenanceNotification(notificationId);
        dispatch(setNotification());
        dispatch(updateVehicle());
    } catch (error: any) {
        console.log(error);
    }
  }

  return (
    <React.Fragment>
        <Tooltip title="Obriši" placement="left-start">
            <IconButton 
                onClick={handleClickOpen}
                size="medium"
                sx={{ 
                    backgroundColor: "#339966", 
                    color: "#fff", 
                    "&:hover": { 
                        backgroundColor: "#339966", 
                        color: "#fff" 
                    } 
                }}     
            > 
                <DeleteOutlineOutlinedIcon fontSize="inherit" />
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
                    <DeleteOutlineOutlinedIcon sx={{color: '#339966'}} />
                    <Box>
                        Da li želite da obrišete ovaj podsjetnik? 
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {notificationMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" sx={{color: '#339966', borderColor: '#339966',  mb: 1, mt: 2, mr: 2}}>
                    Odustani
                </Button>
                <Button variant="contained" sx={{backgroundColor: '#339966', mb: 1, mt: 2, mr: 2}} onClick={() => handleDelete(notificationId)} autoFocus>
                    Potvrdi
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  );
}

export default LogOutDialog;
