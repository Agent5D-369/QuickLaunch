/* QuickLaunch privacy controls. Default deny; no measurement before consent. */
(() => {
  'use strict';
  const KEY = 'quicklaunchConsent';
  const VERSION = '2026-10-27';
  const DAYS = 180;
  const ttl = DAYS * 86400000;
  const config = window.QUICKLAUNCH_CONFIG || {};
  const id = config.ga4MeasurementId;
  let active = false;
  let saved = read();
  const signal = () => navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' || window.doNotTrack === '1';
  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(KEY));
      if (value && value.version === VERSION && typeof value.analytics === 'boolean' && Number.isFinite(value.savedAt)
        && Number.isFinite(value.expiresAt) && value.savedAt <= Date.now() && value.expiresAt > Date.now()
        && value.expiresAt - value.savedAt <= ttl) return value;
      localStorage.removeItem(KEY);
    } catch {}
    return null;
  }
  function allowed() { return Boolean(saved && saved.analytics && saved.expiresAt > Date.now() && !signal()); }
  function cleanUrl(value) {
    try { const url = new URL(value, location.href); return url.origin + url.pathname; } catch { return ''; }
  }
  function clearAnalyticsCookies() {
    for (const cookie of document.cookie.split(';')) {
      const name = cookie.trim().split('=')[0];
      if (!/^(_ga|_gid|_gat)(_|$)/.test(name)) continue;
      const domains = ['', location.hostname, '.' + location.hostname];
      const pieces = location.hostname.split('.');
      if (pieces.length > 2) domains.push('.' + pieces.slice(-2).join('.'));
      for (const domain of domains) document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? '; domain=' + domain : ''}`;
    }
  }
  function start() {
    if (active || !allowed() || !/^G-[A-Z0-9]+$/.test(id || '')) return;
    active = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, {
      page_title: document.title,
      page_location: cleanUrl(location.href),
      page_referrer: document.referrer ? cleanUrl(document.referrer) : '',
      cookie_expires: DAYS * 86400,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const script = document.createElement('script');
    script.id = 'quicklaunch-analytics'; script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }
  function stop() {
    if (id) window['ga-disable-' + id] = true;
    clearAnalyticsCookies();
  }
  const eventNames = new Set(['generate_lead','fit_call_click','apply_path_click','diagnostic_access_click','view_path_click']);
  window.QuickLaunchPrivacy = {
    track(name, params) {
      if (!allowed() || !active || !eventNames.has(name) || typeof window.gtag !== 'function') return;
      const safe = {};
      if (['hero-lead-form','magnet-form','apply-form','fit-call-form'].includes(params.form_id)) safe.form_id = params.form_id;
      if (params.href) safe.destination = cleanUrl(params.href);
      window.gtag('event', name, safe);
    }
  };
  if (allowed()) start(); else stop();

  const banner = document.createElement('section');
  banner.className='privacy-banner'; banner.setAttribute('aria-label','Analytics choice');
  banner.innerHTML='<h2>Your analytics choice</h2><p>Essential storage supports requested features. Optional analytics helps us understand site use. You can reject analytics and still use the site. <a href="cookies.html">Cookie Policy</a> · <a href="privacy.html">Privacy Policy</a></p><div class="privacy-actions"><button type="button" data-choice="yes">Accept analytics</button><button type="button" data-choice="no">Reject optional</button><button type="button" data-manage>Manage choices</button></div><p class="privacy-feedback" role="status"></p>';
  banner.hidden = Boolean(saved || signal()); document.body.appendChild(banner);
  const dialog = document.createElement('dialog');
  dialog.className='privacy-dialog'; dialog.setAttribute('aria-labelledby','privacy-title');
  dialog.innerHTML='<h2 id="privacy-title">Cookie settings</h2><p>Requested functionality stays available. Analytics is optional and off until you choose it.</p><p><strong>Essential storage</strong><br>Remembers this choice and requested diagnostic access.</p><label class="privacy-choice"><input type="checkbox" id="analytics-choice"><span>Analytics<small>Google Analytics visit and interaction measurement</small></span></label><p id="privacy-signal"></p><p>Read the <a href="cookies.html">Cookie Policy</a>. You can change this choice later.</p><div class="privacy-actions"><button type="button" data-save>Save choices</button><button type="button" data-choice="no">Reject optional</button><button type="button" data-close>Close</button></div><p class="privacy-feedback" role="status"></p>';
  document.body.appendChild(dialog);
  const toggle=dialog.querySelector('input');
  let returnFocus=null;
  function open(event) {
    returnFocus=event?.currentTarget || document.activeElement;
    saved=read(); toggle.checked=allowed(); toggle.disabled=signal();
    dialog.querySelector('#privacy-signal').textContent=signal() ? 'Your browser privacy signal keeps analytics off.' : '';
    dialog.querySelector('.privacy-feedback').textContent='';
    dialog.showModal();
  }
  function close() { dialog.close(); if(returnFocus && returnFocus.isConnected) returnFocus.focus({preventScroll:true}); }
  function choose(analytics, container) {
    container.setAttribute('aria-busy','true');
    const value={version:VERSION,analytics:Boolean(analytics && !signal()),savedAt:Date.now(),expiresAt:Date.now()+ttl};
    try { localStorage.setItem(KEY,JSON.stringify(value)); }
    catch {
      saved=null; stop();
      container.querySelector('.privacy-feedback').textContent='Your browser blocked preference storage. Analytics stays off. Allow site storage to save a choice.';
      container.removeAttribute('aria-busy'); return;
    }
    const mustUnload=active && !value.analytics;
    saved=value; banner.hidden=true;
    container.querySelector('.privacy-feedback').textContent='Choice saved.';
    container.removeAttribute('aria-busy');
    if(dialog.open) close();
    if (allowed()) start(); else stop();
    if (mustUnload) location.reload();
  }
  for(const container of [banner,dialog]) container.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click',()=>choose(button.dataset.choice==='yes',container)));
  banner.querySelector('[data-manage]').addEventListener('click',open);
  dialog.querySelector('[data-save]').addEventListener('click',()=>choose(toggle.checked,dialog));
  dialog.querySelector('[data-close]').addEventListener('click',close);
  dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)close();}});
  document.querySelectorAll('[data-cookie-settings]').forEach(button=>{button.hidden=false;button.addEventListener('click',open);});
  document.querySelectorAll('[data-print]').forEach(button=>{button.hidden=false;button.addEventListener('click',()=>window.print());});
  document.querySelectorAll('[data-reset-diagnostic]').forEach(button=>{button.hidden=false;button.addEventListener('click',()=>{
    try {localStorage.removeItem('quicklaunchDiagnosticAccess');document.querySelector('#storage-status').textContent='Diagnostic access reset.';}
    catch {document.querySelector('#storage-status').textContent='Browser storage is unavailable. Clear site data in your browser settings if needed.';}
  });});
  window.addEventListener('storage',event=>{if(event.key===KEY){saved=read();if(!allowed()){stop();if(active)location.reload();}else start();}});
  window.addEventListener('pageshow',()=>{saved=read();if(!allowed()){stop();if(active)location.reload();}});
})();
