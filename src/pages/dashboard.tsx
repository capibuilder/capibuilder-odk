import { Dashboard } from "@/Containers";
import ProtectedRoute from "@/utils/ProtectedRoute";

const HomePage = () => {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
};

export default HomePage;
