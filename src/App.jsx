import React, { useState, useMemo, useRef, useEffect } from "react";

function Icon({ size = 24, color = "currentColor", children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

const ShoppingBag = (props) => <Icon {...props}><path d="M6 8h12l1 13H5L6 8Z" /><path d="M9 10V6a3 3 0 0 1 6 0v4" /></Icon>;
const X = (props) => <Icon {...props}><path d="m6 6 12 12M18 6 6 18" /></Icon>;
const Plus = (props) => <Icon {...props}><path d="M12 5v14M5 12h14" /></Icon>;
const Minus = (props) => <Icon {...props}><path d="M5 12h14" /></Icon>;
const Check = (props) => <Icon {...props}><path d="m5 12 4 4L19 6" /></Icon>;
const ChevronDown = (props) => <Icon {...props}><path d="m6 9 6 6 6-6" /></Icon>;
const ArrowRight = (props) => <Icon {...props}><path d="M5 12h14M13 6l6 6-6 6" /></Icon>;
const Lock = (props) => <Icon {...props}><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Icon>;
const Mail = (props) => <Icon {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>;
const Target = (props) => <Icon {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></Icon>;
const ClipboardCheck = (props) => <Icon {...props}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 3h6v3H9z" /><path d="m9 13 2 2 4-4" /></Icon>;
const Bolt = (props) => <Icon {...props}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" /></Icon>;

const TOKENS = {
  ink: "#182338",
  inkSoft: "#5B6472",
  paper: "#F6F4EF",
  paperAlt: "#EEEAE0",
  card: "#FFFFFF",
  brass: "#A9824C",
  brassDark: "#856539",
  mark: "#A23B3B",
  line: "#DAD5C8",
  shadowSm: "0 1px 2px rgba(24,35,56,0.05), 0 1px 1px rgba(24,35,56,0.04)",
  shadowMd: "0 10px 28px rgba(24,35,56,0.10)",
  shadowLg: "0 18px 44px rgba(24,35,56,0.16)",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
html, body {
  overflow-x: hidden;
  max-width: 100%;
}
:focus-visible {
  outline: 2px solid ${TOKENS.brass};
  outline-offset: 2px;
  border-radius: 2px;
}
@media (max-width: 700px) {
  .hero-illustration {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
`;

const LOGO_SRC = "data:image/png;base64,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";

const PRODUCTS = [
  {
    id: "single",
    code: "SET·01",
    subject: "Single set",
    title: "Single Practice Set",
    desc: "One full set — Paper 1 (English & Verbal Reasoning) and Paper 2 (Non-Verbal Reasoning & Maths), written for the Quest-style format the Slough Consortium moves to. Choose which of the 10 sets you'd like below.",
    price: 7,
    pickSets: 10,
  },
  {
    id: "core",
    code: "CORE·04",
    subject: "Core package",
    title: "Core Package — 4 Sets",
    desc: "Four full sets — eight papers in total, at a lower price per paper than buying them one at a time.",
    price: 25,
    originalPrice: 28,
  },
];

const BUNDLE = {
  id: "premium",
  code: "PREM·FULL",
  subject: "Premium",
  title: "Premium — Full Set",
  desc: "All 10 sets we publish, covering a comprehensive range of question types for the new Quest-style format — hard to find anywhere else prepared for this exam board.",
  price: 65,
  originalPrice: 70,
};

const FAQS = [
  {
    q: "What format do the papers come in?",
    a: "Every paper is a printable PDF, laid out to match real exam papers, with a separate answer booklet and full mark scheme.",
  },
  {
    q: "How quickly will I get access?",
    a: "Instantly. After checkout you'll get a download link by email, and the papers stay available in your account.",
  },
];

function money(n) {
  return `£${Number.isInteger(n) ? n : n.toFixed(2)}`;
}

function Eyebrow({ children }) {
  return (
    <div
      style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: TOKENS.brassDark,
      }}
    >
      {children}
    </div>
  );
}

// A small, bespoke illustration of the actual product — two overlapping
// specimen paper covers in the site's own type system — rather than a
// generic stock photo or abstract SaaS graphic.
function PaperStack() {
  const sheets = [
    { code: "PAPER · 01", title: "English & Verbal Reasoning", rotate: -5, x: 0, y: 14, z: 1 },
    { code: "PAPER · 02", title: "Non-Verbal Reasoning & Maths", rotate: 4, x: 44, y: 0, z: 2 },
  ];
  return (
    <div style={{ position: "relative", width: 264, height: 292 }}>
      {sheets.map((s) => (
        <div
          key={s.code}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: 210,
            height: 264,
            background: TOKENS.card,
            border: `1px solid ${TOKENS.line}`,
            borderRadius: 6,
            boxShadow: TOKENS.shadowLg,
            transform: `rotate(${s.rotate}deg)`,
            padding: "20px 18px",
            boxSizing: "border-box",
            zIndex: s.z,
          }}
        >
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: TOKENS.brassDark,
              marginBottom: 10,
            }}
          >
            {s.code}
          </div>
          <div
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontWeight: 600,
              fontSize: 13.5,
              lineHeight: 1.3,
              color: TOKENS.ink,
              borderBottom: `2px solid ${TOKENS.brass}`,
              paddingBottom: 12,
              marginBottom: 16,
            }}
          >
            {s.title}
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                height: 5,
                borderRadius: 2,
                background: TOKENS.line,
                marginBottom: 10,
                width: i % 3 === 2 ? "58%" : "86%",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function HeroButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: TOKENS.ink,
        color: "#fff",
        border: "none",
        borderRadius: 4,
        padding: "14px 22px",
        fontSize: 14.5,
        fontWeight: 600,
        cursor: "pointer",
        boxShadow: hovered ? "0 10px 24px rgba(24,35,56,0.28)" : TOKENS.shadowSm,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
      }}
    >
      Browse sets <ArrowRight size={16} />
    </button>
  );
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);
  return reduced;
}

// Fades + lifts content into place the first time it scrolls into view.
// Skips the animation entirely for anyone with prefers-reduced-motion set.
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function PaperCard({ product, onAdd, featured }) {
  const [setNumber, setSetNumber] = useState(1);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isPickable = Boolean(product.pickSets);

  const handleAdd = () => {
    if (!isPickable) {
      onAdd(product);
    } else {
      onAdd({
        ...product,
        id: `${product.id}-${setNumber}`,
        code: `SET·${String(setNumber).padStart(2, "0")}`,
        title: `${product.title} — Set ${setNumber}`,
      });
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1300);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: TOKENS.card,
        border: featured ? `2px solid ${TOKENS.brass}` : `1px solid ${TOKENS.line}`,
        borderRadius: 6,
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        position: "relative",
        boxShadow: hovered ? TOKENS.shadowMd : TOKENS.shadowSm,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
    >
      {featured && (
        <div
          style={{
            position: "absolute",
            top: -13,
            left: 24,
            background: TOKENS.brass,
            color: "#fff",
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.08em",
            padding: "5px 11px",
            borderRadius: 3,
            boxShadow: "0 4px 10px rgba(169,130,76,0.35)",
          }}
        >
          BEST VALUE
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <Eyebrow>{product.code}</Eyebrow>
        <div
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11,
            color: TOKENS.inkSoft,
            border: `1px solid ${TOKENS.line}`,
            borderRadius: 3,
            padding: "3px 8px",
          }}
        >
          Answers & explanations
        </div>
      </div>
      <h3
        style={{
          fontFamily: "'Source Serif 4', serif",
          fontWeight: 600,
          fontSize: 22,
          color: TOKENS.ink,
          margin: 0,
        }}
      >
        {product.title}
      </h3>
      <p style={{ fontSize: 14.5, lineHeight: 1.6, color: TOKENS.inkSoft, margin: 0, flexGrow: 1 }}>
        {product.desc}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          paddingTop: 14,
          borderTop: `1px dashed ${TOKENS.line}`,
        }}
      >
        <div>
          {product.originalPrice && (
            <span
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
                color: TOKENS.inkSoft,
                textDecoration: "line-through",
                marginRight: 8,
              }}
            >
              {money(product.originalPrice)}
            </span>
          )}
          <span
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 19,
              fontWeight: 600,
              color: TOKENS.ink,
            }}
          >
            {money(product.price)}
          </span>
        </div>
        {isPickable && (
          <label style={{ display: "block" }}>
            <span style={{ fontSize: 12.5, color: TOKENS.inkSoft, display: "block", marginBottom: 6 }}>
              Which set?
            </span>
            <select
              value={setNumber}
              onChange={(e) => setSetNumber(Number(e.target.value))}
              style={{
                width: "100%",
                boxSizing: "border-box",
                border: `1px solid ${TOKENS.line}`,
                borderRadius: 3,
                padding: "10px 12px",
                fontSize: 14,
                fontFamily: "'Inter', sans-serif",
                background: "#fff",
                color: TOKENS.ink,
              }}
            >
              {Array.from({ length: product.pickSets }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  Set {n}
                </option>
              ))}
            </select>
          </label>
        )}
        <button
          onClick={handleAdd}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            width: "100%",
            boxSizing: "border-box",
            background: added ? "#4C7A4C" : TOKENS.ink,
            color: "#fff",
            border: "none",
            borderRadius: 4,
            padding: "12px 16px",
            fontSize: 13.5,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
            whiteSpace: "nowrap",
            boxShadow: hovered && !added ? "0 6px 16px rgba(24,35,56,0.22)" : "none",
            transform: hovered && !added ? "translateY(-1px)" : "translateY(0)",
            transition: "background 0.15s ease, box-shadow 0.2s ease, transform 0.2s ease",
          }}
        >
          {added ? (
            <>
              <Check size={15} /> Added
            </>
          ) : (
            <>
              <Plus size={15} /> Add to basket
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, items, onQty, onRemove, subtotal, onCheckout }) {
  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(24,35,56,0.35)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
          zIndex: 40,
        }}
      />
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100%",
          width: "min(400px, 100%)",
          background: TOKENS.paper,
          borderLeft: `1px solid ${TOKENS.line}`,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          zIndex: 41,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 22px",
            borderBottom: `1px solid ${TOKENS.line}`,
          }}
        >
          <h3 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 19, fontWeight: 600, margin: 0, color: TOKENS.ink }}>
            Your basket
          </h3>
          <button
            onClick={onClose}
            aria-label="Close basket"
            style={{ background: "none", border: "none", cursor: "pointer", color: TOKENS.inkSoft }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>
          {items.length === 0 ? (
            <p style={{ color: TOKENS.inkSoft, fontSize: 14.5 }}>Your basket is empty. Add a set to get started.</p>
          ) : (
            items.map((it) => (
              <div
                key={it.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  padding: "14px 0",
                  borderBottom: `1px solid ${TOKENS.line}`,
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: 10.5,
                      color: TOKENS.brassDark,
                      fontWeight: 600,
                      marginBottom: 3,
                    }}
                  >
                    {it.code}
                  </div>
                  <div style={{ fontSize: 14.5, color: TOKENS.ink, fontWeight: 500, marginBottom: 8 }}>{it.title}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      onClick={() => onQty(it.id, -1)}
                      aria-label="Decrease quantity"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 3,
                        border: `1px solid ${TOKENS.line}`,
                        background: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Minus size={12} />
                    </button>
                    <span style={{ fontSize: 13.5, minWidth: 14, textAlign: "center" }}>{it.qty}</span>
                    <button
                      onClick={() => onQty(it.id, 1)}
                      aria-label="Increase quantity"
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 3,
                        border: `1px solid ${TOKENS.line}`,
                        background: "#fff",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => onRemove(it.id)}
                      style={{
                        marginLeft: "auto",
                        background: "none",
                        border: "none",
                        color: TOKENS.inkSoft,
                        fontSize: 12.5,
                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 14,
                    color: TOKENS.ink,
                    whiteSpace: "nowrap",
                  }}
                >
                  {money(it.price * it.qty)}
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ padding: "18px 22px", borderTop: `1px solid ${TOKENS.line}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14, fontSize: 15 }}>
            <span style={{ color: TOKENS.inkSoft }}>Subtotal</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: TOKENS.ink }}>
              {money(subtotal)}
            </span>
          </div>
          <button
            onClick={onCheckout}
            disabled={items.length === 0}
            style={{
              width: "100%",
              background: items.length === 0 ? TOKENS.line : TOKENS.ink,
              color: items.length === 0 ? TOKENS.inkSoft : "#fff",
              border: "none",
              borderRadius: 3,
              padding: "13px 0",
              fontSize: 14.5,
              fontWeight: 600,
              cursor: items.length === 0 ? "default" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            Checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, half }) {
  return (
    <label style={{ display: "block", flex: half ? 1 : "unset" }}>
      <span style={{ fontSize: 12.5, color: TOKENS.inkSoft, display: "block", marginBottom: 6 }}>{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          boxSizing: "border-box",
          border: `1px solid ${TOKENS.line}`,
          borderRadius: 3,
          padding: "11px 12px",
          fontSize: 14.5,
          fontFamily: "'Inter', sans-serif",
          background: "#fff",
          color: TOKENS.ink,
        }}
      />
    </label>
  );
}

function OrderSummary({ items, subtotal }) {
  return (
    <div
      style={{
        background: TOKENS.paperAlt,
        border: `1px solid ${TOKENS.line}`,
        borderRadius: 3,
        padding: "14px 16px",
      }}
    >
      {items.map((it) => (
        <div
          key={it.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 13,
            color: TOKENS.inkSoft,
            marginBottom: 6,
          }}
        >
          <span>
            {it.title} {it.qty > 1 ? `× ${it.qty}` : ""}
          </span>
          <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{money(it.price * it.qty)}</span>
        </div>
      ))}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 14,
          fontWeight: 600,
          color: TOKENS.ink,
          marginTop: 8,
          paddingTop: 8,
          borderTop: `1px dashed ${TOKENS.line}`,
        }}
      >
        <span>Total</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{money(subtotal)}</span>
      </div>
    </div>
  );
}

