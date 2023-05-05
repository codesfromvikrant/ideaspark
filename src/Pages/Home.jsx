//Components
import RegisterUser from "./RegisterUser";
import LoginUser from "./LoginUser";
import Header from "../Components/Header";
// Images
import HeroImage from "../images/heroimage.png";
// Routing
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto">
        <div className="lg:max-w-5xl text-center lg:mx-auto mx-4 mt-10">
          <h3 className="text-slate-800 sm:text-4xl text-3xl sm:font-semibold font-bold">
            Ignite Your Creativity and Organize Your Ideas with Idea Spark: The
            All-In-One Notes App
          </h3>
          <p className="text-slate-700 mdtext-2xl text-lg md:my-4 my-2">
            Welcome to Idea Spark, where creativity ignites! With our
            user-friendly note-taking platform and advanced editing features,
            you can capture and develop your ideas with ease, allowing you to
            turn inspiration into reality.
          </p>
          <Link to="/signup">
            <button className="bg-blue-500 tracking-wider text-white font-semibold py-4 sm:px-16 px-6 rounded">
              Sign Up for Free
            </button>
          </Link>
          <br />
          <Link to="/login">
            <p className="text-base font-medium underline">
              Already Have an Account? Log In
            </p>
          </Link>
        </div>

        <div className="mt-10 mx-4">
          <div className="max-w-3xl mx-auto  ">
            <img src={HeroImage} className="w-full rounded-md" alt="" />
          </div>
          <div className="lg:max-w-5xl mx-auto mt-10 grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="">
              <h4 className="md:font-bold font-extrabold text-xl">
                WORK ANYWHERE
              </h4>
              <p className="text-lg">
                Keep important info handy—your notes sync automatically to all
                your devices.
              </p>
            </div>

            <div className="">
              <h4 className="md:font-bold font-extrabold text-xl">
                REMEMBER EVERYTHING
              </h4>
              <p className="text-lg">
                Make notes more useful by adding text, images, audio, scans,
                PDFs, and documents.
              </p>
            </div>

            <div className="">
              <h4 className="md:font-bold font-extrabold text-xl">
                TURN TO-DO INTO DONE
              </h4>
              <p className="text-lg">
                Bring your notes, tasks, and schedules together to get things
                done more easily.
              </p>
            </div>

            <div className="">
              <h4 className="md:font-bold font-extrabold text-xl">
                FIND THINGS FAST
              </h4>
              <p className="text-lg">
                Get what you need, when you need it with powerful, flexible
                search capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
