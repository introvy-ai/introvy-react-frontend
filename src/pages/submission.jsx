import React from 'react';
import { useParams } from 'react-router-dom';

function SubmissionView() {
  const { id } = useParams();
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Submission View</h1>
      <p>Submission ID: {id}</p>
    </div>
  );
}

export default SubmissionView;
