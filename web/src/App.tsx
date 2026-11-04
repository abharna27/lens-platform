   import { useEffect, useState } from "react";

   type HealthResponse = {
     status: string;
   };

   function App() {
     const [health, setHealth] = useState<HealthResponse | null>(null);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState<string | null>(null);

     useEffect(() => {
       fetch("http://localhost:8000/health")
         .then((res) => {
           if (!res.ok) throw new Error(`Server replied with ${res.status}`);
           return res.json();
         })
         .then((data: HealthResponse) => {
           setHealth(data);
           setLoading(false);
         })
         .catch((err) => {
           setError(err.message);
           setLoading(false);
         });
     }, []);

     if (loading) return <p>Loading...</p>;
     if (error) return <p>Error: {error}</p>;

     return (
       <div>
         <h1>Lens</h1>
         <p>Backend status: {health?.status}</p>
       </div>
     );
   }

   export default App;