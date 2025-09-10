// src/pages/Dashboard.tsx
import React, { useState, useEffect } from "react";
import type { Payment } from "../types/Payment";
import { fetchTransactions } from "../api/paymentApi";
import TransactionList from "../components/TransactionList";
import FilterDropdown from "../components/FilterDropdown";

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Payment[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [schoolFilter, setSchoolFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState<keyof Payment | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const loadData = async () => {
    const params = {
      status: statusFilter.join(","),
      schoolId: schoolFilter,
      dateFrom,
      dateTo,
      sortField,
      sortOrder,
      page,
      limit,
    };
    try {
      const res = await fetchTransactions(params);
      setTransactions(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [statusFilter, schoolFilter, dateFrom, dateTo, sortField, sortOrder, page]);

  const handleSort = (field: keyof Payment) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">📊 Transactions Dashboard</h1>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6 flex flex-wrap gap-4 items-center">
        <FilterDropdown
          label="Status"
          options={["success", "pending", "failed"]}
          value={statusFilter}
          onChange={setStatusFilter}
          multi
        />
        <input
          type="text"
          placeholder="School ID"
          value={schoolFilter}
          onChange={(e) => setSchoolFilter(e.target.value)}
          className="border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">From:</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="border px-2 py-1 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">To:</label>
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="border px-2 py-1 rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <TransactionList
          data={transactions}
          onSort={handleSort}
          sortField={sortField}
          sortOrder={sortOrder}
        />
      </div>

      {/* Pagination */}
      <div className="flex justify-end mt-6 gap-2">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Prev
        </button>
        <span className="px-4 py-2 font-semibold">{page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
