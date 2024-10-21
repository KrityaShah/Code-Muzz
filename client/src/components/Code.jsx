import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Editor from './Editor';
import Navbar from './Navbar';

const Code = () => {
  const location = useLocation();
  const projectId = location.state?.projectId; 

  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState('');

  // Fetch the project data using projectId
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/project/${projectId}`);
        if (response.ok) {
          const projectData = await response.json();
          setHtml(projectData.html || '');
          setCss(projectData.css || '');
          setJs(projectData.javascript || '');
        } else {
          console.error('Failed to fetch project data.');
          alert('Failed to load project data. Please check the project ID.');
        }
      } catch (error) {
        console.error('Error fetching project data:', error);
        alert('An error occurred while fetching project data.');
      }
    };

    if (projectId) {
      fetchProjectData();
    }
  }, [projectId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const onUpdate = async (codeData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/project/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(codeData),
      });

      if (response.ok) {
        await response.json();
        alert('Project updated successfully!');
      } else {
        alert('Failed to update the project.');
      }
    } catch (error) {
      console.error('Error updating project:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="code-btn-section" style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', background: 'rgb(37, 37, 37)' }}>
        <button style={{ padding: '8px 16px', backgroundColor: 'black', color: 'white', borderRadius: '4px' }} onClick={() => onUpdate({ html, css, js })}>
          Save
        </button>
        <button style={{ padding: '8px 16px', backgroundColor: 'black', color: 'white', borderRadius: '4px' }} onClick={() => alert('hello')}>
          Publish
        </button>
      </div>

      <div className="pane top-pane">
        <Editor language="xml" displayName="HTML" value={html} onChange={setHtml} />
        <Editor language="css" displayName="CSS" value={css} onChange={setCss} />
        <Editor language="javascript" displayName="JS" value={js} onChange={setJs} />
      </div>
      <div className="pane">
        <iframe srcDoc={srcDoc} title="output" sandbox="allow-scripts" width="100%" height="100%" />
      </div>
    </>
  );
};

export default Code;
