import Link from 'next/link'
import theme from '../../theme'

function Button({ children, color, primary=false, secondary=false, success=false, size=100, col=2, height=60, to='/' }) {

  const styles = {
    backgroundColor: color ? color : primary ? theme.primary : secondary ? theme.secondary : success ? theme.success : theme.primary,
    color: 'white',
    width: '100%',
    border: 'none',
    gridColumn: size === 100 ? `1/${col+1}` : '',
    height: height,
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  }

  return (
    <Link href={to} style={styles}>{children}</Link>
  )
}

export default Button