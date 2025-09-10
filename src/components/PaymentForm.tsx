import { useState } from "react";
import { createPayment } from "../api/paymentApi";

export default function PaymentForm() {
  const [amount, setAmount] = useState(0);
  const [studentName, setStudentName] = useState("");
  const [customId, setCustomId] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await createPayment({
      school_id: "SCH123",
      trustee_id: "TRST456",
      student_info: { name: studentName, id: "STU789", email: "john@example.com" },
      order_amount: amount,
      custom_order_id: customId || undefined,
    });
    setPaymentUrl(res.paymentUrl);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Custom Order ID (optional)"
          value={customId}
          onChange={(e) => setCustomId(e.target.value)}
          className="border p-2 w-full"
        />
        <button className="bg-blue-500 text-white p-2 rounded w-full">Create Payment</button>
      </form>

      {paymentUrl && (
        <div className="mt-4 p-2 border">
          Payment Created: <a href={paymentUrl} target="_blank" className="text-blue-600">{paymentUrl}</a>
        </div>
      )}
    </div>
  );
}
