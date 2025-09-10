import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../api/paymentApi";
import TransactionList from "../components/TransactionList";
import type { Payment } from "../types/Payment";

const TransactionBySchool: React.FC = () => {
  const [schoolId, setSchoolId] = useState("");
  const [transactions, setTransactions] = useState<Payment[]>([]);

  const loadData = async () => {
    if (!schoolId) return;
    try {
      const res = await fetchTransactions({ schoolId });
      setTransactions(res.data);
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, [schoolId]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions by School</h1>
      <input
        placeholder="Enter School ID"
        value={schoolId}
        onChange={(e) => setSchoolId(e.target.value)}
        className="border px-2 py-1 rounded mb-2"
      />
      <TransactionList data={transactions} />
    </div>
  );
};

export default TransactionBySchool;
