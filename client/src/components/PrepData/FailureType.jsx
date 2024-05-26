import "../dashboard/areaTable/AreaTable.scss";

const TABLE_HEADS = ["Target", "Failure type", "count"];

const FailureType = ({ TABLE_DATA }) => {
  function transformData(dataArray) {
    return dataArray.map((item) => ({
      Target: item["Target"],
      Failure: item["Failure Type"],
      count: item["count"],
    }));
  }
  const transformedData = transformData(TABLE_DATA);
  return (
    <section className="content-area-table">
      <div className="data-table-diagram min-h-min">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transformedData?.map((dataItem) => {
              return (
                <tr>
                  <td className="text-center">{dataItem.Target}</td>
                  <td className="text-center">{dataItem.Failure}</td>
                  <td className="text-center">{dataItem.count}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FailureType;
