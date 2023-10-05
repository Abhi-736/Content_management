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
  /* interface dataSetType {
    label: string[];
    dataset: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
    };
  } */

  const url = "https://disease.sh/v3/covid-19/";

  const [covidStats, setcovidStats] = React.useState<chartType[] | undefined[]>(
    []
  );
  const [showRecovered, setShowRecovered] = React.useState<boolean>(true);
  const [showDeath, setShowDeath] = React.useState<boolean>(false);
  const [showCases, setShowCases] = React.useState<boolean>(false);
  const [dataObject, setDataObject] = React.useState<any>({});

  React.useEffect(() => {
    const covidData = fetch(`${url}historical/all?lastdays=all`);
    covidData
      .then((res) => res.json())
      .then((value) => {
        console.log(Object.values(value.cases));
        setcovidStats(value);

        const CasesDates: string[] = Object.keys(value.cases);
        const AllCases: number[] = Object.values(value.cases); //for all covid cases

        const recoveredDates: string[] = Object.keys(value.recovered);
        const recoveredCases: number[] = Object.values(value.recovered); //for all recovered cases

        const deathsDates: string[] = Object.keys(value.deaths);
        const deathsCases: number[] = Object.values(value.deaths); //for all the deaths

        const dataset = {
          label: showCases
            ? CasesDates
            : showRecovered
            ? recoveredDates
            : showDeath
            ? deathsDates
            : [],
          dataset: {
            label: showCases
              ? "Cases"
              : showRecovered
              ? "Recovered"
              : showDeath
              ? "Deaths"
              : "",
            data: showCases
              ? AllCases
              : showRecovered
              ? recoveredCases
              : showDeath
              ? deathsCases
              : [],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        };
        setDataObject(dataset);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(covidStats);
  }, [showCases, showRecovered, showDeath]);

  const option = { plugins: {
    legend: {
      display: true,
    },
  },
  scales: {
    y: {},
  },
  };

  return (
    <main className="w-full text-center h-auto flex flex-col align-middle justify-center gap-2">
      <Line data={dataObject} options={option}></Line>

      <label>
        <input
          type="checkbox"
          name="Covid Cases"
          value="Option 1"
          onChange={() => {
            setShowCases((value) => !value);
          }}
        />
        Covid Cases
      </label>

      <label>
        <input
          type="checkbox"
          name="Recovered"
          value="Option 2"
          onChange={() => {
            setShowRecovered((value) => !value);
          }}
        />
        Recovered
      </label>

      <label>
        <input
          type="checkbox"
          name="Deaths"
          value="Option 2"
          onChange={() => {
            setShowDeath((value) => !value);
          }}
        />
        Deaths
      </label>
    </main>
  );
};

export default ChartsMaps;
