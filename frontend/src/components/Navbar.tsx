import { MenuIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <motion.nav
        className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        <Link to="/">
          <img
            className="h-11.5 w-auto"
            src="/logo.svg"
            alt="logo"
            width={130}
            height={34}
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 transition duration-500">
          <Link to="/" className="hover:text-pink-300 transition">
            Home
          </Link>
          <Link to="/generate" className="hover:text-pink-300 transition">
            Generate
          </Link>
          {isLoggedIn && user ? (
            <Link
              to="/my-generation"
              className="hover:text-pink-300 transition"
            >
              My Generations
            </Link>
          ) : (
            <Link to="#" className="hover:text-pink-300 transition">
              About
            </Link>
          )}
          <Link to="#" className="hover:text-pink-300 transition">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="hidden md:block w-8 h-8 rounded-full bg-white/20 animate-pulse"></div>
          ) : isLoggedIn && user ? (
            <div className="relative group">
              <button className="hidden md:block rounded-full size-8 bg-white/20 border-2 border-white/10">
                {user?.name.charAt(0).toUpperCase()}
              </button>
              <div className="absolute hidden group-hover:block top-6 right-0 pt-4">
                <button
                  className="bg-white/20 border-2 border-white/10 px-5 py-1.5 rounded"
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="hidden md:block px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full"
            >
              Get Started
            </button>
          )}
        </div>

        <button onClick={() => setIsOpen(true)} className="md:hidden">
          <MenuIcon size={26} className="active:scale-90 transition" />
        </button>
      </motion.nav>

      <div
        className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Link to="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/generate" onClick={() => setIsOpen(false)}>
          Generate
        </Link>
        {isLoggedIn && user ? (
          <Link to="/my-generation" onClick={() => setIsOpen(false)}>
            My Generations
          </Link>
        ) : (
          <Link to="#" onClick={() => setIsOpen(false)}>
            About
          </Link>
        )}
        <Link to="#" onClick={() => setIsOpen(false)}>
          Contact
        </Link>
        {isLoggedIn && user ? (
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        )}

        <button
          onClick={() => setIsOpen(false)}
          className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md flex"
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}
