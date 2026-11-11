function background(zone, cam, time) {
  const zi=ZONES.indexOf(zone);
  if(zi>0){ drawRecruitingScene(zi,zone,cam,time);return; }
  const sky = ctx.createLinearGradient(0, 0, 0, 435);
  sky.addColorStop(0, zone.sky);
  sky.addColorStop(1, '#fff0cb');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, 960, 540);
  circle(805 - cam * .035, 97, 65, '#fff0ba50');
  circle(805 - cam * .035, 97, 47, '#fff2c5');
  const drift = motion ? 0 : time * 2 % 80;
  cloud(100 + drift - cam * .08, 110, .92);
  cloud(456 + drift - cam * .08, 70, .64);
  cloud(850 + drift - cam * .08, 178, .76);
  for (let i = -1; i < 9; i++) {
    const x = i * 136 - (cam * .18) % 136;
    const y = 224 + ((i + 1) * 31 % 63);
    building(x, y, 82 + ((i + 1) % 3) * 12, 230, zone.far);
    if (i % 3 === 0) {
      line(x + 28, y - 8, x + 28, y - 26, zone.far, 2);
      line(x + 21, y - 23, x + 35, y - 23, zone.far, 2);
    }
  }
  rr(0, 394, 960, 148, 0, '#f9edda');
  line(0, 419, 960, 419, '#e4cead', 3);
  for (let i = -1; i < 5; i++) {
    const x = i * 360 - (cam * .45) % 360;
    plant(x + 66, 421, .82);
    rr(x + 45, 413, 45, 13, 4, '#b47759');
    if (i % 2 !== 0) continue;
    storefront(x + 148, zone);
  }
}

function storefront(x, zone) {
  rr(x + 7, 275, 174, 154, 10, '#403a4d22');
  rr(x, 266, 174, 162, 10, '#fff0d8', '#64576b', 2);
  rr(x + 13, 278, 148, 26, 5, zone.accent);
  text(zone.sign, x + 87, 295, 8, '#302c43', 'center');
  rr(x + 14, 338, 69, 65, 7, '#b0d3da', '#64576b');
  line(x + 48, 339, x + 48, 401, '#fff6df', 3);
  line(x + 15, 370, x + 82, 370, '#fff6df', 3);
  line(x + 22, 357, x + 37, 345, '#ffffffb0', 2);
  rr(x + 101, 338, 57, 90, 8, '#765e77', '#64576b');
  rr(x + 109, 345, 40, 51, 5, '#c9e1e1');
  circle(x + 143, 406, 3, '#ffda83');
  for (let j = 0; j < 8; j++) {
    rr(x + j * 22 - 1, 309, 22, 21, [0, 0, 5, 5], j % 2 ? '#fff8e6' : zone.awning);
  }
  rr(x + 7, 403, 82, 6, 3, '#dcb994');
}

function drawGround(x, width, zone) {
  const ground = ctx.createLinearGradient(0, 430, 0, 540);
  ground.addColorStop(0, zone.ground);
  ground.addColorStop(1, '#28354f');
  rr(x, 430, width, 110, 0, ground);
  rr(x, 430, width, 12, 4, '#ffe2a9', '#56505d', 1.5);
  line(x + 1, 446, x + width - 1, 446, '#fff0c535', 2);
  for (let tile = 21; tile + 17 < width; tile += 49) {
    rr(x + tile, 459, 17, 4, 2, '#ffffff25');
    rr(x + tile - 13, 491, 13, 4, 2, '#ffffff13');
  }
}

