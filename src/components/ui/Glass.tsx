import type { ReactNode } from 'react'
export const Glass = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <div className={`glass p-5 ${className}`}>{children}</div>
)
export const Bar = ({ pct, color }: { pct: number; color?: string }) => (
  <div className="bar"><i style={{ width: Math.min(pct, 100) + '%', background: color }} /></div>
)
