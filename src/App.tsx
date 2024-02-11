import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./Outlet";
import Home from "./pages/Home";
import Appearance from "./pages/Appearance";
import Audience from "./pages/Audience";
import Delivery from "./pages/Delivery";
import Discounts from "./pages/Discounts";
import Marketing from "./pages/Marketing";
import Orders from "./pages/Orders";
import Payments from "./pages/Payments";
import Plugins from "./pages/Plugins";
import Products from "./pages/Products";
import Tools from "./pages/Tools";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Home />} />
          <Route path="/appearance" element={<Appearance />} />
          <Route path="/audience" element={<Audience />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/discounts" element={<Discounts />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/plugins" element={<Plugins />} />
          <Route path="/products" element={<Products />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
