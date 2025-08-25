// import logo from "./logo.svg";
// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./layout/navbar";
import { Footer } from "./layout/footer";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";
import EmailVerification from "./pages/EmailVerification";

import Products from "./User/products/Products";
import Screeners from "./User/products/Screeners";
import Supercharts from "./User/products/Supercharts";
import FundementalGraphs from "./User/products/FundementalGraphs";
import YieldCurves from "./User/products/YieldCurves";
import Options from "./User/products/Options";
import Portfolios from "./User/products/Portfolios";

import Community from "./User/community/Community";
import Newsflow from "./User/community/Newsflow";
import Idea from "./User/community/Idea";
import IdeaDesc from "./User/community/IdeaDesc";

import Stocks from "./User/products/screeners/Stocks";
import EFTs from "./User/products/screeners/EFTs";
import Bonds from "./User/products/screeners/Bonds";
import Crypto from "./User/products/screeners/Crypto";

import Earnings from "./User/products/calendars/Earnings";
import IPO from "./User/products/calendars/IPO";
import Dividends from "./User/products/calendars/Dividends";

import Users from "./Admin/Users";
import SignIn from "./pages/Signin";
import Profile from "./User/profile/Profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          {/* Landing pages */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route
            exact
            path="/signup/emailverification"
            element={<EmailVerification />}
          />
          <Route exact path="/profile" element={<Profile />} />

          {/* Products pages  */}
          <Route exact path="/products" element={<Products />} />

          {/* products/calendars */}
          <Route
            exact
            path="/products/calenders/earnings"
            element={<Earnings />}
          />
          <Route exact path="/products/calenders/ipo" element={<IPO />} />
          <Route
            exact
            path="/products/calenders/dividends"
            element={<Dividends />}
          />

          {/* products/screeners */}
          <Route exact path="/products/screeners/stocks" element={<Stocks />} />
          <Route exact path="/products/screeners/efts" element={<EFTs />} />
          <Route exact path="/products/screeners/bonds" element={<Bonds />} />
          <Route exact path="/products/screeners/crypto" element={<Crypto />} />

          {/* products/fundementalgraphs */}
          <Route
            exact
            path="/products/fundementalgraphs"
            element={<FundementalGraphs />}
          />
          <Route exact path="/products/yieldcurves" element={<YieldCurves />} />
          <Route exact path="/products/options" element={<Options />} />
          <Route exact path="/products/portfolios" element={<Portfolios />} />

          {/* Community pages  */}
          <Route exact path="/community" element={<Community />} />
          <Route exact path="/community/newsflow" element={<Newsflow />} />
          <Route exact path="/community/ideas" element={<Idea />} />
          <Route exact path="/community/ideas/:id" element={<IdeaDesc />} />

          {/* Markets pages  */}
          {/* More pages */}
          {/* Admin panel */}
          <Route exact path="/admin/users" element={<Users />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
