import "../dashboard/areaTable/AreaTable.scss";

const LoadingData = ({ TABLE_DATA }) => {
  const createTableHeads = (obj) => {
    // Extract keys from the object
    const keys = Object.keys(obj);
    // Map through the keys to remove units and trim spaces
    return keys.map((key) => {
      // Remove units in square brackets
      return key.replace(/\s*\[.*?\]/, "").trim();
    });
  };

  function transformData(dataArray) {
    return dataArray.map((item) => ({
      udi: item["UDI"],
      ProductID: item["Product ID"],
      Type: item["Type"],
      Airtemperature: item["Air temperature [K]"],
      Processtemperature: item["Process temperature [K]"],
      Rotationalspeed: item["Rotational speed [rpm]"],
      Torque: item["Torque [Nm]"],
      Toolwear: item["Tool wear [min]"],
      Target: item["Target"],
      FailureType: item["Failure Type"],
    }));
  }
  const transformedData = transformData(TABLE_DATA);

  const TABLE_HEADS = createTableHeads(TABLE_DATA[0]);
  return (
    <section className="content-area-table">
      <div className="data-table-diagram h-[20vh]">
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
                  <td>{dataItem.udi}</td>
                  <td>{dataItem.ProductID}</td>
                  <td>{dataItem.Type}</td>
                  <td>{dataItem.Airtemperature}</td>
                  <td>{dataItem.Processtemperature}</td>
                  <td>{dataItem.Rotationalspeed}</td>
                  <td>{dataItem.Torque}</td>
                  <td>{dataItem.Toolwear}</td>
                  <td>{dataItem.Target}</td>
                  <td>{dataItem.FailureType}</td>
                  {/* { <td>{dataItem.name}</td> } */}
                  {/* { <td>{dataItem.Type}</td> } */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default LoadingData;
