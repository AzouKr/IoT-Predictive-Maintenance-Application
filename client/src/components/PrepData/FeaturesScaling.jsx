import "../dashboard/areaTable/AreaTable.scss";

const FeaturesScaling = ({ TABLE_DATA }) => {
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
      Type: item["Type"],
      Airtemperature: item["Air temperature"],
      Processtemperature: item["Process temperature"],
      Rotationalspeed: item["Rotational speed"],
      Torque: item["Torque"],
      Toolwear: item["Tool wear"],
      Target: item["Target"],
      FailureType: item["Failure Type"],
    }));
  }
  const transformedData = transformData(TABLE_DATA);

  const TABLE_HEADS = createTableHeads(TABLE_DATA[0]);
  return (
    <section className="content-area-table">
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
            {transformedData?.map((dataItem) => {
              return (
                <tr>
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

export default FeaturesScaling;
