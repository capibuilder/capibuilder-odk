import styled from "styled-components";

export default function Input({ Audittype }: { Audittype: "Text" | "Audio" }) {
  return (
    <Wrapper>
      <span className="help-text">
        {Audittype} is enabled. Including this field type anywhere in your form
        will record additional data while the form is being filled out
        <br />
        <br />
        {Audittype === "Text" ? (
          <>
            It will keep track of user activity for each step taken by
            collecting
            <b> timestamp</b> , <b>latitude</b> , <b>longitude</b> ,{" "}
            <b>accuracy</b> etc.
          </>
        ) : (
          <>
            It will record <b>audio</b> in the background while filling up the
            form.
          </>
        )}
      </span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: auto;

  span.help-text {
    display: block;
    line-height: 30px;
    color: grey;
    font-weight: 500;

    b {
      text-transform: capitalize;
    }
  }
`;
