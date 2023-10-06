import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, //x axis
  LinearScale, //y axis
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

import React from "react";

const ChartsMaps = () => {
  ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );

  interface chartData {
    [date: string]: number;
  }

  interface chartType {
    cases?: chartData;
    deaths?: chartData;
    recovered?: chartData;
  }

  const url = "https://disease.sh/v3/covid-19/";

  const [covidStats, setcovidStats] = React.useState<chartType[] | undefined[]>(
    []
  );
  const [showRecovered, setShowRecovered] = React.useState<boolean>(false);
  const [showDeath, setShowDeath] = React.useState<boolean>(false);
  const [showCases, setShowCases] = React.useState<boolean>(true);
  const [dataObject, setDataObject] = React.useState<any>(null);
  const [Loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const covidData = fetch(`${url}historical/all?lastdays=all`);
    covidData
      .then((res) => res.json())
      .then((value) => {
        setcovidStats(value);
        setLoading(true);

       

        if (value.cases && showCases) {
          const CasesDates: string[] = Object.keys(value.cases);
          const AllCases: number[] = Object.values(value.cases); //for all covid cases

          const labels = CasesDates;

          const Dataset = {
            labels,
            datasets: [
              {
                label: "Cases",
                data: AllCases,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              }
            ],
          };
          setDataObject(Dataset);
          setLoading(false);
        } else if (value.deaths && showDeath) {
          const deathsDates: string[] = Object.keys(value.deaths);
          const deathsCases: number[] = Object.values(value.deaths); //for all covid cases

          const labels = deathsDates;

          const Dataset = {
            labels,
            datasets: [
              {
                label: "Deaths",
                data: deathsCases,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          };
          setDataObject(Dataset);
          setLoading(false);
        } else if (value.recovered && showRecovered) {
          const recoveredDates: string[] = Object.keys(value.recovered);
          const recoveredCases: number[] = Object.values(value.recovered); //for all covid cases

          const labels = recoveredDates;

          const Dataset = {
            labels,
            datasets: [
              {
                label: "Recovered",
                data: recoveredCases,
                fill: false,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          };
          setDataObject(Dataset);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [showCases, showRecovered, showDeath]);

  console.log(dataObject);
  const option = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  return (
    <main className="w-3/4 m-3 text-center h-auto flex flex-col align-middle justify-center mx-auto gap-2">
      {Loading ? !showCases && !showRecovered && !showDeath &&
        <p>Select one</p>
       : (
        <Line data={dataObject} options={option}></Line>
      )}
<div className='flex gap-2 justify-center '>
      <label className='pe-1'>
        <input
          type="checkbox"
          name="Covid Cases"
          checked={showCases }
          onChange={() => {
            setShowCases((value) => !value);
          }}
        />
        Covid Cases
      </label>

      <label className='pe-1'>
        <input
          type="checkbox"
          name="Recovered"
          checked={showRecovered}
          onChange={() => {
            setShowRecovered((value) => !value);
          }}
        />
        Recovered
      </label>

      <label className='pe-1'>
        <input
          type="checkbox"
          name="Deaths"
          checked={showDeath}
          onChange={() => {
            setShowDeath((value) => !value);
          }}
        />
        Deaths
      </label>
      </div>
    </main>
  );
};

export default ChartsMaps;
