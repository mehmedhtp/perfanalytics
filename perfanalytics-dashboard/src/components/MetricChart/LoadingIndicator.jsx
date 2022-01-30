import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingIndicator() {
    return (
        <div style={{ "display": "flex", "width": "100%", "height": "100%", "justifyContent": "center", "alignItems": "center" }}>
            <CircularProgress />
        </div>
    );
}
