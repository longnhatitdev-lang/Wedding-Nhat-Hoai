const { config, headers } = require('../src/supabase-content');
const { send, auth } = require('../src/vercel-utils');
const fs=require('node:fs'); const path=require('node:path');
module.exports=async(req,res)=>{
 const a=auth(req); if(!a.ok)return send(res,a.status,{error:a.error}); if(req.method!=='GET')return send(res,405,{error:'Method Not Allowed'});
 try {
  const {base}=config(), bucket=process.env.SUPABASE_STORAGE_BUCKET||'wedding-assets'; const images=[];
  for(const prefix of ['wed','bg','icon','music']){
   const r=await fetch(`${base}/storage/v1/object/list/${bucket}`,{method:'POST',headers:headers({'Content-Type':'application/json'}),body:JSON.stringify({prefix,limit:500,offset:0,sortBy:{column:'name',order:'asc'}})});
   if(!r.ok) { if(r.status===404) continue; throw new Error(`Không đọc được thư viện ảnh (${r.status}). Tạo bucket ${bucket} trước.`); }
   for(const f of await r.json()) if(f.name && !f.id?.endsWith('/')) images.push(`${base}/storage/v1/object/public/${bucket}/${prefix}/${f.name}`);
  }
  // Include project assets if present in the deployment bundle.
  const root=path.join(process.cwd(),'public','asset');
  function walk(dir, rel=''){ if(!fs.existsSync(dir))return; for(const e of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,e.name), r=path.posix.join(rel,e.name); if(e.isDirectory())walk(p,r); else if(/\.(png|jpe?g|webp|gif|avif|svg)$/i.test(e.name))images.push('/asset/'+r.split(path.sep).join('/'));} }
  walk(root);
  return send(res,200,{images:[...new Set(images)].sort()});
 }catch(e){return send(res,500,{error:e.message||'Không tải được thư viện.'});}
};
