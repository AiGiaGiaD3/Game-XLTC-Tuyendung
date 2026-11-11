// Each row is a checkpoint, with its own ordered sequence of obstacles.
// Distances are in world pixels. The route continues through each district.
const ROUTES = [
  ['Hẹn đầu phố', 1, 'Gặp xu giả rồi tập nhảy qua khe.', 'decoy gap'],
  ['Cà phê trốn lịch', 0, 'Đợi xe cà phê lăn qua rồi chạy.', 'roller steps'],
  ['Bậc thang đi học', 2, 'Dùng bậc thấp để lên bục cao.', 'steps islands'],
  ['Lịch kín mít', 1, 'Hai khe ngắn liên tiếp. Đáp xuống rồi nhảy tiếp.', 'double mail'],
  ['Giữ tối cuối tuần', 3, 'Sàn giấy sẽ rơi. Đừng đứng lại trên đó.', 'paper roller'],
  ['Hồ sơ gia đình', 1, 'Nhìn bóng dưới đất để biết hồ sơ sẽ rơi ở đâu.', 'drop double'],
  ['Lối tắt 90 ngày', 2, 'Chạy qua đệm vàng để bật qua hố.', 'spring decoy'],
  ['Tin đồn trên cầu', 1, 'Chờ chốt chặn hạ xuống trước khi băng qua.', 'pulse mail'],
  ['Cầu có nhịp', 2, 'Bắt nhịp với bục chạy ngang để qua khe dài.', 'ferry gap'],
  ['Hai xe cà phê', 0, 'Hai xe lăn ngược nhịp. Dừng ở khoảng trống giữa chúng.', 'rollers paper'],
  ['Cửa có điều kiện', 2, 'Qua bục giấy rồi canh chốt chặn cuối cầu.', 'paper pulse'],
  ['Bậc kiểm chứng', 2, 'Bục đang lên xuống. Nhảy khi bục hạ thấp.', 'lift mail'],
  ['Chuyện cũ rơi xuống', 0, 'Hai tập hồ sơ rơi ở hai điểm khác nhau.', 'drops islands'],
  ['Đường vòng', 1, 'Chọn đường trên để tránh chốt chặn hoặc chờ ở đường dưới.', 'overpass roller'],
  ['Cầu bước nhỏ', 3, 'Nhảy liên tiếp qua các đảo nhỏ.', 'islands double pulse'],
  ['Mở rộng vòng tròn', 1, 'Bục chạy ngang nối hai bờ. Chờ ở mép nếu cần.', 'ferry steps'],
  ['Bước thử đầu tiên', 2, 'Dùng đệm bật, rồi nhảy qua hai khe ngắn.', 'spring double'],
  ['Góc không chèo kéo', 0, 'Một xe lăn dưới thấp. Bục cao là đường tránh.', 'overpass drop'],
  ['Nghe trước, nói sau', 3, 'Đợi chốt hạ, rồi leo bậc lấy sao.', 'pulse steps'],
  ['Tập sự trên cao', 2, 'Bắt bục nâng rồi nhảy qua sàn giấy.', 'lift paper'],
  ['Đứng dậy đi tiếp', 1, 'Xu giả ngay sau khe. Đáp xuống trước khi tiến thêm.', 'gap decoy rollers'],
  ['Bạn đồng hành', 3, 'Đổi nhịp từ bục nâng sang bục chạy ngang.', 'lift ferry'],
  ['So đúng tiêu chí', 1, 'Có hai lối qua chốt chặn. Chọn lối hợp với mình.', 'overpass islands'],
  ['Thêm một lựa chọn', 2, 'Hai đường tắt khác nhau: đệm bật và bục chạy ngang.', 'spring ferry'],
  ['Quỹ dự phòng', 3, 'Hồ sơ rơi trước khe. Chờ rơi xong rồi nhảy.', 'drops gap pulse'],
  ['Chi phí bất ngờ', 2, 'Vừa qua bục giấy là gặp xu giả. Đáp rồi dừng một nhịp.', 'paper decoy lift'],
  ['Giữ nhịp ổn định', 1, 'Canh hai chốt chặn, sau đó nhảy qua chuỗi đảo.', 'pulses islands'],
  ['Đường nhanh chưa chắc tới', 2, 'Đệm bật đưa qua hố. Phía sau có xe lăn.', 'spring rollers pulse'],
  ['Vượt áp lực', 3, 'Đổi nhịp qua bục nâng, chốt chặn và sàn giấy.', 'lift pulse paper'],
  ['Hẹn ở cuối bến', 2, 'Chặng cuối có bục ngang, hồ sơ rơi và một cú bật xa.', 'ferry drops spring']
];

