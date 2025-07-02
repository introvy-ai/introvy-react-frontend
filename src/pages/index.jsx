import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Introvy</h1>
      <div className="mt-4 space-y-2">
        <Link to="/post-job" className="text-blue-500 underline">Post a Job</Link><br/>
        <Link to="/apply" className="text-blue-500 underline">Apply</Link><br/>
        <Link to="/submission/test_id" className="text-blue-500 underline">View Submission</Link>
      </div>
    </div>
  );
}

export default Home;
