import {useState, useEffect} from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import axios from 'axios'
import Markdown from 'react-markdown'
import Prism from "prismjs"
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

function App() {

  const [code, setCode] = useState(`Enter your code here`)
  
  const [review, setReview] = useState(``)

  useEffect(()=>{
    Prism.highlightAll()
  },[])
  
  async function reviewCode(){
    const response= await axios.post('http://localhost:3000/ai/get-review', {code:code})
    setReview(response.data);
  }
  return (
    <main className='p-2 flex gap-2 h-screen'>
      <div className="bg-black h-full w-1/2 rounded-2xl relative m-0 p-0 overflow-hidden">
        <div className="h-full p-0 text-left mt-0  ">
          <Editor className='rounded-2xl font-16 h-full overflow-y-auto text-white border-3 border-solid border-white'
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => Prism.highlight(code, Prism.languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
            }}
          />
        </div>
        <div className="text-black absolute bottom-0 right-0 mr-10 mb-10 px-5 py-2 bg-white rounded-2xl text-center cursor-pointer select-none" 
        onClick={reviewCode}
        >Review</div>
      </div>
      <div className="bg-black h-full w-1/2 rounded-2xl border-3 border-white text-white overflow-auto p-5 leading-[2rem]">
      {review && review.trim() !== '' && (
  <h1 className='text-3xl font-serif text-center pb-10 text-white'>After Review</h1>
    )}
    {review && review.trim() !== '' ? (
  <>
    <Markdown rehypePlugins={[rehypeHighlight]}>
      {review}
    </Markdown>
  </>
) : (
  <p className="text-3xl font-serif text-center ">No review's</p>
)}

      </div>
    </main>

  )
}

export default App

