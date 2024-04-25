export default function getTransformedData(
  x,
  y,
  preX1,
  preY1,
  preX2,
  preY2,
  crtX1,
  crtY1,
  crtX2,
  crtY2
) {
  const rad = Math.atan2(y - preY1, x - preX1) - Math.atan2(preY2 - preY1, preX2 - preX1);
  const dist = Math.sqrt(Math.pow(x - preX1, 2) + Math.pow(y - preY1, 2));

  const oldPnx = Math.cos(rad) * dist;
  const oldPny = Math.sin(rad) * dist;

  //获取指尖连线的 3个变化
  const deltaRotationRad =
    Math.atan2(crtY2 - crtY1, crtX2 - crtX1) - Math.atan2(preY2 - preY1, preX2 - preX1);
  const prevLength = Math.sqrt(Math.pow(preX2 - preX1, 2) + Math.pow(preY2 - preY1, 2));
  const newLength = Math.sqrt(Math.pow(crtX2 - crtX1, 2) + Math.pow(crtY2 - crtY1, 2));
  const scale = newLength / prevLength;

  // 将指尖连线的3个变化应用到 指尖坐标系的坐标

  const newPnx = oldPnx * scale;
  const newPny = oldPny * scale;
  // 再从指尖坐标系 换算回全局坐标系

  const nDist = Math.sqrt(newPnx * newPnx + newPny * newPny);
  const nRad = Math.atan2(newPny, newPnx) + Math.atan2(crtY2 - crtY1, crtX2 - crtX1);
  const newX = crtX1 + Math.cos(nRad) * nDist;
  const newY = crtY1 + Math.sin(nRad) * nDist;

  return {
    newX,
    newY,
    scale,
    deltaRotationRad,
  };
}
