import {glob} from "astro/loaders"
import {defineCollection} from "astro:content"
import {z} from "astro/zod"

const actividades = defineCollection({
  loader: glob({base: 'src/content/actividades', pattern: '*.md'}),
  schema: z.object({
    name: z.string(),
    organizer: z.string()
  })
})

export const collections = {actividades}