function createRoute(index) {
  const [title, step, tip, pattern] = ROUTES[index];
  const route = { title, step, tip, rise:(index%6)*128, grounds: [], platforms: [], hazards: [], papers: [], stars: [], springs: [], signs: [] };
  let x = 0;
  const floor = width => {
    const last = route.grounds.at(-1);
    if (last?.[1] === x) last[1] += width;
    else route.grounds.push([x, x + width,430]);
    x += width;
  };
  const platform = (offset, y, w, type = 'solid', amplitude = 0) => {
    route.platforms.push({x:x+offset, y, w, type, amplitude, t:0});
  };
  const hazard = (offset, type, phase = 0) => {
    route.hazards.push({x:x+offset, y:400, w:35, h:30, type, phase, active:type!=='coin', cleared:false});
  };
  const starAt = (offset, y) => route.stars.push({x:x+offset, y, got:false});
  const paperAt = offset => route.papers.push({x:x+offset, y:160, vy:0, trigger:false, gone:false});
  const signAt = (label, offset = 70) => route.signs.push({x:x+offset, label});
  const pieces = {
    tables(){signAt('BÀN CÀ PHÊ');platform(100,390,84);platform(223,355,108);starAt(270,320);floor(395);},
    booths(){signAt('LỐI GIỮA GIAN HÀNG');floor(135);platform(36,390,85,'ferry',18);platform(158,355,85);x+=270;floor(130);},
    shelves(){signAt('KỆ HỒ SƠ');platform(90,388,88);platform(190,345,85);platform(305,303,100);starAt(355,270);paperAt(450);floor(565);},
    teambridge(){signAt('CẦU ĐỒNG ĐỘI');floor(140);platform(35,395,90,'paper');platform(152,365,120,'ferry',12);x+=320;floor(150);},
    skyline(){signAt('BẬC DẪN DẮT');floor(130);platform(40,380,100,'lift',20);platform(171,331,115);starAt(230,294);x+=310;floor(150);},
    gap() { signAt('NHẢY QUA KHE'); floor(145); x+=120; floor(125); },
    double() { signAt('HAI KHE LIÊN TIẾP'); floor(145); x+=102; floor(94); x+=111; floor(115); },
    islands() {
      signAt('ĐẢO NHỎ'); floor(145);
      platform(52, 385, 96); platform(176, 349, 102);
      starAt(218, 315); x+=333; floor(140);
    },
    steps() { platform(120,380,120); platform(252,339,105); starAt(304,305); floor(409); },
    paper() {
      signAt('SÀN GIẤY SỤP'); floor(155); platform(58,385,123,'paper');
      starAt(113,351); x+=233; floor(140);
    },
    lift() {
      signAt('BỤC NÂNG'); floor(150); platform(62,365,135,'lift',27);
      x+=246; floor(140);
    },
    ferry() {
      signAt('BỤC CHẠY NGANG'); floor(150); platform(62,387,140,'ferry',26);
      x+=251; floor(135);
    },
    spring() {
      signAt('ĐỆM BẬT'); floor(155);
      route.springs.push({x:x-37,w:37}); starAt(126,196);
      x+=262; floor(145);
    },
    decoy() { hazard(170,'coin'); floor(355); },
    roller() { hazard(200,'coffee'); floor(399); },
    rollers() { hazard(190,'coffee'); hazard(409,'coffee',Math.PI); floor(601); },
    mail() { hazard(202,'mail'); floor(389); },
    pulse() { signAt('CHỐT ĐÓNG MỞ'); hazard(210,'pulse'); floor(410); },
    pulses() { signAt('HAI CHỐT ĐÓNG MỞ'); hazard(195,'pulse'); hazard(402,'pulse',.5); floor(583); },
    drop() { signAt('HỒ SƠ RƠI'); paperAt(215); floor(397); },
    drops() { signAt('HỒ SƠ RƠI'); paperAt(185); paperAt(377); floor(526); },
    overpass() {
      signAt('HAI LỐI ĐI'); platform(118,377,92); platform(215,337,135);
      hazard(261,'pulse'); starAt(270,303); floor(432);
    }
  };

  starAt(115,394);
  floor(200);
  for (const piece of (['tables','booths','shelves','teambridge','skyline'][zoneOf(index)]+' '+pattern).split(' ')) {
    const start = x;
    pieces[piece]();
    if (route.stars.length < 4 && route.grounds.some(([a,b]) => a <= x-62 && b >= x-62)) {
      starAt(Math.max(start+35,x-62),394);
    }
  }
  while (route.stars.length < 4) {
    starAt(48,394);
    floor(96);
  }
  starAt(77,394);
  floor(110);
  for(let step=1;step<=4;step++){route.grounds.push([x,x+100,430-step*32]);x+=100;}
  route.length = x;
  route.marker = x - 48;
  return route;
}

