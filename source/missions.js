// Fictional micro-challenges supplement the unchanged 30 source cases.
const MISSION_DATA = [
 ['Lịch của Minh','Điều gì đang chiếm thời gian?', ['Đón con mỗi chiều','Muốn học vào buổi sáng','Ảnh đại diện rất đẹp'],[0,1]],
 ['Tách cà phê còn nóng','Điều gì cần hỏi trước khi hẹn lại?', ['Muốn hiểu việc hằng ngày','Chưa rõ cần học những gì','Đã gọi thêm bánh'],[0,1]],
 ['Cuốn lịch bốn ngày','Tìm hai manh mối về việc học.', ['Lịch học trùng ca làm','Cần biết lịch học chính thức','Thích ngồi gần cửa'],[0,1]],
 ['Một tuần của Linh','Tìm hai dữ kiện về quỹ thời gian.', ['Chỉ rảnh sáng thứ Bảy','Chưa tính thời gian chăm khách','Uống cà phê ít đá'],[0,1]],
 ['Cuộc hẹn cuối tuần','Điều gì ứng viên muốn giữ?', ['Buổi tối bên con','Chủ động sắp xếp lịch','Một chiếc cặp mới'],[0,1]],
 ['Bàn cà phê gia đình','Tìm điều cần hiểu thêm.', ['Người thân lo thu nhập','Muốn cùng gia đình tìm hiểu','Thích quán có cây xanh'],[0,1]],
 ['Gian hàng nghề nghiệp','Sẵn sàng tìm hiểu', ['Đặt câu hỏi về lộ trình học','Nói sẽ thử vì đang rảnh','Có nhiều người theo dõi'],0],
 ['Bảng tin nhiều chiều','Biết kiểm chứng', ['Chia sẻ ngay mọi tin nóng','Đề nghị xem nguồn chính thức','Khẳng định không bao giờ sai'],1],
 ['Đường dài sự nghiệp','Tinh thần học hỏi', ['Tìm hiểu việc thực tế trước khi chọn','Hứa ở lại mãi dù chưa hiểu việc','Chỉ hỏi quà tặng'],0],
 ['Vòng tròn quan hệ','Tôn trọng người khác', ['Ép người thân ủng hộ','Gửi tin nhắn hàng loạt','Hỏi sự đồng ý trước khi tư vấn'],2],
 ['Quầy giải đáp','Chủ động làm rõ', ['Hỏi rõ điều kiện tham gia','Ký mọi giấy cho nhanh','Đồng ý vì ngại hỏi'],0],
 ['Hồ sơ cần xác minh','Tư duy có trách nhiệm', ['Hứa mọi hồ sơ đều chi trả','Muốn học điều khoản và giới hạn','Chỉ chọn thông tin dễ nghe'],1],
 ['Chuyện cũ ở bàn phỏng vấn','Bạn có thể kể điều gì đã xảy ra?', 'Lần trước thông tin giải thích khác với trải nghiệm của tôi.','Điểm nào bạn muốn được làm rõ trước khi cân nhắc tiếp?'],
 ['Lần thử trước','Điều gì ở lần trước khiến bạn thấy không hợp?', 'Tôi thiếu người hướng dẫn lúc bắt đầu.','Bạn cần sự hỗ trợ cụ thể như thế nào?'],
 ['Ánh nhìn người quen','Bạn lo ai sẽ nghĩ như vậy và vì sao?', 'Tôi sợ bạn cũ nghĩ mình thất bại.','Điều gì trong công việc khiến bạn tự thấy có ý nghĩa?'],
 ['Danh bạ ít tên','Bạn đang hình dung tìm khách hàng như thế nào?', 'Tôi nghĩ phải có sẵn rất nhiều người quen.','Bạn muốn tìm hiểu cách xây quan hệ mới ra sao?'],
 ['Nỗi sợ chưa gọi tên','Phần việc nào khiến bạn lo nhất?', 'Tôi chưa biết bắt đầu và học từ đâu.','Bước thử nhỏ nào giúp bạn tự đánh giá được?'],
 ['Hai chữ bán hàng','Điều gì trong việc bán hàng làm bạn không thích?', 'Tôi không muốn làm phiền hoặc ép ai mua.','Bạn cảm thấy thế nào với việc hỏi nhu cầu và tôn trọng quyết định?'],
 ['Không cần nói liên tục', ['Lắng nghe và đặt câu hỏi có thể luyện','Cứ nói nhiều là thành công','Cần cơ hội thực hành','Phải nói hay ngay từ đầu'],[0,1,0,1]],
 ['Bàn học của đội', ['Có thể học kiến thức nền','Biết hết sau một buổi','Cần kiểm tra thông tin sản phẩm','Không cần học thêm'],[0,1,0,1]],
 ['Sau một lời từ chối', ['Có thể luyện cách ứng xử','Không bao giờ bị từ chối','Tôn trọng quyền nói không','Cứ kiên trì ép là được'],[0,1,0,1]],
 ['Bảng hỗ trợ tuần đầu', ['Làm rõ người hỗ trợ và lịch hẹn','Quản lý làm thay mọi việc','Trao đổi cách phản hồi','Luôn có người trực 24/7'],[0,1,0,1]],
 ['Hai cơ hội trên bàn', ['So sánh tiêu chí cùng phạm vi','Chỗ này tốt nhất mọi mặt','Đối chiếu chính sách chính thức','Nghe lời đồn là đủ'],[0,1,0,1]],
 ['Giữ việc hay đổi việc', ['Cân nhắc mục tiêu cá nhân','Nghỉ việc ngay mới quyết tâm','Tìm hiểu trước khi quyết định','Chắc chắn tốt hơn hiện tại'],[0,1,0,1]],
 ['Người dẫn dắt biết nói rõ','Minh bạch về điều kiện làm việc', ['Hà: hỏi rõ khác biệt phúc lợi trước khi trao đổi với đội','An: hứa phúc lợi giống mọi công ty','Bình: né câu hỏi về quyền lợi'],0],
 ['Chọn người giữ niềm tin','Kiểm chứng chi phí', ['Hà: nói không có phí dù chưa kiểm tra','An: tìm thông tin chính thức và giải thích từng khoản','Bình: bảo cứ nộp tiền rồi tính'],1],
 ['Người đồng hành đường dài','Tôn trọng mức chịu rủi ro', ['Hà: hứa thu nhập cố định','An: cho rằng lo tài chính là yếu','Bình: cùng làm rõ cơ chế và khả năng dự phòng'],2],
 ['Tuyển đúng thời điểm','Biết khi nào nên chậm lại', ['Hà: không thúc gia nhập khi nhu cầu thu nhập chưa phù hợp','An: hứa tiền về ngay','Bình: khuyên bỏ qua chi phí sinh hoạt'],0],
 ['Người giữ nhịp cho đội','Huấn luyện có trách nhiệm', ['Hà: chỉ tăng chỉ tiêu','An: cùng lập kế hoạch hoạt động và điểm hỗ trợ','Bình: so sánh để gây xấu hổ'],1],
 ['Ghế dẫn dắt cuối cùng','Trung thực về thu nhập', ['Hà: lấy người giỏi nhất làm mức chắc chắn','An: nói càng cao càng dễ tuyển','Bình: giải thích cơ chế, biến động và điều kiện thực tế'],2]
];
let mission=null;
function openMission(){
 state='mission';resetKeys();mission={i:level,phase:0,selected:[],revealed:[],sort:[],tokens:[0,0,0],chosen:null,order:[0,1,2].sort(()=>Math.random()-.5)};renderMission();
}
function missionDone(){world.missionDone=true;closeModal();ask(level,world.track.route.step,'exit')}
function renderMission(message=''){
 const priorScroll=$('#modal').scrollTop;const active=document.activeElement;const focusedKey=active?.getAttribute?.('data-clue')!=null?'clue':active?.getAttribute?.('data-sort')!=null?'sort':active?.getAttribute?.('data-budget')!=null?'budget':null;const focusedValue=focusedKey?active.getAttribute('data-'+focusedKey):null;
 const m=mission,d=MISSION_DATA[m.i],z=zoneOf(m.i),zone=ZONES[z];
 let body='';
 if(z===0)body=`<p>Lật từng vật trên bàn, rồi chọn <b>2 manh mối</b> giúp hiểu động lực. Chi tiết trang trí có thể đánh lạc hướng!</p><div class="clue-grid">${m.order.map(j=>`<button class="clue ${m.selected.includes(j)?'selected':''}" data-clue="${j}" aria-pressed="${m.selected.includes(j)}"><span>${['▤','☕','✉'][j]}</span>${m.revealed.includes(j)?esc(d[2][j]):'Chạm để khám phá'}</button>`).join('')}</div><p class="muted">${d[1]} · Đã chọn ${m.selected.length}/2</p><button class="btn yellow" id="checkMission">Nối các manh mối →</button>`;
 if(z===1)body=`<p>Gắn huy hiệu <b>“${d[1]}”</b> vào bằng chứng phù hợp. Đây là dấu hiệu để hỏi thêm, chưa đủ để kết luận về một người.</p><div class="evidence-board">${m.order.map(j=>`<button class="evidence" data-pick="${j}"><span>HỒ SƠ ${j+1}</span>${esc(d[2][j])}<small>Gắn huy hiệu ở đây ↗</small></button>`).join('')}</div>`;
 if(z===2){const answers=m.phase===0?[d[1],'Bạn cứ tham gia rồi sẽ thấy ổn thôi.','Vậy mình ký đăng ký trước nhé?']:[d[3],'Mình không cần nhắc chuyện đó nữa.','Bạn phải quyết định ngay hôm nay.'];body=`<div class="chat-thread">${m.phase?`<div class="bubble mine">${esc(d[1])}</div>`:''}<div class="bubble">${m.phase===0?esc(CASES[m.i].q):esc(d[2])}</div></div><p><b>Lượt ${m.phase+1}/2.</b> ${m.phase?'Đi theo điều vừa nghe được.':'Mở câu hỏi để ứng viên kể thêm.'}</p><div class="options">${m.order.map(j=>`<button class="option" data-chat="${j}">${esc(answers[j])}</button>`).join('')}</div>`}
 if(z===3)body=`<p>Phân 4 thẻ vào hai ngăn: <b>có thể cùng làm rõ</b> hoặc <b>kỳ vọng cần điều chỉnh</b>. Chạm để đổi ngăn; không cần kéo thả.</p><div class="sorting-board">${d[1].map((v,j)=>`<div class="sort-card"><b>${esc(v)}</b><div class="choice">${['Cùng làm rõ','Cần điều chỉnh'].map((label,k)=>`<button class="${m.sort[j]===k?'active':''}" data-sort="${j}-${k}" aria-pressed="${m.sort[j]===k}">${label}</button>`).join('')}</div></div>`).join('')}</div><button class="btn yellow" id="checkMission">Chốt bảng kỳ vọng →</button>`;
 if(z===4&&m.phase===0)body=`<div class="criterion">TIÊU CHÍ CỦA HỘI ĐỒNG<br><b>${d[1]}</b></div><p>Chọn người thể hiện tiêu chí này qua <b>hành động</b>. Các hồ sơ dưới đây là tình huống giả định trong game.</p><div class="candidate-board">${m.order.map(j=>`<button class="candidate" data-pick="${j}"><span>${['◈','◇','✦'][j]}</span>${esc(d[2][j])}<small>Mời vào vòng tìm hiểu tiếp →</small></button>`).join('')}</div>`;
 if(z===4&&m.phase===1)body=`<div class="criterion">ĐÃ CHỌN NGƯỜI · GIỜ CHỌN CÁCH ĐỒNG HÀNH<br><b>Phân bổ 3 buổi hỗ trợ</b></div><p>Đội cần ít nhất một buổi <b>${['hiểu điều kiện làm việc','kiểm chứng chi phí','lập kế hoạch tài chính cá nhân','đánh giá thời điểm phù hợp','huấn luyện theo hoạt động','hiểu cơ chế thu nhập'][m.i%6]}</b> và một buổi thực hành phản hồi. Chạm + / − để xếp lịch.</p><div class="sorting-board">${['Làm rõ vấn đề trọng tâm','Thực hành và phản hồi','Gặp gỡ toàn đội'].map((label,j)=>`<div class="sort-card"><b>${label}</b><div class="choice"><button data-budget="${j}:-1" aria-label="Giảm ${label}">−</button><strong>${m.tokens[j]}</strong><button data-budget="${j}:1" aria-label="Tăng ${label}">+</button></div></div>`).join('')}</div><p>Còn ${3-m.tokens.reduce((a,b)=>a+b,0)} buổi chưa phân bổ.</p><button class="btn yellow" id="approvePlan">Duyệt kế hoạch đồng hành →</button>`;
 modal(head(`NẤC ${m.i+1}/30 · ${zone.topic}`,d[0],false)+`<div class="mission mission-${z}">${body}</div><p class="mission-feedback" aria-live="polite">${message}</p><p class="setting-help">Mini-game giả định bổ sung. Sau nhiệm vụ là tình huống nguyên bản trong sổ tay.</p><button class="iconbtn" id="leaveMission">Tạm về sảnh</button>`);
 if(focusedKey){$('#modal').scrollTop=priorScroll;const f=$(`[data-${focusedKey}="${focusedValue}"]`);if(f)f.focus({preventScroll:true})}
 $('#leaveMission').onclick=goHome;
 const feedback=()=>{tone('wrong');renderMission('Chưa khớp rồi. Đọc lại dấu hiệu và thử cách khác nhé!')};
 document.querySelectorAll('[data-clue]').forEach(b=>b.onclick=()=>{const j=+b.dataset.clue;if(!m.revealed.includes(j))m.revealed.push(j);else if(m.selected.includes(j))m.selected=m.selected.filter(v=>v!==j);else if(m.selected.length<2)m.selected.push(j);renderMission()});
 document.querySelectorAll('[data-pick]').forEach(b=>b.onclick=()=>{if(+b.dataset.pick===d[3]){if(z===4){m.phase=1;m.chosen=+b.dataset.pick;renderMission()}else missionDone()}else feedback()});
 document.querySelectorAll('[data-chat]').forEach(b=>b.onclick=()=>{if(+b.dataset.chat!==0)return feedback();if(m.phase===1)missionDone();else{m.phase++;renderMission()}});
 document.querySelectorAll('[data-sort]').forEach(b=>b.onclick=()=>{const [j,k]=b.dataset.sort.split('-').map(Number);m.sort[j]=k;renderMission()});
 document.querySelectorAll('[data-budget]').forEach(b=>b.onclick=()=>{const [j,k]=b.dataset.budget.split(':').map(Number);if(k<0&&m.tokens[j]>0)m.tokens[j]--;if(k>0&&m.tokens.reduce((a,b)=>a+b,0)<3)m.tokens[j]++;renderMission()});
 if(z===4&&m.phase===1)$('#approvePlan').onclick=()=>{if(m.tokens.reduce((a,b)=>a+b,0)===3&&m.tokens[0]>=1&&m.tokens[1]>=1)missionDone();else{tone('wrong');renderMission('Cần dùng đủ 3 buổi và ưu tiên cả vấn đề trọng tâm lẫn thực hành phản hồi.')}};
 if(z===0||z===3)$('#checkMission').onclick=()=>{const ok=z===0?m.selected.length===2&&d[3].every(j=>m.selected.includes(j)):d[2].every((k,j)=>m.sort[j]===k);if(ok)missionDone();else feedback()};
}

MISSION_DATA.forEach((d,i)=>ROUTES[i][0]=d[0]);
