'use strict';

self.addEventListener('install',event=>{
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate',event=>{
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const data=event.notification.data||{};
  const targetUrl=data.url||'./SJPT_Level5_Part4-5_32Q.html';
  event.waitUntil((async()=>{
    const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});
    for(const client of windows){
      try{
        const clientUrl=new URL(client.url);
        const target=new URL(targetUrl,self.location.origin);
        if(clientUrl.pathname===target.pathname){
          await client.focus();
          client.postMessage({type:'SJPT_ALARM_OPEN',cardId:data.cardId||null});
          return;
        }
      }catch(error){}
    }
    await self.clients.openWindow(targetUrl);
  })());
});
