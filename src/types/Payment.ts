export interface Payment {
  _id?: string;
  school_id: string;
  trustee_id: string;
  institute_name?: string; // ✅ new
  student_info: {
    name: string;
    id: string;
    email?: string;
    phone?: string; // ✅ new
  };
  gateway_name?: string;
  order_amount: number;
  custom_order_id?: string;
  status?: string;
  transaction_amount?: number;
  payment_time?: string;
  paymentUrl?: string;
  payment_message?: string;

  student_name?: string;
  phone?: string;
}
