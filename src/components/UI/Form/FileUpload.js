import React from "react";
import { Form } from "react-bootstrap";
import { FileUploader } from "react-drag-drop-files";
import SideImgForm from "./SideImgForm";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
function FileUpload(props) {

  const fileName =
    props.isEdit && !(props.afile instanceof File)
      ? props.afile
        ? props.afile.split("/").reduce((acc, path) => {
            return path;
          }, "")
        : "No file uploaded yet"
      : props.afile
      ? `File name: ${props.afile.name}`
      : "No files uploaded yet";

  return (
    <>
      <div className="row">
        <Form.Group controlId={props.groupId} className={props.groupClassName}>
          <Form.Label className="reesumeLabel">
            {props.label}
            {props.label === "Resume" ? (
              <a href="https://getcv.me" target="_blank" rel="noreferrer">
                Create Resume Now
              </a>
            ) : (
              ""
            )}
          </Form.Label>
          <FileUploader
            handleChange={props.onChange}
            name={props.fieldName}
            types={fileTypes}
            hoverTitle={props.title}
            minSize={props.minUploadSize}
            maxSize={props.maxUploadSize}
          />
          <p>{fileName}</p>
        </Form.Group>
        {props.isEdit && props.afile ? (
          <SideImgForm afile={props.afile} fName={props.label} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default FileUpload;
