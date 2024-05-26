import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";
import React, { useState, useEffect } from "react";
import { deleteDataset, getDatasetsInfo } from "../../../Hooks/Python";

const TABLE_HEADS = ["ID", "Date", "name", "Action"];

const DatasetTable = () => {
  const [datasets, setdatasets] = useState([]);

  const fetchData = async () => {
    await getDatasetsInfo().then((response) => {
      setdatasets(response);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="content-area-table mt-10">
      <div className="data-table-info">
        <h4 className="data-table-title ">
          Datasets available on the application
        </h4>
      </div>
      <div className="data-table-diagram min-h-[30vh]">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datasets?.map((dataItem, index) => {
              return (
                <tr key={index + 1}>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{dataItem.creation_date}</td>
                  <td className="text-center">{dataItem.name}</td>
                  <td className="dt-cell-action">
                    <AreaTableAction name={dataItem.name} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default DatasetTable;
