import React from "react";
import { Link } from "react-router-dom";
import TruncateString from "./TruncateString";

const ListRow = props => {
  const indexStart = 0; // Used for truncation
  const maxLength = 20; // Used for truncation
  // console.log('The List Li props: ', props)
  return (
    <>
      <tr className="tableRow">
        <td className="flexCenter flexLeft">
          <Link
            className={
              "cartPriority priority priority" + props.list.maxpriority
            }
            to={"/List/" + props.list.id}
          >
            <i className="fas fa-shopping-cart"></i>
          </Link>
          <Link
            className="oneHalfRemPadLeft listLink"
            to={"/List/" + props.list.id}
          >
            {props.list.name}
          </Link>
          <Link className="listLink" to={"/List/" + props.list.id}>
            <div className="mobile oneHalfRemPadLeft subduedRowText">
              <TruncateString
                key={props.list.id}
                indexStart={indexStart}
                maxLength={maxLength}
                initialStr={props.list.description}
              />
            </div>
            <div className="wideScreen oneHalfRemPadLeft subduedRowText">
              {props.list.description}
            </div>
          </Link>
        </td>
        <td>
          <Link to={"/List/" + props.list.id}>({props.list.itemcount})</Link>
        </td>
      </tr>
    </>
  );
};

export default ListRow;
