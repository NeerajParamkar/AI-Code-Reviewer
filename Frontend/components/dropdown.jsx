import { useState } from "react";

export default function Dropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("tech");

  const options = ["JavaScript", "Python", "C++", "Java","Other"];

  return (
    <div className="relative inline-block w-full md:w-42 ">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 text-xs  lg:text-base bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg flex justify-center gap-4 items-center"
      >
        {selected}
        <svg
          className={`w-5 h-5 transform transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul className="absolute z-10 mt-2 w-full bg-gray-900 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSelected(option);
                setOpen(false);
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
