import {glob} from "astro/loaders"
import {defineCollection} from "astro:content"
import {z} from "astro/zod"

const actividades = defineCollection({
  loader: glob({base: 'src/content/actividades', pattern: '*.md'}),
  schema: ({image}) => z.object({
    name: z.string(),
    organizer: z.string(),
    // Opcionales: imagen y resumen que se muestran en la tarjeta de /actividades
    image: image().optional(),
    description: z.string().optional(),
  })
})

export const collections = {actividades}
