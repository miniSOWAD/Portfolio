type SkillGroup = {
  title: string;
  items: { name: string; level: number }[];
};

const groups: SkillGroup[] = [
  {
    title: "Frontend",
    items: [
      { name: "React", level: 80 },
      { name: "TypeScript", level: 75 },
      { name: "HTML/CSS", level: 80 },
      { name: "Tailwind / UI", level: 65 },
    ],
  },
  {
    title: "Backend",
    items: [
      { name: "Node.js", level: 65 },
      { name: "Express", level: 70 },
      { name: "REST API", level: 70 },
      { name: "JWT/Auth", level: 60 },
    ],
  },
  {
    title: "Database & Tools",
    items: [
      { name: "MongoDB", level: 70 },
      { name: "MySQL", level: 55 },
      { name: "Git/GitHub", level: 75 },
      { name: "Deployment", level: 55 },
    ],
  },
];

export default function SkillsTab() {
  return (
    <div className="tabSection">
      <h3 className="tabH3">Current skills</h3>

      <div className="cardsGrid">
        {groups.map((g) => (
          <div className="card" key={g.title}>
            <div className="cardBody">
              <h4 className="cardTitle">{g.title}</h4>

              <div className="skillList">
                {g.items.map((it) => (
                  <div key={it.name} className="skillRow">
                    <div className="skillTop">
                      <span>{it.name}</span>
                      <span className="muted">{it.level}%</span>
                    </div>
                    <div className="bar">
                      <div className="barFill" style={{ width: `${it.level}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="chipRow" style={{ marginTop: 12 }}>
                {g.items.map((x) => (
                  <span className="chip" key={x.name}>
                    {x.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="tabH3" style={{ marginTop: 18 }}>
        Tech Stack Table
      </h3>

      <div className="tableWrap">
        <table className="niceTable">
          <thead>
            <tr>
              <th>Category</th>
              <th>Tools</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Frontend</td>
              <td>React, TypeScript, HTML, CSS</td>
            </tr>
            <tr>
              <td>Backend</td>
              <td>Node, Express, REST, Auth</td>
            </tr>
            <tr>
              <td>Database</td>
              <td>MongoDB, MySQL</td>
            </tr>
            <tr>
              <td>Tools</td>
              <td>Git, GitHub, Vite</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
