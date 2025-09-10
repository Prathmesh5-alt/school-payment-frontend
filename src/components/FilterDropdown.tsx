import React from "react";

interface Props {
  label: string;
  options: string[];
  value: string[]; // multiple selected
  onChange: (val: string[]) => void;
  multi?: boolean;
}

const FilterDropdown: React.FC<Props> = ({ label, options, value, onChange, multi }) => {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <div className="border rounded px-3 py-2 bg-white dark:bg-gray-700">
        {multi ? (
          <div className="flex flex-wrap gap-2">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => toggleOption(opt)}
                className={`px-3 py-1 rounded border ${
                  value.includes(opt)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <select
            value={value[0] || ""}
            onChange={(e) => onChange([e.target.value])}
            className="bg-transparent outline-none"
          >
            <option value="">All</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default FilterDropdown;
