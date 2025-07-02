import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/index.jsx';
import PostJob from './pages/post-job.jsx';
import Apply from './pages/apply.jsx';
import SubmissionView from './pages/submission.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post-job" element={<PostJob />} />
      <Route path="/apply" element={<Apply />} />
      <Route path="/submission/:id" element={<SubmissionView />} />
    </Routes>
  </Router>
);
