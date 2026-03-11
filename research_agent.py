import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Step 1 - Just test it works (like we did with HuggingFace)
model = genai.GenerativeModel("models/gemini-2.5-flash")

response = model.generate_content("Hello, who are you?")

print(response.text)


