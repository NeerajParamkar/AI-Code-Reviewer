import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import axios from "axios";
import Markdown from "react-markdown";
import Prism from "prismjs";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import SignUp from "../components/signUp";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState(``);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Select");
  const [openTask, setopenTask] = useState(false);
  const [selectedTask, setselectedTask] = useState("Select");
  const [selectedError,setselectedError]=useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [storeResponce, setStoreResponce] = useState("");
  const [navbar, setNavbar] = useState(false);
  const [responceData, setResponceData] = useState(false);
  const [responcesTOshow, setresponcesTOshow] = useState("");
  const [openLogin, setOpenlogin] = useState(false);




    const handleSave = async () => {
    console.log("Saving response as:", fileName)
    try {
      const response = await axios.post("http://localhost:3000/ai/data", {
        fileName,review,code
      },{ withCredentials: true } );
    if(response.data.success) toast.success("Response saved!"); 
    else toast.error("Response Not saved!"); 
    console.log(response)
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
    setIsOpen(false);
    setFileName("");
  };

  const GetSavedResponces=async ()=>{
    try {
      const savedResponces = await axios.get("http://localhost:3000/getdata", {
  withCredentials: true
});
      setresponcesTOshow(savedResponces.data.user.reviews)
      console.log(savedResponces.data.user.reviews[0])
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  }
  const options1 = ["Review Code","Fix Bugs","Calculate TC and SC"];
  const options2 = ["JavaScript", "Python", "C++", "Java","Other"];

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
  if (selected !== "Select" && selectedTask !== "Select") {
    setselectedError(true);
  } else {
    setselectedError(false);
  }
}, [selected, selectedTask]);


useEffect(() => {
  if (responceData) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
}, [responceData]);
  async function reviewCode() {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/ai/get-review", {
        code: code,selected,selectedTask
      });
      setReview(response.data);
    } catch (err) {
      setReview("⚠️ Please Connect to Internet");
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
    <Toaster position="top-right" reverseOrder={false} />
    <main className="h-screen w-full bg-gradient-to-br from-gray-950 to-gray-900 flex items-center justify-center p-6">
       {openLogin && <SignUp openLogin={openLogin} setOpenlogin={setOpenlogin}/>}
    <div onClick={()=>{navbar ? setNavbar(false): setNavbar(true)}} className="bg-gradient-to-r from-purple-600 to-indigo-600 cursor-pointer absolute right-5 top-5 rounded-full p-2 px-3 z-888">N</div>
    {navbar && (<div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg absolute right-15 top-5 h-29 w-40 p-3 z-888 ">
  <button onClick={()=> {setOpenlogin(true),navbar ? setNavbar(false): setNavbar(true)}}  className="px-3 m-2 py-1 w-33 bg-gray-700 text-gray-200 rounded-lg shadow hover:bg-gray-600 transition">
    View Profile
  </button>
  <button onClick={()=>{setResponceData(true),setNavbar(false),GetSavedResponces()}} className="cursor-pointer px-3 py-1 m-2 w-33  bg-gray-700 text-gray-200 rounded-lg shadow hover:bg-gray-600 transition opacity-900">
    See Responses
  </button>
</div>
)}

    {responceData && responcesTOshow && (
      <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-xl shadow-lg absolute h-[80%] w-[90%] m-100 p-3 z-888 overflow-y-auto hide-scrollbar">{responcesTOshow && (
        responcesTOshow.map((item, idx) => (
          <div key={idx}>
            <p>{item.reviewName}</p>
            <p>{item.reviewData}</p>
            <p>{item.reviewCode}</p>
            <p>{item.createdAt}</p>
          </div>
        ))

        
      
    )}<div onClick={()=>{setResponceData(false)}} className="absolute right-6 top-5 bg-amber-50 p-3 rounded-full cursor-pointer ">X</div></div>
    )}
      <div className="bg-gray-900 border border-gray-700 shadow-xl rounded-7xl w-full max-w-5xl h-full flex flex-col relative ">
        <div className="flex-1 relative overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hide-scrollbar">
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
  <div className="w-full sm:w-auto">
    <div className="relative inline-block w-full md:w-42 ">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 text-xs  lg:text-base bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg flex justify-center gap-4 items-center cursor-pointer"
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
          {options2.map((option, idx) => (
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
  </div>
  <div className="w-full sm:w-auto">
    <div className="relative inline-block w-full md:w-52 ">
      <button
        onClick={() => setopenTask(!openTask)}
        className="w-full px-4 py-2 text-xs md:text-sm lg:text-base bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-lg flex justify-center gap-4 items-center cursor-pointer"
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
          {options1.map((option, idx) => (
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
  </div>
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
      } ${selectedError ? "opacity-100 cursor-pointer":"opacity-50 cursor-not-allowed pointer-events-none"}`}
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
         <div className="animate-fadeIn px-4 sm:px-6 md:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-serif text-purple-400 drop-shadow-md text-center sm:text-left">
          ✨ After Review ✨
          </h1>
          <button onClick={() => setIsOpen(true)} className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-indigo-600  text-white rounded-xl shadow-lg hover:scale-105 transition-transform cursor-pointer"
          >
          💾 Save Response
          </button>
          </div>
        <div className="mt-6">
            <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
            </Markdown>
          </div>
            {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-gray-600 rounded-2xl shadow-lg p-6 w-80 sm:w-96 animate-fadeIn">
            <h2 className="text-lg font-semibold text-gray-300 mb-4 text-center">
              Enter Name to Save Response
            </h2>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter file name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => { handleSave();setStoreResponce(review)}}
                disabled={!fileName.trim()}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:scale-105 transition disabled:opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
          </div>

        ) : (
          <p className="text-2xl font-serif text-center text-gray-400">
            No review yet 👀
          </p>
        )}
      </div>
      <div className="bg-[#0F1626] text-green-600 text-center p-6">
  Made By Neeraj 🕹️ 
  {/* <a href="https://github.com/NeerajParamkar" target="_blank" rel="noopener noreferrer" className="underline ml-2">
    <img 
  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
  alt="GitHub Logo" 
  className="w-8 h-8"
/>

  </a> */}
</div>

    </>
      
  );
}

export default App;
