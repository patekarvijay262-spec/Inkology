import { useState, useRef } from "react";

const RED = "#E63946";
const RED_DARK = "#b02a34";
const RED_GLOW = "#E6394622";

const TATTOO_BG_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='900' height='700' viewBox='0 0 900 700'>
<rect width='900' height='700' fill='%23080808'/>
<text x='80' y='200' font-size='180' opacity='0.07' fill='white' font-family='serif'>☠</text>
<text x='400' y='420' font-size='140' opacity='0.06' fill='white' font-family='serif'>⚔</text>
<text x='620' y='180' font-size='120' opacity='0.05' fill='white' font-family='serif'>🌹</text>
<text x='50' y='580' font-size='100' opacity='0.05' fill='white' font-family='serif'>🐍</text>
<text x='700' y='600' font-size='110' opacity='0.06' fill='white' font-family='serif'>🦅</text>
<text x='300' y='100' font-size='90' opacity='0.04' fill='white' font-family='serif'>⚡</text>
</svg>`)}`;

const UNSPLASH_TATTOO = "https://images.unsplash.com/photo-1598133894008-61f7fdb8cc3a?w=1600&q=80&fit=crop";
const UNSPLASH_TATTOO2 = "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1600&q=80&fit=crop";

const placeholderColors = [
  ["#1a0a0a","#E63946"],["#0a0a1a","#4a6fa5"],["#0a1a0a","#4caf50"],
  ["#1a0f00","#ff9800"],["#1a001a","#9c27b0"],["#001a1a","#00bcd4"],
];

const designPlaceholders = [
  ["#1a0a0a","#E63946"],["#0a0a1a","#C9A84C"],["#0a1a0a","#ff6b6b"],
  ["#100a1a","#a78bfa"],["#001a12","#34d399"],["#1a100a","#fb923c"],
];

const SYMBOLS = ["☠","🐍","🌹","⚔","🦅","⚡","🔱","🕸","🗡","✦","🌙","🦋"];

const testimonials = [
  { name: "Maya R.", stars: 5, review: "Absolutely mind-blowing work. The detail on my sleeve is beyond anything I imagined. This studio is in a league of its own.", location: "Mumbai" },
  { name: "Kiran S.", stars: 5, review: "Walked in with zero ideas, walked out with a masterpiece. The consultation changed everything. Total legends.", location: "Delhi" },
  { name: "Priya T.", stars: 5, review: "Three years later and it still looks fresh. The aftercare guidance was incredible. Zero regrets, maximum art.", location: "Pune" },
  { name: "Arjun V.", stars: 4, review: "High-end vibes from the moment you walk in. Came for a small piece and left planning a full back piece. It's that good.", location: "Bangalore" },
];

const SECTIONS = ["HOME","GALLERY","DESIGNS","REVIEWS","BOOK"];

function Stars({ n }) {
  return (
    <div style={{ display:"flex", gap:"4px", marginBottom:"12px" }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width="18" height="18" viewBox="0 0 16 16" fill={i<=n ? RED : "#333"}>
          <polygon points="8,1 10.1,6 15.5,6.3 11.5,9.8 12.8,15.1 8,12.1 3.2,15.1 4.5,9.8 0.5,6.3 5.9,6"/>
        </svg>
      ))}
    </div>
  );
}

