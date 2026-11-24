import { useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import ComingSoon from './pages/ComingSoon'
import { useStore } from './stores/useStore'
export default function App() {
  const theme = useStore((s) => s.theme)
  useEffect(() => { document.documentElement.dataset.theme = theme }, [theme])
  return (
    <HashRouter><Routes><Route element={<Layout />}>
      <Route index element={<Dashboard />} />
      {['transaksi:Transaksi', 'akun:Akun', 'anggaran:Anggaran', 'tujuan:Tujuan'].map((x) => { const [p, t] = x.split(':'); return <Route key={p} path={p} element={<ComingSoon title={t} />} /> })}
    </Route></Routes></HashRouter>
  )
}
