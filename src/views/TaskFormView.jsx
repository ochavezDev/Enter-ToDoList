import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskFormView = ({ tareas, guardarTarea }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // INICIALIZACIÓN PEREZOSA: Calculamos el estado inicial una sola vez.
  // ¡Adiós useEffect y adiós doble renderizado en cascada!
  const [formulario, setFormulario] = useState(() => {
    // Si hay un ID en la URL, buscamos la tarea inmediatamente
    if (id && tareas && tareas.length > 0) {
      const tareaAEditar = tareas.find(t => t.id === id);
      
      if (tareaAEditar) {
        return {
          id: tareaAEditar.id, // Vital conservar el ID para poder actualizar
          titulo: tareaAEditar.titulo || '',
          descripcion: tareaAEditar.descripcion || '',
          prioridad: tareaAEditar.prioridad || 'normal',
          estado: tareaAEditar.estado || 'No Iniciado',
          imgUrl: tareaAEditar.imgUrl || '',
          fecha: tareaAEditar.fecha || new Date().toISOString().split('T')[0]
        };
      }
    }
    
    // Si no estamos editando (es una tarea nueva), devolvemos el formulario limpio
    return {
      titulo: '',
      descripcion: '',
      prioridad: 'normal',
      estado: 'No Iniciado',
      imgUrl: '',
      fecha: new Date().toISOString().split('T')[0]
    };
  });

  const manejarEnvio = (e) => {
    e.preventDefault();
    guardarTarea(formulario);
    navigate('/');
  };

  return (
    <div className="max-w-xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-8 space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-white">
          {id ? '✏️ Editar Tarea' : '🚀 Crear Nueva Tarea'}
        </h2>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400">Título</label>
          <input 
            type="text" required value={formulario.titulo}
            onChange={e => setFormulario({...formulario, titulo: e.target.value})}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400">Descripción</label>
          <textarea 
            rows="3" value={formulario.descripcion}
            onChange={e => setFormulario({...formulario, descripcion: e.target.value})}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors resize-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-400">URL Imagen</label>
          <input 
            type="text" value={formulario.imgUrl}
            onChange={e => setFormulario({...formulario, imgUrl: e.target.value})}
            className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">Prioridad</label>
            <select 
              value={formulario.prioridad}
              onChange={e => setFormulario({...formulario, prioridad: e.target.value})}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="normal">Normal</option>
              <option value="vital">Vital (Alta)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-slate-400">Estado</label>
            <select 
              value={formulario.estado}
              onChange={e => setFormulario({...formulario, estado: e.target.value})}
              className="bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
            >
              <option value="No Iniciado">No Iniciado</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completado">Completado</option>
            </select>
          </div>
        </div>

        <div className="pt-4 flex gap-3">
          <button 
            type="button" onClick={() => navigate('/')}
            className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-sm font-medium text-white transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-medium transition-colors"
          >
            {id ? 'Guardar Cambios' : 'Guardar Tarea'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskFormView;