// src/pages/submission.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import logo from '../assets/logo.png';

function Submission() {
  const { slug } = useParams();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchSubmission() {
      const { data, error } = await supabase
        .from('candidate_submissions')
        .select('*')
        .eq('share_token', slug)
        .single();

      if (error || !data) {
        setError('Submission not found.');
        setLoading(false);
        return;
      }

      const now = new Date();
      const expiry = new Date(data.expires_at);
      if (expiry < now) {
        setError('This submission link has expired.');
        setLoading(false);
        return;
      }

      setSubmission(data);
      setLoading(false);

      // Optional: update view count
      await supabase.rpc('increment_view_count', { share_token_input: slug });
    }

    fetchSubmission();
  }, [slug]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Introvy branding */}
      <div className="flex items-center mb-6">
        <img src={logo} alt="Introvy Logo" className="h-10 mr-2" />
        <span className="text-xl font-semibold">Introvy</span>
      </div>

      <h2 className="text-2xl font-bold mb-2">Candidate Submission</h2>
      <p className="mb-1 font-semibold">Name: {submission.candidate_name}</p>
      <p className="mb-4 font-semibold">Job Title: {submission.job_title} @ {submission.company_name}</p>

      {/* Questions */}
      <h3 className="text-lg font-bold mt-6 mb-2">Questions</h3>
      <ul className="list-disc ml-5">
        {submission.questions?.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>

      {/* Video Responses */}
      <h3 className="text-lg font-bold mt-6 mb-2">Video Responses</h3>
      {submission.video_responses?.map((url, i) => (
        <div key={i} className="mb-4">
          <video src={url} controls className="w-full max-w-lg" />
        </div>
      ))}

      {/* Optional Resume */}
      {submission.resume_file_url && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Resume</h3>
          <a href={submission.resume_file_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            View Resume
          </a>
        </div>
      )}

      {/* AI Feedback */}
      {submission.ai_feedback && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">AI Feedback</h3>
          <pre className="bg-gray-100 p-3 rounded text-sm whitespace-pre-wrap">
            {JSON.stringify(submission.ai_feedback, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Submission;