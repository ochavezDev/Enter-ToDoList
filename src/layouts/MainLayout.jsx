import { Outlet, Link } from 'react-router-dom';

const MainLayout = ({ tareas }) => {
  const totalTareas = tareas.length;

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans antialiased">
      
      {/* NAVBAR SUPERIOR */}
      <header className="w-full h-16 border-b border-slate-800 px-8 flex items-center justify-between bg-slate-950 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
            <span className="text-xs font-bold text-white">ET</span>
          </div>
          <span className="text-xl font-bold tracking-wide text-white">
            ToDo List Enter Tech
          </span>
        </div>
        
        {/* Navbar Derecha - Buscador eliminado */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-700 px-4 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-slate-400 font-medium">{totalTareas} Tareas activas</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        
        {/* SIDEBAR */}
        <aside className="w-64 border-r border-slate-800 bg-slate-950 p-6 flex-col justify-between hidden md:flex">
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-4">Menú Principal</p>
              <nav className="flex flex-col gap-2">
                
                <Link to="/" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-900/30 border-l-2 border-indigo-500 text-sm font-medium text-indigo-400 transition-colors hover:bg-slate-800">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                  </svg>
                  Panel de Control
                </Link>

                <Link to="/categoria/vital" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 text-sm font-medium transition-colors hover:text-slate-200 hover:bg-slate-800">
                  <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                  Tareas Vitales
                </Link>

                <Link to="/categoria/completado" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 text-sm font-medium transition-colors hover:text-slate-200 hover:bg-slate-800">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Completadas
                </Link>
                
              </nav>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-xs font-semibold text-white">Usuario</p>
              <p className="text-[10px] text-slate-400">Administrador</p>
            </div>
          </div>
        </aside>

        {/* BODY AREA */}
        <main className="flex-1 p-8 bg-slate-900 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default MainLayout;