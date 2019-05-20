import * as TWEEN from "es6-tween";

// Fetch marks
// const getMarks = url => {
//   return async () => {
//     try {
//       // const results = await fetch(
//       //   "https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/globe-points.json"
//       // );
//       // data = await results.json();
//       ];
//       return data;
//     } catch (error) {
//       return console.error(error);
//     }
//   };
// };

export const coordinatesToPosition = (coordinates, radius) => {
  const [lat, long] = coordinates;
  const phi = (lat * Math.PI) / 180;
  const theta = ((long - 180) * Math.PI) / 180;

  const x = -radius * Math.cos(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi);
  const z = radius * Math.cos(phi) * Math.sin(theta);

  return [x, y, z];
};

export const returnCurveCoordinates = (
  startCoordinates,
  endCoordinates,
  radius
) => {
  // Calculate the starting and end point
  const start = coordinatesToPosition(startCoordinates, radius);
  const end = coordinatesToPosition(endCoordinates, radius);

  // Calculate the mid-point
  const midPointX = (start[0] + end[0]) / 2;
  const midPointY = (start[1] + end[1]) / 2;
  const midPointZ = (start[2] + end[2]) / 2;

  // Calculate the distance between the two coordinates
  let distance = Math.pow(end[0] - start[0], 2);
  distance += Math.pow(end[1] - start[1], 2);
  distance += Math.pow(end[2] - start[2], 2);
  distance = Math.sqrt(distance);

  // Calculate the multiplication value
  let multipleVal = Math.pow(midPointX, 2);
  multipleVal += Math.pow(midPointY, 2);
  multipleVal += Math.pow(midPointZ, 2);
  multipleVal = Math.pow(distance, 2) / multipleVal;
  multipleVal = multipleVal * 0.35;

  // Apply the vector length to get new mid-points
  const midX = midPointX + multipleVal * midPointX;
  const midY = midPointY + multipleVal * midPointY;
  const midZ = midPointZ + multipleVal * midPointZ;

  // Return set of coordinates
  return {
    start,
    mid: [midX, midY, midZ],
    end
  };
};

export const tween = (
  from,
  to,
  animationDuration,
  easingFunction,
  onUpdate,
  onEnd
) => {
  new TWEEN.Tween(from)
    .to(to, animationDuration)
    .easing(TWEEN.Easing[easingFunction[0]][easingFunction[1]])
    .on("update", onUpdate)
    .on("complete", onEnd)
    .start();
};
