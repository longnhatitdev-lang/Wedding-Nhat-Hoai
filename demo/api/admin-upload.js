const crypto=require('node:crypto');
const { config, headers }=require('../src/supabase-content');
const { send, auth, body }=require('../src/vercel-utils');
const MIME_EXT={'image/webp':'webp','audio/mpeg':'mp3','audio/mp3':'mp3','audio/ogg':'ogg','audio/wav':'wav','audio/x-wav':'wav','audio/mp4':'m4a','audio/aac':'aac'};
module.exports=async(req,res)=>{
 const a=auth(req);if(!a.ok)return send(res,a.status,{error:a.error});
 try{
  const {base}=config(),bucket=process.env.SUPABASE_STORAGE_BUCKET||'wedding-assets';
  if(req.method==='POST'){
   const data=JSON.parse(await body(req,40*1024*1024)); const match=/^data:([\w.+-]+\/[\w.+-]+);base64,([\s\S]*)$/.exec(String(data.dataUrl||'')); if(!match||!MIME_EXT[match[1]])return send(res,400,{error:'Ảnh phải được chuyển thành WebP trước khi tải lên; tệp âm thanh cần dùng định dạng được hỗ trợ.'});
   const isAudio=match[1].startsWith('audio/'), cat=isAudio?'music':['wed','bg','icon'].includes(data.cat)?data.cat:'wed'; if(!isAudio&&match[1]!=='image/webp')return send(res,415,{error:'Chỉ chấp nhận ảnh WebP đã được chuyển đổi.'}); const ext=MIME_EXT[match[1]]; const name=`${isAudio?'music':'image'}-${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${ext}`; const bytes=Buffer.from(match[2],'base64');
   if(bytes.length>30*1024*1024)return send(res,413,{error:'Tệp quá lớn (tối đa 30 MB).'});
   if(!isAudio&&(bytes.length<12||bytes.toString('ascii',0,4)!=='RIFF'||bytes.toString('ascii',8,12)!=='WEBP'))return send(res,415,{error:'Dữ liệu ảnh không phải tệp WebP hợp lệ.'});
   const up=await fetch(`${base}/storage/v1/object/${bucket}/${cat}/${name}`,{method:'POST',headers:headers({'Content-Type':match[1],'x-upsert':'false'}),body:bytes}); if(!up.ok)return send(res,502,{error:`Tải lên Storage thất bại: ${(await up.text()).slice(0,200)}. Kiểm tra bucket và SUPABASE_KEY.`});
   return send(res,201,{url:`${base}/storage/v1/object/public/${bucket}/${cat}/${name}`,format:isAudio?ext:'webp',bytes:bytes.length});
  }
  if(req.method==='DELETE'){
   const data=JSON.parse(await body(req,4096)); const u=new URL(String(data.url||'')); const marker=`/storage/v1/object/public/${bucket}/`; if(!u.pathname.startsWith(marker))return send(res,403,{error:'Chỉ xoá được tệp trong thư viện thiệp.'});
   const objectPath=decodeURIComponent(u.pathname.slice(marker.length)); if(!/^(wed|bg|icon|music)\/[\w.\-/]+$/.test(objectPath)||objectPath.includes('..'))return send(res,403,{error:'Đường dẫn tệp không hợp lệ.'});
   const del=await fetch(`${base}/storage/v1/object/${bucket}/${objectPath}`,{method:'DELETE',headers:headers()}); if(!del.ok)return send(res,502,{error:'Không xoá được tệp trong Storage.'}); return send(res,200,{ok:true});
  }
  return send(res,405,{error:'Method Not Allowed'});
 }catch(e){return send(res,500,{error:e.message||'Lỗi xử lý tệp.'});}
};
