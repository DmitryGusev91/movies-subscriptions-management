import { useNavigate, Outlet } from "react-router-dom";

function Users() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center space-x-4 mt-6 text-lg">
        <span className="text-2xl font-bold">Users</span>
        <span>|</span>
        <button className="hover:text-sky-100" onClick={() => navigate("all")}>
          All Users
        </button>
        <span>|</span>
        <button className="hover:text-sky-100" onClick={() => navigate("new")}>
          Add User
        </button>
      </div>
      <Outlet></Outlet>
    </>
  );
}

export default Users;
