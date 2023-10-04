import { Line } from 'react-chartjs-2';
import React from 'react'

const ChartsMaps = () => {

  interface chartData {
    [date:string]:number
  }

interface chartType {
cases?:chartData,
deaths?:chartData,
recovered?:chartData
}


const url= 'https://disease.sh/v3/covid-19/'

  const [covidStats,setcovidStats]= React.useState<chartType[] | undefined[]>([])
  const [recovered,setRecovered] =React.useState<chartType[] | undefined[]>([])

  React.useEffect(()=>{
const covidData= fetch(`${url}all`)
covidData.then((res)=>res.json()).then((value)=>{console.log(value)}).catch((error)=>{console.log(error)})
  })
  

  return (
    <main className='w-full text-center'>

helloadfhaosh

    </main>
  
  )
}

export default ChartsMaps