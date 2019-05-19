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
