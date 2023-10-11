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

import { useEffect } from "react";
import React from "react";
import { useQuery } from "react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import { Icon } from "leaflet";

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

  useEffect(() => {
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
              },
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

  /* console.log(dataObject); */
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

//-----Start Maps------//

  interface CountryInfo {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  }

  interface CountryData {
    updated: number;
    country: string;
    countryInfo: CountryInfo;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    todayRecovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    tests: number;
    testsPerOneMillion: number;
    population: number;
    continent: string;
    oneCasePerPeople: number;
    oneDeathPerPeople: number;
    oneTestPerPeople: number;
    activePerOneMillion: number;
    recoveredPerOneMillion: number;
    criticalPerOneMillion: number;
  }

  const fetchCountryData = async () => {
    const response = await fetch(`${url}countries`);

    if (!response.ok) {
      throw new Error("error in fetching data");
    }
    return response.json();
  };

  const {
    data: countryData,
    error: mapError,
    isLoading: mapIsLoaded,
  } = useQuery("countryData", fetchCountryData);//fetch data using useQuery hook

  console.log(countryData);

  const defaultIcon = new Icon({
    iconUrl:
      "https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png", // Replace with the actual path to your marker icon
    iconSize: [25, 25], // The size of the icon
    iconAnchor: [12, 41], // The anchor point of the icon
    popupAnchor: [1, -34], // The anchor point for popups
  });// Creating icon for Marker

//--------End Maps---------//
  

  return (
    <main className="w-3/4 m-3 text-center h-auto flex flex-col align-middle justify-center mx-auto gap-2">
      {Loading ? (
        !showCases && !showRecovered && !showDeath && <p>Select one</p>
      ) : (
        <Line data={dataObject} options={option}></Line>
      )}
      <div className="flex gap-2 justify-center ">
        <label className="pe-1">
          <input
            type="checkbox"
            name="Covid Cases"
            checked={showCases}
            onChange={() => {
              setShowCases((value) => !value);
            }}
          />
          Covid Cases
        </label>

        <label className="pe-1">
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

        <label className="pe-1">
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
      {mapError ? (
        <p>Error: {(mapError as Error).message}</p>
      ) : mapIsLoaded ? (
        <p>Loading...</p>
      ) : (<section className="flex-col gap-2">
        <h2>Map</h2>
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={2}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {countryData &&
            countryData.map((Country: CountryData) => (
              <Marker
                key={Country.country}
                position={[Country.countryInfo.lat, Country.countryInfo.long]}
                icon={defaultIcon}
              >
                <Popup>
                  <strong>{Country.country}</strong>
                  <br />
                  Total Cases: {Country.cases}
                  <br />
                  Active Cases: {Country.active}
                  <br />
                  Recovered Cases: {Country.recovered}
                  <br />
                  Deaths: {Country.deaths}
                </Popup>
              </Marker>
            ))}
        </MapContainer>

        </section>
      )}
    </main>
  );
};

export default ChartsMaps;
