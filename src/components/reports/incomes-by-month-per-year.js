import { Bar } from 'react-chartjs-2';
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useState, useEffect } from 'react';
import LinearLoader from "../loaders/LinealLoader";
import { getEvents } from 'src/utils/eventAxios';
import ResponsiveDatePicker from '../date-picker/date-picker-responsive';

export const IncomesPerYear = ({payments}) => {
  const theme = useTheme();
  const [firstLoading, setFirstLoading] = useState(true)
  const [data, setData] = useState()
  const [options, setOptions] = useState()
  const [date , setDate] = useState(new Date())
  const incomesPerMonth = [0,0,0,0,0,0,0,0,0,0,0,0]

  useEffect(() => {

      getIncomesPerMonth(payments);
    
       
  }, [date])

  /**
 * Obtains the incomes per month in the current year, sets the date and the options for the bar chart 
 * @param {*} data Payments from the db 
 */
  const getIncomesPerMonth = (data) => {
      data.map((element) => {
        const dateEvent = element.Date
        const year = parseInt(dateEvent.substr(0,4))
        const month = parseInt(dateEvent.substr(6,2)) - 1
        if(year === date.getFullYear()){
          console.log("entré")
          incomesPerMonth[month] =  incomesPerMonth[month] + parseInt(element.Value)
        }
        
      })
    
      setData(
        {
          datasets: [
            {
              backgroundColor: '#3F51B5',
              barPercentage: 0.5,
              barThickness: 12,
              borderRadius: 4,
              categoryPercentage: 0.5,
              data: incomesPerMonth,
              label: '# de eventos',
              maxBarThickness: 10
            },
          ],
          labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May' ,'Jun', 'Jul', 'Ago', 'Sep', "Oct", "Nov", "Dic"]
        }
      )
      setOptions(
        {
          animation: false,
          cornerRadius: 20,
          layout: { padding: 0 },
          legend: { display: false },
          maintainAspectRatio: false,
          responsive: true,
          xAxes: [
            {
              ticks: {
                fontColor: theme.palette.text.secondary
              },
              gridLines: {
                display: false,
                drawBorder: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: theme.palette.text.secondary,
                beginAtZero: true,
                min: 0
              },
              gridLines: {
                borderDash: [2],
                borderDashOffset: [2],
                color: theme.palette.divider,
                drawBorder: false,
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
                zeroLineColor: theme.palette.divider
              }
            }
          ],
          tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
          },
          scales: {
            y:
              {
                min: 0,
                max: Math.max(...incomesPerMonth),
              },
            x:
              {
                
              },
          },
        }
      )
      setFirstLoading(false)
    
  }

  return (
    <>
    {firstLoading? 
     <LinearLoader upperMessage="Cargando reporte..."></LinearLoader>
    :
    <Card>
      <CardHeader
        action={(
          <ResponsiveDatePicker
                name="year"
                title="Año"
                onChange={(e)=>{setDate(e)}}
                value={date}
                view = "year"
              />
        )}
        title="Ingresos por mes"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
      </Box>
    </Card>
    
    }
    </>
    
  );
};
