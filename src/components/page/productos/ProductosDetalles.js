import React, {useContext, useEffect, useState} from 'react'
import { DataContext } from "context/DataProvider";
import { useParams } from "react-router-dom";
import { ProductoItem } from "./ProductoItem";

export const ProductosDetalles = () => {
  const value = useContext(DataContext);
  const [productos] = value.productos;
  const addCarrito = value.addCarrito;
  const [detalle, setDetalle] = useState([])
  const [url, setUrl]= useState(0)
  const [images, setImages] = useState('')
  const params = useParams();
  let item = 0;

  useEffect(() =>{
    console.log('re render' , params.id)
    item=0;
    productos.forEach(producto =>{
      if(producto.id === parseInt(params.id)){
        setDetalle(producto)
        setUrl(0)
      }
    })
  },[params.id, productos])

  console.log(url)

  useEffect(() =>{
    const values = `${detalle.img1}${url}${detalle.img2}`;
    setImages(values) 
  },[url, params.id])

  const handleInput = (e) =>{
  const number = e.target.value.toString().padStart(2,'01')
   setUrl(number)
  }

  if(detalle.length < 1) return null;

  return (
    <>
    {
        <div className="detalles">
          <h2>{detalle.title}</h2>
          <p className="price">${detalle.price}</p>
          <div className="grid">
          <p className="nuevo">NUEVO</p>
          <div className="tamano">
            <select placeholder="Tamaño" >
              <option value="1">36</option>
              <option value="1">37</option>
              <option value="1">38</option>
              <option value="1">39</option>
              <option value="1">40</option>
              <option value="1">41</option>
              <option value="1">42</option>
              <option value="1">43</option>
            </select>
            <p>Talla</p>
          </div>
          </div>
          <button onClick={() => addCarrito(detalle.id)}>
            Añadir al carrito
          </button>
          
          {
            url ? <img className='imagentest' src={images} alt={detalle.title}/> : <img src={detalle.image} alt={detalle.title}/>
          }
          
          <div className="description">
          <p><b>Descripción: </b> La zapatilla que encarna la excelencia en diseño y rendimiento es una fusión magistral de tecnología y estilo. Confeccionada con los materiales más selectos y una artesanía impecable, esta zapatilla representa el pináculo de la calidad. Su estructura ergonómica ofrece un soporte excepcional para el pie, asegurando comodidad en cada paso. La combinación de su suela innovadora y amortiguación de vanguardia brinda una experiencia de caminata o entrenamiento sin igual, minimizando el impacto y proporcionando una sensación de ligereza. Además, su diseño contemporáneo y versátil hace que esta zapatilla sea un ícono de estilo, apta para cualquier ocasión. En resumen, esta zapatilla no solo ofrece calidad y funcionalidad de primera línea, sino que también representa una declaración de moda para aquellos que buscan lo mejor en calzado deportivo.</p>
          </div>
          
        </div>
   
    }
    <h2 className="relacionados">Productos relacionados</h2>
    <div className="productos">
      {
        productos.map((producto)=>{
          if((item < 6)&&(detalle.category === producto.category)){
            item++;
          return <ProductoItem 
          key={producto.id}
          title={producto.title}
          image={producto.image}
          category={producto.category}
          price={producto.price}
          id={producto.id}
          />
          }
          
        
        })
      }
     
    </div>
    </>
  )
}
