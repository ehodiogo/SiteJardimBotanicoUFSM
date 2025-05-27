import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../public/jardimbotanicoLogo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className="navbar fixed-top d-flex justify-content-between align-items-center px-4"
        style={{
          backgroundColor: "#2e7d32",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          height: "auto",
          zIndex: 1000,
        }}
      >
        <div className="d-flex align-items-center gap-3 text-white">
          <img
            src={logo}
            className="rounded-circle"
            style={{ width: "70px" }}
            alt="Logo"
          />
          <h3 className="d-none d-lg-block">Jardim Botânico UFSM</h3>
        </div>
        {/* Hamburguer para mobile */}
        <div className="d-lg-none">
          <button
            className="btn text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.5h14v1H1v-1zm0 5h14v1H1v-1zm0 5h14v1H1v-1z" />
            </svg>
          </button>
        </div>
        {/* Menu items */}
        <ul
          className={`navbar-nav d-none d-lg-flex flex-row gap-4 mb-0`}
          style={{ listStyle: "none" }}
        >
          {[
            { text: "Início", href: "/#" },
            { text: "Trilhas", href: "/trilhas" },
            { text: "Biodiversidade", href: "/listagem" },
          ].map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="nav-link text-white fw-medium"
                style={{
                  position: "relative",
                  transition: "color 0.3s ease",
                }}
              >
                {item.text}
                <span
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    height: "2px",
                    width: "0%",
                    backgroundColor: "#a5d6a7",
                    transition: "width 0.3s",
                  }}
                  className="hover-line"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile menu dropdown */}
      {isOpen && (
        <div
          className="position-fixed w-100 d-lg-none"
          style={{
            backgroundColor: " #4caf50",
            top: "75px",
            left: 0,
            zIndex: 999,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <ul className="list-unstyled m-0 p-3">
            {[
              { text: "Início", href: "/#" },
              { text: "Trilhas", href: "/trilhas" },
              { text: "Biodiversidade", href: "/listagem" },
            ].map((item, index) => (
              <li key={index} className="mb-2">
                <a
                  href={item.href}
                  className="text-white fw-medium text-decoration-none"
                  onClick={() => setIsOpen(false)}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Estilo para hover underline animado */}
      <style>{`
        .nav-link:hover {
          color: #c8e6c9 !important;
        }
        .nav-link:hover .hover-line {
          width: 100%;
        }
      `}</style>
    </>
  );
};

export default Navbar;
