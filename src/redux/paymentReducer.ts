import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export enum CurrencyType {
  'Ruble',
  'Dollar',
  'Euro',
  'Pound',
  'Yen',
}

interface PaymentState {
  hourlyRate: number;
  currency: CurrencyType;
}

const initialState: PaymentState = {
  hourlyRate: 35,
  currency: CurrencyType.Euro,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setHourlyRate: (
      state,
      action: PayloadAction<{ hourlyRateValue: number }>
    ) => {
      state.hourlyRate = action.payload.hourlyRateValue;
    },
    setCurrency: (state, action: PayloadAction<{ currency: CurrencyType }>) => {
      state.currency = action.payload.currency;
    },
  },
});

export const { setHourlyRate, setCurrency } = paymentSlice.actions;
export default paymentSlice.reducer;
