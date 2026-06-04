import { Banknote, LogOut, Send, LayoutDashboard } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="navbar">
      <div className="brand">
        <Banknote size={24} aria-hidden="true" />
        <span>Enterprise Banking</span>
      </div>

      <nav className="navlinks" aria-label="Primary navigation">
        <NavLink to="/" title="Dashboard">
          <LayoutDashboard size={18} aria-hidden="true" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/transfer" title="Transfer funds">
          <Send size={18} aria-hidden="true" />
          <span>Transfer</span>
        </NavLink>
        <button type="button" onClick={logout} title="Log out">
          <LogOut size={18} aria-hidden="true" />
          <span>Logout</span>
        </button>
      </nav>
    </header>
  );
}
