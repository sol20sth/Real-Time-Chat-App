import React from "react";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";

const UserChat = ({ chat, user }) => {
  const { recipientUser } = useFetchRecipientUser(chat, user);
  console.log(recipientUser);
  return <div>UserChat</div>;
};

export default UserChat;
