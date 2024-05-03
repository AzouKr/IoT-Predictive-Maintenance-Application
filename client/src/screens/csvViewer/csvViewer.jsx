import React, { useState, useEffect, useContext } from "react";
import * as XLSX from "xlsx";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";
import { getCsvFile, getDatasets } from "../../Hooks/Python";

function CsvViewer() {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // submit state
  const [excelData, setExcelData] = useState(null);

  // submit event
  const handleFileSubmit = (e) => {
    getCsvFile(selectedDataset)
      .then((res) => {
        console.log(res);
        const workbook = XLSX.read(res, { type: "string" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        setExcelData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [datasets, setdatasets] = useState([]);
  const [selectedDataset, setselectedDataset] = useState("");

  const fetchData = async () => {
    await getDatasets().then((response) => {
      setdatasets(response);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-min w-full">
      <h3
        className={`text-[4vh] ${
          theme === LIGHT_THEME ? `text-black` : `text-white`
        } mb-[3vh]`}
      >
        Upload & View Excel Sheets
      </h3>

      <div className="flex  items-center">
        <button
          onClick={handleFileSubmit}
          className="btn btn-success btn-md mr-[5vh]"
        >
          UPLOAD
        </button>
        <select
          className="select select-bordered w-full max-w-xs m-4 bg-white text-black"
          onChange={(e) => {
            setselectedDataset(e.target.value);
          }}
        >
          <option disabled selected>
            Sélectionner une Dataset
          </option>
          {datasets.map((dataset, index) => (
            <option key={index} value={dataset}>
              {dataset}
            </option>
          ))}
        </select>
        {typeError && (
          <div className="alert alert-danger" role="alert">
            {typeError}
          </div>
        )}
      </div>

      {/* view data */}
      <div className="h-[60vh] overflow-auto">
        <div
          className={`min-h-min flex items-center justify-center ${
            theme === LIGHT_THEME ? `text-black` : `text-white`
          }`}
        >
          {excelData ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    {Object.keys(excelData[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {excelData.map((individualExcelData, index) => (
                    <tr key={index}>
                      {Object.keys(individualExcelData).map((key) => (
                        <td key={key}>{individualExcelData[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default CsvViewer;
