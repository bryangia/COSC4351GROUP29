import "./table.css";

export default function Table(props) {
  const getRow1 = (_) => {
    let chairs1 = [];
    for (var i = 0; i < Math.ceil(props.chairs / 2); i++) {
      chairs1.push(
        <span
          key={i}
          className={props.empty ? "emptyTable" : "fullTable"}
        ></span>
      );
    }
    return chairs1;
  };
  const getRow2 = (_) => {
    let chairs2 = [];
    for (var i = 0; i < Math.floor(props.chairs / 2); i++) {
      chairs2.push(
        <span
          key={i}
          className={props.empty ? "emptyTable" : "fullTable"}
        ></span>
      );
    }
    return chairs2;
  };

  return (
    <div className="tableContainer">
      <div
        className={props.empty ? "table selectableTable" : "table"}
        onClick={(_) => {
          props.empty
            ? props.available
              ? props.selectTable(props.name, props.id, props.chairs)
              : props.selectTable(props.name, props.id)
            : console.log("CANNOT Get Full Table");
        }}
      >
        <div className="tableRow">{getRow1()}</div>
        <div className="tableRow">{getRow2()}</div>

        <div className="tableName">{props.name}</div>
      </div>
    </div>
  );
}
