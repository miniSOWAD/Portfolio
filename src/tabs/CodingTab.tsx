const profiles = [
  { name: "Codeforces", url: "https://codeforces.com/profile/mahruf007", tag: "CP" },
  { name: "LeetCode", url: "https://leetcode.com/u/minisowad/", tag: "DSA" },
  { name: "AtCoder", url: "https://atcoder.jp/users/malam7", tag: "Contest" },
  { name: "GitHub", url: "https://github.com/miniSOWAD", tag: "Projects" },
];

export default function CodingTab() {
  return (
    <div className="tabSection">
      <h3 className="tabH3">Coding Profiles</h3>

      <div className="cardsGrid">
        {profiles.map((p) => (
          <a
            key={p.name}
            className="linkCard"
            href={p.url}
            target="_blank"
            rel="noreferrer"
          >
            <div className="linkCardTop">
              <div className="linkCardTitle">{p.name}</div>
              <span className="badge ok">{p.tag}</span>
            </div>
            <div className="muted">{p.url}</div>
          </a>
        ))}
      </div>

      <h3 className="tabH3" style={{ marginTop: 18 }}>
        Notes
      </h3>

      <ul className="bullets">
        <li>Practice daily, track progress weekly.</li>
        <li>Keep solutions and notes in GitHub.</li>
        <li>Focus on consistency rather than speed.</li>
      </ul>
    </div>
  );
}
