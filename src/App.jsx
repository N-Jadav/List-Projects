import React, { useState } from "react";
import "./App.css";
import ProjectList from "./ProjectList";
import { Layout, Button, Card, Row, Col, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";

const { Content } = Layout;

const App = () => {
  const [projects, setProjects] = useState([]); // Stores the list of projects
  const [projectName, setProjectName] = useState(""); // Stores the name of the new project being added
  const [showAddCard, setShowAddCard] = useState(false); // Controls the visibility of the "Add Card" section
  const [editingProjectId, setEditingProjectId] = useState(null); // Stores the ID of the project being edited
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false); // Controls the visibility of the delete confirmation modal
  const [deletingProjectId, setDeletingProjectId] = useState(null); // Stores the ID of the project being deleted

  // Function to handle adding a new project
  const handleAddProject = () => {
    if (projectName) {
      const newProject = {
        id: Date.now(),
        name: projectName,
        createdDate: moment().format("LLL"),
      };

      setProjects([newProject, ...projects]);
      setProjectName("");
      setShowAddCard(false);
    }
  };

  // Function to show the "Add Card" section
  const handleShowAddCard = () => {
    setShowAddCard(true);
  };

   // Function to handle deleting a project
  const handleDeleteProject = (projectId) => {
    setDeletingProjectId(projectId);
    setDeleteConfirmationVisible(true);
  };

  // Function to confirm the deletion of a project
  const handleConfirmDelete = () => {
    const updatedProjects = projects.filter(
      (project) => project.id !== deletingProjectId
    );
    setProjects(updatedProjects);
    setDeleteConfirmationVisible(false);
  };

  // Function to cancel the deletion of a project
  const handleCancelDelete = () => {
    setDeletingProjectId(null);
    setDeleteConfirmationVisible(false);
  };

  // Function to handle editing a project
  const handleEditProject = (projectId) => {
    setEditingProjectId(projectId);
  };

   // Function to save the changes made to a project
  const handleSaveProject = (projectId) => {
    setEditingProjectId(null);
  };

  // Function to check if a project is currently being edited
  const isEditing = (projectId) => {
    return projectId === editingProjectId;
  };

  // Function to handle changes to the project name
  const handleProjectNameChange = (projectId, value) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        return {
          ...project,
          name: value,
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  return (
    <Layout>
      <div className="header">
        <img src="/ThunkableBeaver.png" alt="Logo" className="logo"/>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span className="project-title">
            My Projects
          </span>  
        </div>
      </div>
      <div className="add-button-container">
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          className="add-button"
          onClick={handleShowAddCard}
        />
      </div>
      <Content className="content-container">
        {showAddCard && (
          <Card className="add-card" >
            <Row align="middle" gutter={16}>
              <Col>
                <img
                  src="/defaultProjectIcon_2x.png"
                  alt="Project"
                  className="project-icon"
                />
              </Col>
              <Col flex="auto">
                <TextArea
                  autoSize
                  className="project-name"
                  placeholder="Name your project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onPressEnter={(e) => handleAddProject(e.target.value)}
                  onBlur={(e) => handleAddProject(e.target.value)}
                />
              </Col>
            </Row>
          </Card>
        )}
        {projects.map((project) => (
            <ProjectList
            key={project.id}
            project={project}
            isEditing={isEditing}
            handleProjectNameChange={handleProjectNameChange}
            handleEditProject={handleEditProject}
            handleSaveProject={handleSaveProject}
            handleDeleteProject={handleDeleteProject}
           />
        ))}
        <Modal
          open={deleteConfirmationVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Yes"
          cancelText="No"
        >
          <div className="delete-confirmation">
            <img
              src="/Question.svg"
              alt="Project"
              className="question-icon"
            />
            <p className="confirm-delete-text">
              Are you sure you want to delete the project?
            </p>
          </div>
          <p className="delete-warning-text">
            This action can't be undone.
          </p>
        </Modal>
      </Content>
    </Layout>
  );
};

export default App;
