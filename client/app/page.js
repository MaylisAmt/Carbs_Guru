//Là, la page est en mode rendu serveur. Si on veut que ce soit en mode client, il faudra ajouter ici en haute de cette page : "use client". en vrai si tu veux utiliser des hooks il faut le mettre donc autant le mettre directement
"use client"
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <p><Link href="/">Home</Link></p>
      <p><Link href="/cv">CV</Link></p>
      <p><Link href="/contact">Contact</Link></p>
    </main>
  );
}
