import { Tooltip, IconButton, Dialog, DialogTitle, Box, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import agent from '../../app/api/agent';
import { useAppDispatch } from '../../app/store/configureStore';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { setOwner } from './ownerSlice';

interface Props {
    ownerId: number
    username: string;
    name: string;
    surname: string;
}

const DeleteOwnerDialog = ({ownerId, username, name, surname}: Props) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleDelete = async (ownerId: number) => {
      try {
        await agent.Account.deleteOwner(ownerId);
        dispatch(setOwner());
        navigate('/owners');
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
                          Da li želite da obrišete nalog vlasnika @{username}?
                      </Box>
                  </Box>
              </DialogTitle>
              <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                      Korisnički nalog na ime {name} {surname} će biti obrisan kao i sva njegova vozila i podjsetnici za ta vozila.
                  </DialogContentText>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose} variant="outlined" sx={{color: '#339966', borderColor: '#339966',  mb: 1, mt: 2, mr: 2}}>
                      Odustani
                  </Button>
                  <Button variant="contained" sx={{backgroundColor: '#339966', mb: 1, mt: 2, mr: 2}} onClick={() => handleDelete(ownerId)} autoFocus>
                      Potvrdi
                  </Button>
              </DialogActions>
          </Dialog>
      </React.Fragment>
    )
}

export default DeleteOwnerDialog;