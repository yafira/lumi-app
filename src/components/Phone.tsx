import type { ReactNode } from 'react'
import './Phone.css'

interface Props {
  children: ReactNode
}

export default function Phone({ children }: Props) {
  return (
    <div className="phone">
      {children}
    </div>
  )
}
