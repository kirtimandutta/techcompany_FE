import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import {
  dedup,
  flatten,
  join,
  meshopt,
  prune,
  resample,
  simplify,
  sparse,
  weld,
} from "@gltf-transform/functions";
import { MeshoptSimplifier, MeshoptEncoder } from "meshoptimizer";
import { Jimp } from "jimp";
import { mkdir } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";

const SIZE = 1024;
const QUALITY = 72;
const input = path.resolve(
  "public/3d/Intergalactic_Spaceships_Version_2/GLTF_EMBEDDED/Intergalactic_Spaceships_Version_2.gltf",
);
const output = path.resolve("public/3d/spaceship.glb");

await MeshoptSimplifier.ready;
await MeshoptEncoder.ready;

const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({
  "meshopt.encoder": MeshoptEncoder,
  "meshopt.simplifier": MeshoptSimplifier,
});

const document = await io.read(input);

for (const texture of document.getRoot().listTextures()) {
  const image = texture.getImage();
  if (!image) continue;

  try {
    const bitmap = await Jimp.read(Buffer.from(image));
    bitmap.scaleToFit({ w: SIZE, h: SIZE });
    const resized = await bitmap.getBuffer("image/jpeg", { quality: QUALITY });
    texture.setImage(resized);
    texture.setMimeType("image/jpeg");
    console.log(
      `Resized texture "${texture.getName() || "unnamed"}" -> ${(resized.length / 1024).toFixed(1)} KB`,
    );
  } catch (error) {
    console.warn(`Skipping texture "${texture.getName() || "unnamed"}": ${error.message}`);
  }
}

await document.transform(
  dedup(),
  flatten(),
  join(),
  weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio: 0.75, error: 0.001 }),
  resample(),
  prune(),
  sparse(),
  meshopt({ encoder: MeshoptEncoder, level: "medium" }),
);

await mkdir(path.dirname(output), { recursive: true });
await io.write(output, document);

const mb = (statSync(output).size / (1024 * 1024)).toFixed(2);
console.log(`Wrote ${output} (${mb} MB)`);
