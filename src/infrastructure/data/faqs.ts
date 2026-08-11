export type FaqItem = {
  id: string
  question: string
  answer: string
}

/** Preguntas frecuentes (contenido del cliente). */
export const faqs: FaqItem[] = [
  {
    id: 'ubicacion',
    question: '¿Dónde están ubicados?',
    answer: [
      'Bienvenidos a Cabañas El Samán.',
      '',
      'Estamos ubicados en Villavicencio, salida a Puerto López, al lado de la base aérea de Apiay.',
      'A 8 minutos del casco urbano.',
    ].join('\n'),
  },
  {
    id: 'precios',
    question: '¿Cuáles son los precios?',
    answer: [
      'Contamos con:',
      '',
      '• Cabaña de pareja — $120.000 por noche',
      '• Cabaña Medium (5 adultos) — $300.000 por noche',
      '• Cabaña Medium Plus (6 adultos) — $360.000 por noche',
      '• Cabaña Maxi (8 adultos) — $480.000 por noche',
      '',
      'INCLUIDO DESAYUNO',
      '',
      'Cuentan con: aire acondicionado, televisor, baño privado, piscina (hasta medianoche), billar, restaurante, bar, rana, bolirana, juegos de mesa y parqueadero.',
    ].join('\n'),
  },
  {
    id: 'maxi',
    question: 'Cabaña Maxi (8 personas)',
    answer: [
      'Capacidad: 8 personas',
      '',
      'Distribución: 3 habitaciones',
      '• Primera: cama doble (matrimonial)',
      '• Segunda: 2 camarotes',
      '• Tercera: 1 camarote',
      '',
      'Equipadas con: aire acondicionado, TV, baño privado y uso de todas las áreas sociales.',
      '',
      'Valor por noche: $480.000 con desayunos incluidos.',
    ].join('\n'),
  },
  {
    id: 'medium-plus',
    question: 'Cabaña Medium Plus (6)',
    answer: [
      'Capacidad: 6 personas',
      '',
      'Distribución: 2 habitaciones',
      '• Primera: cama doble (matrimonial)',
      '• Segunda: 2 camarotes',
      '',
      'Equipadas con: aire acondicionado, TV, baño privado y uso de todas las áreas sociales.',
      '',
      'Valor por noche: $360.000 con desayunos incluidos.',
    ].join('\n'),
  },
  {
    id: 'medium',
    question: 'Cabaña Medium (5)',
    answer: [
      'Capacidad: 5 personas',
      '',
      'Distribución: 2 habitaciones',
      '• Primera: cama doble (matrimonial)',
      '• Segunda: 3 camas',
      '',
      'Equipadas con: aire acondicionado, TV, baño privado y uso de todas las áreas sociales.',
      '',
      'Valor por noche: $300.000 con desayunos incluidos.',
    ].join('\n'),
  },
  {
    id: 'pareja',
    question: 'Cabaña de pareja',
    answer: [
      'Consta de:',
      '• 1 habitación con cama doble (matrimonial)',
      '',
      'Equipada con: baño privado, TV, aire acondicionado y uso de todas las áreas sociales.',
      '',
      'Valor: $120.000 por noche con desayuno incluido.',
    ].join('\n'),
  },
  {
    id: 'horarios',
    question: 'Check-in y check-out',
    answer: [
      '• Ingreso a piscina y áreas sociales desde las 11:00 am',
      '• Check-in a las habitaciones: 3:00 pm',
      '• Check-out (entrega de habitaciones): 1:00 pm',
      '• Pueden permanecer en piscina y áreas sociales hasta las 6:00 pm sin recargo',
    ].join('\n'),
  },
  {
    id: 'reservar',
    question: '¿Qué datos necesito para reservar?',
    answer: [
      'Para reservar necesitamos:',
      '',
      '• Nombre',
      '• Fecha de ingreso',
      '• Fecha de salida',
      '• Cantidad de personas',
      '• Número de contacto',
      '• Anticipo de $50.000',
    ].join('\n'),
  },
  {
    id: 'restaurante',
    question: 'Restaurante y menú',
    answer: [
      'Abierto todos los días hasta las 5:00 pm.',
      '',
      'Platos para almorzar ($30.000):',
      '• Mojarra 🐟',
      '• Cachama 🐟',
      '• Pechuga a la plancha 🍗',
      '• Churrasco 🥩',
    ].join('\n'),
  },
  {
    id: 'decoraciones',
    question: 'Decoraciones y cenas especiales',
    answer: [
      '• Decoración en habitación: $60.000',
      '• Decoración en mesa: $50.000',
      '• Cenas para ocasiones especiales: $30.000 cada una',
    ].join('\n'),
  },
  {
    id: 'mascotas',
    question: '¿Aceptan mascotas?',
    answer: [
      'Somos pet friendly: amigos de los perritos, excepto pitbull, doberman, rottweiler o cualquier otra raza agresiva o grande que pueda intimidar a niños, huéspedes u otras mascotas.',
      '',
      '(No hay excepciones)',
    ].join('\n'),
  },
  {
    id: 'pasadia',
    question: '¿Tienen pasadía?',
    answer: [
      'Pasadía en Cabañas El Samán incluye uso de todas las áreas sociales:',
      'piscina, bar, billar, bolirana, rana, restaurante y parrilla para asados.',
      '',
      'Horario: desde las 9:00 am hasta las 5:00 pm',
      'Valor: $15.000 por persona',
      'Bajo reserva',
    ].join('\n'),
  },
  {
    id: 'exclusividad',
    question: '¿Alquilan en exclusividad?',
    answer: [
      'Sí.',
      '',
      'Incluye:',
      '• 6 cabañas de pareja',
      '• 6 cabañas Maxi (hasta 8 personas)',
      '',
      'En todos los casos incluye uso de todas las áreas sociales: piscina, billar, restaurante, bar, rana, bolirana, juegos de mesa, cocina y parqueadero.',
      '',
      'Valor de la exclusividad: $2.500.000 por noche',
    ].join('\n'),
  },
]
