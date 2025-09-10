export interface Payment {
  _id?: string;
  school_id: string;
  trustee_id: string;
  institute_name?: string;
  student_info: {
    name: string;
    id: string;
    email?: string;
    phone?: string;
  };
  gateway_name?: string;
  order_amount: number; // backend expects this
  custom_order_id?: string;
  status?: string;
  transaction_amount?: number;
  payment_time?: string;
  paymentUrl?: string; // matches backend
  payment_message?: string;

  student_name?: string; // optional duplicates for legacy
  phone?: string;
}
