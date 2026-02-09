import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: true, // Set to false if you want fresh data
  apiVersion: '2024-01-01', // Use current date for latest API features
})

// Helper function to get image URL
export function urlForImage(source: any) {
  if (!source || !source.asset) return ''
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${source.asset._ref
    .replace('image-', '')
    .replace('-jpg', '.jpg')
    .replace('-png', '.png')
    .replace('-webp', '.webp')
    .replace('-svg', '.svg')}`
}

// Example query functions
export async function getProjects() {
  const query = `*[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    image,
    technologies,
    link,
    githubLink,
    featured,
    order
  }`
  
  return sanityClient.fetch(query)
}

export async function getProfile() {
  const query = `*[_type == "profile"][0] {
    _id,
    name,
    bio,
    avatar,
    email,
    social,
    skills
  }`
  
  return sanityClient.fetch(query)
}

export async function getProjectBySlug(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    image,
    technologies,
    link,
    githubLink,
    featured
  }`
  
  return sanityClient.fetch(query, { slug })
}
