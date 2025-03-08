import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import agent from '../../app/api/agent';
import { Tooltip, IconButton, Box } from '@mui/material';
import { setVehicle } from '../vehicles/vehiclesSlice';
import { useNavigate } from 'react-router-dom';

interface Props {
    vehicleId: number;
    vehicleManufacturer: string;
    vehicleModel: string;
    vehicleregistrationPlate: string;
}

const DeleteVehicleDialog = ({vehicleId, vehicleManufacturer, vehicleModel, vehicleregistrationPlate}: Props) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {user} = useAppSelector(state => state.account);
  const userRole = user?.role;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (vehicleId: number) => {
    try {
        await agent.Vehicle.deleteVehicle(vehicleId);
        dispatch(setVehicle());
        if(userRole == 'Owner') {
            navigate('/myvehicles');
        }
        else {
            navigate('/vehicles');
        }
    } catch (error: any) {
        console.log(error);
    }
  }

  return (
    <React.Fragment>
        <Tooltip title="Obriši vozilo" placement="bottom">
            <IconButton 
                onClick={handleClickOpen}
                size="large"
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
                        Da li želite da obrišete ovo vozilo? 
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Vozilo {vehicleManufacturer} {vehicleModel} ({vehicleregistrationPlate}) će biti obrisano kao i svi njegovi podsjetnici.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="outlined" sx={{color: '#339966', borderColor: '#339966',  mb: 1, mt: 2, mr: 2}}>
                    Odustani
                </Button>
                <Button variant="contained" sx={{backgroundColor: '#339966', mb: 1, mt: 2, mr: 2}} onClick={() => handleDelete(vehicleId)} autoFocus>
                    Potvrdi
                </Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
  );
}

export default DeleteVehicleDialog;
