import React from "react";
import GroupQuoteForm from "../../components/Group Quote/GroupQuoteForm";
import { useParams } from "react-router-dom";

function EditGroupQuote() {
  const quoteId = useParams().quoteId;
  return (
    <GroupQuoteForm quoteId={quoteId} title="Edit Group Quote" isEdit={true} />
  );
}

export default EditGroupQuote;
