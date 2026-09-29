// Acceso único a los eventos: la colección md es la fuente de verdad.
// Se ordenan por fecha ascendente (el más cercano primero) y se recortan
// a `limite` (la homepage pide 5).
import { getCollection, type CollectionEntry } from "astro:content"
import { yaPaso } from "./fechas"

export type Evento = CollectionEntry<"eventos">

export async function getEventosVigentes(limite: number = Number.POSITIVE_INFINITY): Promise<Evento[]> {
  const todos = await getCollection("eventos")
  return todos
    .filter((e) => !yaPaso(e.data.fecha))
    .sort((a, b) => a.data.fecha.localeCompare(b.data.fecha))
    .slice(0, limite)
}
