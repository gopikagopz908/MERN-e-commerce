import React, { useEffect, useState ,useContext} from "react";
import { FaUserCircle } from "react-icons/fa"; 
import { AdminContext } from "./AdminContext/Admincontext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [adminLogin, setAdminLogin] = useState(false);
  const id = localStorage.getItem("role");
const navigate=useNavigate()
  
  useEffect(() => {
    if (id) {
      setAdminLogin(true);
    }
  }, [id]);

  const adminLogout = () => {

    localStorage.removeItem("role"); 
    setAdminLogin(false); 
    navigate('/login')
  };
const{toggled,setToggled,broken,setBroken}=useContext(AdminContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary" style={{ height: "57px", width: "100%" }}>
      <div className="container d-flex justify-content-between align-items-center">
      <div>
        {broken && (
          <button className="sb-button" onClick={() => setToggled(!toggled)}>
            Menu
          </button>
        )}
      </div>
        {adminLogin && (
          <div className="d-flex align-items-center">
            <FaUserCircle size={30} color="white" className="me-3" />
            <button
              onClick={adminLogout}
              className="border-0 text-white fw-bold rounded-3 bg-dark px-3 py-1"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
