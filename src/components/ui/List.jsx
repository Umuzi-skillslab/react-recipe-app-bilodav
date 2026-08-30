import { useState } from "react";

function List({
  list = [],
  ordered = false,
  checked = false,
  listStyleType,
  listStylePosition = "inside",
}) {
  const [checkedList, setCheckedList] = useState(new Set([]));

  const toggleChecked = (id) => {
    setCheckedList((prev) => {
      const nextArr = new Set(prev);
      if (nextArr.has(id)) {
        nextArr.delete(id);
      } else {
        nextArr.add(id);
      }
      return nextArr;
    });
  };

  const inputStyles = {
    listStyleType: listStyleType,
    listStylePosition: listStylePosition,
  };

  const listStyles = {
    marginBottom: "10px",
    cursor: `${checked ? "pointer" : "default"}`,
  };

  const items = list.map((item, index) => (
    <li
      key={index}
      style={{
        ...listStyles,
        textDecoration:
          ordered && checkedList.has(index) ? "line-through" : "none",
      }}
      onClick={checked ? () => toggleChecked(index) : undefined}
    >
      {item}
    </li>
  ));
  return ordered ? (
    <ol style={inputStyles}>{items}</ol>
  ) : (
    <ul style={inputStyles}>{items}</ul>
  );
}

export default List;
