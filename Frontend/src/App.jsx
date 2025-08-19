import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import Prism from "prismjs";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import Dropdown from '../components/dropdown'
import SelectedTask from '../components/selectTask'


function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code: code,
      });
      setReview(response.data);
    } catch (err) {
      setReview("⚠️ Error while fetching review");
    } finally {
      setLoading(false);
    }
  }

   useEffect(() => {
    if (!loading && review.trim() !== "") {
      const reviewSection = document.getElementById("review");
      reviewSection?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading, review]);

  return (
    <>
    <main className="h-screen w-full bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-900 border border-gray-700 shadow-xl rounded-7xl w-full max-w-5xl h-full flex flex-col relative ">
        <div className="flex-1 relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={16}
            className="font-mono text-base text-gray-100 min-h-full w-full outline-none"
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 16,
            }}
          />
          {code.trim() === "" && (
            <span className="absolute top-2 left-3 text-gray-600 text-3xl opacity-60 pointer-events-none select-none">
              Enter Your Code Here...
            </span>
          )}
        </div>
        <div className="p-3 sm:p-4 border-t border-gray-700 bg-gray-950 flex flex-col sm:flex-row sm:justify-evenly items-center gap-3 sm:gap-6">
  {/* Dropdown */}
  <div className="w-full sm:w-auto">
    <Dropdown />
  </div>

  {/* Selected Task */}
  <div className="w-full sm:w-auto">
    <SelectedTask />
  </div>

  {/* Review Button */}
  <button
    onClick={reviewCode}
    disabled={loading}
    className={`w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-2.5 
      bg-gradient-to-r from-purple-600 to-indigo-600 
      text-white rounded-xl shadow-lg 
      transition-all duration-300 
      ${
        loading
          ? "bg-gray-600 text-gray-300 cursor-not-allowed"
          : "hover:scale-105 hover:shadow-purple-500/50"
      }`}
  >
    {loading ? (
      <div className="flex items-center justify-center gap-2">
        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        <span className="text-xs sm:text-sm md:text-base">Reviewing...</span>
      </div>
    ) : (
      <span className="text-xs sm:text-sm md:text-base">Review 🚀</span>
    )}
  </button>
   </div>
      </div>
    </main>
    <div id="review" className="bg-gradient-to-b from-gray-950 to-gray-900 h-screen w-full  border border-gray-700 text-white overflow-auto p-8 shadow-lg leading-relaxed scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
         {review && review.trim() !== "" ? (
          <div className="animate-fadeIn">
            <h1 className="text-3xl font-serif text-center pb-8 text-purple-400 drop-shadow-md">
              ✨ After Review ✨
            </h1>
            <Markdown rehypePlugins={[rehypeHighlight]} >
              {review}
            </Markdown>
          </div>
        ) : (
          <p className="text-2xl font-serif text-center text-gray-400">
            No review yet 👀
          </p>
        )}
      </div>
    </>
      
  );
}

export default App;
