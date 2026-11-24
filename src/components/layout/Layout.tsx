import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, ArrowLeftRight, Wallet, PieChart, Target, Moon, Sun, type LucideIcon } from 'lucide-react'
import { useStore } from '../../stores/useStore'
export const ROUTES: { path: string; label: string; icon: LucideIcon }[] = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard }, { path: '/transaksi', label: 'Transaksi', icon: ArrowLeftRight },
  { path: '/akun', label: 'Akun', icon: Wallet }, { path: '/anggaran', label: 'Anggaran', icon: PieChart }, { path: '/tujuan', label: 'Tujuan', icon: Target },
]
export default function Layout() {
  const { theme, setTheme } = useStore()
  const link = (cls: string) => ROUTES.map(({ path, label, icon: I }) => (
    <NavLink key={path} to={path} end={path === '/'} className={({ isActive }) => `${cls} ${isActive ? 'active' : ''}`}><I size={18} /><span>{label}</span></NavLink>))
  return (
    <div className="mx-auto flex max-w-[1400px] gap-5 p-3 pb-28 md:p-5">
      <aside className="glass sticky top-5 hidden h-[calc(100vh-40px)] w-56 shrink-0 flex-col gap-1.5 p-4 md:flex">
        <div className="bg-gradient-to-r from-[#8B72F8] to-[#C4B5FD] bg-clip-text px-3 pb-5 text-2xl font-extrabold text-transparent">KasKu.ID</div>
        {link('nav-link')}
      </aside>
      <main className="min-w-0 flex-1 space-y-5">
        <header className="glass flex items-center justify-between px-5 py-3">
          <span className="text-sm font-semibold" style={{ color: 'var(--mu)' }}>Your Money, Your Future.</span>
          <button className="btn" aria-label="Ganti tema" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}{theme === 'dark' ? 'Light' : 'Dark'}</button>
        </header>
        <Outlet />
      </main>
      <nav className="glass fixed inset-x-3 bottom-3 z-40 flex justify-around p-2 md:hidden">{link('nav-link flex-col !gap-1 !p-2 text-[10px]')}</nav>
    </div>
  )
}
