import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<string[]>(() => {
    const savedTasks = localStorage.getItem("portfolio_tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("portfolio_tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (inputValue.trim() === "") return;
    setTasks([...tasks, inputValue]);
    setInputValue("");
  };

  const handleDeleteTask = (indexToDelete: number) => {
    setTasks(tasks.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 w-full selection:bg-lime-400 selection:text-black">
      <div className="bg-zinc-900 p-8 rounded-2xl shadow-[0_0_50px_-12px_rgba(163,230,53,0.15)] w-full max-w-md border border-zinc-800">
        <h1 className="text-3xl font-black text-white text-center mb-2 tracking-tight">
          Task{" "}
          <span className="text-lime-400 drop-shadow-[0_0_10px_rgba(163,230,53,0.5)]">
            Manager
          </span>
        </h1>

        <p className="text-sm text-zinc-500 text-center mb-6 font-medium">
          Total tasks in your list:{" "}
          <span className="text-lime-400 font-bold">{tasks.length}</span>
        </p>

        {/* Форма ввода */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Add a new task..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-transparent transition-all placeholder-zinc-600 text-zinc-200"
          />
          <button
            onClick={handleAddTask}
            className="bg-lime-400 hover:bg-lime-300 text-black font-extrabold px-6 py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)] cursor-pointer active:scale-95"
          >
            Add
          </button>
        </div>

        {/* Список задач */}
        <ul className="space-y-3">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-zinc-950/50 hover:bg-zinc-950 border border-zinc-800/60 rounded-xl transition-all"
            >
              <span className="text-zinc-300 font-medium">
                <span className="text-lime-400/70 font-bold mr-1">
                  {index + 1}.
                </span>{" "}
                {task}
              </span>
              <button
                onClick={() => handleDeleteTask(index)}
                className="text-sm font-bold text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 px-3 py-1.5 rounded-lg transition-colors border border-red-900/30 cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-sm text-zinc-600 mt-4 italic">
            No tasks found. Add some above!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
