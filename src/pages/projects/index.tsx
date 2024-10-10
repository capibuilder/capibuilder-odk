import Projects from "@/Containers/Projects";
import ProtectedRoute from "@/utils/ProtectedRoute";

export default function Index() {
  return (
    <ProtectedRoute>
      <Projects />
    </ProtectedRoute>
  );
}
