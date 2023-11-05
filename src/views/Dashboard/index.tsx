// import SummaryCard from "@/components/dashboard/summary-card";

import ActivityFeed from "@/views/Dashboard/components/activity-feed";

// const summaryData = [
//   {
//     title: "Total Applications",
//     count: 5672,
//     percentValue: 74,
//     percentIncrease: 14,
//     color: "#38CB89",
//   },
//   {
//     title: "Shortlisted Candidates",
//     count: 3045,
//     percentValue: 74,
//     percentIncrease: 14,
//     color: "#FFA600",
//   },
//   {
//     title: "Rejected Candidates",
//     count: 1055,
//     percentValue: 74,
//     percentIncrease: 14,
//     color: "#FF5630",
//   },
// ];

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* {summaryData.map((summary) => (
          <SummaryCard
            percentIncrease={summary.percentIncrease}
            percentValue={summary.percentValue}
            title={summary.title}
            count={summary.count}
            color={summary.color}
          />
        ))} */}
      </div>
      <div className="flex ">
        <div className="flex-1">
          <ActivityFeed />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
