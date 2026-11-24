import { format, subMonths } from 'date-fns'
import type { Account, Budget, Goal, Tx } from '../types'
export const CATEGORIES = ['Gaji', 'Freelance', 'Makan', 'Transportasi', 'Tagihan', 'Hiburan', 'Belanja', 'Kesehatan', 'Tabungan', 'Lainnya']
export const seedAccounts: Account[] = [
  { id: 'a1', name: 'Dompet Tunai', kind: 'Cash', opening: 800000 },
  { id: 'a2', name: 'Bank BCA', kind: 'Bank', opening: 6000000 },
  { id: 'a3', name: 'GoPay', kind: 'E-wallet', opening: 500000 },
  { id: 'a4', name: 'Tabungan Utama', kind: 'Savings', opening: 3000000 },
]
export const seedBudgets: Budget[] = [
  { category: 'Makan', limit: 3000000 }, { category: 'Transportasi', limit: 1000000 },
  { category: 'Tagihan', limit: 1000000 }, { category: 'Hiburan', limit: 700000 }, { category: 'Belanja', limit: 1200000 },
]
export const seedGoals: Goal[] = [
  { id: 'g1', name: 'Dana Darurat', target: 30000000, saved: 14500000, due: '2027-06-30' },
  { id: 'g2', name: 'Laptop Baru', target: 15000000, saved: 6200000, due: '2027-03-15' },
  { id: 'g3', name: 'Liburan Bali', target: 8000000, saved: 2100000, due: '2027-08-01' },
]
export function seedTxs(): Tx[] {
  const out: Tx[] = []; let n = 1
  const add = (t: Omit<Tx, 'id'>) => out.push({ ...t, id: 't' + n++ })
  for (let m = 0; m < 6; m++) {
    const k = format(subMonths(new Date(), m), 'yyyy-MM')
    add({ type: 'income', name: 'Gaji Bulanan', amount: 12000000 + m * 150000, category: 'Gaji', accountId: 'a2', date: k + '-01' })
    if (m % 2 === 0) add({ type: 'income', name: 'Proyek Freelance', amount: 2500000, category: 'Freelance', accountId: 'a2', date: k + '-12' })
    add({ type: 'expense', name: 'Makan & Groceries', amount: 2400000 + m * 90000, category: 'Makan', accountId: 'a1', date: k + '-05' })
    add({ type: 'expense', name: 'Bensin & Ojol', amount: 900000, category: 'Transportasi', accountId: 'a3', date: k + '-08' })
    add({ type: 'expense', name: 'Listrik & Internet', amount: 850000, category: 'Tagihan', accountId: 'a2', date: k + '-10' })
    add({ type: 'expense', name: 'Nonton & Hobi', amount: 600000 + m * 40000, category: 'Hiburan', accountId: 'a3', date: k + '-15' })
    add({ type: 'expense', name: 'Belanja Bulanan', amount: 1100000, category: 'Belanja', accountId: 'a3', date: k + '-18' })
    add({ type: 'transfer', name: 'Tabung Bulanan', amount: 2000000, category: 'Tabungan', accountId: 'a2', toAccountId: 'a4', date: k + '-02' })
  }
  return out
}
