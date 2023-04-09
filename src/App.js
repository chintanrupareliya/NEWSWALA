
import './App.css';
import React,{useState} from 'react'
import NavBar from './components/NavBar';
import News  from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'



export default function App() {
  const apiKey=process.env.REACT_APP_NEWESWALA_API_KEY
  const [progress, setProgress] = useState(0)

    return (
        // console.log(apiKey)
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color='#0dcaf0'
        progress={progress}
        height={4}
      />
          <Routes>
            <Route exact path="/"element={<News setProgress={setProgress} apiKey={apiKey} key="general" country='in' category="general"/>}/>
            <Route exact path="/business" element={ <News setProgress={setProgress} apiKey={apiKey} key="business"  country='in' category="business"/>}/>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" country='in' category="entertainment"/>}/>
            <Route exact path="/general"element={<News setProgress={setProgress} apiKey={apiKey} key="general" country='in' category="general"/>}/>
            <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" country='in' category="health"/>}/>
            <Route exact path="/science"element={<News setProgress={setProgress} apiKey={apiKey} key="science" country='in' category="science"/>}/>
            <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" country='in' category="sports"/>}/>
            <Route exact path="/technology"element={<News setProgress={setProgress} apiKey={apiKey} key="technology" country='in' category="technology"/>}/>
          </Routes>
        </Router>
      </div>
    )
}


