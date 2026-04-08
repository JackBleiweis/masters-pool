import styles from './StatusMessage.module.scss'

type Variant = 'loading' | 'error' | 'empty'

export interface StatusMessageProps {
  variant: Variant
  title: string
  detail?: string
}

export function StatusMessage({ variant, title, detail }: StatusMessageProps) {
  const role = variant === 'error' ? 'alert' : 'status'
  return (
    <div className={styles.wrap} role={role} aria-live="polite">
      <p className={styles.title}>{title}</p>
      {detail ? <p className={styles.detail}>{detail}</p> : null}
    </div>
  )
}
