export default function Navbar({ handleLogout }) {
  return (
    <div className="w-full bg-blue-700 text-white flex justify-between items-center px-8 py-4 shadow">
      {/* LOGO */}
      <h1 className="text-2xl font-bold">
        Reception Dashboard
      </h1>

      {/* LOGOUT */}
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg"
      >
        Logout
      </button>
    </div>
  );
}