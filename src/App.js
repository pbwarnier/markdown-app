import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import marked from 'marked';
import { sampleText } from './sampleText'; // import d'un script

function App() {

  const [text, setText] = useState(sampleText); // initialise de state avec le script récupéré
  const handleChange = event => {
    setText(event.currentTarget.value); // met à jour le state avec la value du textarea
  }

  const hasMount = useRef(false) // indicateur de montage des components

  useEffect(() => {
    if (hasMount.current) {
      localStorage.setItem('text', text) // si le component est déjà monté, on met à jour le localStorage
    } else {
      hasMount.current = true
      setText(localStorage.getItem('text')) // si le component n'est pas monté, on update le state avec la sauvegarde du localStorage
    }
  }, [text]); // le hook d'effet s'exectute quand le state text est modifié

  const rendertext = marked(text) // converti les balises html en caractères spéciaux

  return (
    <div className="container">
      <div className="mt-3 row">
        <div className="col-sm-6">
          <textarea className="form-control" rows="25" value={text} onChange={handleChange} ></textarea>
        </div>
        <div className="col-sm-6">
          <div dangerouslySetInnerHTML={{ __html: rendertext }} ></div>
        </div>
      </div>
    </div>
  );
}

export default App;