function drawRecruitingScene(zi,z,cam,time){
 ctx.fillStyle=z.sky;ctx.fillRect(0,0,960,540);
 if(zi===1){
  circle(820,85,46,'#fff2ce');
  for(let i=-1;i<7;i++){const x=i*210-(cam*.2)%210;line(x,115,x+210,92,'#816963',2);for(let j=0;j<5;j++){ctx.beginPath();ctx.moveTo(x+j*42,115-j*4.5);ctx.lineTo(x+j*42+22,130-j*4.5);ctx.lineTo(x+j*42+32,111-j*4.5);ctx.fillStyle=j%2?'#df946f':'#719ba0';ctx.fill()}}
  for(let i=-1;i<5;i++){const x=i*290-(cam*.4)%290;rr(x,240,240,185,4,'#fff6dd','#8d7060');rr(x-8,224,256,34,4,i%2?'#e9aa75':'#8bafb0');text(['GÓC TRẢI NGHIỆM','TÌM HIỂU NGHỀ','GẶP NGƯỜI THẬT'][((i+6)%3)],x+120,247,11,'#443a43','center');rr(x+22,307,54,78,3,'#f0ddbc');text('CV',x+49,345,23,'#a17259','center');hero(x+159,371,1,-1,0,true);rr(x+85,406,144,20,4,'#aa7963')}
 }else if(zi===2){
  rr(0,0,960,430,0,'#e1e5ee');
  for(let i=-1;i<6;i++){const x=i*236-(cam*.18)%236;rr(x+20,120,184,210,3,'#a5becf','#8395ad',4);line(x+111,120,x+111,330,'#edf0f2',5);line(x+20,220,x+204,220,'#edf0f2',5)}
  for(let i=-1;i<4;i++){const x=i*380-(cam*.4)%380;rr(x+20,348,240,18,4,'#967e6b');line(x+37,366,x+37,426,'#5b6275',8);line(x+240,366,x+240,426,'#5b6275',8);rr(x+80,317,53,31,3,'#414e65');rr(x+167,331,37,16,2,'#fff7df');plant(x+315,425,.8)}
 }else if(zi===3){
  rr(0,75,960,350,0,'#e5ecdc');
  for(let i=-1;i<4;i++){const x=i*390-(cam*.35)%390;rr(x+15,150,295,184,8,'#fff9e7','#7a9783',5);text('KẾ HOẠCH CỦA ĐỘI',x+164,177,13,'#476250','center');for(let j=0;j<6;j++){const nx=x+39+(j%3)*84,ny=200+Math.floor(j/3)*65;rr(nx,ny,65,48,2,['#eacd86','#b5cfa7','#dbb5a0'][j%3]);line(nx+10,ny+17,nx+53,ny+17,'#6e725a',2)}hero(x+105,374,1,1,0,true);hero(x+221,374,1,-1,0,true);rr(x+70,420,210,8,3,'#7b9983')}
 }else{
  const sky=ctx.createLinearGradient(0,0,0,430);sky.addColorStop(0,'#655b83');sky.addColorStop(1,'#edc9ab');ctx.fillStyle=sky;ctx.fillRect(0,0,960,430);circle(790,154,50,'#f8d9a3');for(let i=-1;i<13;i++){const x=i*100-(cam*.12)%100;building(x,260+(i%3)*23,75,200,'#766d93')}
  for(let i=-1;i<4;i++){const x=i*380-(cam*.3)%380;line(x,80,x,426,'#eee6e0',9);line(x,195,x+380,195,'#eee6e0',4);rr(x+40,359,245,15,7,'#544962');line(x+60,374,x+60,427,'#65596b',8);line(x+267,374,x+267,427,'#65596b',8);rr(x+135,327,50,31,3,'#eee4c9');text('◈',x+160,350,22,'#a08345','center')}
 }
 rr(0,428,960,112,0,z.ground+'44');
 text(z.sign,32,100,13,zi===4?'#fff0cc':'#526070');
}
function drawThemedHazard(h,x,z){
 const zi=zoneOf(level),y=h.y;
 ctx.save();ctx.translate(x+17,y+15);
 if(zi===1){rr(-16,-15,32,31,4,'#f9e9ca','#785548');text(h.type==='coin'?'?':'CV',0,5,12,'#a46750','center');circle(-11,20,4,'#44394b');circle(11,20,4,'#44394b')}
 if(zi===2){rr(-17,-16,35,31,3,'#a4b8cd','#455975');rr(-13,-21,25,9,2,'#ead6ac');line(-9,-4,10,-4,'#edf2fa',2);line(-9,5,10,5,'#edf2fa',2)}
 if(zi===3){rr(-17,-17,35,34,3,'#f1ce80','#776149');text(h.type==='coin'?'?':'!',0,7,21,'#8f6449','center');line(-13,17,13,-17,'#b77857',2)}
 if(zi===4){ctx.rotate(Math.sin(world.time*2)*.1);rr(-18,-17,36,34,5,'#5b516f','#bba071',2);text(h.type==='coin'?'?':'◈',0,8,23,'#e5c47e','center')}
 ctx.restore();
}
