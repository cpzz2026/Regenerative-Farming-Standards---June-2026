// Post-build step: wrap the Vite-built dist/index.html with a client-side
// password gate. The bundle <script> tag Vite generates is removed from the
// static HTML and only inserted into the DOM after the password is verified
// (SHA-256 compare against PASSWORD_HASH). This is a lightweight gate, not
// real auth — anyone who finds the public source repo can still read App.jsx
// directly. Suitable for "anyone with the link, casual confidentiality";
// not suitable for credentials or strictly confidential data.
//
// To change the password later: replace PASSWORD_HASH with the SHA-256 of
// the new password (lowercase hex) and redeploy.

import { readFileSync, writeFileSync } from 'node:fs';

const PASSWORD_HASH = '4eff529d4f6dfbc2d2492286bdea811d1f56c2007e734f0bff4cf885cc41cff5';
const HTML_PATH = 'dist/index.html';

let html = readFileSync(HTML_PATH, 'utf8');

const scriptRe = /<script[^>]*type="module"[^>]*src="([^"]+)"[^>]*><\/script>/;
const scriptMatch = html.match(scriptRe);
if (!scriptMatch) {
  throw new Error('post-build: could not find Vite bundle <script type="module"> in dist/index.html');
}
const bundleSrc = scriptMatch[1];
html = html.replace(scriptMatch[0], '');

const gate = `<style>
  :root { --evergreen:#25381c; --bone:#fbfaf8; --graphite:#3d3d3b; --claret:#91312d; }
  html,body { margin:0; padding:0; min-height:100%; background:var(--bone); color:var(--graphite); font-family:'Cabin','Gill Sans','Gill Sans MT',Calibri,sans-serif; }
  #regen-gate { position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:var(--bone); z-index:9999; padding:24px; box-sizing:border-box; }
  .rg-card { width:100%; max-width:380px; padding:32px 28px; border:1px solid var(--evergreen); background:var(--bone); box-sizing:border-box; }
  .rg-eyebrow { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:var(--evergreen); margin:0 0 12px; font-weight:600; }
  .rg-title { font-size:20px; line-height:1.25; color:var(--evergreen); margin:0 0 6px; font-weight:600; }
  .rg-sub { font-size:13px; line-height:1.5; color:var(--graphite); margin:0 0 20px; }
  .rg-label { display:block; font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:var(--evergreen); margin:0 0 6px; font-weight:600; }
  .rg-input { width:100%; box-sizing:border-box; padding:10px 12px; border:1px solid var(--evergreen); background:var(--bone); color:var(--graphite); font-family:inherit; font-size:14px; border-radius:0; outline:none; }
  .rg-input:focus { box-shadow: inset 0 -2px 0 var(--evergreen); }
  .rg-btn { margin-top:14px; width:100%; padding:10px 12px; background:var(--evergreen); color:var(--bone); border:1px solid var(--evergreen); font-family:inherit; font-size:12px; letter-spacing:0.16em; text-transform:uppercase; cursor:pointer; border-radius:0; font-weight:600; }
  .rg-btn:hover { background:#1c2a16; }
  .rg-error { margin-top:12px; font-size:12px; color:var(--claret); min-height:16px; }
  .rg-foot { margin-top:24px; padding-top:16px; border-top:1px solid var(--evergreen); font-size:11px; line-height:1.5; color:var(--graphite); }
</style>
<div id="regen-gate" role="dialog" aria-modal="true" aria-labelledby="rg-title">
  <form class="rg-card" id="rg-form" autocomplete="off">
    <p class="rg-eyebrow">Bramble Partners</p>
    <h1 id="rg-title" class="rg-title">Regenerative Programme Review</h1>
    <p class="rg-sub">This appendix is shared with named viewers. Please enter the access password to continue.</p>
    <label class="rg-label" for="rg-input">Access password</label>
    <input class="rg-input" id="rg-input" type="password" autocomplete="current-password" autofocus />
    <button class="rg-btn" type="submit">Enter</button>
    <div class="rg-error" id="rg-error" aria-live="polite"></div>
    <div class="rg-foot">Confidential. Not for onward circulation.</div>
  </form>
</div>
<script>
(function(){
  var HASH='${PASSWORD_HASH}';
  var KEY='regen-review-unlocked';
  var BUNDLE=${JSON.stringify(bundleSrc)};
  async function sha256(t){
    var b=await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t));
    return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0');}).join('');
  }
  function loadApp(){
    var g=document.getElementById('regen-gate'); if(g) g.remove();
    var s=document.createElement('script');
    s.type='module'; s.crossOrigin=''; s.src=BUNDLE;
    document.body.appendChild(s);
  }
  if (sessionStorage.getItem(KEY)==='1') { loadApp(); return; }
  var f=document.getElementById('rg-form');
  var i=document.getElementById('rg-input');
  var e=document.getElementById('rg-error');
  if (!f) return;
  f.addEventListener('submit', async function(ev){
    ev.preventDefault();
    e.textContent='';
    var c = await sha256(i.value);
    if (c === HASH) {
      sessionStorage.setItem(KEY,'1');
      loadApp();
    } else {
      e.textContent='Incorrect password.';
      i.value=''; i.focus();
    }
  });
})();
</script>
`;

if (html.includes('</body>')) {
  html = html.replace('</body>', gate + '\n</body>');
} else {
  html += gate;
}

writeFileSync(HTML_PATH, html);
console.log('post-build: gate injected, bundle deferred:', bundleSrc);
