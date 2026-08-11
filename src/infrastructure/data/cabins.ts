import type { Cabin } from '@/domain/entities/Cabin'

const g = (file: string) => `/images/galeria/${file}`

/** Amenidades comunes según info del cliente. */
const baseAmenities = [
  'Aire acondicionado',
  'TV',
  'Baño privado',
  'Desayuno incluido',
]

/** Catálogo alineado con precios y capacidades del Excel de FAQs. */
export const cabins: Cabin[] = [
  {
    id: 'pareja',
    name: 'Cabaña de pareja',
    beds: 1,
    capacity: 2,
    hasLivingRoom: false,
    amenities: baseAmenities,
    images: [
      g('img_68eed550487de2.61563204.jpg'),
      g('img_69c41c5e021689.63955138.jpg'),
      g('img_69c41c10eba010.35792463.jpg'),
    ],
    available: true,
    priceFrom: 120000,
    blurb:
      '1 habitación con cama doble (matrimonial). Ideal para dos. Desayuno incluido.',
  },
  {
    id: 'medium',
    name: 'Cabaña Medium',
    beds: 4,
    capacity: 5,
    hasLivingRoom: false,
    amenities: baseAmenities,
    images: [
      g('img_68e2da86553ba2.80390096.jpg'),
      g('img_68e80ff3936361.91915629.jpg'),
      g('img_68e1708e8c35e2.36721000.jpg'),
    ],
    available: true,
    priceFrom: 300000,
    blurb:
      '2 habitaciones: cama doble + 3 camas. Hasta 5 adultos. Desayunos incluidos.',
  },
  {
    id: 'medium-plus',
    name: 'Cabaña Medium Plus',
    beds: 5,
    capacity: 6,
    hasLivingRoom: false,
    amenities: baseAmenities,
    images: [
      g('1a.jpg'),
      g('img_6a691af34a4c02.96442770.jpg'),
      g('img_68df17599632e6.03788700.jpg'),
    ],
    available: true,
    priceFrom: 360000,
    blurb:
      '2 habitaciones: cama doble + 2 camarotes. Hasta 6 adultos. Desayunos incluidos.',
  },
  {
    id: 'maxi',
    name: 'Cabaña Maxi',
    beds: 7,
    capacity: 8,
    hasLivingRoom: false,
    amenities: baseAmenities,
    images: [
      g('img_68e8147c8e9363.18045075.jpg'),
      g('img_68e813997e5044.00874385.jpg'),
      g('img_68eed5f27986c3.81967944.jpg'),
    ],
    available: true,
    priceFrom: 480000,
    blurb:
      '3 habitaciones: cama doble + 3 camarotes. Hasta 8 adultos. Desayunos incluidos.',
  },
]

export const galleryImages = [
  g('1a.jpg'),
  g('img_6a691af34a4c02.96442770.jpg'),
  g('img_68df17599632e6.03788700.jpg'),
  g('img_68e2da86553ba2.80390096.jpg'),
  g('img_68e80ff3936361.91915629.jpg'),
  g('img_68e1708e8c35e2.36721000.jpg'),
  g('img_68e8147c8e9363.18045075.jpg'),
  g('img_68e813997e5044.00874385.jpg'),
  g('img_68eed5f27986c3.81967944.jpg'),
  g('img_68eed550487de2.61563204.jpg'),
  g('img_69c41c5e021689.63955138.jpg'),
  g('img_69c41c10eba010.35792463.jpg'),
  g('img_682bbc06eebeb3.53871622.jpg'),
  g('img_682bbc06339e77.61616680.jpg'),
  g('img_682bbc084318e6.60262831.jpg'),
  g('img_682f45d2b93383.05526858.jpg'),
  g('img_682f45d30a2011.63955946.jpg'),
  g('img_682f45d30f48d2.52238529.jpg'),
]
