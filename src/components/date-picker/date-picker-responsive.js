import TextField from '@mui/material/TextField';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

export default function ResponsiveDatePicker({title, onChange, value, view}) {
  //const [value, setValue] = useState(new Date());
  const pickerView = () => {
    if(view === "year"){
      return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>      
        <DatePicker
          label = {title}
          openTo={"year"}
          views={['year']}
          value={value}
          onChange = {onChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
      );
    }
    if(view === "year-month"){
      return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>      
        <DatePicker
          //minDate={new Date()}
          label = {title}
          openTo="year"
          views={['year', 'month']}
          value={value}
          onChange = {onChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
      )
    }
  }
  return (
    <>
    {(view !== undefined)?
    <> 
    {pickerView()}
    </>
    :
    <LocalizationProvider dateAdapter={AdapterDateFns}>      
        <DatePicker
          minDate={new Date()}
          label = {title}
          openTo="day"
          views={['year', 'month', 'day']}
          value={value}
          onChange = {onChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
    }
    </>
  );
}