import useDashboardStore from "@/context/dashboardStores";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, FormControl, useAlert } from "socialwell-design";
import { Wrapper } from "../addProject/style";

export default function AddDashboard({
  onClose,
  id,
  refresh,
}: {
  onClose: () => void;
  id: string | null;
  refresh: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const [form, setData] = useState({ name: "", description: "" });
  const { push } = useRouter();
  const [error, setError] = useState({ field: "", message: "" });
  const { setComponentData } = useDashboardStore();

  const { setAlert } = useAlert();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    setLoading(true);

    if (!form.name || form.name === "") {
      setLoading(false);
      setError({ field: "name", message: "Dashboard name is required!" });
      return;
    }

    setComponentData({
      title: form.name,
      description: form.description,
      componentTypes: [],
    });
    push("/dashboard/create");
    setLoading(false);
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <Wrapper className="drawer-state-opened">
      <div
        data-animate="slideLeft"
        className="content"
        onClick={e => e.stopPropagation()}
      >
        <div className="head">
          <h2>New Dashboard</h2>
        </div>

        <form>
          <FormControl
            inputType="text"
            label="Dashboard Name"
            name="name"
            value={form.name}
            onChange={e => {
              setError({ field: "", message: "" });
              setData(v => ({ ...v, name: e.target.value }));
            }}
            required
            ref={inputRef}
          />
          {error.field === "name" && (
            <span className="error">{error.message}</span>
          )}
          <br />
          <br />
          <FormControl
            inputType="textarea"
            label="Dashboard Description"
            name="description"
            value={form.description}
            onChange={e => {
              setData(v => ({ ...v, description: e.target.value }));
            }}
            placeholder="Add notes, links, instructions and other resources here."
          />

          <br />
          <div className="ctas">
            <Button
              disabled={loading}
              name="Cancel"
              type="reset"
              variant="outline"
              onClick={onClose}
            />
            <Button
              loading={loading}
              loadingIconSize="18px"
              onClick={handleSubmit}
              name="Save"
              type="button"
              variant="solid"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  );
}
