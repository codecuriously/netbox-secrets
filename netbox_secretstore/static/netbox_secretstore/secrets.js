(()=>{var R=Object.create;var E=Object.defineProperty;var I=Object.getOwnPropertyDescriptor;var M=Object.getOwnPropertyNames;var P=Object.getPrototypeOf,C=Object.prototype.hasOwnProperty;var B=e=>E(e,"__esModule",{value:!0});var D=(e,r)=>()=>(r||e((r={exports:{}}).exports,r),r.exports);var H=(e,r,o)=>{if(r&&typeof r=="object"||typeof r=="function")for(let t of M(r))!C.call(e,t)&&t!=="default"&&E(e,t,{get:()=>r[t],enumerable:!(o=I(r,t))||o.enumerable});return e},_=e=>H(B(E(e!=null?R(P(e)):{},"default",e&&e.__esModule&&"default"in e?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e);var p=(e,r,o)=>new Promise((t,i)=>{var c=a=>{try{s(o.next(a))}catch(l){i(l)}},n=a=>{try{s(o.throw(a))}catch(l){i(l)}},s=a=>a.done?t(a.value):Promise.resolve(a.value).then(c,n);s((o=o.apply(e,r)).next())});var T=D(v=>{"use strict";v.parse=O;v.serialize=F;var q=decodeURIComponent,$=encodeURIComponent,K=/; */,m=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function O(e,r){if(typeof e!="string")throw new TypeError("argument str must be a string");for(var o={},t=r||{},i=e.split(K),c=t.decode||q,n=0;n<i.length;n++){var s=i[n],a=s.indexOf("=");if(!(a<0)){var l=s.substr(0,a).trim(),u=s.substr(++a,s.length).trim();u[0]=='"'&&(u=u.slice(1,-1)),o[l]==null&&(o[l]=U(u,c))}}return o}function F(e,r,o){var t=o||{},i=t.encode||$;if(typeof i!="function")throw new TypeError("option encode is invalid");if(!m.test(e))throw new TypeError("argument name is invalid");var c=i(r);if(c&&!m.test(c))throw new TypeError("argument val is invalid");var n=e+"="+c;if(t.maxAge!=null){var s=t.maxAge-0;if(isNaN(s)||!isFinite(s))throw new TypeError("option maxAge is invalid");n+="; Max-Age="+Math.floor(s)}if(t.domain){if(!m.test(t.domain))throw new TypeError("option domain is invalid");n+="; Domain="+t.domain}if(t.path){if(!m.test(t.path))throw new TypeError("option path is invalid");n+="; Path="+t.path}if(t.expires){if(typeof t.expires.toUTCString!="function")throw new TypeError("option expires is invalid");n+="; Expires="+t.expires.toUTCString()}if(t.httpOnly&&(n+="; HttpOnly"),t.secure&&(n+="; Secure"),t.sameSite){var a=typeof t.sameSite=="string"?t.sameSite.toLowerCase():t.sameSite;switch(a){case!0:n+="; SameSite=Strict";break;case"lax":n+="; SameSite=Lax";break;case"strict":n+="; SameSite=Strict";break;case"none":n+="; SameSite=None";break;default:throw new TypeError("option sameSite is invalid")}}return n}function U(e,r){try{return r(e)}catch(o){return e}}});function d(e,r,o,t){let i="mdi-alert";switch(e){case"warning":i="mdi-alert";case"success":i="mdi-check-circle";case"info":i="mdi-information";case"danger":i="mdi-alert"}let c=document.createElement("div");c.setAttribute("class","toast-container position-fixed bottom-0 end-0 m-3");let n=document.createElement("div");n.setAttribute("class",`toast bg-${e}`),n.setAttribute("role","alert"),n.setAttribute("aria-live","assertive"),n.setAttribute("aria-atomic","true");let s=document.createElement("div");s.setAttribute("class",`toast-header bg-${e} text-body`);let a=document.createElement("i");a.setAttribute("class",`mdi ${i}`);let l=document.createElement("strong");l.setAttribute("class","me-auto ms-1"),l.innerText=r;let u=document.createElement("button");u.setAttribute("type","button"),u.setAttribute("class","btn-close"),u.setAttribute("data-bs-dismiss","toast"),u.setAttribute("aria-label","Close");let y=document.createElement("div");if(y.setAttribute("class","toast-body"),s.appendChild(a),s.appendChild(l),typeof t!="undefined"){let b=document.createElement("small");b.setAttribute("class","text-muted"),s.appendChild(b)}return s.appendChild(u),y.innerText=o.trim(),n.appendChild(s),n.appendChild(y),c.appendChild(n),document.body.appendChild(c),new window.Toast(n)}var h=_(T());function x(e){return"error"in e&&"exception"in e}function f(e){return"error"in e}function g(e){return"value"in e&&"required"in e}function j(){let{csrftoken:e}=h.default.parse(document.cookie);if(typeof e=="undefined")throw new Error("Invalid or missing CSRF token");return e}function S(e,r,o){return p(this,null,function*(){let t=j(),i=new Headers({"X-CSRFToken":t}),c;typeof o!="undefined"&&(c=JSON.stringify(o),i.set("content-type","application/json"),i.set("Accept","application/json"));let n=yield fetch(e,{method:r,body:c,headers:i,credentials:"same-origin"}),s=n.headers.get("Content-Type");if(typeof s=="string"&&s.includes("text"))return{error:yield n.text()};let a=yield n.json();return!n.ok&&Array.isArray(a)?{error:a.join(`
`)}:!n.ok&&"detail"in a?{error:a.detail}:a})}function A(e,r){return p(this,null,function*(){return yield S(e,"POST",r)})}function k(e){return p(this,null,function*(){return yield S(e,"GET")})}function G(){let e=document.getElementById("new_keypair_modal"),r=document.getElementById("use_new_pubkey");if(e===null||r===null)return;let o=e.querySelector("textarea#new_pubkey"),t=e.querySelector("textarea#new_privkey");function i(){for(let n of[o,t])n!==null&&n.setAttribute("readonly","");k("/api/plugins/netbox_secretstore/generate-rsa-key-pair").then(n=>{if(f(n))d("danger","Error",n.error).show();else{let{private_key:s,public_key:a}=n;o!==null&&t!==null&&(o.value=a,t.value=s)}})}function c(){let n=document.getElementById("id_public_key");o!==null&&(n.value=o.value,n.innerText=o.value)}e.addEventListener("shown.bs.modal",()=>i()),r.addEventListener("click",()=>c())}function L(e,r){let o=document.querySelector(`button.unlock-secret[secret-id='${e}']`),t=document.querySelector(`button.lock-secret[secret-id='${e}']`),i=document.querySelector(`button.copy-secret[secret-id='${e}']`);o!==null&&(r==="unlock"&&o.classList.add("d-none"),r==="lock"&&o.classList.remove("d-none")),t!==null&&(r==="unlock"&&t.classList.remove("d-none"),r==="lock"&&t.classList.add("d-none")),i!==null&&(r==="unlock"&&i.classList.remove("d-none"),r==="lock"&&i.classList.add("d-none"))}function N(){let e=new window.Modal("#privkey_modal");function r(t){let i=document.getElementById(`secret_${t}`);typeof t=="string"&&t!==""&&k(`/api/plugins/netbox_secretstore/secrets/${t}`).then(c=>{if(f(c))c.error.toLowerCase().includes("invalid session key")?e.show():d("danger","Error",c.error).show();else{let{plaintext:n}=c;i!==null&&n!==null?(g(i)?i.value=n:i.innerText=n,L(t,"unlock")):e.show()}})}function o(t){if(typeof t=="string"&&t!==""){let i=document.getElementById(`secret_${t}`);g(i)?i.value="********":i.innerText="********",L(t,"lock")}}for(let t of document.querySelectorAll("button.unlock-secret"))t.addEventListener("click",()=>r(t.getAttribute("secret-id")));for(let t of document.querySelectorAll("button.lock-secret"))t.addEventListener("click",()=>o(t.getAttribute("secret-id")))}function z(e){A("/api/plugins/netbox_secretstore/get-session-key/",{private_key:e}).then(r=>{if(!f(r))d("success","Session Key Received","You may now unlock secrets.").show();else{let o=r.error;x(r)&&(o+=`
${r.exception}`),d("danger","Failed to Retrieve Session Key",o).show()}})}function J(){for(let e of document.querySelectorAll("#request_session_key")){let r=function(){for(let o of document.querySelectorAll("#user_privkey"))z(o.value),o.value=""};e.addEventListener("click",r)}}function X(){let e=new window.Modal("#privkey_modal");function r(o){document.cookie.indexOf("session_key")===-1&&(o.preventDefault(),e.show())}for(let o of document.querySelectorAll(".requires-session-key")){let t=o.closest("form");t!==null&&t.addEventListener("submit",r)}}function w(){for(let e of[G,N,J,X])e()}document.readyState!=="loading"?w():document.addEventListener("DOMContentLoaded",w);})();
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=/static/netbox_secretstore/secrets.js.map
