import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyOrders from "./Orders";

import Slipper from "./Slippers"

function App() {
  return (
   <div>
     <Router>
            <Routes>
                <Route path="/" element={ <Slipper/>} />
                <Route path="/my-orders" element={<MyOrders />} />
            </Routes>
        </Router>

   </div>
  );
}

export default App;
