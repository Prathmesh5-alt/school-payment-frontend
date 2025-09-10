import React from "react";
import type { Payment } from "../types/Payment";

interface Props {
  data: Payment[];
  onSort?: (field: keyof Payment | "student_name" | "phone") => void;
  sortField?: keyof Payment | "student_name" | "phone" | "";
  sortOrder?: "asc" | "desc";
}

const TransactionList: React.FC<Props> = ({
  data,
  onSort,
  sortField,
  sortOrder,
}) => {
  // Table headers
  const headers: { key: keyof Payment | "student_name" | "phone"; label: string }[] = [
    { key: "custom_order_id", label: "Order ID" },
    { key: "institute_name", label: "Institute Name" },
    { key: "school_id", label: "School ID" },
    { key: "student_name", label: "Student Name" },
    { key: "phone", label: "Phone No." },
    { key: "gateway_name", label: "Payment Method" },
    { key: "order_amount", label: "Order Amount" },
    { key: "transaction_amount", label: "Transaction Amount" },
    { key: "status", label: "Status" },
    { key: "payment_time", label: "Date/Time" },
  ];

  // Sorting arrow
  const renderSortArrow = (key: string) => {
    if (sortField !== key) return null;
    return sortOrder === "asc" ? "▲" : "▼";
  };

  return (
    <div className="overflow-x-auto bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <table className="w-full text-left border-collapse">
        {/* Header */}
        <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow">
          <tr>
            <th className="px-4 py-3">#</th>
            {headers.map((h) => (
              <th
                key={h.key}
                className="px-4 py-3 cursor-pointer select-none hover:text-blue-600"
                onClick={() => onSort && onSort(h.key)}
              >
                {h.label} {renderSortArrow(h.key)}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length + 1}
                className="px-4 py-6 text-center text-gray-500 dark:text-gray-300"
              >
                No transactions found
              </td>
            </tr>
          ) : (
            data.map((t, idx) => (
              <tr
                key={t._id || idx}
                className={`transition ${
                  idx % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-100 dark:bg-gray-700"
                } hover:bg-blue-50 dark:hover:bg-gray-600`}
              >
                <td className="px-4 py-3">{idx + 1}</td>
                <td className="px-4 py-3">{t.custom_order_id || "-"}</td>
                <td className="px-4 py-3">{t.institute_name || "-"}</td>
                <td className="px-4 py-3">{t.school_id || "-"}</td>
                <td className="px-4 py-3">{t.student_info?.name || "-"}</td>
                <td className="px-4 py-3">{t.student_info?.phone || "-"}</td>
                <td className="px-4 py-3">{t.gateway_name || "-"}</td>
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                  ₹{t.order_amount ?? "-"}
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
                  ₹{t.transaction_amount ?? "-"}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      t.status === "success"
                        ? "bg-green-100 text-green-700"
                        : t.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {t.status || "-"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                  {t.payment_time
                    ? new Date(t.payment_time).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
