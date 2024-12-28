// // InterviewList.js
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
// import InterviewButtons from './InterviewButtons';
// import '../style/InterviewList.css';

// const InterviewList = () => {
//   const [interviews, setInterviews] = useState([]);
//   const [editingInterview, setEditingInterview] = useState(null);
//   const [newInterview, setNewInterview] = useState({ title: '', start_time: '', end_time: '', participants: [] });
//   const [showModal, setShowModal] = useState(false);
//   const [jitsiApi, setJitsiApi] = useState(null);
//   const [allParticipants, setAllParticipants] = useState([]);

//   useEffect(() => {
//     fetchInterviews();
//     fetchParticipants();
//   }, []);

//   const fetchInterviews = () => {
//     axios.get('http://localhost:8000/api/interviews/')
//       .then(response => setInterviews(response.data))
//       .catch(error => console.error("Error fetching interviews:", error));
//   };

//   const fetchParticipants = () => {
//     axios.get('http://localhost:8000/api/participants/')
//       .then(response => setAllParticipants(response.data))
//       .catch(error => console.error("Error fetching participants:", error));
//   };

//   const handleDelete = (id) => {
//     axios.delete(`http://localhost:8000/api/interviews/${id}/`)
//       .then(() => fetchInterviews())
//       .catch(error => console.error("Error deleting interview:", error));
//   };

//   const handleEdit = (interview) => {
//     setEditingInterview(interview);
//     setShowModal(true);
//   };

//   const handleAdd = () => {
//     setEditingInterview(null);
//     setNewInterview({ title: '', start_time: '', end_time: '', participants: [] });
//     setShowModal(true);
//   };

//   const handleSave = () => {
//     if (editingInterview) {
//       axios.put(`http://localhost:8000/api/interviews/${editingInterview.id}/`, editingInterview)
//         .then(() => {
//           fetchInterviews();
//           setShowModal(false);
//         })
//         .catch(error => console.error("Error updating interview:", error));
//     } else {
//       axios.post('http://localhost:8000/api/interviews/', newInterview)
//         .then(() => {
//           fetchInterviews();
//           setShowModal(false);
//         })
//         .catch(error => console.error("Error creating interview:", error));
//     }
//   };

//   const handleStatusChange = (interview, newStatus) => {
//     axios.put(`http://localhost:8000/api/interviews/${interview.id}/`, { ...interview, status: newStatus })
//       .then(() => fetchInterviews())
//       .catch(error => console.error("Error updating interview status:", error));
//   };

//   const handleStartInterview = (interview) => {
//     const domain = "meet.jit.si";
//     const roomName = interview.title.replace(/\s+/g, '-');
//     const options = {
//       roomName: roomName,
//       width: "100%",
//       height: "100%",
//       parentNode: document.querySelector('#jitsi-container'),
//     };

//     const api = new window.JitsiMeetExternalAPI(domain, options);
//     setJitsiApi(api);
//     document.querySelector('#jitsi-container').style.display = 'block';
//   };

//   const handleLeaveInterview = () => {
//     if (jitsiApi) {
//       jitsiApi.dispose();
//       document.querySelector('#jitsi-container').style.display = 'none';
//     }
//   };

//   return (
//     <div className="interview-list">
//       <h2>Upcoming Interviews</h2>
//       <button className="add-button" onClick={handleAdd}>
//         <FontAwesomeIcon icon={faPlus} /> Add Interview
//       </button>

//       <ul>
//         {interviews.map(interview => (
//           <li key={interview.id} className="interview-item">
//             <div className="interview-details">
//               <strong>{interview.title}</strong> - {interview.start_time} to {interview.end_time}
//               <ul>
//                 {interview.participants.map(participant => (
//                   <li key={participant.id}>Interviewer: {participant.name}</li>
//                 ))}
//               </ul>
//               <p>Status: <strong>{interview.status}</strong></p> {/* Display Status */}
//             </div>
//             <div className="action-buttons">
//               <button className="edit-button" onClick={() => handleEdit(interview)}>
//                 <FontAwesomeIcon icon={faEdit} />
//               </button>
//               <button className="delete-button" onClick={() => handleDelete(interview.id)}>
//                 <FontAwesomeIcon icon={faTrash} />
//               </button>

//               <InterviewButtons
//                 onStartInterview={() => handleStartInterview(interview)}
//                 onLeaveInterview={handleLeaveInterview}
//               />

//               {/* Status Change Buttons */}
//               {interview.status === 'pending' && (
//                 <button onClick={() => handleStatusChange(interview, 'completed')}>Mark as Completed</button>
//               )}
//               {interview.status === 'completed' && (
//                 <button onClick={() => handleStatusChange(interview, 'pending')}>Mark as Pending</button>
//               )}
//             </div>
//           </li>
//         ))}
//       </ul>

