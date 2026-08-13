
(function(){
  'use strict';
  var KEY='footballHQLocalDraftChatV29';

  function read(){try{var x=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(x)?x:[]}catch(e){return []}}
  function write(items){try{localStorage.setItem(KEY,JSON.stringify(items.slice(-100)));return true}catch(e){return false}}
  function filtered(value){
    var words=['fuck','fucking','fucked','fucker','shit','shitty','bitch','bitches','asshole','dick','cunt','motherfucker','motherfucking','bastard','slut','whore','retard','retarded'];
    var out=String(value||'');
    words.sort(function(a,b){return b.length-a.length;}).forEach(function(word){
      var safe=word.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      out=out.replace(new RegExp('(^|[^a-z0-9])('+safe+')(?=$|[^a-z0-9])','gi'),function(_,pre){return pre+'***'});
    });
    return out;
  }
  function row(message){
    var r=document.createElement('div');r.className='chat-message';
    var n=document.createElement('span');n.className='chat-name';n.textContent=message.name||'You';
    var b=document.createElement('span');b.className='chat-text';b.textContent=message.text||'';
    var t=document.createElement('span');t.className='chat-time';t.textContent=new Date(message.at||Date.now()).toLocaleTimeString([], {hour:'numeric',minute:'2-digit'});
    r.appendChild(n);r.appendChild(b);r.appendChild(t);return r;
  }
  function paint(){
    var box=document.getElementById('draftChatMessages'),mode=document.getElementById('draftChatMode');
    if(!box)return;
    if(mode&&/private room/i.test(mode.textContent||''))return;
    var items=read();box.innerHTML='';
    if(!items.length){var empty=document.createElement('div');empty.className='chat-empty';empty.textContent='No messages yet. Say something to your draft room.';box.appendChild(empty);return}
    items.forEach(function(m){box.appendChild(row(m))});box.scrollTop=box.scrollHeight;
  }
  function status(msg,bad){
    var el=document.getElementById('draftChatSaveStatus');if(!el)return;
    el.textContent=msg||'';el.style.color=bad?'#ff7777':'#77c999';
    clearTimeout(status._t);status._t=setTimeout(function(){if(el)el.textContent=''},1400);
  }
  function send(){
    var input=document.getElementById('draftChatInput'),mode=document.getElementById('draftChatMode');if(!input)return false;
    if(mode&&/private room/i.test(mode.textContent||'')){
      if(typeof window.fhqSendDraftChatFromUI==='function')return window.fhqSendDraftChatFromUI();
      status('Private Room chat is not ready yet.',true);return false;
    }
    var raw=String(input.value||'').trim().slice(0,220);if(!raw)return false;
    var item={id:'local-'+Date.now()+'-'+Math.random().toString(36).slice(2,7),name:'You',text:filtered(raw),at:Date.now()};
    var items=read();items.push(item);
    if(!write(items)){status('Could not save message.',true);return false}
    input.value='';paint();status('Message sent',false);return true;
  }

  document.addEventListener('click',function(event){
    var btn=event.target&&event.target.closest?event.target.closest('#draftChatSendBtn'):null;
    if(!btn)return;
    event.preventDefault();event.stopImmediatePropagation();send();
  },true);

  document.addEventListener('keydown',function(event){
    if(event.key!=='Enter'||!event.target||event.target.id!=='draftChatInput')return;
    event.preventDefault();event.stopImmediatePropagation();send();
  },true);

  document.addEventListener('click',function(event){
    var open=event.target&&event.target.closest?event.target.closest('#chatToggleBtn'):null;
    if(open)setTimeout(paint,0);
  },true);

  window.FHQ_CHAT_RESCUE={send:send,paint:paint,read:read};
  setTimeout(paint,250);
})();


(function(){
  function v51BindMobileNav(){
    const btn=document.getElementById('fhqMobileMenuBtn');
    const scrim=document.getElementById('fhqMobileScrim');
    const logo=document.getElementById('fhqMobileLogo');

    function closeMenu(){
      document.body.classList.remove('fhq-mobile-menu-open');
    }
    function toggleMenu(){
      document.body.classList.toggle('fhq-mobile-menu-open');
    }

    if(btn){
      btn.onclick=function(e){
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
      };
    }
    if(scrim) scrim.onclick=closeMenu;

    if(logo){
      logo.onclick=function(){
        closeMenu();
        if(typeof openFootballHQSection==='function') openFootballHQSection('home');
      };
    }

    document.querySelectorAll('#fhqSidebar [data-fhq-nav]').forEach(function(el){
      el.addEventListener('click',closeMenu);
    });

    /* V55: do not close based on window.innerWidth.
       Apps Script on iPhone can report a desktop-sized CSS viewport. */
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',v51BindMobileNav,{once:true});
  }else{
    v51BindMobileNav();
  }
})();



(function(){
  function enforceFootballHQMobileDevice(){
    try{
      var ua=navigator.userAgent||'';
      var phoneUA=/iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry|IEMobile|Opera Mini/i.test(ua);
      var touchPhone=(navigator.maxTouchPoints||0)>1 && Math.min(screen.width||9999,screen.height||9999)<=900;
      if(phoneUA||touchPhone){
        document.body.classList.add('fhq-mobile-device');
      }
    }catch(e){}
  }
  enforceFootballHQMobileDevice();
  window.addEventListener('pageshow',enforceFootballHQMobileDevice);
  window.addEventListener('orientationchange',function(){setTimeout(enforceFootballHQMobileDevice,50)});
})();



(function(){
  document.addEventListener('click',function(e){
    var nav=e.target&&e.target.closest?e.target.closest('#fhqSidebar [data-fhq-nav]'):null;
    if(nav && document.body.classList.contains('fhq-mobile-device')){
      closeFootballHQMobileMenu();
    }
  },true);
})();

