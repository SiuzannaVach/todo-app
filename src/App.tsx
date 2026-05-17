import { useState, useEffect } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");

  // Инициализируем состояние: берем данные из памяти браузера, если они там есть
  const [tasks, setTasks] = useState<string[]>(() => {
    const savedTasks = localStorage.getItem("portfolio_tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // АВТО-СОХРАНЕНИЕ: этот блок срабатывает каждый раз, когда меняется массив tasks
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
    <div
      style={{
        padding: "40px",
        fontFamily: "sans-serif",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <h1>Task Manager</h1>

      {/* Наш динамический счетчик количества задач */}
      <p style={{ color: "#666" }}>Total tasks in your list: {tasks.length}</p>

      {/* Блок формы ввода новой задачи */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ padding: "8px", width: "70%", marginRight: "10px" }}
        />
        <button onClick={handleAddTask} style={{ padding: "8px 15px" }}>
          Add
        </button>
      </div>

      {/* Список элементов задач */}
      <ul
        style={{ textAlign: "left", paddingLeft: "0", listStyleType: "none" }}
      >
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "8px",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>
              {index + 1}. {task}
            </span>
            <button
              onClick={() => handleDeleteTask(index)}
              style={{ padding: "3px 8px", color: "red", cursor: "pointer" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
