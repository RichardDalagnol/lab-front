import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";

interface ToolBarProps {
  handleAddAntimicrobial: () => void;
}


const CustomToolbar: React.FC<ToolBarProps> = ({ handleAddAntimicrobial }) => {
  return (
    <React.Fragment>
      <Tooltip title={"Cadastrar"}>
        <IconButton onClick={handleAddAntimicrobial}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );
}

export default CustomToolbar;
