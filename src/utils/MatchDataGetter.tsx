
import React, { useEffect, useState } from "react";

const MatchDataGetter = (array: any, key: string, side: string) => {
  const result = array.find((item: any) => item.side === side && item.key === key);
  return result?.value ?? null;
}

export default MatchDataGetter;