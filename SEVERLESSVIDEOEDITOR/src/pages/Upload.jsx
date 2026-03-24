import UploadBox from "../components/UploadBox";

export default function Upload() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <UploadBox />
    </div>
  );
}
