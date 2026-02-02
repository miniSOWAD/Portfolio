type Project = {
  name: string;
  description: string;
  tech: string[];
  live?: string;
  repo?: string;
  image?: string;
  status: "Completed" | "In Progress";
};

const projects: Project[] = [
  {
    name: "University Bus Transport System",
    description:
      "Admin panel + routes + users + notifications. Full-stack project.",
    tech: ["React", "TypeScript", "Node", "MongoDB", "NestJS"],
    repo: "https://github.com/BU-Connect/UniversityBusTransportSystem",
    image: "/projects/ubts.png",
    status: "In Progress",
  },
  {
    name: "CSE Department, University of Barishal",
    description: "Fully ready website with exiting features that's been implemented in the official version.",
    tech: ["Next.js", "TypeScript", "Express", "MongoDB"],
    repo: "https://github.com/miniSOWAD/bu-cse-frontend",
    image: "/projects/portfolio.png",
    status: "Completed",
  },
];

export default function ProjectsTab() {
  return (
    <div className="tabSection">
      <h3 className="tabH3">Remarkable Projects</h3>

      <div className="cardsGrid">
        {projects.map((p) => (
          <div key={p.name} className="card">
            {p.image && (
              <img
                className="cardImg"
                src={p.image}
                alt={p.name}
                onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
            )}

            <div className="cardBody">
              <div className="cardTop">
                <h4 className="cardTitle">{p.name}</h4>
                <span className={`badge ${p.status === "Completed" ? "ok" : "warn"}`}>
                  {p.status}
                </span>
              </div>

              <p className="muted">{p.description}</p>

              <div className="chipRow">
                Think type is here
                {p.tech.map((t) => (
                  <span key={t} className="chip">
                    {t}
                  </span>
                ))}
              </div>

              <div className="btnRow">
                {p.live && (
                  <a className="miniBtn" href={p.live} target="_blank" rel="noreferrer">
                    Live
                  </a>
                )}
                {p.repo && (
                  <a className="miniBtn secondary" href={p.repo} target="_blank" rel="noreferrer">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="tabH3" style={{ marginTop: 18 }}>
        Quick Summary
      </h3>

      <div className="tableWrap">
        <table className="niceTable">
          <thead>
            <tr>
              <th>Project</th>
              <th>Status</th>
              <th>Main Tech</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>{p.status}</td>
                <td>{p.tech.slice(0, 2).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
