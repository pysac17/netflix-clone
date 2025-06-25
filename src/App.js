import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";
import { UserAuthContextProvider } from "./UserAuthContext";

function App() {
  return (
    <UserAuthContextProvider>
      <Routes>
        <Route
          path="/home"
          element={
            <div className="app">
              <div className="content-container">
                <Container>
                  <Row>
                    <Col>
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          }
        />
        <Route 
          path="/" 
          element={
            <div className="auth-bg">
              <div className="auth-container">
                <Login />
              </div>
            </div>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <div className="auth-bg">
              <div className="auth-container">
                <Signup />
              </div>
            </div>
          } 
        />
      </Routes>
    </UserAuthContextProvider>
  );
}

export default App;