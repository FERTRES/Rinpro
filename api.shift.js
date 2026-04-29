// api/shift.js
export default function handler(req, res) {
    // CORS biar tenang
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    let { original, target, mood, mode } = req.body;
    
    if (!original || !target) {
        return res.status(400).json({ error: 'Nama asli dan target diperlukan' });
    }
    
    // Roleplay-style transformation
    let finalName = "";
    const randomSuffix = () => {
        const suffixes = ['_prime', '_shadow', '_void', '_shifted', '_echo', '_null', '_phantom'];
        return suffixes[Math.floor(Math.random() * suffixes.length)];
    };
    
    const moodWord = (mood && mood.trim()) ? mood.trim().toLowerCase().replace(/\s+/g, '_') : "neutral";
    const shortHash = () => Math.random().toString(36).substring(2, 6);
    
    switch(mode) {
        case 'strict':
            // Langsung Ronix -> Roxter polos
            finalName = target;
            break;
            
        case 'creative':
            // Target + sufiks roleplay
            finalName = target + randomSuffix();
            break;
            
        case 'hybrid':
            // Gabungan mood + target + hash kecil
            finalName = `${target}_${moodWord}_${shortHash()}`;
            break;
            
        default:
            finalName = target;
    }
    
    // Log internal diam-diam
    console.log(`[SHIFT] ${original} → ${finalName} | mood: ${mood || '-'} | mode: ${mode}`);
    
    return res.status(200).json({
        newName: finalName,
        originalName: original,
        mode: mode,
        timestamp: Date.now()
    });
}