// Collects name + email, then asks our backend to create a real Stripe Checkout
// Session and redirects the browser there. Card details are entered on Stripe's
// own hosted page — they never touch this app or its server.
function CheckoutOverlay({ items, subtotal, onClose }) {
  const [details, setDetails] = useState({ name: "", email: "" });
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");

  const detailsValid = details.name.trim() && details.email.trim().includes("@");

  const handleContinue = async () => {
    setError("");
    setPlacing(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((it) => ({ id: it.id, title: it.title, price: it.price, qty: it.qty })),
          email: details.email,
          name: details.name,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setPlacing(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(24,35,56,0.45)",
        zIndex: 50,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          background: TOKENS.paper,
          width: "min(560px, 100%)",
          borderRadius: 6,
          border: `1px solid ${TOKENS.line}`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 24px",
            borderBottom: `1px solid ${TOKENS.line}`,
          }}
        >
          <h3 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 19, fontWeight: 600, margin: 0, color: TOKENS.ink }}>
            Your details
          </h3>
          <button
            onClick={onClose}
            aria-label="Close checkout"
            style={{ background: "none", border: "none", cursor: "pointer", color: TOKENS.inkSoft }}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Full name" value={details.name} onChange={(v) => setDetails({ ...details, name: v })} placeholder="Jane Parent" />
            <Field label="Email — for your download link" value={details.email} onChange={(v) => setDetails({ ...details, email: v })} placeholder="jane@example.com" type="email" />
            <OrderSummary items={items} subtotal={subtotal} />
            <div style={{ display: "flex", alignItems: "center", gap: 7, color: TOKENS.inkSoft, fontSize: 12.5 }}>
              <Lock size={13} /> You'll enter card details on Stripe's secure checkout page next.
            </div>
            {error && (
              <p style={{ color: TOKENS.mark, fontSize: 13, margin: 0 }}>{error}</p>
            )}
            <button
              onClick={handleContinue}
              disabled={!detailsValid || placing}
              style={{
                marginTop: 4,
                width: "100%",
                background: detailsValid && !placing ? TOKENS.brass : TOKENS.line,
                color: detailsValid && !placing ? "#fff" : TOKENS.inkSoft,
                border: "none",
                borderRadius: 3,
                padding: "13px 0",
                fontSize: 14.5,
                fontWeight: 600,
                cursor: detailsValid && !placing ? "pointer" : "default",
              }}
            >
              {placing ? "Redirecting to secure payment…" : `Continue to payment — ${money(subtotal)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderConfirmedPage({ onBackToShop }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: TOKENS.paper,
        fontFamily: "'Inter', sans-serif",
        padding: 24,
      }}
    >
      <style>{FONTS}</style>
      <div
        style={{
          background: TOKENS.card,
          border: `1px solid ${TOKENS.line}`,
          borderRadius: 6,
          padding: "40px 32px",
          maxWidth: 440,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#EEF4EC",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}
        >
          <Check size={24} color="#4C7A4C" />
        </div>
        <h1 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 23, color: TOKENS.ink, margin: "0 0 10px" }}>
          Thanks — your order's confirmed
        </h1>
        <p style={{ color: TOKENS.inkSoft, fontSize: 14.5, lineHeight: 1.6, margin: "0 0 24px" }}>
          Check your email for your download links. They should land within a few minutes — do check your spam
          folder if you don't see them.
        </p>
        <button
          onClick={onBackToShop}
          style={{
            width: "100%",
            background: TOKENS.ink,
            color: "#fff",
            border: "none",
            borderRadius: 3,
            padding: "13px 0",
            fontSize: 14.5,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Back to shop
        </button>
      </div>
    </div>
  );
}

function FaqItem({ q, a, open, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid ${TOKENS.line}` }}>
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "18px 0",
          textAlign: "left",
        }}
      >
        <span style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, fontWeight: 600 }}>{q}</span>
        <ChevronDown
          size={18}
          color={TOKENS.inkSoft}
          style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s ease", flexShrink: 0 }}
        />
      </button>
      {open && <p style={{ color: TOKENS.inkSoft, fontSize: 14.5, lineHeight: 1.65, margin: "0 0 18px" }}>{a}</p>}
    </div>
  );
}

