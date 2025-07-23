from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from starlette.responses import PlainTextResponse
from dotenv import load_dotenv
import os
import aiosmtplib
import base64
from email.message import EmailMessage
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.middleware import SlowAPIMiddleware
import uvicorn

# Load environment variables from .env file
load_dotenv()

EMAIL = os.getenv("EMAIL")
API_KEY = os.getenv("RESEND_API_KEY")

app = FastAPI()

# Rate limiter: max 10 requests every 15 minutes per IP
limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_middleware(SlowAPIMiddleware)

# Enable CORS for all origins and headers
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define expected request structure
class EmailRequest(BaseModel):
    email: str
    image: str

@app.post("/send-email")
@limiter.limit("10/15minutes")
async def send_email(request: Request, body: EmailRequest):
    if not body.email or not body.image:
        raise HTTPException(status_code=400, detail="Missing email or image")

    print("Received email:", body.email)

    try:
        # Decode base64 image
        if "base64," in body.image:
            base64_data = body.image.split("base64,")[1]
        else:
            base64_data = body.image
        image_bytes = base64.b64decode(base64_data)

        # Create email
        message = EmailMessage()
        message["From"] = EMAIL
        message["To"] = body.email
        message["Subject"] = "Your Chart Image"
        message.set_content("Attached is your chart image.")
        message.add_attachment(image_bytes, maintype="image", subtype="png", filename="chart.png")

        # Send via SMTP
        await aiosmtplib.send(
            message,
            hostname="smtp.resend.com",
            port=587,
            start_tls=True,
            username="resend",
            password=API_KEY,
        )

        return PlainTextResponse("Email sent!")
    except Exception as e:
        print("Email error:", e)
        raise HTTPException(status_code=500, detail="Failed to send email")

# Entry point for direct execution
if __name__ == "__main__":
    uvicorn.run("server:app", host="localhost", port=3000, reload=False)
