import { useNavigate, Outlet } from "react-router-dom";

function Subs() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-center space-x-4 mt-6 text-lg">
        <span className="text-2xl font-bold">Subscriptions</span>
        <span>|</span>
        <button className="hover:text-sky-100" onClick={() => navigate("all")}>
          All Members
        </button>
        <span>|</span>
        <button className="hover:text-sky-100" onClick={() => navigate("new")}>
          Add Member
        </button>
      </div>

      <Outlet></Outlet>
    </>
  );
}

export default Subs;
