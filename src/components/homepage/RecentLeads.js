import React, { useState } from "react";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";
import { DTableFunction, siteColumns } from "../../pages/Sites";
import useDTColumns from "../../hooks/useDTColumns";
import DTable from "../DTable";

const RecentLeads = () => {
  const [refreshTable, setRefreshTable] = useState(true);
  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(siteColumns);

  return (
    <div className="col-md-12">
      <NeumorphismWrapper>
        <h4>Recent Leads</h4>
        {renderColBtns()}
        <DTable
          url="sites/get/site/?ordering=-date_created"
          transformFunction={DTableFunction}
          columns={cols}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </NeumorphismWrapper>
    </div>
  );
};

export default RecentLeads;
