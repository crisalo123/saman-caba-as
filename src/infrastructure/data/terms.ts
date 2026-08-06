export type TermsSection = {
  title?: string
  items: string[]
  emphasis?: boolean
}

/** Contenido oficial de términos (el-saman.com.co) */
export const termsSections: TermsSection[] = [
  {
    items: [
      'Ingreso de elementos de decoración y menaje desde las 10:00 am',
      'Entrega de Cabañas 3:00 pm o antes si están disponibles (sujeto a disponibilidad)',
      'Uso de piscina de 9:00 am a 12 PM',
      'Sonido ambiente hasta la 1:00 am',
      'Uso de áreas sociales con volumen moderado hasta las 3:00 am',
      'Ingreso de comidas ilimitadas',
      'Ingreso de bebidas ilimitada solo en plástico y lata',
      'NO SE PERMITE EL INGRESO DE CERVEZA EN BOTELLA',
    ],
  },
  {
    title: 'Salida',
    items: [
      'Entrega de cabañas a la 1:00 pm (sin excepción)',
      'Pueden hacer uso de áreas sociales hasta las 6:00 pm',
    ],
  },
  {
    emphasis: true,
    items: [
      'IMPORTANTE: la exclusividad inicia a las 3:00 pm y termina el día de salida a la 1:00 pm',
      'EL CONTRATANTE ES RESPONSABLE POR CUALQUIER DAÑO QUE SE GENERE EN LAS INSTALACIONES',
    ],
  },
]
