import { AddTags } from "@/Containers";
import ProtectedRoute from "@/utils/ProtectedRoute";

const AddTagsView = () => {
  return (
    <ProtectedRoute>
      <AddTags />;
    </ProtectedRoute>
  );
};

export default AddTagsView;
