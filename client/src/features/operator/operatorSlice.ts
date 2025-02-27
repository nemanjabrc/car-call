import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Operator, OperatorParams } from "../../app/models/operator";
import { RootState } from "../../app/store/configureStore";
import agent from "../../app/api/agent";

interface OperatorState {
    operatorLoaded: boolean;
    operatorsLoaded: boolean;
    status: string;
    operatorParams: OperatorParams;
}

const operatorsAdapter = createEntityAdapter<Operator>();

function getAxiosParams(operatorParams: OperatorParams) {
    const params = new URLSearchParams();
    if(operatorParams.searchTerm) {
        params.append('searchTerm', operatorParams.searchTerm);
    }

    return params;
}

export const fetchOperatorsAsync = createAsyncThunk<Operator[], number, {state: RootState}>(
    'operator/fetchOperatorsAsync',
    async(companyId, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().operator.operatorParams);
        try {
            const response = await agent.Account.getAllOperatorsFromCompany(companyId, params);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data}); 
        }
    }
)

export const fetchOperatorAsync = createAsyncThunk<Operator, string>(
    'operator/fetchOperatorAsync',
    async(operatorId, thunkAPI) => {
        try {
            const response = await agent.Account.getOperatorProfile(operatorId);
            console.log(response);
            return response;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    }
)

export const operatorSlice = createSlice({
    name: 'operator',
    initialState: operatorsAdapter.getInitialState<OperatorState>({
        operatorLoaded: false,
        operatorsLoaded: false,
        status: 'idle',
        operatorParams: {}
    }),
    reducers: {
        setOperator: (state) => {
            state.operatorsLoaded = false;
        },
        updateOperator: (state) => {
            state.operatorLoaded = false;
        },
        setOperatorParams: (state, action) => {
            state.operatorsLoaded = false;
            state.operatorParams = {...state.operatorParams, ...action.payload};
        },
        resetOperatorParams: (state) => {
            state.operatorParams = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOperatorsAsync.pending, (state) => {
            state.status = 'pendingFetchOperatorsAsync';
        });
        builder.addCase(fetchOperatorsAsync.fulfilled, (state, action) => {
            operatorsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.operatorsLoaded = true;
        });
        builder.addCase(fetchOperatorsAsync.rejected, (state) => {
            state.status = 'idle';
        });

        builder.addCase(fetchOperatorAsync.pending, (state) => {
            state.status = 'pendingfecthOperatorAsync';
        });
        builder.addCase(fetchOperatorAsync.fulfilled, (state, action) => {
            operatorsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
            state.operatorLoaded = true;
        });
        builder.addCase(fetchOperatorAsync.rejected, (state) => {
            state.status = 'idle';
        });
    },
})

export const operatorSelectors = operatorsAdapter.getSelectors((state: RootState) => state.operator);

export const {setOperator, updateOperator, setOperatorParams, resetOperatorParams} = operatorSlice.actions;