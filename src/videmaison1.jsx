import React, { useState } from "react";

// Données exemples de meubles
const meubles = [
  {
    id: 1,
    titre: "Buffet scandinave",
    image: "https://images.selency.com/images/meubles/buffet.jpg",
    categorie: "Buffet",
    couleur: "Bois",
    prix: 490,
  },
  {
    id: 2,
    titre: "Fauteuil vintage",
    image: "https://images.selency.com/images/meubles/fauteuil.jpg",
    categorie: "Fauteuil",
    couleur: "Vert",
    prix: 320,
  },
  {
    id: 3,
    titre: "Table basse industrielle",
    image: "https://images.selency.com/images/meubles/table-basse.jpg",
    categorie: "Table",
    couleur: "Noir",
    prix: 210,
  },
  {
    id: 4,
    titre: "Armoire ancienne",
    image: "https://images.selency.com/images/meubles/armoire.jpg",
    categorie: "Armoire",
    couleur: "Blanc",
    prix: 650,
  },
  // Ajoute d'autres meubles ici
];

// Récupération des filtres uniques
const categories = [...new Set(meubles.map(m => m.categorie))];
const couleurs = [...new Set(meubles.map(m => m.couleur))];
const prixMin = Math.min(...meubles.map(m => m.prix));
const prixMax = Math.max(...meubles.map(m => m.prix));

export default function MeublesEcommercePage() {
  const [categorie, setCategorie] = useState("");
  const [couleur, setCouleur] = useState("");
  const [prix, setPrix] = useState(prixMax);

  // Filtrage des meubles
  const meublesFiltres = meubles.filter(m => {
    return (
      (categorie === "" || m.categorie === categorie) &&
      (couleur === "" || m.couleur === couleur) &&
      m.prix <= prix
    );
  });

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: 1100, margin: "auto", padding: 24 }}>
      <h1>Meubles à vendre</h1>
      <section style={{ display: "flex", gap: 32, marginBottom: 32 }}>
        <div>
          <label>Catégorie<br/>
            <select value={categorie} onChange={e => setCategorie(e.target.value)}>
              <option value="">Toutes</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>
        <div>
          <label>Couleur<br/>
            <select value={couleur} onChange={e => setCouleur(e.target.value)}>
              <option value="">Toutes</option>
              {couleurs.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
        </div>
        <div>
          <label>Prix max<br/>
            <input type="range" min={prixMin} max={prixMax} value={prix} onChange={e => setPrix(Number(e.target.value))} />
            <span style={{ marginLeft: 10 }}>{prix} €</span>
          </label>
        </div>
      </section>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
        {meublesFiltres.length === 0 && <p>Aucun meuble ne correspond à vos filtres.</p>}
        {meublesFiltres.map(m => (
          <div key={m.id} style={{ border: "1px solid #ddd", borderRadius: 8, padding: 12, background: "#fafafa" }}>
            <img src={m.image} alt={m.titre} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 6 }} />
            <h2 style={{ fontSize: "1.1em", margin: "12px 0 4px" }}>{m.titre}</h2>
            <div style={{ color: "#666", fontSize: ".95em", marginBottom: 4 }}>
              {m.categorie} · {m.couleur}
            </div>
            <div style={{ fontWeight: "bold", fontSize: "1.1em" }}>{m.prix} €</div>
            <button style={{ marginTop: 10, padding: "6px 16px", background: "#222", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}>
              Voir le meuble
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}