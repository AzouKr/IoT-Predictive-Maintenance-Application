import React from "react";

function Table({ jsonData }) {
  const data = JSON.parse(jsonData);

  return (
    <table className="table w-[40vh] bg-gray-200 mb-[5vh]">
      {/* head */}
      <thead>
        <tr>
          {Object.keys(data[0]).map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((value, colIndex) => (
              <td key={colIndex}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
