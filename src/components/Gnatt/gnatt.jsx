import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const GanttChart = () => {
  const [view, setView] = useState('all');
  
  // Project phases and tasks
  const tasks = [
    {
      id: 1,
      phase: 'Planning & Setup',
      name: 'Project Planning & Documentation',
      start: new Date(2025, 10, 1), // October 1
      end: new Date(2025, 10, 15),
      progress: 100,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      phase: 'Planning & Setup',
      name: 'MongoDB Schema Design',
      start: new Date(2025, 11, 10),
      end: new Date(2025, 11, 25),
      progress: 100,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      phase: 'Planning & Setup',
      name: 'MERN Environment Setup',
      start: new Date(2025, 11, 20),
      end: new Date(2025, 11, 25), 
      progress: 100,
      color: 'bg-blue-500'
    },
     {
      id: 4,
      phase: 'Testing & Documentation',
      name: 'Project Documentation',
      start: new Date(2025, 0, 15),
      end: new Date(2025, 0, 31),
      progress: 0,
      color: 'bg-orange-500'
    },
    {
      id: 5,
      phase: 'Development - Backend',
      name: 'User Authentication (Login/Register)',
      start: new Date(2025, 12, 1),
      end: new Date(2025, 12, 2),
      progress: 90,
      color: 'bg-green-500'
    },
    {
      id: 6,
      phase: 'Development - Backend',
      name: 'Profile Management API',
      start: new Date(2025, 12, 3),
      end: new Date(2025, 12, 5),
      progress: 70,
      color: 'bg-green-500'
    },
    {
      id: 7,
      phase: 'Development - Backend',
      name: 'Blog Post CRUD Operations',
      start: new Date(2025, 12, 6),
      end: new Date(2025, 12, 9),
      progress: 50,
      color: 'bg-green-500'
    },
    {
      id: 8,
      phase: 'Development - Frontend',
      name: 'UI Mockups & Design System',
      start: new Date(2025, 12, 10),
      end: new Date(2025, 12, 11),
      progress: 95,
      color: 'bg-purple-500'
    },
    {
      id: 9,
      phase: 'Development - Frontend',
      name: 'Authentication Pages (Login/Register)',
      start: new Date(2025, 12, 12),
      end: new Date(2025, 12, 12),
      progress: 75,
      color: 'bg-purple-500'
    },
    {
      id: 10,
      phase: 'Development - Frontend',
      name: 'User Profile Interface',
      start: new Date(2025, 12, 13),
      end: new Date(2025, 12, 13),
      progress: 45,
      color: 'bg-purple-500'
    },
    {
      id: 12,
      phase: 'Development - Frontend',
      name: 'Public Blog View',
      start: new Date(2025, 12, 14),
      end: new Date(2025, 12, 14), // January 5
      progress: 20,
      color: 'bg-purple-500'
    },
    {
      id: 13,
      phase: 'Development - Frontend',
      name: 'Admin Dashboard',
      start: new Date(2025, 12, 14),
      end: new Date(2025, 12, 14),
      progress: 15,
      color: 'bg-purple-500'
    },
    {
      id: 14,
      phase: 'Testing & Documentation',
      name: 'Unit & Integration Testing',
      start: new Date(2025, 12, 15),
      end: new Date(2025, 12, 15),
      progress: 0,
      color: 'bg-orange-500'
    }
  ];

  // Generate months from October 2025 to February 2025
  const months = [
    { name: 'Oct 2025', start: new Date(2025, 9, 1), weeks: 4 },
    { name: 'Nov 2025', start: new Date(2025, 10, 1), weeks: 4 },
    { name: 'Dec 2025', start: new Date(2025, 11, 1), weeks: 5 },
  ];

  const totalWeeks = months.reduce((sum, m) => sum + m.weeks, 0);
  const projectStart = new Date(2025, 9, 1);
  const today = new Date(2025, 11, 20); // December 20, 2025

  const calculatePosition = (date) => {
    const diffTime = date - projectStart;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const diffWeeks = diffDays / 7;
    return (diffWeeks / totalWeeks) * 100;
  };

  const calculateWidth = (start, end) => {
    const duration = (end - start) / (1000 * 60 * 60 * 24 * 7);
    return (duration / totalWeeks) * 100;
  };

  const todayPosition = calculatePosition(today);

  const phases = [...new Set(tasks.map(t => t.phase))];
  const filteredTasks = view === 'all' ? tasks : tasks.filter(t => t.phase === view);

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <Calendar className="text-blue-600" size={32} />
                Blog Management System
              </h1>
              <p className="text-slate-600 mt-1">Project Timeline: October 2025 - December 2025</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-500">Current Date</div>
              <div className="text-lg font-semibold text-slate-800">December 20, 2025</div>
            </div>
          </div>

          {/* Phase Filter */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setView('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                view === 'all' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              All Phases
            </button>
            {phases.map(phase => (
              <button
                key={phase}
                onClick={() => setView(phase)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  view === phase 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                {phase}
              </button>
            ))}
          </div>
        </div>

        {/* Gantt Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex">
            {/* Task Names */}
            <div className="w-80 flex-shrink-0 pr-4 border-r border-slate-200">
              <div className="h-16 flex items-center font-semibold text-slate-700 border-b border-slate-200">
                Task Name
              </div>
              {filteredTasks.map(task => (
                <div key={task.id} className="h-14 flex flex-col justify-center border-b border-slate-100 py-2">
                  <div className="text-sm font-medium text-slate-800">{task.name}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {task.start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {task.end.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline */}
            <div className="flex-1 overflow-x-auto">
              {/* Month Headers */}
              <div className="h-16 flex border-b border-slate-200">
                {months.map((month, idx) => (
                  <div 
                    key={idx}
                    className="flex-shrink-0 border-r border-slate-200 bg-slate-50"
                    style={{ width: `${(month.weeks / totalWeeks) * 100}%` }}
                  >
                    <div className="h-full flex items-center justify-center font-semibold text-slate-700">
                      {month.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart Bars */}
              <div className="relative">
                {/* Today Line */}
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20"
                  style={{ left: `${todayPosition}%` }}
                >
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Today
                  </div>
                </div>

                {/* Week Grid Lines */}
                {Array.from({ length: totalWeeks }).map((_, idx) => (
                  <div
                    key={idx}
                    className="absolute top-0 bottom-0 w-px bg-slate-100"
                    style={{ left: `${(idx / totalWeeks) * 100}%` }}
                  />
                ))}

                {/* Task Bars */}
                {filteredTasks.map(task => (
                  <div key={task.id} className="h-14 flex items-center border-b border-slate-100 relative">
                    <div
                      className="absolute h-8 rounded-lg shadow-md flex items-center overflow-hidden group cursor-pointer transition-transform hover:scale-105"
                      style={{
                        left: `${calculatePosition(task.start)}%`,
                        width: `${calculateWidth(task.start, task.end)}%`,
                      }}
                    >
                      {/* Background bar */}
                      <div className={`absolute inset-0 ${task.color} opacity-20`} />
                      
                      {/* Progress bar */}
                      <div 
                        className={`absolute inset-0 ${task.color}`}
                        style={{ width: `${task.progress}%` }}
                      />
                      
                      {/* Progress text */}
                      <div className="relative z-10 px-3 text-xs font-semibold text-white mix-blend-difference w-full flex items-center justify-between">
                        <span className="truncate">{task.progress}%</span>
                      </div>

                      {/* Tooltip */}
                      <div className="absolute hidden group-hover:block bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-2 rounded shadow-lg whitespace-nowrap z-30">
                        <div className="font-semibold">{task.name}</div>
                        <div className="text-slate-300 mt-1">Progress: {task.progress}%</div>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h3 className="font-semibold text-slate-800 mb-3">Legend</h3>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-blue-500 rounded" />
              <span className="text-sm text-slate-700">Planning & Setup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-green-500 rounded" />
              <span className="text-sm text-slate-700">Backend Development</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-purple-500 rounded" />
              <span className="text-sm text-slate-700">Frontend Development</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-orange-500 rounded" />
              <span className="text-sm text-slate-700">Testing & Documentation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-4 bg-red-500 rounded" />
              <span className="text-sm text-slate-700">Deployment</span>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-sm text-slate-500">Total Tasks</div>
            <div className="text-2xl font-bold text-slate-800">{tasks.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-sm text-slate-500">Completed</div>
            <div className="text-2xl font-bold text-green-600">
              {tasks.filter(t => t.progress === 100).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-sm text-slate-500">In Progress</div>
            <div className="text-2xl font-bold text-blue-600">
              {tasks.filter(t => t.progress > 0 && t.progress < 100).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-sm text-slate-500">Overall Progress</div>
            <div className="text-2xl font-bold text-slate-800">
              {Math.round(tasks.reduce((sum, t) => sum + t.progress, 0) / tasks.length)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GanttChart;