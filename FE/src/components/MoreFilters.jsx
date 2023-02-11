import { Box, CardContent, Typography, Grid, IconButton } from "@mui/material";
import { KeyboardArrowDown, Clear } from "@mui/icons-material";
import ExpandableMenu from "./ExpandableMenu";
import { useState, useContext } from "react";
import ContextProvider from "../hooks/ContextApi";
import { data as originalRows } from "../constants/mockGridData";

const areaStyle = {
  marginLeft: "45px",
  marginBottom: "20%",
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
};

const areaDisplayOptionStyle = {
  top: "90%",
  left: "87%",
  transform: "translate(-50%, -50%)",
};

const careStyle = {
  marginLeft: "11px",
  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
};

const MoreFilters = ({ cardText, imageStyle }) => {
  const { setRows } = useContext(ContextProvider);
  const { setCropKind } = useContext(ContextProvider);
  const { setMoreCropKinds } = useContext(ContextProvider);
  const { optionArea, setOptionArea } = useContext(ContextProvider);
  const { optionCareStatus, setOptionCareStatus } = useContext(ContextProvider);
  const { optionMoreFilters, setOptionMoreFilters } = useContext(ContextProvider);

  const [rotateArrow1, setRotateArrow1] = useState(false);
  const [rotateArrow2, setRotateArrow2] = useState(false);
  const [rotateArrow3, setRotateArrow3] = useState(false);

  const handleClearFilters = () => {
    setRows(originalRows);
    setOptionArea("הכל");
    setOptionCareStatus("הכל");
    setCropKind("");
    setOptionMoreFilters("");
    setMoreCropKinds("");
  };

  const TEST_SIZE = "14px";
  const MORE_FILTER_IDENTIFIER = "MoreFilters";

  const displayAreaTag = (
    <CardContent>
      <Box display="flex" position="relative" flexDirection="row">
        <KeyboardArrowDown
          style={{
            color: "green",
            alignSelf: "center",
            rotate: rotateArrow1 ? "180deg" : "0deg",
          }}
          sx={imageStyle}
        />
        <div>
          <Typography
            component="div"
            variant="h6"
            fontSize={TEST_SIZE}
            sx={areaStyle}
          >
            אזור
          </Typography>
          <Typography
            component="div"
            variant="h6"
            position="absolute"
            fontSize={TEST_SIZE}
            fontWeight="bold"
            sx={areaDisplayOptionStyle}
          >
            {optionArea}
          </Typography>
        </div>
      </Box>
    </CardContent>
  );

  const displayCareStatusTag = (
    <CardContent>
      <Box display="flex" flexDirection="row">
        <KeyboardArrowDown
          style={{
            color: "green",
            alignSelf: "center",
            rotate: rotateArrow2 ? "180deg" : "0deg",
          }}
          sx={imageStyle}
        />
        <div>
          <Typography
            component="div"
            variant="h6"
            display="ruby"
            fontSize="14px"
            sx={careStyle}
          >
            סטטוס טיפול
          </Typography>
          <Typography
            component="div"
            variant="h6"
            fontSize={optionCareStatus === "בטיפול מ. אזור" ? "13px" : "14px"}
            fontWeight="bold"
            sx={cardText}
          >
            {optionCareStatus}
          </Typography>
        </div>
      </Box>
    </CardContent>
  );

  const displayMoreFiltersTag = (
    <CardContent>
      <Box display="flex" flexDirection="row">
        <KeyboardArrowDown
          style={{
            color: "green",
            alignSelf: "center",
            rotate: rotateArrow3 ? "180deg" : "0deg",
          }}
          sx={imageStyle}
        />
        <div>
          <Typography
            component="div"
            variant="h6"
            display="ruby"
            fontSize="14px"
            sx={careStyle}
          >
            עוד מסננים
          </Typography>
          <Typography
            component="div"
            variant="h6"
            fontSize="13px"
            fontWeight="bold"
            sx={cardText}
          >
            {optionMoreFilters}
          </Typography>
        </div>
      </Box>
    </CardContent>
  );

  return (
    <Box display="flex" flexDirection="column">
      <Typography variant="h5" fontWeight="bold" fontSize="20px" sx={cardText}>
        עוד מסננים
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        columnGap={2}
        marginTop="3.4%"
      >
        <IconButton color="error" size="large" onClick={handleClearFilters}>
          <Clear />
        </IconButton>
        <Box display="flex" flexDirection="column">
          <ExpandableMenu
            isAdvanced="true"
            displayTag={displayMoreFiltersTag}
            setOption={setOptionMoreFilters}
            option={optionMoreFilters}
            rotateArrow={rotateArrow3}
            setRotateArrow={setRotateArrow3}
          />
        </Box>
        <Box display="flex" flexDirection="row">
          <ExpandableMenu
            identifier={MORE_FILTER_IDENTIFIER}
            items={[
              "הכל",
              "בטיפול",
              "לא בטיפול",
              "לא עדכני",
              "בטיפול רכז",
              "דורש בדיקה",
              "בטיפול מ. אזור",
            ]}
            displayTag={displayCareStatusTag}
            setOption={setOptionCareStatus}
            option={optionCareStatus}
            rotateArrow={rotateArrow2}
            setRotateArrow={setRotateArrow2}
          />
        </Box>
        <Box display="flex" flexDirection="row">
          <ExpandableMenu
            identifier={MORE_FILTER_IDENTIFIER}
            items={["הכל", "מרכז", "צפון", "דרום"]}
            displayTag={displayAreaTag}
            setOption={setOptionArea}
            option={optionArea}
            rotateArrow={rotateArrow1}
            setRotateArrow={setRotateArrow1}
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default MoreFilters;
