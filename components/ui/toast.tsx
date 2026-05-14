'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type ToastVariant = 'success' | 'error'

type Toast = {
  id: number
  message: string
  variant: ToastVariant
}

type ToastContextValue = {
  show: (message: string, variant?: ToastVariant) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const MAX_TOASTS = 3
const AUTO_DISMISS_MS = 5000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((t) => t.id !== id))
  }, [])

  const show = useCallback((message: string, variant: ToastVariant = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current.slice(-(MAX_TOASTS - 1)), { id, message, variant }])
  }, [])

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed bottom-[2.4rem] right-[2.4rem] z-[100] flex flex-col gap-[1.2rem]"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  const borderColor =
    toast.variant === 'success' ? 'border-l-[#2f7a3a]' : 'border-l-[#b3261e]'

  return (
    <div
      role={toast.variant === 'error' ? 'alert' : 'status'}
      className={`pointer-events-auto flex max-w-[36rem] items-start gap-[1.2rem] rounded-[var(--radius-default)] border-l-[4px] bg-white p-[1.6rem] text-[1.4rem] text-[var(--color-text-dark)] shadow-[0_4px_16px_rgba(0,0,0,0.12)] ${borderColor}`}
    >
      <span className="flex-1 leading-[1.5]">{toast.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Zatvori obaveštenje"
        className="text-[1.6rem] leading-none text-[var(--color-text-muted)] hover:text-[var(--color-text-dark)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
      >
        ×
      </button>
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) {
    throw new Error('useToast mora biti pozvan unutar <ToastProvider>')
  }
  return ctx
}
