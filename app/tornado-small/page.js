'use client';
import { useEffect, useRef, useState } from 'react';
import './tornado.css';

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
function smoothStep(e0, e1, x) {
  const t = clamp((x - e0) / (e1 - e0), 0, 1);
  return t * t * (3 - 2 * t);
}

export default function TornadoSmallPage() {
  const videoRef       = useRef(null);
  const scrollWrapRef  = useRef(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady]       = useState(false);

  /* ── Scroll-linked video scrub ── */
  useEffect(() => {
    const video = videoRef.current;
    const wrap  = scrollWrapRef.current;
    if (!video || !wrap) return;

    /* When video can be decoded, mark ready */
    const onReady = () => setReady(true);
    if (video.readyState >= 2) {
      onReady();
    } else {
      video.addEventListener('canplay', onReady, { once: true });
    }

    let rafId;
    let targetTime = 0;
    let isSeeking  = false;
    let queued     = false;

    const commit = () => {
      if (!video.duration) return;
      const t = clamp(targetTime, 0, video.duration);
      if (Math.abs(video.currentTime - t) < 0.016) return; // ~1 frame at 60fps
      if (isSeeking) { queued = true; return; }
      isSeeking = true;
      video.currentTime = t;
    };

    const onSeeked = () => {
      isSeeking = false;
      if (queued) { queued = false; commit(); }
    };
    video.addEventListener('seeked', onSeeked);

    /* Scroll handler – only updates targetTime */
    const onScroll = () => {
      const rect    = wrap.getBoundingClientRect();
      const total   = wrap.offsetHeight - window.innerHeight;
      const p       = clamp(-rect.top / total, 0, 1);
      targetTime    = p * (video.duration || 5.04);
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    /* rAF loop drives the actual seek */
    const tick = () => {
      rafId = requestAnimationFrame(tick);
      commit();
    };
    tick();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      video.removeEventListener('seeked', onSeeked);
      video.removeEventListener('canplay', onReady);
    };
  }, []);

  const heroOpacity    = smoothStep(0.18, 0.06, progress);
  const taglineOpacity = smoothStep(0.36, 0.46, progress) * smoothStep(0.74, 0.64, progress);
  const ctaOpacity     = smoothStep(0.84, 0.94, progress);
  const scrollHint     = smoothStep(0.05, 0.0, progress);

  return (
    <main style={{ background: '#050505', color: '#fff', fontFamily: 'Raleway, sans-serif' }}>

      {/* ── 500 vh scroll container ── */}
      <div ref={scrollWrapRef} style={{ height: '500vh', position: 'relative' }}>

        {/* Sticky viewport */}
        <div style={{ position: 'sticky', top: 0, height: '100dvh', overflow: 'hidden' }}>

          {/* ── Native video – full product visible, no cropping ── */}
          <video
            ref={videoRef}
            src="/videos/tornado-small.mp4"
            muted
            playsInline
            preload="auto"
            className="ts-video"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              background: '#050505',
              pointerEvents: 'none',
            }}
          />

          {/* ── KlingAI watermark: bottom fade covers the embedded logo ── */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            height: '10%',
            background: 'linear-gradient(to top, #050505 40%, transparent)',
            pointerEvents: 'none', zIndex: 3,
          }} />

          {/* ── Vignette layer ── */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)',
          }} />

          {/* ── Film grain (SVG turbulence) ── */}
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06, pointerEvents: 'none' }} aria-hidden>
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>

          {/* ── Bottom gradient ── */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'linear-gradient(to top, rgba(5,5,5,0.8) 0%, transparent 35%)',
          }} />

          {/* Loading shimmer */}
          {!ready && (
            <div style={{
              position: 'absolute', inset: 0, background: '#050505', zIndex: 20,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  width: 160, height: 1, background: 'rgba(255,255,255,0.08)',
                  margin: '0 auto 14px', overflow: 'hidden', position: 'relative',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.4s infinite',
                  }} />
                </div>
                <p style={{ fontSize: '0.6rem', letterSpacing: '0.4em', color: 'rgba(255,255,255,0.25)' }}>
                  LOADING
                </p>
              </div>
            </div>
          )}

          {/* ════════════════════════════
              HERO OVERLAY  (progress 0–0.18)
          ════════════════════════════ */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: 'clamp(2rem, 5vw, 5rem)',
            opacity: heroOpacity,
            transition: 'opacity 0.08s linear',
          }}>
            <p style={{
              fontWeight: 300, fontSize: 'clamp(0.75rem, 1.1vw, 1rem)',
              letterSpacing: '0.12em', color: 'rgba(255,255,255,0.85)',
              marginBottom: '1.2rem',
              textShadow: '0 1px 20px rgba(0,0,0,0.8)',
              animation: ready ? 'fadeUp 0.7s ease-out 0.1s both' : 'none',
            }}>
              360度全方位へ音が拡がる、無指向性スピーカー
            </p>
            <div style={{
              width: 44, height: 1, background: '#C9A96E', marginBottom: '1.2rem',
              animation: ready ? 'lineGrow 0.9s ease-out 0.2s both' : 'none',
            }} />
            <p style={{
              fontWeight: 300, fontSize: 'clamp(0.6rem, 0.9vw, 0.8rem)',
              letterSpacing: '0.22em', color: '#C9A96E', marginBottom: '0.5rem',
              animation: ready ? 'fadeUp 0.7s ease-out 0.35s both' : 'none',
            }}>
              by GOKA SOUND LAB.
            </p>
            <div style={{ display: 'inline-block', alignSelf: 'flex-start' }}>
              <h1 style={{
                fontWeight: 200, fontSize: 'clamp(3.5rem, 10vw, 10rem)',
                lineHeight: 1.0, letterSpacing: '0em', margin: 0,
                animation: ready ? 'fadeUp 0.8s ease-out 0.15s both' : 'none',
              }}>
                Tornado
              </h1>
              <p style={{
                fontWeight: 200, fontSize: 'clamp(0.7rem, 1.4vw, 1.15rem)',
                letterSpacing: '0.65em', color: 'rgba(255,255,255,0.88)', marginTop: '0.25rem',
                textAlign: 'right',
                animation: ready ? 'fadeUp 0.8s ease-out 0.3s both' : 'none',
              }}>
                SMALL
              </p>
            </div>

            {/* Scroll hint */}
            <div style={{
              position: 'absolute', right: 'clamp(2rem, 5vw, 5rem)',
              bottom: 'clamp(2rem, 4vw, 4rem)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
              opacity: scrollHint, transition: 'opacity 0.4s',
            }}>
              <span style={{
                writingMode: 'vertical-rl', fontSize: '0.55rem', letterSpacing: '0.4em',
                color: 'rgba(255,255,255,0.35)',
              }}>SCROLL</span>
              <div style={{
                width: 1, height: 56,
                background: 'linear-gradient(to bottom, rgba(201,169,110,0.7), transparent)',
                animation: 'scrollPulse 2s ease-in-out infinite',
              }} />
            </div>
          </div>

          {/* ════════════════════════════
              TAGLINE  (progress 0.36–0.74)
          ════════════════════════════ */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: taglineOpacity,
            transition: 'opacity 0.06s linear',
          }}>
            <div style={{ textAlign: 'center', padding: '0 2rem' }}>
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic', fontWeight: 300,
                fontSize: 'clamp(1.6rem, 3.2vw, 3.8rem)',
                lineHeight: 1.75, color: '#fff',
                textShadow: '0 2px 60px rgba(0,0,0,0.95)',
                letterSpacing: '0.02em',
              }}>
                音は聞くものではなく、<br />そこにあるもの
              </p>
              <div style={{
                width: 36, height: 1, background: '#C9A96E',
                margin: '1.8rem auto 0',
              }} />
            </div>
          </div>

          {/* ════════════════════════════
              END CTA  (progress 0.84–1.0)
          ════════════════════════════ */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `rgba(5,5,5,${ctaOpacity * 0.45})`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            opacity: ctaOpacity,
            transition: 'opacity 0.06s linear',
            pointerEvents: ctaOpacity > 0.4 ? 'auto' : 'none',
          }}>
            <p style={{
              fontWeight: 300, fontSize: 'clamp(0.55rem, 0.85vw, 0.75rem)',
              letterSpacing: '0.35em', color: '#C9A96E', marginBottom: '0.8rem',
            }}>
              GOKA SOUND LAB.
            </p>
            <h2 style={{
              fontWeight: 200, fontSize: 'clamp(2.5rem, 7vw, 7rem)',
              letterSpacing: '0.02em', lineHeight: 1, margin: 0,
            }}>
              Tornado
            </h2>
            <p style={{
              fontWeight: 200, fontSize: 'clamp(0.65rem, 1.2vw, 1rem)',
              letterSpacing: '0.65em', color: 'rgba(255,255,255,0.8)',
              marginTop: '0.3rem', marginBottom: '3rem',
            }}>
              SMALL
            </p>
            <button
              style={{
                padding: '0.9rem 2.8rem',
                border: '1px solid rgba(201,169,110,0.5)',
                background: 'transparent', color: '#fff',
                fontFamily: 'Raleway, sans-serif', fontWeight: 300,
                fontSize: '0.7rem', letterSpacing: '0.28em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(201,169,110,0.1)';
                e.currentTarget.style.borderColor = '#C9A96E';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(201,169,110,0.5)';
              }}
            >
              Discover
            </button>
          </div>

          {/* Progress bar */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, height: 1,
            width: `${progress * 100}%`,
            background: 'linear-gradient(to right, transparent, #C9A96E)',
          }} />

        </div>
      </div>

      {/* ── Footer ── */}
      <footer style={{
        padding: '2rem clamp(2rem, 5vw, 5rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem', background: '#050505',
      }}>
        <div style={{ display: 'inline-block' }}>
          <p style={{
            fontFamily: 'Raleway, sans-serif', fontWeight: 200,
            fontSize: '1rem', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.4)',
            margin: 0,
          }}>Tornado</p>
          <p style={{
            fontFamily: 'Raleway, sans-serif', fontWeight: 200,
            fontSize: '0.6rem', letterSpacing: '0.5em', color: 'rgba(255,255,255,0.4)',
            textAlign: 'right', margin: 0,
          }}>SMALL</p>
        </div>
        <p style={{
          fontWeight: 300, fontSize: '0.6rem', letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.2)',
        }}>© GOKA SOUND LAB.</p>
      </footer>

    </main>
  );
}
