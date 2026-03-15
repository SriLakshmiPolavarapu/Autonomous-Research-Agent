import { useState } from "react";

export default function App()
{
  const[query, setQuery] = useState(""); // for input
  const[status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const[answer, setAnswer] = useState(""); // for output

  async function handleSearch(e : React.SubmitEvent)
  {
    e.preventDefault();
    setStatus("loading")
    setAnswer("")

    // API call / fetching request
    const res = await fetch("http://localhost:8000/research", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: query }),
    });
    const reader = res.body!.getReader(); //to process the data by chucks one by one
    const decoder = new TextDecoder(); //convert bytes to text
    let buf = ""; //acucmulates the text until we have full length message
  }
  return(
    <div style={{maxWidth: 600, margin: "60px auto",padding: "0 20px" }}>
    <h1> Research Agent</h1>
    {status == "loading" && <p>searching</p>}
    <form onSubmit={handleSearch} style={{display: "flex", gap: 8, marginTop: 20}}>
      <input
      value={query}
      onChange={e => setQuery(e.target.value)}
      placeholder="What do you want to search?"
      style={{ flex:1, padding: 10, fontSize:15}}
      />
      <button type="submit"> Search </button>
    </form>
    </div>
  );

}