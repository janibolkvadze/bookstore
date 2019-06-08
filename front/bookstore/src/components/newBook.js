import React from "react";
import RemoveBook from './removeBook';


const NewBook = (props) => {

  return (
        <div>
            <div className="book" key={props.id} id={props.id}>
                <div className="bookImage">
                    <img src={props.imageUrl} width="75" alt={props.title} />
                </div>
                <div className="bookInfo">
                    <h3>{props.title}</h3>
                    {props.description}<br />
                </div>
                <div className="bookControll">
                    <RemoveBook bookId={props.id} />
                </div>
            </div>);
        </div>
  );
};

export default NewBook;