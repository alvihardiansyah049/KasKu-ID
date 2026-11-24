import { format, subMonths } from 'date-fns'
import { id as localeId } from 'date-fns/locale'
import type { Account, Tx } from '../types'
export const fmtIDR = (n: number) => 'Rp ' + Math.round(n).toLocaleString('id-ID')
export const fmtDate = (iso: string) => format(new Date(iso + 'T00:00:00'), 'd MMM yyyy', { locale: localeId })
export const monthKey = (d: Date) => format(d, 'yyyy-MM')
const sum = (txs: Tx[], f: (t: Tx) => boolean) => txs.filter(f).reduce((a, t) => a + t.amount, 0)
export const income = (txs: Tx[], m: string) => sum(txs, t => t.type === 'income' && t.date.startsWith(m))
export const expense = (txs: Tx[], m: string) => sum(txs, t => t.type === 'expense' && t.date.startsWith(m))
// Account Balance = Opening + Income - Expenses + Transfer In - Transfer Out
export const balance = (a: Account, txs: Tx[]) => txs.reduce((s, t) => {
  if (t.accountId === a.id) s += t.type === 'income' ? t.amount : -t.amount
  if (t.type === 'transfer' && t.toAccountId === a.id) s += t.amount
  return s
}, a.opening)
export const savingsRate = (inc: number, exp: number) => (inc > 0 ? Math.max(0, ((inc - exp) / inc) * 100) : 0)
export const pctChange = (cur: number, prev: number) => (prev ? ((cur - prev) / prev) * 100 : 0)
export const cashFlowSeries = (txs: Tx[], months = 6) =>
  Array.from({ length: months }, (_, i) => {
    const d = subMonths(new Date(), months - 1 - i), k = monthKey(d)
    return { bulan: format(d, 'MMM', { locale: localeId }), Pemasukan: income(txs, k), Pengeluaran: expense(txs, k) }
  })
