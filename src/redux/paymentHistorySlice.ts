import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { PaymentHistoryEntry } from '../types'; // Import PaymentHistoryEntry type

interface PaymentHistoryState {
    paymentHistory: PaymentHistoryEntry[];
    clientId: number | null;
}

const initialState: PaymentHistoryState = {
    paymentHistory: [],
    clientId: null,
};

const paymentHistorySlice = createSlice({
    name: 'paymentHistory',
    initialState,
    reducers: {
        setPaymentHistory: (state, action: PayloadAction<PaymentHistoryEntry[]>) => {
            state.paymentHistory = action.payload;
        },
        setClientId: (state, action: PayloadAction<number>) => {
            state.clientId = action.payload;
        },
        makePayment: (state, action: PayloadAction<PaymentHistoryEntry>) => {
            const updatedEntry = action.payload;
            const index = state.paymentHistory.findIndex(entry => entry.id === updatedEntry.id);

            if (index !== -1) {
                state.paymentHistory[index] = updatedEntry;
            }
        },
    },
});

export const { setPaymentHistory, setClientId, makePayment } = paymentHistorySlice.actions;

export const selectPaymentHistory = (state: RootState) =>
    state.paymentHistory.paymentHistory;

export const selectClientId = (state: RootState) => state.paymentHistory.clientId;

export default paymentHistorySlice.reducer;
