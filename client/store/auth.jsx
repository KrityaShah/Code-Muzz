import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const [projectId, setProjectId] = useState(null);
  const [projectData, setProjectData] = useState(null); 

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem('token', serverToken);
    setToken(serverToken); 
  };

  let isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem('token');
    alert("You have been logged out!");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);


  
  // Function to set the project ID
  const selectProject = (id) => {
    setProjectId(id);
  };

  // Function to fetch project data by ID
  const fetchProjectData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProjectData(data); 
      } else {
        console.error("Failed to fetch project data");
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };

  // Update project data
  const updateProject = async (id, updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        setProjectData(data); 
        alert("Project updated successfully!");
      } else {
        console.error("Failed to update project");
        alert("Failed to update the project.");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("An error occurred while updating the project.");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      storeTokenInLS, 
      LogoutUser, 
      user, 
      projectId, 
      projectData, 
      selectProject, 
      fetchProjectData, 
      updateProject 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
