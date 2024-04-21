import { FaGithub } from "react-icons/fa6";
import Graph from "../assets/Graph.svg";
import Grad from "../assets/Hero Shape.svg";
import Gears2 from "../assets/Gears2.svg";
import Robot from "../assets/Robot.svg";
import { useNavigate } from "react-router";
import HomeNavbar from "../components/HomeNavbar";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="font-bricolage bg-black">
      <HomeNavbar />
      <hr className="border-0 border-t-2 border-[#0f0f11]" />
      <div className="flex flex-col items-center gap-7 mt-16">
        <div className="bg-[#27272a] text-white flex text-xs w-fit px-5 py-2 rounded-full items-center gap-2 border-2 border-[#3f3f46] cursor-pointer hover:border-[#a8a8a8] transition-colors">
          Virtual HR
          <FaGithub></FaGithub>
        </div>
        <div className="text-white text-6xl font-medium">
          Elevating Conversations, Evaluating Talent
        </div>
        <div className="font-inter text-white mt-5">
          Revolutionizing HR Interviews: Empowering Managers, Guiding
          Candidates, Shaping Futures.
        </div>
        <div className="font-inter flex gap-10 z-10 mt-10   ">
          <div className="bg-[#27272a] text-xl w-fit px-8 py-3 rounded-md border-2 border-[#3f3f46] text-white cursor-pointer hover:border-[#a8a8a8] transition-colors">
            Features
          </div>
          <div
            className="bg-[#166fd8] text-xl w-fit px-8 py-3 rounded-md cursor-pointer  text-white hover:bg-blue-500 transition-colors"
            onClick={() => navigate("/signup")}
          >
            Lets Begin
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-20">
        <img
          src={Grad}
          className="absolute z-0 w-screen translate-y-20 opacity-20"
          alt=""
        />
      </div>
      <div className="text-white flex flex-col items-center justify-center mt-44 gap-7">
        <div>
          <div className="text-6xl font-medium ">
            {" "}
            A New Era of Productivity{" "}
          </div>
          <div className="text-6xl font-medium text-center"> begins</div>
        </div>
        <div className="text-base font-inter">
          {" "}
          Empowering Conversations, Shaping Careers: Redefining HR Interviews
          with AI.
        </div>
      </div>
      <div className="text-white flex mt-24 pr-12 pb-52">
        <div className="flex flex-col gap-12">
          <div className="flex px-10 gap-10">
            <div className="bg-[#0f0f11] flex flex-col gap-6 rounded-xl p-5 pr-10 w-5/12 border-2 border-[#52525c]">
              <div className="w-fit">
                <img src={Graph} className="h-12" alt="" />
              </div>
              <div className="text-3xl font-semibold">
                Interactive Conversations
              </div>
              <div className="font-inter text-base font-light opacity-80">
                The project enables interactive voice-based conversations
                between HR managers and job seekers, facilitating a natural and
                engaging interview experience.
              </div>
            </div>
            <div className="bg-[#0f0f11] flex flex-col gap-6 rounded-xl p-5 pb-14 pr-10 w-7/12 border-2 border-[#52525c]">
              <div className="w-fit">
                <img src={Gears2} className="h-12" alt="" />
              </div>
              <div>
                <div className="text-3xl font-semibold">
                  Speech-to-Text Integration
                </div>
                <div className="text-3xl font-semibold">Models</div>
              </div>
              <div className="font-inter text-base font-light opacity-80">
                Utilizing speech-to-text technology, the project transcribes the
                spoken responses of job seekers into text, making it easy to
                record and analyze their answers.
              </div>
            </div>
          </div>

          <div className="flex px-10 gap-10">
            <div className="bg-[#0f0f11] flex flex-col gap-6 rounded-xl p-5 pr-10 w-7/12 border-2 border-[#52525c]">
              <div className="w-fit">
                <img src={Graph} className="h-10" alt="" />
              </div>
              <div className="text-3xl font-semibold">Export Functionality</div>
              <div className="font-inter text-base font-light opacity-80">
                Interview transcripts can be exported in CSV or Excel format for
                further analysis and record-keeping purposes.
              </div>
            </div>
            <div className="bg-[#0f0f11] flex flex-col gap-6 rounded-xl p-5 pr-10 w-5/12 border-2 border-[#52525c]">
              <div className="w-fit">
                <img src={Graph} className="h-10" alt="" />
              </div>
              <div className="text-3xl font-semibold">
                Realistic Avatar Behavior
              </div>
              <div className="font-inter text-base font-light opacity-80">
                The virtual HR managers avatar is designed to exhibit realistic
                lip syncing and facial expressions, enhancing the authenticity
                of the interaction.
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#0f0f11] w-4/6 flex flex-col gap-6 rounded-xl p-5 pr-10 border-2 border-[#52525c]">
          <div className="w-fit">
            <img src={Robot} alt="" />
          </div>
          <div className="text-3xl font-semibold">AI Chatbot Integration</div>
          <div className="font-inter text-base font-light opacity-80">
            The project integrates an AI chatbot component that assists both HR
            managers and job seekers throughout the interview process. The
            chatbot can provide additional information, clarification on
            questions, and guidance on interview best practices. By
            incorporating an AI chatbot, the project enhances user experience by
            offering real-time support and assistance, ensuring a smoother and
            more productive interview interaction. The chatbot can also leverage
            natural language processing (NLP) to understand and respond to user
            queries effectively, further enriching the conversational
            experience.
          </div>
        </div>
      </div>
    </div>
  );
}
