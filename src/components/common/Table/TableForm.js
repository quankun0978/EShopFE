export const renderBody = (props, columns) => {
  return (
    <tr className={props.className}>
      {columns.map((item, idx) => {
        if (item.visible) {
          return props.children[idx];
        }
      })}
    </tr>
  );
};

export const renderHeader = (props, columns) => {
  return (
    <tr>
      {columns.map((item, idx) => {
        if (item.visible) return props.children[idx];
      })}
      ;
    </tr>
  );
};
