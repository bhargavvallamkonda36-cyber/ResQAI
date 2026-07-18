import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">

        <h1 className="text-3xl font-bold">
          ResQAI
        </h1>

        <div className="flex gap-6">

          <Link
            to="/"
            className="hover:text-yellow-300 transition"
          >
            Home
          </Link>

          <Link
            to="/map"
            className="hover:text-yellow-300 transition"
          >
            Disaster Map
          </Link>

          <Link
            to="/chat"
            className="hover:text-yellow-300 transition"
          >
            AI Chat
          </Link>

          <Link
            to="/news"
            className="hover:text-yellow-300 transition"
          >
            News
          </Link>

          <Link
            to="/sos"
            className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
          >
            SOS
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;