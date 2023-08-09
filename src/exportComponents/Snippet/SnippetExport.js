import { Grid } from "../Grid";
import parse from "html-react-parser";
import React, { useEffect } from "react";
import { RESOLVERS, generateJSX } from "../../craftNodesProcessor";

export const SnippetExport = ({ props, parentStyle, style, ...rest }) => {
  // {{{ snippet "Name" }}}

  const json = JSON.parse(props.content_json);
  console.log(json);
  const { jsx } = generateJSX(json, 15000);

  console.log(jsx);

  return (
    <Grid item xs={12} style={parentStyle}>
      {jsx}
    </Grid>
  );
};
