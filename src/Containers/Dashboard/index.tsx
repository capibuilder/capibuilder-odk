import Head from "next/head";
import DashboardCard from "./components/DashboardCard";
import RecentSurvey from "./components/RecentSurvey";

const Home = () => {
  return (
    <main>
      <Head>
        <title>Home</title>
      </Head>
      <DashboardCard />
      <RecentSurvey />
    </main>
  );
};

export default Home;