export default function App() {
  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const [orderSuccess] = useState(params.get("success") === "true");

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const shopRef = useRef(null);
  const faqRef = useRef(null);
  const policiesRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((it) => it.id === product.id);
      if (existing) {
        return prev.map((it) => (it.id === product.id ? { ...it, qty: it.qty + 1 } : it));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((it) => (it.id === id ? { ...it, qty: Math.max(1, it.qty + delta) } : it))
        .filter((it) => it.qty > 0)
    );
  };

  const removeItem = (id) => setCart((prev) => prev.filter((it) => it.id !== id));

  const subtotal = useMemo(() => cart.reduce((sum, it) => sum + it.price * it.qty, 0), [cart]);
  const count = useMemo(() => cart.reduce((sum, it) => sum + it.qty, 0), [cart]);

  const scrollToShop = () => shopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToFaq = () => faqRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToPolicies = () => policiesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scrollToContact = () => contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  if (orderSuccess) {
    return (
      <OrderConfirmedPage
        onBackToShop={() => {
          window.history.replaceState({}, "", window.location.pathname);
          window.location.reload();
        }}
      />
    );
  }

  return (
    <div style={{ background: TOKENS.paper, minHeight: "100%", fontFamily: "'Inter', sans-serif" }}>
      <style>{FONTS}</style>

      <a
        href="#main"
        style={{
          position: "absolute",
          left: -9999,
          top: 0,
        }}
        onFocus={(e) => (e.target.style.left = "12px")}
        onBlur={(e) => (e.target.style.left = "-9999px")}
      >
        Skip to content
      </a>

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          background: scrolled ? "rgba(246,244,239,0.86)" : TOKENS.paper,
          backdropFilter: scrolled ? "blur(10px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: `1px solid ${TOKENS.line}`,
          boxShadow: scrolled ? TOKENS.shadowSm : "none",
          transition: "background 0.2s ease, box-shadow 0.2s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            rowGap: 10,
          }}
        >
          <img
            src={LOGO_SRC}
            alt="ElevenPlus Scholars"
            width={40}
            height={40}
            style={{ display: "block", borderRadius: 9 }}
          />
          <nav style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <button
              onClick={scrollToShop}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14.5, color: TOKENS.ink, fontFamily: "'Inter', sans-serif" }}
            >
              Papers
            </button>
            <button
              onClick={scrollToFaq}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14.5, color: TOKENS.ink, fontFamily: "'Inter', sans-serif" }}
            >
              FAQs
            </button>
            <button
              onClick={scrollToPolicies}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14.5, color: TOKENS.ink, fontFamily: "'Inter', sans-serif" }}
            >
              Policies
            </button>
            <button
              onClick={scrollToContact}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14.5, color: TOKENS.ink, fontFamily: "'Inter', sans-serif" }}
            >
              Contact
            </button>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open basket"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "none",
                border: `1px solid ${TOKENS.line}`,
                borderRadius: 3,
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: 13.5,
                color: TOKENS.ink,
              }}
            >
              <ShoppingBag size={16} />
              Basket{count > 0 ? ` (${count})` : ""}
            </button>
          </nav>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "88px 24px 64px",
          }}
        >
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 420px", maxWidth: 560 }}>
                <Eyebrow>
                  Designed around the Quest-style format · September{" "}
                  <span style={{ fontFamily: "'Inter', sans-serif" }}>2027</span> exam
                </Eyebrow>
                <h1
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontWeight: 600,
                    fontSize: "clamp(34px, 4.6vw, 54px)",
                    lineHeight: 1.08,
                    letterSpacing: "-0.01em",
                    color: TOKENS.ink,
                    margin: "16px 0 20px",
                  }}
                >
                  Practice papers built for the exam board the Slough Consortium moves to.
                </h1>
                <p style={{ fontSize: 17, lineHeight: 1.65, color: TOKENS.inkSoft, margin: "0 0 32px" }}>
                  From September 2027, the Slough Consortium's 11+ moves to Quest Assessments. Papers designed
                  around this new format are hard to find — each set gives your child Paper 1 (English & Verbal
                  Reasoning) and Paper 2 (Non-Verbal Reasoning & Maths), with full mark schemes included.
                </p>
                <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                  <HeroButton onClick={scrollToShop} />
                  <span style={{ fontSize: 13, color: TOKENS.inkSoft }}>Instant download</span>
                </div>
              </div>
              <div
                className="hero-illustration"
                style={{ flex: "0 1 300px", display: "flex", justifyContent: "center", paddingTop: 10 }}
              >
                <PaperStack />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Shop */}
        <section ref={shopRef} style={{ maxWidth: 1080, margin: "0 auto", padding: "24px 24px 72px", scrollMarginTop: 70 }}>
          <Reveal>
            <div style={{ marginBottom: 32 }}>
              <Eyebrow>The sets</Eyebrow>
              <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 32, fontWeight: 600, color: TOKENS.ink, margin: "8px 0 0" }}>
                Buy one set, a package, or the comprehensive range
              </h2>
              <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, margin: "8px 0 0", maxWidth: 520 }}>
                Every set follows the same paper split as above.
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 20,
                marginBottom: 20,
              }}
            >
              {PRODUCTS.map((p) => (
                <PaperCard key={p.id} product={p} onAdd={addToCart} />
              ))}
            </div>
            <PaperCard product={BUNDLE} onAdd={addToCart} featured />
          </Reveal>
        </section>

        {/* Trust strip */}
        <section style={{ background: TOKENS.paperAlt, borderTop: `1px solid ${TOKENS.line}`, borderBottom: `1px solid ${TOKENS.line}` }}>
          <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 24px" }}>
            <Reveal>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: 32,
                }}
              >
                {[
                  { t: "Designed around the Slough Consortium's new format", d: "Designed around a Quest-style paper structure, which the Slough Consortium is moving to.", Icon: Target },
                  { t: "Full mark schemes", d: "Every question is explained, so you can mark and understand mistakes together.", Icon: ClipboardCheck },
                  { t: "Instant download", d: "Get your papers by email straight after checkout — no waiting for post.", Icon: Bolt },
                ].map((f) => (
                  <div key={f.t}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "rgba(169,130,76,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 14,
                      }}
                    >
                      <f.Icon size={20} color={TOKENS.brassDark} />
                    </div>
                    <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 17, color: TOKENS.ink, margin: "0 0 6px" }}>{f.t}</h4>
                    <p style={{ fontSize: 14, color: TOKENS.inkSoft, lineHeight: 1.6, margin: 0 }}>{f.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" ref={faqRef} style={{ maxWidth: 680, margin: "0 auto", padding: "64px 24px", scrollMarginTop: 70 }}>
          <Reveal>
            <Eyebrow>Questions</Eyebrow>
            <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 28, fontWeight: 600, color: TOKENS.ink, margin: "8px 0 20px" }}>
              Before you buy
            </h2>
            <div>
              {FAQS.map((f, i) => (
                <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
              ))}
            </div>
          </Reveal>
        </section>

        {/* Policies */}
        <section
          id="policies"
          ref={policiesRef}
          style={{ background: TOKENS.paperAlt, borderTop: `1px solid ${TOKENS.line}`, scrollMarginTop: 70 }}
        >
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "64px 24px" }}>
           <Reveal>
            <Eyebrow>Before you buy</Eyebrow>
            <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 28, fontWeight: 600, color: TOKENS.ink, margin: "8px 0 24px" }}>
              Delivery, refunds & contact
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, margin: "0 0 6px" }}>
                  Delivery
                </h4>
                <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, lineHeight: 1.65, margin: 0 }}>
                  ElevenPlus Scholars sells digital practice papers only — no physical goods are shipped. After
                  payment, download links to your PDFs are sent to the email address you provide at checkout,
                  usually within a few minutes.
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, margin: "0 0 6px" }}>
                  Refunds & disputes
                </h4>
                <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, lineHeight: 1.65, margin: 0 }}>
                  If a download link doesn't arrive, a file is faulty, or a paper isn't as described, contact us
                  within 14 days of purchase and we'll fix it or refund you in full. Because these are instant
                  digital downloads, we don't offer refunds for a simple change of mind once a working download
                  link has been sent.
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, margin: "0 0 6px" }}>
                  Cancellation rights
                </h4>
                <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, lineHeight: 1.65, margin: 0 }}>
                  Under UK consumer law, you normally have 14 days to cancel an online purchase. By completing
                  checkout for instant-download papers, you ask us to begin delivery straight away and
                  acknowledge that you lose this cancellation right once your download link has been sent. This
                  doesn't affect your right to a refund under "Refunds & disputes" above if something's wrong
                  with what you receive.
                </p>
              </div>
              <div ref={contactRef} style={{ scrollMarginTop: 70 }}>
                <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, margin: "0 0 6px" }}>
                  Contact us
                </h4>
                <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, lineHeight: 1.65, margin: 0 }}>
                  Questions, missing downloads, or refund requests:{" "}
                  <a href="mailto:elevenpluscholars@gmail.com" style={{ color: TOKENS.ink }}>
                    elevenpluscholars@gmail.com
                  </a>
                  . We reply within 2 working days.
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 16.5, color: TOKENS.ink, margin: "0 0 6px" }}>
                  Independence
                </h4>
                <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, lineHeight: 1.65, margin: 0 }}>
                  ElevenPlus Scholars is an independent publisher of practice material. We are not affiliated with,
                  endorsed by, or connected to Quest Assessments, the Slough Consortium, or any exam board. Our
                  papers are original material designed around publicly announced exam formats.
                </p>
              </div>
            </div>
           </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: `1px solid ${TOKENS.line}` }}>
        <div
          style={{
            maxWidth: 1080,
            margin: "0 auto",
            padding: "32px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src={LOGO_SRC}
              alt="ElevenPlus Scholars"
              width={30}
              height={30}
              style={{ display: "block", borderRadius: 7 }}
            />
            <div style={{ fontSize: 11.5, color: TOKENS.inkSoft }}>ElevenPlus Scholars</div>
          </div>
          <a
            href="mailto:elevenpluscholars@gmail.com"
            style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: TOKENS.inkSoft, textDecoration: "none" }}
          >
            <Mail size={14} /> elevenpluscholars@gmail.com
          </a>
        </div>
      </footer>

      {count > 0 && !cartOpen && !checkoutOpen && (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 35,
            display: "flex",
            justifyContent: "center",
            padding: "16px",
            pointerEvents: "none",
          }}
        >
          <button
            onClick={() => setCartOpen(true)}
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: TOKENS.ink,
              color: "#fff",
              border: "none",
              borderRadius: 30,
              padding: "13px 22px",
              fontSize: 14.5,
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(24,35,56,0.28)",
            }}
          >
            <span
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: TOKENS.brass,
                borderRadius: "50%",
                width: 22,
                height: 22,
                fontSize: 12,
                fontFamily: "'IBM Plex Mono', monospace",
              }}
            >
              {count}
            </span>
            {count === 1 ? "1 set added" : `${count} sets added`} — view basket & pay
            <ArrowRight size={16} />
          </button>
        </div>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart}
        onQty={changeQty}
        onRemove={removeItem}
        subtotal={subtotal}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      {checkoutOpen && (
        <CheckoutOverlay
          items={cart}
          subtotal={subtotal}
          onClose={() => setCheckoutOpen(false)}
        />
      )}
    </div>
  );
}
