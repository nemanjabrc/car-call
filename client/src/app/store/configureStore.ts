import { configureStore } from "@reduxjs/toolkit";
import { accountSlice } from "../../features/account/accountSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { companySlice } from "../../features/company/companySlice";
import { lookupTablesSlice } from "../../features/lookupTables/lookupTablesSlice";
import { vehicleSlice } from "../../features/vehicles/vehiclesSlice";
import { notificationSlice } from "../../features/notification/notificationSlice";
import { snackbarSlice } from "../../features/snackbar/snackbarSlice";
import { operatorSlice } from "../../features/operator/operatorSlice";
import { ownerSlice } from "../../features/owner/ownerSlice";

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        company: companySlice.reducer,
        lookupTable: lookupTablesSlice.reducer,
        vehicle: vehicleSlice.reducer,
        notification: notificationSlice.reducer,
        snackbar: snackbarSlice.reducer,
        operator: operatorSlice.reducer,
        owner: ownerSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;