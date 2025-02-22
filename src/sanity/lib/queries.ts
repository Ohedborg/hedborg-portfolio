import { groq } from 'next-sanity'

export const bookImagesQuery = groq`
*[_type == "bookImage"] | order(createdAt desc) {
  _id,
  title,
  "imageUrl": image.asset->url,
  review,
  createdAt,
  bannerPosition,
  rating,
  strengths,
  weaknesses,
  finalVerdict
}`;