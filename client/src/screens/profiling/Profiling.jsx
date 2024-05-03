import fig1 from "../../assets/figures/fig1.png";
import fig2 from "../../assets/figures/fig2.png";
import fig3 from "../../assets/figures/fig3.png";
import fig4 from "../../assets/figures/fig4.png";
import fig5 from "../../assets/figures/fig5.png";
import fig6 from "../../assets/figures/fig6.png";
import fig7 from "../../assets/figures/fig7.png";
import { getDatasets, getProfiling } from "../../Hooks/Python";
import Table from "../../components/Table";
import Loading from "../../components/Loading";
import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LIGHT_THEME } from "../../constants/themeConstants";

function Profiling() {
  const { theme } = useContext(ThemeContext); // Accessing theme from ThemeContext
  const [data, setdata] = useState([]);
  const [datasets, setdatasets] = useState([]);
  const [selectedDataset, setselectedDataset] = useState("");
  const [loading, setloading] = useState(false);

  const startHnadler = async () => {
    setloading(true);
    const response = await getProfiling(selectedDataset);
    setdata(response.result);
    setloading(false);
  };

  const fetchData = async () => {
    await getDatasets().then((response) => {
      setdatasets(response);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-min w-full">
      <div className="h-[10vh] w-full flex items-center justify-center">
        <select
          className="select select-bordered w-full max-w-xs m-4 bg-white text-black"
          onChange={(e) => {
            setselectedDataset(e.target.value);
          }}
        >
          <option disabled selected>
            Sélectionner une Dataset
          </option>
          {datasets.map((dataset, index) => (
            <option key={index} value={dataset}>
              {dataset}
            </option>
          ))}
        </select>
        <button
          onClick={startHnadler}
          className="btn bg-blue-600 dark:bg-blue-600 text-white hover:bg-blue-700 m-4"
        >
          Start Profiling
        </button>
      </div>
      {loading ? (
        <div className="h-[90vh] w-full flex items-center justify-center">
          <Loading />
        </div>
      ) : data.length !== 0 ? (
        <div className="min-h-min w-full p-[10vh]">
          <h1
            className={`text-[5vh] ${
              theme === LIGHT_THEME ? `text-black` : `text-white`
            } mb-[3vh]`}
          >
            Loading data
          </h1>
          <div className="overflow-x-auto">
            <div className="min-h-min w-full flex items-center justify-center">
              <Table jsonData={data[0].data} />
            </div>
            <h1
              className={`text-[5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              Data Preprocessing : Drop unwanted features
            </h1>
            <p
              className={`text-[2.5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              <b>Data preprocessing</b> is the process of transforming raw data
              into an understandable format. It also makes the datasets more
              complete and efficient to perform data analysis.
            </p>
            <p
              className={`text-[2.5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              Before going into more technical matters we deal with the two ID
              columns as the model we will use could get confused by them, since
              it is unrealistic to think that the failure of a machine depends
              on its identifier. However, while UDI results in being a copy of
              the dataframe index, the column Product ID is made up of an
              initial letter followed by five numbers; there is a small chance
              that an hidden pattern lies behind this structure. However, the
              initial letter corresponds to the machine Type and the number
              sequences define three intervals based on the same feature; this
              allows to confirm that the Product ID column does not actually
              carry any more information than the feature Type and it is legit
              to drop it. The following histogram shows the number sequences:
            </p>
            <div className="min-h-min w-full flex items-center justify-center">
              <img src={fig1} />
            </div>
            <h1
              className={`text-[5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh] mt-[3vh]`}
            >
              EDA(Exploratory Data Analysis)
            </h1>
            <p
              className={`text-[2.5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              <b>Exploratory Data Analysis (EDA)</b> is an approach to perform
              initial investigations on data to discover patterns, spot
              anomalies, test hypothesis and check assumptions with the help of
              statistics and graphical representations.
            </p>
            <div className="min-h-min w-full flex items-center justify-center">
              <Table jsonData={data[0].data} />
            </div>
            <p
              className={`text-[2.5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              just check the descriptions for the numeric features. None missing
              and on apparent outliers
            </p>
            <div className="min-h-min w-full flex items-center justify-center">
              <Table jsonData={data[1].data} />
            </div>
            <p
              className={`text-[2.5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              Taking a look at 'Failure Type' variable
            </p>
            <div className="min-h-min w-full flex items-center justify-center">
              <table className="table bg-gray-200 mb-[5vh] w-[70vh]">
                {/* head */}
                <thead>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <th className="text-black">Target</th>
                    <th className="text-black">Failure Type</th>
                    <th className="text-black">Count</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <th className="text-black">0</th>
                    <td className="text-black">No Failure</td>
                    <td className="text-black">
                      {JSON.parse(data[2].data)[0].count}
                    </td>
                  </tr>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <th className="text-black">1</th>
                    <td className="text-black">Random Failures</td>
                    <td className="text-black">
                      {JSON.parse(data[2].data)[1].count}
                    </td>
                  </tr>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <th className="text-black">1</th>
                    <td className="text-black">Heat Dissipation Failure</td>
                    <td className="text-black">
                      {JSON.parse(data[2].data)[2].count}
                    </td>
                  </tr>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <th className="text-black">1</th>
                    <td className="text-black">No Failure</td>
                    <td className="text-black">
                      {JSON.parse(data[2].data)[3].count}
                    </td>
                  </tr>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <th className="text-black">1</th>
                    <td className="text-black">Overstrain Failure</td>
                    <td className="text-black">
                      {JSON.parse(data[2].data)[4].count}
                    </td>
                  </tr>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <th className="text-black">1</th>
                    <td className="text-black">Power Failure</td>
                    <td className="text-black">
                      {JSON.parse(data[2].data)[5].count}
                    </td>
                  </tr>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <th className="text-black">1</th>
                    <td className="text-black">Tool Wear Failure </td>
                    <td className="text-black">
                      {JSON.parse(data[2].data)[6].count}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p
              className={`text-[2.5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              We can see that the dataset is highly unbalanced. Let's further
              check that with the 'target' variable:
            </p>
            <div className="min-h-min w-full flex items-center justify-center">
              <table className="table bg-gray-200 mb-[5vh] w-[50vh]">
                {/* head */}
                <thead>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <th className="text-black"></th>
                    <th className="text-black">Target</th>
                    <th className="text-black">Percentage %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <th className="text-black">1</th>
                    <td className="text-black">0</td>
                    <td className="text-black">{data[3].data[0]}</td>
                  </tr>
                  <tr
                    className={`${
                      theme === LIGHT_THEME ? `text-black` : `text-white`
                    }`}
                  >
                    <th className="text-black">2</th>
                    <td className="text-black">1</td>
                    <td className="text-black">{data[3].data[1]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h1
              className={`text-[5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              Target anomalies
            </h1>
            <div className="min-h-min w-full flex items-center justify-center">
              <Table jsonData={data[4].data} />
            </div>
            <h1
              className={`text-[5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              Data Visualisation
            </h1>
            <p
              className={`text-[2.5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              The following pie chart shows the percentages of machines by Type:
            </p>
            <div className="min-h-min w-full flex items-center justify-center">
              <img className="h-[50vh]" src={fig2} />
            </div>
            <h1
              className={`text-[4vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh] mt-[3vh]`}
            >
              Percentage of failure
            </h1>
            <div className="min-h-min w-full flex items-center justify-center">
              <img className="h-[50vh]" src={fig3} />
            </div>
            <h1
              className={`text-[4vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh] mt-[3vh]`}
            >
              Percentage of failure wrt product type
            </h1>
            <div className="min-h-min w-full flex items-center justify-center">
              <img className="h-[50vh]" src={fig4} />
            </div>
            <h1
              className={`text-[4vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh] mt-[3vh]`}
            >
              Correlation
            </h1>
            <div className="min-h-min w-full flex items-center justify-center">
              <img className="h-[90vh] mb-[5vh]" src={fig5} />
            </div>
            <p
              className={`text-[2.5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              -Torque and rotational speed are highly correlated.
            </p>
            <p
              className={`text-[2.5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              -Process temperature and air temperature are also highly
              correlated.
            </p>
            <p
              className={`text-[2.5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              We immediately see that failures occur for extreme values of some
              features, i.e., the machinery fails either for the lowest or
              largest values of torque and rotational speed. This is easily
              spotted in the graph since the green dots are far apart for those
              features. So, there is a range for normal conditions in which the
              machines operate, and above or under this range, they tend to
              fail.{" "}
            </p>
            <p
              className={`text-[2.5vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              violin chart to see how torque and rotational speed behave:
            </p>
            <div className="min-h-min w-full flex items-center justify-center">
              <img className="h-[50vh] mb-[5vh]" src={fig6} />
            </div>
            <h1
              className={`text-[4vh] ${
                theme === LIGHT_THEME ? `text-black` : `text-white`
              } mb-[3vh]`}
            >
              Correllation Heatmap
            </h1>
            <div className="min-h-min w-full flex items-center justify-center">
              <img className="h-[80vh]" src={fig7} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Profiling;
