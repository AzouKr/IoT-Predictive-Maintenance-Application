import Type from "./Type/Type";
import Colors from "./Colors/Colors";
import "./SideM.css";

const SideM = ({ setSelectedType, setSelectedColor }) => {
  return (
    <>
      <section className="sideM">
        <div className="logo-container">
          <h1>Filter</h1>
        </div>
        <Type setSelectedType={setSelectedType} />
        <Colors setSelectedColor={setSelectedColor} />
      </section>
    </>
  );
};

export default SideM;
