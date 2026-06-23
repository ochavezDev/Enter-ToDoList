import { Link } from 'react-router-dom';
import AnilloProgreso from '../components/AnilloProgreso';

const Dashboard = ({ tareas, eliminarTarea }) => {
  const total = tareas.length || 1;
  const completadas = tareas.filter(t => t.estado === 'Completado').length;
  const enProgreso = tareas.filter(t => t.estado === 'En Progreso').length;
  const noIniciados = tareas.filter(t => t.estado === 'No Iniciado').length;

  const pctCompletadas = Math.round((completadas / total) * 100);
  const pctEnProgreso = Math.round((enProgreso / total) * 100);
  const pctNoIniciados = Math.round((noIniciados / total) * 100);

  // FILTRO EXCLUSIVO: Solo tareas que no estén completadas
  const tareasPendientes = tareas.filter(t => t.estado !== 'Completado');

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Panel de Control</h1>
          <p className="text-slate-400 text-sm mt-1">Este es el resumen de tu espacio de trabajo.</p>
        </div>
        <Link to="/tarea/nueva" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium text-sm transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20">
          <span>+</span> Agregar Tarea
        </Link>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Lista Filtrada de Tareas */}
        <div className="xl:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
            <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
            </svg>
            Tareas Pendientes & En Progreso
          </h3>
          
          {tareasPendientes.length === 0 ? (
            <div className="p-8 bg-slate-950 border border-slate-800 rounded-2xl text-center text-slate-500">
              No tienes tareas activas. ¡Revisa la sección de completadas!
            </div>
          ) : (
            tareasPendientes.map(tarea => (
              <div key={tarea.id} className="p-5 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-slate-700 transition-colors relative overflow-hidden">
                
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${tarea.prioridad === 'vital' ? 'bg-rose-500' : 'bg-indigo-500'}`} />
                
                <div className="flex items-start sm:items-center gap-4 pl-2">
                  {tarea.imgUrl && (
                    <div className="w-12 h-12 rounded-xl border border-slate-800 overflow-hidden flexshrink-0 hidden sm:block">
                      <img src={tarea.imgUrl} alt={tarea.titulo} className="w-full h-full object-cover" />
                    </div>
                  )}
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${tarea.estado === 'En Progreso' ? 'bg-blue-500' : 'bg-rose-500'}`} />
                      <h4 className="font-semibold text-white text-sm sm:text-base">{tarea.titulo}</h4>
                    </div>
                    <p className="text-xs text-slate-400 max-w-md line-clamp-2">{tarea.descripcion}</p>
                    <div className="flex flex-wrap gap-3 pt-1 text-[10px] text-slate-500 font-medium">
                      <span>Prioridad: <strong className={tarea.prioridad === 'vital' ? 'text-rose-500' : 'text-indigo-400'}>{tarea.prioridad.toUpperCase()}</strong></span>
                      <span>Estado: <strong>{tarea.estado}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link to={`/tarea/editar/${tarea.id}`} className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-900 text-slate-300 hover:text-indigo-300 rounded-lg text-xs transition-colors">
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

        {/* WIDGET DE RENDIMIENTO */}
        <div className="space-y-6">
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl space-y-6 sticky top-24">
            
            <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
              <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 15.75h3.75M15.75 9h-7.5m11.25 3v6.75c0 .621-.504 1.125-1.125 1.125H5.625a1.125 1.125 0 0 1-1.125-1.125V12c0-.621.504-1.125 1.125-1.125h11.25c.621 0 1.125.504 1.125 1.125Z" />
              </svg>
              <h3 className="text-sm font-semibold text-rose-400">Estado General</h3>
            </div>
            
            <div className="flex justify-between items-center pt-2">
              <AnilloProgreso porcentaje={pctCompletadas} colorClase="text-emerald-500" bgPunto="bg-emerald-500" label="Completado" />
              <AnilloProgreso porcentaje={pctEnProgreso} colorClase="text-blue-500" bgPunto="bg-blue-500" label="En Progreso" />
              <AnilloProgreso porcentaje={pctNoIniciados} colorClase="text-rose-500" bgPunto="bg-rose-500" label="No Iniciado" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;