import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId: projectId !== 'your-sanity-project-id' ? projectId : 'demo-id',
  dataset,
  apiVersion,
  useCdn: true,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  if (!source) return null
  try {
    return builder.image(source)
  } catch (e) {
    return null
  }
}
