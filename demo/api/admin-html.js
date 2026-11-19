const { getSide, upsertSide } = require('../src/supabase-content');
const { send, auth, body } = require('../src/vercel-utils');
module.exports = async (req,res) => {
  const a=auth(req); if(!a.ok) return send(res,a.status,{error:a.error});
  const url=new URL(req.url,'https://local.invalid'); const side=url.searchParams.get('side')==='gai'?'gai':'nam';
  if(req.method==='GET') return send(res,200,{ok:true,side});
  if(req.method!=='PUT') return send(res,405,{error:'Method Not Allowed'});
  try {
    const action=String(req.headers['x-admin-action']||'');
    const row=await getSide(side); const content={...(row?.content||{})};
    if(action==='undo') {
      if(typeof content.previousHtml!=='string') return send(res,400,{error:'Chưa có phiên bản trước để khôi phục.'});
      const old=content.html; content.html=content.previousHtml; content.previousHtml=old||content.previousHtml;
    } else if(action==='reset-all') {
      if(typeof content.originalHtml!=='string') return send(res,400,{error:'Chưa có bản gốc để khôi phục.'});
      content.previousHtml=content.html||''; content.html=content.originalHtml;
    } else {
      const html=await body(req,10*1024*1024);
      if(!html.includes('<html') || html.length>10*1024*1024) return send(res,400,{error:'HTML không hợp lệ hoặc vượt quá 10 MB.'});
      if(typeof content.originalHtml!=='string') content.originalHtml=html;
      if(typeof content.html==='string') content.previousHtml=content.html;
      content.html=html;
    }
    await upsertSide(side,content);
    return send(res,200,{ok:true,side,updatedAt:new Date().toISOString()});
  } catch(e) { console.error(e); return send(res,500,{error:e.message||'Không lưu được nội dung.'}); }
};
