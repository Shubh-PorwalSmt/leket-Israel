import { Grid, Typography } from "@mui/material";
import { ThumbDownOffAlt, ThumbUpOffAlt } from '@mui/icons-material';
import ToggleLike from "../ToggleLike";

const ValidAttractivness = ({ editableData, updateEditableData, disable }) => {
  return (
    <>
        <Typography
          variant="div"
          component="h6"
          color="grey"
          marginBottom={0.2}
          sx={{
            fontSize: '12px',
            fontWeight: 'bold'
          }}>
          ?תואם את השטח
        </Typography>
        <Grid display="flex" flexDirection="row" justifyContent="space-between">
          <ToggleLike
            checked={!editableData["CheckedAttractivness"]}
            onToggle={e => updateEditableData("CheckedAttractivness", false)}
            icon={ThumbUpOffAlt}
            disable={disable}>
            <ThumbDownOffAlt sx={{ color: "red" }} />
          </ToggleLike>
          <ToggleLike
            checked={editableData["CheckedAttractivness"]}
            onToggle={e => updateEditableData("CheckedAttractivness", true)}
            icon={ThumbDownOffAlt}
            disable={disable}>
            <ThumbUpOffAlt sx={{ color: "green" }} />
          </ToggleLike>
        </Grid>
    </>
  )
}

export default ValidAttractivness;
