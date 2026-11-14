// Every photo on the site lives in src/assets/images/ and is referred to by its
// file name without the extension. To replace a photo, drop a new file with the
// same name into that folder (jpg, jpeg, png, webp or avif) and delete the old one.

import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG}',
  { eager: true },
);

const byName = new Map<string, ImageMetadata>();
for (const [path, mod] of Object.entries(files)) {
  const name = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  byName.set(name, mod.default);
}

/** Description of each photo, read out by screen readers and used by search engines. */
export const alt: Record<string, string> = {
  'logo': 'Andes Lodge Peru logo',
  'lodge-exterior': 'The three-storey lodge with wooden balconies',
  'terrace-covered-view': 'Covered terrace with deckchairs looking out to snow-capped mountains',
  'balcony-valley-view': 'View from a wooden balcony over green fields and the village',
  'yanama-valley-panorama': 'Panorama of the Yanama valley beneath the snow peaks of the Cordillera Blanca',
  'room-single': 'Single room with a striped bedspread and a large window',
  'room-twin': 'Twin room with two single beds and a balcony door',
  'room-super-king': 'Super king-size room with a large bed, armchair and wooden floor',
  'room-double': 'Double room with a wooden bed and a mountain view from the window',
  'room-triple': 'Triple room with single beds and a balcony overlooking the village',
  'garden': 'The lodge garden with its lawn and trees',
  'terrace-breakfast-table': 'Breakfast table set on the terrace with mountains behind',
  'lounge': 'Lounge with wooden armchairs, a colourful rug, a television and a guitar',
  'oven-fire-night': 'Fire burning in the clay oven at night',
  'rooftop-terrace': 'Rooftop terrace with a view of a snow-capped peak',
  'room-window-sunrise': 'Sun rising over the mountains seen through a bedroom window',
  'bell-tower-sunset': 'Bell tower viewpoint silhouetted against the sun and a sharp mountain peak',
  'yanama-plaza': 'The main square of Yanama under a blue sky',
  'lake-llanganuco': 'A walker sitting by the turquoise water of Lake Llanganuco',
  'viewpoint-sunburst': 'Sun over the mountain ranges seen from the bell tower viewpoint',
  'yanama-plaza-snow-peak': 'Yanama square and church tower with a snow-covered peak behind',
  'lodge-front': 'Front of the lodge with its Andes Lodge Peru sign, seen across a field',
  'lodge-patio': 'Lodge patio with chairs, lawn and wooden balconies above',
  'terrace-parasol': 'Terrace table and chairs under a parasol',
  'bathroom': 'Bathroom with a bath, shower and washbasin',
  'garden-wide': 'Wide view of the lodge garden',
  'clay-oven': 'Traditional clay oven with a wood fire',
  'garden-flowerbed': 'Flowerbeds along the garden path',
  'village-rooftops-snow-peak': 'Village rooftops with a snow-capped mountain behind',
  'bell-tower-sunset-wide': 'Bell tower viewpoint at sunset',
  'yanama-plaza-festival': 'Yanama square decorated for a festival',
  'cordillera-blanca-peaks': 'Snow-covered peaks of the Cordillera Blanca',
  'yanama-church': 'The church in Yanama with its flower gardens',
  'waterfall': 'Waterfall running down a rock face',
  'church-mural': 'Painted mural on the wall beside the church',
  'highland-lagoon': 'Small lagoon on the high grassland',
  'viewpoint-bell-tower': 'Stone bell tower at the viewpoint above the village',
  'red-flowers': 'Red flowers in the countryside around Yanama',
};

export function img(name: string): { src: ImageMetadata; alt: string } {
  const src = byName.get(name);
  if (!src) {
    throw new Error(
      `Image "${name}" not found in src/assets/images/. Add a file called ${name}.jpg (or .png / .webp).`,
    );
  }
  return { src, alt: alt[name] ?? '' };
}

/** Photos shown on the Gallery page, in order. Add, remove or reorder names here. */
export const gallery: string[] = [
  'lodge-front',
  'lodge-exterior',
  'rooftop-terrace',
  'lodge-patio',
  'terrace-parasol',
  'terrace-covered-view',
  'bathroom',
  'lounge',
  'room-triple',
  'room-single',
  'garden-wide',
  'clay-oven',
  'garden-flowerbed',
  'village-rooftops-snow-peak',
  'bell-tower-sunset-wide',
  'yanama-plaza-festival',
  'cordillera-blanca-peaks',
  'lake-llanganuco',
  'yanama-church',
  'yanama-plaza',
  'waterfall',
  'church-mural',
  'highland-lagoon',
  'viewpoint-bell-tower',
  'red-flowers',
];
