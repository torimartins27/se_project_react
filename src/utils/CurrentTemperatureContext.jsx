// originally had this in a contexts folder but
// automated tests wouldnt pass unless I put it in
// vendor or utils, dont know how to fix

import { createContext } from "react";

const CurrentTemperatureUnitContext = createContext();

export default CurrentTemperatureUnitContext;
