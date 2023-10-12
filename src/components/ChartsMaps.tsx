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

  const url = "https://disease.sh/v3/covid-19/";

  const [CasesSelected, setCasesSelected]= React.useState<string>('Covid Cases')
  const [dataObject, setDataObject] = React.useState<any>(null);
  const [Loading, setLoading] = React.useState<boolean>(true);

  useEffect(() => {
    const covidData = fetch(`${url}historical/all?lastdays=all`);
    covidData
      .then((res) => res.json())
      .then((value) => {
        setLoading(true);

        if (value.cases && CasesSelected==='Covid Cases') {
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
        } else if (value.deaths && CasesSelected==='Death Cases') {
          const deathsDates: string[] = Object.keys(value.deaths);
          const deathsCases: number[] = Object.values(value.deaths); //for all deaths

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
        } else if (value.recovered && CasesSelected==='Recovered Cases') {
          const recoveredDates: string[] = Object.keys(value.recovered);
          const recoveredCases: number[] = Object.values(value.recovered); //for all recoveries

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
  }, [CasesSelected]);

  
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

  const handleValueChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setCasesSelected(e.target.value)//changing radio inputs
  }

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
  } = useQuery("countryData", fetchCountryData);//fetching data using useQuery hook

  console.log(countryData);

  const defaultIcon = new Icon({
    iconUrl:
      "https://www.iconpacks.net/icons/2/free-location-icon-2955-thumb.png", 
    iconSize: [25, 25], // The size of the icon
    iconAnchor: [12, 41], // The anchor point of the icon
    popupAnchor: [1, -34], // The anchor point for popups
  });// Creating icon for Marker

//--------End Maps---------//
  

  return (
    <main className="w-5/6 m-3 text-center h-auto flex flex-col align-middle justify-center sm:w-3/4 mx-auto gap-2">
      <p className="p-3 absolute top-0 left-0 right-0 text-3xl font-medium bg-slate-400 w-full text-center">
          Charts and Maps
        </p>
      {Loading ? ( <p>Loading.....</p>
      ) : (
        <Line className="mt-16" data={dataObject} options={option}></Line>//Line graph
      )}
      <div className="flex gap-2 justify-center ">
        <label className="pe-1">
          <input
            type="radio"
            name="Cases"
            value="Covid Cases"
            checked={CasesSelected==="Covid Cases"}
            onChange={handleValueChange}
          />
          Covid Cases
        </label>

        <label className="pe-1">
          <input
            type="radio"
            name="Cases"
            value="Recovered Cases"
            checked={CasesSelected==="Recovered Cases"}
            onChange={handleValueChange}
          />
          Recovered
        </label>

        <label className="pe-1">
          <input
            type="radio"
            name="Cases"
            value="Death Cases"
            checked={CasesSelected==="Death Cases"}
            onChange={handleValueChange}
          />
          Deaths
        </label>
      </div> 


      {mapError ? (
        <p>Error: {(mapError as Error).message}</p>
      ) : mapIsLoaded ? (
        <p>Loading...</p>
      ) : (<section className="flex-col flex gap-5 m-5 mt-6 z-0">
        <h2 className="text-md font-medium">Countries with total Covid cases, Recoveries and Deaths</h2>
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
