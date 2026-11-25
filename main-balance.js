/* Main composition and natural photographic cup assembly. */
const beforeHeroBalance=home;
home=function(){return beforeHeroBalance().replace('<div class="hero-sticker">한 컵에 미니 세 스쿱<strong>2,500<span>원</span></strong><span>작은 취향, 가벼운 가격</span></div>',`<div class="hero-sticker serving-card"><div class="serving-scoops" aria-hidden="true">${[0,6,13].map(i=>img(i,'',false)).join('')}</div><span class="serving-kicker">SMALL SCOOPS, LITTLE JOYS</span><h2>한 컵에<br>미니 세 스쿱</h2><p>작은 취향,<br>가벼운 가격</p><strong>2,500<span>원</span></strong><span class="serving-weight">미니 3스쿱 · 총 67g</span></div>`);};
const scoopBoundsCache=new WeakMap();
function scoopBounds(im){if(scoopBoundsCache.has(im))return scoopBoundsCache.get(im);const t=document.createElement('canvas');t.width=im.naturalWidth;t.height=im.naturalHeight;const tc=t.getContext('2d',{willReadFrequently:true});tc.drawImage(im,0,0);const d=tc.getImageData(0,0,t.width,t.height).data;let l=t.width,r=0,top=t.height,b=0;for(let yy=0;yy<t.height;yy+=2)for(let xx=0;xx<t.width;xx+=2)if(d[(yy*t.width+xx)*4+3]>50){l=Math.min(l,xx);r=Math.max(r,xx);top=Math.min(top,yy);b=Math.max(b,yy)}const box=[l,top,Math.max(1,r-l+2),Math.max(1,b-top+2)];scoopBoundsCache.set(im,box);return box;}
paintSharedCupLayer=async function(c,ids,x,y,size){const photo=recipePhoto(ids);if(photo){drawContain(c,await loadImage(photo),x,y,size,size);return;}const [vessel,...scoops]=await Promise.all([loadImage('assets/empty-serving-cup-v2.png'),...ids.map(i=>loadImage(flavors[i].image))]);c.save();c.translate(x,y);c.scale(size/1254,size/1254);c.drawImage(vessel,0,0,1254,1254);
const seats=[[180,325,460,435],[614,325,460,435],[415,450,440,425]];
scoops.forEach((im,i)=>{const [sx,sy,sw,sh]=scoopBounds(im);const [dx,dy,dw,dh]=seats[i];c.save();c.shadowColor='#33251e25';c.shadowBlur=12;c.shadowOffsetY=10;c.drawImage(im,sx,sy,sw,sh,dx,dy,dw,dh);c.restore();});
c.save();c.beginPath();c.moveTo(117,529);c.bezierCurveTo(160,646,350,751,627,760);c.bezierCurveTo(905,751,1095,646,1137,529);c.lineTo(1254,1254);c.lineTo(0,1254);c.closePath();c.clip();c.drawImage(vessel,0,0,1254,1254);c.restore();c.restore();};
const beforeComicRestore=robotPage;
robotPage=function(){let html=beforeComicRestore();let comic=originStory();comic=comic.slice(0,comic.indexOf('<form id="bear-name-form"'))+'</section>';return html.replace('<section class="name-campaign">',comic+'<section class="name-campaign">');};
render();

