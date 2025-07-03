// src/pages/apply.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function Apply() {
  const { jobId } = useParams(); // assumes route is /apply/:jobId
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      setMessage('Please upload a video file.');
      return;
    }

    setSubmitting(true);

    const fileExt = videoFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `submissions/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, videoFile);

    if (uploadError) {
      setMessage(`Upload failed: ${uploadError.message}`);
      setSubmitting(false);
      return;
    }

    setMessage('Video submitted successfully!');
    setSubmitting(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Apply to Job {jobId}</h1>
      <input type="file" accept="video/*" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {submitting ? 'Submitting...' : 'Submit Video'}
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
