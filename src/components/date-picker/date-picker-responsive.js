import TextField from '@mui/material/TextField';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

export default function ResponsiveDatePicker({title}) {

  const [value, setValue] = useState(new Date());
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>      
        <DatePicker
          disableFuture
          label = {title}
          openTo="day"
          views={['year', 'month', 'day']}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />


    </LocalizationProvider>
  );
}