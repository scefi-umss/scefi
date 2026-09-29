// Acceso único a las actividades: la colección md es la fuente de verdad.
// La homepage (destacada + carrusel) y /actividades ordenan desde aquí.
import { getCollection, type CollectionEntry } from "astro:content"

export type Actividad = CollectionEntry<"actividades">

export async function getActividadesOrdenadas(): Promise<Actividad[]> {
  const todas = await getCollection("actividades")
  return todas.sort((a, b) => {
    const fa = a.data.fecha?.getTime() ?? 0
    const fb = b.data.fecha?.getTime() ?? 0
    if (fa !== fb) return fb - fa // la más reciente primero
    return a.id.localeCompare(b.id)
  })
}
