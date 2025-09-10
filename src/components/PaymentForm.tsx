import React, { useState } from "react";
import { createPayment } from "../api/paymentApi";
import type { Payment } from "../types/Payment";

const PaymentForm: React.FC = () => {
  const [schoolId, setSchoolId] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [trusteeId, setTrusteeId] = useState<string>("");
  const [studentName, setStudentName] = useState<string>("");
  const [studentId, setStudentId] = useState<string>("");
  const [studentEmail, setStudentEmail] = useState<string>("");
  const [result, setResult] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!schoolId || amount <= 0 || !trusteeId || !studentName || !studentId) {
      alert("Please fill all required fields correctly");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await createPayment({
        schoolId,        // ✅ camelCase
        trusteeId,
        order_amount: amount,        // ✅ consistent naming
        studentInfo: {
          name: studentName,
          id: studentId,
          email: studentEmail || "" // ✅ always a string
        }
      });
      setResult(res);
    } catch (err: any) {
      console.error("Payment creation failed:", err);
      setError(err?.response?.data?.message || "Failed to create payment");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Payment</h1>

      <div className="flex flex-col space-y-3">
        <input
          placeholder="School ID"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value || "")}
          className="border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Trustee ID"
          value={trusteeId}
          onChange={(e) => setTrusteeId(e.target.value || "")}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Student Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value || "")}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value || "")}
          className="border px-3 py-2 rounded"
        />
        <input
          placeholder="Student Email (optional)"
          value={studentEmail}
          onChange={(e) => setStudentEmail(e.target.value || "")}
          className="border px-3 py-2 rounded"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Creating..." : "Create Payment"}
        </button>
      </div>

      {error && <p className="mt-4 text-red-600 font-medium">Error: {error}</p>}

      {result && (
        <div className="mt-6 p-4 border rounded shadow bg-gray-50">
          <p><strong>Order ID:</strong> {result._id}</p>
          <p><strong>Custom Order ID:</strong> {result.custom_order_id}</p>
          <p><strong>School ID:</strong> {result.school_id}</p>
          <p><strong>Trustee ID:</strong> {result.trustee_id}</p>
          <p><strong>Student Name:</strong> {result.student_info?.name}</p>
          <p><strong>Student ID:</strong> {result.student_info?.id}</p>
          <p><strong>Student Email:</strong> {result.student_info?.email || "-"}</p>
          <p><strong>Amount:</strong> ₹{result.order_amount}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`font-semibold ${
                result.status === "success"
                  ? "text-green-600"
                  : result.status === "pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {result.status || "-"}
            </span>
          </p>
          {result.paymentUrl && (
            <p>
              <strong>Payment URL:</strong>{" "}
              <a
                href={result.paymentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Pay Now
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