function districtFor(index) {
  const group = zoneOf(index);
  const tracks = [];
  let offset = 0;
  for (const c of CASES.filter(c => zoneOf(c.id-1) === group)) {
    const route = createRoute(c.id - 1);
    tracks.push({index:c.id-1, offset, route});
    offset += route.length;
  }
  return {tracks, width:offset+150};
}

function activateTrack(index) {
  const track = world.tracks.find(t => t.index === index);
  const {offset, route} = track;
  const shift = object => ({...object, x:object.x+offset, ...(object.y!==undefined?{y:object.y-route.rise}:{})});
  world.track = track;
  world.floor=430-route.rise;
  world.cameraY=-route.rise;
  world.missionDone=false;
  world.checkpoint = offset + 60;
  world.doorX = offset + route.marker;
  world.platforms = route.platforms.map(shift);
  world.hazards = route.hazards.map(shift);
  world.papers = route.papers.map(shift);
  world.springs = route.springs.map(shift);
  world.stars = route.stars.map(shift).slice(0,5);
  world.signs = route.signs.map(shift);
  world.time = 0;
  world.falls = 0;
  world.exitDone = false;
}

function updatePlatforms(dt) {
  for (const platform of world.platforms) {
    platform.oldX = platform.drawX ?? platform.x;
    platform.oldY = platform.drawY ?? platform.y;
    const time = world.time * (world.assist ? .7 : 1.4);
    platform.drawX = platform.x + (platform.type === 'ferry' ? Math.sin(time) * platform.amplitude : 0);
    platform.drawY = platform.y + (platform.type === 'lift' ? Math.sin(time) * platform.amplitude : 0);
    if (platform.t > 0) platform.t += dt;
  }
}

function drawRouteProps() {
  const rise=world.track.route.rise;
  for (const s of world.signs) sign(s.x, 310-rise, s.label);
  for (const spring of world.springs) {
    rr(spring.x,421-rise,spring.w,9,4,'#ffce70','#504057',2);
    text('↑',spring.x+spring.w/2,415-rise,19,'#7c4325','center');
  }
  for (const track of world.tracks) {
    const x = track.offset + track.route.marker;
    if (Math.abs(x-camera) > 1050) continue;
    ctx.save();ctx.translate(0,-track.route.rise-128);
    const passed = track.index < level || (track.index === level && world.exitDone);
    rr(x-16,345,67,85,12,passed?'#d6eadb':'#fff5dc','#364052',2);
    rr(x-9,353,53,27,6,passed?'#6e9e84':'#eea856');
    text(passed?'ĐÃ QUA':('TRẠM '+String(track.index+1).padStart(2,'0')),x+18,370,9,'#253049','center');
    hero(x+18,389,.67,-1,0,true);
    ctx.restore();
  }
}

