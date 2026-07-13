import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { MdManageAccounts, MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useSelector, useDispatch } from "react-redux";
import { API_END_POINT, NETFLIX_LOGO_URL } from "../utils/constant";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { setToggle } from "../redux/movieSlice";

const Header = () => {
  const user = useSelector((store) => store.app.user);
  const toggle = useSelector((store) => store.movie.toggle);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${API_END_POINT}/logout`);
      if (res.data.success) {
        toast.success(res.data.message);
      }
      dispatch(setUser(null));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleHandler = () => {
    dispatch(setToggle());
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute z-20 flex w-full items-center justify-between px-6 bg-gradient-to-b from-black">
      <Link to={user ? "/browse" : "/"}>
        <img className="w-56" src={NETFLIX_LOGO_URL} alt="netflix-logo" />
      </Link>
      {user && (
        <div className="flex items-center gap-3">
          <button
            onClick={toggleHandler}
            className="bg-red-800 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors duration-200"
          >
            {toggle ? "Home" : "Search Movie"}
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-200"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-8 h-8 rounded bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {user.fullName?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <h1 className="text-sm font-medium text-white hidden sm:block">
                {user.fullName}
              </h1>
              {dropdownOpen ? (
                <IoIosArrowDropup size="18px" color="white" />
              ) : (
                <IoIosArrowDropdown size="18px" color="white" />
              )}
            </div>

            {/* Dropdown Menu */}
            <div
              className={`absolute right-0 top-full mt-2 w-56 origin-top-right transition-all duration-200 ease-out ${
                dropdownOpen
                  ? "opacity-100 scale-100 pointer-events-auto"
                  : "opacity-0 scale-95 pointer-events-none"
              }`}
              style={{
                backgroundColor: "rgba(20, 20, 20, 0.97)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "4px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
              }}
            >
              {/* Caret Arrow */}
              <div
                className="absolute -top-2 right-4 w-0 h-0"
                style={{
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: "8px solid rgba(255,255,255,0.15)",
                }}
              />

              {/* User Info Section */}
              <div
                className="px-4 py-3 flex items-center gap-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div className="w-9 h-9 rounded bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">
                    {user.fullName?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div className="overflow-hidden">
                  <p className="text-white text-sm font-semibold truncate">
                    {user.fullName}
                  </p>
                  <p className="text-gray-400 text-xs truncate">
                    {user.email || "Netflix User"}
                  </p>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-1">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-150 text-left"
                  onClick={() => setDropdownOpen(false)}
                >
                  <CgProfile size="18px" />
                  <span>Profile</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-150 text-left"
                  onClick={() => setDropdownOpen(false)}
                >
                  <MdManageAccounts size="18px" />
                  <span>Account</span>
                </button>
              </div>

              {/* Sign Out */}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-150 text-left"
                  onClick={() => {
                    setDropdownOpen(false);
                    logoutHandler();
                  }}
                >
                  <MdLogout size="18px" />
                  <span>Sign Out of Netflix</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
