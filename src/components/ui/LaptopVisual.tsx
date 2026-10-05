import React, { useState } from 'react';
import { Product } from '../../types/product';
import { HERO_IMAGE_PATH } from '../../data/products';

export type StudioAngle = 'front' | 'angled' | 'thermal' | 'io';

interface LaptopVisualProps {
  product: Product;
  angle?: StudioAngle;
  className?: string;
  preferPhoto?: boolean;
}

/**
 * Renders high-contrast studio hardware imagery with a precision SVG studio silhouette
 * and multi-angle CAD hardware inspection views. Guarantees zero broken images.
 */
export const LaptopVisual: React.FC<LaptopVisualProps> = ({
  product,
  angle = 'front',
  className = '',
  preferPhoto = false
}) => {
  const [imgError, setImgError] = useState(false);

  // Use the generated studio flagship photograph when requested & valid
  const hasRealPhoto =
    preferPhoto && !imgError && product.image === HERO_IMAGE_PATH;

  const chassisPalettes = {
    'stealth-black': {
      lid: '#1F1F23',
      bezel: '#0D0D10',
      deck: '#1A1A1E',
      edge: '#3A3A42'
    },
    'obsidian-carbon': {
      lid: '#17181C',
      bezel: '#0B0C0E',
      deck: '#141519',
      edge: '#00E5FF'
    },
    'titanium-gray': {
      lid: '#2E3036',
      bezel: '#111215',
      deck: '#26282E',
      edge: '#525660'
    },
    'anodized-silver': {
      lid: '#3E424B',
      bezel: '#121316',
      deck: '#343840',
      edge: '#737985'
    }
  };

  const palette = chassisPalettes[product.chassisFinish] || chassisPalettes['stealth-black'];

  if (hasRealPhoto && angle === 'front') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#141416] flex items-center justify-center ${className}`}>
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/70 via-transparent to-transparent pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#151518] flex items-center justify-center select-none ${className}`}
    >
      {/* Subtle studio spotlight backdrop */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(0, 229, 255, 0.13), rgba(24, 24, 28, 0.2) 62%, transparent 100%)'
        }}
      />

      {/* Studio floor reflection plane */}
      <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-[#101012] to-transparent pointer-events-none" />

      {angle === 'front' && (
        <svg
          viewBox="0 0 400 280"
          className="w-[88%] h-[88%] drop-shadow-[0_18px_28px_rgba(0,0,0,0.85)] transition-transform duration-300 group-hover:scale-[1.03]"
          role="img"
          aria-label={`${product.brand} ${product.name} studio front view`}
        >
          <defs>
            <linearGradient id={`screen-${product.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
              {product.screenTheme === 'neural-core' && (
                <>
                  <stop offset="0%" stopColor="#091526" />
                  <stop offset="50%" stopColor="#0D2B3E" />
                  <stop offset="100%" stopColor="#050B12" />
                </>
              )}
              {product.screenTheme === 'cyber-grid' && (
                <>
                  <stop offset="0%" stopColor="#0A1922" />
                  <stop offset="60%" stopColor="#0E121A" />
                  <stop offset="100%" stopColor="#06222E" />
                </>
              )}
              {product.screenTheme === 'compiler-ide' && (
                <>
                  <stop offset="0%" stopColor="#0E1117" />
                  <stop offset="100%" stopColor="#161B24" />
                </>
              )}
              {product.screenTheme === 'studio-color' && (
                <>
                  <stop offset="0%" stopColor="#13192B" />
                  <stop offset="50%" stopColor="#0A2E3D" />
                  <stop offset="100%" stopColor="#1A1228" />
                </>
              )}
              {product.screenTheme === 'enterprise-clean' && (
                <>
                  <stop offset="0%" stopColor="#121820" />
                  <stop offset="100%" stopColor="#0B0E14" />
                </>
              )}
            </linearGradient>
            <linearGradient id={`deck-${product.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={palette.deck} />
              <stop offset="100%" stopColor="#0F1013" />
            </linearGradient>
          </defs>

          {/* Under-chassis ambient shadow & subtle cyan rim reflection */}
          <ellipse cx="200" cy="242" rx="158" ry="10" fill="rgba(0,0,0,0.75)" />
          {product.useCases.includes('gaming') && (
            <ellipse cx="200" cy="241" rx="115" ry="4" fill="rgba(0, 229, 255, 0.25)" />
          )}

          {/* Display Outer Shell / Lid */}
          <rect
            x="68"
            y="28"
            width="264"
            height="168"
            rx="7"
            fill={palette.bezel}
            stroke={palette.edge}
            strokeWidth="1.5"
          />

          {/* Active Display Panel (16:10 proportion) */}
          <rect
            x="75"
            y="35"
            width="250"
            height="152"
            rx="3"
            fill={`url(#screen-${product.id})`}
          />

          {/* Top webcam notch / sensor array */}
          <rect x="184" y="30" width="32" height="3" rx="1.5" fill="#27272D" />
          <circle cx="200" cy="31.5" r="1" fill="#00E5FF" opacity="0.8" />

          {/* Screen UI / Technical Graphic Artwork */}
          {product.screenTheme === 'compiler-ide' ? (
            <g opacity="0.85">
              {/* IDE Code window simulation */}
              <rect x="88" y="48" width="224" height="124" rx="3" fill="#0B0D12" stroke="#222632" strokeWidth="1" />
              <line x1="125" y1="48" x2="125" y2="172" stroke="#1E222D" strokeWidth="1" />
              {/* Code lines */}
              <rect x="135" y="58" width="54" height="3.5" rx="1.5" fill="#00E5FF" opacity="0.8" />
              <rect x="135" y="67" width="98" height="3" rx="1.5" fill="#4B5563" />
              <rect x="145" y="75" width="120" height="3" rx="1.5" fill="#6B7280" />
              <rect x="145" y="83" width="82" height="3" rx="1.5" fill="#00E5FF" opacity="0.5" />
              <rect x="135" y="95" width="110" height="3" rx="1.5" fill="#4B5563" />
              <rect x="145" y="103" width="140" height="3" rx="1.5" fill="#374151" />
              {/* Terminal Graph */}
              <polyline
                points="135,152 155,144 175,148 195,132 215,136 235,122 255,127 285,112"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="1.75"
              />
            </g>
          ) : (
            <g>
              {/* Geometric Neural / Hardware Mesh on Display */}
              <circle
                cx="200"
                cy="108"
                r="46"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="0.75"
                strokeDasharray="4 3"
                opacity="0.45"
              />
              <circle
                cx="200"
                cy="108"
                r="28"
                fill="rgba(0, 229, 255, 0.08)"
                stroke="#00E5FF"
                strokeWidth="1.2"
                opacity="0.75"
              />
              <path
                d="M115 152 L168 108 L200 124 L242 86 L285 138"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="1.5"
                opacity="0.65"
              />
              <line x1="85" y1="168" x2="315" y2="168" stroke="#00E5FF" strokeWidth="0.5" opacity="0.3" />
            </g>
          )}

          {/* Brand & Key GPU Watermark on Screen Corner */}
          <text
            x="86"
            y="52"
            fill="#F5F5F5"
            fontSize="8.5"
            fontWeight="700"
            fontFamily="Syne, sans-serif"
            letterSpacing="0.08em"
            opacity="0.85"
          >
            {product.brand.toUpperCase()}
          </text>
          <text
            x="314"
            y="52"
            textAnchor="end"
            fill="#00E5FF"
            fontSize="8"
            fontWeight="600"
            fontFamily="JetBrains Mono, monospace"
            opacity="0.9"
          >
            {product.gpuShort} · {product.refreshRate}
          </text>

          {/* Precision Hinge Assembly */}
          <rect x="112" y="195" width="176" height="5" rx="1" fill="#121215" />

          {/* Lower Keyboard Deck (Perspective Trapezoid) */}
          <polygon
            points="68,200 332,200 364,234 36,234"
            fill={`url(#deck-${product.id})`}
            stroke={palette.edge}
            strokeWidth="1.2"
          />

          {/* Backlit Keyboard Well */}
          <polygon
            points="84,205 316,205 330,221 70,221"
            fill="#0E0E11"
            stroke="rgba(0, 229, 255, 0.32)"
            strokeWidth="0.8"
          />

          {/* Precision Trackpad */}
          <polygon
            points="166,223 234,223 238,232 162,232"
            fill="#18191E"
            stroke="#2E3038"
            strokeWidth="0.7"
          />

          {/* Front Lip Edge + Cyan Underglow Bar */}
          <rect
            x="36"
            y="234"
            width="328"
            height="5"
            rx="2"
            fill={palette.lid}
            stroke={palette.edge}
            strokeWidth="0.8"
          />
          <rect x="176" y="234" width="48" height="2.2" rx="1" fill="#00E5FF" opacity="0.85" />
        </svg>
      )}

      {angle === 'angled' && (
        <svg
          viewBox="0 0 400 280"
          className="w-[88%] h-[88%] drop-shadow-[0_18px_28px_rgba(0,0,0,0.85)]"
          role="img"
          aria-label={`${product.brand} ${product.name} angled chassis profile`}
        >
          <ellipse cx="205" cy="240" rx="145" ry="12" fill="rgba(0,0,0,0.75)" />
          {/* Isometric 3/4 Angled Display */}
          <polygon
            points="95,32 305,48 292,192 82,174"
            fill={palette.bezel}
            stroke="#00E5FF"
            strokeWidth="1.2"
          />
          <polygon
            points="102,40 298,55 286,184 90,167"
            fill="#0B1520"
          />
          {/* Isometric Angled Base Deck */}
          <polygon
            points="82,174 292,192 348,228 132,208"
            fill={palette.deck}
            stroke={palette.edge}
            strokeWidth="1.2"
          />
          {/* Keyboard Illumination Matrix */}
          <polygon
            points="102,180 282,196 314,215 130,198"
            fill="#111318"
            stroke="rgba(0,229,255,0.45)"
            strokeWidth="0.9"
          />
          <text
            x="195"
            y="115"
            textAnchor="middle"
            fill="#00E5FF"
            fontSize="11"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
          >
            {product.weight} · {product.displayResolution}
          </text>
          <text
            x="195"
            y="134"
            textAnchor="middle"
            fill="#A3A3A3"
            fontSize="9"
            fontFamily="Plus Jakarta Sans, sans-serif"
          >
             CNC Precision Chassis Profile
          </text>
        </svg>
      )}

      {angle === 'thermal' && (
        <svg
          viewBox="0 0 400 280"
          className="w-[88%] h-[88%]"
          role="img"
          aria-label={`${product.brand} ${product.name} thermal cooling architecture`}
        >
          {/* Vapor Chamber & Dual Fan CAD Diagram */}
          <rect
            x="64"
            y="42"
            width="272"
            height="196"
            rx="10"
            fill="#121317"
            stroke="#2A2A2A"
            strokeWidth="1.5"
          />
          {/* Top exhaust fins */}
          {[88, 108, 128, 148, 252, 272, 292, 312].map((x) => (
            <rect key={x} x={x} y="42" width="10" height="8" fill="#00E5FF" opacity="0.55" />
          ))}
          {/* Dual High-Static Pressure Fans */}
          <circle cx="132" cy="128" r="42" fill="#181A20" stroke="#00E5FF" strokeWidth="1.5" />
          <circle cx="132" cy="128" r="14" fill="#0E1014" stroke="#00E5FF" strokeWidth="1" />
          <circle cx="268" cy="128" r="42" fill="#181A20" stroke="#00E5FF" strokeWidth="1.5" />
          <circle cx="268" cy="128" r="14" fill="#0E1014" stroke="#00E5FF" strokeWidth="1" />
          {/* Copper / Vapor Heatpipes */}
          <path
            d="M132 95 L268 95 M132 160 L268 160 M160 128 L240 128"
            stroke="#00A8CC"
            strokeWidth="6"
            strokeLinecap="round"
            opacity="0.7"
          />
          {/* Central Die (CPU + GPU) */}
          <rect
            x="174"
            y="108"
            width="52"
            height="40"
            rx="4"
            fill="#0D1922"
            stroke="#00E5FF"
            strokeWidth="1.5"
          />
          <text
            x="200"
            y="131"
            textAnchor="middle"
            fill="#00E5FF"
            fontSize="8.5"
            fontFamily="JetBrains Mono, monospace"
          >
            {product.gpuTgp.split(' ')[0]}
          </text>
          <text
            x="200"
            y="216"
            textAnchor="middle"
            fill="#A3A3A3"
            fontSize="9.5"
            fontFamily="JetBrains Mono, monospace"
          >
            THERMAL ARCHITECTURE · {product.battery.split(' ')[0]} BATTERY
          </text>
        </svg>
      )}

      {angle === 'io' && (
        <svg
          viewBox="0 0 400 280"
          className="w-[88%] h-[88%]"
          role="img"
          aria-label={`${product.brand} ${product.name} I/O ports schematic`}
        >
          {/* Left & Right Chassis Profile Bars */}
          <rect
            x="40"
            y="78"
            width="320"
            height="36"
            rx="6"
            fill="#1A1C22"
            stroke="#2E323B"
            strokeWidth="1.5"
          />
          {/* Port cutouts */}
          <rect x="64" y="91" width="22" height="10" rx="2" fill="#0B0C0E" stroke="#00E5FF" strokeWidth="1.2" />
          <rect x="102" y="92" width="16" height="8" rx="4" fill="#0B0C0E" stroke="#00E5FF" strokeWidth="1.2" />
          <rect x="132" y="92" width="16" height="8" rx="4" fill="#0B0C0E" stroke="#00E5FF" strokeWidth="1.2" />
          <rect x="166" y="90" width="26" height="11" rx="1.5" fill="#0B0C0E" stroke="#737373" strokeWidth="1" />
          <rect x="208" y="90" width="26" height="11" rx="1.5" fill="#0B0C0E" stroke="#737373" strokeWidth="1" />
          <circle cx="256" cy="96" r="4.5" fill="#0B0C0E" stroke="#737373" strokeWidth="1" />

          <text x="40" y="66" fill="#A3A3A3" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
            HIGH-BANDWIDTH I/O ARCHITECTURE
          </text>

          {product.ports.slice(0, 4).map((port, idx) => (
            <g key={idx} transform={`translate(45, ${142 + idx * 24})`}>
              <circle cx="6" cy="-3" r="2.5" fill="#00E5FF" />
              <text x="18" y="0" fill="#F5F5F5" fontSize="10" fontFamily="JetBrains Mono, monospace">
                {port}
              </text>
            </g>
          ))}
        </svg>
      )}
    </div>
  );
};
