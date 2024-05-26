import "../dashboard/areaTable/AreaTable.scss";

const TABLE_HEADS = ["Target", "proportion"];

const Target = ({ TABLE_DATA }) => {
  const data = [
    { Target: 0, value: TABLE_DATA[0] },
    { Target: 1, value: TABLE_DATA[1] },
  ];
  return (
    <section className="content-area-table">
      <div className="data-table-diagram min-h-min ">
        <table>
          <thead>
            <tr>
              {TABLE_HEADS?.map((th, index) => (
                <th key={index}>{th}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((dataItem) => {
              return (
                <tr>
                  <td className="text-center">{dataItem.Target}</td>
                  <td className="text-center">{dataItem.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Target;
