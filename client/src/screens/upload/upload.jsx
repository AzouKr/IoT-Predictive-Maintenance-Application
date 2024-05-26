import { AreaTop, FileUpload, DatasetTable } from "../../components";
import React from "react";

const Upload = () => {
  return (
    <div className="content-area">
      <FileUpload />
      <DatasetTable />
    </div>
  );
};

export default Upload;
