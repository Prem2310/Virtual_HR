// create hero page

import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Hero</h1>
      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Signup
      </button>
    </div>
  );
}
