import { useEffect } from "react";
import { Header } from "../components/Header";

export default function Home(props) {
  console.log(props.episodes)
  return (
    <h1>Index</h1>
  )
}
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()
  
  return {
    props: {
      episodes: data,
    },
  }
}
    
 
 
