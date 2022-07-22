/** @format */

import { Button, Grid, Paper } from "@mui/material";
import type { NextPage } from "next";

const Chat: NextPage = () => {
  return (
    <Grid container>
      <Grid item>
        <Paper>
          <Button variant="contained" color="secondary">
            Button
          </Button>
          <Button variant="contained" color="secondary">
            Button
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Chat;
