
import React, { useEffect, useState } from "react";

const TransformServerImage = (imagePath:any) => {
  return (!imagePath.includes('http') ? import.meta.env.VITE_DO_IMAGE_HOST + imagePath : imagePath);
}

export default TransformServerImage;