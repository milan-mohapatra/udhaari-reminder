import { useReducer } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Auth from "./pages/Auth.jsx"
import { user, UserContext, userReducer } from "./hooks/useUser.jsx"

const App = () => {
  const [state, dispatch] = useReducer(userReducer, user)

  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Dashboard />} />
        <Route path="*" element={<div>not found</div>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
