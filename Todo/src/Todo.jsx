import React, { use, useEffect, useState } from "react";

const Todo = () => {
  const [task, setTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const [taskDelete, setTaskDelete] = useState(null);
  const [showUndo, setShowUndo] = useState(false);
  const [timerId, setTimerId] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  let finalTask = tasks;


  if (search) {
    finalTask = finalTask.filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  if (categoryFilter !== "All Categories") {
    finalTask = finalTask.filter((t) => t.category === categoryFilter);
  }

  if (statusFilter !== "All") {
    finalTask = finalTask.filter((t) => {
      if (statusFilter === "Completed") return t.completed === true;
      if (statusFilter === "Pending") return t.completed === false;
    });
  }

    const totalPages = Math.ceil(finalTask.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTasks = finalTask.slice(startIndex,endIndex);


  const handleTask = () => {
    if (task.trim() === "") return;

    if (editId !== null) {
      const update = tasks.map((t) =>
        t.id === editId ? { ...t, title: task, category, priority } : t,
      );
      setTasks(update);
      setEditId("");
      setTask("");
    } else {
      const newTask = {
        id: Date.now(),
        title: task,
        completed: false,
        category,
        priority,
      };
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);

    if (timerId) {
      clearTimeout(timerId);
    }
    setTaskDelete(taskToDelete);

    const update = tasks.filter((t) => t.id !== id);
    setTasks(update);

    setShowUndo(true);

    const newTimer = setTimeout(() => {
      setShowUndo(false);
      setTaskDelete(null);
    }, 5000);

    setTimerId(newTimer);
  };

  const handleUndo = () => {
    if (!taskDelete) return;

    setTasks((prev) => [...prev, taskDelete]);
    setTaskDelete(null);
    setShowUndo(false);

    if (timerId) {
      clearTimeout(timerId);
    }
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

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  const categoryFilteredTasks = tasks.filter((t) => {
    if (categoryFilter === "All Categories") return true;
    return t.category === categoryFilter;
  });

  const statusFilterTasks = tasks.filter((t) => {
    if (statusFilter == "All") return true;
    return t.status === statusFilter;
  });

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
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks..."
            className="px-4 py-2 border rounded-lg w-full md:w-1/3"
          />

          {/* Filters */}
          <div className="flex gap-2 flex-wrap">
            <select
              className="px-3 py-2 border rounded-lg"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>

            <select
              className="px-3 py-2 border rounded-lg"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All Categories</option>
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
            </select>
          </div>
        </div>
      </div>
      {/* Undo Banner */}
      {showUndo && taskDelete && (
        <div className="mt-4 w-full max-w-4xl bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg flex justify-between items-center">
          <span>Task deleted</span>
          <button className="font-semibold underline" onClick={handleUndo}>
            Undo
          </button>
        </div>
      )}
      {/* Task List */}
      <div className="mt-6 w-full max-w-4xl space-y-3">
        {finalTask.length === 0 ? (
          <h2>No matched found!</h2>
        ) : (
          paginatedTasks.map((t) => (
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
                  onClick={() => {
                    setEditId(t.id);
                    setTask(t.title);
                    setCategory(t.category);
                    setPriority(t.priority);
                  }}
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
          ))
        )}
      </div>
      {/* Pagination */}
     <div className="mt-6 flex gap-2 items-center">

  {/* Prev */}
  <button
    onClick={() => setCurrentPage((p) => p - 1)}
    disabled={currentPage === 1}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Previous
  </button>

  {/* Page Numbers */}
  {[...Array(totalPages)].map((_, i) => (
    <button
      key={i}
      onClick={() => setCurrentPage(i + 1)}
      className={`px-3 py-1 border rounded ${
        currentPage === i + 1 ? "bg-black text-white" : ""
      }`}
    >
      {i + 1}
    </button>
  ))}

  {/* Next */}
  <button
    onClick={() => setCurrentPage((p) => p + 1)}
    disabled={currentPage === totalPages}
    className="px-3 py-1 border rounded disabled:opacity-50"
  >
    Next
  </button>

</div>
    </div>
  );
};

export default Todo;
