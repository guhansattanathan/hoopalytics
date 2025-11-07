import React from "react";

const TableComponent = () => {
  // Example data (10 rows)
  const data = [
    { name: "Alice", age: 24, city: "New York" },
    { name: "Bob", age: 30, city: "Los Angeles" },
    { name: "Charlie", age: 27, city: "Chicago" },
    { name: "Diana", age: 22, city: "Houston" },
    { name: "Ethan", age: 29, city: "Miami" },
    { name: "Fiona", age: 25, city: "Seattle" },
    { name: "George", age: 31, city: "Boston" },
    { name: "Hannah", age: 28, city: "San Francisco" },
    { name: "Ian", age: 26, city: "Denver" },
    { name: "Julia", age: 23, city: "Atlanta" },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">User Table</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Age</th>
            <th className="px-4 py-2 border-b">City</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{user.name}</td>
              <td className="px-4 py-2 border-b">{user.age}</td>
              <td className="px-4 py-2 border-b">{user.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
