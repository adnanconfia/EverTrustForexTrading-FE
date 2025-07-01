import React from "react";

const CustomTable = ({ columns, data, actions }) => {
  return (
    <div className="overflow-x-auto rounded shadow border border-gray-200 w-full text-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-[#2d495a]">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-4 font-medium">
                {col.label}
              </th>
            ))}
            {actions && <th className="px-4 py-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-4 py-6 text-center text-gray-500"
              >
                No record found
              </td>
            </tr>
          ) : (
            data?.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-100 text-white"
              >
                {columns.map((col) => {
                  const rawValue = row[col.key];
                  const value = col.render ? col.render(row) : rawValue;

                  let cellContent;

                  switch (col.type) {
                    case "boolean":
                      cellContent = (
                        <span
                          className={`px-2 py-1 text-white rounded ${
                            value ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {value ? "Yes" : "No"}
                        </span>
                      );
                      break;

                    case "status":
                      const statusColors = {
                        confirmed: "bg-green-500",
                        completed: "bg-green-500",
                        resolved: "bg-green-500",
                        reject: "bg-red-500",
                        rejected: "bg-red-500",
                        pending: "bg-yellow-500",
                        open: "bg-yellow-500",
                      };
                      cellContent = (
                        <span
                          className={`px-2 py-1 text-white rounded text-xs ${
                            statusColors[value] || "bg-gray-300"
                          }`}
                        >
                          {value}
                        </span>
                      );
                      break;

                    case "image":
                      cellContent = value ? (
                        <img
                          src={value}
                          alt="img"
                          className="w-[80px] h-[80px] object-cover rounded"
                        />
                      ) : (
                        "-"
                      );
                      break;

                    case "date":
                      cellContent = value
                        ? new Date(value).toLocaleDateString()
                        : "-";
                      break;

                    case "number":
                      cellContent = value ?? "-";
                      break;

                    case "amount":
                      cellContent =
                        value !== null && value !== undefined
                          ? `$${value}`
                          : "-";
                      break;

                    case "string":
                    default:
                      cellContent = value ?? "-";
                  }

                  if (col.key === "id" && rawValue != null) {
                    cellContent = `FT-${rawValue}`;
                  }

                  return (
                    <td
                      key={col.key}
                      className="px-4 py-3 text-sm text-white whitespace-nowrap"
                    >
                      {cellContent}
                    </td>
                  );
                })}

                {actions && (
                  <td className="px-4 py-3 space-x-2">
                    {actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => action.onClick(row)}
                        className={action.className}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