function physics(dt) {
  const w = world, p = player;
  w.time += dt;
  w.invuln = Math.max(0, w.invuln - dt);
  updatePlatforms(dt);
  const input = Number(!!(keys.ArrowRight || keys.KeyD)) - Number(!!(keys.ArrowLeft || keys.KeyA));
  p.vx = input * (w.assist ? 255 : 285);
  if (input) p.face = input;
  const support = p.support;
  if (p.ground && support && support.t < .65) {
    p.x += support.drawX - support.oldX;
    p.y += support.drawY - support.oldY;
  }
  p.coyote = p.ground ? .10 : Math.max(0, p.coyote-dt);
  if (jumpQueued && p.coyote > 0) {
    p.vy = w.assist ? -660 : -605;
    p.boost = false;
    p.ground = false;
    p.coyote = 0;
    tone('jump');
  }
  jumpQueued = false;
  const held = keys.Space || keys.ArrowUp || keys.KeyW;
  p.vy += (p.vy < 0 && !held && !p.boost ? 2650 : 1700) * dt;
  const oldBottom = p.y + p.h;
  p.x = Math.max(Math.max(0,w.track.offset-125), Math.min(w.width-p.w, p.x+p.vx*dt));
  // Solid stair risers prevent walking through a higher career step.
  if(input>0)for(const [a,b,y] of w.grounds){
    if(p.x+p.w>a && p.x<a && oldBottom>y+4 && p.y<y+110)p.x=a-p.w;
  }
  p.y += p.vy * dt;
  p.ground = false;
  p.support = null;

  const surfaces = w.grounds.filter(([a,b]) => p.x+p.w > a && p.x < b)
    .map(([a,b,y]) => ({x:a, w:b-a, y}));
  for (const platform of w.platforms.filter(s => s.t < .65)) {
    surfaces.push({x:platform.drawX, y:platform.drawY, w:platform.w, platform});
  }
  surfaces.sort((a,b) => a.y-b.y);
  if (p.vy >= 0) {
    for (const surface of surfaces) {
      if (p.x+p.w <= surface.x || p.x >= surface.x+surface.w) continue;
      if (oldBottom > (surface.platform?.oldY ?? surface.y) + 4 || p.y+p.h < surface.y) continue;
      p.y = surface.y-p.h;
      p.vy = 0;
      p.ground = true;
      p.boost = false;
      p.support = surface.platform || null;
      if (p.support?.type === 'paper' && p.support.t === 0) {
        p.support.t = .001;
        say('Sàn giấy đang rung. Nhảy tiếp thôi!',3);
      }
      if (!p.support && w.springs.some(s => p.x+18 >= s.x && p.x+18 < s.x+s.w)) {
        p.vy = -980;
        p.boost = true;
        p.ground = false;
        p.coyote = 0;
        tone('jump');
      }
      break;
    }
  }
  if (p.y > w.floor+170) { hurt(); return; }
  for (const star of w.stars) {
    if (!star.got && Math.hypot(p.x+14-star.x,p.y+24-star.y)<35) {
      star.got = true;
      burst(star.x,star.y);
      tone();
      hud();
    }
  }
  for (const hazard of w.hazards) {
    if (hazard.cleared) continue;
    const pace = w.assist ? .67 : 1;
    let x = hazard.x;
    if (hazard.type === 'coffee') x += Math.sin(w.time*1.65*pace + hazard.phase)*69;
    if (hazard.type === 'mail') x += Math.sin(w.time*1.3*pace)*45;
    if (hazard.type === 'pulse') {
      const phase = (w.time*pace/2.9+hazard.phase)%1;
      hazard.active = phase>.25 && phase<.61;
      hazard.warning = phase>.14 && phase<=.25;
    }
    if (hazard.type === 'coin' && !hazard.active && Math.abs(p.x-hazard.x)<105) {
      hazard.active = true;
      say('Xu này không để nhặt. Nó để… né!',3);
    }
    hazard.drawX = x;
    if (hazard.active && collide(p,{x:x+3,y:hazard.y+4,w:hazard.w-6,h:hazard.h-4})) {
      hurt(hazard);
      if (state !== 'play') return;
    }
  }
  for (const paper of w.papers) {
    if (!paper.trigger && Math.abs(p.x-paper.x)<129) {
      paper.trigger = true;
      paper.fallAt = w.time+.32;
      say('Hồ sơ rơi! Nhìn bóng dưới đường.',3);
    }
    if (!paper.trigger || paper.gone || w.time<paper.fallAt) continue;
    paper.vy += 740*dt;
    paper.y += paper.vy*dt;
    if (paper.y>w.floor+40) paper.gone = true;
    if (collide(p,{x:paper.x,y:paper.y,w:38,h:33})) {
      hurt();
      if (state !== 'play') return;
    }
  }
  if (p.x+14 >= w.doorX-12 && p.y+p.h <= w.floor-120 && !w.exitDone) {
    if(!w.missionDone) openMission(); else ask(level,w.track.route.step,'exit');
    return;
  }
  w.cameraY += (Math.min(-w.track.route.rise,p.y-325)-w.cameraY)*Math.min(1,dt*6);
  camera += (Math.max(0,Math.min(w.width-960/viewZoom(),p.x-280/viewZoom()))-camera)*Math.min(1,dt*8);
  w.particles = w.particles.filter(a=>a.t>0);
  for (const a of w.particles) {
    a.x += a.vx*dt;
    a.y += a.vy*dt;
    a.vy += 350*dt;
    a.t -= dt;
  }
  $('#hint').textContent = clock<w.messageUntil ? w.message : w.track.route.tip;
}
