import { Link } from "react-router";
import {PlusIcon} from "lucide-react";

const Navbar = ({isLoggedIn}) => {
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
          <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">KaryaLipi</h1>
               <div className="flex items-center justify-between gap-5">
                  {isLoggedIn && <Link to={"/create"} className="btn btn-primary">
                  <PlusIcon className="size-5"/>
                  <span>New Note</span>
                  </Link>}
                  {!isLoggedIn &&<Link to={"/register"} className="btn btn-primary">
                  <span>Register</span>
                  </Link>}
               </div>
               
          </div>
      </div>
    </header>
  )
}

export default Navbar;
