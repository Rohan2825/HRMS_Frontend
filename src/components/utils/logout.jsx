import { FaLongArrowAltUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function LogoutButton() {
    const navigate = useNavigate();
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    };
     return(
        <button
         onClick={handleLogout}
         icon={<FaLongArrowAltUp />}
         type="button">
          Log Out
          </button>
     );
};