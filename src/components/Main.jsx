import { COLORS } from "../constants/color";

function Main({children}) {

  return (
    <main
      style={{
        backgroundColor: COLORS.background,
        minHeight: "calc(100vh - 200px)",
        paddingTop: "3rem",
        paddingBottom: "3rem",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="container-lg" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <div className="row g-4">
          {children}
        </div>
      </div>
    </main>
  );
}
export default Main;
 