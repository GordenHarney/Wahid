import { UserAuth } from "../context/AuthContext";

const Navbar = () => {

  const {currentUser, logout} = UserAuth();
  
  const handleLogOut = async () => {
    try{
      await logout();
    } catch(error){
      console.log(error)
    }
  }

  return (
    <div className="navbar fixed z-10 bg-neutral text-neutral-content">
      <div className="containerWrap flex justify-between">
        <a href="/" className="btn btn-ghost normal-case text-xl">InstantChat</a>
        {currentUser? <button onClick={handleLogOut}>Logout</button> : ""}
     </div>
    </div>
  );
};

export default Navbar;
