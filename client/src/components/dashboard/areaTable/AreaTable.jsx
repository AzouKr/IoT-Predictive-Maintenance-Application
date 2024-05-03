import AreaTableAction from "./AreaTableAction";
import "./AreaTable.scss";

const AreaTable = ({ name, data, head }) => {
  return (
    <section className="content-area-table">
      <div className="data-table-info">
        <h4 className="data-table-title">{name}</h4>
      </div>
      <div className="data-table-diagram">
        <table>
          <thead>
            <tr>
              {head?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((dataItem) => {
              return (
                <tr key={dataItem.id}>
                  <td>{dataItem.id}</td>
                  <td>{dataItem.airTemperature}</td>
                  {<td>{dataItem.processTemperature}</td>}
                  {<td>{dataItem.currentRotatinalSpeed}</td>}
                  {<td>{dataItem.torque}</td>}
                  {<td>{dataItem.toolWear}</td>}
                  <td>
                    <div className="dt-status">
                      <span
                        className={`dt-status-dot dot-${
                          dataItem.failure === 0
                            ? "Marche"
                            : dataItem.failure === 1
                            ? "Panne"
                            : "Danger"
                        }`}
                      ></span>
                      <span className="dt-status-text">
                        {dataItem.failure === 0
                          ? "Marche"
                          : dataItem.failure === 1
                          ? "Panne"
                          : "Danger"}
                      </span>
                    </div>
                  </td>
                  {/* <td className="dt-cell-action">
                    <AreaTableAction />
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AreaTable;
