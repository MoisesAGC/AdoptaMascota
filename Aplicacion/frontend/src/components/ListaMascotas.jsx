import { useEffect, useState } from "react";
import TarjetaMascota from "./TarjetaMascota";
import tomillo from "../assets/tomillo.jpg";
import erizo from "../assets/img/perro1.jpeg";
import luna from "../assets/img/gato1.jpg";
import rocky from "../assets/img/perro2.jpg";
import miko from "../assets/img/conejo1.jpeg";
import mishka from "../assets/img/gato2.jpg";
import piolin from "../assets/img/pajaro1.jpeg";
import sol from "../assets/img/perro3.png";
import capitan from "../assets/img/tortuga.jpg";
const API_URL = "http://127.0.0.1:8000/api/mascotas/";

export default function ListaMascotas() {
  const mascotasEstaticas = [
    { id: 1, nombre: "Tomillo", especie: "Hámster", genero: "hembra", edad: "5 meses", ubicacion: "Coyoacán, CDMX", vacunado: true, descripcion: "Es una bolilla de pelo, muy juguetón y cariñoso.", imagen: tomillo },
    { id: 2, nombre: "Erizo", especie: "Perro", genero: "macho", edad: "3 años", ubicacion: "Monterrey, N.L.", vacunado: false, descripcion: "Cuidado porque pica, pero es muy fiel.", imagen: erizo },
    { id: 3, nombre: "Luna", especie: "Gato", genero: "hembra", edad: "2 años", ubicacion: "Guadalajara, Jal.", vacunado: true, descripcion: "Tranquila y amante de las siestas al sol.", imagen: luna },
    { id: 4, nombre: "Rocky", especie: "Perro", genero: "macho", edad: "5 meses", ubicacion: "Ciudad de México", vacunado: true, descripcion: "Es un perro muy protector y juguetón.", imagen: rocky },
    { id: 5, nombre: "Miko", especie: "Conejo", genero: "macho", edad: "1 año", ubicacion: "Puebla, Pue.", vacunado: true, descripcion: "Esponjoso y salta por toda la casa.", imagen: miko },
    { id: 6, nombre: "Mishka", especie: "Gato", genero: "hembra", edad: "4 meses", ubicacion: "Cancún, Q.R.", vacunado: false, descripcion: "Una gatita con demasida energia.", imagen: mishka },
    { id: 7, nombre: "Piolín", especie: "Pájaro", genero: "macho", edad: "1 año", ubicacion: "Mérida, Yuc.", vacunado: true, descripcion: "Canta todo el día y es muy activo.", imagen: piolin },
    { id: 8, nombre: "Sol", especie: "Perro", genero: "hembra", edad: "7 años", ubicacion: "Tijuana, B.C.", vacunado: true, descripcion: "Un perro ideal para niños.", imagen: sol },
    { id: 9, nombre: "Capitán", especie: "Tortuga", genero: "macho", edad: "10 años", ubicacion: "Veracruz, Ver.", vacunado: false, descripcion: "Lento, pero seguro. Necesita terrario grande.", imagen: capitan },
  ];

  // Mascotas que vienen del backend
  const [mascotasBackend, setMascotasBackend] = useState([]);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) {
          console.error("Error al obtener mascotas del backend");
          return;
        }
        const data = await res.json();

       
        const formateadas = data.map((m) => ({
          id: m.id,
          nombre: m.nombre,
          especie: m.especie_nombre || "Sin especie",
          genero: m.sexo || "No especificado", 
          ubicacion: m.ubicacion || "No especificada", 
          vacunado: m.vacunado,
          edad: m.edad,
          descripcion: m.descripcion,
          imagen: m.imagen, 
        }));
        setMascotasBackend(formateadas);
      } catch (error) {
        console.error("Error cargando mascotas:", error);
      }
    };

    fetchMascotas();
  }, []);

  // Se mantienen las mascotas originales y se agregan las del backend
  const mascotas = [...mascotasEstaticas, ...mascotasBackend];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10 place-items-center py-6 px-4">
      {mascotas.map((m) => (
        <TarjetaMascota
          key={m.id}
          id={m.id} 
          nombre={m.nombre}
          especie={m.especie}
          genero={m.genero}
          ubicacion={m.ubicacion}
          vacunado={m.vacunado}
          edad={m.edad}
          descripcion={m.descripcion}
          imagen={m.imagen}
        />
      ))}
    </div>
  );
}