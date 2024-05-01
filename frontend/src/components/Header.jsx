import React from "react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/storeconfig/loginSlice";

function Header() {
  const authStatus = useSelector(state => state.login.status);
  const dispatch = useDispatch()
  const navigate = useNavigate();

  async function logoutBtn(){
      await fetch("/api/v1/users/logout",{
        method:"POST"
      }).then(()=>{
        dispatch(logout())
        navigate("/login")
      })
  }

  const navItems = [
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ];

  return (
    <div className="fixed w-full mt-1 px-4 py-1">
      <div className="flex justify-between items-center ">
        <nav className="flex justify-between items-center w-full">
          <div className="text-lg md:text-2xl ">
            <Link to="/">
              Socia+
            </Link>
          </div>
          <ul className="flex justify-center items-center ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  {
                    <Link
                      to={item.slug}
                      className="inline-block px-4 mx-1 py-1 duration-200 hover:underline hover:text-blue-600"
                    >
                      {item.name}
                    </Link>
                  }
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Button onClick={logoutBtn}>Logout</Button>
              </li>
            )}
          </ul>
        </nav>
        <div className="ms-4">
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default Header;
