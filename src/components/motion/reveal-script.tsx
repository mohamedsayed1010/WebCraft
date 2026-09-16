/**
 * The reveal + loop observer, inlined into the document.
 *
 * Runs the moment the HTML is parsed — it does not wait for React, so
 * above-the-fold copy animates in at first paint instead of after hydration.
 * One IntersectionObserver marks `[data-reveal]` / `[data-reveal-group]` as
 * `data-shown` (once), a second toggles `data-inview` on `[data-loop]` so
 * infinite CSS animations pause off-screen, and a MutationObserver picks up
 * content added by client-side navigation. Without IntersectionObserver the
 * `no-io` class shows everything.
 */
const source = `(()=>{var d=document,h=d.documentElement;if(!("IntersectionObserver"in window)){h.classList.add("no-io");return}
var S="[data-reveal]:not([data-shown]),[data-reveal-group]:not([data-shown])",L="[data-loop]";
var show=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.setAttribute("data-shown","");show.unobserve(e.target)}})},{rootMargin:"0px 0px -6% 0px"});
var loop=new IntersectionObserver(function(es){es.forEach(function(e){e.isIntersecting?e.target.setAttribute("data-inview",""):e.target.removeAttribute("data-inview")})},{rootMargin:"120px 0px"});
function scan(r){r.querySelectorAll(S).forEach(function(el){show.observe(el)});r.querySelectorAll(L).forEach(function(el){loop.observe(el)})}
scan(d);
new MutationObserver(function(ms){ms.forEach(function(m){m.addedNodes.forEach(function(n){if(n.nodeType!==1)return;if(n.matches(S))show.observe(n);if(n.matches(L))loop.observe(n);scan(n)})})}).observe(d.body,{childList:true,subtree:true});
})();`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}
