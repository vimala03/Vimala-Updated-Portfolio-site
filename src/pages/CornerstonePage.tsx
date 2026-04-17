import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './cornerstone.css'

/* ─── Case study order (used by next-proj click handler) ─── */
const caseStudyOrder = [
  { slug: 'cornerstone', title: 'Cornerstone OnDemand · AI Workflows' },
  { slug: 'buildzar',    title: 'Buildzar' },
  { slug: 'moonraft',   title: 'Moonraft – UST Global' },
]

const html = `
<div id="progress"></div>


<!-- ═══ HERO ═══ -->
<div class="hero">
  <div class="hero-tags">
    <span class="htag dk">Senior Product Designer</span>
    <span class="htag bl">AI Workflow · Apollo AI</span>
    <span class="htag">Enterprise SaaS</span>
    <span class="htag">Desktop</span>
    <span class="htag">2024–2025</span>
  </div>
  <h1>Goodbye admin fatigue,<br>hello <em>intelligent</em> workflows.</h1>
  <p class="hero-sub">Redesigning Cornerstone OnDemand's Content Manager with AI-powered metadata, seamless multilingual translation, and smart session continuity.</p>
  <div class="meta-strip">
    <div class="ms"><div class="ms-l">Company</div><div class="ms-v">Cornerstone OnDemand</div></div>
    <div class="ms"><div class="ms-l">Product</div><div class="ms-v">CSX Platform</div></div>
    <div class="ms"><div class="ms-l">My role</div><div class="ms-v">Sr. Product Designer</div></div>
    <div class="ms"><div class="ms-l">Domain</div><div class="ms-v">Workforce Agility</div></div>
    <div class="ms"><div class="ms-l">Timeline</div><div class="ms-v">July 2024 – Sept 2025</div></div>
  </div>
</div>

<!-- hero screen -->
<div class="hero-vis">
  <svg viewBox="0 0 960 300" xmlns="http://www.w3.org/2000/svg" style="display:block;max-width:860px;margin:0 auto;">
    <rect x="20" y="0" width="920" height="290" rx="12" fill="white" fill-opacity="0.85"/>
    <rect x="20" y="0" width="920" height="38" rx="12" fill="white" fill-opacity="0.96"/>
    <rect x="20" y="26" width="920" height="12" fill="white" fill-opacity="0.96"/>
    <circle cx="44" cy="19" r="5.5" fill="#f5c0b8"/><circle cx="61" cy="19" r="5.5" fill="#f5e0b8"/><circle cx="78" cy="19" r="5.5" fill="#c0f0d0"/>
    <rect x="110" y="11" width="340" height="16" rx="8" fill="#f0ede8"/>
    <rect x="122" y="16" width="10" height="6" rx="3" fill="#c8c4bc"/><rect x="137" y="17" width="90" height="4" rx="2" fill="#d8d4cc"/>
    <!-- app nav -->
    <rect x="30" y="42" width="900" height="34" fill="#faf9f7"/>
    <rect x="44" y="50" width="88" height="18" rx="4" fill="#e85c23"/><rect x="50" y="55" width="76" height="8" rx="3" fill="white" fill-opacity="0.9"/>
    <rect x="195" y="55" width="48" height="8" rx="3" fill="#c8c4bc"/>
    <rect x="254" y="55" width="66" height="8" rx="3" fill="#c8c4bc"/>
    <rect x="332" y="55" width="52" height="8" rx="3" fill="#c8c4bc"/>
    <circle cx="878" cy="59" r="9" fill="#f0ede8"/>
    <circle cx="902" cy="59" r="9" fill="#1a4f8a"/>
    <circle cx="926" cy="59" r="14" fill="#e8b8a0"/>
    <!-- content manager heading -->
    <rect x="44" y="86" width="190" height="1" fill="#e8e4dc"/>
    <rect x="44" y="94" width="160" height="16" rx="3" fill="#1a1a18"/>
    <!-- big search -->
    <rect x="44" y="118" width="720" height="26" rx="13" fill="#f0ede8" stroke="#e0dcd8" stroke-width="0.5"/>
    <circle cx="60" cy="131" r="6" fill="#b8b4ad"/>
    <rect x="73" y="128" width="110" height="6" rx="3" fill="#d0ccc8"/>
    <rect x="775" y="122" width="78" height="18" rx="9" fill="#f0ede8"/>
    <rect x="781" y="127" width="50" height="6" rx="3" fill="#b8b4ad"/>
    <!-- tabs -->
    <rect x="44" y="154" width="74" height="20" rx="3" fill="#1a4f8a" fill-opacity="0.1"/>
    <rect x="44" y="170" width="74" height="2" rx="1" fill="#1a4f8a"/>
    <rect x="48" y="159" width="66" height="7" rx="2" fill="#1a4f8a" fill-opacity="0.6"/>
    <rect x="128" y="159" width="58" height="7" rx="2" fill="#b8b4ad"/>
    <rect x="196" y="159" width="52" height="7" rx="2" fill="#b8b4ad"/>
    <rect x="258" y="159" width="76" height="7" rx="2" fill="#b8b4ad"/>
    <rect x="344" y="159" width="80" height="7" rx="2" fill="#b8b4ad"/>
    <!-- table header -->
    <rect x="44" y="182" width="810" height="1" fill="#e8e4dc"/>
    <rect x="44" y="188" width="38" height="5" rx="2" fill="#b8b4ad"/>
    <rect x="130" y="188" width="96" height="5" rx="2" fill="#b8b4ad"/>
    <rect x="346" y="188" width="58" height="5" rx="2" fill="#b8b4ad"/>
    <rect x="464" y="188" width="58" height="5" rx="2" fill="#b8b4ad"/>
    <rect x="582" y="188" width="48" height="5" rx="2" fill="#b8b4ad"/>
    <rect x="650" y="188" width="58" height="5" rx="2" fill="#b8b4ad"/>
    <!-- rows -->
    <rect x="44" y="202" width="810" height="1" fill="#e8e4dc"/>
    <rect x="44" y="208" width="22" height="12" rx="3" fill="#f0ede8"/>
    <rect x="74" y="210" width="48" height="10" rx="5" fill="#e8f0fa"/><rect x="78" y="213" width="40" height="4" rx="2" fill="#378add" fill-opacity="0.6"/>
    <rect x="130" y="210" width="192" height="5" rx="2" fill="#1a4f8a" fill-opacity="0.55"/>
    <rect x="346" y="210" width="78" height="5" rx="2" fill="#d8d4cc"/>
    <rect x="464" y="210" width="58" height="5" rx="2" fill="#d8d4cc"/>
    <rect x="582" y="210" width="48" height="5" rx="2" fill="#d8d4cc"/>
    <rect x="738" y="207" width="34" height="11" rx="4" fill="#e8f0fa"/><rect x="744" y="210" width="22" height="5" rx="2" fill="#378add" fill-opacity="0.6"/>

    <rect x="44" y="224" width="810" height="1" fill="#e8e4dc"/>
    <rect x="44" y="230" width="22" height="12" rx="3" fill="#f0ede8"/>
    <rect x="74" y="232" width="62" height="10" rx="5" fill="#fdf0dc"/><rect x="78" y="235" width="54" height="4" rx="2" fill="#7a4a10" fill-opacity="0.5"/>
    <rect x="130" y="232" width="172" height="5" rx="2" fill="#1a4f8a" fill-opacity="0.55"/>
    <rect x="346" y="232" width="68" height="5" rx="2" fill="#d8d4cc"/>
    <rect x="464" y="232" width="58" height="5" rx="2" fill="#d8d4cc"/>
    <rect x="582" y="232" width="58" height="5" rx="2" fill="#d8d4cc"/>
    <rect x="738" y="229" width="34" height="11" rx="4" fill="#e4f2ea"/><rect x="744" y="232" width="22" height="5" rx="2" fill="#1e6640" fill-opacity="0.6"/>

    <rect x="44" y="246" width="810" height="1" fill="#e8e4dc"/>
    <rect x="44" y="252" width="22" height="12" rx="3" fill="#f0ede8"/>
    <rect x="74" y="254" width="48" height="10" rx="5" fill="#e8f0fa"/><rect x="78" y="257" width="40" height="4" rx="2" fill="#378add" fill-opacity="0.6"/>
    <rect x="130" y="254" width="210" height="5" rx="2" fill="#1a4f8a" fill-opacity="0.55"/>
    <rect x="346" y="254" width="88" height="5" rx="2" fill="#d8d4cc"/>
    <rect x="464" y="254" width="58" height="5" rx="2" fill="#d8d4cc"/>
    <rect x="582" y="254" width="48" height="5" rx="2" fill="#d8d4cc"/>
    <rect x="738" y="251" width="34" height="11" rx="4" fill="#e8f0fa"/><rect x="744" y="254" width="22" height="5" rx="2" fill="#378add" fill-opacity="0.6"/>

    <!-- Apollo panel -->
    <rect x="772" y="84" width="160" height="196" rx="10" fill="white" stroke="#e0dcd8" stroke-width="0.5"/>
    <rect x="772" y="84" width="160" height="32" rx="10" fill="#1a4f8a"/>
    <rect x="772" y="104" width="160" height="12" fill="#1a4f8a"/>
    <circle cx="786" cy="100" r="6.5" fill="#378add" fill-opacity="0.5"/>
    <rect x="796" y="96" width="56" height="6" rx="3" fill="white" fill-opacity="0.8"/>
    <rect x="782" y="124" width="56" height="4" rx="2" fill="#378add" fill-opacity="0.4"/>
    <rect x="782" y="132" width="136" height="3.5" rx="1.5" fill="#e0dcd8"/>
    <rect x="782" y="139" width="116" height="3.5" rx="1.5" fill="#e0dcd8"/>
    <rect x="782" y="146" width="128" height="3.5" rx="1.5" fill="#e0dcd8"/>
    <rect x="782" y="156" width="46" height="5" rx="2" fill="#c8c4bc"/>
    <rect x="836" y="154" width="38" height="9" rx="4.5" fill="#e4f2ea"/><rect x="840" y="157" width="30" height="3" rx="1.5" fill="#1e6640" fill-opacity="0.6"/>
    <rect x="782" y="168" width="126" height="3.5" rx="1.5" fill="#e0dcd8"/>
    <rect x="782" y="175" width="106" height="3.5" rx="1.5" fill="#e0dcd8"/>
    <rect x="782" y="185" width="46" height="5" rx="2" fill="#c8c4bc"/>
    <rect x="836" y="183" width="38" height="9" rx="4.5" fill="#e4f2ea"/><rect x="840" y="186" width="30" height="3" rx="1.5" fill="#1e6640" fill-opacity="0.6"/>
    <rect x="782" y="197" width="118" height="3.5" rx="1.5" fill="#e0dcd8"/>
    <rect x="782" y="204" width="96" height="3.5" rx="1.5" fill="#e0dcd8"/>
    <!-- ask input -->
    <rect x="776" y="220" width="152" height="20" rx="10" fill="#f0ede8"/>
    <rect x="785" y="226" width="76" height="4" rx="2" fill="#c8c4bc"/>
    <circle cx="920" cy="230" r="7" fill="#1a4f8a"/>
    <rect x="917" y="227" width="6" height="6" rx="1" fill="white" fill-opacity="0.8"/>
    <!-- create new btn -->
    <rect x="858" y="94" width="62" height="20" rx="5" fill="white" fill-opacity="0.2"/>
    <rect x="862" y="99" width="54" height="8" rx="3" fill="white" fill-opacity="0.7"/>
  </svg>
</div>

<!-- ═══ TLDR ═══ -->
<div class="tldr">
  <div class="tldr-ey">Got 30 seconds?</div>
  <h2>Quickly know what we did!</h2>
  <p class="tldr-sub">For the time-pressed reader</p>
  <p class="tldr-body">We redesigned Cornerstone OnDemand's <strong>Content Manager</strong> by embedding <strong>Apollo AI</strong> directly into the workflow. AI now auto-generates metadata, powers instant multilingual translation, and remembers exactly where admins left off. What once took 1,700 minutes per month now takes 160.</p>
  <div class="tldr-stats">
    <div class="ts"><div class="ts-n" data-target="91">0%</div><div class="ts-l">Metadata time saved</div></div>
    <div class="ts"><div class="ts-n" data-target="90">0%</div><div class="ts-l">Translation time cut</div></div>
    <div class="ts"><div class="ts-n">−15K</div><div class="ts-l">Support cases/year</div></div>
    <div class="ts"><div class="ts-n">1-Click</div><div class="ts-l">Any admin action</div></div>
  </div>
</div>

<div class="ch-wrap">

<!-- ═══ TEAM ═══ -->
<div class="chapter reveal">
  <div class="ch-num">01</div>
  <div class="ch-label">Meet the team</div>
  <div class="ch-title">Four people, <em>one shared mission.</em></div>
  <div class="team-grid">
    <div class="team-card reveal reveal-delay-1">
      <div class="team-avatar">
        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
          <rect width="160" height="160" fill="#e8e4dc"/>
          <rect x="30" y="105" width="100" height="55" rx="8" fill="#2d4a7a"/>
          <rect x="66" y="95" width="28" height="18" fill="#c8a882"/>
          <ellipse cx="80" cy="78" rx="32" ry="34" fill="#c8a882"/>
          <ellipse cx="80" cy="52" rx="32" ry="18" fill="#1a1208"/>
          <rect x="48" y="52" width="64" height="12" fill="#1a1208"/>
          <ellipse cx="68" cy="78" rx="5" ry="5.5" fill="white"/>
          <ellipse cx="92" cy="78" rx="5" ry="5.5" fill="white"/>
          <circle cx="70" cy="79" r="3" fill="#2a1a08"/>
          <circle cx="94" cy="79" r="3" fill="#2a1a08"/>
          <path d="M62 71 Q68 68 74 71" stroke="#1a1208" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M86 71 Q92 68 98 71" stroke="#1a1208" stroke-width="2" fill="none" stroke-linecap="round"/>
          <ellipse cx="80" cy="88" rx="4" ry="3" fill="#b8946a"/>
          <path d="M70 96 Q80 102 90 96" stroke="#8a5a3a" stroke-width="2" fill="none" stroke-linecap="round"/>
          <rect x="62" y="74" width="12" height="9" rx="4" fill="none" stroke="#3a3a3a" stroke-width="1.5"/>
          <rect x="86" y="74" width="12" height="9" rx="4" fill="none" stroke="#3a3a3a" stroke-width="1.5"/>
          <line x1="74" y1="79" x2="86" y2="79" stroke="#3a3a3a" stroke-width="1.5"/>
          <path d="M55 110 L80 122 L105 110" stroke="white" stroke-width="2" fill="none"/>
        </svg>
      </div>
      <div class="team-name">Akshay</div>
      <div class="team-role">Gen AI Engineer</div>
    </div>
    <div class="team-card reveal reveal-delay-2">
      <div class="team-avatar">
        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
          <rect width="160" height="160" fill="#e8e4dc"/>
          <rect x="28" y="105" width="104" height="55" rx="8" fill="#1a1a18"/>
          <rect x="66" y="96" width="28" height="16" fill="#e8c49a"/>
          <ellipse cx="80" cy="78" rx="30" ry="32" fill="#e8c49a"/>
          <rect x="34" y="108" width="92" height="52" rx="8" fill="#1a1a18"/>
          <rect x="68" y="108" width="24" height="52" fill="white"/>
          <path d="M76 110 L80 130 L84 110" fill="#8a1a1a"/>
          <rect x="78" y="108" width="4" height="4" fill="#8a1a1a"/>
          <path d="M54 112 L76 108 L80 118 L84 108 L106 112" stroke="white" stroke-width="1.5" fill="none"/>
          <ellipse cx="80" cy="78" rx="30" ry="32" fill="#e8c49a"/>
          <ellipse cx="80" cy="53" rx="30" ry="15" fill="#c8a870"/>
          <rect x="50" y="53" width="60" height="10" fill="#c8a870"/>
          <ellipse cx="68" cy="78" rx="5" ry="5" fill="white"/>
          <ellipse cx="92" cy="78" rx="5" ry="5" fill="white"/>
          <circle cx="69.5" cy="79" r="2.5" fill="#2a2218"/>
          <circle cx="93.5" cy="79" r="2.5" fill="#2a2218"/>
          <path d="M62 71 Q68 69 74 71" stroke="#a08050" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M86 71 Q92 69 98 71" stroke="#a08050" stroke-width="2" fill="none" stroke-linecap="round"/>
          <ellipse cx="80" cy="87" rx="4" ry="3" fill="#d8a87a"/>
          <path d="M71 95 Q80 101 89 95" stroke="#a07858" stroke-width="2" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="team-name">Yoni</div>
      <div class="team-role">Engineering Director</div>
    </div>
    <div class="team-card reveal reveal-delay-3">
      <div class="team-avatar">
        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
          <rect width="160" height="160" fill="#e8e4dc"/>
          <rect x="30" y="106" width="100" height="54" rx="8" fill="#2a6a3a"/>
          <rect x="66" y="96" width="28" height="16" fill="#c09070"/>
          <ellipse cx="80" cy="78" rx="31" ry="33" fill="#c09070"/>
          <ellipse cx="80" cy="52" rx="31" ry="17" fill="#0f0a04"/>
          <rect x="49" y="52" width="62" height="12" fill="#0f0a04"/>
          <ellipse cx="68" cy="78" rx="5" ry="5.5" fill="white"/>
          <ellipse cx="92" cy="78" rx="5" ry="5.5" fill="white"/>
          <circle cx="70" cy="79.5" r="3" fill="#180e06"/>
          <circle cx="94" cy="79.5" r="3" fill="#180e06"/>
          <rect x="61" y="74" width="13" height="10" rx="5" fill="none" stroke="#1a1a18" stroke-width="2"/>
          <rect x="85" y="74" width="13" height="10" rx="5" fill="none" stroke="#1a1a18" stroke-width="2"/>
          <line x1="74" y1="79" x2="85" y2="79" stroke="#1a1a18" stroke-width="1.5"/>
          <path d="M61 71 Q68 68 75 71" stroke="#0f0a04" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M85 71 Q92 68 99 71" stroke="#0f0a04" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <ellipse cx="80" cy="88" rx="4" ry="3" fill="#a87858"/>
          <path d="M69 97 Q80 104 91 97" stroke="#7a4a28" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M50 110 L80 120 L110 110" stroke="#1e4a2a" stroke-width="2" fill="none"/>
        </svg>
      </div>
      <div class="team-name">Sailesh</div>
      <div class="team-role">Product Manager</div>
    </div>
    <div class="team-card me reveal reveal-delay-3">
      <div class="team-avatar">
        <svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg">
          <rect width="160" height="160" fill="#f5efe8"/>
          <rect x="25" y="104" width="110" height="56" rx="8" fill="#c84a8a"/>
          <path d="M25 112 Q50 120 80 112 Q110 104 135 112 L135 125 Q110 117 80 125 Q50 133 25 125 Z" fill="#8a2a6a" fill-opacity="0.4"/>
          <rect x="68" y="96" width="24" height="16" fill="#c09070"/>
          <ellipse cx="80" cy="76" rx="30" ry="32" fill="#c09070"/>
          <circle cx="80" cy="62" r="3" fill="#c84a4a"/>
          <ellipse cx="80" cy="52" rx="30" ry="16" fill="#0a0604"/>
          <rect x="50" y="52" width="60" height="12" fill="#0a0604"/>
          <ellipse cx="110" cy="58" rx="12" ry="10" fill="#0a0604"/>
          <circle cx="50" cy="80" r="3.5" fill="#e8a030"/>
          <circle cx="110" cy="80" r="3.5" fill="#e8a030"/>
          <ellipse cx="68" cy="78" rx="6" ry="6.5" fill="white"/>
          <ellipse cx="92" cy="78" rx="6" ry="6.5" fill="white"/>
          <circle cx="70" cy="79" r="3.5" fill="#180e06"/>
          <circle cx="94" cy="79" r="3.5" fill="#180e06"/>
          <circle cx="71.5" cy="77.5" r="1.2" fill="white"/>
          <circle cx="95.5" cy="77.5" r="1.2" fill="white"/>
          <path d="M61 77 Q68 73 75 77" stroke="#0a0604" stroke-width="1.5" fill="none"/>
          <path d="M85 77 Q92 73 99 77" stroke="#0a0604" stroke-width="1.5" fill="none"/>
          <path d="M61 70 Q68 67 75 70" stroke="#0a0604" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M85 70 Q92 67 99 70" stroke="#0a0604" stroke-width="3" fill="none" stroke-linecap="round"/>
          <ellipse cx="80" cy="87" rx="3.5" ry="2.5" fill="#b07858"/>
          <circle cx="85" cy="86" r="1.5" fill="#e8a030"/>
          <path d="M69 95 Q80 103 91 95" stroke="#7a3a18" stroke-width="2.5" fill="none" stroke-linecap="round"/>
          <path d="M60 112 Q80 122 100 112" stroke="#e8a030" stroke-width="2" fill="none"/>
          <circle cx="80" cy="121" r="3" fill="#e8a030"/>
        </svg>
      </div>
      <div class="team-name">Vimala (Me)</div>
      <div class="team-role">Senior Product Designer</div>
    </div>
  </div>
  <div class="my-role reveal">
    <div class="my-role-label">My role</div>
    <div class="my-role-text">Discovering the problem, setting the vision, aligning stakeholders, and driving end-to-end execution — from research through final delivery.</div>
  </div>
</div>

<!-- ═══ STORYBOARD — CONTEXT ═══ -->
<div class="chapter reveal">
  <div class="ch-num">02</div>
  <div class="ch-label">Let's set the context</div>
  <div class="ch-title">Picture this.<br><em>It's Monday morning.</em></div>

  <!-- INTERACTIVE STORYBOARD -->
  <div class="storyboard">
    <div class="sb-header">
      <span class="sb-title">Priya's monday — an interactive story</span>
      <div class="sb-controls">
        <div class="sb-dot active" onclick="goScene(0)"></div>
        <div class="sb-dot" onclick="goScene(1)"></div>
        <div class="sb-dot" onclick="goScene(2)"></div>
        <div class="sb-dot" onclick="goScene(3)"></div>
      </div>
    </div>

    <!-- Scene 0: The Setup -->
    <div class="sb-scene active" id="scene-0">
      <div class="sb-scene-inner">
        <div class="sb-text-side">
          <div class="sb-scene-num">Scene 01 / 04</div>
          <div class="sb-scene-title">Meet Priya — L&D Admin</div>
          <div class="sb-scene-body">Priya manages learning content for 6 business units across 4 languages at a 10,000-person enterprise. Every week she opens Cornerstone to publish courses, tag metadata, and manage translations.<br><br>The platform can do everything she needs. The problem? <strong>Everything is buried.</strong></div>
        </div>
        <div class="sb-visual">
          <div class="char-stage">
            <svg viewBox="0 0 200 200" style="width:140px;" xmlns="http://www.w3.org/2000/svg">
              <!-- Vimala/Priya at desk — calm version -->
              <rect x="20" y="148" width="160" height="10" rx="4" fill="#d0c8bc"/>
              <rect x="50" y="120" width="100" height="40" rx="5" fill="#2a2a28"/>
              <rect x="55" y="124" width="90" height="32" rx="3" fill="#1a4f8a" fill-opacity="0.7"/>
              <rect x="60" y="128" width="55" height="3" rx="1.5" fill="white" fill-opacity="0.5"/>
              <rect x="60" y="135" width="40" height="3" rx="1.5" fill="white" fill-opacity="0.3"/>
              <rect x="60" y="142" width="50" height="3" rx="1.5" fill="white" fill-opacity="0.3"/>
              <rect x="38" y="158" width="124" height="6" rx="3" fill="#1a1a18"/>
              <!-- arms -->
              <path d="M65 130 Q58 145 62 158" stroke="#c09070" stroke-width="10" stroke-linecap="round" fill="none"/>
              <path d="M135 130 Q142 145 138 158" stroke="#c09070" stroke-width="10" stroke-linecap="round" fill="none"/>
              <!-- body -->
              <rect x="65" y="165" width="70" height="20" rx="8" fill="#c84a8a"/>
              <!-- head -->
              <ellipse cx="100" cy="85" rx="28" ry="30" fill="#c09070"/>
              <ellipse cx="100" cy="62" rx="28" ry="15" fill="#0a0604"/>
              <rect x="72" y="62" width="56" height="12" fill="#0a0604"/>
              <ellipse cx="124" cy="68" rx="11" ry="9" fill="#0a0604"/>
              <circle cx="80" cy="62" r="0" fill="#0a0604"/>
              <!-- bindi -->
              <circle cx="100" cy="73" r="2.5" fill="#c84a4a"/>
              <!-- earrings -->
              <circle cx="72" cy="87" r="2.5" fill="#e8a030"/>
              <circle cx="128" cy="87" r="2.5" fill="#e8a030"/>
              <!-- eyes neutral -->
              <ellipse cx="90" cy="87" rx="5" ry="5.5" fill="white"/>
              <ellipse cx="110" cy="87" rx="5" ry="5.5" fill="white"/>
              <circle cx="91.5" cy="88" r="3" fill="#180e06"/>
              <circle cx="111.5" cy="88" r="3" fill="#180e06"/>
              <circle cx="93" cy="86.5" r="1" fill="white"/>
              <circle cx="113" cy="86.5" r="1" fill="white"/>
              <!-- eyebrows normal -->
              <path d="M83 80 Q90 77 97 80" stroke="#0a0604" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <path d="M103 80 Q110 77 117 80" stroke="#0a0604" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <!-- slight smile -->
              <path d="M90 98 Q100 104 110 98" stroke="#7a3a18" stroke-width="2" fill="none" stroke-linecap="round"/>
              <!-- nose -->
              <ellipse cx="100" cy="93" rx="3" ry="2" fill="#b07858"/>
              <circle cx="104" cy="92" r="1.2" fill="#e8a030"/>
            </svg>
            <div class="char-caption"><strong>Priya — L&D Administrator</strong>It's Monday. Time to publish 10 new courses.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scene 1: The Problem -->
    <div class="sb-scene" id="scene-1">
      <div class="sb-scene-inner">
        <div class="sb-text-side">
          <div class="sb-scene-num">Scene 02 / 04</div>
          <div class="sb-scene-title">The metadata nightmare begins</div>
          <div class="sb-scene-body">For each of the 10 courses, Priya manually types the title, description, keywords, subjects, and skill tags — from scratch. No suggestions. No pre-population.<br><br>For 10 materials per month: <strong>1,700 admin minutes wasted.</strong> Every. Single. Month.</div>
        </div>
        <div class="sb-visual">
          <div class="char-stage">
            <svg viewBox="0 0 200 200" style="width:140px;" xmlns="http://www.w3.org/2000/svg" class="char-frustrated">
              <rect x="20" y="148" width="160" height="10" rx="4" fill="#d0c8bc"/>
              <rect x="50" y="120" width="100" height="40" rx="5" fill="#2a2a28"/>
              <rect x="55" y="124" width="90" height="32" rx="3" fill="#8a3a1a" fill-opacity="0.6"/>
              <!-- many form fields on screen -->
              <rect x="60" y="128" width="40" height="3" rx="1.5" fill="white" fill-opacity="0.4"/>
              <rect x="104" y="126" width="36" height="6" rx="2" fill="#c0694a" fill-opacity="0.4"/>
              <rect x="60" y="135" width="36" height="3" rx="1.5" fill="white" fill-opacity="0.3"/>
              <rect x="60" y="141" width="28" height="3" rx="1.5" fill="white" fill-opacity="0.3"/>
              <rect x="90" y="133" width="40" height="7" rx="2" fill="#c0694a" fill-opacity="0.35"/>
              <rect x="38" y="158" width="124" height="6" rx="3" fill="#1a1a18"/>
              <path d="M65 130 Q58 145 62 158" stroke="#c09070" stroke-width="10" stroke-linecap="round" fill="none"/>
              <path d="M135 130 Q142 145 138 158" stroke="#c09070" stroke-width="10" stroke-linecap="round" fill="none"/>
              <rect x="65" y="165" width="70" height="20" rx="8" fill="#c84a8a"/>
              <!-- head -->
              <ellipse cx="100" cy="85" rx="28" ry="30" fill="#c09070"/>
              <ellipse cx="100" cy="62" rx="28" ry="15" fill="#0a0604"/>
              <rect x="72" y="62" width="56" height="12" fill="#0a0604"/>
              <ellipse cx="124" cy="68" rx="11" ry="9" fill="#0a0604"/>
              <circle cx="100" cy="73" r="2.5" fill="#c84a4a"/>
              <circle cx="72" cy="87" r="2.5" fill="#e8a030"/>
              <circle cx="128" cy="87" r="2.5" fill="#e8a030"/>
              <!-- frustrated eyes -->
              <ellipse cx="90" cy="87" rx="5" ry="5.5" fill="white"/>
              <ellipse cx="110" cy="87" rx="5" ry="5.5" fill="white"/>
              <circle cx="91.5" cy="88.5" r="3.5" fill="#180e06"/>
              <circle cx="111.5" cy="88.5" r="3.5" fill="#180e06"/>
              <!-- furrowed brows -->
              <path d="M83 79 Q90 75 97 79" stroke="#0a0604" stroke-width="3" fill="none" stroke-linecap="round"/>
              <path d="M103 79 Q110 75 117 79" stroke="#0a0604" stroke-width="3" fill="none" stroke-linecap="round"/>
              <!-- frown -->
              <path d="M89 100 Q100 95 111 100" stroke="#7a3a18" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <ellipse cx="100" cy="93" rx="3" ry="2" fill="#b07858"/>
              <circle cx="104" cy="92" r="1.2" fill="#e8a030"/>
              <!-- thought bubble -->
              <g class="thought-bubble">
                <circle cx="148" cy="45" r="22" fill="#fdf7f4" stroke="#e0ccc8" stroke-width="0.5"/>
                <text x="137" y="40" font-size="16">😩</text>
                <text x="129" y="57" font-size="6.5" font-family="sans-serif" fill="#5a5954">1700 min/mo!</text>
                <circle cx="130" cy="72" r="4" fill="#fdf7f4" stroke="#e0ccc8" stroke-width="0.5"/>
                <circle cx="122" cy="81" r="2.5" fill="#fdf7f4" stroke="#e0ccc8" stroke-width="0.5"/>
              </g>
            </svg>
            <div class="char-caption"><strong>25–60 min per course. Manually.</strong>Zero AI. Zero help. Just copy-paste.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scene 2: Translation pain -->
    <div class="sb-scene" id="scene-2">
      <div class="sb-scene-inner">
        <div class="sb-text-side">
          <div class="sb-scene-num">Scene 03 / 04</div>
          <div class="sb-scene-title">8 courses × 5 steps = 40 clicks</div>
          <div class="sb-scene-body">It's Thursday. Priya needs to translate 8 courses into French. Each requires opening the course, selecting the language, triggering the translation, waiting, then repeating.<br><br><strong>5 minutes of pure mechanical work</strong> that could take 30 seconds.</div>
        </div>
        <div class="sb-visual">
          <div class="char-stage">
            <!-- Animated clock/repetition visual -->
            <svg viewBox="0 0 200 160" style="width:180px;" xmlns="http://www.w3.org/2000/svg">
              <style>
                @keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
                @keyframes popIn{from{opacity:0;transform:scale(0);}to{opacity:1;transform:scale(1);}}
                .spin-slow{transform-origin:100px 80px;animation:spin 4s linear infinite;}
                .pop1{animation:popIn 0.4s 0.2s ease both;}
                .pop2{animation:popIn 0.4s 0.6s ease both;}
                .pop3{animation:popIn 0.4s 1.0s ease both;}
                .pop4{animation:popIn 0.4s 1.4s ease both;}
                .pop5{animation:popIn 0.4s 1.8s ease both;}
              </style>
              <!-- Steps pills -->
              <rect x="10" y="10" width="80" height="22" rx="11" fill="#fdf7f4" stroke="#e0ccc8" stroke-width="0.5" class="pop1"/>
              <text x="16" y="25" font-size="10" font-family="sans-serif" fill="#8a3a1a">Open course</text>
              <rect x="110" y="10" width="80" height="22" rx="11" fill="#fdf7f4" stroke="#e0ccc8" stroke-width="0.5" class="pop2"/>
              <text x="116" y="25" font-size="10" font-family="sans-serif" fill="#8a3a1a">Select language</text>
              <rect x="10" y="48" width="80" height="22" rx="11" fill="#fdf7f4" stroke="#e0ccc8" stroke-width="0.5" class="pop3"/>
              <text x="14" y="63" font-size="10" font-family="sans-serif" fill="#8a3a1a">Trigger translate</text>
              <rect x="110" y="48" width="80" height="22" rx="11" fill="#fdf7f4" stroke="#e0ccc8" stroke-width="0.5" class="pop4"/>
              <text x="132" y="63" font-size="10" font-family="sans-serif" fill="#8a3a1a">Wait...</text>
              <rect x="60" y="86" width="80" height="22" rx="11" fill="#c0694a" class="pop5"/>
              <text x="74" y="101" font-size="10" font-family="sans-serif" fill="white">×8 courses 😤</text>
              <!-- arrows -->
              <path d="M90 21 L110 21" stroke="#e0ccc8" stroke-width="1.5" marker-end="url(#arr)" class="pop2"/>
              <path d="M150 32 L150 48" stroke="#e0ccc8" stroke-width="1.5" marker-end="url(#arr)" class="pop3"/>
              <path d="M90 59 L110 59" stroke="#e0ccc8" stroke-width="1.5" class="pop4"/>
              <path d="M150 70 L150 86 L140 86" stroke="#e0ccc8" stroke-width="1.5" class="pop5"/>
              <defs><marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#e0ccc8"/></marker></defs>
              <!-- Total time badge -->
              <rect x="30" y="120" width="140" height="32" rx="8" fill="#fdf0dc"/>
              <text x="100" y="133" text-anchor="middle" font-size="11" font-family="sans-serif" fill="#7a4a10" font-weight="500">8 translations = 5 mins</text>
              <text x="100" y="147" text-anchor="middle" font-size="9" font-family="sans-serif" fill="#a09d97">40 manual clicks every time</text>
            </svg>
            <div class="char-caption"><strong>Static. Repetitive. Exhausting.</strong>Same steps, every language, every week.</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scene 3: The Resolution -->
    <div class="sb-scene" id="scene-3">
      <div class="sb-scene-inner">
        <div class="sb-text-side">
          <div class="sb-scene-num">Scene 04 / 04</div>
          <div class="sb-scene-title">After Apollo AI — everything changes</div>
          <div class="sb-scene-body">Apollo AI drafts all metadata in seconds. Translate All handles every language in one click. Resume Smart Edit means interruptions no longer mean starting over.<br><br><strong>From 1,700 to 160 minutes/month. 91% time saved.</strong></div>
        </div>
        <div class="sb-visual">
          <div class="char-stage">
            <svg viewBox="0 0 200 200" style="width:140px;" xmlns="http://www.w3.org/2000/svg" class="char-happy">
              <rect x="20" y="148" width="160" height="10" rx="4" fill="#d0c8bc"/>
              <rect x="50" y="120" width="100" height="40" rx="5" fill="#2a2a28"/>
              <rect x="55" y="124" width="90" height="32" rx="3" fill="#1a4f8a" fill-opacity="0.8"/>
              <!-- Apollo AI panel on screen -->
              <rect x="105" y="124" width="36" height="30" rx="3" fill="#378add" fill-opacity="0.3"/>
              <circle cx="113" cy="130" r="4" fill="#3a9e62"/>
              <path d="M111 130 L112.5 131.5 L115 128.5" stroke="white" stroke-width="1.2" fill="none"/>
              <circle cx="113" cy="140" r="4" fill="#3a9e62"/>
              <path d="M111 140 L112.5 141.5 L115 138.5" stroke="white" stroke-width="1.2" fill="none"/>
              <circle cx="113" cy="150" r="4" fill="#3a9e62"/>
              <path d="M111 150 L112.5 151.5 L115 148.5" stroke="white" stroke-width="1.2" fill="none"/>
              <!-- metadata auto-filled on screen -->
              <rect x="60" y="128" width="40" height="3" rx="1.5" fill="white" fill-opacity="0.6"/>
              <rect x="60" y="135" width="36" height="3" rx="1.5" fill="white" fill-opacity="0.5"/>
              <rect x="60" y="142" width="42" height="3" rx="1.5" fill="white" fill-opacity="0.5"/>
              <rect x="38" y="158" width="124" height="6" rx="3" fill="#1a1a18"/>
              <path d="M65 130 Q58 145 62 158" stroke="#c09070" stroke-width="10" stroke-linecap="round" fill="none"/>
              <path d="M135 130 Q142 145 138 158" stroke="#c09070" stroke-width="10" stroke-linecap="round" fill="none"/>
              <rect x="65" y="165" width="70" height="20" rx="8" fill="#c84a8a"/>
              <ellipse cx="100" cy="85" rx="28" ry="30" fill="#c09070"/>
              <ellipse cx="100" cy="62" rx="28" ry="15" fill="#0a0604"/>
              <rect x="72" y="62" width="56" height="12" fill="#0a0604"/>
              <ellipse cx="124" cy="68" rx="11" ry="9" fill="#0a0604"/>
              <circle cx="100" cy="73" r="2.5" fill="#c84a4a"/>
              <circle cx="72" cy="87" r="2.5" fill="#e8a030"/>
              <circle cx="128" cy="87" r="2.5" fill="#e8a030"/>
              <!-- happy eyes -->
              <path d="M84 87 Q90 82 96 87" stroke="#180e06" stroke-width="3" fill="none" stroke-linecap="round"/>
              <path d="M104 87 Q110 82 116 87" stroke="#180e06" stroke-width="3" fill="none" stroke-linecap="round"/>
              <!-- happy eyebrows -->
              <path d="M83 80 Q90 77 97 80" stroke="#0a0604" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <path d="M103 80 Q110 77 117 80" stroke="#0a0604" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <!-- big smile -->
              <path d="M87 97 Q100 108 113 97" stroke="#7a3a18" stroke-width="2.5" fill="none" stroke-linecap="round"/>
              <ellipse cx="100" cy="93" rx="3" ry="2" fill="#b07858"/>
              <circle cx="104" cy="92" r="1.2" fill="#e8a030"/>
              <!-- sparkles -->
              <text x="138" y="78" font-size="14">✨</text>
              <text x="52" y="72" font-size="12">⭐</text>
              <!-- thought bubble happy -->
              <g class="thought-bubble">
                <circle cx="150" cy="48" r="20" fill="#e4f2ea" stroke="#b6dfc5" stroke-width="0.5"/>
                <text x="140" y="43" font-size="15">🎉</text>
                <text x="134" y="60" font-size="6.5" font-family="sans-serif" fill="#1e6640">160 min/mo!</text>
                <circle cx="133" cy="70" r="3.5" fill="#e4f2ea" stroke="#b6dfc5" stroke-width="0.5"/>
                <circle cx="126" cy="78" r="2" fill="#e4f2ea" stroke="#b6dfc5" stroke-width="0.5"/>
              </g>
            </svg>
            <div class="char-caption"><strong>Priya — after Apollo AI 🎉</strong>Done in minutes, not hours.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="sb-footer">
      <button class="sb-btn" id="sb-prev" onclick="prevScene()">← Previous</button>
      <span class="sb-nav-info" id="sb-info">Scene 1 of 4</span>
      <button class="sb-btn primary" id="sb-next" onclick="nextScene()">Next scene →</button>
    </div>
  </div>

  <div class="pq">
    <div class="pq-text">"The platform can do everything. The problem is no one knows where anything is."</div>
    <div class="pq-attr">— Recurring theme across admin research sessions</div>
  </div>
</div>

<!-- ═══ PROBLEM ═══ -->
<div class="chapter reveal">
  <div class="ch-num">03</div>
  <div class="ch-label">The problem</div>
  <div class="ch-title">Two platforms,<br><em>zero intelligence, endless repetition.</em></div>

  <div class="two" style="margin-bottom:2.5rem;">
    <div class="card reveal reveal-delay-1">
      <div style="font-size:0.7rem;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink3);margin-bottom:0.6rem;">Admin platform</div>
      <div class="card-text">Administrators face an unstructured catalog, duplicated data, and multiple disconnected touchpoints — making content management time-consuming and error-prone. No AI. No smart defaults. No scale.</div>
    </div>
    <div class="card reveal reveal-delay-2">
      <div style="font-size:0.7rem;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;color:var(--ink3);margin-bottom:0.6rem;">Learner platform</div>
      <div class="card-text">Learners struggle with a cluttered catalog, repetitive content, and difficulty finding relevant resources. Poor admin tooling upstream creates a poor learner experience downstream.</div>
    </div>
  </div>

  <!-- Pain points with before/after -->
  <div style="display:flex;flex-direction:column;gap:1rem;margin:2rem 0;">
    <div style="background:var(--bg2);border:0.5px solid var(--line);border-radius:14px;padding:1.75rem;">
      <div style="font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink3);margin-bottom:0.75rem;">Pain point 01 — Content metadata</div>
      <div class="opt bad"><span class="opt-badge">Before</span>25–60 min per course — manually typing every field from scratch. 1,700 admin minutes/month across 10 people.</div>
      <div class="opt good"><span class="opt-badge">After</span>Upload → Apollo AI drafts all metadata instantly → review & publish in under 4 minutes.</div>
    </div>
    <div style="background:var(--bg2);border:0.5px solid var(--line);border-radius:14px;padding:1.75rem;">
      <div style="font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink3);margin-bottom:0.75rem;">Pain point 02 — Translation workflow</div>
      <div class="opt bad"><span class="opt-badge">Before</span>8 courses × 5 manual steps = 40 clicks, 5 minutes. Repeated every single week.</div>
      <div class="opt good"><span class="opt-badge">After</span>Multi-select all languages → Translate All → done in under 1 minute with smart edge-case handling.</div>
    </div>
    <div style="background:var(--bg2);border:0.5px solid var(--line);border-radius:14px;padding:1.75rem;">
      <div style="font-size:0.65rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink3);margin-bottom:0.75rem;">Pain point 03 — Session continuity</div>
      <div class="opt bad"><span class="opt-badge">Before</span>Close panel → interrupted by meeting → return → blank state → start from scratch. Every time.</div>
      <div class="opt good"><span class="opt-badge">After</span>Reopen panel → "Resume Smart Edit" appears → continue exactly where you left off.</div>
    </div>
  </div>
</div>

<!-- ═══ RESEARCH ═══ -->
<div class="chapter reveal">
  <div class="ch-num">04</div>
  <div class="ch-label">Research & insights</div>
  <div class="ch-title">What the data<br><em>and the people behind it</em> revealed.</div>

  <div class="big-stat-row">
    <div class="bstat reveal reveal-delay-1"><div class="bstat-n" style="color:var(--blue);">150K</div><div class="bstat-l">Support cases/year across Cornerstone customers</div></div>
    <div class="bstat reveal reveal-delay-2"><div class="bstat-n" style="color:#8a2a1a;">1,700</div><div class="bstat-l">Admin minutes/month on metadata alone for 10 people</div></div>
    <div class="bstat reveal reveal-delay-3"><div class="bstat-n">5–6</div><div class="bstat-l">Clicks minimum to reach any common admin action</div></div>
    <div class="bstat reveal reveal-delay-3"><div class="bstat-n" style="color:var(--amber);">13</div><div class="bstat-l">Steps in old content creation flow (only 11 needed)</div></div>
  </div>

  <div class="hmw reveal">
    <div class="hmw-label">How might we</div>
    <div class="hmw-text">Empower L&D admins to create, translate, and manage enterprise learning content with the efficiency of AI — while preserving the control and trust that high-stakes enterprise workflows demand?</div>
  </div>
</div>

<!-- ═══ SOLUTION — tabbed screens ═══ -->
<div class="chapter reveal">
  <div class="ch-num">05</div>
  <div class="ch-label">Iteration & solution</div>
  <div class="ch-title">Three features that turned<br><em>hours into minutes.</em></div>

  <div class="screen-tabs reveal">
    <div class="tab-list">
      <button class="tab-btn active" onclick="switchTab('tab-1',this)">⚡ Apollo AI Metadata</button>
      <button class="tab-btn" onclick="switchTab('tab-2',this)">🔄 Resume Smart Edit</button>
      <button class="tab-btn" onclick="switchTab('tab-3',this)">🌐 Translate All</button>
    </div>

    <!-- Tab 1: Apollo AI Metadata -->
    <div class="tab-panel active" id="tab-1">
      <div class="screen-container">
        <div class="two" style="gap:0;align-items:stretch;">
          <div style="padding:2.5rem;border-right:0.5px solid var(--line);">
            <div style="font-size:0.85rem;font-weight:500;margin-bottom:0.75rem;">Streamlined content creation with Apollo AI</div>
            <div style="font-size:0.8rem;color:var(--ink2);line-height:1.72;">
              <div style="display:flex;gap:0.6rem;margin-bottom:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>Single starting point — removes confusion of multiple touchpoints</span></div>
              <div style="display:flex;gap:0.6rem;margin-bottom:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>Drag & drop uploads for large PDFs — no scattered document management</span></div>
              <div style="display:flex;gap:0.6rem;margin-bottom:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>Apollo AI auto-generates titles, descriptions, keywords, subjects & skill tags</span></div>
              <div style="display:flex;gap:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>Review suggestions & publish instantly — all in one flow</span></div>
            </div>
            <div style="margin-top:1.5rem;padding:1.25rem;background:var(--green-bg);border-radius:10px;border:0.5px solid rgba(30,102,64,0.15);">
              <div style="font-family:var(--serif);font-size:1.5rem;color:var(--green);">91%</div>
              <div style="font-size:0.75rem;color:var(--green);">Time saved on metadata entry</div>
              <div style="font-size:0.7rem;color:rgba(30,102,64,0.6);margin-top:0.2rem;">1,700 → 160 min/month</div>
            </div>
          </div>
          <div style="padding:1.5rem;background:var(--bg);">
            <svg viewBox="0 0 380 320" xmlns="http://www.w3.org/2000/svg" style="width:100%;border-radius:8px;">
              <!-- Content creation screen mockup -->
              <rect width="380" height="320" fill="white" rx="8"/>
              <!-- Topbar -->
              <rect width="380" height="36" fill="#faf9f7" rx="8"/>
              <rect y="22" width="380" height="14" fill="#faf9f7"/>
              <rect x="12" y="10" width="70" height="16" rx="4" fill="#e85c23" fill-opacity="0.8"/>
              <rect x="16" y="14" width="62" height="8" rx="2" fill="white" fill-opacity="0.8"/>
              <!-- Breadcrumb -->
              <rect x="12" y="46" width="180" height="6" rx="2" fill="#e0dcd8"/>
              <!-- Title -->
              <rect x="12" y="58" width="220" height="14" rx="3" fill="#1a1a18"/>
              <rect x="238" y="60" width="50" height="10" rx="3" fill="#1a4f8a" fill-opacity="0.15"/>
              <rect x="296" y="60" width="72" height="10" rx="5" fill="#1a4f8a" fill-opacity="0.15"/>
              <!-- Draft badge -->
              <rect x="12" y="78" width="36" height="12" rx="4" fill="#1a4f8a" fill-opacity="0.12"/>
              <rect x="16" y="81" width="28" height="6" rx="2" fill="#1a4f8a" fill-opacity="0.5"/>
              <!-- Form area -->
              <rect x="12" y="98" width="210" height="10" rx="2" fill="#b8b4ad"/>
              <rect x="12" y="114" width="210" height="65" rx="4" fill="#f0ede8" stroke="#e0dcd8" stroke-width="0.5"/>
              <rect x="18" y="120" width="180" height="5" rx="2" fill="#c8c4bc"/>
              <rect x="18" y="129" width="160" height="5" rx="2" fill="#c8c4bc"/>
              <rect x="18" y="138" width="170" height="5" rx="2" fill="#c8c4bc"/>
              <rect x="18" y="147" width="120" height="5" rx="2" fill="#c8c4bc"/>
              <!-- Provider + lang row -->
              <rect x="12" y="186" width="100" height="26" rx="4" fill="#f0ede8" stroke="#e0dcd8" stroke-width="0.5"/>
              <rect x="18" y="193" width="60" height="5" rx="2" fill="#c8c4bc"/>
              <rect x="120" y="186" width="102" height="26" rx="4" fill="#f0ede8" stroke="#e0dcd8" stroke-width="0.5"/>
              <rect x="126" y="193" width="50" height="5" rx="2" fill="#c8c4bc"/>
              <!-- Skill tags -->
              <rect x="12" y="220" width="6" height="6" rx="1" fill="#1a4f8a" fill-opacity="0.3"/>
              <rect x="22" y="220" width="80" height="6" rx="2" fill="#b8b4ad"/>
              <rect x="12" y="232" width="70" height="14" rx="7" fill="#e8f0fa"/><rect x="16" y="236" width="62" height="6" rx="3" fill="#378add" fill-opacity="0.5"/>
              <rect x="88" y="232" width="58" height="14" rx="7" fill="#e8f0fa"/><rect x="92" y="236" width="50" height="6" rx="3" fill="#378add" fill-opacity="0.5"/>
              <rect x="152" y="232" width="66" height="14" rx="7" fill="#e8f0fa"/><rect x="156" y="236" width="58" height="6" rx="3" fill="#378add" fill-opacity="0.5"/>
              <!-- Publish btn -->
              <rect x="12" y="254" width="100" height="24" rx="6" fill="#1a4f8a"/>
              <rect x="20" y="261" width="84" height="10" rx="3" fill="white" fill-opacity="0.8"/>
              <!-- Apollo AI panel -->
              <rect x="232" y="96" width="136" height="212" rx="8" fill="white" stroke="#e0dcd8" stroke-width="0.5"/>
              <rect x="232" y="96" width="136" height="30" rx="8" fill="#1a4f8a"/>
              <rect x="232" y="112" width="136" height="14" fill="#1a4f8a"/>
              <circle cx="244" cy="111" r="6" fill="#378add" fill-opacity="0.5"/>
              <rect x="254" y="107" width="50" height="7" rx="3" fill="white" fill-opacity="0.8"/>
              <!-- AI suggestions -->
              <rect x="240" y="136" width="50" height="5" rx="2" fill="#378add" fill-opacity="0.4"/>
              <rect x="240" y="144" width="118" height="4" rx="2" fill="#e0dcd8"/>
              <rect x="240" y="151" width="100" height="4" rx="2" fill="#e0dcd8"/>
              <rect x="240" y="158" width="110" height="4" rx="2" fill="#e0dcd8"/>
              <rect x="240" y="168" width="50" height="5" rx="2" fill="#b8b4ad"/>
              <rect x="298" y="166" width="36" height="9" rx="4.5" fill="#e4f2ea"/><rect x="302" y="169" width="28" height="3" rx="1.5" fill="#1e6640" fill-opacity="0.6"/>
              <rect x="240" y="180" width="110" height="4" rx="2" fill="#e0dcd8"/>
              <rect x="240" y="187" width="96" height="4" rx="2" fill="#e0dcd8"/>
              <rect x="240" y="197" width="50" height="5" rx="2" fill="#b8b4ad"/>
              <rect x="298" y="195" width="36" height="9" rx="4.5" fill="#e4f2ea"/><rect x="302" y="198" width="28" height="3" rx="1.5" fill="#1e6640" fill-opacity="0.6"/>
              <!-- tags auto-added -->
              <rect x="240" y="210" width="50" height="5" rx="2" fill="#b8b4ad"/>
              <rect x="298" y="208" width="36" height="9" rx="4.5" fill="#e4f2ea"/><rect x="302" y="211" width="28" height="3" rx="1.5" fill="#1e6640" fill-opacity="0.6"/>
              <rect x="240" y="218" width="56" height="10" rx="5" fill="#e8f0fa"/><rect x="244" y="221" width="48" height="4" rx="2" fill="#378add" fill-opacity="0.5"/>
              <rect x="240" y="232" width="66" height="10" rx="5" fill="#e8f0fa"/><rect x="244" y="235" width="58" height="4" rx="2" fill="#378add" fill-opacity="0.5"/>
              <rect x="240" y="246" width="118" height="18" rx="9" fill="#f0ede8"/>
              <rect x="250" y="251" width="70" height="5" rx="2" fill="#b8b4ad"/>
              <circle cx="360" cy="255" r="7" fill="#1a4f8a"/>
              <rect x="357" y="252" width="6" height="6" rx="1" fill="white" fill-opacity="0.8"/>
              <rect x="240" y="268" width="118" height="5" rx="2" fill="#e8e4dc"/>
              <rect x="244" y="270" width="100" height="2" rx="1" fill="#c8c4bc"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 2: Resume Smart Edit -->
    <div class="tab-panel" id="tab-2">
      <div class="screen-container">
        <div class="two" style="gap:0;align-items:stretch;">
          <div style="padding:2.5rem;border-right:0.5px solid var(--line);">
            <div style="font-size:0.85rem;font-weight:500;margin-bottom:0.75rem;">Smarter sessions with AI Assist</div>
            <div style="font-size:0.8rem;color:var(--ink2);line-height:1.72;">
              <div style="display:flex;gap:0.6rem;margin-bottom:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>Open existing file → launch AI Assist panel → begin editing</span></div>
              <div style="display:flex;gap:0.6rem;margin-bottom:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>Close and reopen panel in same session → "Resume Smart Edit" appears</span></div>
              <div style="display:flex;gap:0.6rem;margin-bottom:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>System restores context — continue without repeating previous steps</span></div>
              <div style="display:flex;gap:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>Directly start translation from this restored state</span></div>
            </div>
            <div style="margin-top:1.5rem;background:var(--amber-bg);border-radius:10px;border:0.5px solid rgba(122,74,16,0.15);padding:1.25rem;">
              <div style="font-size:0.78rem;font-weight:500;color:var(--amber);margin-bottom:0.3rem;">No competing LMS had this at launch</div>
              <div style="font-size:0.75rem;color:rgba(122,74,16,0.7);line-height:1.5;">Cited as the #1 most impactful feature in post-launch admin feedback. A trust signal disguised as a convenience.</div>
            </div>
          </div>
          <div style="padding:1.5rem;background:var(--bg);display:flex;align-items:center;justify-content:center;">
            <svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;">
              <rect width="280" height="200" fill="white" rx="8"/>
              <rect width="280" height="32" fill="#faf9f7" rx="8"/>
              <rect y="20" width="280" height="12" fill="#faf9f7"/>
              <rect x="10" y="8" width="55" height="16" rx="4" fill="#e85c23" fill-opacity="0.8"/>
              <!-- main content -->
              <rect x="10" y="44" width="156" height="12" rx="3" fill="#1a1a18"/>
              <rect x="10" y="60" width="42" height="10" rx="3" fill="#1a4f8a" fill-opacity="0.12"/>
              <rect x="14" y="63" width="34" height="4" rx="2" fill="#1a4f8a" fill-opacity="0.5"/>
              <rect x="10" y="78" width="160" height="56" rx="4" fill="#f0ede8" stroke="#e0dcd8" stroke-width="0.5"/>
              <!-- Resume Smart Edit badge — highlighted -->
              <rect x="170" y="44" width="100" height="148" rx="8" fill="white" stroke="#e0dcd8" stroke-width="0.5"/>
              <rect x="170" y="44" width="100" height="28" rx="8" fill="#1a4f8a"/>
              <rect x="170" y="60" width="100" height="12" fill="#1a4f8a"/>
              <circle cx="181" cy="58" r="5" fill="#378add" fill-opacity="0.5"/>
              <rect x="190" y="55" width="44" height="6" rx="3" fill="white" fill-opacity="0.7"/>
              <!-- Resume Smart Edit CTA -->
              <rect x="176" y="80" width="88" height="28" rx="6" fill="#fdf0dc" stroke="#e8c080" stroke-width="1"/>
              <text x="220" y="91" text-anchor="middle" font-size="7.5" font-family="sans-serif" fill="#7a4a10" font-weight="500">↩ Resume Smart</text>
              <text x="220" y="101" text-anchor="middle" font-size="7.5" font-family="sans-serif" fill="#7a4a10">Edit</text>
              <!-- suggestions below -->
              <rect x="178" y="116" width="52" height="4" rx="2" fill="#b8b4ad"/>
              <rect x="178" y="124" width="84" height="3.5" rx="1.5" fill="#e0dcd8"/>
              <rect x="178" y="131" width="70" height="3.5" rx="1.5" fill="#e0dcd8"/>
              <rect x="178" y="138" width="78" height="3.5" rx="1.5" fill="#e0dcd8"/>
              <rect x="178" y="148" width="52" height="4" rx="2" fill="#b8b4ad"/>
              <rect x="178" y="156" width="84" height="3.5" rx="1.5" fill="#e0dcd8"/>
              <rect x="178" y="163" width="60" height="3.5" rx="1.5" fill="#e0dcd8"/>
              <rect x="176" y="172" width="88" height="14" rx="7" fill="#f0ede8"/>
              <rect x="184" y="176" width="52" height="5" rx="2" fill="#b8b4ad"/>
              <circle cx="260" cy="179" r="5.5" fill="#1a4f8a"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 3: Translate All -->
    <div class="tab-panel" id="tab-3">
      <div class="screen-container">
        <div class="two" style="gap:0;align-items:stretch;">
          <div style="padding:2.5rem;border-right:0.5px solid var(--line);">
            <div style="font-size:0.85rem;font-weight:500;margin-bottom:0.75rem;">Seamless multilingual management</div>
            <div style="font-size:0.8rem;color:var(--ink2);line-height:1.72;">
              <div style="display:flex;gap:0.6rem;margin-bottom:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>Add translations via inline AI prompt or AI Assist menu — same result, your choice</span></div>
              <div style="display:flex;gap:0.6rem;margin-bottom:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>Language list prioritises most common portal languages, with "view more" for additional ones</span></div>
              <div style="display:flex;gap:0.6rem;margin-bottom:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>"Translate All" — handles all available languages in one click</span></div>
              <div style="display:flex;gap:0.6rem;align-items:flex-start;"><span style="color:#3a9e62;flex-shrink:0;">→</span><span>Smart edge cases: partial fills selectable, fully done languages hidden from re-selection</span></div>
            </div>
            <div style="margin-top:1.5rem;padding:1.25rem;background:var(--blue-bg);border-radius:10px;border:0.5px solid rgba(26,79,138,0.15);">
              <div style="font-family:var(--serif);font-size:1.5rem;color:var(--blue);">90%</div>
              <div style="font-size:0.75rem;color:var(--blue);">Translation time saved</div>
              <div style="font-size:0.7rem;color:rgba(26,79,138,0.6);margin-top:0.2rem;">8 translations: 5 min → under 1 min</div>
            </div>
          </div>
          <div style="padding:1.5rem;background:var(--bg);">
            <svg viewBox="0 0 280 220" xmlns="http://www.w3.org/2000/svg" style="width:100%;">
              <rect width="280" height="220" fill="white" rx="8"/>
              <rect width="280" height="32" fill="#faf9f7" rx="8"/>
              <rect y="20" width="280" height="12" fill="#faf9f7"/>
              <rect x="10" y="8" width="55" height="16" rx="4" fill="#e85c23" fill-opacity="0.8"/>
              <!-- Title -->
              <rect x="10" y="44" width="140" height="12" rx="3" fill="#1a1a18"/>
              <!-- AI panel -->
              <rect x="170" y="44" width="100" height="168" rx="8" fill="white" stroke="#e0dcd8" stroke-width="0.5"/>
              <rect x="170" y="44" width="100" height="28" rx="8" fill="#1a4f8a"/>
              <rect x="170" y="60" width="100" height="12" fill="#1a4f8a"/>
              <circle cx="181" cy="58" r="5" fill="#378add" fill-opacity="0.5"/>
              <rect x="190" y="55" width="44" height="6" rx="3" fill="white" fill-opacity="0.7"/>
              <!-- Add translations button -->
              <rect x="176" y="80" width="88" height="20" rx="5" fill="#e8f0fa"/>
              <rect x="180" y="84" width="10" height="10" rx="5" fill="#378add" fill-opacity="0.4"/>
              <rect x="194" y="86" width="54" height="6" rx="3" fill="#1a4f8a" fill-opacity="0.5"/>
              <!-- Language list -->
              <rect x="176" y="108" width="52" height="5" rx="2" fill="#b8b4ad"/>
              <!-- Language items with checkmarks -->
              <rect x="176" y="118" width="84" height="12" rx="3" fill="#f0ede8"/>
              <circle cx="184" cy="124" r="5" fill="#3a9e62"/><path d="M181 124 L183 126 L187 121.5" stroke="white" stroke-width="1.2" fill="none"/>
              <rect x="194" y="121" width="40" height="5" rx="2" fill="#b8b4ad"/>
              <rect x="176" y="134" width="84" height="12" rx="3" fill="#f0ede8"/>
              <circle cx="184" cy="140" r="5" fill="#3a9e62"/><path d="M181 140 L183 142 L187 137.5" stroke="white" stroke-width="1.2" fill="none"/>
              <rect x="194" y="137" width="50" height="5" rx="2" fill="#b8b4ad"/>
              <rect x="176" y="150" width="84" height="12" rx="3" fill="#f0ede8"/>
              <circle cx="184" cy="156" r="5" fill="none" stroke="#d0ccc8" stroke-width="1.5"/>
              <rect x="194" y="153" width="44" height="5" rx="2" fill="#b8b4ad"/>
              <rect x="176" y="166" width="84" height="12" rx="3" fill="#f0ede8"/>
              <circle cx="184" cy="172" r="5" fill="none" stroke="#d0ccc8" stroke-width="1.5"/>
              <rect x="194" y="169" width="36" height="5" rx="2" fill="#b8b4ad"/>
              <!-- Translate All CTA -->
              <rect x="176" y="184" width="88" height="20" rx="5" fill="#1a4f8a"/>
              <rect x="182" y="190" width="76" height="8" rx="3" fill="white" fill-opacity="0.8"/>
              <!-- main form -->
              <rect x="10" y="64" width="150" height="148" rx="4" fill="#f8f7f5"/>
              <rect x="16" y="72" width="80" height="6" rx="2" fill="#b8b4ad"/>
              <rect x="16" y="82" width="138" height="30" rx="4" fill="white" stroke="#e0dcd8" stroke-width="0.5"/>
              <rect x="20" y="88" width="100" height="4" rx="2" fill="#c8c4bc"/>
              <rect x="20" y="96" width="80" height="4" rx="2" fill="#c8c4bc"/>
              <rect x="16" y="120" width="60" height="6" rx="2" fill="#b8b4ad"/>
              <rect x="16" y="130" width="138" height="18" rx="4" fill="white" stroke="#e0dcd8" stroke-width="0.5"/>
              <rect x="20" y="136" width="80" height="4" rx="2" fill="#c8c4bc"/>
              <rect x="16" y="155" width="60" height="6" rx="2" fill="#b8b4ad"/>
              <rect x="16" y="165" width="60" height="14" rx="7" fill="#e8f0fa"/><rect x="20" y="169" width="52" height="6" rx="3" fill="#378add" fill-opacity="0.5"/>
              <rect x="82" y="165" width="50" height="14" rx="7" fill="#e8f0fa"/><rect x="86" y="169" width="42" height="6" rx="3" fill="#378add" fill-opacity="0.5"/>
              <rect x="16" y="185" width="70" height="14" rx="7" fill="#e8f0fa"/><rect x="20" y="189" width="62" height="6" rx="3" fill="#378add" fill-opacity="0.5"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<style>
/* ── COMPARE ── */
.compare-wrapper{position:relative;border-radius:16px;overflow:hidden;border:0.5px solid var(--line);user-select:none;cursor:ew-resize;height:460px;}
.c-before,.c-after{position:absolute;top:0;left:0;width:100%;height:100%;}
.c-before{z-index:1;}.c-after{z-index:2;clip-path:inset(0 50% 0 0);}
.c-div{position:absolute;top:0;left:50%;width:2px;height:100%;background:white;z-index:10;transform:translateX(-50%);box-shadow:0 0 12px rgba(0,0,0,0.15);}
.c-handle{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;background:white;box-shadow:0 2px 16px rgba(0,0,0,0.18);z-index:11;display:flex;align-items:center;justify-content:center;cursor:ew-resize;font-size:14px;color:var(--ink2);}
.c-lbl{position:absolute;bottom:14px;z-index:12;font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.28rem 0.7rem;border-radius:100px;font-family:var(--sans);font-weight:500;}
.c-lbl.b{left:14px;background:rgba(17,17,16,0.75);color:white;}
.c-lbl.a{right:14px;background:rgba(26,79,138,0.9);color:white;}
.compare-hint{text-align:center;font-size:0.72rem;color:var(--ink3);margin-top:0.75rem;}
.ann-row{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-top:2rem;}
.ann-side{display:flex;flex-direction:column;gap:0.65rem;}
.ann-lbl{font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;font-weight:500;margin-bottom:0.2rem;}
.ann-before .ann-lbl{color:#8a1a1a;}
.ann-after .ann-lbl{color:var(--green);}
.ann-item{display:flex;gap:0.7rem;align-items:flex-start;padding:0.8rem 1rem;border-radius:8px;border:0.5px solid var(--line);}
.ann-before .ann-item{background:#fdf7f4;border-left:2px solid #d06050;}
.ann-after .ann-item{background:#f0f7f2;border-left:2px solid #3a9e62;}
.ann-n{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.6rem;font-weight:500;flex-shrink:0;margin-top:0.05rem;}
.ann-before .ann-n{background:#fdf0ee;color:#8a1a1a;}
.ann-after .ann-n{background:#e4f2ea;color:var(--green);}
.ann-t{font-size:0.78rem;color:var(--ink2);line-height:1.5;}
.ann-t strong{color:var(--ink);font-weight:500;}
/* ── PP ── */
.pp-ov{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--line);border:0.5px solid var(--line);border-radius:14px;overflow:hidden;margin-bottom:2rem;cursor:pointer;}
.pp-ov-i{background:var(--bg);padding:1.5rem;transition:background 0.18s;}
.pp-ov-i:hover,.pp-ov-i.on{background:var(--bg2);}
.pp-ov-n{font-family:var(--serif);font-size:1.6rem;line-height:1;margin-bottom:0.35rem;color:var(--ink4);}
.pp-ov-i.on .pp-ov-n{color:var(--blue);}
.pp-ov-title{font-size:0.82rem;font-weight:500;margin-bottom:0.2rem;}
.pp-ov-sub{font-size:0.7rem;color:var(--ink3);}
.pp-pnl{display:none;animation:sceneIn 0.35s ease;}
.pp-pnl.on{display:block;}
@keyframes sceneIn{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
.pp-card{border:0.5px solid var(--line);border-radius:16px;overflow:hidden;}
.pp-top{padding:2.5rem;display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start;border-bottom:0.5px solid var(--line);}
.pp-etag{display:inline-flex;align-items:center;gap:0.5rem;font-size:0.6rem;letter-spacing:0.08em;text-transform:uppercase;background:#fdf0ee;border:0.5px solid rgba(138,26,26,0.15);color:#8a1a1a;padding:0.28rem 0.7rem;border-radius:100px;width:fit-content;margin-bottom:0.85rem;}
.pp-stitle{font-family:var(--serif);font-size:1.55rem;line-height:1.2;letter-spacing:-0.02em;margin-bottom:0.6rem;}
.pp-sbody{font-size:0.83rem;color:var(--ink2);line-height:1.75;}
.pp-sbody strong{color:var(--ink);}
.pp-ev{background:var(--bg2);border-radius:12px;padding:1.5rem;display:flex;flex-direction:column;gap:1rem;}
.pp-ev-lbl{font-size:0.58rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink3);}
.pp-ev-n{font-family:var(--serif);font-size:2.5rem;line-height:1;margin-bottom:0.15rem;}
.pp-ev-s{font-size:0.73rem;color:var(--ink2);line-height:1.4;}
.pp-q{border-left:2px solid var(--ink4);padding-left:1rem;font-family:var(--serif);font-size:0.95rem;font-style:italic;color:var(--ink2);line-height:1.55;}
.pp-qa{font-size:0.62rem;color:var(--ink3);font-style:normal;font-family:var(--sans);margin-top:0.3rem;}
.pp-screens{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--line);border-top:0.5px solid var(--line);}
.pp-sp{padding:1.75rem;}
.pp-sp:first-child{background:#fdf7f4;}
.pp-sp:last-child{background:#f0f7f2;}
.pp-sp-lbl{font-size:0.6rem;letter-spacing:0.1em;text-transform:uppercase;font-weight:500;margin-bottom:1rem;}
.pp-sp:first-child .pp-sp-lbl{color:#8a1a1a;}
.pp-sp:last-child .pp-sp-lbl{color:var(--green);}
.sflow{display:flex;align-items:center;flex-wrap:wrap;gap:0.35rem;margin:0.5rem 0;}
.sp{font-size:0.68rem;padding:0.25rem 0.6rem;border-radius:6px;white-space:nowrap;}
.sp.bad{background:rgba(208,96,80,0.12);color:#8a3a1a;border:0.5px solid rgba(208,96,80,0.25);}
.sp.good{background:rgba(58,158,98,0.12);color:#1e6640;border:0.5px solid rgba(58,158,98,0.25);}
.sp.neu{background:var(--bg3);color:var(--ink2);border:0.5px solid var(--line);}
.sarr{font-size:0.62rem;color:var(--ink4);}
.spnote{font-size:0.73rem;color:#8a2a1a;margin-top:0.5rem;padding-left:1rem;border-left:2px solid #d06050;}
.fcall{display:flex;gap:0.7rem;align-items:flex-start;padding:0.9rem 1rem;border-radius:8px;background:var(--green-bg);border:0.5px solid rgba(30,102,64,0.15);margin-top:0.85rem;}
.fci{width:26px;height:26px;background:var(--green);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;}
.fct{font-size:0.78rem;font-weight:500;color:var(--green);margin-bottom:0.2rem;}
.fcd{font-size:0.72rem;color:rgba(30,102,64,0.7);line-height:1.5;}
.pp-sol{padding:1.75rem 2.5rem;background:var(--bg);display:grid;grid-template-columns:auto 1fr auto;gap:1.5rem;align-items:center;}
.pp-sol-arr{font-size:1.2rem;color:var(--green);}
.pp-sol-lbl{font-size:0.58rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--green);margin-bottom:0.25rem;}
.pp-sol-t{font-size:0.88rem;font-weight:500;margin-bottom:0.2rem;}
.pp-sol-b{font-size:0.76rem;color:var(--ink2);line-height:1.5;}
.pp-sol-m{text-align:right;white-space:nowrap;}
.pp-sol-n{font-family:var(--serif);font-size:2rem;line-height:1;color:var(--green);}
.pp-sol-u{font-size:0.68rem;color:var(--green);opacity:0.7;}
</style>

<!-- ═══ OLD VS NEW ═══ -->
<div class="chapter reveal">
  <div class="ch-num">06</div>
  <div class="ch-label">What changed</div>
  <div class="ch-title">Before & after —<br><em>drag to compare.</em></div>
  <p style="font-size:0.84rem;color:var(--ink2);margin-bottom:1.75rem;max-width:58ch;line-height:1.7;">Slide the divider to compare the old CSX experience against the redesigned Apollo AI-powered interface. Annotated callouts explain the decisions, not just the differences.</p>

  <div class="compare-wrapper" id="cw">
    <div class="c-before">
      <svg viewBox="0 0 900 460" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
        <rect width="900" height="460" fill="#f0ede8"/>
        <rect width="900" height="40" fill="#2a2860"/>
        <rect x="12" y="10" width="130" height="20" rx="3" fill="#3a3878"/>
        <rect x="152" y="13" width="58" height="14" rx="2" fill="rgba(255,255,255,0.15)"/><rect x="157" y="17" width="48" height="6" rx="2" fill="rgba(255,255,255,0.3)"/>
        <rect x="220" y="13" width="58" height="14" rx="2" fill="rgba(255,255,255,0.15)"/><rect x="225" y="17" width="48" height="6" rx="2" fill="rgba(255,255,255,0.3)"/>
        <rect x="288" y="13" width="58" height="14" rx="2" fill="rgba(255,255,255,0.15)"/><rect x="293" y="17" width="48" height="6" rx="2" fill="rgba(255,255,255,0.3)"/>
        <!-- Massive sidebar -->
        <rect x="0" y="40" width="170" height="420" fill="#e8e4dc"/>
        <rect x="8" y="52" width="154" height="8" rx="2" fill="#b0ac a5"/>
        <rect x="8" y="52" width="154" height="8" rx="2" fill="#aeaa a4"/>
        <rect x="8" y="52" width="154" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="8" y="64" width="110" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="73" width="126" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="82" width="98" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="91" width="116" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="100" width="88" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="113" width="154" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="8" y="125" width="102" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="134" width="120" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="143" width="80" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="152" width="110" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="165" width="154" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="8" y="177" width="95" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="186" width="115" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="195" width="78" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="204" width="105" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="213" width="89" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="226" width="154" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="8" y="238" width="100" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="247" width="120" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="256" width="82" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="265" width="112" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="278" width="154" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="8" y="290" width="98" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="299" width="118" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="8" y="308" width="80" height="5" rx="2" fill="#c8c4bc"/>
        <!-- Main content - cramped form -->
        <rect x="170" y="40" width="730" height="420" fill="white"/>
        <rect x="185" y="56" width="200" height="14" rx="3" fill="#2a2860"/>
        <rect x="185" y="78" width="88" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="185" y="90" width="490" height="28" rx="3" fill="#f5f3ef" stroke="#d8d4cc" stroke-width="1"/>
        <rect x="192" y="98" width="180" height="7" rx="2" fill="#d0ccc8"/>
        <rect x="185" y="126" width="88" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="185" y="138" width="490" height="58" rx="3" fill="#f5f3ef" stroke="#d8d4cc" stroke-width="1"/>
        <rect x="192" y="148" width="360" height="5" rx="2" fill="#d0ccc8"/>
        <rect x="192" y="157" width="300" height="5" rx="2" fill="#d0ccc8"/>
        <rect x="192" y="166" width="330" height="5" rx="2" fill="#d0ccc8"/>
        <!-- 3 dropdowns in a row -->
        <rect x="185" y="206" width="112" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="185" y="218" width="145" height="26" rx="3" fill="#f5f3ef" stroke="#d8d4cc" stroke-width="1"/><rect x="192" y="225" width="75" height="7" rx="2" fill="#d0ccc8"/>
        <rect x="340" y="206" width="112" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="340" y="218" width="145" height="26" rx="3" fill="#f5f3ef" stroke="#d8d4cc" stroke-width="1"/><rect x="347" y="225" width="75" height="7" rx="2" fill="#d0ccc8"/>
        <rect x="495" y="206" width="112" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="495" y="218" width="160" height="26" rx="3" fill="#f5f3ef" stroke="#d8d4cc" stroke-width="1"/><rect x="502" y="225" width="75" height="7" rx="2" fill="#d0ccc8"/>
        <!-- empty subjects -->
        <rect x="185" y="254" width="112" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="185" y="266" width="490" height="26" rx="3" fill="#f5f3ef" stroke="#d8d4cc" stroke-width="1"/><rect x="192" y="273" width="120" height="7" rx="2" fill="#e0dcd8"/>
        <!-- empty keywords -->
        <rect x="185" y="302" width="112" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="185" y="314" width="490" height="26" rx="3" fill="#f5f3ef" stroke="#d8d4cc" stroke-width="1"/><rect x="192" y="321" width="140" height="7" rx="2" fill="#e0dcd8"/>
        <!-- pain annotations -->
        <rect x="680" y="90" width="110" height="20" rx="5" fill="#fdf0ee" stroke="rgba(200,80,60,0.35)" stroke-width="1"/>
        <rect x="687" y="95" width="96" height="10" rx="2" fill="#c0694a" fill-opacity="0.55"/>
        <line x1="675" y1="104" x2="675" y2="92" stroke="#c0694a" stroke-width="1.5" stroke-dasharray="3,2"/>
        <rect x="680" y="208" width="110" height="20" rx="5" fill="#fdf0ee" stroke="rgba(200,80,60,0.35)" stroke-width="1"/>
        <rect x="687" y="213" width="96" height="10" rx="2" fill="#c0694a" fill-opacity="0.55"/>
        <rect x="680" y="310" width="110" height="20" rx="5" fill="#fdf0ee" stroke="rgba(200,80,60,0.35)" stroke-width="1"/>
        <rect x="687" y="315" width="96" height="10" rx="2" fill="#c0694a" fill-opacity="0.55"/>
        <!-- buttons -->
        <rect x="185" y="360" width="100" height="26" rx="4" fill="#2a2860"/><rect x="192" y="367" width="86" height="12" rx="3" fill="rgba(255,255,255,0.7)"/>
        <rect x="296" y="360" width="80" height="26" rx="4" fill="none" stroke="#d8d4cc" stroke-width="1"/><rect x="303" y="367" width="66" height="12" rx="3" fill="#d0ccc8"/>
      </svg>
    </div>
    <div class="c-after" id="ca">
      <svg viewBox="0 0 900 460" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
        <rect width="900" height="460" fill="#faf9f7"/>
        <rect width="900" height="40" fill="white" stroke="#f0ede8" stroke-width="0.5"/>
        <rect x="12" y="10" width="90" height="20" rx="4" fill="#e85c23"/><rect x="17" y="14" width="80" height="12" rx="3" fill="rgba(255,255,255,0.85)"/>
        <rect x="120" y="14" width="58" height="12" rx="3" fill="none"/><rect x="125" y="17" width="48" height="6" rx="2" fill="#c8c4bc"/>
        <rect x="188" y="14" width="70" height="12" rx="3" fill="none"/><rect x="193" y="17" width="60" height="6" rx="2" fill="#c8c4bc"/>
        <circle cx="854" cy="20" r="10" fill="#f0ede8"/><circle cx="878" cy="20" r="10" fill="#1a4f8a"/><circle cx="902" cy="20" r="14" fill="#e8b8a0"/>
        <!-- Clean form left -->
        <rect x="0" y="40" width="570" height="420" fill="white"/>
        <rect x="16" y="52" width="220" height="6" rx="2" fill="#e0dcd8"/>
        <rect x="16" y="64" width="260" height="16" rx="3" fill="#1a1a18"/>
        <rect x="16" y="86" width="48" height="14" rx="5" fill="#1a4f8a" fill-opacity="0.1"/><rect x="20" y="90" width="40" height="6" rx="2" fill="#1a4f8a" fill-opacity="0.5"/>
        <rect x="16" y="108" width="80" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="16" y="120" width="530" height="68" rx="6" fill="#faf9f7" stroke="#e8e4dc" stroke-width="0.5"/>
        <rect x="24" y="130" width="480" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="24" y="140" width="400" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="24" y="150" width="440" height="5" rx="2" fill="#c8c4bc"/>
        <rect x="24" y="160" width="320" height="5" rx="2" fill="#c8c4bc"/>
        <!-- 2 clean dropdowns -->
        <rect x="16" y="198" width="252" height="30" rx="6" fill="#faf9f7" stroke="#e8e4dc" stroke-width="0.5"/><rect x="24" y="208" width="100" height="6" rx="2" fill="#c8c4bc"/>
        <rect x="280" y="198" width="252" height="30" rx="6" fill="#faf9f7" stroke="#e8e4dc" stroke-width="0.5"/><rect x="288" y="208" width="80" height="6" rx="2" fill="#c8c4bc"/>
        <!-- AI chips subjects -->
        <rect x="16" y="240" width="76" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="16" y="252" width="118" height="20" rx="10" fill="#e8f0fa"/><rect x="24" y="257" width="102" height="10" rx="5" fill="#378add" fill-opacity="0.5"/>
        <rect x="142" y="252" width="102" height="20" rx="10" fill="#e8f0fa"/><rect x="150" y="257" width="86" height="10" rx="5" fill="#378add" fill-opacity="0.5"/>
        <rect x="252" y="252" width="86" height="20" rx="10" fill="#e8f0fa"/><rect x="260" y="257" width="70" height="10" rx="5" fill="#378add" fill-opacity="0.5"/>
        <!-- AI chips keywords -->
        <rect x="16" y="284" width="76" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="16" y="296" width="130" height="20" rx="10" fill="#e8f0fa"/><rect x="24" y="301" width="114" height="10" rx="5" fill="#378add" fill-opacity="0.5"/>
        <rect x="154" y="296" width="110" height="20" rx="10" fill="#e8f0fa"/><rect x="162" y="301" width="94" height="10" rx="5" fill="#378add" fill-opacity="0.5"/>
        <rect x="272" y="296" width="92" height="20" rx="10" fill="#e8f0fa"/><rect x="280" y="301" width="76" height="10" rx="5" fill="#378add" fill-opacity="0.5"/>
        <!-- skill tags green -->
        <rect x="16" y="328" width="76" height="7" rx="2" fill="#b8b4ad"/>
        <rect x="16" y="340" width="102" height="20" rx="10" fill="#e4f2ea"/><rect x="24" y="345" width="86" height="10" rx="5" fill="#1e6640" fill-opacity="0.4"/>
        <rect x="126" y="340" width="86" height="20" rx="10" fill="#e4f2ea"/><rect x="134" y="345" width="70" height="10" rx="5" fill="#1e6640" fill-opacity="0.4"/>
        <!-- buttons -->
        <rect x="16" y="376" width="96" height="28" rx="6" fill="#f0ede8" stroke="#e0dcd8" stroke-width="0.5"/><rect x="24" y="384" width="80" height="12" rx="3" fill="#c8c4bc"/>
        <rect x="124" y="376" width="120" height="28" rx="6" fill="#1a4f8a"/><rect x="132" y="384" width="104" height="12" rx="3" fill="rgba(255,255,255,0.8)"/>
        <!-- Apollo AI panel right -->
        <rect x="570" y="40" width="330" height="420" fill="#f8f7f5" stroke="#e8e4dc" stroke-width="0.5"/>
        <rect x="570" y="40" width="330" height="50" fill="#1a4f8a"/>
        <circle cx="587" cy="65" r="10" fill="#378add" fill-opacity="0.5"/>
        <rect x="603" y="59" width="80" height="8" rx="3" fill="rgba(255,255,255,0.85)"/>
        <rect x="603" y="71" width="120" height="5" rx="2" fill="rgba(255,255,255,0.4)"/>
        <rect x="868" y="56" width="20" height="18" rx="3" fill="rgba(255,255,255,0.1)"/>
        <!-- Resume smart edit -->
        <rect x="580" y="102" width="78" height="5" rx="2" fill="#b8b4ad"/>
        <rect x="580" y="114" width="310" height="30" rx="6" fill="#fdf0dc" stroke="rgba(122,74,16,0.25)" stroke-width="1"/>
        <rect x="592" y="122" width="12" height="12" rx="6" fill="#7a4a10" fill-opacity="0.4"/>
        <rect x="610" y="124" width="110" height="8" rx="3" fill="#7a4a10" fill-opacity="0.5"/>
        <!-- Add translations -->
        <rect x="580" y="152" width="310" height="30" rx="6" fill="white" stroke="#e8e4dc" stroke-width="0.5"/>
        <rect x="592" y="160" width="12" height="12" rx="6" fill="#1a4f8a" fill-opacity="0.35"/>
        <rect x="610" y="162" width="95" height="8" rx="3" fill="#1a4f8a" fill-opacity="0.5"/>
        <!-- Suggested section -->
        <rect x="580" y="194" width="78" height="5" rx="2" fill="#b8b4ad"/>
        <rect x="580" y="206" width="310" height="26" rx="5" fill="white" stroke="#e8e4dc" stroke-width="0.5"/>
        <rect x="590" y="214" width="10" height="10" rx="5" fill="#c8c4bc"/><rect x="606" y="216" width="80" height="6" rx="2" fill="#c8c4bc"/>
        <circle cx="876" cy="219" r="7" fill="#3a9e62"/><path d="M873 219 L875.5 221.5 L879 217" stroke="white" stroke-width="1.3" fill="none"/>
        <rect x="580" y="238" width="310" height="26" rx="5" fill="white" stroke="#e8e4dc" stroke-width="0.5"/>
        <rect x="590" y="246" width="10" height="10" rx="5" fill="#c8c4bc"/><rect x="606" y="248" width="70" height="6" rx="2" fill="#c8c4bc"/>
        <circle cx="876" cy="251" r="7" fill="#3a9e62"/><path d="M873 251 L875.5 253.5 L879 249" stroke="white" stroke-width="1.3" fill="none"/>
        <rect x="580" y="270" width="310" height="26" rx="5" fill="white" stroke="#e8e4dc" stroke-width="0.5"/>
        <rect x="590" y="278" width="10" height="10" rx="5" fill="#c8c4bc"/><rect x="606" y="280" width="90" height="6" rx="2" fill="#c8c4bc"/>
        <circle cx="876" cy="283" r="7" fill="#3a9e62"/><path d="M873 283 L875.5 285.5 L879 281" stroke="white" stroke-width="1.3" fill="none"/>
        <!-- ask apollo -->
        <rect x="580" y="390" width="310" height="34" rx="17" fill="white" stroke="#e8e4dc" stroke-width="0.5"/>
        <rect x="594" y="402" width="155" height="10" rx="5" fill="#e0dcd8"/>
        <circle cx="874" cy="407" r="11" fill="#1a4f8a"/>
        <rect x="869" y="402" width="10" height="10" rx="2" fill="rgba(255,255,255,0.8)"/>
        <rect x="580" y="430" width="310" height="7" rx="3" fill="#f0ede8"/>
        <rect x="586" y="432" width="190" height="3" rx="1" fill="#c8c4bc"/>
      </svg>
    </div>
    <div class="c-div" id="cdiv"></div>
    <div class="c-handle" id="chandle">‹ ›</div>
    <div class="c-lbl b">Before</div>
    <div class="c-lbl a">After</div>
  </div>
  <p class="compare-hint">← Drag the handle to compare →</p>

  <div class="ann-row">
    <div class="ann-side ann-before">
      <div class="ann-lbl">Problems with the old design</div>
      <div class="ann-item"><div class="ann-n">1</div><div class="ann-t"><strong>Navigation maze</strong> — massive left sidebar with 40+ items; 5–6 clicks to reach any common action</div></div>
      <div class="ann-item"><div class="ann-n">2</div><div class="ann-t"><strong>Empty fields by default</strong> — every form blank, requiring 25–60 minutes of manual typing per course</div></div>
      <div class="ann-item"><div class="ann-n">3</div><div class="ann-t"><strong>Three disconnected dropdowns</strong> in a row with no relationship or smart defaults between them</div></div>
      <div class="ann-item"><div class="ann-n">4</div><div class="ann-t"><strong>No AI panel, no context</strong> — identical experience regardless of content type or user history</div></div>
    </div>
    <div class="ann-side ann-after">
      <div class="ann-lbl">Decisions made in the redesign</div>
      <div class="ann-item"><div class="ann-n">1</div><div class="ann-t"><strong>Apollo AI sidebar</strong> — persistent, context-aware panel that replaces navigation with intelligent action surfacing</div></div>
      <div class="ann-item"><div class="ann-n">2</div><div class="ann-t"><strong>AI-auto-populated chips</strong> — subjects, keywords, skills generated instantly from uploaded content and flagged "Added"</div></div>
      <div class="ann-item"><div class="ann-n">3</div><div class="ann-t"><strong>Resume Smart Edit</strong> — amber CTA at the top of the panel that restores full session state on re-entry</div></div>
      <div class="ann-item"><div class="ann-n">4</div><div class="ann-t"><strong>Green confirmation system</strong> — every AI action is visible, reviewable, and reversible — trust built by design</div></div>
    </div>
  </div>
</div>

<!-- ═══ PAIN POINTS ═══ -->
<div class="chapter reveal">
  <div class="ch-num">07</div>
  <div class="ch-label">Pain points</div>
  <div class="ch-title">Real friction. <em>Real people.<br>Real cost.</em></div>
  <p style="font-size:0.84rem;color:var(--ink2);margin-bottom:2rem;max-width:58ch;line-height:1.72;">Each pain point is backed by research, told as a human story, and mapped directly to the design decision that fixed it.</p>

  <div class="pp-ov">
    <div class="pp-ov-i on" onclick="showPP(0,this)">
      <div class="pp-ov-n">01</div>
      <div class="pp-ov-title">Metadata overload</div>
      <div class="pp-ov-sub">1,700 min/month wasted</div>
    </div>
    <div class="pp-ov-i" onclick="showPP(1,this)">
      <div class="pp-ov-n">02</div>
      <div class="pp-ov-title">Translation friction</div>
      <div class="pp-ov-sub">40 clicks per 8 courses</div>
    </div>
    <div class="pp-ov-i" onclick="showPP(2,this)">
      <div class="pp-ov-n">03</div>
      <div class="pp-ov-title">Session amnesia</div>
      <div class="pp-ov-sub">Zero continuity between sessions</div>
    </div>
  </div>

  <div class="pp-pnl on" id="pp0">
    <div class="pp-card">
      <div class="pp-top">
        <div>
          <div class="pp-etag">😩 Frustration · Repetition · Time drain</div>
          <div class="pp-stitle">Every Monday. Every course. From scratch.</div>
          <div class="pp-sbody">Priya opens a new course creation form. Every field is empty. The platform knows nothing about the content she just uploaded. She manually types a title, crafts a description, hunts for the right subjects, guesses at keywords, and tags skills one by one.<br><br>Then she does it again for the next course. And the next. <strong>1,700 minutes every month</strong> across just 10 admins.</div>
        </div>
        <div class="pp-ev">
          <div class="pp-ev-lbl">Research evidence</div>
          <div class="pp-ev-n" style="color:#8a1a1a;">1,700</div>
          <div class="pp-ev-s">Admin minutes/month on metadata alone for 10 people — before Apollo AI</div>
          <div class="pp-q">"I spend more time filling in forms than actually thinking about learning strategy. Same work, every week."<div class="pp-qa">— Enterprise L&D Admin, contextual inquiry</div></div>
        </div>
      </div>
      <div class="pp-screens">
        <div class="pp-sp">
          <div class="pp-sp-lbl">Old flow — 13 steps, 25–60 min per course</div>
          <div class="sflow"><span class="sp neu">Open form</span><span class="sarr">→</span><span class="sp bad">Type title</span><span class="sarr">→</span><span class="sp bad">Write desc.</span><span class="sarr">→</span><span class="sp bad">Find subjects</span><span class="sarr">→</span><span class="sp bad">Add keywords</span><span class="sarr">→</span><span class="sp bad">Tag skills</span><span class="sarr">→</span><span class="sp neu">Publish</span></div>
          <div class="spnote">Zero AI assistance. Empty fields for every content type. No memory of previous courses.</div>
        </div>
        <div class="pp-sp">
          <div class="pp-sp-lbl">New flow — 4 min with Apollo AI</div>
          <div class="sflow"><span class="sp good">Upload content</span><span class="sarr">→</span><span class="sp good">AI reads & generates all fields</span><span class="sarr">→</span><span class="sp good">Review</span><span class="sarr">→</span><span class="sp good">Publish ✓</span></div>
          <div class="fcall"><div class="fci">⚡</div><div><div class="fct">Apollo AI metadata generation</div><div class="fcd">Auto-generates title, description, keywords, subjects & skill tags from uploaded content. Every suggestion reviewable and editable.</div></div></div>
        </div>
      </div>
      <div class="pp-sol">
        <div class="pp-sol-arr">↑</div>
        <div><div class="pp-sol-lbl">Solution</div><div class="pp-sol-t">Apollo AI auto-populates all metadata from uploaded content</div><div class="pp-sol-b">Admins verify, not create. Content understanding eliminated. AI reads, generates, and presents everything for one-click review.</div></div>
        <div class="pp-sol-m"><div class="pp-sol-n">91%</div><div class="pp-sol-u">time saved · 1,700→160 min/mo</div></div>
      </div>
    </div>
  </div>

  <div class="pp-pnl" id="pp1">
    <div class="pp-card">
      <div class="pp-top">
        <div>
          <div class="pp-etag">😤 Repetition · Mechanical · Waste</div>
          <div class="pp-stitle">8 courses. 5 steps each. Every. Single. Week.</div>
          <div class="pp-sbody">It's Thursday. Priya needs to translate 8 courses into French for the EMEA rollout. She opens the first course, selects language, triggers translation, waits for it to process, closes it, opens the next one.<br><br>That's 5 steps × 8 courses = <strong>40 mechanical clicks</strong> to do something that should take 30 seconds. She has done this exact workflow every single week for 2 years.</div>
        </div>
        <div class="pp-ev">
          <div class="pp-ev-lbl">Research evidence</div>
          <div class="pp-ev-n" style="color:var(--amber);">5 min</div>
          <div class="pp-ev-s">For 8 translations that should take under 1 minute. 40 manual clicks per batch, every week.</div>
          <div class="pp-q">"The translation part is the worst. I know what I need to do — the platform just makes me do it eight times instead of once."<div class="pp-qa">— L&D Administrator, Fortune 500 company</div></div>
        </div>
      </div>
      <div class="pp-screens">
        <div class="pp-sp">
          <div class="pp-sp-lbl">Old flow — 5 steps × 8 = 40 clicks</div>
          <div class="sflow"><span class="sp bad">Open course</span><span class="sarr">→</span><span class="sp bad">Select lang.</span><span class="sarr">→</span><span class="sp bad">Trigger</span><span class="sarr">→</span><span class="sp bad">Wait…</span><span class="sarr">→</span><span class="sp bad">Close → ×8</span></div>
          <div class="spnote">Static, sequential, no batch processing. Language selection from memory — no priority logic.</div>
        </div>
        <div class="pp-sp">
          <div class="pp-sp-lbl">New flow — 1 click, under 1 minute</div>
          <div class="sflow"><span class="sp good">Open AI Assist</span><span class="sarr">→</span><span class="sp good">Languages auto-prioritised</span><span class="sarr">→</span><span class="sp good">Translate All → Done ✓</span></div>
          <div class="fcall"><div class="fci">🌐</div><div><div class="fct">Smart language logic + edge cases</div><div class="fcd">Prioritises portal languages. Completed ones hidden. Partial fills stay selectable with info labels.</div></div></div>
        </div>
      </div>
      <div class="pp-sol">
        <div class="pp-sol-arr">↑</div>
        <div><div class="pp-sol-lbl">Solution</div><div class="pp-sol-t">Multi-select AI translation with smart language logic</div><div class="pp-sol-b">One click handles all available portal languages simultaneously. Smart edge-case handling throughout. No repetition. No mistakes.</div></div>
        <div class="pp-sol-m"><div class="pp-sol-n">90%</div><div class="pp-sol-u">time saved · 5 min→&lt;1 min</div></div>
      </div>
    </div>
  </div>

  <div class="pp-pnl" id="pp2">
    <div class="pp-card">
      <div class="pp-top">
        <div>
          <div class="pp-etag">😰 Interruption · Rework · Lost progress</div>
          <div class="pp-stitle">You close the panel. It forgets everything.</div>
          <div class="pp-sbody">It's Friday at 3pm. Priya is halfway through editing a complex course. Her manager pings her. She minimises, handles it, comes back. She reopens the AI Assist panel.<br><br><strong>Blank. Every suggestion gone.</strong> She has to start over, re-read the material, re-enter context. The system has zero memory of what was happening 10 minutes ago.</div>
        </div>
        <div class="pp-ev">
          <div class="pp-ev-lbl">Research evidence</div>
          <div class="pp-ev-n" style="color:var(--blue);">#1</div>
          <div class="pp-ev-s">Most-cited post-launch improvement in admin feedback. No competing LMS had session continuity at launch.</div>
          <div class="pp-q">"Every time I close something and come back, it's like I never started. It doesn't remember me at all."<div class="pp-qa">— Admin user, diary study week 3</div></div>
        </div>
      </div>
      <div class="pp-screens">
        <div class="pp-sp">
          <div class="pp-sp-lbl">Old behaviour — every closure = restart</div>
          <div class="sflow"><span class="sp neu">Open panel</span><span class="sarr">→</span><span class="sp good">Build context</span><span class="sarr">→</span><span class="sp bad">Interrupted</span><span class="sarr">→</span><span class="sp bad">Panel closed</span><span class="sarr">→</span><span class="sp bad">Return → blank</span><span class="sarr">→</span><span class="sp bad">Restart</span></div>
          <div class="spnote">All AI-built context lost on every interruption. Rework was invisible but constant and demoralising.</div>
        </div>
        <div class="pp-sp">
          <div class="pp-sp-lbl">New behaviour — Resume Smart Edit</div>
          <div class="sflow"><span class="sp neu">Open panel</span><span class="sarr">→</span><span class="sp good">Build context</span><span class="sarr">→</span><span class="sp neu">Interrupted</span><span class="sarr">→</span><span class="sp good">Return → ↩ Resume</span><span class="sarr">→</span><span class="sp good">Continue instantly</span></div>
          <div class="fcall"><div class="fci">🔄</div><div><div class="fct">Resume Smart Edit — session memory</div><div class="fcd">System persists session state. "Resume" prompt appears on re-entry. Zero rework. The platform remembers you.</div></div></div>
        </div>
      </div>
      <div class="pp-sol">
        <div class="pp-sol-arr">↑</div>
        <div><div class="pp-sol-lbl">Solution</div><div class="pp-sol-t">Resume Smart Edit — persistent AI session continuity</div><div class="pp-sol-b">Designed as a trust mechanism, not a convenience. Continuity signals respect for user time — a signal that compounded into the #1 post-launch feedback item.</div></div>
        <div class="pp-sol-m"><div class="pp-sol-n">#1</div><div class="pp-sol-u">post-launch feedback · industry first</div></div>
      </div>
    </div>
  </div>
</div>



<!-- ═══ IMPACT ═══ -->
<div class="chapter reveal">
  <div class="ch-num">08</div>
  <div class="ch-label">Overall impact</div>
  <div class="ch-title">Numbers that tell <em>the real story.</em></div>
  <div class="metrics-hero">
    <div class="mh-num">150K</div>
    <div class="mh-label">Customer cases logged yearly — 10% reduction (~15K cases) through better self-service</div>
    <div class="mh-sub">Faster resolution times &amp; higher customer satisfaction scores post-launch</div>
  </div>
  <div class="m3">
    <div class="m3c"><div class="m3v">4,000+ <span class="marr">↑</span></div><div class="m3l">Pages via search navigation</div><div class="m3d">Persona-based secure access with far fewer clicks</div></div>
    <div class="m3c"><div class="m3v">16.6 <span style="font-size:1.4rem;">Days</span></div><div class="m3l">Avg. case resolution time</div><div class="m3d">Reduced invalid cases and better self-service cut cycles</div></div>
    <div class="m3c"><div class="m3v">1-Click <span class="marr">↑</span></div><div class="m3l">Navigation for admins</div><div class="m3d">Replaces 5–6 click flows — eliminating repetitive daily effort</div></div>
  </div>
  <div class="prod2">
    <div class="pc"><div class="pc-h"><div class="pc-v">90%</div><div class="pc-t">Time saved on translations (30% steps reduction)</div></div><div class="pc-b"><div class="pc-bf">Before: 8 translations took 5 minutes with repetitive steps</div><div class="pc-af">After: AI multi-select + auto-translation in under 1 minute</div></div></div>
    <div class="pc"><div class="pc-h"><div class="pc-v">91%</div><div class="pc-t">Time saved on metadata entry (160 min/month)</div></div><div class="pc-b"><div class="pc-bf">Before: Manual entry took 1,700 minutes/month across 10 admins</div><div class="pc-af">After: AI suggestions applied — reduced to 160 minutes/month</div></div></div>
  </div>
</div>

<!-- ═══ LEARNINGS ═══ -->
<div class="chapter reveal">
  <div class="ch-num">09</div>
  <div class="ch-label">Learnings &amp; way forward</div>
  <div class="ch-title">What this taught me — <em>and what comes next.</em></div>
  <div class="learn3">
    <div class="lc reveal d1"><div class="lc-icon">✌️</div><div class="lc-title">AI must preserve agency, not eliminate it</div><div class="lc-text">The most trusted AI feature wasn't the most automated — it was the most transparent. Suggestions with confidence scores and easy override beats AI that simply acts.</div></div>
    <div class="lc reveal d2"><div class="lc-icon">🤝</div><div class="lc-title">Continuity is a trust signal, not a convenience</div><div class="lc-text">Resume Smart Edit was scoped as minor. Post-launch it became the highest-cited improvement. When a system remembers you, it communicates respect for your time.</div></div>
    <div class="lc reveal d3"><div class="lc-icon">🫶</div><div class="lc-title">AI workflows must be felt, not just functional</div><div class="lc-text">Streamlining content creation end-to-end while building user confidence at every step reduces anxiety, improves satisfaction, and cuts avoidable support cases at scale.</div></div>
  </div>
  <div class="wf4 reveal">
    <div class="wf p"><div class="wf-tag">Near-term · 6–12 months</div><div class="wf-t">Agentic content pipelines — AI that orchestrates, not just assists</div><div class="wf-d">Figma, Notion, and Salesforce are already building agentic layers — systems that draft, translate, and publish end-to-end with human approval at meaningful decision points. For CSX: AI-orchestrated content pipelines with enterprise audit trails.</div><div class="wf-hz">Horizon: Agentic UX · Orchestration layers</div></div>
    <div class="wf"><div class="wf-tag">Near-term · 6–12 months</div><div class="wf-t">Predictive intent surfaces — before the admin even searches</div><div class="wf-d">Behavioral signals — time of day, role, recent actions — can power a proactive surface that surfaces the right tools first. The pattern Google Workspace and Microsoft 365 Copilot are converging on. For LMS: a dynamic start screen that evolves with usage.</div><div class="wf-hz">Horizon: Predictive UX · Adaptive surfaces</div></div>
    <div class="wf"><div class="wf-tag">Medium-term · 12–24 months</div><div class="wf-t">Multimodal content intelligence — AI that deeply understands learning context</div><div class="wf-d">LLM-powered content tagging, auto-captioning, and skill taxonomy mapping are feasible now. The UX challenge: build review flows that let admins trust AI-generated metadata at scale. Workday, SAP SuccessFactors, Degreed are converging on "AI draft + human polish."</div><div class="wf-hz">Horizon: Multimodal AI · LLM content ops</div></div>
    <div class="wf"><div class="wf-tag">Medium-term · 12–24 months</div><div class="wf-t">Skills-graph personalisation at the learner layer</div><div class="wf-d">The admin-side work creates infrastructure for a dynamic skills graph connecting learner behaviour to workforce planning. LinkedIn Learning and Cornerstone's Workforce Intelligence team are building UX that surfaces skill gaps in the moment of work — not in a separate LMS session.</div><div class="wf-hz">Horizon: Skills intelligence · Ambient learning UX</div></div>
  </div>
</div>

</div><!-- end ch-wrap -->

<div class="next-proj" role="link" aria-label="Go to next case study: Buildzar" style="cursor:pointer;">
  <div>
    <div style="font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;color:var(--ink3);margin-bottom:0.5rem;">Next case study →</div>
    <div style="font-family:var(--serif);font-size:1.6rem;letter-spacing:-0.02em;">Buildzar</div>
  </div>
  <div style="font-size:1.5rem;color:var(--ink3);">→</div>
</div>

<footer>
  <div class="fl">Let's build something meaningful.<span>vimala@design.io</span></div>
  <div class="fr"><a href="/">← All work</a><a href="https://www.linkedin.com/in/vimalabanavath/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="#">Resume ↗</a></div>
</footer>
`

