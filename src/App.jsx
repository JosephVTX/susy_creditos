import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CreateProduct } from "./components/createProduct/CreateProduct";
import { CreateUser } from "./components/createUser/CreateUser";
import { Login } from "./components/login/Login";
import { Products } from "./components/products/Products";
import { Users } from "./components/users/Users";
import PrivateRoute from "./components/utils/PrivateRoute";

const App = () => {
  return (
    <Router>
      
        <Routes>

            <Route element={<PrivateRoute/>}>
              <Route path="/" element={<Users/>} />
            </Route>

            <Route element={<PrivateRoute/>}>
              <Route path="/create-user" element={<CreateUser/>} />
            </Route>
            <Route  path="/products/:id/:name" element={<Products/>} />

            <Route  path="/login" element={<Login/>} />
            
        </Routes>
        
      
    </Router>
  );
};

export default App;
