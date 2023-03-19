// @ts-nocheck
import { match } from "assert";
import React, { useEffect, useState } from "react";

const NameGetter = (matchObject, side = 'home') => {
  if (side === 'home') {
    if (matchObject?.homeTeam) {
      return matchObject?.homeTeam?.name + (matchObject?.homeTeam?.name_extension ? ' ' + matchObject?.homeTeam?.name_extension : '');

    } else {
      return  matchObject.homePlayer.first_name + ' ' + matchObject.homePlayer.last_name;

    }
  } else {
    if (matchObject?.awayTeam) {
      return matchObject?.awayTeam?.name + (matchObject?.awayTeam?.name_extension ? ' ' + matchObject?.awayTeam?.name_extension : '');
    } else {
      return matchObject.awayPlayer.first_name + ' ' + matchObject.awayPlayer.last_name;
    }
  }
}

export default NameGetter;