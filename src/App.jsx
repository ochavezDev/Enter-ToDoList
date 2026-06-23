import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './views/Dashboard';
import CategoryView from './views/CategoryView';
import TaskFormView from './views/TaskFormView';
import { TAREAS_SEMILLA } from './data/tareasSemilla';

const App = () => {
  const [tareas, setTareas] = useState(() => {
    localStorage.setItem('db_tareas', JSON.stringify(TAREAS_SEMILLA));
    return TAREAS_SEMILLA;
  });

  // ESTADO PARA LA ALERTA MODERNA
  const [alerta, setAlerta] = useState({ visible: false, mensaje: '', tipo: 'success' });

  // Función para lanzar la alerta flotante y ocultarla a los 3 segundos
  const mostrarAlerta = (mensaje, tipo = 'success') => {
    setAlerta({ visible: true, mensaje, tipo });
    setTimeout(() => {
      setAlerta(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  useEffect(() => {
    localStorage.setItem('db_tareas', JSON.stringify(tareas));
  }, [tareas]);

  const agregarTarea = (nuevaTarea) => {
    const imagenDefecto = nuevaTarea.imgUrl || 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=150&q=80';
    setTareas([...tareas, { ...nuevaTarea, imgUrl: imagenDefecto, id: Date.now().toString() }]);
    mostrarAlerta('Tarea creada exitosamente', 'success');
  };

  const actualizarTarea = (tareaActualizada) => {
    setTareas(tareas.map(t => t.id === tareaActualizada.id ? tareaActualizada : t));
    mostrarAlerta('Tarea actualizada correctamente', 'success');
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter(t => t.id !== id));
    mostrarAlerta('Tarea eliminada del sistema', 'error');
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout tareas={tareas} />}>
            <Route index element={<Dashboard tareas={tareas} eliminarTarea={eliminarTarea} />} />
            <Route path="categoria/:nombreCategoria" element={<CategoryView tareas={tareas} eliminarTarea={eliminarTarea} />} />
            <Route path="tarea/nueva" element={<TaskFormView guardarTarea={agregarTarea} />} />
            <Route path="tarea/editar/:id" element={<TaskFormView tareas={tareas} guardarTarea={actualizarTarea} />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* RENDERIZADO DEL ALERT MODERNO (TOAST) */}
      {alerta.visible && (
        <div className={`fixed bottom-8 right-8 z-[9999] px-6 py-3.5 rounded-2xl shadow-2xl shadow-black/50 border backdrop-blur-md flex items-center gap-3 animate-fadeIn ${
          alerta.tipo === 'success' 
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
            : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
        }`}>
          <span className="text-xl">{alerta.tipo === 'success' ? '✅' : '🗑️'}</span>
          <p className="text-sm font-medium tracking-wide">{alerta.mensaje}</p>
        </div>
      )}
    </>
  );
};

export default App;