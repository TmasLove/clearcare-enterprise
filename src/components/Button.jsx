import { Link } from 'react-router-dom';
import styles from './Button.module.css';
export default function Button({ variant = 'primary', to, href, children, onClick, type }) {
  const cls = `${styles.btn} ${styles[variant]}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  if (href) return <a href={href} className={cls}>{children}</a>;
  return <button type={type || 'button'} className={cls} onClick={onClick}>{children}</button>;
}
