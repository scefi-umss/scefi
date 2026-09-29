// Construye URLs internas respetando `base` (/scefi en prod, / en dev).
// Evita el clásico `//` de `${BASE_URL}/ruta` cuando BASE_URL termina en `/`.
export function base(path: string = "/"): string {
  const root = import.meta.env.BASE_URL
  const limpio = root.endsWith("/") && root !== "/" ? root.slice(0, -1) : root === "/" ? "" : root
  const ruta = path.startsWith("/") ? path : `/${path}`
  return `${limpio}${ruta}`
}
