import { Alert, Snackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store/configureStore";
import { hideSnackbar } from "./snackbarSlice";

const SnackbarToast = () => {
    const dispatch = useDispatch();
    const { open, message } = useSelector((state: RootState) => state.snackbar);
  
    const handleClose = () => {
      dispatch(hideSnackbar());
    };
    return(
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                {message}
            </Alert>
        </Snackbar>
    )
} 

export default SnackbarToast;