import { useState } from "react";

export default function SelectedTask() {
  const [openTask, setopenTask] = useState(false);
  const [selectedTask, setselectedTask] = useState("Select");

  const options = ["Review code","fix bugs","calculate tc and sc"];

  return (
    <div className="relative inline-block w-full md:w-52 ">
      <button
        onClick={() => setopenTask(!openTask)}
        className="w-full px-4 py-2 text-xs md:text-sm lg:text-base bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg flex justify-center gap-4 items-center"
      >
        {selectedTask}
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            openTask ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {openTask && (
        <ul className="absolute z-10 mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => {
                setselectedTask(option);
                setopenTask(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-gray-200 transition"
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