function UploadCard({ index, colors, label, onUpload, uploadedImage, preferred, onPrefer, showPrefer }) {
  const ref = useRef();
  return (
    <div style={{
      position:"relative", aspectRatio:"3/4",
      background: uploadedImage ? "transparent" : colors[0],
      borderRadius:"4px", overflow:"hidden", cursor:"pointer",
      border: preferred ? `2px solid ${RED}` : "2px solid transparent",
      transition:"border 0.2s, transform 0.2s",
      boxShadow: preferred ? `0 0 20px ${RED_GLOW}` : "none"
    }}
      onClick={() => !uploadedImage && ref.current.click()}
      onMouseEnter={e => e.currentTarget.style.transform="scale(1.02)"}
      onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}
    >
      <input ref={ref} type="file" accept="image/*" style={{ display:"none" }}
        onChange={e => { const f=e.target.files[0]; if(f) onUpload(URL.createObjectURL(f)); }}
      />
      {uploadedImage ? (
        <img src={uploadedImage} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
      ) : (
        <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"12px" }}>
          <span style={{ fontSize:"52px", opacity:0.5 }}>{SYMBOLS[index % SYMBOLS.length]}</span>
          <div style={{ textAlign:"center" }}>
            <div style={{ fontSize:"28px", color:colors[1], marginBottom:"4px" }}>+</div>
            <p style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"13px", color:"#555", letterSpacing:"2px" }}>UPLOAD PHOTO</p>
          </div>
        </div>
      )}
      {/* overlay on hover */}
      <div className="card-overlay" style={{
        position:"absolute", inset:0,
        background:"linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 55%)",
        display:"flex", flexDirection:"column", justifyContent:"flex-end",
        padding:"16px", opacity: uploadedImage ? 1 : 0,
        transition:"opacity 0.3s"
      }}>
        {label && <p style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"15px", color:"#fff", margin:"0 0 2px", letterSpacing:"2px" }}>{label}</p>}
        {showPrefer && (
          <button onClick={e => { e.stopPropagation(); onPrefer(index); }} style={{
            background: preferred ? RED : "rgba(255,255,255,0.15)",
            border: `1px solid ${preferred ? RED : "rgba(255,255,255,0.3)"}`,
            color:"#fff", padding:"7px 14px", borderRadius:"3px",
            fontFamily:"'Bebas Neue', cursive", fontSize:"13px", letterSpacing:"2px",
            cursor:"pointer", marginTop:"6px", transition:"background 0.2s"
          }}>
            {preferred ? "✓ PREFERRED" : "ADD TO PREFERENCE"}
          </button>
        )}
      </div>
      {uploadedImage && !preferred && (
        <button onClick={e => { e.stopPropagation(); ref.current.click(); }} style={{
          position:"absolute", top:"8px", right:"8px", background:"rgba(0,0,0,0.7)",
          border:"1px solid #444", color:"#aaa", width:"28px", height:"28px", borderRadius:"50%",
          cursor:"pointer", fontSize:"14px", display:"flex", alignItems:"center", justifyContent:"center"
        }}>✕</button>
      )}
    </div>
  );
}

