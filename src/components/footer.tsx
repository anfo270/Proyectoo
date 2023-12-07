
const footerStyle = {
    background: '#f8f8f8',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-around',
    color: '#333',
};

const socialListStyle = {
    listStyle: 'none',
    padding: 0,
    display: 'flex',
    gap: '10px',
};

export const Footer = () => {
    return (
        <footer style={footerStyle}>
            <div>
                <h2>Nicestyle</h2>
                <p>Tu destino para el estilo y la belleza.</p>
            </div>
            <div>
                <h3>Contacto</h3>
                <p>Dirección: Calle Alguna, Ciudad Juares, Chi.</p>
                <p>Email: info@nicestyle.com</p>
                <p>Teléfono: (656) 456-7890</p>
            </div>
            <div>
                <h3>Síguenos en Redes Sociales</h3>
                <ul style={socialListStyle}>
                    <li><a href="https://facebook.com/nicestyle" >Facebook</a></li>
                    <li><a href="https://instagram.com/nicestyle" >Instagram</a></li>
                    <li><a href="https://twitter.com/nicestyle" >Twitter</a></li>
                </ul>
            </div>
        </footer>
    );
};