/* Nov 25 robot story/event content. Keep existing nodes and measurement hooks. */
const beforeRobotEventRefresh=robotPage;
robotPage=function(){
 const template=document.createElement('template');template.innerHTML=beforeRobotEventRefresh();
 const root=template.content.querySelector('.robot-intro-page');if(!root)return template.innerHTML;
 root.classList.add('robot-event-page');
 const story=root.querySelector('.robot-origin'),heading=root.querySelector('.page-head'),stage=root.querySelector('.bear-peek-stage'),bio=root.querySelector('.bear-biography'),campaign=root.querySelector('.name-campaign'),form=root.querySelector('#bear-name-form');
 if(!story||!campaign||!form)return template.innerHTML;
 // The page header remains available to existing selectors and assistive technology.
 heading?.classList.add('sr-only');
 if(story)root.insertBefore(story,root.firstChild);
 campaign.classList.add('robot-event-campaign');
 const prize=campaign.querySelector('.campaign-prize');
 prize.querySelector('h2').innerHTML='국내 최초 아기 로봇곰 알바생,<br>이름을 지어주세요!';
 prize.insertAdjacentHTML('afterbegin','<span class="eyebrow event-kicker">EVENT</span>');
 prize.insertAdjacentHTML('afterend','<div class="event-rewards"><span>선결제 카드 1만원권 · 1명</span><span>참여만 해도 20% 할인 쿠폰</span></div>');
 if(bio){
  const title=bio.querySelector('h2');title.textContent='딱딱한 아이스크림도 술술 푸는 스쿠로보의 에이스. 그런데 아직 이름이 없어요.';
  const paragraphs=bio.querySelectorAll('p');
  paragraphs[0].textContent='여러분이 지어준 이름이 아기 로봇곰의 명찰에 새겨져요.';
  // Existing biography nodes and attributes are retained; redundant paragraphs are visually hidden.
  for(const el of [...paragraphs].slice(1))el.classList.add('sr-only');
  campaign.insertBefore(bio,form);
 }
 if(stage){campaign.insertBefore(stage,form);stage.insertAdjacentHTML('beforeend','<a class="btn bear-work-link" href="#/store"><span aria-hidden="true">▶</span> 열일하는 아기곰 만나러 가기</a>');}
 const campaignPs=[...campaign.children].filter(el=>el.tagName==='P');for(const el of campaignPs)el.classList.add('sr-only');
 form.insertAdjacentHTML('beforebegin','<dl class="event-details"><div><dt>선물</dt><dd>마음에 쏙 드는 이름 1명 · 선결제 카드 1만원권</dd></div><div><dt>모두</dt><dd>참여한 모든 분께 20% 할인 쿠폰</dd></div><div><dt>발표</dt><dd>뽑힌 이름은 아기 로봇곰 명찰에 새겨져요</dd></div></dl>');
 const label=form.querySelector('label[for="bear-name"]');label.classList.remove('sr-only');
 // Preserve the original label class token even while making it visible in this scoped layout.
 label.classList.add('sr-only','event-visible-label');
 form.querySelector('#bear-name').placeholder='예: 스쿱이';
 const submit=form.querySelector('button[type="submit"]');submit.textContent='응모하고 20% 할인 쿠폰 받기';
 submit.insertAdjacentHTML('beforebegin','<label class="event-instagram-label" for="bear-instagram">당첨 연락받을 인스타 아이디</label><input id="bear-instagram" name="bear-instagram" type="text" maxlength="31" placeholder="@아이디" autocomplete="off" pattern="@?[A-Za-z0-9._]{1,30}" title="영문·숫자·마침표·밑줄로 인스타그램 아이디를 입력해주세요." required><label class="event-consent" for="bear-consent"><input id="bear-consent" name="bear-consent" type="checkbox" required><span>당첨 안내(DM)를 위해 이벤트 종료까지 인스타 아이디 보관에 동의해요.</span></label>');
 form.querySelector('h3')?.classList.add('sr-only');
 const disclaimer=form.querySelector('.fine');disclaimer.textContent='브랜드 세계관 속 창작 설정이며 실제 로봇 성능·국내 최초 여부를 검증한 내용은 아닙니다. 프로토타입 응모 체험으로, 입력한 이름과 아이디는 이 브라우저에만 저장되고 실제 응모 접수·DM 발송·경품 및 할인 쿠폰 지급은 진행되지 않아요.';
 campaign.append(disclaimer);
 form.querySelector('#bear-name-status').classList.add('event-result');
 form.insertAdjacentHTML('afterend','<div class="event-next-links"><a class="text-link" href="#/menu">아기 로봇곰과 맛 골라보기</a><a class="text-link" href="#/store">매장 둘러보기</a></div>');
 return template.innerHTML;
};
document.addEventListener('submit',event=>{
 if(event.target.id!=='bear-name-form')return;
 const form=event.target;if(!form.checkValidity())return;
 const current=read('scooprovo.bear-name.demo',{});
 save('scooprovo.bear-name.demo',{...current,instagram:form.querySelector('#bear-instagram').value.trim(),consent:true,at:Date.now()});
 // Personal input stays in browser storage and is never added to dataLayer or analytics.
 document.getElementById('bear-name-status').innerHTML='<strong>응모 체험을 완료했어요.</strong><span>20% 할인 쿠폰 미리보기 · SCOOP20-DEMO</span><small>실제 사용하거나 발급받을 수 없는 체험용 쿠폰입니다.</small>';
});
render();
