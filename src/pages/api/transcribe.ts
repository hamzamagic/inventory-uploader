export async function POST({ request }) {
    const formData = await request.formData();
    const file = formData.get('file');
  
    if (!file) {
      return new Response(JSON.stringify({ error: 'No audio file provided.' }), {
        status: 400
      });
    }
  
    const openaiResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`
      },
      body: formData
    });
  
    const data = await openaiResponse.json();
  
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  