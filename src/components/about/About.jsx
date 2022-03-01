import React from 'react';

function About() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 style={{ margin: '1rem' }}>Recipe app</h2>
      <h5>
        Using Forkify API created by Jonas Schmedtmann, Context and Reducer
        based
        <br /> and also implementing Firebase Auth and Firestore for database
        usage
      </h5>
      <br />
      <h5>Created by Efraim Alkhazov for portfolio usage..</h5>
    </div>
  );
}

export default About;
