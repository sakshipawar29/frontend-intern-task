import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Task Manager</h1>

      <div className="flex gap-4">
        <Link
          to="/login"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="border px-4 py-2 rounded"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;

