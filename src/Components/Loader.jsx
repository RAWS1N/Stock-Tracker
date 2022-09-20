import React from "react";
import { Dna } from "react-loader-spinner";

function Loader() {
    const styles = {
        height:"100vh",
        width:"100vw",

    }


  return (
    <div style={styles} className="container d-flex justify-content-center align-items-center">
      <Dna
        visible={true}
        height="180"
        width="180"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
}

export default Loader;
