// Helpers de fecha ISO "YYYY-MM-DD" en UTC.
// La web es estática: el mismo algoritmo corre en el servidor (build)
// y en el navegador (los eventos pueden vencer después de publicar).
// No duplicar esta lógica en componentes: importar desde aquí.
export const MS_POR_DIA = 1000 * 60 * 60 * 24

export function parseFechaISO(fecha: string): { anio: number; mes: number; dia: number } {
  const [anio, mes, dia] = fecha.split("-").map(Number)
  return { anio, mes, dia }
}

export function inicioDiaUTC(fecha: string): number {
  const { anio, mes, dia } = parseFechaISO(fecha)
  return Date.UTC(anio, mes - 1, dia)
}

export function inicioHoyUTC(hoy: Date = new Date()): number {
  return Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
}

// Un evento sigue vigente hasta el final de su día.
export function yaPaso(fecha: string, hoy: Date = new Date()): boolean {
  return inicioDiaUTC(fecha) < inicioHoyUTC(hoy)
}

export function diasRestantes(fecha: string, hoy: Date = new Date()): number {
  return Math.max(0, Math.round((inicioDiaUTC(fecha) - inicioHoyUTC(hoy)) / MS_POR_DIA))
}

export function fechaLegible(fecha: string): string {
  const { anio, mes, dia } = parseFechaISO(fecha)
  return `${String(dia).padStart(2, "0")}/${String(mes).padStart(2, "0")}/${anio}`
}
