"use client";

import React, { useEffect, useState } from "react";
import type { WeddingGift } from "@/types/gift";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .list-page {
    min-height: 100vh;
    background: #faf7f4;
    font-family: 'Jost', sans-serif;
    color: #2c2420;
  }

  /* ── Hero ── */
  .lp-hero {
    background: linear-gradient(135deg, #2c2420 0%, #4a3728 60%, #6b4c3b 100%);
    padding: 48px 32px 36px;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .lp-hero::before {
    content: '';
    position: absolute;
    top: -50%; left: -50%;
    width: 200%; height: 200%;
    background: radial-gradient(ellipse at 60% 40%, rgba(212,175,100,0.12) 0%, transparent 60%);
    pointer-events: none;
  }
  .lp-ornament {
    font-size: 20px;
    letter-spacing: 12px;
    color: #c9a96e;
    opacity: 0.7;
    margin-bottom: 10px;
  }
  .lp-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 44px;
    font-weight: 300;
    color: #f5efe6;
    letter-spacing: 2px;
    line-height: 1.1;
  }
  .lp-title em { font-style: italic; color: #c9a96e; }
  .lp-subtitle {
    font-size: 12px;
    font-weight: 300;
    color: rgba(245,239,230,0.5);
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 10px;
  }

  /* ── Stats strip ── */
  .lp-stats {
    display: flex;
    justify-content: center;
    background: #2c2420;
    border-bottom: 1px solid rgba(201,169,110,0.2);
  }
  .lp-stat {
    flex: 1;
    max-width: 180px;
    padding: 18px 12px;
    text-align: center;
    border-right: 1px solid rgba(201,169,110,0.15);
  }
  .lp-stat:last-child { border-right: none; }
  .lp-stat-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 600;
    color: #c9a96e;
    line-height: 1;
  }
  .lp-stat-lbl {
    font-size: 10px;
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: rgba(245,239,230,0.45);
    margin-top: 5px;
  }

  /* ── Main ── */
  .lp-main {
    max-width: 1020px;
    margin: 0 auto;
    padding: 36px 20px 60px;
  }

  /* ── Toolbar ── */
  .lp-toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 22px;
    flex-wrap: wrap;
  }
  .lp-search-wrap {
    position: relative;
    flex: 1;
    min-width: 180px;
  }
  .lp-search-icon {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #b0a090;
    font-size: 13px;
    pointer-events: none;
  }
  .lp-search {
    width: 100%;
    border: 1px solid #ddd4ca;
    border-radius: 2px;
    padding: 10px 12px 10px 32px;
    font-family: 'Jost', sans-serif;
    font-size: 13px;
    font-weight: 300;
    color: #2c2420;
    background: #fff;
    outline: none;
    transition: border-color 0.2s;
  }
  .lp-search:focus { border-color: #c9a96e; }
  .lp-search::placeholder { color: #c0b4ab; }

  .lp-section-label {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #c9a96e;
  }

  .lp-toolbar-btns { display: flex; gap: 8px; }

  .lp-sort-btn {
    padding: 10px 16px;
    border: 1px solid #ddd4ca;
    border-radius: 2px;
    background: #fff;
    font-family: 'Jost', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #6b584d;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .lp-sort-btn:hover { background: #f0ebe5; border-color: #c9a96e; }
  .lp-sort-btn.active { background: #c9a96e; border-color: #c9a96e; color: #fff; }

  /* ── Table card ── */
  .lp-card {
    background: #fff;
    border: 1px solid #e8ddd5;
    border-radius: 2px;
    box-shadow: 0 2px 20px rgba(44,36,32,0.06);
    overflow: hidden;
  }

  .lp-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .lp-thead tr { background: #2c2420; }
  .lp-th {
    padding: 14px 18px;
    text-align: left;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: rgba(245,239,230,0.6);
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    transition: color 0.15s;
  }
  .lp-th:hover { color: #c9a96e; }
  .lp-th.sorted { color: #c9a96e; }
  .lp-th .sort-arrow { margin-left: 5px; opacity: 0.8; }

  .lp-tbody tr {
    border-bottom: 1px solid #f0e8e0;
    transition: background 0.12s;
    animation: rowIn 0.3s ease both;
  }
  .lp-tbody tr:last-child { border-bottom: none; }
  .lp-tbody tr:hover { background: #fdf6ee; }
  .lp-tbody tr:nth-child(even) { background: #fdf9f6; }
  .lp-tbody tr:nth-child(even):hover { background: #fdf6ee; }

  @keyframes rowIn {
    from { opacity: 0; transform: translateX(-6px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .lp-td {
    padding: 14px 18px;
    color: #2c2420;
    font-weight: 300;
    vertical-align: middle;
  }

  .lp-id {
    display: inline-block;
    background: #f0ebe5;
    color: #8a7060;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.5px;
    padding: 3px 8px;
    border-radius: 20px;
  }

  .lp-guest { display: flex; align-items: center; gap: 10px; }
  .lp-avatar {
    width: 34px; height: 34px;
    border-radius: 50%;
    background: linear-gradient(135deg, #c9a96e, #e8c98a);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 14px; font-weight: 600; color: #fff; flex-shrink: 0;
  }
  .lp-guest-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 17px; font-weight: 600; color: #2c2420; line-height: 1.2;
  }

  .lp-amount {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 600; color: #4a3728; white-space: nowrap;
  }
  .lp-amount-sym { font-size: 12px; color: #c9a96e; vertical-align: super; margin-right: 1px; }

  .lp-msg {
    font-style: italic; color: #8a7060; font-size: 13px;
    max-width: 260px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .lp-no-msg { color: #c8bdb5; font-size: 13px; }
  .lp-date { color: #a0907f; font-size: 12px; white-space: nowrap; }

  /* ── States ── */
  .lp-state { padding: 64px 20px; text-align: center; background: #fff; }
  .lp-state-icon { font-size: 38px; opacity: 0.45; margin-bottom: 14px; }
  .lp-state-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 300; font-style: italic; color: #b0a090;
  }
  .lp-state-sub { font-size: 12px; color: #c8bdb5; letter-spacing: 1px; margin-top: 6px; text-transform: uppercase; }
  .lp-error { color: #c0503a; }

  /* ── Skeleton ── */
  .lp-skeleton-row td { padding: 18px; }
  .lp-skel {
    height: 14px; border-radius: 3px;
    background: linear-gradient(90deg, #ede8e3 25%, #f5f0eb 50%, #ede8e3 75%);
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite;
  }
  @keyframes shimmer {
    from { background-position: 200% 0; }
    to   { background-position: -200% 0; }
  }

  /* ── Footer ── */
  .lp-footer {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 18px;
    background: #fdf9f6; border-top: 1px solid #f0e8e0;
    font-size: 12px; color: #a0907f; font-weight: 300;
  }
  .lp-footer strong { font-weight: 500; color: #6b584d; }

  /* ── Mobile card styles (hidden on desktop) ── */
  .mobile-cards { display: none; }

  @keyframes cardIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .m-card {
    background: #fff;
    border: 1px solid #e8ddd5;
    border-radius: 4px;
    padding: 14px 16px;
    box-shadow: 0 1px 8px rgba(44,36,32,0.05);
    animation: cardIn 0.3s ease both;
  }
  .m-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 8px;
  }
  .m-guest { display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1; }
  .m-avatar {
    width: 38px; height: 38px; flex-shrink: 0;
    border-radius: 50%;
    background: linear-gradient(135deg, #c9a96e, #e8c98a);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px; font-weight: 600; color: #fff;
  }
  .m-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px; font-weight: 600; color: #2c2420;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .m-amount {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 600; color: #4a3728;
    white-space: nowrap; flex-shrink: 0;
  }
  .m-amount-sym { font-size: 12px; color: #c9a96e; vertical-align: super; margin-right: 1px; }
  .m-meta {
    display: flex; align-items: center; justify-content: space-between;
    gap: 8px;
  }
  .m-msg {
    font-style: italic; color: #8a7060; font-size: 13px;
    flex: 1; min-width: 0;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .m-no-msg { color: #c8bdb5; font-size: 12px; flex: 1; }
  .m-date { font-size: 11px; color: #bfb0a3; white-space: nowrap; flex-shrink: 0; }

  /* ════════════════════════════════
     MOBILE  ≤ 600px
  ════════════════════════════════ */
  @media (max-width: 600px) {
    /* Hero */
    .lp-hero { padding: 28px 16px 20px; }
    .lp-title { font-size: 28px; letter-spacing: 1px; }
    .lp-subtitle { font-size: 10px; letter-spacing: 2px; }
    .lp-ornament { font-size: 14px; letter-spacing: 8px; margin-bottom: 8px; }

    /* Stats: 2×2 grid */
    .lp-stats { flex-wrap: wrap; }
    .lp-stat {
      flex: 1 1 50%;
      max-width: 50%;
      padding: 12px 8px;
      border-bottom: 1px solid rgba(201,169,110,0.15);
    }
    .lp-stat:nth-child(2n) { border-right: none; }
    .lp-stat:nth-child(3),
    .lp-stat:nth-child(4) { border-bottom: none; }
    .lp-stat-val { font-size: 20px; }
    .lp-stat-lbl { font-size: 9px; }

    /* Main */
    .lp-main { padding: 16px 12px 48px; }

    /* Toolbar */
    .lp-toolbar { flex-direction: column; align-items: stretch; gap: 8px; margin-bottom: 14px; }
    .lp-section-label { display: none; }
    .lp-search-wrap { min-width: 0; }
    .lp-search { font-size: 15px; padding: 12px 12px 12px 34px; }
    .lp-toolbar-btns { display: flex; gap: 8px; }
    .lp-sort-btn { flex: 1; font-size: 11px; padding: 10px 6px; text-align: center; letter-spacing: 1px; }

    /* Switch to card layout */
    .lp-card { background: transparent; border: none; box-shadow: none; }
    .lp-table { display: none; }
    .mobile-cards { display: flex; flex-direction: column; gap: 10px; }

    /* Footer */
    .lp-footer { flex-direction: column; gap: 4px; align-items: flex-start; padding: 12px; background: #fff; border: 1px solid #e8ddd5; border-radius: 2px; margin-top: 4px; }
  }

  /* Tablet 601–800px */
  @media (min-width: 601px) and (max-width: 800px) {
    .lp-title { font-size: 34px; }
    .lp-stat { max-width: none; }
    .lp-msg { max-width: 140px; }
    .lp-main { padding: 28px 16px 48px; }
  }
`;

type SortKey = "id" | "guest_name" | "amount" | "created_at";

function initials(n: string) {
  return n.trim().split(" ").slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(amount);
}

export default function Home() {
  const [gifts, setGifts] = useState<WeddingGift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("created_at");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/gifts");
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const data: WeddingGift[] = await res.json();
        setGifts(data);
      } catch (err: any) {
        setError(err.message || "Failed to load gifts");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const total = gifts.reduce((sum, g) => sum + Number(g.amount), 0);
  const avg = gifts.length ? total / gifts.length : 0;
  const highest = gifts.length ? Math.max(...gifts.map((g) => Number(g.amount))) : 0;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  };

  const arrow = (key: SortKey) =>
    sortKey === key ? (sortDir === "desc" ? " ↓" : " ↑") : " ↕";

  const filtered = gifts
    .filter((g) =>
      !search.trim() ||
      g.guest_name.toLowerCase().includes(search.toLowerCase()) ||
      g.message?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const mul = sortDir === "desc" ? -1 : 1;
      if (sortKey === "amount") return mul * (Number(a.amount) - Number(b.amount));
      if (sortKey === "guest_name") return mul * a.guest_name.localeCompare(b.guest_name);
      if (sortKey === "created_at") return mul * (new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      return mul * (Number(a.id) - Number(b.id));
    });

  return (
    <>
      <style>{styles}</style>
      <div className="list-page">

        {/* Hero */}
        <div className="lp-hero">
          <div className="lp-ornament">✦ ✦ ✦</div>
          <h1 className="lp-title">Virak <em>and</em> Gech</h1>
          <p className="lp-subtitle">Gift Registry — Complete Ledger</p>
        </div>

        {/* Stats */}
        <div className="lp-stats">
          <div className="lp-stat">
            <div className="lp-stat-val">{gifts.length}</div>
            <div className="lp-stat-lbl">Guests</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-val">{formatCurrency(total)}</div>
            <div className="lp-stat-lbl">Total</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-val">{gifts.length ? formatCurrency(avg) : "—"}</div>
            <div className="lp-stat-lbl">Average</div>
          </div>
          <div className="lp-stat">
            <div className="lp-stat-val">{gifts.length ? formatCurrency(highest) : "—"}</div>
            <div className="lp-stat-lbl">Highest</div>
          </div>
        </div>

        <div className="lp-main">

          {/* Toolbar */}
          <div className="lp-toolbar">
            <span className="lp-section-label">All Gifts</span>
            <div className="lp-search-wrap">
              <span className="lp-search-icon">🔍</span>
              <input
                className="lp-search"
                placeholder="Search guest or message…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="lp-toolbar-btns">
              <button
                className={`lp-sort-btn${sortKey === "amount" ? " active" : ""}`}
                onClick={() => handleSort("amount")}
              >
                By Amount {sortKey === "amount" ? (sortDir === "desc" ? "↓" : "↑") : ""}
              </button>
              <button
                className={`lp-sort-btn${sortKey === "created_at" ? " active" : ""}`}
                onClick={() => handleSort("created_at")}
              >
                By Date {sortKey === "created_at" ? (sortDir === "desc" ? "↓" : "↑") : ""}
              </button>
            </div>
          </div>

          {/* Card */}
          <div className="lp-card">
            {loading ? (
              <>
                {/* Desktop skeleton */}
                <table className="lp-table">
                  <thead>
                    <tr style={{ background: "#2c2420" }}>
                      {["#", "Guest", "Amount", "Message", "Date"].map((h) => (
                        <th key={h} className="lp-th">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i} className="lp-skeleton-row">
                        <td><div className="lp-skel" style={{ width: 30 }} /></td>
                        <td><div className="lp-skel" style={{ width: 140 }} /></td>
                        <td><div className="lp-skel" style={{ width: 70 }} /></td>
                        <td><div className="lp-skel" style={{ width: 180 }} /></td>
                        <td><div className="lp-skel" style={{ width: 100 }} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Mobile skeleton */}
                <div className="mobile-cards" style={{ padding: 12, gap: 10 }}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="m-card">
                      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
                        <div className="lp-skel" style={{ width: 38, height: 38, borderRadius: "50%", flexShrink: 0 }} />
                        <div className="lp-skel" style={{ flex: 1, height: 18 }} />
                        <div className="lp-skel" style={{ width: 56, height: 22, flexShrink: 0 }} />
                      </div>
                      <div className="lp-skel" style={{ width: "55%", height: 13 }} />
                    </div>
                  ))}
                </div>
              </>
            ) : error ? (
              <div className="lp-state">
                <div className="lp-state-icon">⚠️</div>
                <p className="lp-state-text lp-error">{error}</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="lp-state">
                <div className="lp-state-icon">💌</div>
                <p className="lp-state-text">{search ? "No matching guests" : "No gifts recorded yet"}</p>
                {search && <p className="lp-state-sub">Try a different search term</p>}
              </div>
            ) : (
              <>
                {/* ── Desktop table ── */}
                <div style={{ overflowX: "auto" }}>
                  <table className="lp-table">
                    <thead className="lp-thead">
                      <tr>
                        <th className={`lp-th${sortKey === "id" ? " sorted" : ""}`} onClick={() => handleSort("id")}>
                          # <span className="sort-arrow">{arrow("id")}</span>
                        </th>
                        <th className={`lp-th${sortKey === "guest_name" ? " sorted" : ""}`} onClick={() => handleSort("guest_name")}>
                          Guest <span className="sort-arrow">{arrow("guest_name")}</span>
                        </th>
                        <th className={`lp-th${sortKey === "amount" ? " sorted" : ""}`} onClick={() => handleSort("amount")}>
                          Amount <span className="sort-arrow">{arrow("amount")}</span>
                        </th>
                        <th className="lp-th">Message</th>
                        <th className={`lp-th${sortKey === "created_at" ? " sorted" : ""}`} onClick={() => handleSort("created_at")}>
                          Date <span className="sort-arrow">{arrow("created_at")}</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="lp-tbody">
                      {filtered.map((g, index) => (
                        <tr key={g.id} style={{ animationDelay: `${index * 0.03}s` }}>
                          <td className="lp-td"><span className="lp-id">{g.id}</span></td>
                          <td className="lp-td">
                            <div className="lp-guest">
                              <div className="lp-avatar">{initials(g.guest_name)}</div>
                              <span className="lp-guest-name">{g.guest_name}</span>
                            </div>
                          </td>
                          <td className="lp-td">
                            <span className="lp-amount">
                              <span className="lp-amount-sym">$</span>
                              {Number(g.amount).toLocaleString()}
                            </span>
                          </td>
                          <td className="lp-td">
                            {g.message ? <span className="lp-msg">"{g.message}"</span> : <span className="lp-no-msg">—</span>}
                          </td>
                          <td className="lp-td">
                            <span className="lp-date">{new Date(g.created_at).toLocaleString()}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ── Mobile cards ── */}
                <div className="mobile-cards" style={{ padding: 10 }}>
                  {filtered.map((g, index) => (
                    <div className="m-card" key={g.id} style={{ animationDelay: `${index * 0.04}s` }}>
                      <div className="m-card-top">
                        <div className="m-guest">
                          <div className="m-avatar">{initials(g.guest_name)}</div>
                          <span className="m-name">{g.guest_name}</span>
                        </div>
                        <span className="m-amount">
                          <span className="m-amount-sym">$</span>
                          {Number(g.amount).toLocaleString()}
                        </span>
                      </div>
                      <div className="m-meta">
                        {g.message
                          ? <span className="m-msg">"{g.message}"</span>
                          : <span className="m-no-msg">No message</span>
                        }
                        <span className="m-date">
                          {new Date(g.created_at).toLocaleDateString(undefined, {
                            month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
                          })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lp-footer">
                  <span>Showing <strong>{filtered.length}</strong> of <strong>{gifts.length}</strong> {gifts.length === 1 ? "gift" : "gifts"}</span>
                  <span>Total: <strong>{formatCurrency(total)}</strong></span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}