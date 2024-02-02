import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

const adminUser = "admin@gmail.com";

function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("id");
    navigate("/");
  };

  return (
    <>
      <nav className="bg-navbarColor text-navText border-b-2 border-violet-950 text-2xl">
        <div className="px-2 lg:px-40 mx-auto">
          <div className="flex justify-between">
            <div className="flex space-x-8">
              <div className="flex items-center py-5 px-1">
                <svg
                  className="w-8 h-8"
                  fill="#d0ecfc"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 56.781 56.78"
                  xmlSpace="preserve"
                  stroke="#d0ecfc"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <g>
                      {" "}
                      <g>
                        {" "}
                        <path d="M30.467,45.645c0.38-4.558-4.177-6.075-4.177-6.075l-13.989-4.338c-0.715-0.449-1.496-0.7-2.316-0.717L9.964,34.51v0.003 c-0.021,0-0.042-0.003-0.063-0.003c-3.459,0-6.265,4.249-6.265,9.488c0,5.243,2.806,9.493,6.265,9.493 c0.022,0,0.042-0.005,0.063-0.005v0.005l0.103-0.014c0.232-0.009,0.46-0.038,0.686-0.085l15.538-1.928 C26.291,51.465,30.086,50.199,30.467,45.645z M9.902,50.255c-2.28,0-4.128-2.802-4.128-6.257s1.848-6.256,4.128-6.256 s4.129,2.802,4.129,6.256S12.182,50.255,9.902,50.255z"></path>{" "}
                        <path d="M17.064,16.537c0,8.781,3.898,15.962,8.828,16.539c-3.074-2.511-5.146-8.791-5.146-16.539 C20.746,8.79,22.82,2.508,25.893,0C20.962,0.574,17.064,7.756,17.064,16.537z"></path>{" "}
                        <path d="M35.491,10.449C34.453,4.33,31.914,0,28.939,0c-3.896,0-7.056,7.423-7.056,16.578c0,9.157,3.16,16.58,7.056,16.58 c2.429,0,4.57-2.883,5.838-7.271c1.332,4.785,4.047,8.173,7.238,8.545c-2.826-2.309-4.734-8.085-4.734-15.21 S39.189,6.318,42.015,4.01C39.316,4.323,36.962,6.8,35.491,10.449z M29.226,21.226c-0.99,0-1.791-1.924-1.791-4.298 s0.801-4.297,1.791-4.297c0.989,0,1.791,1.923,1.791,4.297S30.215,21.226,29.226,21.226z"></path>{" "}
                        <path d="M44.819,34.508c3.583,0,6.488-6.829,6.488-15.25c0-8.42-2.905-15.25-6.488-15.25c-3.585,0-6.49,6.83-6.49,15.25 C38.329,27.679,41.236,34.508,44.819,34.508z M44.819,15.583c0.989,0,1.79,1.923,1.79,4.296c0,2.374-0.801,4.298-1.79,4.298 c-0.99,0-1.79-1.924-1.79-4.298C43.029,17.506,43.829,15.583,44.819,15.583z"></path>{" "}
                        <path d="M53.144,37.418l-19.238-2.91H18.847v1.275l7.537,2.336c1.999,0.667,5.618,3.107,5.24,7.651 c-0.456,5.49-5.015,7.071-5.21,7.136c-0.095,0.031-0.194,0.055-0.293,0.066l-7.274,0.901v2.906l14.554-0.632l19.743,0.632V37.418z M20.094,55.76c-0.289,0-0.523-0.235-0.523-0.523c0-0.289,0.234-0.524,0.523-0.524s0.523,0.235,0.523,0.524 S20.382,55.76,20.094,55.76z M32.331,55.236c-0.288,0-0.523-0.234-0.523-0.524c0-0.288,0.235-0.522,0.523-0.522 s0.521,0.234,0.521,0.522C32.854,55.002,32.619,55.236,32.331,55.236z M32.331,36.912c-0.288,0-0.523-0.235-0.523-0.523 s0.235-0.523,0.523-0.523s0.521,0.235,0.521,0.523S32.619,36.912,32.331,36.912z"></path>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <span className="font-bold ml-1">Movies-Subscriptions</span>
              </div>
              <div className="hidden lg:flex ites-center space-x-2">
                <div className="py-5 px-1 ">
                  <Link
                    className="py-3 px-3 hover:bg-hoverBar"
                    to={`movies/all`}
                  >
                    Movies
                  </Link>
                </div>
                <div className="py-5 px-1">
                  <Link
                    className="py-3 px-3 hover:bg-hoverBar"
                    to={`subscriptions/all`}
                  >
                    Subscriptions
                  </Link>
                </div>
                <div className="py-5 px-1">
                  {sessionStorage["userName"] === adminUser && (
                    <Link
                      className="py-3 px-3 hover:bg-hoverBar"
                      to={`users/all`}
                    >
                      Users Management
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-1">
              <div className="py-5 px-3">{sessionStorage["userName"]}</div>
              <div
                className="py-2 px-3 bg-yellow-500 cursor-pointer hover:bg-yellow-400 text-deepPurple"
                onClick={logout}
              >
                Logout
              </div>
            </div>

            {/*Mobile button*/}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/*Mobile Menu*/}
        {showMobileMenu && (
          <div className="px-4 lg:hidden">
            <Link
              className="block py-2 px-4 text-base hover:bg-hoverBar"
              to={`movies/all`}
            >
              Movies
            </Link>
            <Link
              className="block py-2 px-4 text-base hover:bg-hoverBar"
              to={`subscriptions/all`}
            >
              Subscriptions
            </Link>
            {sessionStorage["userName"] === adminUser && (
              <Link
                className="block py-2 px-4 text-base hover:bg-hoverBar"
                to={`users/all`}
              >
                Users Management
              </Link>
            )}

            <div
              className="block py-2 px-4 text-base cursor-pointer hover:bg-hoverBar"
              onClick={logout}
            >
              Logout
            </div>
          </div>
        )}
      </nav>
      <Outlet></Outlet>
    </>
  );
}

export default Navbar;