export default function Inkology() {
  const [galleryImgs, setGalleryImgs] = useState(Array(6).fill(null));
  const [designImgs, setDesignImgs] = useState(Array(6).fill(null));
  const [preferred, setPreferred] = useState([]);
  const [form, setForm] = useState({ name:"", email:"", phone:"", idea:"", placement:"", date:"" });
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [imgHover, setImgHover] = useState(null);

  const togglePrefer = (i) => setPreferred(p => p.includes(i) ? p.filter(x=>x!==i) : [...p, i]);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMenuOpen(false);
  };

  const designLabels = ["Midnight Moth","Sacred Geometry","Oni Mask","Snake & Skull","Chrysanthemum","Eye of Providence"];
  const galleryLabels = ["Japanese Koi","Geometric Wolf","Neo-Trad Rose","Mandala Sleeve","Realism Portrait","Serpent Dagger"];

  return (
    <div style={{ fontFamily:"'Oswald', sans-serif", background:"#080808", color:"#e8e2d9", minHeight:"100vh", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Oswald:wght@300;400;500;600&family=Permanent+Marker&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: ${RED}; color: #fff; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: ${RED}; }
        .card-overlay { opacity: 0 !important; }
        .upload-card:hover .card-overlay { opacity: 1 !important; }
        .upload-card-filled .card-overlay { opacity: 1 !important; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes scanline { 0%{top:-10%} 100%{top:110%} }
        .hero-title { animation: fadeUp 1s ease forwards; }
        .hero-sub { animation: fadeUp 1s ease 0.3s forwards; opacity:0; }
        .hero-cta { animation: fadeUp 1s ease 0.6s forwards; opacity:0; }
        input, textarea { background: #111 !important; color: #e8e2d9 !important; font-family: 'Oswald', sans-serif !important; font-size:16px !important; border: 1px solid #2a2a2a !important; padding: 14px 16px !important; width:100% !important; outline:none !important; border-radius:3px !important; transition: border 0.2s !important; }
        input:focus, textarea:focus { border-color: ${RED} !important; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(0.5); }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200,
        background:"rgba(6,6,6,0.95)", backdropFilter:"blur(16px)",
        borderBottom:"1px solid #1a1a1a",
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 2.5rem", height:"68px"
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          <div style={{ width:"32px", height:"32px", background:RED, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px" }}>☠</div>
          <span style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"30px", color:"#fff", letterSpacing:"4px" }}>
            INKOLOGY
          </span>
        </div>
        <div style={{ display:"flex", gap:"2rem" }}>
          {SECTIONS.map(s => (
            <button key={s} onClick={() => scrollTo(s.toLowerCase())} style={{
              background:"none", border:"none", cursor:"pointer",
              fontFamily:"'Bebas Neue', cursive", fontSize:"17px", letterSpacing:"3px",
              color:"#666", transition:"color 0.2s",
            }}
              onMouseEnter={e=>e.target.style.color=RED}
              onMouseLeave={e=>e.target.style.color="#666"}
            >{s}</button>
          ))}
        </div>
        <button onClick={()=>scrollTo("book")} style={{
          background:RED, color:"#fff", border:"none",
          fontFamily:"'Bebas Neue', cursive", fontSize:"16px", letterSpacing:"3px",
          padding:"10px 28px", cursor:"pointer", borderRadius:"3px", transition:"background 0.2s"
        }}
          onMouseEnter={e=>e.target.style.background=RED_DARK}
          onMouseLeave={e=>e.target.style.background=RED}
        >BOOK NOW</button>
      </nav>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight:"100vh", position:"relative", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
        {/* Real background image */}
        <img src={UNSPLASH_TATTOO} alt="tattoo artist" style={{
          position:"absolute", inset:0, width:"100%", height:"100%",
          objectFit:"cover", objectPosition:"center 30%", opacity:0.28
        }} onError={e => e.target.style.display="none"} />
        {/* Gradient overlay */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.6) 50%, rgba(8,8,8,1) 100%)" }} />
        {/* Scanline effect */}
        <div style={{ position:"absolute", inset:0, backgroundImage:"repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)", pointerEvents:"none", zIndex:2 }} />

        <div style={{ position:"relative", zIndex:3, textAlign:"center", padding:"0 2rem", maxWidth:"900px" }}>
          <p className="hero-sub" style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"18px", letterSpacing:"10px", color:RED, marginBottom:"20px", display:"block" }}>
            ✦ MUMBAI'S PREMIER TATTOO STUDIO ✦
          </p>
          <h1 className="hero-title" style={{
            fontFamily:"'Bebas Neue', cursive",
            fontSize:"clamp(80px, 18vw, 180px)",
            lineHeight:0.85, letterSpacing:"6px",
            color:"#fff",
            textShadow:"0 0 80px rgba(230,57,70,0.3)",
          }}>
            INK<span style={{ color:RED }}>OL</span>OGY
          </h1>
          <p className="hero-sub" style={{
            fontFamily:"'Oswald', sans-serif", fontSize:"clamp(16px, 2.5vw, 22px)",
            color:"#bbb", letterSpacing:"4px", margin:"24px 0 40px",
            fontWeight:300, textTransform:"uppercase"
          }}>
            Where Your Skin Becomes the Canvas
          </p>
          <div className="hero-cta" style={{ display:"flex", gap:"16px", justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>scrollTo("book")} style={{
              background:RED, color:"#fff", border:"none",
              fontFamily:"'Bebas Neue', cursive", fontSize:"20px", letterSpacing:"4px",
              padding:"16px 52px", cursor:"pointer", borderRadius:"3px",
              boxShadow:`0 0 30px ${RED_GLOW}`, transition:"all 0.2s"
            }}
              onMouseEnter={e=>{ e.target.style.background=RED_DARK; e.target.style.transform="scale(1.04)"; }}
              onMouseLeave={e=>{ e.target.style.background=RED; e.target.style.transform="scale(1)"; }}
            >BOOK A SESSION</button>
            <button onClick={()=>scrollTo("gallery")} style={{
              background:"transparent", color:"#fff",
              border:"2px solid rgba(255,255,255,0.3)",
              fontFamily:"'Bebas Neue', cursive", fontSize:"20px", letterSpacing:"4px",
              padding:"16px 52px", cursor:"pointer", borderRadius:"3px", transition:"all 0.2s"
            }}
              onMouseEnter={e=>{ e.target.style.borderColor="#fff"; }}
              onMouseLeave={e=>{ e.target.style.borderColor="rgba(255,255,255,0.3)"; }}
            >VIEW WORK</button>
          </div>
        </div>

        {/* Bottom strip stats */}
        <div style={{
          position:"absolute", bottom:0, left:0, right:0, zIndex:4,
          background:"rgba(0,0,0,0.85)", backdropFilter:"blur(8px)",
          borderTop:"1px solid #1a1a1a",
          display:"flex", justifyContent:"center", gap:"0"
        }}>
          {[["500+","TATTOOS DONE"],["8+","YEARS EXP"],["100%","CUSTOM ART"],["⭐ 4.9","RATED"]].map(([n,l],i)=>(
            <div key={i} style={{
              padding:"20px 48px", textAlign:"center",
              borderRight: i < 3 ? "1px solid #1a1a1a" : "none"
            }}>
              <div style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"32px", color:RED, letterSpacing:"2px" }}>{n}</div>
              <div style={{ fontFamily:"'Oswald', sans-serif", fontSize:"11px", color:"#666", letterSpacing:"3px", marginTop:"2px" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" style={{ padding:"100px 3rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          {/* Section header */}
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"50px", flexWrap:"wrap", gap:"1rem" }}>
            <div>
              <p style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"14px", letterSpacing:"6px", color:RED, marginBottom:"8px" }}>OUR WORK</p>
              <h2 style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"clamp(48px, 6vw, 80px)", color:"#fff", lineHeight:1, letterSpacing:"3px" }}>
                PAST <span style={{ WebkitTextStroke:"1px #fff", color:"transparent" }}>TATTOOS</span>
              </h2>
            </div>
            <p style={{ fontFamily:"'Oswald', sans-serif", fontWeight:300, fontSize:"15px", color:"#666", maxWidth:"320px", lineHeight:1.7 }}>
              Click any card to upload your own tattoo photos and build your portfolio
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"12px" }}>
            {galleryImgs.map((img, i) => (
              <div key={i} className={`upload-card ${img ? "upload-card-filled" : ""}`}
                style={{ position:"relative", aspectRatio:"3/4", background:placeholderColors[i][0], borderRadius:"4px", overflow:"hidden", cursor:"pointer", transition:"transform 0.25s" }}
                onMouseEnter={e=>e.currentTarget.style.transform="scale(1.02)"}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                onClick={() => !img && document.getElementById(`gal-upload-${i}`).click()}
              >
                <input id={`gal-upload-${i}`} type="file" accept="image/*" style={{ display:"none" }}
                  onChange={e=>{ const f=e.target.files[0]; if(f){ const u=URL.createObjectURL(f); setGalleryImgs(a=>{const n=[...a];n[i]=u;return n;}); }}}
                />
                {img ? (
                  <>
                    <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <button onClick={e=>{e.stopPropagation();setGalleryImgs(a=>{const n=[...a];n[i]=null;return n;});}} style={{
                      position:"absolute", top:"8px", right:"8px", background:"rgba(0,0,0,0.8)",
                      border:"1px solid #444", color:"#ccc", width:"30px", height:"30px",
                      borderRadius:"50%", cursor:"pointer", fontSize:"14px", zIndex:10
                    }}>✕</button>
                  </>
                ) : (
                  <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"10px" }}>
                    <div style={{ fontSize:"60px", opacity:0.15 }}>{SYMBOLS[i]}</div>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:"32px", color:placeholderColors[i][1], opacity:0.6 }}>+</div>
                      <p style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"12px", color:"#444", letterSpacing:"3px", marginTop:"4px" }}>CLICK TO UPLOAD</p>
                    </div>
                  </div>
                )}
                <div className="card-overlay" style={{
                  position:"absolute", inset:0,
                  background:"linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 50%)",
                  padding:"16px", display:"flex", flexDirection:"column", justifyContent:"flex-end"
                }}>
                  <span style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"18px", color:"#fff", letterSpacing:"2px" }}>{galleryLabels[i]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVAILABLE DESIGNS ── */}
      <section id="designs" style={{ padding:"100px 3rem", background:"#050505", borderTop:"1px solid #111", borderBottom:"1px solid #111" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"50px", flexWrap:"wrap", gap:"1rem" }}>
            <div>
              <p style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"14px", letterSpacing:"6px", color:RED, marginBottom:"8px" }}>CHOOSE YOURS</p>
              <h2 style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"clamp(48px, 6vw, 80px)", color:"#fff", lineHeight:1, letterSpacing:"3px" }}>
                AVAILABLE <span style={{ WebkitTextStroke:"1px #fff", color:"transparent" }}>DESIGNS</span>
              </h2>
            </div>
            <div style={{ textAlign:"right" }}>
              <p style={{ fontFamily:"'Oswald', sans-serif", fontWeight:300, fontSize:"15px", color:"#666", lineHeight:1.7 }}>
                Flash & custom designs ready to tattoo.<br/>Add to preference, we'll confirm your slot.
              </p>
              {preferred.length > 0 && (
                <div style={{ marginTop:"10px", background:RED, color:"#fff", display:"inline-block", padding:"6px 20px", borderRadius:"3px", fontFamily:"'Bebas Neue', cursive", fontSize:"16px", letterSpacing:"2px" }}>
                  {preferred.length} DESIGN{preferred.length > 1 ? "S" : ""} PREFERRED ✓
                </div>
              )}
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"12px" }}>
            {designImgs.map((img, i) => (
              <div key={i} className={`upload-card ${img ? "upload-card-filled" : ""}`}
                style={{
                  position:"relative", aspectRatio:"3/4",
                  background: designPlaceholders[i][0],
                  borderRadius:"4px", overflow:"hidden", cursor:"pointer",
                  border: preferred.includes(i) ? `2px solid ${RED}` : "2px solid transparent",
                  boxShadow: preferred.includes(i) ? `0 0 24px ${RED_GLOW}` : "none",
                  transition:"all 0.25s"
                }}
                onMouseEnter={e=>{ if(!preferred.includes(i)) e.currentTarget.style.transform="scale(1.02)"; }}
                onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                onClick={() => !img && document.getElementById(`des-upload-${i}`).click()}
              >
                <input id={`des-upload-${i}`} type="file" accept="image/*" style={{ display:"none" }}
                  onChange={e=>{ const f=e.target.files[0]; if(f){ const u=URL.createObjectURL(f); setDesignImgs(a=>{const n=[...a];n[i]=u;return n;}); }}}
                />
                {img ? (
                  <>
                    <img src={img} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                    <button onClick={e=>{e.stopPropagation();setDesignImgs(a=>{const n=[...a];n[i]=null;return n;});setPreferred(p=>p.filter(x=>x!==i));}} style={{
                      position:"absolute", top:"8px", right:"8px", background:"rgba(0,0,0,0.8)",
                      border:"1px solid #444", color:"#ccc", width:"30px", height:"30px",
                      borderRadius:"50%", cursor:"pointer", fontSize:"14px", zIndex:10
                    }}>✕</button>
                  </>
                ) : (
                  <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"10px" }}>
                    <div style={{ fontSize:"60px", opacity:0.15 }}>{SYMBOLS[(i+6) % SYMBOLS.length]}</div>
                    <div style={{ textAlign:"center" }}>
                      <div style={{ fontSize:"32px", color: designPlaceholders[i][1], opacity:0.6 }}>+</div>
                      <p style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"12px", color:"#444", letterSpacing:"3px", marginTop:"4px" }}>CLICK TO UPLOAD</p>
                    </div>
                  </div>
                )}
                {/* Overlay on hover */}
                <div className="card-overlay" style={{
                  position:"absolute", inset:0,
                  background:"linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 55%)",
                  padding:"16px", display:"flex", flexDirection:"column", justifyContent:"flex-end", gap:"8px"
                }}>
                  <span style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"19px", color:"#fff", letterSpacing:"2px" }}>{designLabels[i]}</span>
                  <button onClick={e=>{ e.stopPropagation(); togglePrefer(i); }} style={{
                    background: preferred.includes(i) ? RED : "rgba(255,255,255,0.12)",
                    border: `1px solid ${preferred.includes(i) ? RED : "rgba(255,255,255,0.25)"}`,
                    color:"#fff", padding:"10px 0", borderRadius:"3px",
                    fontFamily:"'Bebas Neue', cursive", fontSize:"14px", letterSpacing:"3px",
                    cursor:"pointer", transition:"all 0.2s", width:"100%"
                  }}
                    onMouseEnter={e=>{ if(!preferred.includes(i)) e.target.style.background="rgba(255,255,255,0.22)"; }}
                    onMouseLeave={e=>{ if(!preferred.includes(i)) e.target.style.background="rgba(255,255,255,0.12)"; }}
                  >
                    {preferred.includes(i) ? "✓ ADDED TO PREFERENCE" : "ADD TO PREFERENCE"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="reviews" style={{ padding:"100px 3rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"60px" }}>
            <p style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"14px", letterSpacing:"6px", color:RED, marginBottom:"8px" }}>REAL CLIENTS</p>
            <h2 style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"clamp(48px, 6vw, 80px)", color:"#fff", letterSpacing:"3px", lineHeight:1 }}>
              WHAT THEY <span style={{ WebkitTextStroke:"1px #fff", color:"transparent" }}>SAY</span>
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:"16px" }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background:"#0d0d0d",
                border:"1px solid #1a1a1a",
                borderTop: i < 2 ? `3px solid ${RED}` : "1px solid #1a1a1a",
                padding:"2.5rem", borderRadius:"4px",
                transition:"border-color 0.2s"
              }}
                onMouseEnter={e=>e.currentTarget.style.borderColor=RED}
                onMouseLeave={e=>e.currentTarget.style.borderColor= i<2 ? RED : "#1a1a1a"}
              >
                <Stars n={t.stars} />
                <p style={{ fontFamily:"'Oswald', sans-serif", fontWeight:300, fontSize:"18px", color:"#ccc", lineHeight:1.8, marginBottom:"1.5rem", fontStyle:"italic" }}>
                  "{t.review}"
                </p>
                <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                  <div style={{ width:"44px", height:"44px", background:RED, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Bebas Neue', cursive", fontSize:"20px", color:"#fff", flexShrink:0 }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"20px", color:"#fff", letterSpacing:"2px" }}>{t.name}</p>
                    <p style={{ fontFamily:"'Oswald', sans-serif", fontSize:"12px", color:RED, letterSpacing:"3px", textTransform:"uppercase", marginTop:"2px" }}>{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <section id="book" style={{ padding:"100px 3rem", background:"#050505", borderTop:"1px solid #111" }}>
        <div style={{ maxWidth:"820px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"60px" }}>
            <p style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"14px", letterSpacing:"6px", color:RED, marginBottom:"8px" }}>LET'S CREATE</p>
            <h2 style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"clamp(48px, 6vw, 80px)", color:"#fff", letterSpacing:"3px", lineHeight:1 }}>
              BOOK A <span style={{ color:RED }}>SESSION</span>
            </h2>
            <p style={{ fontFamily:"'Oswald', sans-serif", fontWeight:300, fontSize:"16px", color:"#666", marginTop:"16px", letterSpacing:"1px", lineHeight:1.7 }}>
              Ready to get inked? Fill in your details and we'll reach out within 24 hours.
            </p>
          </div>

          {submitted ? (
            <div style={{ textAlign:"center", padding:"5rem 2rem", border:`2px solid ${RED}`, background:"#0a0a0a", borderRadius:"4px", boxShadow:`0 0 40px ${RED_GLOW}` }}>
              <div style={{ fontSize:"64px", marginBottom:"1.5rem" }}>☠</div>
              <h3 style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"40px", color:RED, letterSpacing:"4px", marginBottom:"16px" }}>YOU'RE BOOKED IN</h3>
              <p style={{ fontFamily:"'Oswald', sans-serif", fontWeight:300, fontSize:"18px", color:"#999", lineHeight:1.8 }}>
                Thanks {form.name}! We'll hit you up within 24 hours to lock in your session.<br/>
                Get ready — your skin's about to be a masterpiece.
              </p>
              {preferred.length > 0 && (
                <p style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"16px", color:RED, marginTop:"20px", letterSpacing:"2px" }}>
                  {preferred.length} PREFERRED DESIGN{preferred.length>1?"S":""} NOTED ✓
                </p>
              )}
            </div>
          ) : (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px" }}>
              {[
                { label:"FULL NAME *", key:"name", type:"text", placeholder:"Your full name" },
                { label:"EMAIL ADDRESS *", key:"email", type:"email", placeholder:"your@email.com" },
                { label:"PHONE NUMBER", key:"phone", type:"tel", placeholder:"+91 XXXXX XXXXX" },
                { label:"PREFERRED DATE", key:"date", type:"date", placeholder:"" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"13px", letterSpacing:"3px", color:"#555", display:"block", marginBottom:"8px" }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={e=>setForm({...form,[f.key]:e.target.value})} />
                </div>
              ))}
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"13px", letterSpacing:"3px", color:"#555", display:"block", marginBottom:"8px" }}>BODY PLACEMENT</label>
                <input type="text" placeholder="e.g. inner forearm, upper back, ribs..." value={form.placement} onChange={e=>setForm({...form,placement:e.target.value})} />
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <label style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"13px", letterSpacing:"3px", color:"#555", display:"block", marginBottom:"8px" }}>DESCRIBE YOUR IDEA *</label>
                <textarea rows={6} placeholder="Tell us your vision — style (blackwork, realism, traditional...), size, meaning, reference images, anything!" value={form.idea} onChange={e=>setForm({...form,idea:e.target.value})} style={{ resize:"vertical" }} />
              </div>
              {preferred.length > 0 && (
                <div style={{ gridColumn:"1/-1", background:"#0d0d0d", border:`1px solid ${RED}22`, borderLeft:`3px solid ${RED}`, padding:"14px 18px", borderRadius:"3px" }}>
                  <p style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"14px", color:RED, letterSpacing:"3px" }}>
                    {preferred.length} PREFERRED DESIGN{preferred.length>1?"S":""} WILL BE INCLUDED IN YOUR REQUEST ✓
                  </p>
                </div>
              )}
              <div style={{ gridColumn:"1/-1" }}>
                <button onClick={()=>{ if(form.name && form.email && form.idea) setSubmitted(true); }} style={{
                  width:"100%", background:RED, color:"#fff", border:"none",
                  fontFamily:"'Bebas Neue', cursive", fontSize:"22px", letterSpacing:"5px",
                  padding:"20px", cursor:"pointer", borderRadius:"3px",
                  boxShadow:`0 4px 30px ${RED_GLOW}`, transition:"all 0.2s"
                }}
                  onMouseEnter={e=>{ e.target.style.background=RED_DARK; e.target.style.transform="scale(1.01)"; }}
                  onMouseLeave={e=>{ e.target.style.background=RED; e.target.style.transform="scale(1)"; }}
                >SEND BOOKING REQUEST →</button>
                <p style={{ fontFamily:"'Oswald', sans-serif", fontSize:"12px", color:"#444", textAlign:"center", marginTop:"12px", letterSpacing:"1px" }}>
                  * Required fields. We'll respond within 24 hours.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#030303", borderTop:"1px solid #111", padding:"3rem 3rem" }}>
        <div style={{ maxWidth:"1200px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1.5rem" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
            <div style={{ width:"28px", height:"28px", background:RED, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"14px" }}>☠</div>
            <span style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"24px", color:"#fff", letterSpacing:"4px" }}>INKOLOGY</span>
          </div>
          <p style={{ fontFamily:"'Oswald', sans-serif", fontSize:"13px", color:"#3a3a3a", letterSpacing:"1px" }}>
            © 2025 Inkology Studio · Mumbai, India · All Rights Reserved
          </p>
          <div style={{ display:"flex", gap:"1.5rem" }}>
            {["INSTAGRAM","FACEBOOK","WHATSAPP"].map(s=>(
              <span key={s} style={{ fontFamily:"'Bebas Neue', cursive", fontSize:"13px", letterSpacing:"3px", color:"#3a3a3a", cursor:"pointer", transition:"color 0.2s" }}
                onMouseEnter={e=>e.target.style.color=RED}
                onMouseLeave={e=>e.target.style.color="#3a3a3a"}
              >{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
