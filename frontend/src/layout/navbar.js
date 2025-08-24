import React from "react";

const Navbar = () => {
  return (
    <>
      <style>{`
        /* Navbar background */
        .navbar {
          background-color: #000000 !important;
          padding: 1rem 0;
        }

        /* Navbar links */
        .nav-link {
          font-weight: 500;
          padding: 0.5rem 1rem;
          transition: color 0.3s ease;
          color: #ffffff !important;
        }
        .nav-link:hover {
          color: #0d6efd !important;
        }

        /* Dropdown menu */
        .dropdown-menu {
          background-color: #111111;
          border: none;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          border-radius: 0.5rem;
        }
        .dropdown-item {
          padding: 0.75rem 1.5rem;
          color: #ffffff;
          transition: background-color 0.3s ease;
        }
        .dropdown-item:hover {
          background-color: #343a40;
          color: #f8f9fa;
        }

        /* Multi-level dropdowns */
        .dropdown-submenu {
          position: relative;
        }
        .dropdown-submenu .dropdown-menu {
          top: 0;
          left: 100%;
          margin-left: 0.1rem;
        }
        .dropdown-submenu:hover > .dropdown-menu {
          display: block;
        }

        /* Dropdown labels */
        .dropdown-label {
          font-size: 0.75rem;
          color: #adb5bd;
          padding: 0.25rem 1.5rem;
          pointer-events: none;
        }

        /* Search bar */
        .search-form .form-control {
          border-radius: 50px;
          padding: 0.5rem 1rem;
          border: 1px solid #ffffff;
          background-color: #000000;
          color: #ffffff;
          transition: all 0.3s ease;
        }
        .search-form .form-control::placeholder {
          color: #adb5bd;
        }
        .search-form .form-control:focus {
          box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
          border-color: #0d6efd;
          background-color: #000000;
          color: #ffffff;
        }
        .search-form .btn {
          border-radius: 50px;
          padding: 0.5rem 1.5rem;
          border: 1px solid #ffffff;
          background-color: transparent;
          color: #ffffff;
          transition: all 0.3s ease;
        }
        .search-form .btn:hover {
          background-color: #0d6efd;
          border-color: #0d6efd;
          color: #ffffff;
        }

        /* Center middle items */
        .navbar-nav.middle-nav {
          flex-grow: 1;
          justify-content: center;
        }

        /* Account button */
        .account-btn {
          background-color: transparent;
          border: 1px solid #ffffff;
          border-radius: 50px;
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          color: #ffffff;
          transition: all 0.3s ease;
        }
        .account-btn:hover {
          background-color: #0d6efd;
          color: #ffffff;
        }

        /* Dropdowns on hover */
        .navbar-nav .dropdown:hover > .dropdown-menu {
          display: block;
        }
      `}</style>

      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-white" href="/">
            Banijjo
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav middle-nav">
              {/* Search */}
              <form className="d-flex search-form me-3" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search markets, assets..."
                  aria-label="Search"
                />
                <button className="btn" type="submit">
                  Search
                </button>
              </form>

              {/* Products */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/products"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Products
                </a>
                <ul className="dropdown-menu">
                  {/* Supercharts with label */}
                  <li>
                    <a className="dropdown-item" href="/products/supercharts">
                      Supercharts
                    </a>
                  </li>
                  <li>
                    <li>
                      <a className="dropdown-item" href="/products/portfolioss">
                        Portfolios
                      </a>
                    </li>

                    <span className="dropdown-label">Individual Tools</span>
                  </li>

                  {/* Screeners with sub-options */}
                  <li className="dropdown-submenu">
                    <a
                      className="dropdown-item dropdown-toggle"
                      // href="/products/screeners"
                    >
                      Screeners
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="/products/screeners/stocks"
                        >
                          Stocks
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/products/screeners/etfs"
                        >
                          ETFs
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/products/screeners/bonds"
                        >
                          Bonds
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/products/screeners/crypto"
                        >
                          Crypto
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* Calendars with sub-options */}
                  <li className="dropdown-submenu">
                    <a
                      className="dropdown-item dropdown-toggle"
                      href="/products/calenders"
                    >
                      Calendars
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="/products/calenders/earnings"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/products/calenders/ipo"
                        >
                          IPO
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/products/calenders/dividends"
                        >
                          Dividends
                        </a>
                      </li>
                    </ul>
                  </li>

                  {/* Remaining options */}
                  <li>
                    <a
                      className="dropdown-item"
                      href="/products/fundementalgraphs"
                    >
                      Fundamental Graphs
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/products/yieldcurves">
                      Yield Curves
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/products/options">
                      Options
                    </a>
                  </li>
                </ul>
              </li>

              {/* Community */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/community"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Community
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/community/ideas">
                      Ideas
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/community/newsflow">
                      Newsflow
                    </a>
                  </li>
                </ul>
              </li>

              {/* Markets */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/markets"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Markets
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/markets/world">
                      World
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/markets/countries">
                      Countries
                    </a>
                  </li>

                  {/* Assets label */}
                  <li>
                    <span className="dropdown-label">Assets</span>
                  </li>

                  {/* Assets options */}
                  <li>
                    <a className="dropdown-item" href="/markets/assets/indices">
                      Indices
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/markets/assets/stocks">
                      Stocks
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/markets/assets/crypto">
                      Crypto
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/markets/assets/futures">
                      Futures
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/markets/assets/forex">
                      Forex
                    </a>
                  </li>

                  {/* Bonds with sub-sub-options */}
                  <li className="dropdown-submenu">
                    <a
                      className="dropdown-item dropdown-toggle"
                      href="/markets/assets/bonds"
                    >
                      Bonds
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a
                          className="dropdown-item"
                          href="/markets/assets/bonds/government"
                        >
                          Government Bonds
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="/markets/assets/bonds/corporate"
                        >
                          Corporate Bonds
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <a className="dropdown-item" href="/markets/assets/etfs">
                      ETFs
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/markets/assets/economy">
                      Economy
                    </a>
                  </li>
                </ul>
              </li>

              {/* Brokers */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/brokers"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Brokers
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/brokers/compare">
                      Compare Brokers
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/brokers/register">
                      Open an Account
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/brokers/awards">
                      Awarded Brokers
                    </a>
                  </li>
                </ul>
              </li>

              {/* More */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/more"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/more/help">
                      Help Centre
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/more/aboutus">
                      About Us
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            {/* Right side button */}
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link account-btn" href="/signup">
                  Get Started
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
