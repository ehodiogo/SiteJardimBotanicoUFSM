import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>404 - Página Não Encontrada</h1>
      <p style={styles.message}>Desculpe, não conseguimos encontrar a página que você estava procurando.</p>
      <Link to="/" style={styles.link}>Voltar para a página inicial</Link>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f9f4f4',
    color: '#333',
  },
  header: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#b03a2e',
  },
  message: {
    fontSize: '1.2rem',
    margin: '20px 0',
  },
  link: {
    fontSize: '1.2rem',
    color: '#b03a2e',
    textDecoration: 'none',
    border: '2px solid #b03a2e',
    padding: '10px 20px',
    borderRadius: '5px',
  },
};

export default PageNotFound;
