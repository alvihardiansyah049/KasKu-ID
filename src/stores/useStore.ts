import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Account, Budget, Goal, Theme, Tx } from '../types'
import { seedAccounts, seedBudgets, seedGoals, seedTxs } from '../services/seed'
interface State {
  accounts: Account[]; txs: Tx[]; budgets: Budget[]; goals: Goal[]; theme: Theme
  setTheme: (t: Theme) => void
  addTx: (t: Omit<Tx, 'id'>) => void
  updateTx: (id: string, t: Partial<Tx>) => void
  deleteTx: (id: string) => void
}
// Data layer: ganti isi action dengan panggilan API saat backend tersedia.
export const useStore = create<State>()(persist((set) => ({
  accounts: seedAccounts, txs: seedTxs(), budgets: seedBudgets, goals: seedGoals,
  theme: matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  setTheme: (theme) => set({ theme }),
  addTx: (t) => set((s) => ({ txs: [...s.txs, { ...t, id: 't' + Date.now() }] })),
  updateTx: (id, t) => set((s) => ({ txs: s.txs.map((x) => (x.id === id ? { ...x, ...t } : x)) })),
  deleteTx: (id) => set((s) => ({ txs: s.txs.filter((x) => x.id !== id) })),
}), { name: 'kasku-store' }))
