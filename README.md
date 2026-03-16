# Autonomous Research Agent

An AI-powered research agent that searches the web and writes informed answers based on real data and not memory.

## How It Works

1. You ask a question
2. The AI model (Google Gemini) decides what to search
3. The agent searches DuckDuckGo automatically
4. If the model needs more info, it searches again (autonomous loop)
5. Once it has enough, it writes a final answer based on real results

The model decides **what** to search, **how many times**, and **when to stop** — no human input needed between steps.

## Example

```
What do you want to research? Compare Tesla, Rivian, Lucid latest news

Searching for: Tesla latest news
Got results!
Searching for: Rivian latest news
Got results!
Searching for: Lucid latest news
Got results!

=== ANSWER ===
Here's a comparison of the latest news...
```

## Tech Stack

- **Python** — core language
- **Google Gemini 2.5 Flash** — LLM for reasoning and tool calling
- **DuckDuckGo (DDGS)** — free web search, no API key needed
- **Tool Calling** — Gemini decides when to use the search tool

## Setup

1. Clone the repo
   ```bash
   git clone https://github.com/SriLakshmiPolavarapu/Autonomous_Agent.git
   cd Autonomous_Agent
   ```

2. Install dependencies
   ```bash
   pip install google-generativeai ddgs python-dotenv
   ```

3. Get a free Gemini API key from [aistudio.google.com](https://aistudio.google.com)

4. Create a `.env` file
   ```
   GEMINI_API_KEY=your_key_here
   ```

5. Run it
   ```bash
   python research_agent.py
   ```

## How Tool Calling Works

Instead of the model guessing answers, it can request your code to run functions on its behalf.

```
User: "What's happening in AI this week?"
Model: "I need to search. Run search_web('AI news this week')"
Code:  Runs DuckDuckGo search → returns real results
Model: Reads results → writes informed answer
```

The model never touches the internet directly. Your code is the middleman that executes the search and passes results back.

## Project Structure

```
Autonomous_Agent/
├── research_agent.py   # Main agent code
├── .env                # API key (not committed)
└── README.md
```

## Google AI Studio Link
https://aistudio.google.com/api-keys?project=gen-lang-client-0002446988


## What imports are used:

1. import os: it gives access to the operating system's env, things like env variables, API keys, file paths
2. dotenv: to load variables from .env file
3. CORSMiddleware: it allows out frontend to talk to out backend
4. StreamingResponse: it makes sure our FastAPI send data chunk by chunk
5. BaseModel from pydantic: making sure of the incoming data request are in the correct shape and size
6. genai: to use Gemini models
7. DDGS: for real-time search