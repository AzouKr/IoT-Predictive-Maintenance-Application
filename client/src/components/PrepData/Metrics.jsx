import "../dashboard/areaTable/AreaTable.scss";

const TABLE_HEADS = ["Accurancy", "Precision", "F1", "F2"];

const Metrics = ({ values }) => {
  return (
    <section className="content-area-table">
      <div className="data-table-diagram min-h-min">
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
            {values?.map((dataItem) => {
              return (
                <tr>
                  <td className="text-center">{dataItem.ACC}</td>
                  <td className="text-center">{dataItem.AUC}</td>
                  <td className="text-center">{dataItem.F1}</td>
                  <td className="text-center">{dataItem.F2}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Metrics;
