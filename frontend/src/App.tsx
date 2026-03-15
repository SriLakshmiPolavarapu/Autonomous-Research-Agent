import { useState } from "react";

export default function App()
{
  const[query, setQuery] = useState("");

  function handleSearch(e : React.SubmitEvent)
  {
    e.preventDefault();
    console.log("searching for : ", query);
  }
  return(
    <div style={{maxWidth: 600, margin: "60px auto",padding: "0 20px" }}>
    <h1> Research Agent</h1>
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