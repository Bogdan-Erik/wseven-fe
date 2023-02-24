// @ts-nocheck
import { match } from "assert";
import React, { useEffect, useState } from "react";

const NameGetter = (matchObject, side = 'home') => {
  if (side === 'home') {
    return matchObject?.homeTeam?.name ?? matchObject.homePlayer.first_name + ' ' + matchObject.homePlayer.last_name;
  } else {
  return matchObject?.awayTeam?.name ?? matchObject.awayPlayer.first_name + ' ' + matchObject.awayPlayer.last_name;
  }
}

export default NameGetter;