import os
import json
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Enable CORS
allowed_origins = [o.strip().rstrip('/') for o in os.getenv("ALLOWED_ORIGINS", "*").split(",")]
# Special handling: credentials cannot be used with '*'
allow_all = "*" in allowed_origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=not allow_all, # Disable if *, enable if specific domains
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini
api_key = os.getenv("VITE_GOOGLE_API_KEY") or os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

# Use the latest stable flash model for performance/cost balance
model = genai.GenerativeModel("gemini-2.5-flash")

@app.get("/")
async def root():
    return {"status": "I-Ching Lab AI Backend Running", "engine": "Gemini-2.5-Flash"}

@app.post("/chat")
async def chat_endpoint(request: Request):
    data = await request.json()
    messages = data.get("messages", [])
    system_instruction = data.get("system_instruction", "")
    
    if not messages:
        return {"error": "No messages provided"}

    # Prepare history for Gemini SDK
    # Gemini history format: {"role": "user"|"model", "parts": ["text"]}
    history = []
    # Add system instruction as the first user/model interaction to set the stage
    # Actually, Gemini 2.5 supports system_instruction in the model config, but we can also pass it as turns
    
    # Map roles: 'assistant' -> 'model'
    formatted_messages = []
    for m in messages:
        formatted_messages.append({
            "role": "user" if m["role"] == "user" else "model",
            "parts": [m["content"]]
        })

    # The last message is the current prompt
    current_prompt = formatted_messages.pop()["parts"][0]

    async def event_generator():
        try:
            # We use start_chat to maintain context if the SDK supports it, 
            # or just pass the history to generate_content.
            chat = model.start_chat(history=formatted_messages)
            
            # Use the system instruction by prefixing it if not already handled
            # (Simplified for now: prefix the first prompt or use a special turn)
            # Better: use model = genai.GenerativeModel(..., system_instruction=...)
            
            # Re-initialize model with system instruction if provided
            local_model = genai.GenerativeModel(
                model_name="gemini-2.5-flash",
                system_instruction=system_instruction
            )
            local_chat = local_model.start_chat(history=formatted_messages)
            
            response = local_chat.send_message(current_prompt, stream=True)
            
            for chunk in response:
                if chunk.text:
                    yield chunk.text
        except Exception as e:
            yield f"Error: {str(e)}"

    return StreamingResponse(event_generator(), media_type="text/plain")

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
