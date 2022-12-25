import { Grid, Stack, IconButton, Drawer, Box } from "@mui/material";
import { Recommend, Settings } from '@mui/icons-material';

const Sidebar = () => {
  const drawerWidth    = 80,
        boxButtonWidth = 70;
  
  const button = {
    color: "white",
    justifySelf: 'flex-start'
  }

  return (
    <>
      <Drawer
        elevation={0}
        sx={{
          width: drawerWidth,
          flexShrink: 0
        }}
        variant="permanent"
        anchor="right"
      >
        <Box
          component="img"
          alt=""
          src="https://www.w3schools.com/images/lamp.jpg"
        />
        <Stack
          spacing={1.5}
          marginTop='30%'
          justifyContent="space-between"
          alignItems="center"
          height='100%'
          width={boxButtonWidth}
          backgroundColor='#488856'
          borderRadius='20px 0px 0px 0px'
        >
          <br />
          <br />
          <Stack spacing={1.5} justifyContent="flex-start">
            <IconButton>
              <Recommend sx={button} />
            </IconButton>
            <IconButton>
              <Recommend sx={button} />
            </IconButton>
            <IconButton>
              <Recommend sx={button} />
            </IconButton>
          </Stack>
          <Grid item>
            <IconButton>
              <Settings sx={button} />
            </IconButton>
          </Grid>
        </Stack>
      </Drawer>
    </>
  )
}

export default Sidebar;
