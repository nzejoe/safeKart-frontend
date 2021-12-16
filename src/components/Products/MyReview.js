import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import UserReview from "./UserReview";
import ReviewEditForm from "./ReviewEditForm";
import axios from "axios";

const MyReview = ({ review, handleRefresh }) => {
  const { token } = useSelector((state) => state.users);
  const [edit, setEdit] = useState(false);
  const [remove, setRemove] = useState(false);
  const [sending, setSending] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEdit = (bool) => {
    setEdit(bool);
  };

  useEffect(() => {
    const sendDeleteRequest = async () => {
      try {
        const response = await axios({
          url: `/products/delete_review/${review.id}/`,
          method: "DELETE",
          headers: {
            Authorization: `token ${token}`,
          },
        });

        if (response.status === 200) {
          setSending(false);
          setConfirmDelete(false);
          setRemove(false);
          handleRefresh();
          console.log(response.data)
        }
      } catch (error) {
        console.log({ ...error });
      }
    };

    if (confirmDelete && token) {
      setSending(true);
      sendDeleteRequest();
    }
  }, [confirmDelete, token, review, handleRefresh]);

  return (
    <div>
      {!edit && review ? (
        <div>
            <h4>My review</h4>
            <UserReview review={review} />
        </div>
      ) : (
        <ReviewEditForm
          userReview={review}
          handlePageRefresh={handleRefresh}
          handleEdit={handleEdit}
        />
      )}
      {sending && <p>Please wait...</p>}
      {!sending && !remove && !edit && (// if remove button not yet pressed
        <React.Fragment>
          <button onClick={handleEdit}>Edit review</button>
          <button onClick={() => setRemove(true)}>Remove</button>
        </React.Fragment>
      )}
      {remove && !sending && (
        <div>
          <h5>Are you sure you want to delete your review?</h5>
          <button onClick={setConfirmDelete}>Yes</button>
          <button onClick={() => setRemove(false)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MyReview;