import { useToken } from "@/hooks";
import { odkAxios } from "@/utils/useAxios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, FormControl, useAlert } from "socialwell-design";
import { Wrapper } from "./style";

export default function AddProject({
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
  const { token } = useToken();
  const { push } = useRouter();
  const [Error, setError] = useState({ feild: "", message: "" });

  const { setAlert } = useAlert();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    setLoading(true);

    if (!form.name || form.name === "") {
      setLoading(false);
      setError({ feild: "name", message: "Project name is required!" });
      return;
    }
    if (id) {
      odkAxios
        .patch(
          `/v1/projects/${id}`,
          { ...form },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(() => {
          refresh();
          onClose();
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      odkAxios
        .post(
          "/v1/projects",
          { ...form },
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then(s => push(`/projects/${s.data.id}/survey`))
        .catch(v => {
          if (v.response.data.code && v.response.data.code === 403.1) {
            setAlert({
              show: true,
              state: "error",
              text: "Your account has no permission to perform this action.",
              title: "",
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (!id) return;
    odkAxios
      .get(`/v1/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        setData({ description: data.description || "", name: data.name });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <Wrapper className="drawer-state-opened">
      <div
        data-animate="slideLeft"
        className="content"
        onClick={e => e.stopPropagation()}
      >
        <div className="head">
          <h2>New Project</h2>
        </div>

        <form>
          <FormControl
            inputType="text"
            label="Project Name"
            name="name"
            value={form.name}
            onChange={e => {
              setError({ feild: "", message: "" });
              setData(v => ({ ...v, name: e.target.value }));
            }}
            required
            ref={inputRef}
          />
          {Error.feild === "name" && (
            <span className="error">{Error.message}</span>
          )}
          <br />
          <br />
          <FormControl
            inputType="textarea"
            label="Project Description"
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
              type="submit"
              variant="solid"
            />
          </div>
        </form>
      </div>
    </Wrapper>
  );
}
