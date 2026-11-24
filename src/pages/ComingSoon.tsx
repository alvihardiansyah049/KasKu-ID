import { Glass } from '../components/ui/Glass'
export default function ComingSoon({ title }: { title: string }) {
  return <Glass><h2 className="text-lg font-extrabold">{title}</h2><p className="mt-2 text-sm" style={{ color: 'var(--mu)' }}>Modul ini dikerjakan di Phase 3–4.</p></Glass>
}
