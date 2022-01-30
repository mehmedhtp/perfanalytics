import React, { lazy, Suspense, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

const Chart = lazy(() => import("./Chart"));
const Message = lazy(() => import("./Message"));
const LoadingIndicator = lazy(() => import("./LoadingIndicator"));

function createData(time, value) {
    return { time, value };
}

const filterMetrics = (metrics, key) => {
    if (!metrics) return [];

    return metrics.data.map((metric) =>
        createData(dayjs(metric.date).unix(), metric[key])
    );
};

export default function MetricChart({ name, metrics, metric_key }) {
    let [values, setValues] = useState([]);

    useEffect(() => {
        setValues(filterMetrics(metrics, metric_key));
    }, [metrics, metric_key]);

    return (
        <>
            <Typography align="center" component="h2" variant="h6">
                {name}
            </Typography>

            {metrics.isLoading && <LoadingIndicator />}

            {!metrics.isLoading && metrics.data.length > 1 && (
                <Suspense fallback={<LoadingIndicator />}>
                    {values.length > 0 && <Chart data={values} />}
                </Suspense>
            )}

            {!metrics.isLoading && metrics.data.length < 2 && (
                <Message message={"There is not enough data to draw the chart."} />
            )}

            {metrics.error && <Message message={"An error occurred."} />}
        </>
    );
}
