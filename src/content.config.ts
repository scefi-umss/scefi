import {glob} from "astro/loaders"
import {defineCollection} from "astro:content"
import {z} from "astro/zod"

const actividades = defineCollection({
  loader: glob({base: 'src/content/actividades', pattern: '*.md'}),
  schema: ({image}) => z.object({
    name: z.string(),
    organizer: z.string(),
    // Opcionales: imagen y resumen que se muestran en las tarjetas.
    // Son la única fuente: homepage (destacada + carrusel) y /actividades
    // leen de aquí, no hay copias hardcodeadas en las páginas.
    image: image().optional(),
    description: z.string().optional(),
    // Fecha para ordenar (la más reciente = destacada en la homepage).
    fecha: z.coerce.date().optional(),
  })
})

export const collections = {actividades}