export default function CornerstonePage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Next case study click handler
    const currentSlug = 'cornerstone'
    const currentIdx = caseStudyOrder.findIndex((c) => c.slug === currentSlug)
    const nextCase = caseStudyOrder[(currentIdx + 1) % caseStudyOrder.length]
    const nextProjEl = document.querySelector('.next-proj') as HTMLElement | null
    const handleNextClick = () => navigate(`/work/${nextCase.slug}`)
    if (nextProjEl) nextProjEl.addEventListener('click', handleNextClick)

    // Progress bar
    const handleScroll = () => {
      const h = document.documentElement
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      const bar = document.getElementById('progress')
      if (bar) bar.style.width = pct + '%'
    }
    window.addEventListener('scroll', handleScroll)

    // Scroll reveal
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))

    // Storyboard
    let currentScene = 0
    const totalScenes = 4
    ;(window as any).goScene = (n: number) => {
      document.querySelectorAll('.sb-scene').forEach((s, i) => s.classList.toggle('active', i === n))
      document.querySelectorAll('.sb-dot').forEach((d, i) => d.classList.toggle('active', i === n))
      currentScene = n
      const info = document.getElementById('sb-info')
      if (info) info.textContent = 'Scene ' + (n + 1) + ' of ' + totalScenes
      const prev = document.getElementById('sb-prev') as HTMLElement
      if (prev) prev.style.opacity = n === 0 ? '0.3' : '1'
      const next = document.getElementById('sb-next')
      if (next) next.textContent = n === totalScenes - 1 ? 'End of story' : 'Next scene →'
    }
    ;(window as any).nextScene = () => { if (currentScene < totalScenes - 1) (window as any).goScene(currentScene + 1) }
    ;(window as any).prevScene = () => { if (currentScene > 0) (window as any).goScene(currentScene - 1) }
    ;(window as any).goScene(0)

    // Tabs
    ;(window as any).switchTab = (id: string, btn: HTMLElement) => {
      document.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'))
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'))
      const panel = document.getElementById(id)
      if (panel) panel.classList.add('active')
      btn.classList.add('active')
    }

    // Pain points
    ;(window as any).showPP = (i: number) => {
      document.querySelectorAll('.pp-pnl').forEach((p, j) => p.classList.toggle('on', j === i))
      document.querySelectorAll('.pp-ov-i').forEach((o, j) => o.classList.toggle('on', j === i))
    }

    // Compare slider
    const cw = document.getElementById('cw')
    const ca = document.getElementById('ca')
    const cdiv = document.getElementById('cdiv')
    const chandle = document.getElementById('chandle')
    if (cw && ca && cdiv && chandle) {
      let drag = false
      const setPos = (x: number) => {
        const r = cw.getBoundingClientRect()
        let p = ((x - r.left) / r.width) * 100
        p = Math.max(5, Math.min(95, p))
        ca.style.clipPath = 'inset(0 ' + (100 - p) + '% 0 0)'
        cdiv.style.left = p + '%'
        chandle.style.left = p + '%'
      }
      cw.addEventListener('mousedown', (e: Event) => { drag = true; setPos((e as MouseEvent).clientX) })
      window.addEventListener('mousemove', (e: Event) => { if (drag) setPos((e as MouseEvent).clientX) })
      window.addEventListener('mouseup', () => { drag = false })
      cw.addEventListener('touchstart', (e: Event) => { drag = true; setPos((e as TouchEvent).touches[0].clientX) }, { passive: true })
      window.addEventListener('touchmove', (e: Event) => { if (drag) setPos((e as TouchEvent).touches[0].clientX) }, { passive: true })
      window.addEventListener('touchend', () => { drag = false })
    }

    // Animated counters
    const animateCounter = (el: HTMLElement, target: number, suffix: string) => {
      let start = 0
      const step = 1800 / target
      const timer = setInterval(() => {
        start++
        el.textContent = start + suffix
        if (start >= target) clearInterval(timer)
      }, step)
    }
    const counterObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-target]').forEach((el) => {
            animateCounter(el as HTMLElement, parseInt((el as HTMLElement).dataset.target || '0'), '%')
          })
          counterObs.unobserve(e.target)
        }
      }),
      { threshold: 0.5 }
    )
    const tldr = document.querySelector('.tldr')
    if (tldr) counterObs.observe(tldr)

    return () => {
      if (nextProjEl) nextProjEl.removeEventListener('click', handleNextClick)
      window.removeEventListener('scroll', handleScroll)
      obs.disconnect()
      counterObs.disconnect()
      delete (window as any).goScene
      delete (window as any).nextScene
      delete (window as any).prevScene
      delete (window as any).switchTab
      delete (window as any).showPP
    }
  }, [navigate])

  return (
    <>
      <Navbar />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}
