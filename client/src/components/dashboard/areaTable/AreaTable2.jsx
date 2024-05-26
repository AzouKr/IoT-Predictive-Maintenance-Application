import React from "react";
import "./AreaTable.scss";
import socket from "../../../socket"; // Import the socket module
import { useNavigate } from "react-router-dom";

const TABLE_HEADS = [
  //ask azouuuu if we should add more details
  "ID",
  "Date",
  "Type",
  "Machine Id",
  "Status",
  "Action",
];

const AreaTable2 = () => {
  const navigate = useNavigate();
  const [data, setdata] = React.useState();
  socket.on("getData", (data) => {
    setdata(data[0]);
  });

  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">Sensors Updates</h4>
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
              ? data?.map((dataItem) => {
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
                    <tr key={"S" + dataItem.id}>
                      <td>{"S" + dataItem.id}</td>
                      <td>Jun 29,2023</td>
                      {<td>{name}</td>}
                      {<td>{dataItem.id}</td>}
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

export default AreaTable2;
