import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpImage from "../assets/images/signup.png";

export default function SignUp() {
  const URL = "http://localhost:3000";
  const navigate = useNavigate();
  const firstNameRef = useRef();
  const emailRef = useRef();
  const roleRef = useRef();
  const phoneRef = useRef();
  const genderRef = useRef();
  const passwordRef = useRef();

  async function completeSignup() {
    const userData = {
      Name: firstNameRef.current.value,
      email: emailRef.current.value,
      role: roleRef.current.value,
      phone: phoneRef.current.value,
      gender: genderRef.current.value,
      password: passwordRef.current.value
    };

    try {
      const response = await fetch(`${URL}/api/v1/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        // Signup successful
        navigate("/login");
      } else {
        // Signup failed
        const errorMessage = await response.text();
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Error signing up. Please try again later.");
    }
  }

  return (
    <section className="grid grid-cols-2 h-screen font-inter">
      <main className="p-16">
        <h1 className="font-bricolage text-4xl font-bold">Sign Up</h1>
        <p className="text-sm opacity-40 mt-1">
          Already have an account?{" "}
          <span
            className="underline cursor-pointer"
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </span>
        </p>
        <div className="mt-4 flex gap-10">
          <div>
            <label htmlFor="" className="opacity-70">
              Name
            </label>
            <br />
            <input
              type="text"
              className="bg-transparent border-2 border-[#52525c] rounded-md p-2"
              ref={firstNameRef}
            />
          </div>
          <div>
            <label htmlFor="" className="opacity-70">
              Email
            </label>
            <br />
            <input
              type="email"
              className="bg-transparent border-2 border-[#52525c] rounded-md p-2 "
              ref={emailRef}
            />
          </div>
        </div>
        <div className="mt-8 flex gap-10">
          <div>
            <label htmlFor="" className="opacity-70">
              Role
            </label>
            <br />
            <input
              type="text"
              className="bg-transparent border-2 border-[#52525c] rounded-md p-2 "
              ref={roleRef}
            />
          </div>
          <div>
            <label htmlFor="" className="opacity-70">
              Phone
            </label>
            <br />
            <input
              type="number"
              className="bg-transparent border-2 border-[#52525c] rounded-md p-2 "
              ref={phoneRef}
            />
          </div>
        </div>

        <div className="mt-8 flex gap-10">
          <div className="flex">
            <div>
              <label htmlFor="" className="opacity-70">
                Gender
              </label>
              <br />
              <input
                type="text"
                className="bg-transparent border-2 border-[#52525c] rounded-md p-2 "
                ref={genderRef}
              />
            </div>

            <div className=" flex gap-10">
              <div>
                <label htmlFor="" className="opacity-70">
                  Password
                </label>
                <br />
                <input
                  type="password"
                  className="bg-transparent border-2 border-[#52525c] rounded-md p-2 "
                  ref={passwordRef}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={completeSignup}
          className="text-lg bg-[#1569cb] font-inter py-3 rounded-full text-center cursor-pointer hover:opacity-80 transition-opacity w-[75%] mt-4"
        >
          Sign Up
        </button>
      </main>
      <img
        src={SignUpImage}
        alt="Sign Up Image"
        className="h-[95vh] w-[95vw]"
      />
      <ToastContainer />
    </section>
  );
}
