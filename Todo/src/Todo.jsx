import React, { useEffect, useState } from "react";

const Todo = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("tasks")) || [];
      return data;
    } catch (err) {
      return [];
    }
  });
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Low");

  const handleTask = () => {
    if (task.trim() === "") return;
    const newTask = {
      id: Date.now(),
      title: task,
      completed: false,
      category,
      priority,
    };
    setTasks([...tasks, newTask]);
    setTask("");
  };

  const deleteTask = (id) => {
    const update = tasks.filter((t) => t.id !== id);
    console.log(update);
    setTasks(update);
  };

  const toggleComplete = (id) => {
    const updatedData = tasks.map((t) => {
      if (t.id === id) {
        return { ...t, completed: !t.completed };
      } else {
        return t;
      }
    });
    setTasks(updatedData);
  };

  const editTask = (id) => {
    const editId = tasks.map((t) =>{
      if(t.id === id){
        
      }
    })
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>

      {/* Top Controls */}
      <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow space-y-4">
        {/* Add Task */}
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            value={task}
            placeholder="Enter your task"
            className="flex-1 px-4 py-2 border rounded-lg outline-none"
            onChange={(e) => setTask(e.target.value)}
          />

          <select
            className="px-3 py-2 border rounded-lg"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option>Work</option>
            <option>Personal</option>
            <option>Study</option>
          </select>

          <select
            className="px-3 py-2 border rounded-lg"
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <button
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg"
            onClick={handleTask}
          >
            Add
          </button>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-wrap gap-2 justify-between items-center">
          {/* Search */}
          <input
            type="text"
            placeholder="Search tasks..."
            className="px-4 py-2 border rounded-lg w-full md:w-1/3"
          />

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <select className="px-3 py-2 border rounded-lg">
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>

            <select className="px-3 py-2 border rounded-lg">
              <option>All Categories</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
            </select>
          </div>
        </div>
      </div>

      {/* Undo Banner */}
      <div className="mt-4 w-full max-w-4xl bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg flex justify-between items-center">
        <span>Task deleted</span>
        <button className="font-semibold underline">Undo</button>
      </div>

      {/* Task List */}
      <div className="mt-6 w-full max-w-4xl space-y-3">
        {tasks.map((t) => (
          <div
            key={t.id}
            className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleComplete(t.id)}
              />

              <div>
                <p className={t.completed ? "line-through" : "font-medium"}>
                  {t.title}
                </p>
                <div className="text-sm text-gray-500 flex gap-2">
                  <span>{t.category}</span>
                  <span>•</span>
                  <span className="text-red-500">{t.priority}</span>
                </div>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex gap-2">
              <button
                className="px-3 py-1 border rounded"
                onClick={() => editTask(t.id)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 border rounded text-red-500"
                onClick={() => deleteTask(t.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex gap-2 items-center">
        <button className="px-3 py-1 border rounded disabled:opacity-50">
          Previous
        </button>

        <button className="px-3 py-1 border rounded bg-black text-white">
          1
        </button>
        <button className="px-3 py-1 border rounded">2</button>
        <button className="px-3 py-1 border rounded">3</button>

        <button className="px-3 py-1 border rounded">Next</button>
      </div>
    </div>
  );
};

export default Todo;
