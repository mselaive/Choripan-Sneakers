import React from "react";
import { Routes, Route} from "react-router-dom";
import Inicio from "./page/inicio";
import { ProductosList } from "./page/productos";
import { ProductosDetalles } from "./page/productos/ProductosDetalles";
import Contacto from "./page/inicio/contacto";
import Nosotros from "./page/inicio/nosotros";
import Recomendaciones from "./page/inicio/recomendaciones";

export default function Page() {
  return (
    <section>
      <Routes>
				<Route path="/" element={<Inicio/>} />
				<Route path="/productos" element={<ProductosList/>} />
        <Route path="/contacto" element={<Contacto/>} />
        <Route path="/nosotros" element={<Nosotros/>} />
        <Route path="/producto/:id" element={<ProductosDetalles/>} />
        <Route path="/recomendaciones" element={<Recomendaciones/>} />
        
			</Routes>
    </section>
  );
}
