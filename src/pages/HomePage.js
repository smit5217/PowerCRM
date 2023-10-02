import React from "react";
import HomeStatisticsData from "../components/homepage/HomeStatisticsData";
import RecentLeads from "../components/homepage/RecentLeads";
import RecentQuotations from "../components/homepage/RecentQuotations";

function HomePage() {
  return (
    <div className="col-md-12">
      <div className="row">
        {/* <HomeStatisticsData /> */}
        <RecentLeads />
        <RecentQuotations />
      </div>
    </div>
  );
}

export default HomePage;
