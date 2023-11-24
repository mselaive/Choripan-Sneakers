import matias from '../../../images/matias.png'
import max from '../../../images/max.png'
import carlos from '../../../images/carlos.png' 
// ... (importaciones y código anterior)

export const Nosotros = () => {
    const usuariosData = [
        { name: 'Matías Selaive', email: 'mselaive@alumnos.uai.cl', cargo: 'CEO', image: matias },
        { name: 'Carlos Serra', email: 'cserra@alumnos.uai.cl', cargo: 'DISEÑO', image: carlos },
        { name: 'Maximiliano Diaz', email: 'maxmidiaz@alumnos.uai.cl', cargo: 'MARKETING', image: max },
        
      ];



      return (
        <div>
        <h1 className="produ">NOSOTROS</h1>

        <div className='usuarios'>
            
          {usuariosData.map((usuario, index) => (
            <div className='usuario2' key={index}>
              <div className='imagenes-nosotros'>
                <img src={usuario.image} alt={`Imagen de ${usuario.name}`} />
              </div>
              <p>{usuario.name}</p>
              <p>Email: {usuario.email}</p>
              <p>Cargo: {usuario.cargo}</p>
            </div>
          ))}
        </div>
          <div className='texto-nosotros'>
            <h1 className='produ2'>Sobre nosotros</h1>
            <p className='p-test'>En el dinámico mundo del comercio electrónico, nace Choripan, nuestra tienda en línea especializada en la venta de zapatillas. Nos enorgullecemos de ofrecer una cuidadosa selección de calzado de alta calidad que combina estilo, comodidad y durabilidad. Con un enfoque meticuloso en la satisfacción del cliente, cada par de zapatillas que ofrecemos es elegido minuciosamente, garantizando la excelencia en diseño y fabricación. Nuestro compromiso no se limita solo a proporcionar un producto excepcional, sino también a brindar una experiencia de compra fluida y personalizada, convirtiendo cada visita a nuestra tienda en una oportunidad para descubrir la excelencia en calzado deportivo y casual.</p>
          </div>
        </div>
      );
    };

export default Nosotros