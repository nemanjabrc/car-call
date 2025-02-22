import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { logOut } from './accountSlice';
import { Box } from '@mui/material';

const LogOutDialog = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.account);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="contained" sx={{backgroundColor: '#339966'}} onClick={handleClickOpen} endIcon={<LogoutOutlinedIcon />}>
        Odjavi se
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Box display='flex' justifyContent='start' alignItems='center' gap={2}>
            <LogoutOutlinedIcon sx={{color: '#339966'}} />
            <Box>
                Odjava sa naloga 
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Da li želite da se odjavite sa naloga @{user?.username}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" sx={{color: '#339966', borderColor: '#339966',  mb: 1, mt: 2, mr: 2}}>Odustani</Button>
          <Button variant="contained" sx={{backgroundColor: '#339966', mb: 1, mt: 2, mr: 2}} onClick={() => dispatch(logOut())} autoFocus>
            Odjavi se
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default LogOutDialog;
