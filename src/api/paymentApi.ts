// src/api/paymentApi.ts
import axios from "axios";
import type { Payment } from "../types/Payment";

// Base URL: Use VITE_API_URL if defined, otherwise fallback
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Create a new payment
 */
export const createPayment = async (payload: {
  schoolId: string;       // frontend camelCase
  trusteeId?: string;     // optional
  order_amount: number;   // must match backend DTO
  studentInfo?: { name: string; id: string; email?: string }; // optional
}) => {
  const body = {
    school_id: payload.schoolId,       // backend expects snake_case
    trustee_id: payload.trusteeId,
    order_amount: payload.order_amount,
    student_info: payload.studentInfo,
  };

  const res = await axios.post<{ data: Payment }>(
    `${API_BASE}/payments/create-payment`,
    body
  );

  // Backend wraps payment inside { data: Payment }
  return res.data.data;
};

/**
 * Fetch all transactions (with optional filters + pagination)
 */
export const fetchTransactions = async (params?: {
  status?: string;
  schoolId?: string;
  page?: number;
  limit?: number;
}) => {
  const query: Record<string, any> = { ...params };

  // Map frontend schoolId to backend school_id
  if (params?.schoolId) {
    query.school_id = params.schoolId;
    delete query.schoolId;
  }

  const res = await axios.get<{ data: Payment[]; meta: { total: number; page: number; limit: number } }>(
    `${API_BASE}/transactions`,
    { params: query }
  );

  return res.data;
};

/**
 * Fetch transactions by school
 */
export const fetchSchoolTransactions = async (
  schoolId: string,
  params?: { page?: number; limit?: number }
) => {
  const res = await axios.get<{ data: Payment[]; meta: { total: number; page: number; limit: number } }>(
    `${API_BASE}/transactions/school/${schoolId}`,
    { params }
  );
  return res.data;
};

/**
 * Check transaction status by custom_order_id
 */
export const checkTransactionStatus = async (custom_order_id: string) => {
  const res = await axios.get<{ status: string }>(
    `${API_BASE}/transaction-status/${custom_order_id}`
  );
  return res.data;
};
