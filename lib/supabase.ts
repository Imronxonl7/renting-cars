const SUPABASE_URL = 'https://ikpfkhvdwjrblaiyniru.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_SbG03902HzuTqSDtUIqsQQ_PE0BqWfA'

export const getSupabaseRows = async <T,>(table: string): Promise<T[]> => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${table}?select=*`, {
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Supabase API bilan bog'lanishda xatolik: ${response.status}`)
  }

  return (await response.json()) as T[]
}
