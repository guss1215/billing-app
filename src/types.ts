// types.ts

export interface Client {
    id: number;
    name: string;
  }
  
  export interface Bill {
    id: number;
    clientId: number;
    period: number;
    category: string;
    paymentStatus: string;
  }
  
  export interface PaymentHistoryEntry {
    id: number;
    clientId: number;
    category: string;
    period: number;
    paymentStatus: string;
  }
  
  export interface PendingBill {
    id: number;
    clientId: number;
    period: number;
    category: string;
    paymentStatus: string;
  }
  
  export interface PaymentData {
    clientId: number;
    category: string;
    period: number;
  }
  
  export interface RootState {
    // Define your state properties here
    paymentHistory: PaymentHistoryState;
    pendingBills: PendingBillsState;
  }
  
  export interface PaymentHistoryState {
    clientId: number;
    paymentHistory: PaymentHistoryEntry[];
  }
  
  export interface PendingBillsState {
    clientId: number;
    pendingBills: PendingBill[];
  }
  