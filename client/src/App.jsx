import { Route, Routes } from "react-router-dom"
import { Home, Login, Register, List, Detail, ViewProfile ,ViewInfo} from "./pages/index.js"
import PublicRoute from "./components/Routes/PublicRoute"
import ProtectedRoute from "./components/Routes/ProtectedRoute"
import Services from "./pages/Services.jsx"
import ServiceDetail from "./pages/ServiceDetail.jsx"


function App() {

  return (
    <>
      <div className='App'>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }>

          </Route>
          <Route path="/login" element={
            <PublicRoute>

              <Login />
            </PublicRoute>
          }></Route>

          <Route path="/register" element={
            <PublicRoute>

              <Register />
            </PublicRoute>
          }>
          </Route>

          <Route path="/explore" element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          }>
          </Route>

          <Route path="/item-detail/:id" element={
            <ProtectedRoute>
              <Detail />
            </ProtectedRoute>
          }>
          </Route>

          <Route path="/services" element={
            <ProtectedRoute>

              <Services />
            </ProtectedRoute>
          }>
          </Route>

          <Route path="/service-detail/:id" element={
            <ProtectedRoute>
              <ServiceDetail />
            </ProtectedRoute>
          }>
          </Route>

          <Route path="/ViewProfile" element={
            <ProtectedRoute>
              <ViewProfile />
            </ProtectedRoute>

          }></Route>
          
          <Route path="/View-Info" element={
            <ProtectedRoute>
              <ViewInfo />
            </ProtectedRoute>
          }>
          </Route>
          

        </Routes>

      </div>

    </>
  )
}

export default App
