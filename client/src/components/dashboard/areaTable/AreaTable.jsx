import React from "react";
import "./AreaTable.scss";
import socket from "../../../socket"; // Import the socket module
import { useNavigate } from "react-router-dom";

const TABLE_HEADS = [
  //ask azouuuu if we should add more details
  "ID",
  "Date",
  "Type Machine",
  "Status",
  "Action",
];

const AreaTable = () => {
  const navigate = useNavigate();
  const [data, setdata] = React.useState();
  socket.on("getData", (data) => {
    setdata(data[0]);
  });
  const today = new Date();
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Machines Updates</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data !== undefined
              ? data.map((dataItem) => {
                  let name = "";
                  let status = "";
                  switch (dataItem.failure) {
                    case 0:
                      status = "enMarche";
                      break;
                    case 1:
                      status = "enPanne";
                      break;
                    case 2:
                      status = "enDanger";
                      break;
                  }
                  switch (dataItem.id.slice(0, 2)) {
                    case "HM":
                      name = "Hydro Machine";
                      break;
                    case "RM":
                      name = "Rotational Machine";
                      break;
                    case "MT":
                      name = "Machine Tool";
                      break;
                  }
                  return (
                    <tr key={dataItem.id}>
                      <td>{dataItem.id}</td>
                      <td>
                        {today.getDate() +
                          " " +
                          months[today.getMonth()] +
                          " " +
                          today.getFullYear()}
                      </td>
                      {<td>{name}</td>}
                      {/* { <td>{dataItem.Type}</td> } */}
                      <td>
                        <div className="dt-status">
                          <span
                            className={`dt-status-dot dot-${status}`}
                          ></span>
                          <span className="dt-status-text">{status}</span>
                        </div>
                      </td>
                      <td
                        onClick={() => {
                          navigate(`/machine-overview/${dataItem.id}`);
                        }}
                        className="dt-cell-action cursor-pointer"
                      >
                        View
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
