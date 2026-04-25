import { useState, useEffect, useRef } from "react";
import {
  AlertTriangle, Bell, BarChart2, Calendar, CheckCircle, ChevronDown, ChevronRight,
  Clock, Database, Download, FileText, Filter, HelpCircle, Home,
  MessageSquare, Search, Shield, Tag, Users, XCircle, Zap, Activity,
  BookOpen, Package, TrendingUp, Info, ArrowUp, ArrowDown, Minus, Eye,
  RefreshCw, Star, Globe, Layers, Mail, Phone, Hash, Edit3, Copy, Send,
  Plus, CheckSquare, Upload
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#070c18;color:#e2e8f0;font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-size:14px;line-height:1.5}
  ::-webkit-scrollbar{width:6px;height:6px}
  ::-webkit-scrollbar-track{background:#0d1426}
  ::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:3px}
  .portal-wrap{display:flex;height:100vh;overflow:hidden}
  /* Sidebar */
  .sidebar{width:240px;min-width:240px;background:#09111f;border-right:1px solid #1a2740;display:flex;flex-direction:column;overflow-y:auto}
  .sidebar-logo{padding:20px 20px 16px;border-bottom:1px solid #1a2740}
  .logo-mark{font-size:17px;font-weight:700;color:#fff;letter-spacing:-0.3px}
  .logo-mark span{color:#3b82f6}
  .logo-sub{font-size:10px;color:#4a6280;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px}
  .nav-section{padding:12px 8px 4px}
  .nav-label{font-size:10px;color:#3a5070;letter-spacing:1.2px;text-transform:uppercase;padding:0 8px;margin-bottom:4px}
  .nav-item{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:8px;cursor:pointer;color:#7a96b0;font-size:13px;font-weight:500;transition:all .15s;margin-bottom:2px}
  .nav-item:hover{background:#0f1f35;color:#c8d8e8}
  .nav-item.active{background:linear-gradient(90deg,#1a3a6e,#122c55);color:#7ab8ff;border-left:2px solid #3b82f6}
  .nav-item svg{width:16px;height:16px;flex-shrink:0}
  .nav-badge{margin-left:auto;background:#ef4444;color:#fff;font-size:10px;font-weight:700;padding:2px 6px;border-radius:10px}
  .nav-badge.warn{background:#d97706}
  /* Main */
  .main-area{flex:1;overflow-y:auto;background:#070c18}
  .page-header{padding:24px 32px 0;border-bottom:1px solid #1a2740;background:#09111f}
  .page-title{font-size:22px;font-weight:700;color:#f1f5f9;letter-spacing:-0.5px}
  .page-sub{font-size:13px;color:#4a6280;margin-top:3px;padding-bottom:20px}
  .content-area{padding:24px 32px}
  /* Cards */
  .card{background:#0d1829;border:1px solid #1a2740;border-radius:12px;padding:20px}
  .card-sm{background:#0d1829;border:1px solid #1a2740;border-radius:10px;padding:16px}
  .card-title{font-size:13px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:.8px;margin-bottom:16px}
  /* Grid */
  .grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
  .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
  /* Status badges */
  .badge{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;letter-spacing:.3px}
  .badge-live{background:#052e16;color:#22c55e;border:1px solid #166534}
  .badge-dev{background:#1c1917;color:#f59e0b;border:1px solid #92400e}
  .badge-new{background:#0c1a4a;color:#60a5fa;border:1px solid #1d4ed8}
  .badge-limited{background:#1e1a2e;color:#c084fc;border:1px solid #7c3aed}
  .badge-down{background:#2d0a0a;color:#f87171;border:1px solid #991b1b}
  .badge-inprog{background:#1c1917;color:#fb923c;border:1px solid #c2410c}
  .badge-done{background:#052e16;color:#4ade80;border:1px solid #15803d}
  /* Alert */
  .alert{border-radius:10px;padding:14px 18px;display:flex;align-items:flex-start;gap:12px;margin-bottom:12px}
  .alert-crit{background:#200a0a;border:1px solid #7f1d1d;border-left:4px solid #ef4444}
  .alert-warn{background:#1c1206;border:1px solid #78350f;border-left:4px solid #f59e0b}
  .alert-info{background:#071828;border:1px solid #1e3a6e;border-left:4px solid #3b82f6}
  /* Table */
  .table{width:100%;border-collapse:collapse}
  .table th{text-align:left;font-size:11px;color:#4a6280;text-transform:uppercase;letter-spacing:.8px;padding:10px 16px;border-bottom:1px solid #1a2740;background:#09111f;font-weight:600}
  .table td{padding:12px 16px;border-bottom:1px solid #131f32;font-size:13px;color:#c8d8e8}
  .table tr:hover td{background:#0f1a2e}
  /* Product dot */
  .dot{width:8px;height:8px;border-radius:50%;display:inline-block;flex-shrink:0}
  .dot-live{background:#22c55e}
  .dot-dev{background:#f59e0b}
  .dot-new{background:#3b82f6}
  .dot-limited{background:#a855f7}
  .dot-down{background:#ef4444}
  /* Progress */
  .progress-wrap{height:6px;background:#1a2740;border-radius:3px;overflow:hidden}
  .progress-bar{height:100%;border-radius:3px;transition:width .4s}
  /* Timeline */
  .timeline-item{display:flex;gap:16px;padding-bottom:20px;position:relative}
  .timeline-item:not(:last-child):before{content:'';position:absolute;left:14px;top:30px;width:1px;height:calc(100% - 10px);background:#1a2740}
  .timeline-dot{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
  /* Tabs */
  .tabs{display:flex;gap:4px;border-bottom:1px solid #1a2740;margin-bottom:20px;overflow-x:auto}
  .tab{padding:8px 16px;font-size:13px;font-weight:500;color:#4a6280;cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;white-space:nowrap;transition:all .15s}
  .tab:hover{color:#94a3b8}
  .tab.active{color:#60a5ff;border-bottom-color:#3b82f6}
  /* Search input */
  .search-wrap{position:relative;display:inline-flex}
  .search-wrap svg{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:#4a6280;width:14px;height:14px}
  .search-input{background:#0d1829;border:1px solid #1a2740;border-radius:8px;padding:8px 12px 8px 32px;color:#c8d8e8;font-size:13px;outline:none;transition:border .15s}
  .search-input:focus{border-color:#2d5a9e}
  .search-input::placeholder{color:#364c63}
  /* Select */
  .select{background:#0d1829;border:1px solid #1a2740;border-radius:8px;padding:8px 14px;color:#c8d8e8;font-size:13px;outline:none;cursor:pointer}
  /* Btn */
  .btn{display:inline-flex;align-items:center;gap:6px;padding:8px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s;border:none}
  .btn-primary{background:#1d4ed8;color:#fff}
  .btn-primary:hover{background:#2563eb}
  .btn-ghost{background:#0d1829;color:#94a3b8;border:1px solid #1a2740}
  .btn-ghost:hover{background:#111f35;color:#c8d8e8}
  .btn-danger{background:#7f1d1d;color:#fca5a5;border:1px solid #991b1b}
  /* Stat card */
  .stat-card{background:#0d1829;border:1px solid #1a2740;border-radius:12px;padding:20px}
  .stat-val{font-size:28px;font-weight:700;color:#f1f5f9;letter-spacing:-1px;line-height:1}
  .stat-label{font-size:12px;color:#4a6280;margin-top:6px;font-weight:500}
  .stat-delta{font-size:12px;display:flex;align-items:center;gap:4px;margin-top:8px;font-weight:600}
  .delta-up{color:#22c55e}
  .delta-down{color:#ef4444}
  .delta-flat{color:#94a3b8}
  /* Entity history */
  .hist-item{padding:10px 0;border-bottom:1px solid #131f32;display:flex;gap:12px;align-items:flex-start}
  .hist-date{font-size:11px;color:#4a6280;min-width:80px;font-family:'JetBrains Mono',monospace;margin-top:1px}
  /* Tag */
  .tag{display:inline-flex;align-items:center;gap:4px;font-size:11px;padding:2px 8px;border-radius:4px;background:#112;color:#7ab8ff;border:1px solid #1a3a6e;font-weight:500}
  /* Toggle */
  .toggle-btn{padding:5px 12px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;border:1px solid #1a2740;background:transparent;color:#4a6280;transition:all .15s}
  .toggle-btn.active{background:#0f2a56;color:#60a5ff;border-color:#1d4ed8}
  /* Health indicator */
  .health-row{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #131f32}
  .health-row:last-child{border-bottom:none}
  .uptime-bar{flex:1;height:8px;background:#1a2740;border-radius:4px;overflow:hidden;position:relative}
  .uptime-fill{height:100%;border-radius:4px;background:linear-gradient(90deg,#22c55e,#16a34a)}
  .uptime-fill.warn{background:linear-gradient(90deg,#f59e0b,#d97706)}
  .uptime-fill.down{background:linear-gradient(90deg,#ef4444,#dc2626)}
  /* Tooltip */
  .chip{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:6px;font-size:12px;background:#0f1e35;border:1px solid #1a3050;color:#7a96b0;cursor:default}
  .chip svg{width:12px;height:12px}
  /* Report Library */
  .rlib-card{background:#0d1829;border:1px solid #1a2740;border-radius:12px;padding:14px 16px;cursor:pointer;transition:all .15s;display:flex;gap:12px;align-items:flex-start}
  .rlib-card:hover{border-color:#2d5a9e;background:#0f1e38}
  .rlib-card.active{border-color:#1d4ed8;background:#0d1e38}
  .rlib-actions{display:flex;gap:5px;opacity:0;transition:opacity .15s;flex-shrink:0}
  .rlib-card:hover .rlib-actions,.rlib-card.active .rlib-actions{opacity:1}
  .rlib-icon-btn{background:transparent;border:1px solid #1a2740;border-radius:6px;padding:3px 8px;color:#4a6280;font-size:11px;cursor:pointer;display:flex;align-items:center;gap:4px;transition:all .12s;font-family:inherit;white-space:nowrap}
  .rlib-icon-btn:hover{background:#0f2a56;color:#60a5ff;border-color:#2d5a9e}
  .rlib-icon-btn.danger:hover{background:#200a0a;color:#f87171;border-color:#7f1d1d}
  .rlib-search{background:#070c18;border:1px solid #1a2740;border-radius:8px;padding:8px 12px 8px 34px;color:#c8d8e8;font-size:13px;outline:none;width:100%;font-family:inherit;transition:border .15s}
  .rlib-search:focus{border-color:#2d5a9e}
  .rlib-search::placeholder{color:#2a3f55}
  /* report-card kept for backward compat */
  .report-card{background:#0d1829;border:1px solid #1a2740;border-radius:12px;overflow:hidden;cursor:pointer;transition:border-color .15s}
  .report-card:hover{border-color:#2d5a9e}
  .report-thumb{height:100px;background:linear-gradient(135deg,#071832,#0f2a56);display:flex;align-items:center;justify-content:center}
  .report-info{padding:14px 16px}
  /* Enhanced product cards */
  .sd-card{position:relative;border-radius:20px;overflow:hidden;cursor:pointer;transition:transform .25s,box-shadow .25s;border:1px solid rgba(255,255,255,.06);display:flex;flex-direction:column}
  .sd-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(0,0,0,.5)}
  .sd-card-top{height:5px;width:100%;flex-shrink:0}
  .sd-card-body{flex:1;padding:24px 22px 18px;display:flex;flex-direction:column}
  .sd-card-logo{width:58px;height:58px;border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;flex-shrink:0}
  .sd-card-name{font-size:21px;font-weight:800;color:#f1f5f9;margin-bottom:5px;letter-spacing:-.3px}
  .sd-card-desc{font-size:12.5px;color:#6a8aaa;line-height:1.65;flex:1;margin-bottom:16px}
  .sd-card-footer{display:flex;align-items:center;justify-content:space-between;padding-top:12px;border-top:1px solid rgba(255,255,255,.06)}
  .sd-card-chip{padding:3px 9px;border-radius:5px;font-size:11px;font-weight:600;display:inline-flex;align-items:center;gap:4px}
  .sd-card-arrow{display:flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;color:#60a5ff;opacity:.6;transition:opacity .15s}
  .sd-card:hover .sd-card-arrow{opacity:1}

  /* Comparison highlight */
  .compare-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #131f32}
  .compare-row:last-child{border-bottom:none}
  /* Owners */
  .owner-chip{display:inline-flex;align-items:center;gap:6px;padding:4px 10px 4px 4px;border-radius:20px;background:#0f1e35;border:1px solid #1a3050}
  .avatar{width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#fff;flex-shrink:0}
  /* FAQ accordion */
  .faq-item{border:1px solid #1a2740;border-radius:10px;margin-bottom:8px;overflow:hidden}
  .faq-q{display:flex;justify-content:space-between;align-items:center;padding:14px 18px;cursor:pointer;font-weight:500;color:#c8d8e8;transition:background .15s}
  .faq-q:hover{background:#0f1e35}
  .faq-a{padding:0 18px 14px;color:#7a96b0;font-size:13px;line-height:1.7;border-top:1px solid #1a2740;background:#0a1525}
  /* Pulse */
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
  .pulse{animation:pulse 2s infinite}
  /* Score ring */
  .score-ring{position:relative;display:inline-flex;align-items:center;justify-content:center}
  /* Integration form */
  .form-group{margin-bottom:16px}
  .form-label{display:block;font-size:12px;font-weight:600;color:#4a6280;text-transform:uppercase;letter-spacing:.6px;margin-bottom:6px}
  .form-input{width:100%;background:#09111f;border:1px solid #1a2740;border-radius:8px;padding:9px 14px;color:#c8d8e8;font-size:13px;outline:none;transition:border .15s}
  .form-input:focus{border-color:#2d5a9e}
  textarea.form-input{resize:vertical;min-height:80px;font-family:inherit}
  /* Scrollable horizontal */
  .scroll-x{overflow-x:auto}
  /* Email template section */
  .tpl-list-item{display:flex;align-items:flex-start;gap:10px;padding:10px 14px;border-radius:8px;cursor:pointer;transition:background .12s;border:1px solid transparent}
  .tpl-list-item:hover{background:#0f1e35}
  .tpl-list-item.active{background:#0f2a56;border-color:#1d4ed8}
  .tpl-cat-label{font-size:10px;color:#3a5a7a;letter-spacing:1.2px;text-transform:uppercase;padding:12px 14px 4px;font-weight:600}
  .tpl-preview-body{background:#09111f;border:1px solid #1a2740;border-radius:10px;padding:20px 24px;white-space:pre-wrap;font-family:'JetBrains Mono',monospace;font-size:12.5px;line-height:1.8;color:#94a3b8;max-height:420px;overflow-y:auto}
  .tpl-var{background:#0c1a4a;color:#60a5ff;border:1px solid #1d4ed830;border-radius:4px;padding:1px 4px;font-size:12px;cursor:pointer}
  .tpl-var.filled{background:#052e16;color:#4ade80;border-color:#15803d30}
  .var-input{background:#09111f;border:1px solid #1a2740;border-radius:6px;padding:6px 10px;color:#c8d8e8;font-size:12px;font-family:'JetBrains Mono',monospace;outline:none;width:100%;transition:border .15s}
  .var-input:focus{border-color:#2d5a9e}
  .var-input::placeholder{color:#2a3f55}
  .copy-flash{animation:copyFlash .6s ease forwards}
  @keyframes copyFlash{0%{background:#052e16}100%{background:transparent}}
  .cat-pill{display:inline-flex;align-items:center;gap:4px;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:600;cursor:pointer;border:1px solid #1a2740;color:#4a6280;transition:all .12s}
  .cat-pill:hover{border-color:#2d5a9e;color:#7ab8ff}
  .cat-pill.active{background:#0f2a56;border-color:#1d4ed8;color:#60a5ff}
  .tpl-subject-bar{background:#0a1525;border:1px solid #1a2740;border-radius:8px;padding:10px 16px;margin-bottom:12px;font-size:13px;color:#94a3b8;font-family:'JetBrains Mono',monospace}
  .tpl-subject-bar strong{color:#4a6280;font-size:11px;letter-spacing:.8px;text-transform:uppercase;display:block;margin-bottom:3px}
  /* Product grid cards */
  .prod-grid-card{border-radius:16px;padding:28px 24px;cursor:pointer;position:relative;overflow:hidden;transition:transform .2s,box-shadow .2s;border:1px solid rgba(255,255,255,.06)}
  .prod-grid-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.4)}
  .prod-grid-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.04),transparent);pointer-events:none}
  .prod-icon-circle{width:56px;height:56px;border-radius:16px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;flex-shrink:0}
  .prod-stat-chip{padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600}
  /* Admin modal */
  .admin-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:2000;display:flex;align-items:center;justify-content:center;padding:20px}
  .admin-modal{background:#09111f;border:1px solid #1a2740;border-radius:16px;width:100%;max-width:520px;overflow:hidden}
  .admin-modal-hdr{padding:18px 22px;border-bottom:1px solid #1a2740;display:flex;align-items:center;justify-content:space-between}
  .admin-modal-body{padding:20px 22px}
  .admin-field{margin-bottom:14px}
  .admin-field label{display:block;font-size:11px;font-weight:600;color:#4a6280;text-transform:uppercase;letter-spacing:.6px;margin-bottom:5px}
  .admin-input{width:100%;background:#070c18;border:1px solid #1a2740;border-radius:8px;padding:9px 12px;color:#c8d8e8;font-size:13px;outline:none;font-family:inherit;transition:border .15s}
  .admin-input:focus{border-color:#2d5a9e}
  .admin-input::placeholder{color:#2a3f55}
  .admin-select{width:100%;background:#070c18;border:1px solid #1a2740;border-radius:8px;padding:9px 12px;color:#c8d8e8;font-size:13px;outline:none;font-family:inherit}
  .admin-textarea{resize:vertical;min-height:80px}
  .detail-tab{padding:8px 18px;border:none;background:transparent;cursor:pointer;font-size:13px;font-weight:500;color:#4a6280;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .15s;display:flex;align-items:center;gap:6px;white-space:nowrap}
  .detail-tab.active{color:#60a5ff;border-bottom-color:#3b82f6;font-weight:700}
  .detail-tab:hover:not(.active){color:#94a3b8}
  .tc-row{display:grid;grid-template-columns:60px 1fr 1fr 100px 90px;gap:0;border-bottom:1px solid #131f32;align-items:center}
  .tc-row:hover{background:#0a1525}
  .tc-cell{padding:9px 12px;font-size:12.5px;color:#94a3b8}
  .tc-hdr{background:#0a1525;border-bottom:2px solid #1a2740}
  .tc-hdr .tc-cell{font-size:11px;font-weight:700;color:#4a6280;text-transform:uppercase;letter-spacing:.6px}

  .gen-overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:1000;display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:20px}
  .gen-modal{background:#09111f;border:1px solid #1a2740;border-radius:16px;width:100%;max-width:860px;overflow:hidden;margin:auto}
  .gen-modal-header{padding:18px 24px;border-bottom:1px solid #1a2740;display:flex;align-items:center;justify-content:space-between}
  .gen-modal-title{font-size:16px;font-weight:700;color:#f1f5f9}
  .gen-close-btn{background:transparent;border:none;cursor:pointer;color:#4a6280;display:flex;align-items:center;justify-content:center;padding:4px;border-radius:6px;transition:color .15s}
  .gen-close-btn:hover{color:#c8d8e8;background:#0f1e35}
  .gen-body{padding:20px 24px}
  .gen-prod-tabs{display:flex;gap:8px;margin-bottom:20px;flex-wrap:wrap}
  .gen-prod-tab{padding:7px 16px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:1px solid #1a2740;color:#4a6280;background:transparent;transition:all .15s}
  .gen-prod-tab:hover{border-color:#2d5a9e;color:#7ab8ff}
  .gen-prod-tab.active{background:#0f2a56;border-color:#1d4ed8;color:#60a5ff}
  .gen-form-row{display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px;margin-bottom:16px}
  .gen-label{font-size:11px;font-weight:600;color:#4a6280;letter-spacing:.6px;text-transform:uppercase;margin-bottom:5px}
  .gen-input{background:#070c18;border:1px solid #1a2740;border-radius:8px;padding:9px 12px;color:#c8d8e8;font-size:13px;outline:none;width:100%;transition:border .15s;font-family:inherit}
  .gen-input:focus{border-color:#2d5a9e}
  .gen-input::placeholder{color:#2a3f55}
  .gen-input::-webkit-calendar-picker-indicator{filter:invert(.4)}
  .gen-upload-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
  .gen-upload-zone{border:1.5px dashed #1a2740;border-radius:10px;padding:20px 16px;text-align:center;cursor:pointer;transition:all .15s;background:transparent;position:relative}
  .gen-upload-zone:hover{border-color:#2d5a9e;background:rgba(59,130,246,.04)}
  .gen-upload-zone.dragover{border-color:#3b82f6;background:rgba(59,130,246,.08)}
  .gen-upload-zone.has-file{border-color:#22c55e;border-style:solid;background:rgba(34,197,94,.04)}
  .gen-upload-icon{font-size:24px;margin-bottom:8px}
  .gen-upload-title{font-size:13px;font-weight:600;color:#94a3b8;margin-bottom:3px}
  .gen-upload-sub{font-size:11px;color:#364c63}
  .gen-upload-pill{display:none;margin-top:8px;padding:5px 10px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);border-radius:6px;font-size:11px;color:#22c55e}
  .gen-upload-pill.show{display:block}
  .gen-btn-wrap{margin-top:4px}
  .gen-generate-btn{width:100%;padding:13px;background:linear-gradient(135deg,#1d4ed8,#1e3a8a);border:none;border-radius:10px;color:#fff;font-size:14px;font-weight:700;cursor:pointer;transition:opacity .15s,transform .1s;letter-spacing:.02em}
  .gen-generate-btn:hover:not(:disabled){opacity:.92;transform:translateY(-1px)}
  .gen-generate-btn:disabled{background:rgba(255,255,255,.06);color:rgba(255,255,255,.25);cursor:not-allowed}
  .gen-progress{background:#070c18;border:1px solid #1a2740;border-radius:10px;padding:16px 18px;margin-top:14px}
  .gen-progress-label{font-size:13px;color:#94a3b8;margin-bottom:10px;font-weight:500}
  .gen-progress-track{background:#1a2740;border-radius:100px;height:4px;overflow:hidden}
  .gen-progress-fill{height:100%;background:linear-gradient(90deg,#3b82f6,#60a5fa);border-radius:100px;transition:width .4s ease}
  .gen-steps{display:flex;gap:6px;margin-top:12px;flex-wrap:wrap}
  .gen-step{font-size:11px;padding:3px 10px;border:1px solid #1a2740;border-radius:100px;color:#364c63;font-weight:500;transition:all .2s}
  .gen-step.active{color:#60a5ff;border-color:rgba(59,130,246,.5);background:rgba(59,130,246,.08)}
  .gen-step.done{color:#22c55e;border-color:rgba(34,197,94,.4);background:rgba(34,197,94,.06)}
  .gen-alert{border-radius:8px;padding:10px 14px;margin-top:12px;font-size:13px;display:none}
  .gen-alert.show{display:block}
  .gen-alert.error{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.3);color:#f87171}
  .gen-alert.success{background:rgba(34,197,94,.07);border:1px solid rgba(34,197,94,.3);color:#4ade80}
  .gen-instr{background:rgba(59,130,246,.03);border:1px solid rgba(59,130,246,.15);border-radius:10px;overflow:hidden;margin-bottom:14px}
  .gen-instr-header{padding:12px 16px;cursor:pointer;display:flex;align-items:center;gap:10px;transition:background .12s}
  .gen-instr-header:hover{background:rgba(59,130,246,.05)}
  .gen-instr-body{padding:12px 16px 16px;border-top:1px solid rgba(59,130,246,.12)}
  .gen-instr-step{display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;font-size:12px;color:#7a96b0;line-height:1.6}
  .gen-instr-num{width:20px;height:20px;border-radius:50%;background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.3);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:#60a5ff;flex-shrink:0;margin-top:1px}
  .gen-tab-chip{display:inline-block;background:#071020;color:#4a8fcf;border:1px solid #1a3050;padding:1px 7px;border-radius:4px;font-size:11px;font-family:monospace}
  .wt-tbl-wrap{overflow-x:auto;margin-bottom:14px}
  .wt-tbl{width:100%;border-collapse:collapse;font-size:12px}
  .wt-tbl th{background:#0f1e35;color:#60a5ff;padding:7px 10px;border:1px solid #1a2740;font-weight:600;text-align:left;white-space:nowrap}
  .wt-tbl td{padding:6px 10px;border:1px solid #131f32;background:#0a1220;color:#94a3b8;vertical-align:middle}
  .wt-tbl tr:hover td{background:#0d1829}
  .wt-small-input{background:#070c18;border:1px solid #1a2740;border-radius:5px;padding:5px 8px;color:#c8d8e8;font-size:12px;outline:none;width:100%;font-family:inherit}
  .wt-small-input:focus{border-color:#2d5a9e}
  .gen-section-lbl{font-size:11px;font-weight:700;color:#3b82f6;text-transform:uppercase;letter-spacing:.8px;margin:16px 0 8px;display:flex;align-items:center;gap:6px}
  /* Activity item */
  .act-item{display:flex;gap:14px;padding:12px 0;border-bottom:1px solid #131f32}
  .act-item:last-child{border-bottom:none}
  .act-icon{width:32px;height:32px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
  /* Version chip */
  .ver-chip{font-family:'JetBrains Mono',monospace;font-size:11px;background:#071020;border:1px solid #1a3050;color:#4a8fcf;padding:2px 8px;border-radius:4px}
  /* Env label */
  .env{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:1px 7px;border-radius:4px}
  .env-prod{background:#052e16;color:#22c55e;border:1px solid #14532d}
  .env-uat{background:#1c1206;color:#f59e0b;border:1px solid #78350f}
  .env-stg{background:#0c1a4a;color:#60a5fa;border:1px solid #1e3a8a}
  /* Postman badge */
  .postman-badge{display:inline-flex;align-items:center;gap:6px;background:#2c0f0a;border:1px solid #7c2d12;color:#fb923c;padding:4px 12px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;transition:background .15s;user-select:none}
  .postman-badge:hover{background:#3d1409}
  .postman-panel{background:#0a1220;border:1px solid #1a2740;border-radius:10px;overflow:hidden;margin-top:10px}
  .postman-panel-header{padding:10px 16px;background:#0d1829;border-bottom:1px solid #1a2740;display:flex;align-items:center;justify-content:space-between}
  .postman-row{display:flex;align-items:center;gap:12px;padding:11px 16px;border-bottom:1px solid #0f1a2c;transition:background .12s}
  .postman-row:last-child{border-bottom:none}
  .postman-row:hover{background:#0d1e35}
  .postman-env-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}
  .postman-run-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:6px;font-size:11px;font-weight:700;background:#2c0f0a;color:#fb923c;border:1px solid #7c2d12;cursor:pointer;transition:background .12s;white-space:nowrap}
  .postman-run-btn:hover{background:#3d1409}
  .postman-dl-btn{display:inline-flex;align-items:center;gap:5px;padding:4px 10px;border-radius:6px;font-size:11px;font-weight:600;background:#0d1829;color:#7a96b0;border:1px solid #1a2740;cursor:pointer;transition:background .12s;white-space:nowrap}
  .postman-dl-btn:hover{background:#111f35;color:#c8d8e8}
  /* Flex utils */
  .flex{display:flex}.items-center{align-items:center}.justify-between{justify-content:space-between}.gap-2{gap:8px}.gap-3{gap:12px}.gap-4{gap:16px}.mt-1{margin-top:4px}.mt-2{margin-top:8px}.mt-3{margin-top:12px}.mt-4{margin-top:16px}.mt-6{margin-top:24px}.mb-2{margin-bottom:8px}.mb-3{margin-bottom:12px}.mb-4{margin-bottom:16px}.mb-6{margin-bottom:24px}.flex-1{flex:1}.w-full{width:100%}.text-right{text-align:right}
  .text-muted{color:#4a6280}.text-sm{font-size:12px}.text-xs{font-size:11px}.font-mono{font-family:'JetBrains Mono',monospace}.font-bold{font-weight:700}.font-semibold{font-weight:600}
  .truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .opacity-60{opacity:.6}
  .rounded{border-radius:8px}
`;

/* ─────────────────────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────────────────────── */
const PRODUCTS = [
  { id:"rhoon",   name:"Rhoon",   statusKey:"live",    env:"Production", desc:"Active partner onboarding & training sessions ongoing", color:"#22c55e", colorDim:"#052e16", alert:"ADP service on staging is DOWN", version:"v3.2.1" },
  { id:"rabet",   name:"Rabet",   statusKey:"live",    env:"Production", desc:"No new companies onboarded, supporting existing ones",  color:"#22c55e", colorDim:"#052e16", alert:null,                              version:"v2.8.4" },
  { id:"bahri",   name:"Bahri",   statusKey:"dev",     env:"UAT",        desc:"Under active development – UAT environment",            color:"#f59e0b", colorDim:"#1c1206", alert:null,                              version:"v0.9.2" },
  { id:"tajeeri", name:"Tajeeri", statusKey:"dev",     env:"Dev",        desc:"Under development – no active sites yet",               color:"#f59e0b", colorDim:"#1c1206", alert:null,                              version:"v0.4.0" },
  { id:"wtheeq",  name:"Wtheeq",  statusKey:"new",     env:"Production", desc:"Newly launched – new companies actively onboarded",     color:"#3b82f6", colorDim:"#0c1a4a", alert:null,                             version:"v1.1.0" },
  { id:"mulem",   name:"Mulem",   statusKey:"new",     env:"Production", desc:"Newly launched – new companies actively onboarded",     color:"#3b82f6", colorDim:"#0c1a4a", alert:null,                             version:"v1.0.3" },
  { id:"shary",   name:"Shary",   statusKey:"limited", env:"Production", desc:"Service launched – currently supporting limited cases", color:"#a855f7", colorDim:"#1e1a2e", alert:null,                             version:"v1.2.1" },
];

const STATUS_META = {
  live:    { label:"Live",          cls:"badge-live",    dotCls:"dot-live",    icon:CheckCircle  },
  dev:     { label:"In Development",cls:"badge-dev",     dotCls:"dot-dev",     icon:Clock        },
  new:     { label:"Newly Launched",cls:"badge-new",     dotCls:"dot-new",     icon:Zap          },
  limited: { label:"Limited",       cls:"badge-limited", dotCls:"dot-limited", icon:Shield       },
  down:    { label:"Down",          cls:"badge-down",    dotCls:"dot-down",    icon:XCircle      },
};

const TEAM = [
  { product:"Rhoon",   main:"Malak Al-Rashidi",   support:["Omar Hassan","Hamdan Al-Ali"],  email:"malak@slashdata.ae"  },
  { product:"Rabet",   main:"Sara Al-Mahmoud",    support:["Khalid Nasser"],                email:"sara@slashdata.ae"   },
  { product:"Bahri",   main:"Yousef Al-Amiri",    support:["Nora Khaled","Tarek Saleh"],    email:"yousef@slashdata.ae" },
  { product:"Tajeeri", main:"Fatima Al-Zaabi",    support:["Rashid Al-Mansouri"],           email:"fatima@slashdata.ae" },
  { product:"Wtheeq",  main:"Ahmed Al-Suwaidi",   support:["Layla Hamdan","Kareem Qasim"], email:"ahmed@slashdata.ae"  },
  { product:"Mulem",   main:"Hessa Al-Marzooqi",  support:["Bilal Al-Farsi"],               email:"hessa@slashdata.ae"  },
  { product:"Shary",   main:"Saeed Al-Hosani",    support:["Mariam Yousuf","Faisal Saif"],  email:"saeed@slashdata.ae"  },
];

const UPDATES = [
  { id:1, product:"Rhoon",   date:"Apr 24, 2025", type:"fix",     title:"ADP staging service outage detected",      desc:"ADP endpoint returning 503 on staging. Escalated to ADP support team. ETA: 2 hours.", tags:["Critical","ADP"] },
  { id:2, product:"Wtheeq",  date:"Apr 23, 2025", type:"feature", title:"Bulk company onboarding API released",     desc:"New endpoint /v2/companies/bulk now live in production. Supports up to 50 entities per request.", tags:["API","Onboarding"] },
  { id:3, product:"Rhoon",   date:"Apr 22, 2025", type:"done",    title:"DIB integration testing completed",        desc:"All 47 test cases passed. Integration marked as complete pending go-live sign-off.", tags:["DIB","Testing"] },
  { id:4, product:"Bahri",   date:"Apr 21, 2025", type:"feature", title:"Document upload flow redesigned",          desc:"New multi-step upload with validation and retry logic. Deployed to UAT.", tags:["UAT","Upload"] },
  { id:5, product:"Mulem",   date:"Apr 20, 2025", type:"done",    title:"Abu Dhabi Finance integration live",       desc:"Successfully onboarded ADF onto Mulem. Go-live confirmed by client.", tags:["Go-live","ADF"] },
  { id:6, product:"Rabet",   date:"Apr 19, 2025", type:"info",    title:"Quarterly API usage report shared",        desc:"Transaction volume up 12% QoQ. 3 new API consumers identified.", tags:["Report","Analytics"] },
  { id:7, product:"Shary",   date:"Apr 18, 2025", type:"fix",     title:"Authentication timeout bug patched",       desc:"JWT expiry edge case fixed. Sessions were expiring 10 min early.", tags:["Auth","Bug"] },
  { id:8, product:"Tajeeri", date:"Apr 17, 2025", type:"feature", title:"Core data model v0.4 finalized",           desc:"Entity schema approved by product team. Dev sprint begins next Monday.", tags:["Schema","Dev"] },
  { id:9, product:"Rhoon",   date:"Apr 15, 2025", type:"info",    title:"Training session with FAB – 12 attendees", desc:"Covered API auth, transaction flow, and error handling. Recording shared.", tags:["Training","FAB"] },
];

const TEST_CASES = {
  Rhoon: [
    { id:"TC-001", feature:"Authentication",     status:"passed", env:"Prod",    steps:4, date:"Apr 22, 2025" },
    { id:"TC-002", feature:"Transaction Submit",  status:"passed", env:"Prod",    steps:7, date:"Apr 22, 2025" },
    { id:"TC-003", feature:"Bulk Onboarding",     status:"passed", env:"Staging", steps:5, date:"Apr 20, 2025" },
    { id:"TC-004", feature:"ADP Sync",            status:"failed", env:"Staging", steps:3, date:"Apr 24, 2025" },
    { id:"TC-005", feature:"Webhook Delivery",    status:"passed", env:"Prod",    steps:6, date:"Apr 18, 2025" },
  ],
  Wtheeq: [
    { id:"TC-001", feature:"Company Registration",status:"passed", env:"Prod",    steps:8, date:"Apr 23, 2025" },
    { id:"TC-002", feature:"Document Validation", status:"passed", env:"Prod",    steps:4, date:"Apr 21, 2025" },
    { id:"TC-003", feature:"API Key Rotation",    status:"pending",env:"UAT",     steps:5, date:"Apr 19, 2025" },
  ],
};

const POSTMAN_COLLECTIONS = {
  Rhoon: [
    { env:"Production", label:"Rhoon API – Production",     requests:42, folders:8,  updated:"Apr 20, 2025", version:"v3.2.1", status:"current",    url:"#" },
    { env:"Staging",    label:"Rhoon API – Staging",        requests:47, folders:9,  updated:"Apr 24, 2025", version:"v3.3.0", status:"in-progress", url:"#" },
    { env:"Sandbox",    label:"Rhoon API – Sandbox",        requests:38, folders:7,  updated:"Apr 10, 2025", version:"v3.2.1", status:"current",     url:"#" },
  ],
  Rabet: [
    { env:"Production", label:"Rabet API – Production v2.8",requests:31, folders:6,  updated:"Mar 28, 2025", version:"v2.8.4", status:"current",    url:"#" },
    { env:"Staging",    label:"Rabet API – Staging v2.9",   requests:35, folders:7,  updated:"Apr 14, 2025", version:"v2.9.0", status:"in-progress", url:"#" },
  ],
  Bahri: [
    { env:"UAT",        label:"Bahri API – UAT",            requests:24, folders:5,  updated:"Apr 21, 2025", version:"v0.9.2", status:"in-progress", url:"#" },
    { env:"Dev",        label:"Bahri API – Dev",            requests:29, folders:6,  updated:"Apr 17, 2025", version:"v0.9.3", status:"in-progress", url:"#" },
  ],
  Tajeeri: [
    { env:"Dev",        label:"Tajeeri API – Dev",          requests:12, folders:3,  updated:"Apr 17, 2025", version:"v0.4.0", status:"in-progress", url:"#" },
  ],
  Wtheeq: [
    { env:"Production", label:"Wtheeq API – Production",    requests:28, folders:5,  updated:"Apr 20, 2025", version:"v1.1.0", status:"current",    url:"#" },
    { env:"UAT",        label:"Wtheeq API – UAT",           requests:31, folders:6,  updated:"Apr 18, 2025", version:"v1.1.0", status:"current",     url:"#" },
    { env:"Sandbox",    label:"Wtheeq API – Sandbox",       requests:25, folders:5,  updated:"Apr 15, 2025", version:"v1.0.3", status:"current",     url:"#" },
  ],
  Mulem: [
    { env:"Production", label:"Mulem API – Production",     requests:22, folders:4,  updated:"Apr 05, 2025", version:"v1.0.3", status:"current",    url:"#" },
    { env:"UAT",        label:"Mulem API – UAT",            requests:26, folders:5,  updated:"Apr 03, 2025", version:"v1.0.3", status:"current",     url:"#" },
  ],
  Shary: [
    { env:"Production", label:"Shary API – Production",     requests:18, folders:4,  updated:"Apr 02, 2025", version:"v1.2.1", status:"current",    url:"#" },
    { env:"Staging",    label:"Shary API – Staging",        requests:21, folders:4,  updated:"Mar 30, 2025", version:"v1.2.2", status:"in-progress", url:"#" },
  ],
};

const FAQS = {
  Rhoon: [
    { q:"What is the SLA for transaction processing?",   a:"Standard SLA is 5 seconds p95. For batch transactions, up to 30 seconds. SLA breaches auto-trigger alerts to the integration team." },
    { q:"How do we handle ADP service outages?",         a:"Transactions are queued for up to 4 hours during ADP outages. After 4 hours, the queue is flushed and clients are notified via webhook. A manual replay endpoint is available." },
    { q:"What authentication method does Rhoon use?",    a:"OAuth 2.0 with client credentials flow. Tokens expire after 3600 seconds. Use the /auth/token endpoint to refresh." },
    { q:"Can we test against a sandbox environment?",    a:"Yes. Use api-sandbox.rhoon.slashdata.ae. Sandbox credentials are issued per-company through the developer portal." },
  ],
  Rabet: [
    { q:"How are existing companies migrated to new API versions?", a:"Rabet follows a 6-month versioning policy. Deprecation notices are sent 90 days before EOL. Migration guides are available in the documentation section." },
    { q:"What data formats are supported?",              a:"JSON (primary), XML (legacy support), and CSV for bulk data exports. All responses include content-type headers." },
  ],
  Bahri: [
    { q:"What UAT environment limitations should I be aware of?", a:"UAT uses synthetic data only. No real transaction processing. Rate limits are 10x more restrictive than production. UI may differ from final design." },
  ],
  Wtheeq: [
    { q:"What is the onboarding timeline for a new company?",     a:"Average 3-5 business days from document submission to go-live. Includes document review (1-2 days), integration setup (1 day), and UAT sign-off (1-2 days)." },
    { q:"How many companies can be onboarded simultaneously?",    a:"No hard limit, but integration team capacity allows 5-8 parallel onboardings. Use the bulk API for high-volume scenarios." },
  ],
  Mulem: [{ q:"Is Mulem compatible with UAEFTS?", a:"Yes, Mulem supports UAEFTS v2 protocol natively. Legacy v1 support ends Q3 2025." }],
  Shary: [{ q:"What case types are currently supported?",         a:"Currently supporting Type A and Type B cases only. Type C and D are under development. ETA Q3 2025." }],
  Tajeeri:[{ q:"Is there a public roadmap for Tajeeri?",         a:"Yes, the product roadmap is shared in the monthly reports section. Core API expected Q2 2025." }],
};

const ENTITIES = [
  { id:"E001", product:"Rhoon",  name:"DIB",  fullName:"Dubai Islamic Bank",         status:"live",    goLive:"Jan 15, 2025", issues:0, meetings:12, lastComm:"Apr 20, 2025", tags:["Banking","Gold Tier"] },
  { id:"E002", product:"Rhoon",  name:"FAB",  fullName:"First Abu Dhabi Bank",       status:"live",    goLive:"Feb 03, 2025", issues:1, meetings:9,  lastComm:"Apr 18, 2025", tags:["Banking","Platinum"] },
  { id:"E003", product:"Rhoon",  name:"ADCB", fullName:"Abu Dhabi Commercial Bank",  status:"inprog",  goLive:"Pending",      issues:2, meetings:5,  lastComm:"Apr 22, 2025", tags:["Banking","Onboarding"] },
  { id:"E004", product:"Rabet",  name:"ENOC", fullName:"Emirates National Oil Co.",  status:"live",    goLive:"Mar 10, 2025", issues:0, meetings:6,  lastComm:"Apr 10, 2025", tags:["Energy","Stable"] },
  { id:"E005", product:"Wtheeq", name:"ADF",  fullName:"Abu Dhabi Finance",          status:"live",    goLive:"Apr 20, 2025", issues:0, meetings:4,  lastComm:"Apr 20, 2025", tags:["Finance","New"] },
  { id:"E006", product:"Wtheeq", name:"DCP",  fullName:"Dubai Customs & Port",       status:"inprog",  goLive:"Pending",      issues:1, meetings:3,  lastComm:"Apr 15, 2025", tags:["Gov","Onboarding"] },
  { id:"E007", product:"Mulem",  name:"DEWA", fullName:"Dubai Electricity & Water",  status:"live",    goLive:"Apr 5, 2025",  issues:0, meetings:7,  lastComm:"Apr 19, 2025", tags:["Utility","New"] },
  { id:"E008", product:"Shary",  name:"ADFG", fullName:"Abu Dhabi Future Gen",       status:"limited", goLive:"Mar 25, 2025", issues:3, meetings:8,  lastComm:"Apr 21, 2025", tags:["Gov","Limited"] },
];

const ENTITY_HISTORY = {
  E001: [
    { date:"Apr 20, 2025", type:"meeting",  note:"Weekly sync – discussed Q2 volume increase. Attendees: Malak, DIB team (5)" },
    { date:"Apr 15, 2025", type:"email",    note:"Sent updated API docs for v3.2 migration" },
    { date:"Apr 10, 2025", type:"training", note:"Refresher training on batch processing. 8 attendees." },
    { date:"Mar 28, 2025", type:"issue",    note:"Transaction timeout on Fridays 14:00-15:00. Identified as CDN routing issue. RESOLVED." },
    { date:"Jan 15, 2025", type:"golive",   note:"DIB went live on Rhoon Production. Go-live sign-off signed by both parties." },
  ],
  E003: [
    { date:"Apr 22, 2025", type:"meeting",  note:"Kickoff meeting – introduced integration flow and docs. Attendees: Malak, ADCB IT team (3)" },
    { date:"Apr 18, 2025", type:"issue",    note:"Sandbox authentication failing with 401. Root cause: misconfigured client_id. RESOLVED." },
    { date:"Apr 14, 2025", type:"issue",    note:"Webhook delivery to ADCB endpoint intermittent. Under investigation." },
    { date:"Apr 10, 2025", type:"email",    note:"Sent onboarding checklist and credential request form" },
  ],
  E008: [
    { date:"Apr 21, 2025", type:"meeting",  note:"Issue review meeting. 3 open cases discussed. Attendees: Saeed, ADFG team (2)" },
    { date:"Apr 14, 2025", type:"issue",    note:"Document upload limit exceeded for large submissions. Workaround: chunked upload. OPEN." },
    { date:"Apr 08, 2025", type:"issue",    note:"Case status sync delay of 15+ min. Escalated. OPEN." },
    { date:"Mar 30, 2025", type:"issue",    note:"Authentication token refresh failing. Patched in v1.2.1. RESOLVED." },
  ],
};

const WEEKLY_REPORTS = [
  { id:"W04", label:"Week 17 – Apr 21-25",  date:"Apr 25, 2025", product:"All", summary:"ADP outage on Rhoon staging, DIB testing complete, Wtheeq bulk API released.", changes:[
    { label:"New entities live",     cur:2,  prev:1,   unit:"",   trend:"up"   },
    { label:"Transactions processed",cur:142800, prev:151200, unit:"",trend:"down"},
    { label:"Avg response time",     cur:234, prev:198,  unit:"ms", trend:"down" },
    { label:"Open issues",           cur:6,  prev:4,   unit:"",   trend:"down" },
    { label:"High-frequency errors", cur:"503 ADP (Rhoon stg)", prev:"401 ADCB (Rhoon)", unit:"", trend:"note" },
  ]},
  { id:"W03", label:"Week 16 – Apr 14-18",  date:"Apr 18, 2025", product:"All", summary:"Shary auth fix, Mulem ADF go-live, Rabet quarterly report.", changes:[
    { label:"New entities live",     cur:1,  prev:0,   unit:"",   trend:"up"   },
    { label:"Transactions processed",cur:151200, prev:139500, unit:"", trend:"up" },
    { label:"Avg response time",     cur:198, prev:212,  unit:"ms", trend:"up"  },
    { label:"Open issues",           cur:4,  prev:7,   unit:"",   trend:"up"   },
    { label:"High-frequency errors", cur:"401 ADCB (Rhoon)",   prev:"504 ENOC (Rabet)", unit:"", trend:"note" },
  ]},
];

const MONTHLY_REPORTS = [
  { id:"M03", label:"March 2025", date:"Apr 1, 2025", products:[
    { name:"Rhoon",   meetings:8, newEntities:2, transactions:"1.2M", issues:3, highlights:["FAB onboarded","Batch API v3.2 released"] },
    { name:"Rabet",   meetings:3, newEntities:0, transactions:"890K", issues:1, highlights:["Version migration 98% complete"] },
    { name:"Wtheeq",  meetings:6, newEntities:4, transactions:"340K", issues:0, highlights:["Bulk onboarding API released","4 new companies"] },
    { name:"Mulem",   meetings:4, newEntities:2, transactions:"210K", issues:1, highlights:["UAE FTS v2 upgrade complete"] },
  ]},
];

/* ─── EMAIL TEMPLATES DATA ─── */
const EMAIL_TEMPLATES = [
  /* ── RHOON ── */
  {
    id:"rhoon-testcases", product:"Rhoon", category:"Testing",
    title:"Test Cases Partner Sheet",
    subject:"{{ProductName}} Integration – Test Cases Sheet | {{PartnerName}}",
    variables:["ProductName","PartnerName","ContactName","EnvName","TotalCases","PassedCases","FailedCases","SheetLink","EngineerName","EngineerEmail"],
    body:`Dear {{ContactName}},

I hope this message finds you well.

Please find below the link to the test cases sheet prepared for your {{ProductName}} integration with {{PartnerName}}.

📋 Test Sheet: {{SheetLink}}
🌐 Environment: {{EnvName}}
✅ Total Cases: {{TotalCases}}  |  Passed: {{PassedCases}}  |  Failed: {{FailedCases}}

Please review the test results at your earliest convenience. For each failed case, a detailed description and steps to reproduce are included in the sheet. Kindly confirm the expected behaviour from your side so we can proceed with the necessary fixes.

Next Steps:
1. Review the failed cases and provide your feedback by [DATE]
2. Our team will apply fixes and re-run the affected cases
3. Once all cases pass, we will proceed to go-live sign-off

If you have any questions or need clarification on any test scenario, please don't hesitate to reach out.

Best regards,
{{EngineerName}}
Integration Engineer – {{ProductName}}
{{EngineerEmail}} | SlashData`
  },
  {
    id:"rhoon-uat", product:"Rhoon", category:"UAT",
    title:"UAT Onboarding Invitation",
    subject:"{{ProductName}} UAT Environment – Access Details | {{PartnerName}}",
    variables:["ProductName","PartnerName","ContactName","UATBaseURL","ClientID","ClientSecret","TokenEndpoint","DocsLink","SupportEmail","EngineerName"],
    body:`Dear {{ContactName}},

Welcome to the {{ProductName}} UAT (User Acceptance Testing) environment!

Your UAT access credentials have been provisioned. Please find the details below:

🌐 Base URL:       {{UATBaseURL}}
🔑 Client ID:      {{ClientID}}
🔐 Client Secret:  {{ClientSecret}}
🎟  Token Endpoint: {{TokenEndpoint}}

Important Notes:
• UAT uses synthetic test data only – no real transactions are processed
• Rate limits in UAT are stricter than production (100 req/min)
• UAT credentials expire after 90 days
• Please do not use real company or personal data in UAT

📖 Integration Documentation: {{DocsLink}}
📧 Support Email: {{SupportEmail}}

We recommend starting with the authentication flow, then progressing through the test cases shared separately.

Our integration team is available to assist with any onboarding questions. Please feel free to schedule a walkthrough session if needed.

Best regards,
{{EngineerName}}
Integration Engineer – {{ProductName}}
SlashData Integration Team`
  },
  {
    id:"rhoon-training", product:"Rhoon", category:"Training",
    title:"Training Session Request",
    subject:"Training Session Request – {{ProductName}} API Integration | {{PartnerName}}",
    variables:["ProductName","PartnerName","ContactName","ProposedDate1","ProposedDate2","ProposedDate3","Duration","Topics","MeetingPlatform","EngineerName","EngineerEmail"],
    body:`Dear {{ContactName}},

I hope you're doing well.

As part of our onboarding process for {{PartnerName}}'s integration with {{ProductName}}, we'd like to schedule a technical training session to walk your team through the API and integration flow.

Proposed Dates (please select one that works best):
  📅 Option 1: {{ProposedDate1}}
  📅 Option 2: {{ProposedDate2}}
  📅 Option 3: {{ProposedDate3}}

Session Details:
  ⏱ Duration: {{Duration}}
  💻 Platform: {{MeetingPlatform}}
  📋 Topics to be covered:
     {{Topics}}

Please reply with your preferred date and the names/emails of attendees from your side so we can send the calendar invite accordingly.

If none of the proposed slots work, feel free to suggest an alternative.

Looking forward to connecting with your team!

Best regards,
{{EngineerName}}
Integration Engineer – {{ProductName}}
{{EngineerEmail}}`
  },
  {
    id:"rhoon-golive", product:"Rhoon", category:"Go-Live",
    title:"Go-Live Announcement",
    subject:"🚀 Go-Live Confirmation – {{PartnerName}} on {{ProductName}} | {{GoLiveDate}}",
    variables:["ProductName","PartnerName","ContactName","GoLiveDate","LiveURL","SupportEmail","SLALink","EngineerName","EscalationEmail"],
    body:`Dear {{ContactName}},

We are pleased to confirm that {{PartnerName}}'s integration with {{ProductName}} has successfully gone live as of {{GoLiveDate}}!

🎉 Go-Live Summary:
  ✅ Environment: Production
  🌐 Live URL: {{LiveURL}}
  📅 Go-Live Date: {{GoLiveDate}}

Post-Launch Support:
  📧 Primary Support: {{SupportEmail}}
  📈 SLA Reference: {{SLALink}}
  🚨 Escalation Contact: {{EscalationEmail}}

What to expect now:
• Our team will actively monitor your integration for the first 72 hours
• Any production issues will be triaged within 1 business hour
• A post-launch review call will be scheduled after 2 weeks

Thank you for your collaboration throughout the integration process. We look forward to a successful partnership.

Best regards,
{{EngineerName}}
Integration Engineer – {{ProductName}}
SlashData Integration Team`
  },
  {
    id:"rhoon-kickoff", product:"Rhoon", category:"Onboarding",
    title:"Integration Kickoff Email",
    subject:"{{ProductName}} Integration Kickoff – Welcome, {{PartnerName}}!",
    variables:["ProductName","PartnerName","ContactName","KickoffDate","KickoffLink","DocsLink","ChecklistLink","EngineerName","EngineerEmail","Timeline"],
    body:`Dear {{ContactName}},

Welcome aboard! We're excited to kick off the {{ProductName}} integration journey with {{PartnerName}}.

📅 Kickoff Meeting: {{KickoffDate}}
🔗 Meeting Link: {{KickoffLink}}

To help us get started efficiently, please review the following materials before the kickoff:

  📖 Integration Documentation: {{DocsLink}}
  ✅ Onboarding Checklist: {{ChecklistLink}}

Expected Integration Timeline:
{{Timeline}}

During the kickoff, we'll cover:
1. Overview of the {{ProductName}} API and architecture
2. Authentication and security model
3. End-to-end transaction flow
4. Test environment setup and credentials
5. Q&A and next steps

Your dedicated integration engineer will be {{EngineerName}}, reachable at {{EngineerEmail}}.

We look forward to a smooth and successful integration!

Best regards,
{{EngineerName}}
Integration Engineer – {{ProductName}}
SlashData`
  },
  {
    id:"rhoon-issue", product:"Rhoon", category:"Issue Management",
    title:"Issue Escalation Email",
    subject:"[ESCALATION] {{IssueTitle}} – {{ProductName}} | Ref: {{IssueID}}",
    variables:["ProductName","PartnerName","ContactName","IssueID","IssueTitle","IssueDesc","Severity","ImpactedFlow","StepsToReproduce","FirstOccurrence","EngineerName","EscalationEmail"],
    body:`Dear {{ContactName}},

I'm reaching out regarding a {{Severity}}-severity issue identified in the {{ProductName}} integration for {{PartnerName}}.

🔖 Issue Reference: {{IssueID}}
⚠️  Severity: {{Severity}}
📌 Title: {{IssueTitle}}

Description:
{{IssueDesc}}

Impacted Flow: {{ImpactedFlow}}
First Occurrence: {{FirstOccurrence}}

Steps to Reproduce:
{{StepsToReproduce}}

Current Status: Under active investigation by the {{ProductName}} engineering team.

We will provide a status update within 4 business hours. If you are experiencing production impact, please contact our escalation line: {{EscalationEmail}}

We apologise for any disruption caused and appreciate your patience.

Best regards,
{{EngineerName}}
Integration Engineer – {{ProductName}}
SlashData`
  },

  /* ── RABET ── */
  {
    id:"rabet-migration", product:"Rabet", category:"API Migration",
    title:"API Version Migration Notice",
    subject:"[Action Required] {{ProductName}} API v{{OldVersion}} Deprecation – Migrate to v{{NewVersion}}",
    variables:["ProductName","PartnerName","ContactName","OldVersion","NewVersion","DeprecationDate","MigrationGuideLink","BreakingChanges","EngineerName","SupportEmail"],
    body:`Dear {{ContactName}},

This is an important notice regarding the upcoming deprecation of {{ProductName}} API version {{OldVersion}}.

📅 Deprecation Date: {{DeprecationDate}}
🔄 Action Required: Migrate to v{{NewVersion}} before the deprecation date

Breaking Changes in v{{NewVersion}}:
{{BreakingChanges}}

📖 Migration Guide: {{MigrationGuideLink}}

Migration Timeline:
  • Now – {{DeprecationDate}}: Both v{{OldVersion}} and v{{NewVersion}} are supported
  • After {{DeprecationDate}}: v{{OldVersion}} will return HTTP 410 Gone

Our integration team is available to assist with the migration. Please reach out to {{SupportEmail}} to schedule a migration walkthrough session.

Best regards,
{{EngineerName}}
Integration Engineer – {{ProductName}}
SlashData`
  },
  {
    id:"rabet-usage", product:"Rabet", category:"Reporting",
    title:"Quarterly Usage Report",
    subject:"{{ProductName}} – Q{{Quarter}} {{Year}} Usage Report | {{PartnerName}}",
    variables:["ProductName","PartnerName","ContactName","Quarter","Year","TotalTransactions","AvgLatency","ErrorRate","TopErrors","ReportLink","EngineerName"],
    body:`Dear {{ContactName}},

Please find your {{ProductName}} API usage summary for Q{{Quarter}} {{Year}}.

📊 Usage Highlights:
  🔄 Total Transactions: {{TotalTransactions}}
  ⚡ Avg. Response Time: {{AvgLatency}}ms
  ⚠️  Error Rate: {{ErrorRate}}%

Top Errors This Quarter:
{{TopErrors}}

📈 Full Report: {{ReportLink}}

If you have questions about the report or would like to discuss optimization strategies, please don't hesitate to reach out.

Best regards,
{{EngineerName}}
SlashData Integration Team`
  },

  /* ── BAHRI ── */
  {
    id:"bahri-uat-invite", product:"Bahri", category:"UAT",
    title:"UAT Phase Invitation",
    subject:"Bahri UAT Phase Begins – {{PartnerName}} Invitation",
    variables:["PartnerName","ContactName","UATStartDate","UATEndDate","UATPortalLink","TestPlanLink","EngineerName","EngineerEmail"],
    body:`Dear {{ContactName}},

We are pleased to invite {{PartnerName}} to participate in the Bahri User Acceptance Testing (UAT) phase.

📅 UAT Period: {{UATStartDate}} → {{UATEndDate}}
🔗 UAT Portal: {{UATPortalLink}}
📋 Test Plan: {{TestPlanLink}}

As a UAT participant, your feedback is critical in helping us deliver a stable and high-quality integration. You will have access to the full Bahri feature set in a controlled UAT environment.

Your assigned integration engineer for this phase is {{EngineerName}} ({{EngineerEmail}}), who will be your primary point of contact.

We look forward to your participation and feedback!

Best regards,
{{EngineerName}}
Integration Engineer – Bahri
SlashData`
  },
  {
    id:"bahri-feedback", product:"Bahri", category:"UAT",
    title:"UAT Feedback Request",
    subject:"Bahri UAT – Feedback Requested | {{PartnerName}}",
    variables:["PartnerName","ContactName","FeedbackFormLink","Deadline","EngineerName"],
    body:`Dear {{ContactName}},

Thank you for participating in the Bahri UAT phase. We hope the testing went smoothly.

We would greatly appreciate your feedback to help us improve the integration experience before the production release.

📝 Feedback Form: {{FeedbackFormLink}}
⏰ Submission Deadline: {{Deadline}}

The form covers:
• API usability and documentation clarity
• Integration flow completeness
• Performance and reliability observations
• Any blocking or non-blocking issues encountered

Your input directly shapes the final product. Thank you for your time and collaboration.

Best regards,
{{EngineerName}}
Integration Engineer – Bahri
SlashData`
  },

  /* ── WTHEEQ ── */
  {
    id:"wtheeq-welcome", product:"Wtheeq", category:"Onboarding",
    title:"Company Onboarding Welcome",
    subject:"Welcome to Wtheeq – {{CompanyName}} Onboarding Started",
    variables:["CompanyName","ContactName","CompanyID","PortalLink","ChecklistLink","OnboardingETA","EngineerName","EngineerEmail"],
    body:`Dear {{ContactName}},

Welcome to Wtheeq! We're thrilled to begin the onboarding journey for {{CompanyName}}.

Your company has been registered in the Wtheeq platform:
  🏢 Company Name: {{CompanyName}}
  🆔 Company ID: {{CompanyID}}
  🔗 Portal Access: {{PortalLink}}

Onboarding Checklist: {{ChecklistLink}}
Estimated Go-Live: {{OnboardingETA}}

Your dedicated onboarding engineer is {{EngineerName}} ({{EngineerEmail}}). Please don't hesitate to reach out with any questions.

Best regards,
{{EngineerName}}
SlashData`
  },
  {
    id:"wtheeq-docs", product:"Wtheeq", category:"Onboarding",
    title:"Document Submission Request",
    subject:"[Action Required] Document Submission – {{CompanyName}} | Wtheeq Onboarding",
    variables:["CompanyName","ContactName","RequiredDocs","PortalLink","Deadline","EngineerName","EngineerEmail"],
    body:`Dear {{ContactName}},

As part of the Wtheeq onboarding process for {{CompanyName}}, we require the following documents to proceed:

Required Documents:
{{RequiredDocs}}

📎 Submission Portal: {{PortalLink}}
⏰ Submission Deadline: {{Deadline}}

Please ensure all documents are:
✅ Current and valid (not expired)
✅ Uploaded in PDF format
✅ Clearly legible and complete

Once all documents are submitted and verified, we will proceed to the next onboarding stage. The review typically takes 1-2 business days.

If you need assistance with the portal or have questions about any document requirement, please contact {{EngineerName}} at {{EngineerEmail}}.

Best regards,
{{EngineerName}}
SlashData Integration Team`
  },
  {
    id:"wtheeq-golive", product:"Wtheeq", category:"Go-Live",
    title:"Go-Live Confirmation",
    subject:"✅ {{CompanyName}} is Now Live on Wtheeq!",
    variables:["CompanyName","ContactName","GoLiveDate","CompanyID","SupportEmail","SLADoc","EngineerName"],
    body:`Dear {{ContactName}},

Congratulations! {{CompanyName}} is now officially live on the Wtheeq platform! 🎉

📅 Go-Live Date: {{GoLiveDate}}
🆔 Company ID: {{CompanyID}}

Support Information:
  📧 Primary Support: {{SupportEmail}}
  📋 SLA Documentation: {{SLADoc}}

Our team will closely monitor your account activity for the next 48 hours. Please report any issues immediately to our support line.

Thank you for choosing Wtheeq. We look forward to a long and successful partnership.

Best regards,
{{EngineerName}}
Integration Engineer – Wtheeq
SlashData`
  },

  /* ── MULEM ── */
  {
    id:"mulem-welcome", product:"Mulem", category:"Onboarding",
    title:"Integration Welcome & Credentials",
    subject:"Mulem Integration – Welcome & API Credentials | {{PartnerName}}",
    variables:["PartnerName","ContactName","ClientID","TokenURL","BaseURL","DocsLink","EngineerName","EngineerEmail"],
    body:`Dear {{ContactName}},

Welcome to the Mulem integration program! We're excited to have {{PartnerName}} on board.

Your API credentials are ready:
  🔑 Client ID:     {{ClientID}}
  🎟  Token URL:     {{TokenURL}}
  🌐 API Base URL:  {{BaseURL}}

Please treat these credentials with the utmost care. Do not share them in public repositories or unsecured channels. If you suspect a compromise, contact us immediately for a rotation.

📖 Full Documentation: {{DocsLink}}

Your integration point of contact is {{EngineerName}} at {{EngineerEmail}}.

Best regards,
{{EngineerName}}
Integration Engineer – Mulem
SlashData`
  },
  {
    id:"mulem-uaefts", product:"Mulem", category:"Migration",
    title:"UAEFTS v2 Migration Notice",
    subject:"[Required] UAEFTS v2 Protocol Upgrade – {{PartnerName}} Action Needed",
    variables:["PartnerName","ContactName","MigrationDeadline","V2GuideLink","TestingWindowStart","TestingWindowEnd","EngineerName","SupportEmail"],
    body:`Dear {{ContactName}},

As previously communicated, Mulem is upgrading to the UAEFTS v2 protocol. This upgrade is mandatory for all integrated partners.

⏰ Migration Deadline: {{MigrationDeadline}}
📖 v2 Migration Guide: {{V2GuideLink}}

Testing Window: {{TestingWindowStart}} → {{TestingWindowEnd}}

Key changes in UAEFTS v2:
• Enhanced message encryption (TLS 1.3)
• Revised transaction message format
• New mandatory fields: transaction_ref, channel_id
• Deprecated fields removed: legacy_code, old_status_map

Action Required:
1. Review the v2 migration guide
2. Update your integration during the testing window
3. Confirm migration completion to {{SupportEmail}}

Partners who do not complete the migration by the deadline will experience transaction failures.

For support, reach out to {{EngineerName}} at {{SupportEmail}}.

Best regards,
{{EngineerName}}
Integration Engineer – Mulem
SlashData`
  },

  /* ── SHARY ── */
  {
    id:"shary-limitation", product:"Shary", category:"Communication",
    title:"Case Type Limitation Notice",
    subject:"Shary – Supported Case Types Update | {{PartnerName}}",
    variables:["PartnerName","ContactName","SupportedTypes","UnsupportedTypes","ETAForFull","EngineerName","EngineerEmail"],
    body:`Dear {{ContactName}},

I hope this message finds you well.

I wanted to provide a brief update on the current status of Shary's case type support for {{PartnerName}}.

Currently Supported:
{{SupportedTypes}}

Not Yet Supported (in development):
{{UnsupportedTypes}}

Estimated Full Support: {{ETAForFull}}

For cases that fall outside the currently supported types, please continue using the previous workflow until the full rollout is complete. We will notify you as soon as each case type becomes available.

We appreciate your patience and understanding as we expand Shary's capabilities.

Best regards,
{{EngineerName}}
Integration Engineer – Shary
{{EngineerEmail}}`
  },

  /* ── TAJEERI ── */
  {
    id:"tajeeri-update", product:"Tajeeri", category:"Development",
    title:"Development Status Update",
    subject:"Tajeeri – Development Update | {{UpdatePeriod}}",
    variables:["ContactName","UpdatePeriod","CompletedItems","InProgressItems","UpcomingItems","NextUpdateDate","EngineerName","EngineerEmail"],
    body:`Dear {{ContactName}},

Here is the latest development update for the Tajeeri platform for the period: {{UpdatePeriod}}.

✅ Completed This Period:
{{CompletedItems}}

🔄 Currently In Progress:
{{InProgressItems}}

📅 Upcoming:
{{UpcomingItems}}

Next update will be shared on: {{NextUpdateDate}}

If you have any questions or feedback on the development direction, please feel free to reach out.

Best regards,
{{EngineerName}}
Integration Engineer – Tajeeri
{{EngineerEmail}}`
  },
];

const HEALTH_DATA = [
  { name:"Rhoon API",    product:"Rhoon",   env:"Production", uptime:99.8, latency:198, status:"operational", incidents:0  },
  { name:"Rhoon ADP",    product:"Rhoon",   env:"Staging",    uptime:87.2, latency:840, status:"degraded",    incidents:1  },
  { name:"Rabet API",    product:"Rabet",   env:"Production", uptime:99.9, latency:145, status:"operational", incidents:0  },
  { name:"Bahri UAT",    product:"Bahri",   env:"UAT",        uptime:94.1, latency:312, status:"operational", incidents:2  },
  { name:"Wtheeq API",   product:"Wtheeq",  env:"Production", uptime:99.7, latency:221, status:"operational", incidents:0  },
  { name:"Mulem API",    product:"Mulem",   env:"Production", uptime:99.5, latency:267, status:"operational", incidents:0  },
  { name:"Shary API",    product:"Shary",   env:"Production", uptime:98.2, latency:390, status:"operational", incidents:1  },
  { name:"Tajeeri Dev",  product:"Tajeeri", env:"Dev",        uptime:91.0, latency:520, status:"maintenance", incidents:0  },
];

const DOC_STANDARDS = [
  { rule:"Font Family", val:"Plus Jakarta Sans (headings), Inter (body), JetBrains Mono (code)" },
  { rule:"Heading Size", val:"H1: 24px • H2: 18px • H3: 14px" },
  { rule:"Body Size",   val:"13-14px, line-height 1.6" },
  { rule:"Brand Colors",val:"Primary #0d1829 • Accent #3b82f6 • Success #22c55e" },
  { rule:"Table Style", val:"Zebra stripe, 1px border #1a2740, header bg #09111f" },
  { rule:"Logo Usage",  val:"Minimum 80px width, clear space = 1× logo height on all sides" },
  { rule:"Code Blocks", val:"Mono font, dark bg #071020, syntax highlighted" },
];

/* ─────────────────────────────────────────────────────────────
   SMALL COMPONENTS
───────────────────────────────────────────────────────────── */
const Badge = ({ statusKey }) => {
  const m = STATUS_META[statusKey] || STATUS_META.limited;
  return <span className={`badge ${m.cls}`}>{m.label}</span>;
};

const ProductDot = ({ statusKey }) => (
  <span className={`dot ${(STATUS_META[statusKey]||STATUS_META.limited).dotCls}`} />
);

const Avatar = ({ name, color }) => {
  const initials = name.split(" ").map(p=>p[0]).join("").slice(0,2).toUpperCase();
  const colors = ["#1d4ed8","#0d6efd","#6d28d9","#0891b2","#065f46","#92400e","#991b1b"];
  const c = color || colors[name.charCodeAt(0)%colors.length];
  return <span className="avatar" style={{background:c}}>{initials}</span>;
};

const UpdateTypeDot = ({type}) => {
  const map = {fix:{bg:"#7f1d1d",color:"#fca5a5",lbl:"Fix"}, feature:{bg:"#0c1a4a",color:"#60a5fa",lbl:"Feature"}, done:{bg:"#052e16",color:"#4ade80",lbl:"Done"}, info:{bg:"#1c1917",color:"#fbbf24",lbl:"Info"}};
  const m = map[type]||map.info;
  return <span className="badge" style={{background:m.bg,color:m.color,border:`1px solid ${m.color}30`}}>{m.lbl}</span>;
};

const HistIcon = ({type}) => {
  const map = {meeting:{bg:"#0c1a4a",color:"#60a5fa",icon:Users}, email:{bg:"#071828",color:"#38bdf8",icon:Mail}, training:{bg:"#052e16",color:"#4ade80",icon:BookOpen}, issue:{bg:"#200a0a",color:"#f87171",icon:AlertTriangle}, golive:{bg:"#052e16",color:"#4ade80",icon:Zap}};
  const m = map[type]||map.email;
  const Icon = m.icon;
  return <div className="act-icon" style={{background:m.bg}}><Icon size={14} color={m.color}/></div>;
};

/* ─────────────────────────────────────────────────────────────
   SIDEBAR
───────────────────────────────────────────────────────────── */
const NAV = [
  { id:"home",      label:"Home",             icon:Home        },
  { id:"health",    label:"API Health",       icon:Activity,   badge:1, badgeCls:"warn" },
  { sep:true, label:"Resources" },
  { id:"docs",      label:"Documentation",    icon:FileText    },
  { id:"updates",   label:"Product Updates",  icon:RefreshCw   },
  { id:"faq",       label:"FAQ",              icon:HelpCircle  },
  { sep:true, label:"Reports" },
  { id:"weekly",    label:"Weekly Reports",   icon:BarChart2   },
  { id:"monthly",   label:"Monthly Reports",  icon:Calendar    },
  { sep:true, label:"Operations" },
  { id:"team",      label:"Team Ownership",   icon:Users       },
  { id:"entities",  label:"Partner Profiles",  icon:Database    },
  { id:"emails",    label:"Email Templates",  icon:Mail        },
  { id:"changes",   label:"Changelog",        icon:Tag         },
];

function Sidebar({ active, onNav }) {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">Slash<span>Data</span></div>
        <div className="logo-sub">Integration Hub</div>
      </div>
      <div className="nav-section" style={{paddingBottom:16}}>
        {NAV.map((item,i) => item.sep
          ? <div key={i} className="nav-label" style={{marginTop:12}}>{item.label}</div>
          : <div key={item.id} className={`nav-item${active===item.id?" active":""}`} onClick={()=>onNav(item.id)}>
              <item.icon/>{item.label}
              {item.badge && <span className={`nav-badge${item.badgeCls?" "+item.badgeCls:""}`}>{item.badge}</span>}
            </div>
        )}
      </div>
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE: HOME
───────────────────────────────────────────────────────────── */
function HomePage({ onNav }) {
  const alerts = PRODUCTS.filter(p=>p.alert);
  return (
    <>
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <div className="page-title">Integration Operations Hub</div>
            <div className="page-sub">SlashData — Single source of truth for all product integration activities</div>
          </div>
          <div className="flex gap-2 items-center" style={{marginBottom:20}}>
            <span className="chip"><span className="pulse dot dot-live" style={{width:6,height:6}} />System Operational</span>
            <span className="ver-chip">Hub v2.1.0</span>
          </div>
        </div>
      </div>
      <div className="content-area">
        {/* Alerts */}
        {alerts.length > 0 && <>
          <div className="mb-4">
            {alerts.map(p=>(
              <div key={p.id} className="alert alert-crit">
                <AlertTriangle size={16} color="#ef4444" style={{marginTop:1,flexShrink:0}}/>
                <div>
                  <strong style={{color:"#fca5a5",fontSize:13}}>Critical Alert — {p.name}</strong>
                  <div style={{color:"#f87171",fontSize:13,marginTop:2}}>{p.alert}</div>
                </div>
              </div>
            ))}
          </div>
        </>}
        <div className="alert alert-info mb-4">
          <Info size={15} color="#60a5fa" style={{marginTop:1,flexShrink:0}}/>
          <div style={{fontSize:13,color:"#93c5fd"}}>
            <strong>Rhoon:</strong> DIB integration testing completed — all 47 test cases passed. Awaiting go-live sign-off from the client.
          </div>
        </div>
        {/* Product Status Grid */}
        <div className="card mb-6">
          <div className="card-title">Product Status Overview</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:12}}>
            {PRODUCTS.map(p=>(
              <div key={p.id} className="card-sm" style={{borderLeft:`3px solid ${p.color}`}}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span style={{fontWeight:700,fontSize:15,color:"#f1f5f9"}}>{p.name}</span>
                    <span className={`env env-${p.env==="Production"?"prod":p.env==="UAT"?"uat":"stg"}`}>{p.env}</span>
                  </div>
                  <Badge statusKey={p.statusKey}/>
                </div>
                <div style={{fontSize:12,color:"#7a96b0",marginBottom:8}}>{p.desc}</div>
                <div className="flex gap-2 items-center">
                  <span className="ver-chip">{p.version}</span>
                  {p.alert && <span className="badge badge-down"><AlertTriangle size={10}/> Alert</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Recent Activity */}
        <div className="grid-2">
          <div className="card">
            <div className="card-title">Recent Activity</div>
            {UPDATES.slice(0,5).map(u=>(
              <div className="act-item" key={u.id}>
                <div className="act-icon" style={{background: u.type==="fix"?"#200a0a":u.type==="done"?"#052e16":u.type==="feature"?"#0c1a4a":"#1c1206"}}>
                  {u.type==="fix"?<AlertTriangle size={14} color="#fca5a5"/>:u.type==="done"?<CheckCircle size={14} color="#4ade80"/>:u.type==="feature"?<Zap size={14} color="#60a5fa"/>:<Info size={14} color="#fbbf24"/>}
                </div>
                <div style={{flex:1,minWidth:0}}>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{fontWeight:600,fontSize:13,color:"#e2e8f0"}}>{u.title}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span style={{fontSize:11,color:"#3b82f6",fontWeight:600}}>{u.product}</span>
                    <span style={{fontSize:11,color:"#4a6280"}}>{u.date}</span>
                  </div>
                </div>
              </div>
            ))}
            <button className="btn btn-ghost w-full mt-3" style={{justifyContent:"center"}} onClick={()=>onNav("updates")}>
              View All Updates <ChevronRight size={14}/>
            </button>
          </div>
          <div className="card">
            <div className="card-title">Quick Links</div>
            {[
              {label:"API Health Dashboard",    icon:Activity,  page:"health",  sub:"Real-time service status"},
              {label:"Partner Profiles",          icon:Database,  page:"entities",sub:"8 active partners"},
              {label:"Latest Weekly Report",    icon:BarChart2, page:"weekly",  sub:"Week 17 – Apr 21-25"},
              {label:"Documentation Hub",       icon:FileText,  page:"docs",    sub:"Docs, templates & assets"},
              {label:"Team Ownership",          icon:Users,     page:"team",    sub:"7 products, 14 engineers"},
              {label:"FAQ & Troubleshooting",   icon:HelpCircle,page:"faq",     sub:"Per-product FAQs"},
            ].map(l=>(
              <div key={l.page} className="health-row" style={{cursor:"pointer"}} onClick={()=>onNav(l.page)}>
                <div className="act-icon" style={{background:"#0f1e35"}}><l.icon size={14} color="#3b82f6"/></div>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:600,color:"#c8d8e8"}}>{l.label}</div>
                  <div style={{fontSize:11,color:"#4a6280"}}>{l.sub}</div>
                </div>
                <ChevronRight size={14} color="#2d4a6a"/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE: API HEALTH
───────────────────────────────────────────────────────────── */
function HealthPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">API Health Monitor</div>
        <div className="page-sub">Real-time service uptime and latency across all products</div>
      </div>
      <div className="content-area">
        <div className="alert alert-warn mb-4">
          <AlertTriangle size={15} color="#fbbf24" style={{marginTop:1}}/>
          <span style={{color:"#fcd34d",fontSize:13}}>1 service degraded: <strong>Rhoon ADP (Staging)</strong> — 503 errors detected. Engineering team notified.</span>
        </div>
        <div className="grid-4 mb-6">
          {[
            {val:"7/8",   label:"Services Up",        color:"#22c55e"},
            {val:"99.4%", label:"Overall Uptime (30d)",color:"#22c55e"},
            {val:"253ms", label:"Avg Latency",         color:"#60a5fa"},
            {val:"1",     label:"Active Incidents",    color:"#f59e0b"},
          ].map((s,i)=>(
            <div className="stat-card" key={i}>
              <div className="stat-val" style={{color:s.color,fontSize:24}}>{s.val}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="card-title">Service Status</div>
          <div className="scroll-x">
            <table className="table">
              <thead><tr><th>Service</th><th>Product</th><th>Environment</th><th>Status</th><th>Uptime (30d)</th><th>Latency</th><th>Incidents</th></tr></thead>
              <tbody>
                {HEALTH_DATA.map((h,i)=>(
                  <tr key={i}>
                    <td style={{fontWeight:600,color:"#e2e8f0"}}>{h.name}</td>
                    <td><span style={{color:"#3b82f6",fontWeight:600}}>{h.product}</span></td>
                    <td><span className={`env env-${h.env==="Production"?"prod":h.env==="UAT"?"uat":"stg"}`}>{h.env}</span></td>
                    <td>
                      {h.status==="operational" && <span className="badge badge-live"><CheckCircle size={10}/>Operational</span>}
                      {h.status==="degraded"    && <span className="badge badge-down"><AlertTriangle size={10}/>Degraded</span>}
                      {h.status==="maintenance" && <span className="badge badge-dev"><Clock size={10}/>Maintenance</span>}
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="uptime-bar" style={{width:80}}>
                          <div className={`uptime-fill${h.uptime<95?" warn":""}`} style={{width:`${h.uptime}%`}}/>
                        </div>
                        <span style={{fontSize:12,color:h.uptime>99?"#22c55e":h.uptime>95?"#f59e0b":"#ef4444",fontWeight:600,fontFamily:"monospace"}}>{h.uptime}%</span>
                      </div>
                    </td>
                    <td><span style={{fontFamily:"monospace",fontSize:12,color:h.latency>400?"#f87171":h.latency>250?"#fbbf24":"#4ade80"}}>{h.latency}ms</span></td>
                    <td>{h.incidents>0?<span className="badge badge-down">{h.incidents}</span>:<span style={{color:"#4a6280",fontSize:12}}>—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE: DOCUMENTATION
───────────────────────────────────────────────────────────── */
function DocsPage() {
  const [tab, setTab] = useState("docs");
  const docs = [
    { product:"Rhoon",   name:"Rhoon Integration Guide v3.2",      type:"PDF",  date:"Apr 10, 2025", pages:42 },
    { product:"Rabet",   name:"Rabet API Reference v2.8",           type:"PDF",  date:"Mar 28, 2025", pages:31 },
    { product:"Bahri",   name:"Bahri UAT Onboarding Checklist",     type:"DOCX", date:"Apr 01, 2025", pages:8  },
    { product:"Wtheeq",  name:"Wtheeq Quick Start Guide v1.1",      type:"PDF",  date:"Apr 20, 2025", pages:16 },
    { product:"Mulem",   name:"Mulem Integration Spec v1.0",        type:"PDF",  date:"Apr 05, 2025", pages:28 },
    { product:"Shary",   name:"Shary Case Management API",          type:"PDF",  date:"Mar 15, 2025", pages:19 },
    { product:"Tajeeri", name:"Tajeeri Architecture Design Doc",    type:"DOCX", date:"Apr 17, 2025", pages:22 },
  ];
  const templates = [
    { name:"API Integration Proposal Template", desc:"Standard format for all new integration projects", icon:"📋" },
    { name:"Go-Live Checklist Template",         desc:"Pre-launch validation steps for all products",      icon:"✅" },
    { name:"Meeting Minutes Template",           desc:"Standardised minutes format with action items",     icon:"📝" },
    { name:"Issue Escalation Template",          desc:"Template for raising and tracking integration issues",icon:"⚠️" },
    { name:"Training Session Report",            desc:"Post-training documentation template",              icon:"🎓" },
    { name:"Weekly Status Report Template",      desc:"Weekly report format with comparison sections",     icon:"📊" },
  ];
  return (
    <>
      <div className="page-header">
        <div className="page-title">Documentation Hub</div>
        <div className="page-sub">Access product docs, templates, brand assets, and documentation standards</div>
      </div>
      <div className="content-area">
        <div className="tabs">
          {["docs","templates","assets","standards"].map(t=>(
            <div key={t} className={`tab${tab===t?" active":""}`} onClick={()=>setTab(t)}>
              {t==="docs"?"📄 Product Docs":t==="templates"?"📋 Templates":t==="assets"?"🎨 Brand Assets":"📏 Standards"}
            </div>
          ))}
        </div>
        {tab==="docs" && (
          <div className="card">
            <div className="card-title">Product Documentation</div>
            <table className="table">
              <thead><tr><th>Product</th><th>Document</th><th>Type</th><th>Pages</th><th>Updated</th><th>Action</th></tr></thead>
              <tbody>
                {docs.map((d,i)=>(
                  <tr key={i}>
                    <td><span style={{color:"#3b82f6",fontWeight:600}}>{d.product}</span></td>
                    <td style={{fontWeight:500,color:"#e2e8f0"}}>{d.name}</td>
                    <td><span className={`badge ${d.type==="PDF"?"badge-new":"badge-inprog"}`}>{d.type}</span></td>
                    <td style={{color:"#7a96b0"}}>{d.pages}p</td>
                    <td style={{color:"#7a96b0",fontSize:12}}>{d.date}</td>
                    <td><button className="btn btn-ghost" style={{padding:"5px 12px",fontSize:12}}><Download size={12}/>Download</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {tab==="templates" && (
          <div className="grid-2">
            {templates.map((t,i)=>(
              <div key={i} className="card-sm flex gap-3 items-center" style={{cursor:"pointer"}}>
                <div style={{fontSize:28,flexShrink:0}}>{t.icon}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:600,color:"#e2e8f0",fontSize:14,marginBottom:4}}>{t.name}</div>
                  <div style={{fontSize:12,color:"#4a6280"}}>{t.desc}</div>
                </div>
                <button className="btn btn-ghost" style={{padding:"5px 10px",fontSize:11,flexShrink:0}}><Download size={12}/>Get</button>
              </div>
            ))}
          </div>
        )}
        {tab==="assets" && (
          <div className="grid-2">
            {[
              { name:"SlashData Logo – Full Color (SVG)",      size:"12 KB",  desc:"Primary logo for light and dark backgrounds" },
              { name:"SlashData Logo – White Mono (SVG)",      size:"8 KB",   desc:"Use on dark or colored backgrounds" },
              { name:"SlashData Logo – Black Mono (SVG)",      size:"8 KB",   desc:"Use on light/white backgrounds" },
              { name:"Document Header Template (DOCX)",        size:"34 KB",  desc:"Branded header for integration documents" },
              { name:"Presentation Deck Master (PPTX)",        size:"2.1 MB", desc:"SlashData branded PowerPoint template" },
              { name:"Email Signature Template (HTML)",        size:"4 KB",   desc:"Standard email signature with logo" },
              { name:"Brand Colors Palette (ASE/CSS)",         size:"2 KB",   desc:"Swatches for design tools" },
              { name:"Icon Pack – Integration Set (SVG)",      size:"420 KB", desc:"60+ icons for integration docs & UIs" },
            ].map((a,i)=>(
              <div key={i} className="card-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div style={{fontWeight:600,color:"#e2e8f0",fontSize:13,marginBottom:4}}>{a.name}</div>
                    <div style={{fontSize:12,color:"#4a6280"}}>{a.desc}</div>
                  </div>
                  <div className="text-right" style={{flexShrink:0,marginLeft:12}}>
                    <div style={{fontSize:11,color:"#3a5a7a",marginBottom:6}}>{a.size}</div>
                    <button className="btn btn-ghost" style={{padding:"4px 10px",fontSize:11}}><Download size={11}/>Download</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab==="standards" && (
          <div className="card">
            <div className="card-title">Documentation Standards</div>
            <table className="table">
              <thead><tr><th>Standard</th><th>Specification</th></tr></thead>
              <tbody>
                {DOC_STANDARDS.map((s,i)=>(
                  <tr key={i}><td style={{fontWeight:600,color:"#94a3b8",width:180}}>{s.rule}</td><td style={{color:"#c8d8e8"}}>{s.val}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   POSTMAN CARD COMPONENT
───────────────────────────────────────────────────────────── */
const ENV_META = {
  Production: { dot:"#22c55e", cls:"env-prod",  label:"Production" },
  Staging:    { dot:"#60a5fa", cls:"env-stg",   label:"Staging"    },
  UAT:        { dot:"#f59e0b", cls:"env-uat",   label:"UAT"        },
  Sandbox:    { dot:"#a855f7", cls:"env-stg",   label:"Sandbox"    },
  Dev:        { dot:"#fb923c", cls:"env-stg",   label:"Dev"        },
};

const STATUS_COL = {
  "current":     { color:"#22c55e", label:"Up to date"  },
  "in-progress": { color:"#f59e0b", label:"In progress" },
  "outdated":    { color:"#ef4444", label:"Outdated"    },
};

function PostmanCard({ prod }) {
  const [open, setOpen]       = useState(false);
  const [tcOpen, setTcOpen]   = useState(false);
  const collections = POSTMAN_COLLECTIONS[prod] || [];
  const testCases   = TEST_CASES[prod] || [];
  const product     = PRODUCTS.find(p=>p.name===prod);

  const totalReqs   = collections.reduce((s,c)=>s+c.requests,0);
  const allCurrent  = collections.every(c=>c.status==="current");

  return (
    <div className="card mb-4" style={{padding:0,overflow:"hidden"}}>
      {/* Card header */}
      <div style={{padding:"14px 18px",borderBottom: (open||tcOpen)?"1px solid #1a2740":"none",display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:8,flex:1}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:product?.color||"#3b82f6",display:"inline-block"}}/>
          <span style={{fontWeight:700,color:"#e2e8f0",fontSize:14}}>{prod}</span>
          <span style={{fontSize:11,color:"#4a6280"}}>
            {collections.length} env{collections.length!==1?"s":""} · {totalReqs} requests
          </span>
          {allCurrent
            ? <span className="badge badge-done" style={{fontSize:10}}><CheckCircle size={9}/>All current</span>
            : <span className="badge badge-dev" style={{fontSize:10}}><Clock size={9}/>Updates pending</span>
          }
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          {testCases.length>0 && (
            <button
              className="btn btn-ghost"
              style={{fontSize:11,padding:"5px 12px",gap:5}}
              onClick={()=>{setTcOpen(v=>!v);setOpen(false);}}>
              <FileText size={12} color="#60a5fa"/>
              Test Cases ({testCases.length})
              {tcOpen?<ChevronDown size={11}/>:<ChevronRight size={11}/>}
            </button>
          )}
          <button
            className="postman-badge"
            onClick={()=>{setOpen(v=>!v);setTcOpen(false);}}>
            🟠 Postman Collections ({collections.length})
            {open?<ChevronDown size={11}/>:<ChevronRight size={11}/>}
          </button>
        </div>
      </div>

      {/* Postman collections panel */}
      {open && (
        <div className="postman-panel" style={{margin:"0",borderRadius:0,border:"none",borderTop:"1px solid #1a2740"}}>
          <div className="postman-panel-header">
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span style={{fontSize:12,fontWeight:700,color:"#fb923c"}}>🟠 Postman Collections</span>
              <span style={{fontSize:11,color:"#4a6280"}}>{collections.length} environments configured</span>
            </div>
            <span style={{fontSize:11,color:"#4a6280"}}>Last sync: Apr 24, 2025</span>
          </div>

          {/* Column headers */}
          <div style={{display:"grid",gridTemplateColumns:"110px 1fr 80px 70px 90px 80px 160px",gap:0,padding:"7px 16px",borderBottom:"1px solid #0f1a2c"}}>
            {["Environment","Collection","Requests","Folders","Version","Status","Actions"].map(h=>(
              <span key={h} style={{fontSize:10,color:"#3a5a7a",textTransform:"uppercase",letterSpacing:".7px",fontWeight:600}}>{h}</span>
            ))}
          </div>

          {collections.map((col,i)=>{
            const em  = ENV_META[col.env]  || ENV_META.Staging;
            const sm  = STATUS_COL[col.status] || STATUS_COL["current"];
            return (
              <div key={i} className="postman-row" style={{display:"grid",gridTemplateColumns:"110px 1fr 80px 70px 90px 80px 160px",gap:0,alignItems:"center"}}>
                {/* Env */}
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span className="postman-env-dot" style={{background:em.dot}}/>
                  <span className={`env env-${em.cls.replace("env-","")}`}>{col.env}</span>
                </div>
                {/* Name */}
                <div>
                  <div style={{fontSize:12.5,fontWeight:600,color:"#c8d8e8",lineHeight:1.3}}>{col.label}</div>
                  <div style={{fontSize:10.5,color:"#4a6280",marginTop:1}}>Updated {col.updated}</div>
                </div>
                {/* Requests */}
                <div style={{fontSize:13,fontWeight:700,color:"#f1f5f9",fontFamily:"monospace"}}>{col.requests}</div>
                {/* Folders */}
                <div style={{fontSize:13,color:"#7a96b0",fontFamily:"monospace"}}>{col.folders}</div>
                {/* Version */}
                <div><span className="ver-chip">{col.version}</span></div>
                {/* Status */}
                <div style={{display:"flex",alignItems:"center",gap:5}}>
                  <span style={{width:6,height:6,borderRadius:"50%",background:sm.color,display:"inline-block"}}/>
                  <span style={{fontSize:11,color:sm.color,fontWeight:600}}>{sm.label}</span>
                </div>
                {/* Actions */}
                <div style={{display:"flex",gap:6}}>
                  <button className="postman-run-btn" onClick={()=>window.open(col.url,"_blank")}>
                    ▶ Run
                  </button>
                  <button className="postman-dl-btn">
                    <Download size={10}/>JSON
                  </button>
                </div>
              </div>
            );
          })}

          {/* Footer summary */}
          <div style={{padding:"10px 16px",background:"#070d1a",borderTop:"1px solid #0f1a2c",display:"flex",gap:20,flexWrap:"wrap"}}>
            {collections.map(c=>(
              <div key={c.env} style={{display:"flex",alignItems:"center",gap:6}}>
                <span className="postman-env-dot" style={{background:(ENV_META[c.env]||ENV_META.Staging).dot}}/>
                <span style={{fontSize:11,color:"#4a6280"}}>{c.env}:</span>
                <span style={{fontSize:11,fontWeight:700,color:"#94a3b8",fontFamily:"monospace"}}>{c.requests} req</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test cases panel */}
      {tcOpen && testCases.length>0 && (
        <div style={{borderTop:"1px solid #1a2740"}}>
          <div style={{padding:"10px 16px",background:"#0d1829",borderBottom:"1px solid #1a2740",display:"flex",alignItems:"center",gap:8}}>
            <FileText size={12} color="#60a5fa"/>
            <span style={{fontSize:12,fontWeight:700,color:"#60a5fa"}}>Test Cases</span>
            <span style={{fontSize:11,color:"#4a6280"}}>{testCases.length} cases</span>
            <span className="badge badge-done" style={{fontSize:10,marginLeft:4}}>
              <CheckCircle size={9}/>{testCases.filter(t=>t.status==="passed").length} passed
            </span>
            {testCases.filter(t=>t.status==="failed").length>0 && (
              <span className="badge badge-down" style={{fontSize:10}}>
                <XCircle size={9}/>{testCases.filter(t=>t.status==="failed").length} failed
              </span>
            )}
            {testCases.filter(t=>t.status==="pending").length>0 && (
              <span className="badge badge-dev" style={{fontSize:10}}>
                <Clock size={9}/>{testCases.filter(t=>t.status==="pending").length} pending
              </span>
            )}
          </div>
          <table className="table">
            <thead><tr><th>ID</th><th>Feature</th><th>Status</th><th>Environment</th><th>Steps</th><th>Date</th></tr></thead>
            <tbody>
              {testCases.map((tc,i)=>(
                <tr key={i}>
                  <td className="font-mono text-xs" style={{color:"#4a8fcf"}}>{tc.id}</td>
                  <td style={{color:"#c8d8e8",fontWeight:500}}>{tc.feature}</td>
                  <td>
                    {tc.status==="passed" &&<span className="badge badge-done"><CheckCircle size={10}/>Passed</span>}
                    {tc.status==="failed" &&<span className="badge badge-down"><XCircle size={10}/>Failed</span>}
                    {tc.status==="pending"&&<span className="badge badge-dev"><Clock size={10}/>Pending</span>}
                  </td>
                  <td>
                    <span className={`env env-${tc.env==="Prod"?"prod":tc.env==="UAT"?"uat":"stg"}`}>{tc.env}</span>
                  </td>
                  <td style={{color:"#7a96b0",fontSize:12,fontFamily:"monospace"}}>{tc.steps}</td>
                  <td style={{fontSize:11,color:"#4a6280"}}>{tc.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE: PRODUCT UPDATES
───────────────────────────────────────────────────────────── */
/* ─── Product icon SVG paths ─── */
const PROD_SVG = {
  Rhoon:   ({c})=><svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={26} height={26}><path d="M2 17H8a2 2 0 002-2V5a2 2 0 00-2-2H3a2 2 0 00-2 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>,
  Rabet:   ({c})=><svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={26} height={26}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Bahri:   ({c})=><svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={26} height={26}><path d="M3 17l3-8 3 4 3-7 3 7 3-4 3 8"/><path d="M3 20h18"/></svg>,
  Wtheeq:  ({c})=><svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={26} height={26}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Mulem:   ({c})=><svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={26} height={26}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  Shary:   ({c})=><svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={26} height={26}><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>,
  Tajeeri: ({c})=><svg viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width={26} height={26}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
};

/* ─── Admin Add Modal ─── */
function AdminModal({ show, title, fields, onClose, onSave }) {
  const [vals, setVals] = useState({});
  useEffect(()=>{ if(show) setVals({}); },[show]);
  if(!show) return null;
  const set = (k,v) => setVals(p=>({...p,[k]:v}));
  return (
    <div className="admin-modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="admin-modal">
        <div className="admin-modal-hdr">
          <span style={{fontSize:15,fontWeight:700,color:'#f1f5f9'}}>{title}</span>
          <button onClick={onClose} style={{background:'transparent',border:'none',cursor:'pointer',color:'#4a6280'}}><XCircle size={18}/></button>
        </div>
        <div className="admin-modal-body">
          {fields.map(f=>(
            <div key={f.key} className="admin-field">
              <label>{f.label}</label>
              {f.type==='select'
                ? <select className="admin-select admin-input" value={vals[f.key]||''} onChange={e=>set(f.key,e.target.value)}>
                    <option value="">Choose…</option>
                    {f.options.map(o=><option key={o} value={o}>{o}</option>)}
                  </select>
                : f.type==='textarea'
                ? <textarea className="admin-input admin-textarea" placeholder={f.placeholder||''} value={vals[f.key]||''} onChange={e=>set(f.key,e.target.value)}/>
                : <input className="admin-input" placeholder={f.placeholder||''} value={vals[f.key]||''} onChange={e=>set(f.key,e.target.value)}/>
              }
            </div>
          ))}
          <div style={{display:'flex',gap:10,marginTop:18}}>
            <button className="btn btn-primary" style={{flex:1,justifyContent:'center'}} onClick={()=>onSave(vals)}>Save</button>
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpdatesPage() {
  const [selProd, setSelProd] = useState(null);
  const [tab, setTab]         = useState('feed');
  const [modal, setModal]     = useState(null); // 'update'|'testcase'|'collection'
  const [feedFilter, setFeedFilter] = useState('All');
  const [additions, setAdditions]   = useState({updates:{},testcases:{},collections:{}});
  const [tcStatusMap, setTcStatusMap] = useState({});

  // Load persisted additions from storage
  useEffect(()=>{
    if(window.storage){
      window.storage.get('prod-additions').then(r=>{ if(r) setAdditions(JSON.parse(r.value)); }).catch(()=>{});
      window.storage.get('tc-status-map').then(r=>{ if(r) setTcStatusMap(JSON.parse(r.value)); }).catch(()=>{});
    }
  },[]);

  const saveAdditions = (a) => {
    setAdditions(a);
    if(window.storage) window.storage.set('prod-additions',JSON.stringify(a)).catch(()=>{});
  };
  const saveTcStatus = (m) => {
    setTcStatusMap(m);
    if(window.storage) window.storage.set('tc-status-map',JSON.stringify(m)).catch(()=>{});
  };

  // Merged data helpers
  const allUpdates  = p => [...(additions.updates[p]||[]),...UPDATES.filter(u=>u.product===p)];
  const allTestCases = p => [...(additions.testcases[p]||[]),...(TEST_CASES[p]||[])];
  const allCollections = p => [...(additions.collections[p]||[]),...(POSTMAN_COLLECTIONS[p]||[])];

  // ── Admin modal save handlers ──
  const handleSaveUpdate = vals => {
    if(!vals.title) return;
    const item = { id: Date.now(), product: selProd.name, date: new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}),
      type: vals.type||'info', title: vals.title, desc: vals.desc||'', tags: (vals.tags||'').split(',').map(t=>t.trim()).filter(Boolean) };
    const updated = {...additions, updates:{...additions.updates, [selProd.name]:[item,...(additions.updates[selProd.name]||[])]}};
    saveAdditions(updated); setModal(null);
  };
  const handleSaveTestCase = vals => {
    if(!vals.name) return;
    const item = { id: 'TC'+(Date.now()%10000).toString().padStart(3,'0'), service: vals.service||'General',
      name: vals.name, expected: vals.expected||'', status: vals.status||'pending', date: new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short'}) };
    const updated = {...additions, testcases:{...additions.testcases, [selProd.name]:[...(additions.testcases[selProd.name]||[]),item]}};
    saveAdditions(updated); setModal(null);
  };
  const handleSaveCollection = vals => {
    if(!vals.name) return;
    const item = { env: vals.env||'Dev', name: vals.name, requests: parseInt(vals.requests)||0, folders: parseInt(vals.folders)||0,
      version: vals.version||'v1.0', status: 'in-progress', url: '#', jsonUrl: '#' };
    const updated = {...additions, collections:{...additions.collections, [selProd.name]:[...(additions.collections[selProd.name]||[]),item]}};
    saveAdditions(updated); setModal(null);
  };
  const toggleTcStatus = (tcId, current) => {
    const cycle = {pass:'fail',fail:'pending',pending:'pass'};
    const next = cycle[current]||'pending';
    const updated = {...tcStatusMap,[tcId]:next};
    saveTcStatus(updated);
  };

  const TYPE_CFG = {fix:{bg:'#200a0a',c:'#f87171',l:'Fix'},feature:{bg:'#0c1a4a',c:'#60a5fa',l:'Feature'},done:{bg:'#052e16',c:'#4ade80',l:'Done'},info:{bg:'#1c1206',c:'#fbbf24',l:'Info'}};
  const TC_STATUS = {pass:{cls:'badge-done',l:'Pass'},fail:{cls:'badge-down',l:'Fail'},pending:{cls:'badge-dev',l:'Pending'}};

  // ══════════════════════════════════════
  //  PRODUCT GRID VIEW
  // ══════════════════════════════════════
  if(!selProd) return (
    <>
      <div className="page-header">
        <div className="page-title">Product Updates</div>
        <div className="page-sub">Select a product to view its activity feed, test cases, and Postman collections</div>
      </div>
      <div className="content-area">
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:20}}>
          {PRODUCTS.map(p=>{
            const Icon = PROD_SVG[p.name] || (({c})=><Package size={26} color={c}/>);
            const sm = STATUS_META[p.statusKey]||STATUS_META.live;
            const updCount = allUpdates(p.name).length;
            const tcCount = allTestCases(p.name).length;
            const colCount = allCollections(p.name).length;
            return (
              <div key={p.id} className="sd-card"
                style={{background:`linear-gradient(160deg,${p.colorDim||'#0a1525'} 0%,#080e1a 100%)`}}
                onClick={()=>{setSelProd(p);setTab('feed');setFeedFilter('All');}}>
                {/* Color accent bar */}
                <div className="sd-card-top" style={{background:`linear-gradient(90deg,${p.color},${p.color}80)`}}/>
                <div className="sd-card-body">
                  {/* Icon + Status */}
                  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:18}}>
                    <div className="sd-card-logo" style={{background:`${p.color}15`,border:`1.5px solid ${p.color}30`,boxShadow:`0 0 20px ${p.color}15`}}>
                      <Icon c={p.color}/>
                    </div>
                    <span className={`badge ${sm.cls}`} style={{fontSize:10,marginTop:2}}>{sm.label}</span>
                  </div>
                  {/* Name + env */}
                  <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:5}}>
                    <div className="sd-card-name">{p.name}</div>
                    <span style={{background:`${p.color}12`,color:p.color,padding:'2px 7px',borderRadius:4,fontSize:10,fontWeight:600,border:`1px solid ${p.color}20`}}>{p.env}</span>
                  </div>
                  {/* Description */}
                  <div className="sd-card-desc">{p.desc}</div>
                  {/* Alert banner */}
                  {p.alert && <div style={{marginBottom:14,fontSize:11,color:'#f87171',background:'rgba(239,68,68,.07)',border:'1px solid rgba(239,68,68,.15)',borderRadius:7,padding:'6px 10px',display:'flex',gap:6,alignItems:'center'}}><AlertTriangle size={11}/>{p.alert}</div>}
                  {/* Footer */}
                  <div className="sd-card-footer">
                    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                      <span className="sd-card-chip" style={{background:`${p.color}12`,color:p.color,border:`1px solid ${p.color}20`}}>v{p.version}</span>
                      <span className="sd-card-chip" style={{background:'rgba(255,255,255,.04)',color:'#7a96b0',border:'1px solid rgba(255,255,255,.06)'}}>{updCount} updates</span>
                      {tcCount>0 && <span className="sd-card-chip" style={{background:'rgba(255,255,255,.04)',color:'#7a96b0',border:'1px solid rgba(255,255,255,.06)'}}>{tcCount} tests</span>}
                    </div>
                    <span className="sd-card-arrow">View <ChevronRight size={13}/></span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  // ══════════════════════════════════════
  //  PRODUCT DETAIL VIEW
  // ══════════════════════════════════════
  const Icon = PROD_SVG[selProd.name] || (({c})=><Package size={20} color={c}/>);
  const sm = STATUS_META[selProd.statusKey]||STATUS_META.live;
  const updates  = allUpdates(selProd.name);
  const testCases = allTestCases(selProd.name);
  const collections = allCollections(selProd.name);
  const feedFiltered = feedFilter==='All'?updates:updates.filter(u=>u.type===feedFilter);

  return (
    <>
      <AdminModal show={modal==='update'} title={`Add Update — ${selProd.name}`}
        fields={[
          {key:'type',   label:'Type',        type:'select', options:['fix','feature','done','info']},
          {key:'title',  label:'Title',        type:'text',   placeholder:'Short summary of the update'},
          {key:'desc',   label:'Description',  type:'textarea',placeholder:'What changed and why?'},
          {key:'tags',   label:'Tags (comma-separated)', type:'text', placeholder:'API, Auth, Bug'},
        ]}
        onClose={()=>setModal(null)} onSave={handleSaveUpdate}/>

      <AdminModal show={modal==='testcase'} title={`Add Test Case — ${selProd.name}`}
        fields={[
          {key:'service',  label:'Service / Flow', type:'text',   placeholder:'e.g. NewMortgage, Auth'},
          {key:'name',     label:'Test Case Name',  type:'text',   placeholder:'Short descriptive name'},
          {key:'expected', label:'Expected Result', type:'textarea',placeholder:'What should happen?'},
          {key:'status',   label:'Initial Status', type:'select', options:['pending','pass','fail']},
        ]}
        onClose={()=>setModal(null)} onSave={handleSaveTestCase}/>

      <AdminModal show={modal==='collection'} title={`Add Postman Collection — ${selProd.name}`}
        fields={[
          {key:'env',      label:'Environment',    type:'select', options:['Production','Staging','UAT','Sandbox','Dev']},
          {key:'name',     label:'Collection Name', type:'text',  placeholder:'e.g. Rhoon Mortgage APIs'},
          {key:'requests', label:'Request Count',   type:'text',  placeholder:'24'},
          {key:'folders',  label:'Folder Count',    type:'text',  placeholder:'6'},
          {key:'version',  label:'Version',         type:'text',  placeholder:'v3.2.1'},
        ]}
        onClose={()=>setModal(null)} onSave={handleSaveCollection}/>

      <div className="page-header">
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <button onClick={()=>setSelProd(null)}
            style={{display:'flex',alignItems:'center',gap:6,padding:'7px 14px',background:'transparent',border:'1px solid #1a2740',borderRadius:8,color:'#4a6280',cursor:'pointer',fontSize:12,fontWeight:500}}>
            <ChevronRight size={13} style={{transform:'rotate(180deg)'}}/> All Products
          </button>
          <div className="prod-icon-circle" style={{width:40,height:40,background:`${selProd.color}15`,border:`1px solid ${selProd.color}30`,borderRadius:10,marginBottom:0}}>
            <Icon c={selProd.color}/>
          </div>
          <div>
            <div style={{fontWeight:800,fontSize:20,color:'#f1f5f9',lineHeight:1}}>{selProd.name}</div>
            <div style={{fontSize:12,color:'#4a6280',marginTop:2}}>{selProd.desc}</div>
          </div>
          <div style={{display:'flex',gap:8,alignItems:'center',marginLeft:8}}>
            <span className={`badge ${sm.cls}`}>{sm.label}</span>
            <span className="ver-chip">{selProd.version}</span>
            <span className="env" style={{background:`${selProd.colorDim||'#0a1525'}`,color:selProd.color,borderColor:`${selProd.color}30`}}>{selProd.env}</span>
          </div>
        </div>
      </div>

      <div className="content-area" style={{paddingTop:0}}>
        {/* Tab bar */}
        <div style={{display:'flex',borderBottom:'1px solid #1a2740',marginBottom:20,paddingTop:16}}>
          {[
            {id:'feed',  label:'Activity Feed',       count:updates.length},
            {id:'tc',    label:'Test Cases',            count:testCases.length},
            {id:'postman',label:'Postman Collections', count:collections.length},
          ].map(t=>(
            <button key={t.id} className={`detail-tab${tab===t.id?' active':''}`} onClick={()=>setTab(t.id)}>
              {t.label}
              <span style={{background:tab===t.id?`${selProd.color}20`:'rgba(255,255,255,.06)',color:tab===t.id?selProd.color:'#4a6280',padding:'1px 7px',borderRadius:10,fontSize:11,fontWeight:700}}>
                {t.count}
              </span>
            </button>
          ))}
          <div style={{flex:1}}/>
          {tab==='feed'    && <button className="btn btn-primary"   style={{margin:'0 0 -1px',fontSize:12,padding:'6px 14px'}} onClick={()=>setModal('update')}><Plus size={12}/>Add Update</button>}
          {tab==='tc'      && <button className="btn btn-primary"   style={{margin:'0 0 -1px',fontSize:12,padding:'6px 14px'}} onClick={()=>setModal('testcase')}><Plus size={12}/>Add Test Case</button>}
          {tab==='postman' && <button className="btn btn-primary"   style={{margin:'0 0 -1px',fontSize:12,padding:'6px 14px'}} onClick={()=>setModal('collection')}><Plus size={12}/>Add Collection</button>}
        </div>

        {/* ── FEED TAB ── */}
        {tab==='feed' && (
          <div>
            <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
              {['All','fix','feature','done','info'].map(f=>(
                <button key={f} onClick={()=>setFeedFilter(f)}
                  style={{padding:'5px 14px',borderRadius:100,border:'1px solid',fontSize:12,fontWeight:600,cursor:'pointer',transition:'all .15s',
                    background:feedFilter===f?(f==='All'?selProd.color:(TYPE_CFG[f]?.bg||'#071020')):'transparent',
                    color:feedFilter===f?'#fff':(f==='All'?selProd.color:(TYPE_CFG[f]?.c||'#4a6280')),
                    borderColor:feedFilter===f?(f==='All'?selProd.color:(TYPE_CFG[f]?.c||'#1a2740')):'#1a2740'}}>
                  {f==='All'?'All':TYPE_CFG[f]?.l||f}
                </button>
              ))}
              <span style={{fontSize:12,color:'#4a6280',alignSelf:'center',marginLeft:4}}>{feedFiltered.length} entries</span>
            </div>
            {feedFiltered.length===0 && <div className="card" style={{textAlign:'center',padding:40,color:'#4a6280'}}>No updates for this filter yet.</div>}
            {feedFiltered.map((u,i)=>{
              const tc = TYPE_CFG[u.type]||TYPE_CFG.info;
              return (
                <div key={u.id||i} className="card mb-3" style={{borderLeft:`3px solid ${tc.c}`}}>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:8}}>
                    <span style={{background:tc.bg,color:tc.c,padding:'3px 10px',borderRadius:6,fontSize:11,fontWeight:700,textTransform:'uppercase'}}>{tc.l}</span>
                    <span style={{fontSize:11,color:'#364c63'}}>{u.date}</span>
                  </div>
                  <div style={{fontWeight:700,fontSize:14,color:'#e2e8f0',marginBottom:6}}>{u.title}</div>
                  <div style={{fontSize:13,color:'#7a96b0',marginBottom:10,lineHeight:1.6}}>{u.desc}</div>
                  <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{(u.tags||[]).map(t=><span key={t} className="tag"><Tag size={9}/>{t}</span>)}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── TEST CASES TAB ── */}
        {tab==='tc' && (
          <div>
            {/* Summary chips */}
            <div style={{display:'flex',gap:10,marginBottom:16}}>
              {[['pass','#22c55e'],['fail','#ef4444'],['pending','#f59e0b']].map(([s,c])=>{
                const cnt = testCases.filter(tc=>(tcStatusMap[tc.id]||tc.status||'pending')===s).length;
                return <span key={s} style={{background:`${c}10`,color:c,border:`1px solid ${c}25`,padding:'5px 14px',borderRadius:8,fontSize:12,fontWeight:700,textTransform:'capitalize'}}>{s}: {cnt}</span>;
              })}
            </div>
            {testCases.length===0
              ? <div className="card" style={{textAlign:'center',padding:40,color:'#4a6280'}}>No test cases yet. Click "Add Test Case" to create one.</div>
              : <div className="card" style={{padding:0,overflow:'hidden'}}>
                  <div className="tc-row tc-hdr">
                    {['ID','Service','Test Case','Expected','Status'].map(h=><div key={h} className="tc-cell">{h}</div>)}
                  </div>
                  {testCases.map((tc,i)=>{
                    const st = tcStatusMap[tc.id]||tc.status||'pending';
                    const scfg = TC_STATUS[st]||TC_STATUS.pending;
                    return (
                      <div key={tc.id||i} className="tc-row">
                        <div className="tc-cell" style={{color:'#4a8fcf',fontFamily:'monospace',fontSize:11}}>{tc.id}</div>
                        <div className="tc-cell" style={{color:'#60a5ff',fontWeight:600}}>{tc.service}</div>
                        <div className="tc-cell" style={{color:'#c8d8e8',fontWeight:500}}>{tc.name}</div>
                        <div className="tc-cell" style={{color:'#7a96b0',fontSize:12}}>{tc.expected||'—'}</div>
                        <div className="tc-cell">
                          <button onClick={()=>toggleTcStatus(tc.id||i,st)}
                            className={`badge ${scfg.cls}`} style={{cursor:'pointer',border:'none',userSelect:'none'}}
                            title="Click to cycle: pass → fail → pending">
                            {scfg.l}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
            }
          </div>
        )}

        {/* ── POSTMAN TAB ── */}
        {tab==='postman' && (
          <div>
            {collections.length===0
              ? <div className="card" style={{textAlign:'center',padding:40,color:'#4a6280'}}>No Postman collections yet. Click "Add Collection" to create one.</div>
              : <PostmanCard prod={selProd.name} extraCollections={additions.collections[selProd.name]}/>
            }
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE: FAQ
───────────────────────────────────────────────────────────── */
function FAQPage() {
  const [prod, setProd] = useState("Rhoon");
  const [open, setOpen] = useState(null);
  const [search, setSearch] = useState("");
  const faqs = FAQS[prod] || [];
  const filtered = faqs.filter(f=>
    !search || f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="page-header">
        <div className="page-title">FAQ & Troubleshooting</div>
        <div className="page-sub">Per-product frequently asked questions and common integration issues</div>
      </div>
      <div className="content-area">
        <div className="flex gap-3 mb-4">
          <div className="search-wrap" style={{flex:1}}>
            <Search/>
            <input className="search-input" style={{width:"100%"}} placeholder="Search questions..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <select className="select" value={prod} onChange={e=>{setProd(e.target.value);setOpen(null)}}>
            {PRODUCTS.map(p=><option key={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="flex gap-2 mb-4">
          {PRODUCTS.map(p=>(
            <button key={p.id} className={`toggle-btn${prod===p.name?" active":""}`} onClick={()=>{setProd(p.name);setOpen(null)}}>
              {p.name} {FAQS[p.name]?`(${FAQS[p.name].length})`:"(0)"}
            </button>
          ))}
        </div>
        {filtered.length===0 && <div className="card" style={{textAlign:"center",padding:40,color:"#4a6280"}}>No FAQs available for {prod} yet. Click "+ Add FAQ" to contribute.</div>}
        {filtered.map((f,i)=>(
          <div key={i} className="faq-item">
            <div className="faq-q" onClick={()=>setOpen(open===i?null:i)}>
              <span>{f.q}</span>
              {open===i?<ChevronDown size={16} color="#4a6280"/>:<ChevronRight size={16} color="#4a6280"/>}
            </div>
            {open===i && <div className="faq-a" style={{paddingTop:14}}>{f.a}</div>}
          </div>
        ))}
        <button className="btn btn-ghost mt-4"><Plus size={14}/>Add FAQ for {prod}</button>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE: WEEKLY REPORTS
───────────────────────────────────────────────────────────── */
function WeeklyPage() {
  const [showGen, setShowGen] = useState(false);
  const [reports, setReports] = useState([]);       // [{id,title,product,dateRange,savedAt,source}]
  const [selId, setSelId]     = useState(null);
  const [previewHtml, setPreviewHtml] = useState(null);
  const [search, setSearch]   = useState('');
  const [filterProd, setFilterProd] = useState('All');
  const [saving, setSaving]   = useState(false);    // pending save from generator
  const [saveForm, setSaveForm] = useState(null);   // {html, product, dateRange}
  const [saveTitle, setSaveTitle] = useState('');
  const [loadingId, setLoadingId] = useState(null);
  const uploadRef = useRef(null);

  // ── Load library index from storage ──
  useEffect(()=>{
    if(!window.storage) return;
    window.storage.get('report-library').then(r=>{
      if(r) try { setReports(JSON.parse(r.value)); } catch(e){}
    }).catch(()=>{});
  },[]);

  const saveLibrary = async (list) => {
    setReports(list);
    if(window.storage) await window.storage.set('report-library', JSON.stringify(list)).catch(()=>{});
  };

  // ── Select & preview a report ──
  const selectReport = async (id) => {
    if(id===selId){ setSelId(null); setPreviewHtml(null); return; }
    setSelId(id); setLoadingId(id); setPreviewHtml(null);
    if(window.storage){
      const r = await window.storage.get(`report-html-${id}`).catch(()=>null);
      if(r) setPreviewHtml(r.value);
    }
    setLoadingId(null);
  };

  // ── Delete ──
  const deleteReport = async (id, e) => {
    e.stopPropagation();
    if(!window.confirm('Delete this report?')) return;
    const list = reports.filter(r=>r.id!==id);
    await saveLibrary(list);
    if(window.storage) window.storage.delete(`report-html-${id}`).catch(()=>{});
    if(selId===id){ setSelId(null); setPreviewHtml(null); }
  };

  // ── Open in new tab ──
  const openInTab = (e) => { e.stopPropagation(); if(previewHtml) genOpenInTab(previewHtml); };

  // ── Upload HTML report file ──
  const handleUploadFile = async (file) => {
    if(!file || !file.name.match(/\.(html|htm)$/i)) { alert('Please upload an .html file'); return; }
    const html = await new Promise((res,rej)=>{ const r=new FileReader(); r.onload=e=>res(e.target.result); r.onerror=rej; r.readAsText(file); });
    const guessedProd = ['Rhoon','Rabet','Wtheeq','Mulem','Bahri','Shary','Tajeeri'].find(p=>html.includes(p)) || 'Unknown';
    const defaultTitle = file.name.replace(/\.(html|htm)$/i,'').replace(/_/g,' ');
    setSaveForm({ html, product: guessedProd, dateRange: '', source: 'uploaded' });
    setSaveTitle(defaultTitle);
    setSaving(true);
  };

  // ── Save after generator ──
  const handleGeneratorSave = (html, product, dateRange) => {
    setSaveForm({ html, product, dateRange, source: 'generated' });
    setSaveTitle(`${product} — ${dateRange.replace(/&ndash;/g,'–')}`);
    setSaving(true);
  };

  // ── Confirm save ──
  const confirmSave = async () => {
    if(!saveTitle.trim() || !saveForm) return;
    const id = 'rpt-' + Date.now();
    const entry = { id, title: saveTitle.trim(), product: saveForm.product, dateRange: saveForm.dateRange, savedAt: new Date().toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'}), source: saveForm.source || 'generated' };
    const list = [entry, ...reports];
    await saveLibrary(list);
    if(window.storage) await window.storage.set(`report-html-${id}`, saveForm.html).catch(()=>{});
    setSaving(false); setSaveForm(null); setSaveTitle('');
    setSelId(id); setPreviewHtml(saveForm.html);
  };

  const filtered = reports.filter(r=>{
    const matchProd = filterProd==='All' || r.product===filterProd;
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.product.toLowerCase().includes(search.toLowerCase()) || r.dateRange.toLowerCase().includes(search.toLowerCase());
    return matchProd && matchSearch;
  });

  const prodColor = (prod) => PRODUCTS.find(p=>p.name===prod)?.color || '#3b82f6';
  const sel = reports.find(r=>r.id===selId);

  return (
    <>
      <div className="page-header">
        <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
          <div>
            <div className="page-title">Weekly Report Library</div>
            <div className="page-sub">{reports.length} saved reports · Upload past HTML reports or generate new ones</div>
          </div>
          <div style={{display:'flex',gap:8}}>
            <button onClick={()=>uploadRef.current?.click()}
              style={{display:'flex',alignItems:'center',gap:6,padding:'9px 16px',background:'transparent',border:'1px solid #1a2740',borderRadius:9,color:'#94a3b8',fontSize:13,fontWeight:600,cursor:'pointer',transition:'all .15s'}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor='#2d5a9e';e.currentTarget.style.color='#60a5ff';}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor='#1a2740';e.currentTarget.style.color='#94a3b8';}}
            >
              <Upload size={14}/>Upload Report
            </button>
            <input ref={uploadRef} type="file" accept=".html,.htm" style={{display:'none'}} onChange={e=>{ if(e.target.files[0]) handleUploadFile(e.target.files[0]); e.target.value=''; }}/>
            <button onClick={()=>setShowGen(true)}
              style={{display:'flex',alignItems:'center',gap:7,padding:'9px 18px',background:'linear-gradient(135deg,#1d4ed8,#1e3a8a)',border:'none',borderRadius:9,color:'#fff',fontWeight:700,fontSize:13,cursor:'pointer',boxShadow:'0 4px 16px rgba(29,78,216,.35)',transition:'opacity .15s'}}
              onMouseEnter={e=>e.currentTarget.style.opacity='.9'} onMouseLeave={e=>e.currentTarget.style.opacity='1'}>
              <TrendingUp size={14}/>Generate Report
            </button>
          </div>
        </div>
      </div>

      <div className="content-area">
        {/* ── Save modal ── */}
        {saving && saveForm && (
          <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.7)',zIndex:2000,display:'flex',alignItems:'center',justifyContent:'center'}} onClick={e=>{if(e.target===e.currentTarget){setSaving(false);setSaveForm(null);}}}>
            <div style={{background:'#09111f',border:'1px solid #1a2740',borderRadius:16,padding:28,width:440,maxWidth:'95vw'}}>
              <div style={{fontSize:16,fontWeight:700,color:'#f1f5f9',marginBottom:6}}>💾 Save Report to Library</div>
              <div style={{fontSize:12,color:'#4a6280',marginBottom:20}}>Give this report a name so you can find it later</div>
              <div style={{marginBottom:12}}>
                <div className="gen-label">Report Title</div>
                <input className="gen-input" value={saveTitle} onChange={e=>setSaveTitle(e.target.value)} placeholder="e.g. Rhoon Week 17 — Apr 21-25, 2025" autoFocus
                  onKeyDown={e=>{if(e.key==='Enter')confirmSave();}}/>
              </div>
              <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:20}}>
                <div style={{background:`${prodColor(saveForm.product)}15`,color:prodColor(saveForm.product),padding:'3px 10px',borderRadius:5,fontSize:11,fontWeight:700,border:`1px solid ${prodColor(saveForm.product)}30`}}>{saveForm.product}</div>
                {saveForm.dateRange && <span style={{fontSize:12,color:'#4a6280'}}>{saveForm.dateRange.replace(/&ndash;/g,'–')}</span>}
                <span style={{fontSize:11,color:'#364c63',marginLeft:'auto',background:'rgba(255,255,255,.04)',padding:'2px 7px',borderRadius:4}}>{saveForm.source==='uploaded'?'Uploaded':'Generated'}</span>
              </div>
              <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
                <button onClick={()=>{setSaving(false);setSaveForm(null);}} style={{padding:'8px 18px',background:'transparent',border:'1px solid #1a2740',borderRadius:8,color:'#4a6280',cursor:'pointer',fontSize:13,fontFamily:'inherit'}}>Cancel</button>
                <button onClick={confirmSave} disabled={!saveTitle.trim()} style={{padding:'8px 20px',background:saveTitle.trim()?'#1d4ed8':'rgba(255,255,255,.06)',border:'none',borderRadius:8,color:saveTitle.trim()?'#fff':'rgba(255,255,255,.25)',cursor:saveTitle.trim()?'pointer':'not-allowed',fontSize:13,fontWeight:700,fontFamily:'inherit'}}>Save to Library</button>
              </div>
            </div>
          </div>
        )}

        <div style={{display:'grid',gridTemplateColumns:'340px 1fr',gap:20,alignItems:'start'}}>
          {/* ── LEFT: Library list ── */}
          <div>
            {/* Search + filter */}
            <div style={{marginBottom:12}}>
              <div style={{position:'relative',marginBottom:8}}>
                <Search size={13} color="#2a3f55" style={{position:'absolute',left:10,top:'50%',transform:'translateY(-50%)'}}/>
                <input className="rlib-search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search reports…"/>
              </div>
              <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                {['All',...[...new Set(reports.map(r=>r.product))].sort()].map(p=>(
                  <button key={p} onClick={()=>setFilterProd(p)}
                    style={{padding:'3px 10px',borderRadius:5,fontSize:11,fontWeight:600,cursor:'pointer',fontFamily:'inherit',border:'1px solid',
                      background:filterProd===p?'#1d4ed820':'transparent',
                      borderColor:filterProd===p?'#1d4ed8':'#1a2740',
                      color:filterProd===p?'#60a5ff':'#4a6280'}}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload drop zone (when empty) */}
            {reports.length===0 && (
              <div onClick={()=>uploadRef.current?.click()}
                style={{border:'1.5px dashed #1a2740',borderRadius:12,padding:'40px 20px',textAlign:'center',cursor:'pointer',transition:'all .15s',marginBottom:12}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#2d5a9e';e.currentTarget.style.background='rgba(59,130,246,.04)';}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='#1a2740';e.currentTarget.style.background='transparent';}}>
                <FileText size={32} color="#2a3f55" style={{margin:'0 auto 12px'}}/>
                <div style={{fontSize:14,fontWeight:600,color:'#4a6280',marginBottom:4}}>No reports yet</div>
                <div style={{fontSize:12,color:'#364c63'}}>Upload a past HTML report or generate a new one</div>
              </div>
            )}

            {/* Report list */}
            <div style={{display:'flex',flexDirection:'column',gap:6,maxHeight:'65vh',overflowY:'auto',paddingRight:2}}>
              {filtered.map(r=>{
                const pc = prodColor(r.product);
                return (
                  <div key={r.id} className={`rlib-card${selId===r.id?' active':''}`} onClick={()=>selectReport(r.id)}>
                    <div style={{width:40,height:40,borderRadius:10,background:`${pc}15`,border:`1px solid ${pc}25`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                      <BarChart2 size={16} color={pc}/>
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div style={{fontWeight:700,fontSize:13,color:'#e2e8f0',marginBottom:3,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{r.title}</div>
                      <div style={{display:'flex',gap:6,alignItems:'center',flexWrap:'wrap'}}>
                        <span style={{background:`${pc}12`,color:pc,padding:'1px 6px',borderRadius:4,fontSize:10,fontWeight:700}}>{r.product}</span>
                        {r.dateRange && <span style={{fontSize:11,color:'#4a6280'}}>{r.dateRange.replace(/&ndash;/g,'–')}</span>}
                        <span style={{fontSize:10,color:'#2a3f55',marginLeft:'auto'}}>{r.savedAt}</span>
                      </div>
                      <div style={{display:'flex',gap:4,marginTop:7}} className="rlib-actions">
                        {loadingId===r.id ? <span style={{fontSize:11,color:'#4a6280'}}>Loading…</span> : <>
                          <button className="rlib-icon-btn" onClick={e=>{e.stopPropagation();if(previewHtml&&selId===r.id)genOpenInTab(previewHtml);}}>
                            <Eye size={10}/>Open
                          </button>
                          <button className="rlib-icon-btn danger" onClick={e=>deleteReport(r.id,e)}>
                            <XCircle size={10}/>Delete
                          </button>
                        </>}
                      </div>
                    </div>
                  </div>
                );
              })}
              {filtered.length===0 && reports.length>0 && (
                <div style={{textAlign:'center',padding:'40px 0',color:'#364c63',fontSize:13}}>No reports match your filter</div>
              )}
            </div>

            {/* Bottom actions */}
            {reports.length > 0 && (
              <div style={{marginTop:10,display:'flex',gap:6}}>
                <button onClick={()=>uploadRef.current?.click()}
                  style={{flex:1,padding:'9px',background:'rgba(255,255,255,.03)',border:'1px dashed #1a2740',borderRadius:8,color:'#4a6280',fontSize:12,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6,fontFamily:'inherit',transition:'all .15s'}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='#2d5a9e';e.currentTarget.style.color='#60a5ff';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='#1a2740';e.currentTarget.style.color='#4a6280';}}>
                  <Upload size={12}/>Upload
                </button>
                <button onClick={()=>setShowGen(true)}
                  style={{flex:1,padding:'9px',background:'rgba(29,78,216,.08)',border:'1px dashed #1d4ed8',borderRadius:8,color:'#60a5ff',fontSize:12,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',gap:6,fontFamily:'inherit',transition:'all .15s'}}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(29,78,216,.15)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(29,78,216,.08)'}>
                  <TrendingUp size={12}/>Generate
                </button>
              </div>
            )}
          </div>

          {/* ── RIGHT: Preview ── */}
          {!selId && (
            <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'60px 20px',border:'1.5px dashed #1a2740',borderRadius:14,color:'#2a3f55',gap:12,minHeight:300}}>
              <BarChart2 size={40} color="#1a2740"/>
              <div style={{fontSize:14,fontWeight:600,color:'#364c63'}}>Select a report to preview</div>
              <div style={{fontSize:12,color:'#2a3f55'}}>Or generate a new one from the button above</div>
            </div>
          )}
          {selId && (
            <div style={{display:'flex',flexDirection:'column',gap:0,border:'1px solid #1a2740',borderRadius:14,overflow:'hidden'}}>
              {/* Preview header */}
              <div style={{padding:'12px 16px',background:'#0a1525',borderBottom:'1px solid #1a2740',display:'flex',alignItems:'center',gap:12}}>
                {sel && <>
                  <div style={{width:8,height:8,borderRadius:'50%',background:prodColor(sel.product),flexShrink:0}}/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:13,color:'#e2e8f0',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{sel.title}</div>
                    <div style={{fontSize:11,color:'#4a6280'}}>{sel.product} · {sel.savedAt}</div>
                  </div>
                  <div style={{display:'flex',gap:6,flexShrink:0}}>
                    <button onClick={openInTab} style={{padding:'5px 12px',background:'#1d4ed8',border:'none',borderRadius:6,color:'#fff',fontSize:12,fontWeight:600,cursor:'pointer',display:'flex',alignItems:'center',gap:5,fontFamily:'inherit'}}>
                      <Eye size={11}/>Open in Tab
                    </button>
                  </div>
                </>}
              </div>
              {/* iframe */}
              {loadingId===selId && <div style={{height:540,display:'flex',alignItems:'center',justifyContent:'center',color:'#4a6280',fontSize:13}}>Loading…</div>}
              {!loadingId && previewHtml && (
                <iframe srcDoc={previewHtml} style={{width:'100%',height:560,border:'none',background:'#fff'}} title="Report Preview" sandbox="allow-same-origin"/>
              )}
              {!loadingId && !previewHtml && (
                <div style={{height:400,display:'flex',alignItems:'center',justifyContent:'center',color:'#4a6280',fontSize:13,flexDirection:'column',gap:8}}>
                  <FileText size={30} color="#1a2740"/>
                  <div>Report HTML not found in storage</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <WeeklyReportGenerator show={showGen} onClose={()=>setShowGen(false)} onSave={handleGeneratorSave}/>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE: MONTHLY REPORTS
───────────────────────────────────────────────────────────── */
function buildMonthlyReportHTML(report, recipientName) {
  const F='font-family:Calibri,sans-serif;font-size:11pt;';
  const C='color:#1a3a5c;';
  const HDR_BG='#dae9f8';
  const BORDER='1px solid #000';
  const TXT='#477aaa';
  const titleBox=t=>`<table border="0" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;margin-bottom:8px"><tbody><tr><td style="border:solid #477aaa 1.5pt;background:#dde8f0;padding:6pt;text-align:center;vertical-align:middle"><b><span style="${F}font-size:14pt;color:${TXT}">${t}</span></b></td></tr></tbody></table>`;
  const hdr=(cells)=>`<tr>${cells.map(c=>`<td style="border:${BORDER};background:${HDR_BG};padding:4pt 6pt;text-align:center"><b><span style="${F}color:${TXT}">${c}</span></b></td>`).join('')}</tr>`;
  const row=(cells)=>`<tr>${cells.map((c,i)=>`<td style="border:${BORDER};background:#fff;padding:3pt 6pt;${i===0?'':'text-align:center'}"><span style="${F}color:${TXT}">${c}</span></td>`).join('')}</tr>`;
  const prodRows = report.products.map(p=>row([p.name,p.meetings,p.newEntities,p.transactions,p.issues,p.highlights.join(' | ')]));
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body>
<div style="${F}${C}max-width:900px;margin:0;padding:12px">
<p style="margin:0 0 8px"><span style="${F}">Dear ${recipientName||'Team'},</span></p>
<p style="margin:0 0 12px"><span style="${F}">Please find below the monthly integration activity summary for ${report.label}.</span></p>
<p style="margin:8px 0;text-align:center"><b><span style="${F}font-size:14pt;color:#0d3349">Monthly Integration Report — ${report.label}</span></b></p>
<p style="margin:0 0 16px;text-align:center"><b><span style="${F}font-size:11pt;color:#0d3349">SlashData Integration Services</span></b></p>
${titleBox('Summary — All Products')}
<table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;border:${BORDER};margin-bottom:16px"><tbody>
${hdr(['Product','Meetings','New Entities','Transactions','Open Issues','Highlights'])}
${prodRows.join('')}
</tbody></table>
${report.products.map(p=>{
  const prod_c = p.name==='Rhoon'?'#22c55e':p.name==='Wtheeq'?'#3b82f6':p.name==='Mulem'?'#3b82f6':p.name==='Rabet'?'#22c55e':p.name==='Shary'?'#a855f7':p.name==='Bahri'?'#f59e0b':'#f59e0b';
  return `
${titleBox(p.name+' — Monthly Summary')}
<table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;border:${BORDER};margin-bottom:8px"><tbody>
${hdr(['Metric','Value'])}
${row(['Meetings held',p.meetings])}
${row(['New entities onboarded',p.newEntities])}
${row(['Total transactions',p.transactions])}
${row(['Open issues',p.issues])}
</tbody></table>
<p style="margin:6px 0 4px"><b><span style="${F}color:${TXT}">Highlights:</span></b></p>
<ul style="margin:0 0 16px;padding-left:20px">${p.highlights.map(h=>`<li style="${F}color:${TXT};margin-bottom:3px">${h}</li>`).join('')}</ul>`;
}).join('')}
<p style="margin:16px 0 0"><span style="${F}">Kindly let me know if you have any questions or need further details.</span></p>
<p style="margin:8px 0 0"><b><span style="${F}">Best Regards,<br>SlashData Integration Team</span></b></p>
</div></body></html>`;
}

function MonthlyPage() {
  const [selReport, setSelReport] = useState(MONTHLY_REPORTS[0]);
  const [recipient, setRecipient] = useState('');
  const [showGen, setShowGen]     = useState(false);
  const [previewHtml, setPreviewHtml] = useState(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerate = async () => {
    if(!selReport) return;
    setGenerating(true);
    await new Promise(r=>setTimeout(r,300));
    const html = buildMonthlyReportHTML(selReport, recipient);
    setPreviewHtml(html);
    const opened = genOpenInTab(html);
    setGenerating(false);
    if(!opened) setShowGen(false); // fallback shows in-page preview
  };

  return (
    <>
      <div className="page-header">
        <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <div>
            <div className="page-title">Monthly Reports</div>
            <div className="page-sub">Monthly integration activity summaries — generate and send to stakeholders</div>
          </div>
          <button onClick={()=>setShowGen(s=>!s)}
            style={{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",background:"linear-gradient(135deg,#1d4ed8,#1e3a8a)",border:"none",borderRadius:10,color:"#fff",fontWeight:700,fontSize:13,cursor:"pointer",whiteSpace:"nowrap",boxShadow:"0 4px 16px rgba(29,78,216,.35)"}}>
            <BarChart2 size={15}/>Generate Monthly Report
          </button>
        </div>
      </div>

      <div className="content-area">
        {/* Generate panel */}
        {showGen && (
          <div className="card mb-6" style={{borderLeft:"3px solid #3b82f6"}}>
            <div className="card-title flex items-center gap-2"><BarChart2 size={13}/>Generate Report</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:12,alignItems:"end"}}>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:"#4a6280",textTransform:"uppercase",letterSpacing:".6px",marginBottom:5}}>Report Period</div>
                <select className="select" style={{width:"100%"}} value={selReport?.id} onChange={e=>setSelReport(MONTHLY_REPORTS.find(r=>r.id===e.target.value))}>
                  {MONTHLY_REPORTS.map(r=><option key={r.id} value={r.id}>{r.label}</option>)}
                </select>
              </div>
              <div>
                <div style={{fontSize:11,fontWeight:600,color:"#4a6280",textTransform:"uppercase",letterSpacing:".6px",marginBottom:5}}>Recipient Name</div>
                <input className="gen-input" placeholder="e.g. Albahaa, Team" value={recipient} onChange={e=>setRecipient(e.target.value)}/>
              </div>
              <button className="gen-generate-btn" style={{width:"auto",padding:"10px 24px"}} onClick={handleGenerate} disabled={generating}>
                {generating?"Generating…":"Generate & Open ↗"}
              </button>
            </div>
            {previewHtml && (
              <div style={{marginTop:16,border:"1px solid #1a2740",borderRadius:10,overflow:"hidden"}}>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 16px",background:"#0a1525",borderBottom:"1px solid #1a2740"}}>
                  <span style={{fontSize:13,fontWeight:600,color:"#c8d8e8"}}>📄 Report Preview — {selReport?.label}</span>
                  <div style={{display:"flex",gap:8}}>
                    <button onClick={()=>genOpenInTab(previewHtml)} style={{padding:"5px 14px",background:"#1d4ed8",border:"none",borderRadius:6,color:"#fff",fontSize:12,fontWeight:600,cursor:"pointer"}}>Open in New Tab ↗</button>
                    <button onClick={()=>setPreviewHtml(null)} style={{padding:"5px 10px",background:"transparent",border:"1px solid #1a2740",borderRadius:6,color:"#4a6280",fontSize:12,cursor:"pointer"}}>✕</button>
                  </div>
                </div>
                <iframe srcDoc={previewHtml} style={{width:"100%",height:480,border:"none",background:"#fff"}} title="Monthly Report Preview" sandbox="allow-same-origin"/>
              </div>
            )}
          </div>
        )}

        {/* Month selector */}
        <div className="flex gap-3 mb-5">
          {MONTHLY_REPORTS.map(r=>(
            <button key={r.id} onClick={()=>setSelReport(r)}
              style={{padding:"7px 16px",border:"1px solid",borderRadius:8,fontSize:13,fontWeight:600,cursor:"pointer",transition:"all .15s",
                background:selReport?.id===r.id?"#0f2a56":"transparent",color:selReport?.id===r.id?"#60a5ff":"#4a6280",
                borderColor:selReport?.id===r.id?"#1d4ed8":"#1a2740"}}>
              {r.label}
            </button>
          ))}
        </div>

        {/* Product cards */}
        {selReport && (
          <div className="grid-2">
            {selReport.products.map((p,i)=>{
              const prod = PRODUCTS.find(x=>x.name===p.name);
              return (
                <div key={i} className="card" style={{borderLeft:`3px solid ${prod?.color||"#3b82f6"}`}}>
                  <div className="flex items-center justify-between mb-4">
                    <span style={{fontWeight:700,fontSize:16,color:"#f1f5f9"}}>{p.name}</span>
                    <Badge statusKey={prod?.statusKey||"live"}/>
                  </div>
                  <div className="grid-2 mb-4" style={{gap:8}}>
                    {[
                      {l:"Meetings",     k:"meetings",    icon:"👥"},
                      {l:"New Entities", k:"newEntities", icon:"🏢"},
                      {l:"Transactions", k:"transactions",icon:"🔄"},
                      {l:"Open Issues",  k:"issues",      icon:"⚠️"},
                    ].map(m=>(
                      <div key={m.k} className="card-sm" style={{padding:"10px 14px"}}>
                        <div style={{fontSize:18}}>{m.icon}</div>
                        <div style={{fontSize:20,fontWeight:700,color:"#f1f5f9",margin:"4px 0 2px"}}>{p[m.k]}</div>
                        <div style={{fontSize:11,color:"#4a6280"}}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="card-title">Highlights</div>
                  {p.highlights.map((h,j)=>(
                    <div key={j} className="flex gap-2 items-center mb-2">
                      <CheckCircle size={12} color={prod?.color||"#22c55e"}/><span style={{fontSize:13,color:"#94a3b8"}}>{h}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE: TEAM OWNERSHIP
───────────────────────────────────────────────────────────── */
function TeamPage() {
  return (
    <>
      <div className="page-header">
        <div className="page-title">Team Ownership</div>
        <div className="page-sub">Integration engineers assigned to each product</div>
      </div>
      <div className="content-area">
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:16}}>
          {TEAM.map((t,i)=>{
            const prod = PRODUCTS.find(p=>p.name===t.product);
            return (
              <div key={i} className="card" style={{borderLeft:`3px solid ${prod?.color||"#3b82f6"}`}}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div style={{fontWeight:700,fontSize:16,color:"#f1f5f9"}}>{t.product}</div>
                    <Badge statusKey={prod?.statusKey||"live"}/>
                  </div>
                  <div className="act-icon" style={{background:"#071020",width:36,height:36}}>
                    <Package size={16} color="#3b82f6"/>
                  </div>
                </div>
                <div className="mb-3">
                  <div style={{fontSize:11,color:"#4a6280",marginBottom:8,textTransform:"uppercase",letterSpacing:".6px",fontWeight:600}}>Main Owner</div>
                  <div className="owner-chip">
                    <Avatar name={t.main}/>
                    <span style={{fontSize:13,fontWeight:600,color:"#e2e8f0"}}>{t.main}</span>
                    <span className="badge badge-live" style={{fontSize:10,padding:"1px 6px"}}>Main</span>
                  </div>
                </div>
                <div className="mb-3">
                  <div style={{fontSize:11,color:"#4a6280",marginBottom:8,textTransform:"uppercase",letterSpacing:".6px",fontWeight:600}}>Support</div>
                  <div className="flex gap-2" style={{flexWrap:"wrap"}}>
                    {t.support.map(s=>(
                      <div key={s} className="owner-chip">
                        <Avatar name={s} color="#0d3a6e"/>
                        <span style={{fontSize:12,color:"#94a3b8"}}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="sep" style={{margin:"12px 0"}}/>
                <div className="flex gap-2">
                  <a href={`mailto:${t.email}`} className="btn btn-ghost" style={{fontSize:11,padding:"4px 10px"}}><Mail size={11}/>{t.email}</a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE: PARTNER PROFILES
───────────────────────────────────────────────────────────── */
function EntityPage() {
  const [filterProd, setFilterProd] = useState("All");
  const [sel, setSel] = useState(ENTITIES[0]);
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState({});
  const [activeTab, setActiveTab] = useState("journey");

  const filtered = ENTITIES.filter(e=>filterProd==="All"||e.product===filterProd);

  const SM = {
    live:    {cls:"badge-done",   icon:CheckCircle,   lbl:"Live"},
    inprog:  {cls:"badge-inprog", icon:Clock,         lbl:"In Progress"},
    limited: {cls:"badge-limited",icon:Shield,        lbl:"Limited"},
    dev:     {cls:"badge-dev",    icon:Clock,         lbl:"Dev"},
    down:    {cls:"badge-down",   icon:XCircle,       lbl:"Down"},
  };

  const saveNote = () => {
    if(!noteText.trim()||!sel) return;
    const key = sel.id;
    const now = new Date().toLocaleDateString("en-GB",{day:"numeric",month:"short",year:"numeric"});
    const updated = {...notes,[key]:[{date:now,text:noteText},...(notes[key]||[])]};
    setNotes(updated); setNoteText("");
    if(window.storage) window.storage.set(`entity-notes-${key}`,JSON.stringify(updated[key])).catch(()=>{});
  };

  useEffect(()=>{
    if(!sel) return;
    if(window.storage) window.storage.get(`entity-notes-${sel.id}`).then(r=>{
      if(r) setNotes(n=>({...n,[sel.id]:JSON.parse(r.value)}));
    }).catch(()=>{});
    setActiveTab("journey");
  },[sel?.id]);

  // Derived data from history
  const history = sel ? (ENTITY_HISTORY[sel.id]||[]) : [];
  const trainings   = history.filter(h=>h.type==="training");
  const openIssues  = history.filter(h=>h.type==="issue" && h.note.includes("OPEN"));
  const resolvedIss = history.filter(h=>h.type==="issue" && h.note.includes("RESOLVED"));
  const meetingsH   = history.filter(h=>h.type==="meeting");
  const prodColor   = sel ? (PRODUCTS.find(p=>p.name===sel.product)?.color||"#3b82f6") : "#3b82f6";

  const HistIcon2 = ({type}) => {
    const cfg = {meeting:{bg:"#0c1a4a",c:"#60a5fa",Icon:Users},email:{bg:"#071020",c:"#3b82f6",Icon:Mail},training:{bg:"#052e16",c:"#4ade80",Icon:BookOpen},issue:{bg:"#200a0a",c:"#f87171",Icon:AlertTriangle},golive:{bg:"#0a2e1a",c:"#22c55e",Icon:CheckCircle}};
    const s = cfg[type]||cfg.meeting;
    return <div style={{width:28,height:28,borderRadius:8,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><s.Icon size={13} color={s.c}/></div>;
  };

  return (
    <>
      <div className="page-header">
        <div className="page-title">Partner Profiles</div>
        <div className="page-sub">Full journey, training history, open concerns and communication log — per partner, per product</div>
      </div>
      <div className="content-area" style={{paddingTop:0}}>
        {/* Product filter */}
        <div className="flex gap-2 mb-4" style={{paddingTop:20,flexWrap:"wrap"}}>
          {["All",...PRODUCTS.map(p=>p.name)].map(p=>(
            <button key={p} className={`toggle-btn${filterProd===p?" active":""}`} onClick={()=>setFilterProd(p)}>
              {p}
              {p!=="All" && <span style={{background:"rgba(59,130,246,.15)",color:"#60a5ff",fontSize:10,padding:"0 5px",borderRadius:4,marginLeft:4}}>
                {ENTITIES.filter(e=>e.product===p).length}
              </span>}
            </button>
          ))}
        </div>

        <div style={{display:"grid",gridTemplateColumns:"270px 1fr",gap:20,alignItems:"start"}}>

          {/* ── Left: Partner list ── */}
          <div>
            {filtered.map(e=>{
              const sm = SM[e.status]||SM.live;
              const h = ENTITY_HISTORY[e.id]||[];
              const openC = h.filter(x=>x.type==="issue"&&x.note.includes("OPEN")).length;
              const pc = PRODUCTS.find(p=>p.name===e.product)?.color||"#3b82f6";
              return (
                <div key={e.id} onClick={()=>setSel(e)}
                  className="card mb-3"
                  style={{cursor:"pointer",borderLeft:`3px solid ${pc}`,borderColor:sel?.id===e.id?"#2d5a9e":"#1a2740",background:sel?.id===e.id?"#0d1e38":"#0d1829"}}>
                  <div className="flex items-center justify-between mb-1">
                    <div style={{fontWeight:700,fontSize:14,color:"#f1f5f9"}}>{e.name}</div>
                    <span className={`badge ${sm.cls}`} style={{fontSize:10}}>{sm.lbl}</span>
                  </div>
                  <div style={{fontSize:11,color:"#4a6280",marginBottom:6}}>{e.fullName}</div>
                  <div className="flex gap-2 items-center">
                    <span style={{color:pc,fontSize:11,fontWeight:600}}>{e.product}</span>
                    {openC>0 && <span className="badge badge-down" style={{fontSize:10}}>{openC} open</span>}
                    <span style={{fontSize:10,color:"#364c63",marginLeft:"auto"}}>{e.lastComm.split(",")[0]}</span>
                  </div>
                </div>
              );
            })}
            {filtered.length===0&&<div style={{color:"#4a6280",fontSize:13,padding:20,textAlign:"center"}}>No partners for this product yet.</div>}
          </div>

          {/* ── Right: Profile detail ── */}
          {!sel && (
            <div className="card" style={{textAlign:"center",padding:60,color:"#4a6280"}}>
              <Users size={40} style={{margin:"0 auto 12px",opacity:.3}}/>
              <div>Select a partner to view their profile</div>
            </div>
          )}
          {sel && (
            <div>
              {/* ── Profile header ── */}
              <div className="card mb-4" style={{borderLeft:`4px solid ${prodColor}`}}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <div style={{width:44,height:44,borderRadius:12,background:`${prodColor}20`,border:`1px solid ${prodColor}40`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:prodColor}}>
                        {sel.name.slice(0,2)}
                      </div>
                      <div>
                        <div style={{fontSize:20,fontWeight:800,color:"#f1f5f9"}}>{sel.name}</div>
                        <div style={{fontSize:13,color:"#4a6280"}}>{sel.fullName}</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span style={{background:`${prodColor}15`,color:prodColor,padding:"4px 10px",borderRadius:6,fontSize:12,fontWeight:700,border:`1px solid ${prodColor}30`}}>{sel.product}</span>
                    <span className={`badge ${(SM[sel.status]||SM.live).cls}`}>{(SM[sel.status]||SM.live).lbl}</span>
                  </div>
                </div>
                {/* Quick stats row */}
                <div className="grid-4" style={{gap:8,marginBottom:12}}>
                  {[
                    {l:"Go-Live",    v:sel.goLive==="Pending"?"Pending":sel.goLive,          icon:CheckCircle,  c:"#22c55e"},
                    {l:"Meetings",   v:sel.meetings,                                          icon:Users,        c:"#60a5ff"},
                    {l:"Trainings",  v:trainings.length||"—",                                icon:BookOpen,     c:"#a78bfa"},
                    {l:"Open Issues",v:openIssues.length||"None",                            icon:AlertTriangle,c:openIssues.length?"#f87171":"#22c55e"},
                  ].map((s,i)=>(
                    <div key={i} style={{background:"#070c18",border:"1px solid #1a2740",borderRadius:10,padding:"10px 12px"}}>
                      <div className="flex items-center gap-2 mb-1"><s.icon size={12} color={s.c}/><span style={{fontSize:10,color:"#4a6280",textTransform:"uppercase",letterSpacing:".5px"}}>{s.l}</span></div>
                      <div style={{fontSize:15,fontWeight:700,color:"#f1f5f9"}}>{s.v}</div>
                    </div>
                  ))}
                </div>
                {/* Tags */}
                <div className="flex gap-1 flex-wrap">
                  {sel.tags.map(t=><span key={t} className="tag"><Tag size={9}/>{t}</span>)}
                  <span style={{fontSize:11,color:"#364c63",marginLeft:"auto"}}>Last contact: {sel.lastComm}</span>
                </div>
              </div>

              {/* ── Tab navigation ── */}
              <div className="flex gap-0 mb-4" style={{borderBottom:"1px solid #1a2740"}}>
                {[
                  {id:"journey",  lbl:"Journey & Timeline", count:history.length},
                  {id:"training", lbl:"Training Sessions",  count:trainings.length},
                  {id:"concerns", lbl:"Concerns & Issues",  count:openIssues.length, warn:openIssues.length>0},
                  {id:"log",      lbl:"Communication Log",  count:(notes[sel.id]||[]).length},
                ].map(t=>(
                  <button key={t.id} onClick={()=>setActiveTab(t.id)}
                    style={{padding:"8px 16px",border:"none",background:"transparent",cursor:"pointer",fontSize:13,fontWeight:activeTab===t.id?700:400,color:activeTab===t.id?"#60a5ff":"#4a6280",borderBottom:activeTab===t.id?"2px solid #3b82f6":"2px solid transparent",marginBottom:-1,display:"flex",alignItems:"center",gap:6,whiteSpace:"nowrap",transition:"color .15s"}}>
                    {t.lbl}
                    {t.count>0&&<span style={{background:t.warn?"rgba(239,68,68,.15)":activeTab===t.id?"rgba(59,130,246,.2)":"rgba(255,255,255,.06)",color:t.warn?"#f87171":activeTab===t.id?"#60a5ff":"#4a6280",padding:"0 6px",borderRadius:10,fontSize:11,fontWeight:700}}>{t.count}</span>}
                  </button>
                ))}
              </div>

              {/* ── Tab: Journey & Timeline ── */}
              {activeTab==="journey" && (
                <div className="card">
                  <div className="card-title flex items-center gap-2"><Clock size={13}/>Full Integration Journey</div>
                  {history.length===0 && <div style={{color:"#4a6280",fontSize:13,padding:"8px 0"}}>No history recorded yet.</div>}
                  {history.map((h,i)=>(
                    <div key={i} className="hist-item">
                      <HistIcon2 type={h.type}/>
                      <div style={{flex:1}}>
                        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                          <span style={{fontSize:11,fontWeight:700,color:"#60a5ff",textTransform:"capitalize",background:"rgba(59,130,246,.08)",padding:"1px 7px",borderRadius:4}}>{h.type}</span>
                          {h.note.includes("OPEN") && <span className="badge badge-down" style={{fontSize:10}}>Open</span>}
                          {h.note.includes("RESOLVED") && <span style={{fontSize:10,color:"#22c55e",background:"rgba(34,197,94,.08)",padding:"1px 7px",borderRadius:4}}>Resolved</span>}
                        </div>
                        <div style={{fontSize:13,color:"#94a3b8",lineHeight:1.6}}>{h.note}</div>
                      </div>
                      <div className="hist-date">{h.date}</div>
                    </div>
                  ))}
                  {history.length===0 && (
                    <div style={{textAlign:"center",padding:"20px 0",color:"#364c63",fontSize:12}}>
                      No journey events yet. Use the Communication Log tab to add entries.
                    </div>
                  )}
                </div>
              )}

              {/* ── Tab: Training Sessions ── */}
              {activeTab==="training" && (
                <div className="card">
                  <div className="card-title flex items-center gap-2"><BookOpen size={13}/>Training Sessions</div>
                  {trainings.length===0 && <div style={{color:"#4a6280",fontSize:13,padding:"12px 0",textAlign:"center"}}>No training sessions recorded for this partner yet.</div>}
                  {trainings.map((t,i)=>(
                    <div key={i} style={{padding:"14px 0",borderBottom:i<trainings.length-1?"1px solid #131f32":"none",display:"flex",gap:14,alignItems:"flex-start"}}>
                      <div style={{width:40,height:40,borderRadius:10,background:"#052e16",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                        <BookOpen size={16} color="#4ade80"/>
                      </div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:13,color:"#c8d8e8",fontWeight:600,marginBottom:4}}>{t.note}</div>
                        <div className="flex gap-3 items-center">
                          <span style={{fontSize:11,color:"#4a6280"}}>{t.date}</span>
                          <span style={{fontSize:11,color:"#22c55e",background:"rgba(34,197,94,.08)",padding:"1px 7px",borderRadius:4}}>Completed</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {trainings.length===0 && (
                    <button className="btn btn-ghost w-full mt-2" style={{justifyContent:"center",fontSize:12}} onClick={()=>setActiveTab("log")}>
                      <Plus size={12}/>Log a training session via Communication Log
                    </button>
                  )}
                </div>
              )}

              {/* ── Tab: Concerns & Issues ── */}
              {activeTab==="concerns" && (
                <div>
                  {openIssues.length>0 && (
                    <div className="card mb-4">
                      <div className="card-title flex items-center gap-2" style={{color:"#f87171"}}><AlertTriangle size={13} color="#f87171"/>Open Issues & Concerns</div>
                      {openIssues.map((issue,i)=>(
                        <div key={i} style={{padding:"12px",background:"rgba(239,68,68,.05)",border:"1px solid rgba(239,68,68,.15)",borderRadius:8,marginBottom:8}}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="badge badge-down">Open</span>
                            <span style={{fontSize:11,color:"#4a6280"}}>{issue.date}</span>
                          </div>
                          <div style={{fontSize:13,color:"#fca5a5",lineHeight:1.6}}>{issue.note}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {resolvedIss.length>0 && (
                    <div className="card">
                      <div className="card-title flex items-center gap-2" style={{color:"#4ade80"}}><CheckCircle size={13} color="#4ade80"/>Resolved Issues</div>
                      {resolvedIss.map((issue,i)=>(
                        <div key={i} style={{padding:"12px",background:"rgba(34,197,94,.04)",border:"1px solid rgba(34,197,94,.12)",borderRadius:8,marginBottom:8}}>
                          <div className="flex items-center justify-between mb-2">
                            <span style={{fontSize:10,color:"#22c55e",background:"rgba(34,197,94,.1)",padding:"2px 8px",borderRadius:4,fontWeight:600}}>Resolved</span>
                            <span style={{fontSize:11,color:"#4a6280"}}>{issue.date}</span>
                          </div>
                          <div style={{fontSize:13,color:"#7a96b0",lineHeight:1.6}}>{issue.note}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {openIssues.length===0&&resolvedIss.length===0&&(
                    <div className="card" style={{textAlign:"center",padding:40,color:"#4a6280"}}>
                      <CheckCircle size={36} style={{margin:"0 auto 12px"}} color="#22c55e"/>
                      <div style={{fontSize:14,fontWeight:600,color:"#22c55e",marginBottom:4}}>No open concerns</div>
                      <div style={{fontSize:12}}>This partner has no recorded issues or open concerns.</div>
                    </div>
                  )}
                </div>
              )}

              {/* ── Tab: Communication Log ── */}
              {activeTab==="log" && (
                <div className="card">
                  <div className="card-title flex items-center gap-2"><Edit3 size={13}/>Add Entry</div>
                  <textarea className="form-input mb-3" rows={3} value={noteText} onChange={e=>setNoteText(e.target.value)}
                    placeholder={`Log a meeting, training session, email, question or concern for ${sel.name}…`}
                    style={{resize:"vertical",fontFamily:"inherit"}}/>
                  <button className="btn btn-primary mb-4" onClick={saveNote} disabled={!noteText.trim()}><Plus size={13}/>Save Entry</button>
                  <div className="card-title flex items-center gap-2" style={{paddingTop:4}}><Clock size={13}/>Log History</div>
                  {(notes[sel.id]||[]).length===0 && <div style={{color:"#4a6280",fontSize:13,padding:"12px 0",textAlign:"center"}}>No communication log entries yet.</div>}
                  {(notes[sel.id]||[]).map((n,i)=>(
                    <div key={i} className="hist-item">
                      <div className="act-icon" style={{background:"#071020"}}><Edit3 size={13} color="#3b82f6"/></div>
                      <div style={{flex:1}}>
                        <div style={{fontSize:11,color:"#4a6280",marginBottom:3}}>{n.date}</div>
                        <div style={{fontSize:13,color:"#94a3b8",lineHeight:1.6}}>{n.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}


/* ─────────────────────────────────────────────────────────────
   PAGE: CHANGELOG
───────────────────────────────────────────────────────────── */
function ChangelogPage() {
  const [filterProd, setFilterProd] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const changelog = [
    { version:"v3.2.1", product:"Rhoon",   date:"Apr 10, 2025", type:"patch",   changes:["Fixed ADP token refresh on 401","Improved batch error messages","Added /health/adp endpoint"] },
    { version:"v2.8.4", product:"Rabet",   date:"Mar 28, 2025", type:"patch",   changes:["XML parser security patch","Updated certificate bundle","Rate limit header added"] },
    { version:"v1.1.0", product:"Wtheeq",  date:"Apr 20, 2025", type:"minor",   changes:["Bulk company onboarding API (/v2/companies/bulk)","New webhook event: company.approved","Performance improvements in document upload"] },
    { version:"v1.0.3", product:"Mulem",   date:"Apr 05, 2025", type:"patch",   changes:["UAEFTS v2 protocol upgrade","Fixed duplicate transaction bug","Retry logic for failed webhooks"] },
    { version:"v1.2.1", product:"Shary",   date:"Apr 02, 2025", type:"patch",   changes:["JWT expiry edge case fix","Added case status webhook","Documentation updated"] },
    { version:"v0.9.2", product:"Bahri",   date:"Apr 01, 2025", type:"prerel",  changes:["New document upload flow (UAT)","Multi-step validation added","Schema v0.4 deployed"] },
    { version:"v0.4.0", product:"Tajeeri", date:"Mar 20, 2025", type:"prerel",  changes:["Core data model v0.4 finalized","Entity schema approved","Dev sprint initiated"] },
  ];
  const typeColor = {patch:"badge-dev",minor:"badge-new",major:"badge-live",prerel:"badge-limited"};
  const filtered = changelog.filter(c=>
    (filterProd==="All"||c.product===filterProd) &&
    (filterType==="All"||c.type===filterType)
  );
  return (
    <>
      <div className="page-header">
        <div className="page-title">Changelog</div>
        <div className="page-sub">Version history and release notes — filter by product or release type</div>
      </div>
      <div className="content-area">
        {/* Filters */}
        <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap",alignItems:"center"}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["All",...PRODUCTS.map(p=>p.name)].map(p=>{
              const prod = PRODUCTS.find(x=>x.name===p);
              const active = filterProd===p;
              return (
                <button key={p} onClick={()=>setFilterProd(p)}
                  style={{padding:"5px 14px",borderRadius:100,border:'1px solid',fontSize:12,fontWeight:600,cursor:'pointer',transition:'all .15s',
                    background:active?(prod?prod.color:'#3b82f6'):'transparent',
                    color:active?'#fff':(prod?prod.color:'#7a96b0'),
                    borderColor:active?(prod?prod.color:'#3b82f6'):(prod?`${prod.color}40`:'#1a2740')}}>
                  {p}
                </button>
              );
            })}
          </div>
          <div style={{width:1,height:24,background:'#1a2740',margin:"0 4px"}}/>
          <div style={{display:"flex",gap:6}}>
            {["All","patch","minor","major","prerel"].map(t=>(
              <button key={t} onClick={()=>setFilterType(t)}
                style={{padding:"5px 14px",borderRadius:100,border:'1px solid',fontSize:12,fontWeight:600,cursor:'pointer',transition:'all .15s',
                  background:filterType===t?'#1d4ed8':'transparent',color:filterType===t?'#fff':'#7a96b0',
                  borderColor:filterType===t?'#1d4ed8':'#1a2740',textTransform:'capitalize'}}>
                {t==="All"?"All Types":t}
              </button>
            ))}
          </div>
          <span style={{fontSize:12,color:"#4a6280",marginLeft:"auto"}}>{filtered.length} releases</span>
        </div>

        {filtered.length===0 && <div className="card" style={{textAlign:"center",padding:40,color:"#4a6280"}}>No releases match the selected filter.</div>}
        <div style={{maxWidth:760}}>
          {filtered.map((c,i)=>{
            const prod = PRODUCTS.find(p=>p.name===c.product);
            return (
              <div key={i} className="timeline-item">
                <div className="timeline-dot" style={{background:"#0d1829",border:`2px solid ${prod?.color||"#1a2740"}`}}>
                  <div className="dot" style={{background:prod?.color||"#3b82f6"}}/>
                </div>
                <div style={{flex:1,paddingBottom:4}}>
                  <div className="flex gap-3 items-center mb-2" style={{flexWrap:"wrap"}}>
                    <span className="ver-chip">{c.version}</span>
                    <span style={{color:prod?.color||"#3b82f6",fontWeight:700,fontSize:13}}>{c.product}</span>
                    <span className={`badge ${typeColor[c.type]||"badge-dev"}`} style={{textTransform:"capitalize"}}>{c.type}</span>
                    <span style={{color:"#364c63",fontSize:11,marginLeft:"auto"}}>{c.date}</span>
                  </div>
                  <div className="card-sm">
                    {c.changes.map((ch,j)=>(
                      <div key={j} className="flex gap-2 items-start" style={{padding:"5px 0",borderBottom:j<c.changes.length-1?"1px solid #131f32":"none"}}>
                        <ChevronRight size={12} color={prod?.color||"#3b82f6"} style={{marginTop:2,flexShrink:0}}/>
                        <span style={{fontSize:13,color:"#94a3b8"}}>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE: EMAIL TEMPLATES
───────────────────────────────────────────────────────────── */
function EmailTemplatesPage() {
  const [filterProd, setFilterProd]   = useState("All");
  const [filterCat,  setFilterCat]    = useState("All");
  const [search,     setSearch]       = useState("");
  const [selected,   setSelected]     = useState(EMAIL_TEMPLATES[0]);
  const [values,     setValues]       = useState({});
  const [copied,     setCopied]       = useState(false);
  const [previewMode,setPreviewMode]  = useState(false);

  // Collect unique categories
  const allCats = [...new Set(EMAIL_TEMPLATES.map(t=>t.category))].sort();

  const filtered = EMAIL_TEMPLATES.filter(t =>
    (filterProd==="All" || t.product===filterProd) &&
    (filterCat==="All"  || t.category===filterCat) &&
    (!search || t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()))
  );

  // Group filtered templates by product for the sidebar list
  const grouped = PRODUCTS.reduce((acc,p) => {
    const items = filtered.filter(t=>t.product===p.name);
    if(items.length) acc[p.name] = items;
    return acc;
  }, {});

  // Render body: replace {{VAR}} with filled value or styled placeholder
  const renderBody = (text, forCopy=false) => {
    if(!text) return "";
    return text.replace(/\{\{(\w+)\}\}/g, (_, varName) => {
      const val = values[selected?.id+"_"+varName];
      if(forCopy) return val || `[${varName}]`;
      return val
        ? `<span class="tpl-var filled">${val}</span>`
        : `<span class="tpl-var">{{${varName}}}</span>`;
    });
  };

  const renderSubject = (forCopy=false) => {
    if(!selected) return "";
    return selected.subject.replace(/\{\{(\w+)\}\}/g, (_, varName) => {
      const val = values[selected.id+"_"+varName];
      if(forCopy) return val || `[${varName}]`;
      return val ? `<span class="tpl-var filled">${val}</span>`
                 : `<span class="tpl-var">{{${varName}}}</span>`;
    });
  };

  const handleCopy = () => {
    const subj = selected.subject.replace(/\{\{(\w+)\}\}/g, (_,v) => values[selected.id+"_"+v]||`[${v}]`);
    const body = selected.body.replace(/\{\{(\w+)\}\}/g, (_,v) => values[selected.id+"_"+v]||`[${v}]`);
    const text = `Subject: ${subj}\n\n${body}`;
    // Try modern clipboard API, fall back to execCommand
    const doCopy = () => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch(e) {}
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(()=>setCopied(false), 2000);
    };
    if(navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);}).catch(doCopy);
    } else {
      doCopy();
    }
  };

  const setVar = (key, val) => setValues(v=>({...v,[selected.id+"_"+key]:val}));
  const getVar = (key) => values[selected?.id+"_"+key]||"";

  const prod = PRODUCTS.find(p=>p.name===selected?.product);

  // Count filled vars
  const templateVars = selected?.variables || [];
  const filledCount = templateVars.filter(v=>getVar(v)).length;
  const totalVars   = templateVars.length;

  return (
    <>
      <div className="page-header">
        <div className="page-title">Email Templates</div>
        <div className="page-sub">Standardised email templates per product — fill variables and copy in one click</div>
      </div>
      <div className="content-area" style={{padding:"20px 24px"}}>
        {/* Top filters */}
        <div className="flex gap-3 mb-4 items-center" style={{flexWrap:"wrap"}}>
          <div className="search-wrap">
            <Search/>
            <input className="search-input" placeholder="Search templates…" value={search} onChange={e=>setSearch(e.target.value)} style={{width:200}}/>
          </div>
          <select className="select" value={filterProd} onChange={e=>setFilterProd(e.target.value)}>
            <option value="All">All Products</option>
            {PRODUCTS.map(p=><option key={p.id}>{p.name}</option>)}
          </select>
          <div className="flex gap-1" style={{flexWrap:"wrap"}}>
            {["All",...allCats].map(c=>(
              <span key={c} className={`cat-pill${filterCat===c?" active":""}`} onClick={()=>setFilterCat(c)}>{c}</span>
            ))}
          </div>
          <span style={{fontSize:12,color:"#4a6280",marginLeft:"auto"}}>{filtered.length} templates</span>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:20,alignItems:"start"}}>

          {/* ── Left: Template List ── */}
          <div className="card" style={{padding:"12px 0",maxHeight:"80vh",overflowY:"auto"}}>
            {Object.keys(grouped).length===0 && (
              <div style={{padding:"20px 16px",color:"#4a6280",fontSize:13,textAlign:"center"}}>No templates match</div>
            )}
            {Object.entries(grouped).map(([prodName, items])=>{
              const p = PRODUCTS.find(x=>x.name===prodName);
              // sub-group by category
              const byCategory = items.reduce((a,t)=>{(a[t.category]=a[t.category]||[]).push(t);return a},{});
              return (
                <div key={prodName}>
                  <div style={{display:"flex",alignItems:"center",gap:8,padding:"10px 14px 4px",borderBottom:"1px solid #131f32"}}>
                    <span style={{width:8,height:8,borderRadius:"50%",background:p?.color||"#3b82f6",display:"inline-block",flexShrink:0}}/>
                    <span style={{fontWeight:700,fontSize:13,color:"#e2e8f0"}}>{prodName}</span>
                    <span style={{fontSize:11,color:"#3a5a7a",marginLeft:"auto"}}>{items.length}</span>
                  </div>
                  {Object.entries(byCategory).map(([cat,catItems])=>(
                    <div key={cat}>
                      <div className="tpl-cat-label">{cat}</div>
                      {catItems.map(t=>(
                        <div key={t.id}
                          className={`tpl-list-item${selected?.id===t.id?" active":""}`}
                          onClick={()=>{setSelected(t);setPreviewMode(false);}}>
                          <Mail size={13} color={selected?.id===t.id?"#3b82f6":"#3a5a7a"} style={{marginTop:2,flexShrink:0}}/>
                          <span style={{fontSize:12.5,color:selected?.id===t.id?"#c8e8ff":"#94a3b8",lineHeight:1.4}}>{t.title}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* ── Right: Template Viewer ── */}
          {selected ? (
            <div>
              {/* Header */}
              <div className="card mb-4" style={{borderLeft:`3px solid ${prod?.color||"#3b82f6"}`}}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div style={{fontSize:17,fontWeight:700,color:"#f1f5f9",marginBottom:4}}>{selected.title}</div>
                    <div className="flex gap-2 items-center">
                      <span style={{fontSize:12,color:prod?.color||"#3b82f6",fontWeight:700}}>{selected.product}</span>
                      <span className="cat-pill active" style={{fontSize:10}}>{selected.category}</span>
                      <span style={{fontSize:11,color:"#4a6280"}}>{totalVars} variables · {filledCount} filled</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className={`btn btn-ghost`} style={{fontSize:12,padding:"6px 14px"}}
                      onClick={()=>setPreviewMode(m=>!m)}>
                      <Eye size={13}/>{previewMode?"Edit Mode":"Preview"}
                    </button>
                    <button className={`btn${copied?" btn-primary":" btn-ghost"}`} style={{fontSize:12,padding:"6px 14px"}}
                      onClick={handleCopy}>
                      {copied?<><CheckSquare size={13}/>Copied!</>:<><Copy size={13}/>Copy Email</>}
                    </button>
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{marginTop:8}}>
                  <div className="flex justify-between mb-1">
                    <span style={{fontSize:11,color:"#4a6280"}}>Variables filled</span>
                    <span style={{fontSize:11,color: filledCount===totalVars?"#22c55e":"#f59e0b",fontWeight:600}}>{filledCount}/{totalVars}</span>
                  </div>
                  <div className="progress-wrap">
                    <div className="progress-bar" style={{width:`${totalVars?Math.round(filledCount/totalVars*100):0}%`,background:filledCount===totalVars?"#22c55e":"#3b82f6"}}/>
                  </div>
                </div>
              </div>

              {previewMode ? (
                /* ── PREVIEW MODE ── */
                <div className="card">
                  <div className="card-title flex items-center gap-2"><Eye size={13}/>Rendered Preview</div>
                  <div className="tpl-subject-bar">
                    <strong>Subject</strong>
                    <span dangerouslySetInnerHTML={{__html:renderSubject()}}/>
                  </div>
                  <div className="tpl-preview-body" dangerouslySetInnerHTML={{__html:renderBody(selected.body)}}/>
                  <div className="flex gap-2 mt-3">
                    <button className={`btn${copied?" btn-primary":" btn-primary"}`} onClick={handleCopy}>
                      {copied?<><CheckSquare size={13}/>Copied!</>:<><Copy size={13}/>Copy to Clipboard</>}
                    </button>
                    <button className="btn btn-ghost" onClick={()=>setPreviewMode(false)}><Edit3 size={13}/>Back to Edit</button>
                  </div>
                </div>
              ) : (
                /* ── EDIT MODE ── */
                <div style={{display:"grid",gridTemplateColumns:"1fr 300px",gap:16,alignItems:"start"}}>

                  {/* Template body with live highlighting */}
                  <div className="card" style={{padding:0,overflow:"hidden"}}>
                    <div style={{padding:"14px 20px",borderBottom:"1px solid #1a2740",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:12,fontWeight:600,color:"#4a6280",textTransform:"uppercase",letterSpacing:".6px"}}>Template Body</span>
                      <span style={{fontSize:11,color:"#3a5a7a"}}>
                        <span className="tpl-var">{'{{VAR}}'}</span> = unfilled &nbsp;
                        <span className="tpl-var filled">value</span> = filled
                      </span>
                    </div>
                    <div style={{padding:"4px 0 12px"}}>
                      <div className="tpl-subject-bar" style={{margin:"12px 20px 4px"}}>
                        <strong>Subject Line</strong>
                        <span dangerouslySetInnerHTML={{__html:renderSubject()}}/>
                      </div>
                      <div style={{padding:"0 20px"}}>
                        <div className="tpl-preview-body" dangerouslySetInnerHTML={{__html:renderBody(selected.body)}}/>
                      </div>
                    </div>
                  </div>

                  {/* Variable inputs */}
                  <div className="card" style={{maxHeight:"70vh",overflowY:"auto"}}>
                    <div className="card-title flex items-center gap-2"><Hash size={13}/>Fill Variables</div>
                    <div style={{fontSize:11,color:"#3a5a7a",marginBottom:14}}>
                      All <code style={{background:"#0a1525",padding:"1px 5px",borderRadius:3,color:"#4a8fcf"}}>{"{{variables}}"}</code> are highlighted in the template. Fill them in here to generate your email.
                    </div>
                    {templateVars.map(v=>(
                      <div key={v} className="form-group" style={{marginBottom:12}}>
                        <label className="form-label" style={{display:"flex",alignItems:"center",gap:5}}>
                          <span className="tpl-var" style={{fontSize:10}}>{v}</span>
                        </label>
                        <input
                          className="var-input"
                          placeholder={`Enter ${v}…`}
                          value={getVar(v)}
                          onChange={e=>setVar(v,e.target.value)}
                        />
                      </div>
                    ))}
                    <button className="btn btn-primary w-full mt-2" style={{justifyContent:"center"}} onClick={()=>setPreviewMode(true)}>
                      <Eye size={13}/>Preview Rendered Email
                    </button>
                    <button className="btn btn-ghost w-full mt-2" style={{justifyContent:"center"}}
                      onClick={()=>setValues(v=>{
                        const cleared={...v};
                        selected.variables?.forEach(vn=>delete cleared[selected.id+"_"+vn]);
                        return cleared;
                      })}>
                      Clear All
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="card" style={{textAlign:"center",padding:60,color:"#4a6280"}}>
              <Mail size={40} style={{margin:"0 auto 12px",opacity:.3}}/>
              <div>Select a template from the list to preview and edit it</div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   WEEKLY REPORT GENERATOR — UTILITIES & PROCESSING LOGIC
   (Ported faithfully from SlashData HTML report tool)
───────────────────────────────────────────────────────────── */

const _loadedScripts = {};
function loadGenScript(src) {
  return new Promise((resolve, reject) => {
    if (_loadedScripts[src]) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src; s.onload = () => { _loadedScripts[src]=true; resolve(); };
    s.onerror = () => reject(new Error('Failed to load: ' + src));
    document.head.appendChild(s);
  });
}
const loadGenLibs = () => Promise.all([
  loadGenScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'),
  loadGenScript('https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js'),
  loadGenScript('https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0/dist/chartjs-plugin-datalabels.min.js'),
]);

function genFmtRange(s,e){
  const M=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const ord=n=>{const v=n%100;return n+(['th','st','nd','rd'][(v-20)%10]||['th','st','nd','rd'][v]||'th');};
  const sd=new Date(s),ed=new Date(e);
  return `${ord(sd.getDate())} ${M[sd.getMonth()]} &ndash; ${ord(ed.getDate())} ${M[ed.getMonth()]}`;
}
function genFmtSize(b){return b<1048576?(b/1024).toFixed(1)+' KB':(b/1048576).toFixed(1)+' MB';}
function genSleep(ms){return new Promise(r=>setTimeout(r,ms));}


function genOpenInTab(html) {
  try {
    const blob = new Blob([html], {type: 'text/html; charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const w = window.open(url, '_blank');
    if(w) { setTimeout(() => URL.revokeObjectURL(url), 60000); return true; }
    // popup blocked: try anchor click
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    return true;
  } catch(e) {
    return false;
  }
}

function genReadXL(file){
  return new Promise((res,rej)=>{
    const r=new FileReader();
    r.onload=e=>{try{res(window.XLSX.read(e.target.result,{type:'array',cellDates:true}));}catch(ex){rej(new Error('Cannot read file: '+ex.message));}};
    r.onerror=()=>rej(new Error('File read failed'));
    r.readAsArrayBuffer(file);
  });
}
const genToJSON=(sheet,defval='')=>sheet?window.XLSX.utils.sheet_to_json(sheet,{defval,raw:false}):[];

function genDownloadEML(html,from,recipient,subject,filename){
  const bytes=new TextEncoder().encode(html);
  let bin='';bytes.forEach(b=>bin+=String.fromCharCode(b));
  const b64=btoa(bin);
  const eml=`MIME-Version: 1.0\r\nDate: ${new Date().toUTCString()}\r\nFrom: ${from}\r\nTo: ${recipient}\r\nSubject: ${subject}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n${b64}`;
  const blob=new Blob([eml],{type:'message/rfc822'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=filename;
  document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(url);a.remove();},1000);
}

// ── Rhoon processors ──
function rhProcessWB(wb){
  const exact=key=>wb.Sheets[wb.SheetNames.find(n=>n===key)];
  const stagingSheet=exact('Rhoon_Staging');
  return{integration:rhProcessIntegration(stagingSheet),stats:rhProcessStats(exact('TotalRequestStats')),reqStats:rhProcessReqStats(exact('RequestStatsPerCompany')),errors:rhProcessErrors(exact('ErrorsConsolidatedByCompany')),ent23k:rhProcessEnt23k(exact('Entities23kVehVal')),staging:stagingSheet?genToJSON(stagingSheet):[]};
}
function rhProcessIntegration(sheet){
  if(!sheet)return[];
  const rm=new Set(['Arabic Name','Portal Credentials','API username Testing & Prod','API password Testing','API password Prod','UAT API shared?','UAT Portal Shared?','IPs','Auto Finance']);
  const seen=new Set();
  return genToJSON(sheet).filter(row=>{const n=(row['English Name']||'').trim();if(!n||seen.has(n))return false;seen.add(n);return true;}).map(row=>{
    const r={};Object.entries(row).forEach(([k,v])=>{if(!rm.has(k))r[k]=v;});
    if('Integration type' in r){r.IntegrationType=r['Integration type'];delete r['Integration type'];}
    if('Live status' in r){r.LiveStatus=r['Live status'];delete r['Live status'];}
    if('Entity Type' in r){r.EntityType=r['Entity Type'];delete r['Entity Type'];}
    const et=(r.EntityType||'').trim(),ls=(r.LiveStatus||'').trim().toLowerCase(),it=(r.IntegrationType||'').trim();
    r.IntegrationStatus=!et?null:ls.includes('live')?'Live':it?'UAT':'Pending';
    return r;
  }).filter(r=>r.EntityType&&r.IntegrationStatus);
}
function rhGetStatusBreakdown(data){
  const m={};
  data.forEach(r=>{const et=r.EntityType||'Unknown';if(!m[et])m[et]={Live:0,UAT:0,Pending:0};m[et][r.IntegrationStatus]=(m[et][r.IntegrationStatus]||0)+1;});
  let rows=Object.entries(m).map(([et,c])=>({entityType:et,Live:c.Live||0,UAT:c.UAT||0,Pending:c.Pending||0,Total:(c.Live||0)+(c.UAT||0)+(c.Pending||0)}));
  rows.sort((a,b)=>b.Live-a.Live);
  const t=rows.reduce((a,r)=>({Live:a.Live+r.Live,UAT:a.UAT+r.UAT,Pending:a.Pending+r.Pending,Total:a.Total+r.Total}),{Live:0,UAT:0,Pending:0,Total:0});
  rows.push({entityType:'Total',...t,isTotal:true});return rows;
}
function rhGetTypeBreakdown(data){
  const m={};
  data.forEach(r=>{const et=r.EntityType||'Unknown';if(/pending.?adp/i.test(et))return;if(!m[et])m[et]={p:0,b:0};const it=(r.IntegrationType||'').toLowerCase();if(it.includes('api')||it.includes('both'))m[et].b++;else m[et].p++;});
  let rows=Object.entries(m).map(([et,c])=>({entityType:et,portalOnly:c.p,both:c.b,Total:c.p+c.b}));
  rows.sort((a,b)=>b.portalOnly-a.portalOnly);
  const t=rows.reduce((a,r)=>({portalOnly:a.portalOnly+r.portalOnly,both:a.both+r.both,Total:a.Total+r.Total}),{portalOnly:0,both:0,Total:0});
  rows.push({entityType:'Total',...t,isTotal:true});return rows;
}
function rhProcessStats(sheet){
  if(!sheet)return null;
  const EXCLUDE=['SuccessCount','FailureCount','FailureRatio','successcount','failurecount','failureratio'];
  const DISPLAY={NewMortgage:'New Mortgage',GetMortgageTransactions:'Get Mortgage Transactions',ReleaseMortgage:'Release Mortgage',CancelMortgage:'Cancel Mortgage',TransferVehicleEmirate:'Transfer Vehicle Emirate',TransferOwnership:'Transfer Ownership',TourCertificate:'Tour Certificate',TransferDifferentCompany:'Transfer Different Company',ResetBankPassword:'Reset Bank Password'};
  const toDisplay=key=>{const ex=Object.entries(DISPLAY).find(([k])=>k.toLowerCase()===key.toLowerCase());if(ex)return ex[1];return key.replace(/([A-Z])/g,' $1').replace(/^[\s]+/,'').trim().replace(/\b\w/g,c=>c.toUpperCase());};
  const data=genToJSON(sheet,0);if(!data.length)return null;
  const first=data[0];const keys=Object.keys(first).filter(k=>k&&!/^__/.test(k)).filter(k=>!EXCLUDE.some(e=>e.toLowerCase()===k.toLowerCase()));
  const toNum=v=>parseInt(String(v||'').replace(/,/g,'').trim())||0;const isNumStr=v=>!isNaN(parseFloat(String(v||'').replace(/,/g,'')));const isYearLike=k=>/^\d{4}$/.test(String(k).trim());
  const allKeysAreStrings=keys.every(k=>!isNumStr(k)&&!isYearLike(k));
  if(allKeysAreStrings&&keys.length>=2){const dataRow=data.find(r=>keys.some(k=>toNum(r[k])>0))||data[0];const result=keys.map(k=>({name:toDisplay(k),value:toNum(dataRow[k])})).filter(r=>r.name.trim());if(result.length>=2)return result.sort((a,b)=>b.value-a.value);}
  const nameKey=keys[0],valKey=keys.slice(1).find(k=>data.some(r=>toNum(r[k])>0))||keys[1];
  const result2=[];data.forEach(r=>{const raw=String(r[nameKey]||'').trim(),val=toNum(r[valKey]);if(!raw||isNumStr(raw)||isYearLike(raw))return;result2.push({name:toDisplay(raw),value:val});});
  if(result2.length>=2)return result2.sort((a,b)=>b.value-a.value).slice(0,9);
  return null;
}
function rhProcessReqStats(sheet){
  if(!sheet)return[];
  return genToJSON(sheet).map(row=>{
    const keys=Object.keys(row);const nk=keys.find(k=>/company|entity|name/i.test(k))||keys[0];const sk=keys.find(k=>/success/i.test(k)),fk=keys.find(k=>/fail/i.test(k));const prk=keys.find(k=>/portal.*ratio|portalrequest/i.test(k));
    const sc=parseInt(row[sk]||0)||0,fc=parseInt(row[fk]||0)||0,pr=parseFloat(row[prk]||0)||0;
    let ch='Both';if(pr>=100)ch='Portal';else if(pr<=0)ch='API';
    return{entityName:row[nk]||'',successCount:sc,failureCount:fc,total:sc+fc,portalRatio:pr,apiRatio:(100-pr),channel:ch};
  }).filter(r=>r.entityName);
}
function rhProcessErrors(sheet){
  if(!sheet)return{actionRequired:[],noAction:[]};
  const rows=genToJSON(sheet).map(row=>({
    company:String(row.MortgageCompany||row.Company||row.Entity||'').trim(),
    errorCount:(()=>{const v=row.ErrorCount||row.Count||0;const p=parseFloat(String(v).replace(/,/g,'').trim());return isNaN(p)?0:p;})(),
    sdCode:String(row.SDErrorCode||'').trim(),sdDesc:String(row.SDErrorDesc||'').trim(),
    mtrCode:String(row.MTRErrorCode||'').trim(),mtrDesc:String(row.MTRErrorDesc||'').trim(),
    adpCode:String(row.ADPErrorCode||'').trim(),adpDesc:String(row.ADPErrorDesc||row.ADPDesc||'').trim()
  })).filter(r=>r.company);
  const normText=v=>String(v==null?'':v).replace(/\r/g,' ').replace(/\n/g,' ').replace(/\s+/g,' ').trim();
  const normCode=v=>normText(v).toUpperCase().replace(/^SD/i,'').replace(/^0+/,'');
  const ceq=(a,b)=>normCode(a)===normCode(b);
  const ceqLoose=(a,b)=>{const an=normText(a).toUpperCase(),bn=normText(b).toUpperCase();return an===bn||normCode(an)===normCode(bn);};
  const contains=(text,sub)=>{const t=normText(text).toLowerCase(),s=normText(sub).toLowerCase();return!!t&&!!s&&t.includes(s);};
  const containsAny=(text,subs)=>subs.some(s=>contains(text,s));
  rows.forEach(r=>{r.mergedText=[r.sdCode,r.sdDesc,r.mtrCode,r.mtrDesc,r.adpCode,r.adpDesc].map(normText).join(' | ');});
  const isSD67or500=r=>{const sd=normCode(r.sdCode),mtr=normCode(r.mtrCode);return sd==='67'||mtr==='67'||ceqLoose(r.adpCode,'1')||ceqLoose(r.adpCode,'500');};
  const isDbDisc=r=>{const d=normText(r.adpDesc).toLowerCase();return(d.includes('database')&&d.includes('disconnected'))||r.mergedText.toLowerCase().includes('database currently disconnected');};
  const naRules=[
    {d:'Duplicate Request',m:r=>ceq(r.sdCode,'32')||contains(r.mergedText,'duplicate request')},
    {d:'Re-submitting an already existing transaction.',m:r=>ceq(r.sdCode,'1103')||ceq(r.mtrCode,'1103')||ceqLoose(r.adpCode,'1103')},
    {d:'Trying to release a non mortgaged vehicle.',m:r=>ceq(r.sdCode,'1079')||ceq(r.mtrCode,'1079')||contains(r.mergedText,'the vehicle is not mortgaged')},
    {d:'Invalid traffic number.',m:r=>ceq(r.sdCode,'129')||ceq(r.mtrCode,'129')||contains(r.mergedText,'entered traffic number is not valid')},
    {d:"The current application can't be cancelled.",m:r=>ceq(r.sdCode,'444')||ceq(r.mtrCode,'444')||ceqLoose(r.adpCode,'444')},
    {d:'Trying to mortgage an already mortgaged vehicle.',m:r=>ceq(r.sdCode,'1078')||ceq(r.mtrCode,'1078')||contains(r.mergedText,'the vehicle is already mortgaged')},
    {d:'Trying to release a vehicle not mortgaged to the entered traffic number.',m:r=>ceq(r.sdCode,'1084')||ceq(r.mtrCode,'1084')},
    {d:'Trying to cancel a non-existent transaction.',m:r=>ceq(r.mtrCode,'440')||ceqLoose(r.adpCode,'440')||contains(r.mergedText,'no transaction found under this number')},
    {d:'Transaction belongs to a different company.',m:r=>ceq(r.mtrCode,'1104')||ceqLoose(r.adpCode,'1104')},
    {d:'Chassis belongs to a different company.',m:r=>ceq(r.sdCode,'75')||ceq(r.mtrCode,'75')},
    {d:'Database disconnected error',m:r=>isSD67or500(r)&&isDbDisc(r)},
    {d:'Internal server error',m:r=>isSD67or500(r)&&!isDbDisc(r)},
    {d:'Repush / Temporary system issue',m:r=>containsAny(r.mergedText,['due to a temporary system issue','adp failed transactions dashboard','click the repush button'])},
  ];
  const arRules=[
    {d:'Invalid value entered for vehicle value',m:r=>ceq(r.sdCode,'116')||ceq(r.mtrCode,'116')},
    {d:'Invalid Unified number',m:r=>ceq(r.sdCode,'112')||ceq(r.mtrCode,'112')},
    {d:'Chassis number is not registered in RTA',m:r=>ceq(r.sdCode,'1065')||ceq(r.mtrCode,'1065')||contains(r.mergedText,'chassis number is not registered')},
    {d:'Invalid chassis number',m:r=>ceq(r.sdCode,'1063')||ceq(r.mtrCode,'1063')||contains(r.mergedText,'invalid chassis number')},
    {d:'Unauthorized — invalid credentials or IP',m:r=>containsAny(r.mergedText,['unauthorized','invalid api key','ip not whitelisted'])},
  ];
  const naRows=[],arRows=[];
  rows.forEach(r=>{const na=naRules.find(rule=>rule.m(r));if(na){naRows.push({...r,description:na.d});return;}const ar=arRules.find(rule=>rule.m(r));arRows.push({...r,description:ar?ar.d:r.sdDesc||r.adpDesc||r.mtrDesc||'Unknown error'});});
  const grp=arr=>{
    const m={};arr.forEach(r=>{const d=r.description;if(!m[d])m[d]={desc:d,total:0,cos:{}};m[d].total+=r.errorCount;m[d].cos[r.company]=(m[d].cos[r.company]||0)+r.errorCount;});
    const out=[];Object.values(m).sort((a,b)=>b.total-a.total).forEach(g=>{const ent=Object.entries(g.cos).sort((a,b)=>b[1]-a[1]);ent.forEach(([co,cnt],i)=>out.push({description:g.desc,isFirst:i===0,rowSpan:ent.length,totalCount:i===0?g.total:null,entity:co,subCount:cnt,entitiesCount:ent.length}));});
    return out;
  };
  return{noAction:grp(naRows),actionRequired:grp(arRows)};
}
function rhProcessEnt23k(sheet){
  if(!sheet)return[];
  const data=genToJSON(sheet).filter(r=>{const t=String(r.TransactionType||r['Transaction Type']||'').toLowerCase(),v=parseFloat(r['Vehicle Value']||r.VehicleValue||0)||0;return t.includes('new mortgage')&&v<23000;});
  const m={};data.forEach(r=>{const ek=Object.keys(r).find(k=>/entity|company|bank|name/i.test(k))||Object.keys(r)[0];const en=r[ek]||'Unknown',v=parseFloat(r['Vehicle Value']||r.VehicleValue||0)||0;const k=en+'|'+v;if(!m[k])m[k]={entity:en,vehicleValue:v,count:0};m[k].count++;});
  return Object.values(m).sort((a,b)=>a.vehicleValue-b.vehicleValue);
}
function rhGetBothAnalysis(rs,staging){
  if(!rs||!staging)return[];
  const bothNames=new Set(staging.filter(r=>{const it=(r.IntegrationType||r['Integration type']||'').toLowerCase();return it==='both'||(it.includes('api')&&it.includes('portal'));}).map(r=>(r['English Name']||'').toLowerCase().trim()).filter(Boolean));
  if(!bothNames.size)return rs.filter(r=>r.channel!=='Both').map(r=>({entityName:r.entityName,mainUsage:r.channel})).sort((a,b)=>a.mainUsage==='API'?-1:1);
  return rs.filter(r=>bothNames.has(r.entityName.toLowerCase().trim())&&r.channel!=='Both').map(r=>({entityName:r.entityName,mainUsage:r.channel})).sort((a,b)=>a.mainUsage==='API'?-1:1);
}

async function genRenderChartPNG(config,w=1100,h=480){
  const DPR=2,c=document.createElement('canvas');
  c.width=w*DPR;c.height=h*DPR;c.style.cssText=`width:${w}px;height:${h}px;position:fixed;left:-99999px;top:0;visibility:hidden`;
  document.body.appendChild(c);
  const ctx=c.getContext('2d');ctx.scale(DPR,DPR);ctx.fillStyle='#ffffff';ctx.fillRect(0,0,w,h);
  const useDL=config._useDatalabels||false;
  if(useDL&&window.ChartDataLabels)window.Chart.register(window.ChartDataLabels);
  const chart=new window.Chart(ctx,{...config,options:{...config.options,animation:false,responsive:false,devicePixelRatio:1}});
  await genSleep(400);
  const png=c.toDataURL('image/png',1.0);
  chart.destroy();if(useDL&&window.ChartDataLabels)window.Chart.unregister(window.ChartDataLabels);
  document.body.removeChild(c);return png;
}

async function rhBuildChartPNGs(d){
  const charts={};
  const _bp={id:'chartBorder',afterDraw(ch){const{ctx,chartArea:ca}=ch;if(!ca)return;ctx.save();ctx.strokeStyle='#000000';ctx.lineWidth=2;ctx.strokeRect(ca.left,ca.top,ca.right-ca.left,ca.bottom-ca.top);ctx.restore();}};
  if(d.integration&&d.integration.length){
    const sd=rhGetStatusBreakdown(d.integration),cr=sd.filter(r=>!r.isTotal&&!/pending.?adp/i.test(r.entityType));
    const yMaxS=Math.ceil(Math.max(...cr.flatMap(r=>[r.Live,r.UAT,r.Pending]),0)/5)*5||10;
    charts.status=await genRenderChartPNG({type:'bar',plugins:[_bp],data:{labels:cr.map(r=>r.entityType),datasets:[{label:'Live',data:cr.map(r=>r.Live),backgroundColor:'#5B7F33',borderRadius:4,borderSkipped:false,barPercentage:.5,categoryPercentage:.5},{label:'UAT',data:cr.map(r=>r.UAT),backgroundColor:'#C55A11',borderRadius:4,borderSkipped:false,barPercentage:.5,categoryPercentage:.5},{label:'Pending (UAT Not Shared)',data:cr.map(r=>r.Pending),backgroundColor:'#3A75A8',borderRadius:4,borderSkipped:false,barPercentage:.5,categoryPercentage:.5}]},options:{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:48,family:'Arial'},color:'#404040',padding:28,boxWidth:28,boxHeight:18}},tooltip:{enabled:false}},scales:{x:{grid:{display:false},border:{display:false},ticks:{font:{size:36,family:'Arial'},color:'#595959',maxRotation:0}},y:{min:0,max:yMaxS,beginAtZero:true,ticks:{stepSize:5,font:{size:36,family:'Arial'},color:'#595959',callback:v=>Number.isInteger(v/5)?v:''},grid:{color:'#B0B0B0',lineWidth:1},border:{display:false}}},layout:{padding:{top:20,left:10,right:20,bottom:10}},backgroundColor:'#ffffff'}},2000,844);
    const td=rhGetTypeBreakdown(d.integration),tr2=td.filter(r=>!r.isTotal);
    const yMaxT=Math.ceil(Math.max(...tr2.flatMap(r=>[r.portalOnly,r.both]),0)/5)*5||10;
    charts.type=await genRenderChartPNG({type:'bar',plugins:[_bp],data:{labels:tr2.map(r=>r.entityType),datasets:[{label:'Portal only',data:tr2.map(r=>r.portalOnly),backgroundColor:'#2E75B6',borderRadius:4,borderSkipped:false,barPercentage:.5,categoryPercentage:.5},{label:'Both (Api & Portal)',data:tr2.map(r=>r.both),backgroundColor:'#538135',borderRadius:4,borderSkipped:false,barPercentage:.5,categoryPercentage:.5}]},options:{plugins:{legend:{display:true,position:'bottom',labels:{font:{size:48,family:'Arial'},color:'#404040',padding:28,boxWidth:28,boxHeight:18}},tooltip:{enabled:false}},scales:{x:{grid:{display:false},border:{display:false},ticks:{font:{size:36,family:'Arial'},color:'#595959',maxRotation:0}},y:{min:0,max:yMaxT,beginAtZero:true,ticks:{stepSize:5,font:{size:36,family:'Arial'},color:'#595959',callback:v=>Number.isInteger(v/5)?v:''},grid:{color:'#B0B0B0',lineWidth:1},border:{display:false}}},layout:{padding:{top:20,left:10,right:20,bottom:10}},backgroundColor:'#ffffff'}},2000,844);
  }
  if(d.stats&&d.stats.length){
    const maxStat=Math.max(...d.stats.map(r=>r.value),0),yMaxStat=Math.ceil(maxStat/500)*500||500;
    charts.stats=await genRenderChartPNG({_useDatalabels:true,type:'bar',plugins:[_bp],data:{labels:d.stats.map(r=>r.name),datasets:[{label:'Transactions',data:d.stats.map(r=>r.value),backgroundColor:'#1F5C7A',borderRadius:0,borderSkipped:false,barPercentage:.5,categoryPercentage:.5}]},options:{plugins:{legend:{display:false},tooltip:{enabled:false},datalabels:{display:true,anchor:'end',align:'top',color:'#333333',font:{size:48,family:'Arial',weight:'bold'},formatter:v=>v>0?v.toLocaleString():'0'}},scales:{x:{grid:{display:false},border:{display:false},ticks:{font:{size:52,family:'Arial'},color:'#595959',maxRotation:0,autoSkip:false}},y:{min:0,max:yMaxStat,beginAtZero:true,ticks:{stepSize:500,font:{size:52,family:'Arial'},color:'#595959',callback:v=>Number.isInteger(v/500)?v.toLocaleString():''},grid:{color:'#B0B0B0',lineWidth:1},border:{display:false}}},layout:{padding:{top:70,left:10,right:20,bottom:10}},backgroundColor:'#ffffff'}},3200,920);
  }
  return charts;
}

function rhChartImg(png){if(!png)return'';return`<div style="margin:16px 0"><img src="${png}" alt="" style="width:1000px;height:422px;display:block;border:1px solid #000000"></div>`;}

// ── Null-safe formatters for email builders ──
const _n = v => (Number(v)||0).toLocaleString();
const _pct = v => (Number(v)||0).toFixed(2);

async function rhBuildEmail(d,recipient,dr){
  const charts=await rhBuildChartPNGs(d);
  const F='font-family:arial,sans-serif;font-size:12pt;',C='color:rgb(0,112,192);',C2='color:rgb(12,100,192);';
  const AP='font-family:Aptos,Aptos_EmbeddedFont,Aptos_MSFontService,Calibri,Helvetica,sans-serif;';
  const TA=`cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border-width:medium;border-style:none;border-color:currentcolor"`;
  const TH=`style="${F}border:1px solid rgb(0,0,0);overflow:hidden;padding:2px 3px;vertical-align:bottom;background-color:rgb(221,235,247);font-weight:bold;${C}"`;
  const THC=`style="${F}border:1px solid;overflow:hidden;padding:2px 3px;vertical-align:bottom;background-color:rgb(221,235,247);font-weight:bold;${C}text-align:center"`;
  const THE=`style="${F}border:1px solid rgb(0,0,0);overflow:hidden;padding:2px 3px;vertical-align:bottom;background-color:rgb(197,217,241);font-weight:bold;${C2}"`;
  const THEC=`style="${F}border:1px solid;overflow:hidden;padding:2px 3px;vertical-align:bottom;background-color:rgb(197,217,241);font-weight:bold;${C2}text-align:center"`;
  const TD=()=>`style="${F}border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0);overflow:hidden;padding:2px 3px;vertical-align:bottom;${C}"`;
  const TDC=()=>`style="${F}border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0) rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:bottom;${C}text-align:center"`;
  const TDE=()=>`style="${F}border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0);overflow:hidden;padding:2px 3px;vertical-align:middle;${C2}"`;
  const TDEC=()=>`style="${F}border-width:1px;border-style:solid;border-color:rgb(204,204,204) rgb(0,0,0) rgb(0,0,0) rgb(204,204,204);overflow:hidden;padding:2px 3px;vertical-align:middle;${C2}text-align:center"`;
  const TDT=()=>`style="${F}border-top:none;${C}font-weight:700;border-right:0.5pt solid windowtext;border-bottom:0.5pt solid windowtext;border-left:0.5pt solid windowtext;overflow:hidden;padding:2px 3px;vertical-align:bottom;"`;
  const TDTC=()=>`style="${F}border-top:none;border-left:none;${C}font-weight:700;text-align:center;vertical-align:middle;border-right:0.5pt solid windowtext;border-bottom:0.5pt solid windowtext;overflow:hidden;padding:2px 3px;"`;
  const TR=`style="height:21px"`;
  const TBOX=(txt,w=700)=>`<table style="direction:ltr;width:${w}px;border-collapse:collapse"><tbody><tr><td style="font-size:13px;border:1pt solid;background-color:rgb(218,233,248);padding:5.4pt;vertical-align:bottom;height:31pt"><div style="${AP}direction:ltr;text-align:center;font-size:12pt;${C2}"><b>${txt}</b></div></td></tr></tbody></table>`;
  const sd=d.integration?rhGetStatusBreakdown(d.integration):[],td2=d.integration?rhGetTypeBreakdown(d.integration):[];
  const tot=sd.find(r=>r.isTotal)||{Live:0,UAT:0};
  const rs=d.reqStats||[];
  const mortTable=rs.filter(r=>r.entityName.toLowerCase().trim()!=='total').slice().sort((a,b)=>b.apiRatio-a.apiRatio);
  const failTable=rs.filter(r=>r.failureCount>0&&r.entityName.toLowerCase().trim()!=='total').sort((a,b)=>b.total-a.total);
  const succTable=rs.filter(r=>r.failureCount===0&&r.entityName.toLowerCase().trim()!=='total').sort((a,b)=>b.total-a.total);
  const bothA=rhGetBothAnalysis(d.reqStats,d.staging);
  const errs=d.errors||{actionRequired:[],noAction:[]};
  const ent23=d.ent23k||[];
  const s1t=`<table ${TA} style="width:1000px"><colgroup><col width="300"><col width="150"><col width="150"><col width="250"><col width="150"></colgroup><tbody><tr ${TR}><td ${TH}>Entity Type</td><td ${THC}>Live</td><td ${THC}>UAT</td><td ${THC}>Pending (UAT Not Shared)</td><td ${THC}>Total</td></tr>${sd.map(r=>`<tr ${TR}><td ${r.isTotal?TDT():TD()}>${r.entityType}</td><td ${r.isTotal?TDTC():TDC()}>${r.Live}</td><td ${r.isTotal?TDTC():TDC()}>${r.UAT}</td><td ${r.isTotal?TDTC():TDC()}>${r.Pending}</td><td ${r.isTotal?TDTC():TDC()}>${r.Total}</td></tr>`).join('')}</tbody></table>`;
  const s2t=`<table ${TA}><colgroup><col width="196"><col width="148"><col width="185"><col width="90"></colgroup><tbody><tr ${TR}><td ${TH}>Entity Type</td><td ${THC}>Portal only</td><td ${THC}>Both (Api &amp; Portal)</td><td ${THC}>Total</td></tr>${td2.map(r=>`<tr ${TR}><td ${r.isTotal?TDT():TD()}>${r.entityType}</td><td ${r.isTotal?TDTC():TDC()}>${r.portalOnly}</td><td ${r.isTotal?TDTC():TDC()}>${r.both}</td><td ${r.isTotal?TDTC():TDC()}>${r.Total}</td></tr>`).join('')}</tbody></table>`;
  const s3stats=d.stats&&d.stats.length?`<table cellspacing="0" cellpadding="0" border="1" style="table-layout:auto;${F}border-collapse:collapse;border:1px solid #000;margin-bottom:6px;min-width:1000px"><tbody><tr>${d.stats.map(s=>`<td style="${F}border:1px solid rgb(0,0,0);padding:4px 10px;background-color:rgb(221,235,247);font-weight:bold;${C}text-align:center;white-space:nowrap">${s.name}</td>`).join('')}</tr><tr>${d.stats.map(s=>`<td style="${F}border:1px solid;padding:2px 10px;${C}text-align:center;white-space:nowrap">${_n(s.value)}</td>`).join('')}</tr></tbody></table>`:`<p style="${C}${F}font-style:italic">No data in TotalRequestStats.</p>`;
  const s3mort=mortTable.length?`<table ${TA}><colgroup><col width="379"><col width="107"><col width="117"><col width="137"></colgroup><tbody><tr ${TR}><td ${TH}>&nbsp;Entity Name&nbsp;</td><td ${THC}>API Ratio</td><td ${THC}>Portal Ratio</td><td ${THC}>Total</td></tr>${mortTable.map(r=>`<tr ${TR}><td ${TD()}>&nbsp;${r.entityName}</td><td ${TDC()}>${_pct(r.apiRatio)}%</td><td ${TDC()}>${_pct(r.portalRatio)}%</td><td ${TDC()}>${_n(r.total)}</td></tr>`).join('')}</tbody></table>`:`<p style="${C}${F}">No data available.</p>`;
  const s3both=bothA.length?`<table ${TA}><colgroup><col width="396"><col width="204"></colgroup><tbody><tr ${TR}><td ${TH}>Entity Name</td><td ${THC}>Main Usage (API/Portal)</td></tr>${bothA.map(r=>`<tr ${TR}><td ${TD()}>${r.entityName}</td><td ${TDC()}>${r.mainUsage}</td></tr>`).join('')}</tbody></table>`:`<p style="${C}${F}">No entities found using only one channel.</p>`;
  const s3fail=failTable.length?`<table ${TA}><colgroup><col width="363"><col width="137"><col width="185"><col width="162"><col width="155"></colgroup><tbody><tr ${TR}><td ${TH}>&nbsp;Entity Name&nbsp;</td><td ${THC}>Total</td><td ${THC}>Success Count</td><td ${THC}>Failure Count</td><td ${THC}>Channel</td></tr>${failTable.map(r=>`<tr ${TR}><td ${TD()}>&nbsp;${r.entityName}</td><td ${TDC()}>${_n(r.total)}</td><td ${TDC()}>${_n(r.successCount)}</td><td ${TDC()}>${_n(r.failureCount)}</td><td ${TDC()}>${r.channel}</td></tr>`).join('')}</tbody></table>`:`<p style="${C}${F}">No failures recorded.</p>`;
  const s3succ=succTable.length?`<table ${TA}><colgroup><col width="493"><col width="137"><col width="156"></colgroup><tbody><tr ${TR}><td ${TH}>&nbsp;Entity Name&nbsp;</td><td ${THC}>Total</td><td ${THC}>Channel</td></tr>${succTable.map(r=>`<tr ${TR}><td ${TD()}>&nbsp;${r.entityName}</td><td ${TDC()}>${_n(r.total)}</td><td ${TDC()}>${r.channel}</td></tr>`).join('')}</tbody></table>`:`<p style="${C}${F}">No data.</p>`;
  const s4ar=errs.actionRequired.length?`<table ${TA}><colgroup><col width="311"><col width="150"><col width="261"><col width="117"></colgroup><tbody><tr ${TR}><td ${THE}>Error Description</td><td ${THEC}>Sub Count</td><td ${THE}>Entities</td><td ${THEC}>Total Count</td></tr>${errs.actionRequired.map(r=>`<tr ${TR}>${r.isFirst?`<td ${TDE()} rowspan="${r.rowSpan}">${r.description}</td>`:''}<td ${TDEC()}>${_n(r.subCount)}</td><td ${TDE()}>${r.entity}</td>${r.isFirst?`<td ${TDEC()} rowspan="${r.rowSpan}">${_n(r.totalCount)}</td>`:''}</tr>`).join('')}</tbody></table>`:`<p style="${C2}${F}">No action-required errors found.</p>`;
  const s4na=errs.noAction.length?`<table ${TA}><colgroup><col width="598"><col width="264"><col width="170"></colgroup><tbody><tr ${TR}><td ${THE}>Error Description</td><td ${THEC}>Total Count</td><td ${THEC}>Entities Count</td></tr>${errs.noAction.map(r=>`<tr ${TR}><td ${TDE()}>${r.description}</td><td ${TDEC()}>${_n(r.totalCount)}</td><td ${TDEC()}>${r.entitiesCount}</td></tr>`).join('')}</tbody></table>`:`<p style="${C2}${F}">No errors in this category.</p>`;
  const s5t=ent23.length?`<table ${TA}><colgroup><col width="400"><col width="200"><col width="130"></colgroup><tbody><tr ${TR}><td ${TH}>&nbsp;Entity</td><td ${THC}>Vehicle Value (AED)</td><td ${THC}>Repeated Count</td></tr>${ent23.map(r=>`<tr ${TR}><td ${TD()}>&nbsp;${r.entity}</td><td ${TDC()}>${_n(r.vehicleValue)}</td><td ${TDC()}>${r.count}</td></tr>`).join('')}</tbody></table>`:`<p style="${C}${F}">No transactions below 23,000 AED found.</p>`;
  return`<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><div dir="ltr"><div style="${F}${C}"><div>
<div style="${AP}${C2}direction:ltr;margin:0px"><span style="font-size:12pt">Greetings ${recipient},</span></div>
<div style="${AP}${C2}direction:ltr;margin:0px;font-size:12pt"><br></div>
<div style="${AP}${C2}direction:ltr;margin:0px;font-size:12pt">Hope this email finds you well.</div><div style="${AP}${C2}direction:ltr;margin:0px;font-size:12pt"><br></div>
<div style="${AP}${C2}direction:ltr;margin:0px;font-size:12pt">Kindly find below the weekly integration report for Rhoon.</div>
<b style="${C2}${AP}font-size:16pt"><br>Weekly API Integration Report For Rhoon<br></b>
<div style="${AP}direction:ltr;margin:1em 0px;font-size:12pt;${C2}"><b><u>Summary:&nbsp;</u></b></div>
${TBOX('Integration Status Breakdown',1000)}<br>
<div><span style="${C}${AP}font-size:16px">A total of</span><b style="${C2}${AP}font-size:16px">&nbsp;${tot.Live+tot.UAT}&nbsp;</b><span style="${C2}${AP}font-size:16px">financial entities are integrated with Rhoon services Live &amp; UAT environments.<br><br></span></div>
${s1t}${rhChartImg(charts.status)}<div style="${C2}font-size:12pt"><br><b><u>Integration Type:</u></b><br><span style="font-size:12pt">Here we have a breakdown of integration type by entity type.<br></span></div><br>
${s2t}${rhChartImg(charts.type)}<br>
${TBOX(`Rhoon Service Statistics<br><div style="${AP}direction:ltr;text-align:center;margin:1em 0px;font-size:12pt;${C2}"><p>(${dr})</p></div>`,1000)}<br>
${s3stats}${rhChartImg(charts.stats)}<br>
<b style="${C2}font-size:16px;${AP}"><u>Mortgage Transactions (API vs Portal):<br><br></u></b>${s3mort}
<b style="${C2}font-size:12pt;${AP}"><br>Below is the breakdown of live entities that are supposed to use both channels but are only utilizing one:<br><br></b>${s3both}<br>
<b style="${C2}font-size:16px"><u>Failure report for Banks / Companies Utilizing Rhoon Services (ADP Services):<br><br></u></b>${s3fail}<br>
<span style="${C2}font-size:16px"><u><b>Entities with 100% success rate:<br><br></b></u></span>${s3succ}<br>
<b style="${C2}font-size:16px"><u>Failure Reasons Summary (SlashData Services):<br>1. Requires action from the Integration Team:<br><br></u></b>${s4ar}
<u style="${C2}font-size:16px;font-weight:bold"><br>2. Does not require any action from the integration team:<br><br></u>${s4na}<br>
<b style="${C2}font-size:14px"><u>Entities Mortgage for less than 23K AED</u></b><br>${s5t}<br>
<div style="${AP}${C2}font-size:12pt;">Kindly let me know if you have any questions or suggestions.<br><br>Best Regards,</div>
</div></div></body></html>`;
}

// ── Wtheeq processors ──
const WT_BORDER2='1px solid #000000',WT_HDR_BG2='#dae9f8',WT_WHITE2='#ffffff',WT_TXT2='#477aaa',WT_FONT2='font-family:Calibri,sans-serif;font-size:11pt;';
const wtHdr2=(cells,al=[])=>`<tr>${cells.map((c,i)=>`<td style="border:${WT_BORDER2};background:${WT_HDR_BG2};padding:4pt 6pt"><p style="margin:0;text-align:${al.includes(i)?'left':'center'}"><b><span style="${WT_FONT2}color:${WT_TXT2}">${c}</span></b></p></td>`).join('')}</tr>`;
const wtRow2=(cells,ac=[])=>`<tr>${cells.map((c,i)=>`<td style="border:${WT_BORDER2};background:${WT_WHITE2};padding:3pt 6pt"><p style="margin:0;${ac.includes(i)?'text-align:center':''}"><span style="${WT_FONT2}color:${WT_TXT2}">${c}</span></p></td>`).join('')}</tr>`;
const wtMergeRow2=(text,colspan)=>`<tr><td colspan="${colspan}" style="border:${WT_BORDER2};background:${WT_HDR_BG2};padding:4pt 6pt;text-align:center"><b><span style="${WT_FONT2}color:${WT_TXT2}">${text}</span></b></td></tr>`;
const wtTable2=(headers,rows,ac=[],alh=[])=>`<table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;border:${WT_BORDER2}"><tbody>${wtHdr2(headers,alh)}${rows.map(r=>wtRow2(r,ac)).join('')}</tbody></table>`;
const wtTitleBox2=txt=>`<table border="0" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;margin-bottom:6px"><tbody><tr style="height:28pt"><td style="border:solid #477aaa 1.5pt;background:#dde8f0;padding:4pt 5.4pt;text-align:center;vertical-align:middle"><p style="margin:0;text-align:center"><span style="font-family:Calibri,sans-serif;font-size:16pt;font-weight:700;color:${WT_TXT2}">${txt}</span></p></td></tr></tbody></table>`;
const wtH22=t=>`<p style="margin:8px 0 4px"><b><u><span style="font-family:Calibri,sans-serif;font-size:12pt;color:${WT_TXT2}">${t}</span></u></b></p>`;
const wtP2=t=>`<p style="margin:4px 0 6px"><span style="${WT_FONT2}color:${WT_TXT2}">${t}</span></p>`;

function wtProcessLiveTable(sheet){if(!sheet)return[];return window.XLSX.utils.sheet_to_json(sheet,{defval:'',raw:false}).map(r=>({company:String(r['InsuranceCompany']||'').trim(),liveDate:String(r['LiveDate']||'').trim(),newPolicies:parseInt(String(r['TotalNewPolicies']||'0').replace(/,/g,''))||0,cancellation:parseInt(String(r['TotalCancellation']||'0').replace(/,/g,''))||0,transfer:parseInt(String(r['TotalTransfer']||'0').replace(/,/g,''))||0,validate:parseInt(String(r['TotalValidate']||'0').replace(/,/g,''))||0,failureCount:parseInt(String(r['FailureCount']||'0').replace(/,/g,''))||0})).filter(r=>r.company&&!/^total$/i.test(r.company));}
function wtProcessSDErrors(sheet){if(!sheet)return[];return window.XLSX.utils.sheet_to_json(sheet,{defval:'',raw:false}).map(r=>({company:String(r['InsuranceCompany']||'').trim(),serviceName:String(r['SD_ServiceName']||r['ServiceName']||'').trim(),errorCode:String(r['ErrorCode']||'').trim(),errorDesc:String(r['DescEn']||r['ErrorDesc']||'').trim(),errorCount:parseInt(String(r['ErrorCount']||'0').replace(/,/g,''))||0})).filter(r=>r.company&&!/^total$/i.test(r.company));}
function wtProcessADPErrors(sheet){if(!sheet)return[];return window.XLSX.utils.sheet_to_json(sheet,{defval:'',raw:true}).map(r=>({company:String(r['InsuranceCompany']||'').trim(),serviceName:String(r['ServiceName']||'').trim(),errorCode:String(r['ErrorCode']||'').trim(),errorDesc:String(r['ErrorDesc']||'').trim(),errorCount:String(r['ErrorCount']||'')})).filter(r=>r.company&&!/^total$/i.test(r.company));}
function wtProcessServiceOutage(sheet){if(!sheet)return[];return window.XLSX.utils.sheet_to_json(sheet,{defval:'',raw:false}).map(r=>({company:String(r['InsuranceCompany']||'').trim(),serviceName:String(r['ServiceName']||'').trim(),count:parseInt(String(r['ErrorCount']||'0').replace(/,/g,''))||0})).filter(r=>r.company&&!/^total$/i.test(r.company)).sort((a,b)=>b.count-a.count);}
function wtProcessOutageInternal(sheet){if(!sheet)return[];const raw=window.XLSX.utils.sheet_to_json(sheet,{defval:'',raw:true});const agg={};raw.forEach(r=>{const svc=String(r['ServiceName']||'').trim();const cnt=parseInt(String(r['ServiceOutageCount']||'').replace(/,/g,''))||0;if(!svc||/^total$/i.test(svc))return;if(!agg[svc])agg[svc]={serviceName:svc,errorCode:'500',errorDesc:'Service Downtime',count:0};agg[svc].count+=cnt;});return Object.values(agg).sort((a,b)=>b.count-a.count);}
function wtProcessADPError500(sheet){
  if(!sheet)return[];
  const rows=window.XLSX.utils.sheet_to_json(sheet,{defval:'',raw:true});if(!rows.length)return[];
  const keys=Object.keys(rows[0]);const datK=keys.find(k=>/created|date|time/i.test(k));if(!datK)return[];
  const to12hr=t=>{if(!t)return'';const m=String(t).trim().match(/^(\d{1,2}):(\d{2})/);if(!m)return String(t).trim();let h=+m[1];const min=m[2];const p=h<12?'AM':'PM';if(h===0)h=12;else if(h>12)h-=12;return`${h}:${min} ${p}`;};
  const parseDT=v=>{const s=String(v||'').trim();const m=s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}:\d{2})/);if(m)return{date:`${m[1]}/${m[2]}/${m[3]}`,time:to12hr(m[4])};if(typeof v==='number'){const d=new Date(Math.round((v-25569)*86400*1000));return{date:`${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`,time:to12hr(`${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`)};}return{date:s,time:''};};
  const byDate={};rows.forEach(r=>{const{date,time}=parseDT(r[datK]);if(!date)return;if(!byDate[date])byDate[date]={date,count:0,times:[]};byDate[date].count++;if(time&&!byDate[date].times.includes(time))byDate[date].times.push(time);});
  return Object.values(byDate).map(r=>({date:r.date,count:r.count,time:r.times.length>1?r.times[0]+' - '+r.times[r.times.length-1]:r.times[0]||''}));
}

async function wtBuildEmail(wb,recipient,dr,uatRows,outageTiming){
  const live=wtProcessLiveTable(wb.Sheets['LiveTable']);
  const sdErr=wtProcessSDErrors(wb.Sheets['SDErrors']);
  const adpErr=wtProcessADPErrors(wb.Sheets['ADPErrors']);
  const svcOutage=wtProcessServiceOutage(wb.Sheets['ServiceOutage']);
  const internalOutage=wtProcessOutageInternal(wb.Sheets['OutageInternalService']);
  const liveCount=live.length,uatCount=uatRows.length;
  const t_live=`<table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;border:${WT_BORDER2}"><tbody>${wtMergeRow2('Production Environment Status',8)}${wtHdr2(['Insurance Company','Live Date','Total New Policies','Total Cancellation','Total Transfer','Total Validate','Total Service Failure Count(SD+ADP)','Status'],[0])}${live.map(r=>wtRow2([r.company,r.liveDate,_n(r.newPolicies),_n(r.cancellation),_n(r.transfer),_n(r.validate),_n(r.failureCount),`<span style="background:#70ad47;color:white;padding:2pt 8pt;border-radius:3pt;font-size:10pt;font-family:Calibri,sans-serif;font-weight:bold">Live</span>`],[1,2,3,4,5,6,7])).join('')}</tbody></table>`;
  const t_uat=`<table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;border:${WT_BORDER2}"><tbody>${wtHdr2(['Insurance Company','Active On UAT','Expected Live Date','Challenges / Issue faced by Partner / Comment'],[0,3])}${uatRows.map(r=>`<tr><td style="border:${WT_BORDER2};background:${WT_WHITE2};padding:3pt 5pt;min-width:160pt"><p style="margin:0"><span style="${WT_FONT2}color:${WT_TXT2}">${r.company}</span></p></td><td style="border:${WT_BORDER2};background:${WT_WHITE2};padding:3pt 5pt;text-align:center"><p style="margin:0;text-align:center"><span style="${WT_FONT2}color:${WT_TXT2}">${r.active}</span></p></td><td style="border:${WT_BORDER2};background:${WT_WHITE2};padding:3pt 5pt;text-align:center"><p style="margin:0;text-align:center"><span style="${WT_FONT2}color:${WT_TXT2}">${r.liveDate||'NA'}</span></p></td><td style="border:${WT_BORDER2};background:${WT_WHITE2};padding:3pt 5pt;min-width:220pt"><p style="margin:0"><span style="${WT_FONT2}color:${WT_TXT2}">${r.comment}</span></p></td></tr>`).join('')}</tbody></table>`;
  const t_sdErr=sdErr.length?wtTable2(['Insurance Company','Service Name','Error Code','Error Desc','Error Count'],sdErr.map(r=>[r.company,r.serviceName,r.errorCode,r.errorDesc,_n(r.errorCount)]),[2,4],[0,1,3]):`<p style="${WT_FONT2}color:${WT_TXT2}">No SD failures recorded this week.</p>`;
  const t_adpErr=adpErr.length?wtTable2(['Insurance Company','Service Name','Error Code','Error Desc','Error Count'],adpErr.map(r=>[r.company,r.serviceName,r.errorCode,r.errorDesc,r.errorCount]),[2,4],[0,1,3]):`<p style="${WT_FONT2}color:${WT_TXT2}">No ADP failures recorded this week.</p>`;
  const t_svcOutage=svcOutage.length?wtTable2(['Insurance Company','Service Name','Service Outage (Count)'],svcOutage.map(r=>[r.company,r.serviceName,_n(r.count)]),[2],[0,1,2]):`<p style="${WT_FONT2}color:${WT_TXT2}">No service outage recorded this week.</p>`;
  const t_outageTiming=outageTiming.length?`<table border="0" cellspacing="0" cellpadding="0" style="border-collapse:collapse;width:100%;border:${WT_BORDER2}"><tbody>${wtHdr2(['Date','Request Failure Count','Time'],[0])}${outageTiming.map(r=>wtRow2([r.date,r.count,r.time],[1,2])).join('')}</tbody></table>`:'';
  const t_internal=internalOutage.length?wtTable2(['Service Name','Error Code','Error Description','Service outage(Count)'],internalOutage.map(r=>[r.serviceName,r.errorCode,r.errorDesc,_n(r.count)]),[1,3],[0,2]):'';
  return`<!DOCTYPE html><html><head><meta charset="UTF-8"></head><body><div style="${WT_FONT2}color:#1a3a5c;max-width:900px;margin:0;padding:12px">
<p style="margin:0 0 8px"><span style="${WT_FONT2}">Dear ${recipient},</span></p>
<p style="margin:0 0 12px"><span style="${WT_FONT2}">Kindly find the below weekly status summary for Wtheeq project.</span></p>
<p style="margin:8px 0;text-align:center"><b><span style="font-family:Calibri,sans-serif;font-size:14pt;color:#0d3349">Weekly API Integration Report for Wtheeq</span></b></p>
<p style="margin:0 0 12px;text-align:center"><b><span style="font-family:Calibri,sans-serif;font-size:13pt;color:#0d3349">(${dr})</span></b></p>
${wtTitleBox2('Summary')}${wtP2(`Total <b>${liveCount}</b> Insurance companies are <b>LIVE</b> on Production environment, and <b>${uatCount}</b> Insurance companies are available on Staging(Testing) environment.`)}<p>&nbsp;</p>
${wtTitleBox2('Integration Status - Production Environment')}${t_live}<p>&nbsp;</p>
${wtTitleBox2('Integration Status - Staging Environment')}${wtH22('UAT Environment Status')}${t_uat}<p>&nbsp;</p>
${wtTitleBox2('API Failure Breakdown')}${wtH22('Failures due to SlashData validations:')}<p>&nbsp;</p>${t_sdErr}<p>&nbsp;</p>
${wtH22('Failures due to ADP service unavailability or system validation:')}${t_adpErr}${wtP2('Note: We are conducting the meeting with all impacted partners, to explain the system requirements and the failure reasons with the required needed actions from their side.')}<p>&nbsp;</p>
${wtTitleBox2('ADP Service Outage (Service Utilized by partners) and Impacted Partners')}${wtH22('Service Outage Statistics:')}${t_svcOutage}<p>&nbsp;</p>
${outageTiming.length?`${wtH22('Service Outage Timing:')}${t_outageTiming}<p>&nbsp;</p>`:''}
${wtTitleBox2('ADP Service Outage (For SlashData Internal Services)')}${t_internal}<p>&nbsp;</p>
<p style="margin:16px 0 0"><span style="${WT_FONT2}">Kindly let me know if you have any questions or suggestions.</span></p>
<p style="margin:8px 0 0"><b><span style="${WT_FONT2}">Best Regards,</span></b></p>
</div></body></html>`;
}

// ── Product config ──
const PROD_CONFIG = {
  Rhoon:  { tabs1:['Rhoon_Staging'], tabs2:['RequestStatsPerCompany','ErrorsConsolidatedByCompany','Entities23kVehVal','TotalRequestStats'], label1:'File 1 — Staging Workbook', label2:'File 2 — Stats Workbook', reqHints1:'Rhoon_Staging', reqHints2:'RequestStatsPerCompany · ErrorsConsolidatedByCompany · Entities23kVehVal · TotalRequestStats', steps:['Reading','Processing','Charts','Building','Download'] },
  Wtheeq: { tabs1:['IC List'], tabs2:['ADPErrors','OutageInternalService','SDErrors','LiveTable','ServiceOutage','ADPError500'], label1:'File 1 — IC List (optional)', label2:'File 2 — Stats Workbook', reqHints1:'IC List', reqHints2:'ADPErrors · OutageInternalService · SDErrors · LiveTable · ServiceOutage · ADPError500', steps:['Reading','Processing','Building','Download'] },
};

// ── UploadZone sub-component ──
function UploadZone({ label, hint, onFile, fileInfo, inputRef }) {
  const handleDragOver = e => { e.preventDefault(); e.currentTarget.classList.add('dragover'); };
  const handleDragLeave = e => e.currentTarget.classList.remove('dragover');
  const handleDrop = e => { e.preventDefault(); e.currentTarget.classList.remove('dragover'); if(e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0]); };
  return (
    <div>
      <div className="gen-section-lbl">{label}</div>
      <div className={`gen-upload-zone${fileInfo?' has-file':''}`}
        onClick={()=>inputRef.current?.click()}
        onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
        <input type="file" ref={inputRef} accept=".xlsx,.xls" style={{display:'none'}} onChange={e=>{ if(e.target.files[0]) onFile(e.target.files[0]); }}/>
        <div className="gen-upload-icon">{fileInfo?'✅':'📊'}</div>
        <div className="gen-upload-title" style={{color:fileInfo?'#22c55e':'#94a3b8'}}>{fileInfo?fileInfo.name:'Drop here or click to browse'}</div>
        <div className="gen-upload-sub">{fileInfo?fileInfo.size:'.xlsx / .xls'}</div>
      </div>
      {hint && <div style={{fontSize:11,color:'#364c63',marginTop:5}}>Required: <span style={{color:'#3b82f6'}}>{hint}</span></div>}
    </div>
  );
}

// ── Main Generator Component ──
function WeeklyReportGenerator({ show, onClose, onSave }) {
  const [product, setProduct] = useState('Rhoon');
  const [recipient, setRecipient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [libsReady, setLibsReady] = useState(false);
  const [progress, setProgress] = useState(null);
  const [alertState, setAlertState] = useState(null);
  const [previewHtml, setPreviewHtml] = useState(null); // for in-portal fallback
  const [instrOpen, setInstrOpen] = useState(false);
  const [uatRows, setUatRows] = useState([]);
  const fileRef1 = useRef(null), fileRef2 = useRef(null);
  const cfg = PROD_CONFIG[product] || PROD_CONFIG.Rhoon;

  useEffect(()=>{
    if(!show) return;
    loadGenLibs().then(()=>setLibsReady(true)).catch(e=>setAlertState({type:'error',msg:'Failed to load libraries: '+e.message}));
    const fmt=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const yd=new Date();yd.setDate(yd.getDate()-1);const wa=new Date();wa.setDate(wa.getDate()-7);
    setStartDate(fmt(wa));setEndDate(fmt(yd));
  },[show]);

  useEffect(()=>{setFile1(null);setFile2(null);setUatRows([]);setAlertState(null);setProgress(null);setPreviewHtml(null);},[product]);

  const setStep=(step,pct,label)=>setProgress(p=>({...(p||{}),pct,label,current:step,steps:cfg.steps}));
  const isReady=libsReady&&recipient.trim()&&startDate&&endDate&&file2;

  const validateFile=async(file,requiredTabs,fileLabel)=>{
    if(!file.name.match(/\.(xlsx|xls)$/i))throw new Error(`${fileLabel}: Please upload an .xlsx or .xls file`);
    const wb=await genReadXL(file);
    const missing=requiredTabs.filter(t=>!wb.SheetNames.includes(t));
    if(missing.length)throw new Error(`${fileLabel} missing tab${missing.length>1?'s':''}: ${missing.join(', ')}`);
    return wb;
  };

  const handleFile1=async f=>{
    setFile1({name:f.name,size:genFmtSize(f.size),raw:f});
    if(product==='Wtheeq'){
      try{
        const wb=await genReadXL(f);const sheet=wb.Sheets['IC List'];if(!sheet)return;
        const rawRows=window.XLSX.utils.sheet_to_json(sheet,{header:1,defval:'',raw:false});
        let hdrIdx=-1;rawRows.forEach((row,i)=>{if(hdrIdx===-1&&row.some(c=>typeof c==='string'&&/Inssurance Company Name in En/i.test(c)))hdrIdx=i;});
        if(hdrIdx===-1)return;
        const headers=rawRows[hdrIdx];const compIdx=headers.findIndex(h=>typeof h==='string'&&/Inssurance Company Name in En/i.test(h));const statIdx=headers.findIndex(h=>typeof h==='string'&&/^status$/i.test(h));const dateIdx=headers.findIndex(h=>typeof h==='string'&&/live.?date|expected.?live|go.?live/i.test(h));
        const rows=[];rawRows.slice(hdrIdx+1).forEach(row=>{const company=String(row[compIdx]||'').trim(),status=String(row[statIdx]||'').trim();if(!company||!/^in\s*uat$/i.test(status))return;rows.push({company,active:'Yes',liveDate:dateIdx>=0?String(row[dateIdx]||'').trim():'',comment:''});});
        setUatRows(rows);
      }catch(e){console.warn('Could not pre-populate UAT table:',e);}
    }
  };
  const handleFile2=async f=>setFile2({name:f.name,size:genFmtSize(f.size),raw:f});

  const handleGenerate=async()=>{
    setAlertState(null);setProgress({pct:0,label:'Starting…',current:1,steps:cfg.steps});
    try{
      if(product==='Rhoon'){
        setStep(1,10,'Reading files…');
        const wb1=await validateFile(file1.raw,cfg.tabs1,'Staging Workbook (File 1)');
        const wb2=await validateFile(file2.raw,cfg.tabs2,'Stats Workbook (File 2)');
        await genSleep(80);
        wb2.Sheets['Rhoon_Staging']=wb1.Sheets['Rhoon_Staging'];
        if(!wb2.SheetNames.includes('Rhoon_Staging'))wb2.SheetNames.push('Rhoon_Staging');
        setStep(2,30,'Processing data…');await genSleep(80);
        const d=rhProcessWB(wb2);const dr=genFmtRange(startDate,endDate);
        setStep(3,55,'Rendering charts…');await genSleep(80);
        const html=await rhBuildEmail(d,recipient,dr);
        setStep(4,82,'Building email…');await genSleep(80);
        setStep(5,96,'Opening report…');await genSleep(80);
        const opened = genOpenInTab(html);
        setPreviewHtml(html);
        setStep(5,100,'Done!');
        setAlertState({type:'success',msg: opened
          ? '✅ Rhoon report opened in a new tab! Use the Save button below to add to your library.'
          : '✅ Report ready — preview below. Use Save to add to your library.'});
        if(onSave) onSave(html, 'Rhoon', dr);
      }else if(product==='Wtheeq'){
        setStep(1,15,'Reading files…');
        const wb1=file1?await validateFile(file1.raw,cfg.tabs1,'IC List (File 1)').catch(()=>null):null;
        const wb2=await validateFile(file2.raw,cfg.tabs2,'Stats Workbook (File 2)');
        if(wb1&&wb1.Sheets['IC List'])wb2.Sheets['IC List']=wb1.Sheets['IC List'];
        await genSleep(80);const dr=genFmtRange(startDate,endDate);
        setStep(2,40,'Processing data…');await genSleep(80);
        const computedOutage=wtProcessADPError500(wb2.Sheets['ADPError500']);
        setStep(3,70,'Building email…');await genSleep(80);
        const html=await wtBuildEmail(wb2,recipient,dr,uatRows,computedOutage);
        setStep(4,96,'Opening report…');await genSleep(80);
        const opened2 = genOpenInTab(html);
        setPreviewHtml(html);
        setStep(4,100,'Done!');
        setAlertState({type:'success',msg: opened2
          ? '✅ Wtheeq report opened in a new tab! Use the Save button below to add to your library.'
          : '✅ Report ready — preview below. Use Save to add to your library.'});
        if(onSave) onSave(html, 'Wtheeq', dr);
      }
    }catch(err){
      console.error(err);setAlertState({type:'error',msg:'❌ '+err.message});setProgress(null);
    }
  };

  if(!show) return null;
  return(
    <div className="gen-overlay" onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="gen-modal">
        <div className="gen-modal-header">
          <div>
            <div className="gen-modal-title">🗓 Generate Weekly Report</div>
            <div style={{fontSize:12,color:'#4a6280',marginTop:2}}>Upload your Excel files and generate a ready-to-send HTML report</div>
          </div>
          <button className="gen-close-btn" onClick={onClose}><XCircle size={20}/></button>
        </div>
        <div className="gen-body">
          {/* Product selector */}
          <div className="gen-prod-tabs">
            {['Rhoon','Wtheeq'].map(p=>(
              <button key={p} className={`gen-prod-tab${product===p?' active':''}`} onClick={()=>setProduct(p)}>{p}</button>
            ))}
            {['Rabet','Bahri','Mulem','Shary','Tajeeri'].map(p=>(
              <button key={p} className="gen-prod-tab" style={{opacity:.35,cursor:'not-allowed'}} disabled>{p} <span style={{fontSize:10,color:'#364c63'}}>soon</span></button>
            ))}
          </div>

          {/* Form fields */}
          <div className="gen-form-row">
            <div><div className="gen-label">Recipient name</div><input className="gen-input" placeholder="e.g. Albahaa" value={recipient} onChange={e=>setRecipient(e.target.value)}/></div>
            <div><div className="gen-label">Period start</div><input className="gen-input" type="date" value={startDate} onChange={e=>setStartDate(e.target.value)}/></div>
            <div><div className="gen-label">Period end</div><input className="gen-input" type="date" value={endDate} onChange={e=>setEndDate(e.target.value)}/></div>
          </div>

          {/* Instructions accordion */}
          <div className="gen-instr">
            <div className="gen-instr-header" onClick={()=>setInstrOpen(o=>!o)}>
              <Info size={13} color="#3b82f6"/>
              <span style={{flex:1,fontSize:13,fontWeight:600,color:'#60a5ff'}}>How to prepare your files — click to {instrOpen?'collapse':'expand'}</span>
              {instrOpen?<ChevronDown size={13} color="#4a6280"/>:<ChevronRight size={13} color="#4a6280"/>}
            </div>
            {instrOpen&&(
              <div className="gen-instr-body">
                {product==='Rhoon'&&<>
                  <div style={{fontWeight:700,color:'#3b82f6',fontSize:11,marginBottom:8}}>FILE 1 — STAGING WORKBOOK</div>
                  <div className="gen-instr-step"><div className="gen-instr-num">1</div><div>Internal tracking sheet. Must have a tab named exactly <span className="gen-tab-chip">Rhoon_Staging</span>.</div></div>
                  <div style={{fontWeight:700,color:'#3b82f6',fontSize:11,margin:'12px 0 8px'}}>FILE 2 — STATS WORKBOOK (from Rhoon Weekly Stats Report)</div>
                  {['RequestStatsPerCompany','ErrorsConsolidatedByCompany','Entities23kVehVal','TotalRequestStats'].map((t,i)=>(
                    <div key={t} className="gen-instr-step"><div className="gen-instr-num">{i+1}</div><div>Tab <span className="gen-tab-chip">{t}</span></div></div>
                  ))}
                </>}
                {product==='Wtheeq'&&<>
                  <div style={{fontWeight:700,color:'#3b82f6',fontSize:11,marginBottom:8}}>FILE 1 — IC LIST (Optional)</div>
                  <div className="gen-instr-step"><div className="gen-instr-num">1</div><div>Tab <span className="gen-tab-chip">IC List</span> — auto-populates the UAT companies table below.</div></div>
                  <div style={{fontWeight:700,color:'#3b82f6',fontSize:11,margin:'12px 0 8px'}}>FILE 2 — STATS WORKBOOK</div>
                  {['ADPErrors','OutageInternalService','SDErrors','LiveTable','ServiceOutage','ADPError500'].map((t,i)=>(
                    <div key={t} className="gen-instr-step"><div className="gen-instr-num">{i+1}</div><div>Tab <span className="gen-tab-chip">{t}</span></div></div>
                  ))}
                </>}
              </div>
            )}
          </div>

          {/* File uploads */}
          <div className="gen-upload-grid">
            <UploadZone label={cfg.label1} hint={cfg.reqHints1} onFile={handleFile1} fileInfo={file1} inputRef={fileRef1}/>
            <UploadZone label={cfg.label2} hint={cfg.reqHints2} onFile={handleFile2} fileInfo={file2} inputRef={fileRef2}/>
          </div>

          {/* Wtheeq UAT table */}
          {product==='Wtheeq'&&(
            <>
              <div className="gen-section-lbl"><Users size={12}/>UAT Staging Environment — Companies</div>
              <div className="wt-tbl-wrap" style={{maxHeight:200,overflowY:'auto'}}>
                <table className="wt-tbl">
                  <thead><tr><th>Company</th><th style={{textAlign:'center',width:80}}>Active</th><th style={{width:140}}>Expected Live Date</th><th>Comment</th><th style={{width:50}}>Del</th></tr></thead>
                  <tbody>
                    {uatRows.map((row,i)=>(
                      <tr key={i}>
                        <td><input className="wt-small-input" value={row.company} onChange={e=>{const r=[...uatRows];r[i]={...r[i],company:e.target.value};setUatRows(r);}}/></td>
                        <td style={{textAlign:'center'}}><input type="checkbox" checked={row.active==='Yes'} onChange={e=>{const r=[...uatRows];r[i]={...r[i],active:e.target.checked?'Yes':'No'};setUatRows(r);}} style={{width:14,height:14,cursor:'pointer'}}/></td>
                        <td><input className="wt-small-input" type="date" value={row.liveDate} onChange={e=>{const r=[...uatRows];r[i]={...r[i],liveDate:e.target.value};setUatRows(r);}}/></td>
                        <td><input className="wt-small-input" value={row.comment} placeholder="Comment…" onChange={e=>{const r=[...uatRows];r[i]={...r[i],comment:e.target.value};setUatRows(r);}}/></td>
                        <td style={{textAlign:'center'}}><button onClick={()=>setUatRows(uatRows.filter((_,j)=>j!==i))} style={{background:'#200a0a',border:'1px solid #7f1d1d',color:'#f87171',borderRadius:4,padding:'2px 6px',cursor:'pointer',fontSize:11}}>✕</button></td>
                      </tr>
                    ))}
                    {uatRows.length===0&&<tr><td colSpan={5} style={{textAlign:'center',color:'#4a6280',padding:14,fontSize:12}}>No UAT companies — upload IC List file or add manually</td></tr>}
                  </tbody>
                </table>
              </div>
              <button className="btn btn-ghost" style={{fontSize:11,padding:'4px 10px',marginTop:6,marginBottom:14}} onClick={()=>setUatRows([...uatRows,{company:'',active:'Yes',liveDate:'',comment:''}])}><Plus size={11}/>Add Row</button>
            </>
          )}

          {/* Libraries loading indicator */}
          {!libsReady&&<div style={{fontSize:12,color:'#f59e0b',padding:'8px 12px',background:'rgba(245,158,11,.07)',border:'1px solid rgba(245,158,11,.2)',borderRadius:8,marginBottom:10}}>⏳ Loading Excel & Chart libraries…</div>}

          {/* Generate button */}
          <button className="gen-generate-btn" disabled={!isReady} onClick={handleGenerate}>
            {!libsReady?'Loading libraries…':`Generate ${product} Weekly Report`}
          </button>

          {/* Progress */}
          {progress&&(
            <div className="gen-progress">
              <div className="gen-progress-label">{progress.label}</div>
              <div className="gen-progress-track"><div className="gen-progress-fill" style={{width:`${progress.pct}%`}}/></div>
              <div className="gen-steps">
                {(progress.steps||[]).map((s,i)=>(
                  <span key={s} className={`gen-step${i+1===progress.current?' active':i+1<progress.current?' done':''}`}>{i+1<progress.current?'✓ ':''}{s}</span>
                ))}
              </div>
            </div>
          )}

          {/* Alert */}
          {alertState&&<div className={`gen-alert show ${alertState.type}`}>{alertState.msg}</div>}

          {/* In-portal preview panel */}
          {previewHtml && (
            <div style={{marginTop:16,border:'1px solid #1a2740',borderRadius:10,overflow:'hidden'}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'10px 16px',background:'#0a1525',borderBottom:'1px solid #1a2740'}}>
                <span style={{fontSize:13,fontWeight:600,color:'#c8d8e8'}}>📄 Report Preview</span>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>genOpenInTab(previewHtml)}
                    style={{padding:'5px 14px',background:'#1d4ed8',border:'none',borderRadius:6,color:'#fff',fontSize:12,fontWeight:600,cursor:'pointer'}}>
                    Open in New Tab ↗
                  </button>
                  <button onClick={()=>setPreviewHtml(null)}
                    style={{padding:'5px 10px',background:'transparent',border:'1px solid #1a2740',borderRadius:6,color:'#4a6280',fontSize:12,cursor:'pointer'}}>
                    ✕
                  </button>
                </div>
              </div>
              <iframe
                srcDoc={previewHtml}
                style={{width:'100%',height:520,border:'none',background:'#fff'}}
                title="Report Preview"
                sandbox="allow-same-origin"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const pages = { home:HomePage, health:HealthPage, docs:DocsPage, updates:UpdatesPage, faq:FAQPage, weekly:WeeklyPage, monthly:MonthlyPage, team:TeamPage, entities:EntityPage, emails:EmailTemplatesPage, changes:ChangelogPage };
  const Page = pages[page] || HomePage;

  return (
    <>
      <style>{CSS}</style>
      <div className="portal-wrap">
        <Sidebar active={page} onNav={setPage}/>
        <div className="main-area">
          <Page onNav={setPage}/>
        </div>
      </div>
    </>
  );
}
