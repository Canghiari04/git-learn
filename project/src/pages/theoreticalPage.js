import '../css/theoretical.css';

import { BackShortCut, ForwardShortCut } from '../utils/shortcut.js';

function TheoreticalPage({onChange}) {
    BackShortCut("/learn");
    ForwardShortCut("");

    return (
        <>
            <span>WIP</span>
        </>
    );
}

export default TheoreticalPage;