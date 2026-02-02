type Achievement = {
  title: string;
  org: string;
  year: string;
  details: string;
  proof?: string;
};

const items: Achievement[] = [
  {
    title: "Delta Star Rising Champ Contest",
    org: "Dhaka / Regional",
    year: "2022",
    details: "1st Runner-up : Participated and validated the most unique and innovative project in the contest. Missed rank due to lack of bigger team (Only 1).",
  },
  {
    title: "Hult Prize 2026 - Finalist",
    org: "Regional Event",
    year: "2026",
    details: "5th Runner-up : Presented a full-stack project and received good feedback with promising sponsor interests.",
    proof: "/certificates/c1.png",
  },
];

export default function AchievementsTab() {
  return (
    <div className="tabSection">
      <h3 className="tabH3">Achievements</h3>

      <div className="timeline">
        {items.map((a, idx) => (
          <div key={idx} className="timelineItem">
            <div className="timelineDot" />
            <div className="timelineCard">
              <div className="cardTop">
                <h4 className="cardTitle">{a.title}</h4>
                <span className="badge ok">{a.year}</span>
              </div>
              <div className="muted">{a.org}</div>
              <p className="muted" style={{ marginTop: 8 }}>
                {a.details}
              </p>

              {a.proof && (
                <img
                  className="proofImg"
                  src={a.proof}
                  alt="proof"
                  onError={(e) => ((e.currentTarget.style.display = "none"))}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
