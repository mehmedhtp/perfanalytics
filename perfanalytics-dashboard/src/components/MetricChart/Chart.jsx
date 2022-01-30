import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";
import dayjs from "dayjs";

export default function Chart({ data }) {
    return (
        <ResponsiveContainer>
            <LineChart
                data={data}
                key={data.length > 0}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis
                    dataKey="time"
                    type="number"
                    tickFormatter={(unixTime) => dayjs.unix(unixTime).format("HH:mm")}
                    domain={[data?.[0]?.time, data?.[data?.length]?.time]}
                />
                <YAxis tickFormatter={(value) => `${value} ms`} />
            </LineChart>
        </ResponsiveContainer>
    );
}
