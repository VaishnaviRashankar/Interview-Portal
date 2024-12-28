// InterviewButtons.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import '../style/InterviewButtons.css'; // Import custom styles

const InterviewButtons = ({ onStartInterview, onLeaveInterview }) => {
  return (
    <div className="interview-buttons">
      <button className="start-button" onClick={onStartInterview}>
        <FontAwesomeIcon icon={faVideo} /> Start Interview
      </button>

      <button className="leave-button" onClick={onLeaveInterview}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Leave Interview
      </button>
    </div>
  );
};

export default InterviewButtons;
