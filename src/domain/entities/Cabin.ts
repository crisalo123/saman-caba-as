export type Cabin = {
  id: string
  name: string
  beds: number
  capacity: number
  hasLivingRoom: boolean
  amenities: string[]
  images: string[]
  available: boolean
  priceFrom?: number
  blurb: string
}
