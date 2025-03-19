import { useState, useEffect } from "react";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    const res = await fetch("http://127.0.0.1:5000/api/tasks"); // Update with your backend URL
    const data = await res.json();
    setTasks(data);
  }

  async function addTask() {
    const res = await fetch("http://127.0.0.1:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    if (res.ok) {
      fetchTasks();
      setTitle("");
    }
  }

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <div className="flex gap-2">
        <input
          className="border p-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task..."
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addTask}>
          Add Task
        </button>
      </div>
      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task._id} className="border p-2 mt-2 w-full">
            {task.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
