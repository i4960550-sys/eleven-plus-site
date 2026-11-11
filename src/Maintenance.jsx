export default function Maintenance() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
        fontFamily: "system-ui, sans-serif",
        color: "#182338",
        background: "#F6F4EF",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "12px" }}>
        ElevenPlus Scholars is currently offline
      </h1>
      <p style={{ maxWidth: "460px", lineHeight: 1.6, margin: "0 0 12px" }}>
        Our website is currently unavailable.
      </p>
      <p style={{ maxWidth: "460px", lineHeight: 1.6, margin: 0 }}>
        If you have previously purchased a practice paper and need access to
        your files, please email{" "}
        <a href="mailto:elevenpluscholars@gmail.com">
          elevenpluscholars@gmail.com
        </a>
        .
      </p>
    </div>
  );
}
