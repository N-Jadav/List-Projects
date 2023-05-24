import React, { useState } from "react";
import { Layout, Button, Card, Row, Col, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";

const { Content } = Layout;

const App = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [showAddCard, setShowAddCard] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState(null);

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

  const handleShowAddCard = () => {
    setShowAddCard(true);
  };

  const handleDeleteProject = (projectId) => {
    setDeletingProjectId(projectId);
    setDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = () => {
    const updatedProjects = projects.filter(
      (project) => project.id !== deletingProjectId
    );
    setProjects(updatedProjects);
    setDeleteConfirmationVisible(false);
  };

  const handleCancelDelete = () => {
    setDeletingProjectId(null);
    setDeleteConfirmationVisible(false);
  };

  const handleEditProject = (projectId) => {
    setEditingProjectId(projectId);
  };

  const handleSaveProject = (projectId) => {
    setEditingProjectId(null);
  };

  const isEditing = (projectId) => {
    return projectId === editingProjectId;
  };

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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#F7F9FD",
          border: "1px solid #979797",
          justifyContent: "center",
          padding: "1% 4%"
        }}
      >
        <img src="/ThunkableBeaver.png" alt="Logo" style={{ width: "64px", paddingBottom: "1%"}}/>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "700",
            }}
          >
            My Projects
          </span>  
        </div>
      </div>
      <div style={{display: 'flex', justifyContent: 'flex-end', background: '#F7F9FD', padding: "1% 4%"}}>
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          style={{
            backgroundColor: "#3D3A4F",
            width: "48px",
            height: "48px",
            marginRight: "32px",
            bottom: "37px",
          }}
          onClick={handleShowAddCard}
        />
      </div>
      <Content style={{  background: '#F7F9FD', padding: "1% 5%"}}>
        {showAddCard && (
          <Card style={{border: "1px solid #000000"}} >
            <Row align="middle" gutter={16}>
              <Col>
                <img
                  src="/defaultProjectIcon_2x.png"
                  alt="Project"
                  style={{ width: "48px", height: "48px" }}
                />
              </Col>
              <Col flex="auto">
                <TextArea
                  autoSize
                  style={{ width: "20%" }}
                  placeholder="Name your project"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  onPressEnter={(e) => handleAddProject(e.target.value)}
                />
              </Col>
            </Row>
          </Card>
        )}
        {projects.map((project) => (
          <Card key={project.id}>
            <Row>
              <Col style={{display: "flex", alignItems: 'center'}} span={12}>
                <img
                  src="/defaultProjectIcon_2x.png"
                  alt="Project"
                  style={{ width: "48px", height: "48px" }}
                />
                 {isEditing(project.id) ? (
                  <TextArea
                    autoSize
                    style={{width: '40%'}}
                    type="textarea"
                    value={project.name}
                    onChange={(e) =>
                      handleProjectNameChange(project.id, e.target.value)
                    }
                    onPressEnter={() => handleSaveProject(project.id)}
                  />
                ) : (
                  <TextArea
                    bordered={false}
                    autoSize
                    style={{width: '40%'}}
                    type="textarea"
                    value={project.name}
                  />
                )}
                {isEditing(project.id) ? null : (
                  <img
                    src="/EditIcon.svg"
                    alt="Edit"
                    style={{ width: "24px", height: "24px", cursor: "pointer" }}
                    onClick={() => handleEditProject(project.id)}
                    onMouseOver={(e) =>
                      (e.currentTarget.src = "/EditIcon_Hover.svg")
                    }
                    onMouseOut={(e) => (e.currentTarget.src = "/EditIcon.svg")}
                  />
                )}
              </Col>
              <Col style={{display: "flex", alignItems: 'center', justifyContent: 'space-between'}} span={12}>
                <span>{project.createdDate}</span>
                <img
                  src="/DeleteIcon.svg"
                  alt="Delete"
                  style={{ width: "24px", height: "24px", cursor: "pointer" }}
                  onClick={() => handleDeleteProject(project.id)}
                  onMouseOver={(e) =>
                    (e.currentTarget.src = "/DeleteIcon_Hover.svg")
                  }
                  onMouseOut={(e) => (e.currentTarget.src = "/DeleteIcon.svg")}
                />
              </Col>
            </Row>
          </Card>
        ))}

        <Modal
          visible={deleteConfirmationVisible}
          onOk={handleConfirmDelete}
          onCancel={handleCancelDelete}
          okText="Yes"
          cancelText="No"
        >
          <div style={{ display: "flex" }}>
            <img
              src="/Question.svg"
              alt="Project"
              style={{
                width: "18px",
                height: "18px",
                marginTop: "18px",
                marginRight: "8px",
              }}
            />
            <p style={{ fontWeight: "600" }}>
              Are you sure you want to delete the project?
            </p>
          </div>
          <p style={{ marginTop: "0px", marginLeft: "26px" }}>
            This action can't be undone.
          </p>
        </Modal>
      </Content>
    </Layout>
  );
};

export default App;
