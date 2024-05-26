import "../dashboard/areaTable/AreaTable.scss";

const Anomalies = ({ data }) => {
  const targets = Object.values(data)[0];
  const failureTypes = Object.values(data)[1];
  const combined = Object.keys(failureTypes).map((key) => ({
    id: key,
    failureType: failureTypes[key],
    target: targets[key],
  }));

  console.log(combined);
  return (
    <section className="content-area-table">
      <div className="data-table-diagram h-[40vh]">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Target</th>
              <th>Failure Type</th>
            </tr>
          </thead>
          <tbody>
            {combined?.map((dataItem) => {
              return (
                <tr>
                  <td className="text-center">{dataItem.id}</td>
                  <td className="text-center">{dataItem.target}</td>
                  <td className="text-center">{dataItem.failureType}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Anomalies;
