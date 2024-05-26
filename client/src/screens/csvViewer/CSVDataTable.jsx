import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";

const CSVDataTable = ({ data }) => {
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext

  const getTableHeaderStyle = () => ({
    fontSize: "14px",
    fontWeight: 500,
    color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
    backgroundColor: theme === LIGHT_THEME ? "#6b7bf2" : "#475be8",
    borderBottom: "1px solid #ddd",
    padding: "15px",
    textAlign: "left",
  });

  const getTableCellStyle = () => ({
    fontSize: "14px",
    fontWeight: 500,
    borderBottom: "1px solid #ddd",
    padding: "15px",
    color: theme === LIGHT_THEME ? "#000000" : "#ffffff",
    backgroundColor: theme === LIGHT_THEME ? "#fff" : "#383854",
  });

  const tableContainerStyle = {
    maxHeight: "500px", // Adjust this value as needed
    overflowY: "auto",
    marginBottom: "20px", // Add some space below the table
    border: theme === LIGHT_THEME ? "1px solid #ddd" : "1px solid #475be8",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
  };

  return (
    <>
      {data.length === 0 ? (
        <p className="mt-5">Please wait ... </p>
      ) : (
        <div style={tableContainerStyle}>
          <table
            className={`w-full ${theme === LIGHT_THEME ? "" : "dark-mode"}`}
            style={tableStyle}
          >
            <thead>
              <tr>
                {headers.map((header, index) => (
                  <th key={index} style={getTableHeaderStyle()}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} style={getTableCellStyle()}>
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

const tableStyle = {
  borderCollapse: "collapse",
  width: "100%",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
};

export default CSVDataTable;