//       {showModal && (
//         <div className="modal">
//           <h3>{editingInterview ? 'Edit Interview' : 'Add New Interview'}</h3>
//           <input
//             type="text"
//             placeholder="Title"
//             value={editingInterview ? editingInterview.title : newInterview.title}
//             onChange={(e) => {
//               if (editingInterview) {
//                 setEditingInterview({ ...editingInterview, title: e.target.value });
//               } else {
//                 setNewInterview({ ...newInterview, title: e.target.value });
//               }
//             }}
//           />
//           <input
//             type="datetime-local"
//             placeholder="Start Time"
//             value={editingInterview ? editingInterview.start_time : newInterview.start_time}
//             onChange={(e) => {
//               if (editingInterview) {
//                 setEditingInterview({ ...editingInterview, start_time: e.target.value });
//               } else {
//                 setNewInterview({ ...newInterview, start_time: e.target.value });
//               }
//             }}
//           />
//           <input
//             type="datetime-local"
//             placeholder="End Time"
//             value={editingInterview ? editingInterview.end_time : newInterview.end_time}
//             onChange={(e) => {
//               if (editingInterview) {
//                 setEditingInterview({ ...editingInterview, end_time: e.target.value });
//               } else {
//                 setNewInterview({ ...newInterview, end_time: e.target.value });
//               }
//             }}
//           />
//           <select
//             multiple
//             value={editingInterview ? editingInterview.participants.map(p => p.id) : newInterview.participants}
//             onChange={(e) => {
//               const selectedParticipants = Array.from(e.target.selectedOptions, option => option.value);
//               if (editingInterview) {
//                 setEditingInterview({ ...editingInterview, participants: selectedParticipants });
//               } else {
//                 setNewInterview({ ...newInterview, participants: selectedParticipants });
//               }
//             }}
//           >
//             {allParticipants.map(participant => (
//               <option key={participant.id} value={participant.id}>
//                 {participant.name}
//               </option>
//             ))}
//           </select>
//           <button onClick={handleSave}>
//             {editingInterview ? 'Save Changes' : 'Create Interview'}
//           </button>
//           <button onClick={() => setShowModal(false)}>Close</button>
//         </div>
//       )}

//       <div id="jitsi-container" style={{ display: 'none', height: '600px', width: '100%' }}></div>
//     </div>
//   );
// };

// export default InterviewList;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import InterviewButtons from './InterviewButtons';
import '../style/InterviewList.css';

const InterviewList = () => {
  const [interviews, setInterviews] = useState([]);
  const [editingInterview, setEditingInterview] = useState(null);
  const [newInterview, setNewInterview] = useState({
    title: '',
    start_time: '',
    end_time: '',
    participants: []
  });
  const [showModal, setShowModal] = useState(false);
  const [allParticipants, setAllParticipants] = useState([]);
  const [status, setStatus] = useState('pending'); // Default status

  useEffect(() => {
    fetchInterviews();
    fetchParticipants();
  }, []);

  const fetchInterviews = () => {
    axios.get('http://localhost:8000/api/interviews/')
      .then(response => setInterviews(response.data))
      .catch(error => console.error("Error fetching interviews:", error));
  };

  const fetchParticipants = () => {
    axios.get('http://localhost:8000/api/participants/')
      .then(response => setAllParticipants(response.data))
      .catch(error => console.error("Error fetching participants:", error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/interviews/${id}/`)
      .then(() => fetchInterviews())
      .catch(error => console.error("Error deleting interview:", error));
  };

  const handleEdit = (interview) => {
    setEditingInterview(interview);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingInterview(null);
    setNewInterview({ title: '', start_time: '', end_time: '', participants: [] });
    setStatus('pending'); // Reset status to 'pending' for new interviews
    setShowModal(true);
  };

  const handleSave = () => {
    const interviewData = {
      ...newInterview,
      status: status, // Ensure status is included in the data
    };

    if (editingInterview) {
      // Update existing interview
      axios.put(`http://localhost:8000/api/interviews/${editingInterview.id}/`, interviewData)
        .then(() => {
          fetchInterviews();
          setShowModal(false);
        })
        .catch(error => console.error("Error updating interview:", error));
    } else {
      // Create new interview
      axios.post('http://localhost:8000/api/interviews/', interviewData)
        .then(() => {
          fetchInterviews();
          setShowModal(false);
        })
        .catch(error => {
          console.error("Error creating interview:", error);
          alert("There was an issue creating the interview. Please try again.");
        });
    }
  };

  return (
    <div className="interview-list">
      <h2>Upcoming Interviews</h2>
      <button className="add-button" onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} /> Add Interview
      </button>

      <ul>
        {interviews.map(interview => (
          <li key={interview.id} className="interview-item">
            <div className="interview-details">
              <strong>{interview.title}</strong> - {interview.start_time} to {interview.end_time}
              <ul>
                {interview.participants.map(participant => (
                  <li key={participant.id}>Candidate: {participant.name}</li>
                ))}
              </ul>
              <p>Status: <strong>{interview.status}</strong></p>
            </div>
            <div className="action-buttons">
              <button className="edit-button" onClick={() => handleEdit(interview)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="delete-button" onClick={() => handleDelete(interview.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
              <InterviewButtons />
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <h3>{editingInterview ? 'Edit Interview' : 'Add New Interview'}</h3>
          <input
            type="text"
            placeholder="Title"
            value={newInterview.title}
            onChange={(e) => setNewInterview({ ...newInterview, title: e.target.value })}
          />
          <input
            type="datetime-local"
            placeholder="Start Time"
            value={newInterview.start_time}
            onChange={(e) => setNewInterview({ ...newInterview, start_time: e.target.value })}
          />
          <input
            type="datetime-local"
            placeholder="End Time"
            value={newInterview.end_time}
            onChange={(e) => setNewInterview({ ...newInterview, end_time: e.target.value })}
          />
          <select
            multiple
            value={newInterview.participants}
            onChange={(e) => {
              const selectedParticipants = Array.from(e.target.selectedOptions, option => option.value);
              setNewInterview({ ...newInterview, participants: selectedParticipants });
            }}
          >
            {allParticipants.map(participant => (
              <option key={participant.id} value={participant.id}>
                {participant.name}
              </option>
            ))}
          </select>
          
          <div>
            <label>Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button onClick={handleSave}>
            {editingInterview ? 'Save Changes' : 'Create Interview'}
          </button>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default InterviewList;
