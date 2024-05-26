import "../dashboard/areaTable/AreaTable.scss";

const TABLE_HEADS = ["Column", "Non-Null Count", "Dtype"];

const TABLE_DATA = [
  {
    Column: "UDI",
    NonNull: " 10000 non-null",
    Dtype: " int64 ",
  },
  {
    Column: "Product ID ",
    NonNull: " 10000 non-null",
    Dtype: " object ",
  },
];

const Metadata = ({ row1, row2 }) => {
  const elements1 = row1.match(/[a-zA-Z]+|\d+/g);
  const elements2 = row2.match(/[a-zA-Z]+|\d+/g);
  const data = [
    {
      Column: elements1[1],
      NonNull: elements1[2] + " " + elements1[3] + " " + elements1[4],
      Dtype: elements1[5] + elements1[6],
    },
    {
      Column: elements2[1] + " " + elements2[2],
      NonNull: elements2[3] + " " + elements2[4] + " " + elements2[5],
      Dtype: elements2[6],
    },
  ];

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
            {data?.map((dataItem) => {
              return (
                <tr>
                  <td className="text-center">{dataItem.Column}</td>
                  <td className="text-center">{dataItem.NonNull}</td>
                  <td className="text-center">{dataItem.Dtype}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Metadata;
