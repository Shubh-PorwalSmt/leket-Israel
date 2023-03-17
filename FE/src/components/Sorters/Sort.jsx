import { Box, Typography, CardContent } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import ExpandableMenu from "../Filters/ExpandableMenu";
import { useState, useContext } from "react";
import ContextProvider from "../../hooks/ContextApi";
import { sortOptions } from "../../constants/sortSelection";

const Sort = ({ cardText }) => {
  const { sortMethod, setSortMethod } = useContext(ContextProvider);
  
  const [rotateArrow, setRotateArrow] = useState(false);

  const displayTag = (
    <CardContent>
      <Box display="flex" flexDirection="row">
        <KeyboardArrowDown
          style={{
            color: "green",
            alignSelf: "center",
            rotate: rotateArrow ? "180deg" : "0deg",
          }}
        />
        <div>
          <Typography
            component="div"
            variant="h6"
            display="ruby"
            fontSize="16px"
            sx={cardText}
          >
            מסודר לפי
          </Typography>
          <Typography
            component="div"
            variant="h6"
            fontSize="14px"
            fontWeight="bold"
            sx={cardText}
          >
            {sortMethod}
          </Typography>
        </div>
      </Box>
    </CardContent>
  );

  return (
    <Box display="flex" flexDirection="column" marginTop="0.4%">
      <Typography
        variant="h5"
        fontSize="20px"
        fontWeight="bold"
        marginBottom="10%"
        sx={cardText}
      >
        מיון
      </Typography>
      <ExpandableMenu
        items={sortOptions}
        displayTag={displayTag}
        setOption={setSortMethod}
        option={sortMethod}
        rotateArrow={rotateArrow}
        setRotateArrow={setRotateArrow}
      />
    </Box>
  );
};

export default Sort;
