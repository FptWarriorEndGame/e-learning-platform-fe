import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../../types/order.type';

interface OrderState {
  orderId: string;
  isOpenCreateOrder: boolean;
}

const initialState: OrderState = {
  orderId: '',
  isOpenCreateOrder: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    openCreateOrder: (state, action: PayloadAction<boolean>) => {
      state.isOpenCreateOrder = action.payload;
    },
    startEditOrder: (state, action: PayloadAction<string>) => {
      state.orderId = action.payload;
    },
    cancelEditOrder: (state) => {
      state.orderId = '';
    }
  }
});

const orderReducer = orderSlice.reducer;
export const { cancelEditOrder, startEditOrder, openCreateOrder } = orderSlice.actions;
export default orderReducer;
