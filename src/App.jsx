import React, { useState, useMemo, useRef } from "react";

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

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,500;0,8..60,600;0,8..60,700;1,8..60,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
`;

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
};

const PRODUCTS = [
  {
    id: "single",
    code: "SET·01",
    subject: "Single set",
    title: "Single Practice Set",
    desc: "One full set — Paper 1 (English & Verbal Reasoning) and Paper 2 (Non-Verbal Reasoning & Maths), written to the Quest Assessments format the Slough Consortium moves to for the September 2027 exam. Choose which of the 10 sets you'd like below.",
    price: 7,
    pickSets: 10,
  },
  {
    id: "core",
    code: "CORE·04",
    subject: "Core package",
    title: "Core Package — 4 Sets",
    desc: "Four full sets (eight papers in total), so your child sees the Quest paper split from several angles before exam day.",
    price: 25,
    originalPrice: 28,
  },
];

const BUNDLE = {
  id: "premium",
  code: "PREM·FULL",
  subject: "Premium",
  title: "Premium — Full Set",
  desc: "All 10 sets we publish, covering a comprehensive range of question types set for the Slough Consortium's new Quest Assessments format — hard to find anywhere else prepared for this exam board.",
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

function PaperCard({ product, onAdd, featured }) {
  const [setNumber, setSetNumber] = useState(1);
  const [added, setAdded] = useState(false);
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
      style={{
        background: TOKENS.card,
        border: featured ? `2px solid ${TOKENS.brass}` : `1px solid ${TOKENS.line}`,
        borderRadius: 4,
        padding: "28px 26px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        position: "relative",
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
            padding: "4px 10px",
            borderRadius: 3,
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
            borderRadius: 3,
            padding: "11px 16px",
            fontSize: 13.5,
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "background 0.15s ease",
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
  const shopRef = useRef(null);
  const faqRef = useRef(null);
  const policiesRef = useRef(null);

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
          background: TOKENS.paper,
          borderBottom: `1px solid ${TOKENS.line}`,
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
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 700, fontSize: 21, color: TOKENS.ink }}>
              Eleven
            </span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 21, color: TOKENS.brass }}>
              +
            </span>
          </div>
          <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
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
            maxWidth: 760,
            margin: "0 auto",
            padding: "64px 24px 56px",
          }}
        >
          <Eyebrow>Practice papers for the Quest Assessments format · September 2027 exam</Eyebrow>
          <h1
            style={{
              fontFamily: "'Source Serif 4', serif",
              fontWeight: 600,
              fontSize: "clamp(32px, 4.2vw, 46px)",
              lineHeight: 1.12,
              color: TOKENS.ink,
              margin: "14px 0 18px",
            }}
          >
            Practice papers built for the exam board Slough just moved to.
          </h1>
          <p style={{ fontSize: 16.5, lineHeight: 1.6, color: TOKENS.inkSoft, maxWidth: 480, margin: "0 0 28px" }}>
            From September 2027, the Slough Consortium's 11+ moves to Quest Assessments. Papers matched to this
            new format are hard to find — each set gives your child Paper 1 (English & Verbal Reasoning) and
            Paper 2 (Non-Verbal Reasoning & Maths), with full mark schemes included.
          </p>
          <div style={{ display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={scrollToShop}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: TOKENS.ink,
                color: "#fff",
                border: "none",
                borderRadius: 3,
                padding: "13px 20px",
                fontSize: 14.5,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Browse sets <ArrowRight size={16} />
            </button>
            <span style={{ fontSize: 13, color: TOKENS.inkSoft }}>Instant download</span>
          </div>
        </section>

        {/* Shop */}
        <section ref={shopRef} style={{ maxWidth: 1080, margin: "0 auto", padding: "20px 24px 64px", scrollMarginTop: 70 }}>
          <div style={{ marginBottom: 28 }}>
            <Eyebrow>The sets</Eyebrow>
            <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 28, fontWeight: 600, color: TOKENS.ink, margin: "8px 0 0" }}>
              Buy one set, a package, or the comprehensive range
            </h2>
            <p style={{ fontSize: 14.5, color: TOKENS.inkSoft, margin: "8px 0 0", maxWidth: 520 }}>
              Every set follows the same paper split Quest uses: Paper 1 (English & Verbal Reasoning) and
              Paper 2 (Non-Verbal Reasoning & Maths).
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 18,
              marginBottom: 18,
            }}
          >
            {PRODUCTS.map((p) => (
              <PaperCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
          <PaperCard product={BUNDLE} onAdd={addToCart} featured />
        </section>

        {/* Trust strip */}
        <section style={{ background: TOKENS.paperAlt, borderTop: `1px solid ${TOKENS.line}`, borderBottom: `1px solid ${TOKENS.line}` }}>
          <div
            style={{
              maxWidth: 1080,
              margin: "0 auto",
              padding: "40px 24px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 28,
            }}
          >
            {[
              { t: "Matched to Slough's new format", d: "Matched to the paper structure Quest Assessments adopts for the September 2027 exam.", Icon: Target },
              { t: "Full mark schemes", d: "Every question is explained, so you can mark and understand mistakes together.", Icon: ClipboardCheck },
              { t: "Instant download", d: "Get your papers by email straight after checkout — no waiting for post.", Icon: Bolt },
            ].map((f) => (
              <div key={f.t}>
                <f.Icon size={22} color={TOKENS.brassDark} />
                <h4 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 17, color: TOKENS.ink, margin: "10px 0 6px" }}>{f.t}</h4>
                <p style={{ fontSize: 14, color: TOKENS.inkSoft, lineHeight: 1.6, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" ref={faqRef} style={{ maxWidth: 680, margin: "0 auto", padding: "56px 24px", scrollMarginTop: 70 }}>
          <Eyebrow>Questions</Eyebrow>
          <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 26, fontWeight: 600, color: TOKENS.ink, margin: "8px 0 20px" }}>
            Before you buy
          </h2>
          <div>
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} q={f.q} a={f.a} open={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? -1 : i)} />
            ))}
          </div>
        </section>

        {/* Policies */}
        <section
          id="policies"
          ref={policiesRef}
          style={{ background: TOKENS.paperAlt, borderTop: `1px solid ${TOKENS.line}`, scrollMarginTop: 70 }}
        >
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "56px 24px" }}>
            <Eyebrow>Before you buy</Eyebrow>
            <h2 style={{ fontFamily: "'Source Serif 4', serif", fontSize: 26, fontWeight: 600, color: TOKENS.ink, margin: "8px 0 24px" }}>
              Delivery, refunds & contact
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
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
              <div>
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
                  papers are original material written to match publicly announced exam formats.
                </p>
              </div>
            </div>
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
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 700, fontSize: 16, color: TOKENS.ink }}>
                Eleven
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, fontSize: 16, color: TOKENS.brass }}>
                +
              </span>
            </div>
            <div style={{ fontSize: 11.5, color: TOKENS.inkSoft, marginTop: 3 }}>ElevenPlus Scholars</div>
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
