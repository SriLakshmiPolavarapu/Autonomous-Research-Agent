import os
from dotenv import load_dotenv
import google.generativeai as genai
from ddgs import DDGS

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# tool function
def search_web(query: str) -> str:
    """Search the web for current information on a topic."""
    ddgs = DDGS()
    results = ddgs.text(query, max_results=5)
    output = ""
    for r in results:
        output += f"Title: {r['title']}\n"
        output += f"Snippet: {r['body']}\n\n"
    return output

# model setup
model = genai.GenerativeModel(
    model_name="gemini-2.5-flash",
    tools=[search_web],
    system_instruction="You are a research agent. When asked about current events or recent information, ALWAYS use the search_web tool. Never answer from memory."
)

chat = model.start_chat()
# this is the hardcoded request
response = chat.send_message("What are the latest trends in edge AI?")

part = response.candidates[0].content.parts[0]

if hasattr(part, "function_call") and part.function_call.name:
    function_call = part.function_call
    query = function_call.args["query"]
    print(f"Model wants to search for: {query}")
    
    search_results = search_web(query)
    print(f"Successfully got the results!\n")

    from google.protobuf.struct_pb2 import Struct
    
    response_struct = Struct()
    response_struct.update({"result": search_results})

    response = chat.send_message(
        genai.protos.Content(
            parts=[genai.protos.Part(
                function_response=genai.protos.FunctionResponse(
                    name="search_web",
                    response=response_struct
                )
            )]
        )
    )

    print("ANSWER")
    print(response.text)

else:
    print(response.text)