export type TxType = 'income' | 'expense' | 'transfer'
export type AccountKind = 'Cash' | 'Bank' | 'E-wallet' | 'Savings'
export interface Account { id: string; name: string; kind: AccountKind; opening: number }
export interface Tx { id: string; type: TxType; name: string; amount: number; category: string; accountId: string; toAccountId?: string; date: string; note?: string }
export interface Budget { category: string; limit: number }
export interface Goal { id: string; name: string; target: number; saved: number; due: string }
export type Theme = 'light' | 'dark'
