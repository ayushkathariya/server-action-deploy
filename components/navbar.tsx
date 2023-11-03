import LogoutButton from "./logout-button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 flex justify-between container mt-1">
      <h1 className="border rounded-lg px-2 py-1">To Do List</h1>
      <div>
        <LogoutButton />
      </div>
    </nav>
  );
}
