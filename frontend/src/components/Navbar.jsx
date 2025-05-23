import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  LogOut,
  MessageSquare,
  Settings,
  User,
  Phone,
  Menu,
  ArrowLeft,
  Shield,
  Gamepad2,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const hideUserOptions =
    location.pathname === "/" ||
    location.pathname === "/call" ||
    location.pathname === "/Admin" ||
    location.pathname === "/list";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">

        {/* Mobile View */}
        <div className="flex sm:hidden items-center justify-between w-full">
          <Link to="/" className="btn btn-sm">
            <ArrowLeft className="size-5" />
          </Link>

          <span className="text-lg font-semibold">Socify</span>

          <button onClick={toggleMenu} className="btn btn-sm gap-2">
            <Menu className="size-5" />
          </button>
        </div>

        {/* Desktop View: Centered Navigation */}
        <div className="hidden sm:flex items-center justify-center w-full space-x-4">
          {/* Navigation Links */}
          <Link to="/" className="btn btn-sm gap-2">
            Home
          </Link>

          <Link to="/list" className="btn btn-sm gap-2">
            <User className="size-5" />
            <span>Listener</span>
          </Link>

          <Link to="/call" className="btn btn-sm gap-2">
            <Phone className="size-5" />
            <span>Call</span>
          </Link>

          <Link to="/home" className="btn btn-sm gap-2">
            <MessageSquare className="size-5" />
            <span>Chatty</span>
          </Link>

          <Link to="/admin" className="btn btn-sm gap-2">
            <Shield className="size-5" />
            <span>Admin</span>
          </Link>

          <Link to="/game" className="btn btn-sm gap-2">
            <Gamepad2 className="size-5" />
            <span>Game</span>
          </Link>
        </div>

        {/* Desktop View: Right Side User Actions */}
        {!hideUserOptions && (
          <div className="hidden sm:flex items-center gap-2 ml-auto">
            <Link to="/settings" className="btn btn-sm gap-2">
              <Settings className="size-5" />
              <span>Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2">
                  <User className="size-5" />
                  <span>Profile</span>
                </Link>

                <button
                  onClick={logout}
                  className="btn btn-sm gap-2 bg-red-500 text-white hover:bg-red-600"
                >
                  <LogOut className="size-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden bg-base-100/90 absolute top-16 left-0 right-0 py-4 px-6">
          <Link to="/" className="block text-lg py-2" onClick={toggleMenu}>Home</Link>
          <Link to="/list" className="block text-lg py-2" onClick={toggleMenu}>Listener</Link>
          <Link to="/call" className="block text-lg py-2" onClick={toggleMenu}>Call</Link>
          <Link to="/home" className="block text-lg py-2" onClick={toggleMenu}>Chatty</Link>
          <Link to="/admin" className="block text-lg py-2" onClick={toggleMenu}>Admin</Link>
          <Link to="/game" className="block text-lg py-2" onClick={toggleMenu}>Game</Link>

          {!hideUserOptions && (
            <>
              <Link to="/settings" className="block text-lg py-2" onClick={toggleMenu}>Settings</Link>
              {authUser && (
                <>
                  <Link to="/profile" className="block text-lg py-2" onClick={toggleMenu}>Profile</Link>
                  <button
                    onClick={logout}
                    className="block text-lg py-2 w-full text-left bg-red-500 text-white hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
