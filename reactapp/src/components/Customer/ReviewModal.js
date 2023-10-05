import React, { useState } from "react";
import {
  Rating,
  Dialog,
  Button,
  TextField,
} from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";

const ReviewModal = ({ reviewOpen, handleClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    handleClose();
  };

  return (
    <Dialog
      open={reviewOpen}
      onClose={handleClose}
      fullWidth
      maxHeight="500px"
    >
      <DialogTitle>Rate your experience</DialogTitle>
      <DialogContent>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, value) => setRating(value)}
          maxRating={5}
          size="large"
          style={{ marginTop: "10px" }}
        />
        <TextField
          label="Comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          margin="normal"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          color="primary"
          onClick={handleSubmit}
          disabled={rating === 0}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewModal;
