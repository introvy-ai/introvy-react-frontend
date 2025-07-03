// src/pages/apply.jsx
import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

function Apply() {
  const [email, setEmail] = useState('');
  const [video, setVideo] = useState(null);
  const [message, setMessage] = useState('');

  const handleVideoUpload = async () => {
    if (!video) return null;

    const fileExt = video.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `videos/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('candidate-submissions')
      .upload(filePath, video);

    if (uploadError) {
      setMessage('Video upload failed.');
      return null;
    }

    const { data } = supabase.storage
      .from('candidate-submissions')
      .getPublicUrl(filePath);

    return data?.publicUrl || null;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('Uploading...');

    const videoUrl = await handleVideoUpload();

    const { error } = await supabase.from('candidate_submissions').insert([
      {
        email,
        video_url: videoUrl,
      },
    ]);

    if (error) {
      setMessage('Submission failed.');
    } else {
      setMessage('Submitted successfully!');
      setEmail('');
      setVideo(null);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit Your Application</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border mb-3"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <input
          type="file"
          accept="video/*"
          className="w-full p-2 border mb-3"
          onChange={e => setVideo(e.target.files[0])}
          required
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
        {message && <p className="mt-3">{message}</p>}
      </form>
    </div>
  );
}

export default Apply;
