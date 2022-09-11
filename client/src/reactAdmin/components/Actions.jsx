import React from "react";

// ----------------------------------------

export default function Actions({ label, ...props }) {
  const styles = { display: "flex", flexDirection: "row" };
  return (
    <div style={styles}>
      {React.Children.map(props.children, (c) => {
        if (c) return React.cloneElement(c, props);
      })}
    </div>
  );
}
