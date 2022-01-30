import React from "react";
import Stack from '@mui/material/Stack';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';

export default function RangeSelector({ selectedBeginDateTime, setBeginDateTime, selectedEndDateTime, setEndDateTime }) {
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack spacing={3}>
                <DateTimePicker
                    value={selectedBeginDateTime}
                    onChange={(newSelectedBeginDateTime) => {
                        setBeginDateTime(newSelectedBeginDateTime);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    value={selectedEndDateTime}
                    onChange={(newSelectedEndDateTime) => {
                        setEndDateTime(newSelectedEndDateTime);
                    }}
                />
            </Stack>
        </LocalizationProvider>
    )
}