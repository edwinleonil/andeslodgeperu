// One-off migration helper: downloads the original photos from the old Wix
// site into src/assets/images/ under descriptive names.
//
//   node scripts/fetch-wix-images.mjs          skip files that already exist
//   node scripts/fetch-wix-images.mjs --force  re-download everything
//
// Once you have replaced the photos with your own files you no longer need this.

import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../src/assets/images');
const force = process.argv.includes('--force');

// local name (without extension) -> Wix media id
const images = {
  'logo': '5382a5_b7b22d7e87e44787b3744e83835fac1e~mv2.jpg',
  'lodge-exterior': '5382a5_4856d45edacb4112b91ebd4b36f8d373~mv2.jpg',
  'terrace-covered-view': '5382a5_6f78da8338e241dc8af8a2bf2ae2efe9~mv2.jpg',
  'balcony-valley-view': '5382a5_6b6d3fd1d1fb4ac488940135f87786cc~mv2.jpg',
  'yanama-valley-panorama': '5382a5_8d3550f45fb14b4abdefea62de22c92c~mv2.jpg',
  'room-single': '5382a5_b1d9730d84654178bb389fa2fad3f5f7~mv2.jpg',
  'room-twin': '5382a5_2a68b5fc9e4b4f99b25f87aba971b950~mv2.jpg',
  'room-super-king': '5382a5_dd71739161bb4bdbb39c0ed9ffa0ab35~mv2.jpeg',
  'room-double': '5382a5_a7d1058964bf450a937266ce69bf0cff~mv2.jpeg',
  'room-triple': '5382a5_44442a56539f41688adcdb964f241306~mv2.jpg',
  'garden': '5382a5_d9fbf8022f8a4ede9c166fe011547aaa~mv2.jpg',
  'terrace-breakfast-table': '5382a5_1773be756dd742e0a8d8799eb8eddba4~mv2.jpg',
  'lounge': '5382a5_67bd66120eb94e30bc8d003fadf6345c~mv2.jpg',
  'oven-fire-night': '5382a5_56a2b45d548045e38994134ae50481ba~mv2.jpeg',
  'rooftop-terrace': '5382a5_a24ecb84bf3c41fca9c178e238d092ee~mv2.jpeg',
  'room-window-sunrise': '5382a5_c02a4b4ba393442a85ba0c41a790f218~mv2.jpeg',
  'bell-tower-sunset': '5382a5_0be38a75a49744e4b25a893f25d39a65~mv2.jpeg',
  'yanama-plaza': '5382a5_9264a4b6aaa146a8af7f8331faaed5fe~mv2.jpeg',
  'lake-llanganuco': '5382a5_de0cf67100544de2bbf771ff87c2e204~mv2.jpg',
  'viewpoint-sunburst': '5382a5_74e46baf042d4b6ebcdc067cc05d5045~mv2.jpeg',
  'yanama-plaza-snow-peak': '5382a5_75c7645e401e4365a7b3773f30ec3d25~mv2.jpg',
  'lodge-front': '5382a5_e93d8aa24d9d4bf5a1cbaa9b377c4ddd~mv2.jpg',
  'lodge-patio': '5382a5_335a6612db774e508c307869170708be~mv2.jpg',
  'terrace-parasol': '5382a5_39fc804151ef40c1af3447afd8464356~mv2.jpg',
  'bathroom': '5382a5_dac7787b8f87442893b586ab770050f6~mv2.jpeg',
  'garden-wide': '5382a5_e08c8458db4d4303810e764dc64edb37~mv2.png',
  'clay-oven': '5382a5_9f589b2536734b969575e541b4afba49~mv2.jpg',
  'garden-flowerbed': '5382a5_c7ed31ec0b2e4386bee7a2a7f1e3b9b0~mv2.jpg',
  'village-rooftops-snow-peak': '5382a5_75b8be2a20cc47c7aaebc3bb1c25b382~mv2.jpg',
  'bell-tower-sunset-wide': '5382a5_466b16ed39db4036b2f2c6f33f04eea1~mv2.jpeg',
  'yanama-plaza-festival': '5382a5_082b787016904600b3b207128b137791~mv2.jpg',
  'cordillera-blanca-peaks': '5382a5_1d1a9d92ebc84148b2fee92848569ea6~mv2.jpg',
  'yanama-church': '5382a5_8f2a60274854414281775f5bb970a208~mv2.jpeg',
  'waterfall': '5382a5_20b0ada35d874124a8d5d197b04b5608~mv2.jpg',
  'church-mural': '5382a5_b855ad7923d2455098dc27a53e310024~mv2.jpeg',
  'highland-lagoon': '5382a5_00c4d11019084a73a5ef4d9f70de052e~mv2.jpeg',
  'viewpoint-bell-tower': '5382a5_3a9ff85bf1cb49529064cd54325fe92b~mv2.jpeg',
  'red-flowers': '5382a5_9ac77cea50b44539a7e6c5cfb716a710~mv2.jpg',
};

const exists = (p) => access(p).then(() => true, () => false);

await mkdir(outDir, { recursive: true });
let failed = 0;
for (const [name, id] of Object.entries(images)) {
  const file = path.join(outDir, name + path.extname(id));
  if (!force && (await exists(file))) {
    console.log(`skip  ${path.basename(file)}`);
    continue;
  }
  const res = await fetch(`https://static.wixstatic.com/media/${id}`);
  if (!res.ok) {
    console.error(`FAIL  ${name} (${res.status})`);
    failed++;
    continue;
  }
  const data = Buffer.from(await res.arrayBuffer());
  await writeFile(file, data);
  console.log(`saved ${path.basename(file)} (${Math.round(data.length / 1024)} KB)`);
}
if (failed) process.exitCode = 1;
