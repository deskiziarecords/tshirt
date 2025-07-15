import React, { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ExportAsImageModal from "./Modals/ExportAsImageModal";
import ExportProjectModal from "./Modals/ExportProjectModal";
import ImportProjectModal from "./Modals/ImportProjectModal";

import { State } from "../../../data_type/interfaces";

interface Props {
  style?: Object;
  editor: State;
  setEditor: (properties: object, callback?: () => void) => void;
}

const FileMenu: React.FC<Props> = ({ editor, setEditor, style = {} }) => {
  const [showExportAsImage, setShowExportAsImage] = useState(false);
  const [showExportProject, setShowExportProject] = useState(false);
  const [showImportProject, setShowImportProject] = useState(false);

  const handlePreview = () => {
    const { previewing } = editor;
    setEditor({ previewing: !previewing });
  };

  return (
    <>
      <DropdownButton
        variant="outline-primary"
        title={
          <>
            <i className="fas fa-file me-2"></i>
            File
          </>
        }
        id="file-dropdown"
        style={style}
        size="sm"
      >
        <Dropdown.Item
          onClick={() => setShowImportProject(true)}
          className="d-flex align-items-center"
        >
          <i className="fas fa-upload me-2 text-primary"></i>
          Import Project
        </Dropdown.Item>
        
        <Dropdown.Divider />
        
        <Dropdown.Item
          onClick={() => setShowExportAsImage(true)}
          className="d-flex align-items-center"
        >
          <i className="fas fa-image me-2 text-success"></i>
          Export as Image
        </Dropdown.Item>
        
        <Dropdown.Item
          onClick={() => setShowExportProject(true)}
          className="d-flex align-items-center"
        >
          <i className="fas fa-download me-2 text-info"></i>
          Export Project
        </Dropdown.Item>
        
        <Dropdown.Divider />
        
        <Dropdown.Item
          onClick={handlePreview}
          className="d-flex align-items-center"
        >
          <i className={`fas fa-${editor.previewing ? 'edit' : 'eye'} me-2 text-warning`}></i>
          {editor.previewing ? 'Exit Preview' : 'Preview Design'}
        </Dropdown.Item>
      </DropdownButton>

      <ExportAsImageModal
        show={showExportAsImage}
        setShow={setShowExportAsImage}
        exportFunction={editor.canvasController.exportToImage}
      />
      
      <ExportProjectModal
        show={showExportProject}
        setShow={setShowExportProject}
        exportFunction={editor.canvasController.exportToJSON}
      />
      
      <ImportProjectModal
        show={showImportProject}
        setShow={setShowImportProject}
        importFunction={editor.canvasController.importFromJSON}
      />
    </>
  );
};

export default FileMenu;