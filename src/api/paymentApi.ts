import axios from "axios";
import type { Payment } from "../types/Payment";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Create a new payment
 */
export const createPayment = async (payload: {
  schoolId: string;
  trusteeId: string;
  amount: number;
  studentInfo: {
    name: string;
    id: string;
    email?: string;
  };
}): Promise<Payment> => {
  const res = await axios.post(`${API_BASE}/payments/create-payment`, {
    school_id: payload.schoolId,
    trustee_id: payload.trusteeId,
    order_amount: payload.amount,
    student_info: payload.studentInfo,
  });

  // Return the payment object from backend
  return res.data.data as Payment;
};
export const checkTransactionStatus = async (custom_order_id: string) => {
  const res = await axios.get(`${API_BASE}/transactions/status/${custom_order_id}`);
  return res.data as { status: string };
};

/**
 * Fetch all transactions
 */
export const fetchTransactions = async (params?: {
  status?: string;
  schoolId?: string;
  page?: number;
  limit?: number;
}) => {
  const res = await axios.get(`${API_BASE}/transactions`, { params });
  return res.data as {
    data: Payment[];
    total: number;
    page: number;
    limit: number;
  };
};
