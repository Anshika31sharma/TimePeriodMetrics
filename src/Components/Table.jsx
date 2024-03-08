import React, { useState } from "react";

const Table = () => {
  const data = [
    {
      id: 4,
      amount: 100,
      orderedBy: "John Doe",
      gender: "Male",
      telNo: "123-456-7890",
      deliveryAddress: "123 Main St, Cityville",
      deliveryStatus: "Delivered",
      createdDate: "2024-03-08",
    },
    {
      id: 3,
      amount: 150,
      orderedBy: "Jane Smith",
      gender: "Female",
      telNo: "987-654-3210",
      deliveryAddress: "456 Oak St, Townsville",
      deliveryStatus: "Pending",
      createdDate: "2024-03-09",
    },
    {
      id: 2,
      amount: 100,
      orderedBy: "John Doe",
      gender: "Male",
      telNo: "123-456-7890",
      deliveryAddress: "123 Main St, Cityville",
      deliveryStatus: "Delivered",
      createdDate: "2024-03-08",
    },
    {
      id: 1,
      amount: 150,
      orderedBy: "Jane Smith",
      gender: "Female",
      telNo: "987-654-3210",
      deliveryAddress: "456 Oak St, Townsville",
      deliveryStatus: "Pending",
      createdDate: "2024-03-09",
    },
  ];

  // Table headers
  const headers = [
    "ID",
    "Amount",
    "Ordered By",
    "Gender",
    "Tel No",
    "Delivery Address",
    "Delivery Status",
    "Created Date",
  ];

  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const renderHeaders = () => (
    <thead className="bg-gray-200 text-gray-500 text-sm">
      <tr>
        {headers.map((header, index) => (
          <th
            key={index}
            onClick={() => handleSort(header.toLowerCase().replace(" ", "_"))}
            className="cursor-pointer px-4 py-2 text-left"
          >
            {header}
            {sortBy === header.toLowerCase().replace(" ", "_") && (
              <span className="ml-1">{sortOrder === "asc" ? "↑" : "↓"}</span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
  const renderRows = () => (
    <tbody>
      {data
        .sort((a, b) =>
          sortOrder === "asc"
            ? a[sortBy] > b[sortBy]
              ? 1
              : -1
            : b[sortBy] > a[sortBy]
            ? 1
            : -1
        )
        .map((item) => (
          <tr key={item.id}>
            <td className="border px-4 py-2">{item.id}</td>
            <td className="border px-4   py-2">{item.amount}</td>
            <td className="border px-4   py-2">{item.orderedBy}</td>
            <td className="border px-4 py-2">{item.gender}</td>
            <td className="border px-4 py-2">{item.telNo}</td>
            <td className="border px-4   py-2">{item.deliveryAddress}</td>
            <td className="border px-4   py-2">{item.deliveryStatus}</td>
            <td className="border px-4  py-2">{item.createdDate}</td>
          </tr>
        ))}
    </tbody>
  );

  return (
    <div className="mb-20">
      <h2 className="font-bold text-blue-950 text-2xl  ml-5 mt-5">
        Recent Sales
      </h2>
      <div className="bg-gray-50  p-6 ml-5 mr-5 mt-5 rounded-md shadow-md overflow-x-auto">
        <table className="min-w-full  border border-collapse">
          {renderHeaders()}
          {renderRows()}
        </table>
      </div>
    </div>
  );
};

export default Table;
