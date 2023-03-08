
import React, { useEffect, useState } from "react";

const BetHelper = (type:any, bank:any, unit:any) => {
    if (bank === 0) {
        return 0;
    }

    if (type === 'fisher') {
        return ((bank / 100) * unit).toFixed(0);
    } else if (type === 'baller') {
        return ((bank / 50) * unit).toFixed(0);
    }

    return 0;
}

export default BetHelper;