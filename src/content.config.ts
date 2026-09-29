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

const eventos = defineCollection({
  loader: glob({base: 'src/content/eventos', pattern: '*.md'}),
  schema: z.object({
    nombre: z.string(),
    // ISO YYYY-MM-DD; la misma cadena que consume src/lib/fechas.ts
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "fecha debe ser YYYY-MM-DD"),
    color: z.enum(["primary", "secondary"]).default("primary"),
  })
})

export const collections = {actividades, eventos}
