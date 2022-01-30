import React from "react";
import Typography from "@mui/material/Typography";

export default function Message({ message }) {
    return (
        <div style={{ "display": "flex", "width": "100%", "height": "100%", "justifyContent": "center", "alignItems": "center" }}>
            <Typography variant="subtitle1">{message}</Typography>
        </div>
    );
}
