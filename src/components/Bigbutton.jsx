import React from "react";

function Bigbutton(props) {
  return (
    <>
      <button class="custom-btn btn-12"><span>Click!</span><span>{props.buttonDisplay}</span></button>
    </>
  );
}
export default Bigbutton;
