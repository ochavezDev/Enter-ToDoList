import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryView = ({ tareas, eliminarTarea }) => {
  const { nombreCategoria } = useParams();
  
  // Estado para controlar qué tarea se está mostrando en el Modal
  const [tareaModal, setTareaModal] = useState(null);

  const tareasFiltradas = tareas.filter(tarea => {
    if (nombreCategoria === 'vital') return tarea.prioridad === 'vital';
    if (nombreCategoria === 'completado') return tarea.estado === 'Completado';
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold capitalize text-white flex items-center gap-2">
          <span>{nombreCategoria === 'vital' ? '⚡' : '✓'}</span> Tareas: {nombreCategoria}
        </h2>
      </div>

      <div className="space-y-4">
        {tareasFiltradas.length === 0 ? (
          <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl text-center text-slate-500">
            No se encontraron tareas.
          </div>
        ) : (
          tareasFiltradas.map(tarea => (
            <div key={tarea.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-1">
                <h4 className="font-semibold text-white">{tarea.titulo}</h4>
                <p className="text-xs text-slate-400 line-clamp-1 max-w-lg">{tarea.descripcion}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-end md:self-center">
                
                {/* BOTÓN REVISAR: Solo se renderiza si la categoría es vital */}
                {nombreCategoria === 'vital' && (
                  <button 
                    onClick={() => setTareaModal(tarea)} 
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors shadow-lg shadow-indigo-500/20"
                  >
                    🔍 Revisar
                  </button>
                )}

                <Link to={`/tarea/editar/${tarea.id}`} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition-colors">
                  Editar
                </Link>
                <button onClick={() => eliminarTarea(tarea.id)} className="px-3 py-1.5 bg-slate-800 hover:bg-rose-900 text-slate-300 hover:text-rose-300 rounded-lg text-xs transition-colors">
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RENDERIZADO DEL MODAL (Aparece por encima de todo si hay una tarea seleccionada) */}
      {tareaModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setTareaModal(null)} // Cierra el modal al hacer clic afuera
        >
          {/* Tarjeta del Modal */}
          <div 
            className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full shadow-2xl relative"
            onClick={e => e.stopPropagation()} // Evita que el clic interno cierre el modal
          >
            {/* Botón X para cerrar */}
            <button 
              onClick={() => setTareaModal(null)} 
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 rounded-full p-1.5 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Contenido de la Tarjeta Vital */}
            {tareaModal.imgUrl && (
              <img src={tareaModal.imgUrl} alt={tareaModal.titulo} className="w-full h-40 object-cover rounded-xl mb-4 border border-slate-800" />
            )}
            <h3 className="text-xl font-bold text-white mb-2 leading-tight">{tareaModal.titulo}</h3>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">{tareaModal.descripcion}</p>
            
            <div className="flex gap-2 mb-6 text-xs font-medium">
               <span className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg flex items-center gap-1">
                 ⚡ Vital
               </span>
               <span className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 rounded-lg">
                 {tareaModal.estado}
               </span>
            </div>
            
            <button 
              onClick={() => setTareaModal(null)} 
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-colors"
            >
              Cerrar Detalles
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryView;