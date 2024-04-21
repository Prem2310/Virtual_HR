import Experience from "../components/Experience";
import Admin from "../pages/Admin";
const Home = () => {
  const isAdmin = true;
  return isAdmin | true ? <Admin /> : <Experience />;
};

export default Home;
