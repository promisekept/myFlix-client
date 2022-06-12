import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Director = ({ movies }) => {
  //make director name match the first movie he's in.  Then display his bio
  const navigate = useNavigate();
  console.log(movies);
  let params = useParams();
  return (
    <>
      <div>{params.name}</div>
      <Button variant="link" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </>
  );
};

export default Director;
