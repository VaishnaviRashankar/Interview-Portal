import React from 'react';

const About = () => (
  <div className="about">
    {/* AboutTitle Component */}
    <div className="about-title">
      <h1>About Us</h1>
      <h2>This platform is designed to streamline interview management processes.</h2>
    </div>

    {/* AboutDetails Component */}
    <div className="about-details">
      <p>This web application allows admins to manage interviews, from creating and editing to tracking upcoming sessions. Built with Django for backend functionality and React for a seamless frontend, it offers secure user authentication and an intuitive interface for scheduling and managing interviews.</p>
    </div>
  </div>
);

export default About;
