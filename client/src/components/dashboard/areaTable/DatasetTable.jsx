import "./AreaTable.scss";
import React, { useState, useEffect } from "react";
import { deleteCSV, getDatasetsInfo } from "../../../Hooks/Python";
import { useTranslation } from "react-i18next";

const TABLE_HEADS = ["ID", "Date", "name", "", ""];

const DatasetTable = () => {
  const [datasets, setdatasets] = useState([]);
  const { t } = useTranslation();

  const fetchData = async () => {
    await getDatasetsInfo().then((response) => {
      setdatasets(response);
    });
  };

  const deleteDataset = (name) => {
    const data = {
      name: name,
    };
    deleteCSV(data)
      .then((res) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="content-area-table mt-10">
      <div className="data-table-info">
        <h4 className="data-table-title ">
          {t("Datasets available on the application")}
        </h4>
      </div>
      <div className="data-table-diagram min-h-[30vh]">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th className="text-center" key={index}>
                  {th}
                </th>
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
                    <a href={`/csvreader/${dataItem.name}`}>
                      <h1 className="cursor-pointer">{t("View")}</h1>
                    </a>
                  </td>
                  <td className="dt-cell-action">
                    <h1
                      onClick={(e) => {
                        deleteDataset(dataItem.name);
                      }}
                      className="cursor-pointer text-red-500"
                    >
                      {t("Delete")}
                    </h1>
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
