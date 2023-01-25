
import React, { useEffect, useState } from "react";

const TransformServerImage = (imagePath:any) => {
  return (!imagePath.includes('http') ? import.meta.env.VITE_BACKEND_URL + 'storage/' + imagePath : imagePath);
}

export default TransformServerImage;