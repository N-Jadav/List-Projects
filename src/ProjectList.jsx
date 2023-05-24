import React from "react";
import { Card, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";

const ProjectList = ({
  project,
  isEditing,
  handleProjectNameChange,
  handleEditProject,
  handleSaveProject,
  handleDeleteProject,
}) => {
  return (
    <Card key={project.id}>
      <Row>
        <Col style={{ display: "flex", alignItems: "center" }} span={12}>
          <img
            src="/defaultProjectIcon_2x.png"
            alt="Project"
            className="project-icon"
          />
          {isEditing(project.id) ? (
            <TextArea
              autoSize
              className="project-name"
              type="textarea"
              value={project.name}
              onChange={(e) =>
                handleProjectNameChange(project.id, e.target.value)
              }
              onPressEnter={() => handleSaveProject(project.id)}
              onBlur={() => handleSaveProject(project.id)}
            />
          ) : (
            <TextArea
              bordered={false}
              autoSize
              className="project-name"
              type="textarea"
              value={project.name}
            />
          )}
          {isEditing(project.id) ? null : (
            <img
              src="/EditIcon.svg"
              alt="Edit"
              className="edit-icon"
              onClick={() => handleEditProject(project.id)}
              onMouseOver={(e) =>
                (e.currentTarget.src = "/EditIcon_Hover.svg")
              }
              onMouseOut={(e) => (e.currentTarget.src = "/EditIcon.svg")}
            />
          )}
        </Col>
        <Col
          style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
          span={12}
        >
          <span>{project.createdDate}</span>
          <img
            src="/DeleteIcon.svg"
            alt="Delete"
            className="delete-icon"
            onClick={() => handleDeleteProject(project.id)}
            onMouseOver={(e) =>
              (e.currentTarget.src = "/DeleteIcon_Hover.svg")
            }
            onMouseOut={(e) => (e.currentTarget.src = "/DeleteIcon.svg")}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default ProjectList;
