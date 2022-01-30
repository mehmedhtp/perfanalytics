import React, { memo, lazy, Suspense } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import queryString from "query-string";

const RangeSelector = lazy(() => import("./RangeSelector"));

function DateTimeFilter({ fetchMetrics }) {
    const [selectedBeginDateTime, setBeginDateTime] = React.useState(
        dayjs().subtract(30, "m").toDate()
    );
    const [selectedEndDateTime, setEndDateTime] = React.useState(new Date());

    const getDateTime = (dateTime) => {
        let fullDate = dayjs(dateTime);

        return dayjs(dateTime)
            .year(fullDate.year())
            .month(fullDate.month())
            .date(fullDate.date());
    };

    const updateMetrics = () => {
        const beginFullDate = dayjs(selectedBeginDateTime);
        const endFullDate = dayjs(selectedEndDateTime);
        const minDate = getDateTime(beginFullDate);
        const maxDate = getDateTime(endFullDate);

        fetchMetrics(
            "?" +
            queryString.stringify({
                min: minDate.toString(),
                max: maxDate.toString(),
            })
        );
    };

    return (
        <div style={{ "width": "100%" }}>
            <Card>
                <CardContent>
                    <Suspense fallback={<p>Loading...</p>}>
                        <RangeSelector
                            selectedBeginDateTime={selectedBeginDateTime}
                            setBeginDateTime={setBeginDateTime}
                            selectedEndDateTime={selectedEndDateTime}
                            setEndDateTime={setEndDateTime}
                        />
                    </Suspense>
                </CardContent>
                <CardActions style={{ "justifyContent": "end", "padding": "16px" }}>
                    <Button size="medium" variant="outlined" onClick={updateMetrics}>
                        Update
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default memo(DateTimeFilter);
