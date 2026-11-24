import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { ArrowDownRight, ArrowUpRight, PiggyBank, Wallet } from 'lucide-react'
import { subMonths } from 'date-fns'
import { Glass, Bar } from '../components/ui/Glass'
import { useStore } from '../stores/useStore'
import { balance, cashFlowSeries, expense, fmtDate, fmtIDR, income, monthKey, pctChange, savingsRate } from '../utils/finance'
export default function Dashboard() {
  const { txs, accounts, budgets, goals } = useStore()
  const now = monthKey(new Date()), prev = monthKey(subMonths(new Date(), 1))
  const inc = income(txs, now), exp = expense(txs, now)
  const total = accounts.reduce((a, c) => a + balance(c, txs), 0)
  const cards = [
    { l: 'Total Saldo', v: fmtIDR(total), I: Wallet, d: null as number | null },
    { l: 'Pemasukan', v: fmtIDR(inc), I: ArrowUpRight, d: pctChange(inc, income(txs, prev)) },
    { l: 'Pengeluaran', v: fmtIDR(exp), I: ArrowDownRight, d: -pctChange(exp, expense(txs, prev)) },
    { l: 'Savings Rate', v: savingsRate(inc, exp).toFixed(1) + '%', I: PiggyBank, d: null },
  ]
  const recent = [...txs].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5)
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ l, v, I, d }) => (
          <Glass key={l}><div className="flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--mu)' }}><I size={16} />{l}</div>
            <div className="my-2 text-xl font-extrabold">{v}</div>
            {d !== null && <span className={`text-xs font-bold ${d >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{d >= 0 ? '▲' : '▼'} {Math.abs(d).toFixed(1)}% vs bulan lalu</span>}</Glass>))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Glass><h3 className="mb-3 font-bold">Arus Kas 6 Bulan</h3>
          <div className="h-60"><ResponsiveContainer><AreaChart data={cashFlowSeries(txs)}>
            <defs><linearGradient id="gi" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#34D399" stopOpacity=".5" /><stop offset="1" stopColor="#34D399" stopOpacity="0" /></linearGradient>
              <linearGradient id="go" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#FB7185" stopOpacity=".5" /><stop offset="1" stopColor="#FB7185" stopOpacity="0" /></linearGradient></defs>
            <CartesianGrid strokeOpacity={0.12} vertical={false} /><XAxis dataKey="bulan" tick={{ fill: 'currentColor', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v: number) => v / 1e6 + 'jt'} tick={{ fill: 'currentColor', fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
            <Tooltip formatter={(v) => fmtIDR(Number(v))} contentStyle={{ borderRadius: 14, background: 'var(--bg)', border: '1px solid var(--gb)' }} />
            <Area dataKey="Pemasukan" stroke="#34D399" strokeWidth={2.5} fill="url(#gi)" /><Area dataKey="Pengeluaran" stroke="#FB7185" strokeWidth={2.5} fill="url(#go)" />
          </AreaChart></ResponsiveContainer></div></Glass>
        <Glass><h3 className="mb-3 font-bold">Ringkasan Anggaran</h3>
          {budgets.map((b) => { const u = txs.filter((t) => t.type === 'expense' && t.category === b.category && t.date.startsWith(now)).reduce((a, t) => a + t.amount, 0), p = (u / b.limit) * 100
            return <div key={b.category} className="mb-4"><div className="mb-1.5 flex justify-between text-sm"><b>{b.category}</b><span style={{ color: 'var(--mu)' }}>{fmtIDR(u)} / {fmtIDR(b.limit)}</span></div>
              <Bar pct={p} color={p > 100 ? '#FB7185' : p > 85 ? '#FBBF24' : undefined} /></div> })}</Glass>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Glass><h3 className="mb-2 font-bold">Transaksi Terbaru</h3>{recent.map((t) => (
          <div key={t.id} className="flex items-center justify-between gap-3 border-b border-white/20 py-2.5 last:border-0"><div><div className="text-sm font-bold">{t.name}</div><div className="text-xs" style={{ color: 'var(--mu)' }}>{t.category} · {fmtDate(t.date)}</div></div>
            <b className={t.type === 'income' ? 'text-emerald-400' : t.type === 'expense' ? 'text-rose-400' : ''}>{t.type === 'income' ? '+' : t.type === 'expense' ? '−' : '⇄'} {fmtIDR(t.amount)}</b></div>))}</Glass>
        <Glass><h3 className="mb-3 font-bold">Tujuan Keuangan</h3>{goals.map((g) => (
          <div key={g.id} className="mb-4"><div className="mb-1.5 flex justify-between text-sm"><b>{g.name}</b><span style={{ color: 'var(--mu)' }}>{((g.saved / g.target) * 100).toFixed(0)}% · {fmtDate(g.due)}</span></div><Bar pct={(g.saved / g.target) * 100} /></div>))}</Glass>
      </div>
    </div>
  )
}
