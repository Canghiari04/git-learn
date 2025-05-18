import "../css/loading.css";

import { BeatLoader } from "react-spinners";

export function Loading() {
    return (
        <>
            <div className="div-loading">
                <BeatLoader color="white"/>
            </div>
        </>
    );
}