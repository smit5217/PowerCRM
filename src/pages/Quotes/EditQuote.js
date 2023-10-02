import React from "react";
import QuoteForm from "../../components/Quotes/QuoteForm";
import { useParams } from "react-router-dom";

function EditQuote() {
  const quoteId = useParams().quoteId;

  return <QuoteForm quoteId={quoteId} title="Edit Quote" />;
}

export default EditQuote;
