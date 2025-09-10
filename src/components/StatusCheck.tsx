import React, { useState } from "react";
import { checkTransactionStatus } from "../api/paymentApi"; // Correct import

const StatusCheck: React.FC = () => {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!orderId.trim()) {
      alert("Please enter an order ID");
      return;
    }

    try {
      const res = await checkTransactionStatus(orderId);
      setStatus(res.status);
    } catch (err) {
      console.error("Error checking status:", err);
      setStatus("Error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Check Transaction Status</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleCheck}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Check
        </button>
      </div>

      {status && (
        <p className="mt-4 font-semibold">
          Status:{" "}
          <span
            className={`${
              status === "success"
                ? "text-green-600"
                : status === "pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {status}
          </span>
        </p>
      )}
    </div>
  );
};

export default StatusCheck;
