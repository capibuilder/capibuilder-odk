import TemplateComponent from "@/components/Templates";
const TemplateContainer = () => {
  return (
    <section
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        margin: "120px 0",
      }}
    >
      <div style={{ display: "flex", gap: "80px" }}>
        <div style={{ position: "relative" }}>
          <img
            src="assets/svg/dots.svg"
            style={{
              position: "absolute",
              zIndex: "-1",
              top: "-60px",
              left: "-60px",
            }}
          />
          <TemplateComponent
            templateName="Translation"
            title="Translate forms automatically"
            text="Auto-translation fast tracks your data collection projects, giving you a near accurate and working version of forms in different languages."
          />
        </div>
        <div style={{ position: "relative" }}>
          <TemplateComponent
            templateName="Templates"
            title="Build forms using templates"
            text="Instead of XLS, fast track your form building from an existing template from public or private template libraries."
          />
          <img
            src="assets/svg/dots.svg"
            style={{
              position: "absolute",
              zIndex: "-1",
              bottom: "-60px",
              left: "350px",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TemplateContainer;
