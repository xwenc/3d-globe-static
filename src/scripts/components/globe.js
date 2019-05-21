import {
  Group,
  Mesh,
  MeshLambertMaterial,
  SphereGeometry,
  TextureLoader
} from "three";

import { GLOBE_SEGMENTS, RADIUS } from "../default";

const textureLoader = texture => {
  return new Promise((resolve, reject) => {
    let sphere = new Mesh();
    new TextureLoader().load(
      texture,
      map => {
        sphere.geometry = new SphereGeometry(
          RADIUS,
          GLOBE_SEGMENTS,
          GLOBE_SEGMENTS
        );
        sphere.material = new MeshLambertMaterial({ map });
        resolve(sphere);
      },
      undefined,
      error => {
        reject(error);
      }
    );
  });
};

export default async ({ texture }) => {
  let globe = new Group();
  let sphere = await textureLoader(texture);
  globe.add(sphere);
  return globe;
}
