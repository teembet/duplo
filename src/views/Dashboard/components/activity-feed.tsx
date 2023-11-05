import Avatar from "@/assets/images/avatar-1.svg";

const ActivityFeed = () => {
  const feedData = [
    {
      name: "Marvin Markinsey",
      action: "applied for job",
      job: "Product Designer",
      actionTag: "application",
      avatar: Avatar,
      time: "10 mins ago",
    },
  ];
  return (
    <div className="card text-dark">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h4>Activity Feed</h4>

        <select>
          <option value="">All Activity</option>
        </select>
      </div>
      <div>
        {feedData.map((feed, i) => (
          <div key={`knx${i}`} className="">
            <div className="flex">
              <img
                src={feed.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full mr-3"
              />
              <p className="space-x-1 text-black">
                <span className="font-medium">{feed.name}</span>{" "}
                <span className="font-light">{feed.action}</span>
                <span className="font-medium">{feed.job}</span>
              </p>
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
