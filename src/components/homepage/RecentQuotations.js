import React, { useState } from "react";
import NeumorphismWrapper from "../UI/Layouts/NeumorphismWrapper";
import useDTColumns from "../../hooks/useDTColumns";
import { quoteColumns } from "../../pages/Quotes";
import DTable from "../DTable";
import { DTableFunction } from "../../pages/Sites";

const RecentQuotations = () => {
  const [refreshTable, setRefreshTable] = useState(true);
  const [cols, setCols, changeCols, renderColBtns] = useDTColumns(quoteColumns);

  return (
    <div className="col-md-12">
      <NeumorphismWrapper>
        <h4>Recent Quotations</h4>
        {renderColBtns()}
        <DTable
          url="quote/generate-quote/?ordering=-date_created"
          transformFunction={DTableFunction}
          columns={cols}
          refreshTable={refreshTable}
          setRefreshTable={setRefreshTable}
        />
      </NeumorphismWrapper>
    </div>
  );
};

export default RecentQuotations;
