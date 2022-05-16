import { NodeModelPro } from "../../models";

export const StartNode = (props: { dataModel: NodeModelPro }) => {
  const { dataModel } = props;
  const { name, subType } = dataModel;
  // use node definition to get color, icon
  return (
    <div
      style={{
        width: 126,
        height: 36,
        padding: "0 8px",
        display: "flex",
        boxSizing: "border-box",
        alignItems: "center",
        backgroundColor: "#9AC8E2",
        borderRadius: 16,
      }}
    >
      <span>{name}</span>
    </div>
  );
};
