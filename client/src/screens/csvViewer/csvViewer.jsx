import { AreaTop } from "../../components";
import CSVDataTable from "./CSVDataTable";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import React, { useState, useEffect, useContext } from "react";
import * as XLSX from "xlsx";
import { getCsvFile } from "../../Hooks/Python";
import { useParams } from "react-router-dom";

const CsvViewer = () => {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const [csvData, setCsvData] = useState([]);
  const { name } = useParams();

  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  const fetchData = async () => {
    getCsvFile(name)
      .then((res) => {
        const workbook = XLSX.read(res, { type: "string" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setCsvData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="content-area">
      <div className={theme === LIGHT_THEME ? "" : "dark-mode"}>
        <CSVDataTable data={csvData} />
      </div>
    </div>
  );
};

export default CsvViewer;
