import React, { useEffect, useState, lazy, Suspense } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { getMetrics } from "../../api/metrics";

const DateTimeFilter = lazy(() => import("../DateTimeFilter"));
const LineChart = lazy(() => import("../MetricChart"));

const useStyles = makeStyles(() => ({
    root: {
        display: "flex",
        paddingTop: "16px",
        spacing: "24px",
    },
    topGrid: {
        marginTop: "16px",
        marginBottom: "32px",
    },
    leftGrid: {
        paddingTop: "16px",
        paddingRight: "8px",
    },
    rightGrid: {
        paddingTop: "16px",
        paddingLeft: "8px",
    },
    paper: {
        padding: "8px 8px",
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        height: 300,
    },
    titlePaper: {
        backgroundColor: "#2f4f4f",
        color: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },
}));

export default function Dashboard() {
    const [metrics, setMetrics] = useState({
        data: [],
        isLoading: false,
        error: null,
    });

    const LineMetricChart = ({ name, metric_key }) => (
        <LineChart name={name} metrics={metrics} metric_key={metric_key} />
    );

    const fetchMetrics = (queryParams = "") => {
        setMetrics({ ...metrics, isLoading: true, error: null });
        getMetrics(
            {
                onSuccess(result) {
                    setMetrics({ ...metrics, data: result.data, isLoading: false });
                },
                onError(error) {
                    setMetrics({ ...metrics, data: [], error, isLoading: false });
                    console.error(error);
                },
            },
            queryParams
        );
    };

    useEffect(fetchMetrics, []);

    const classes = useStyles();
    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.topGrid}>
                <Paper className={classes.titlePaper}>
                    <Typography variant="h5">Perfanalytics Dashboard</Typography>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Suspense fallback={<span />}>
                    <DateTimeFilter fetchMetrics={fetchMetrics} />
                </Suspense>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.leftGrid}>
                <Paper className={classes.paper}>
                    <Suspense fallback={<span />}>
                        <LineMetricChart name="TTFB" metric_key="ttfbTime" />
                    </Suspense>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.rightGrid}>
                <Paper className={classes.paper}>
                    <Suspense fallback={<span />}>
                        <LineMetricChart name="FCP" metric_key="fcpTime" />
                    </Suspense>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.leftGrid}>
                <Paper className={classes.paper}>
                    <Suspense fallback={<span />}>
                        <LineMetricChart name="DOM Load" metric_key="domLoadTime" />
                    </Suspense>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.rightGrid}>
                <Paper className={classes.paper}>
                    <Suspense fallback={<span />}>
                        <LineMetricChart name="Window Load" metric_key="windowLoadTime" />
                    </Suspense>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.leftGrid}>
                <Paper className={classes.paper}>
                    <Suspense fallback={<span />}>
                        <LineMetricChart
                            name="JS (Network Timings)"
                            metric_key="scriptResourceLoadTime"
                        />
                    </Suspense>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.rightGrid}>
                <Paper className={classes.paper}>
                    <Suspense fallback={<span />}>
                        <LineMetricChart
                            name="CSS (Network Timings)"
                            metric_key="cssResourceLoadTime"
                        />
                    </Suspense>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.leftGrid}>
                <Paper className={classes.paper}>
                    <Suspense fallback={<span />}>
                        <LineMetricChart
                            name="Image (Network Timings)"
                            metric_key="imgResourceLoadTime"
                        />
                    </Suspense>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.rightGrid}>
                <Paper className={classes.paper}>
                    <Suspense fallback={<span />}>
                        <LineMetricChart
                            name="Link (Network Timings)"
                            metric_key="linkResourceLoadTime"
                        />
                    </Suspense>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.leftGrid}>
                <Paper className={classes.paper}>
                    <Suspense fallback={<span />}>
                        <LineMetricChart
                            name="xmlhttprequest (Network Timings)"
                            metric_key="httpResourceLoadTime"
                        />
                    </Suspense>
                </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.rightGrid}>
                <Paper className={classes.paper}>
                    <Suspense fallback={<span />}>
                        <LineMetricChart
                            name="Fetch (Network Timings)"
                            metric_key="fetchResourceLoadTime"
                        />
                    </Suspense>
                </Paper>
            </Grid>
        </Grid>
    );
}
