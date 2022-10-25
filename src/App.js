import "./App.css";
import { useState } from "react";
import { db, firebase } from "./firebase";
import {useEffect} from 'react'

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [medals, setMedals] = useState("");
  const [daraja, setDaraja] = useState("Beginner");
  const [hobbies, setHobbies] = useState("");

  const [telephone, setTelephone] = useState("");

  const [malumot, setMalumot] =useState([]) 
  const saveToFirebase = () => {
    db.collection("words").add({
      userInfo: {
        name: name,
        age: +age,
        // Number(age)
        medals: +medals,
        daraja: daraja,
        hobbies: hobbies.split(","),
      },
    });
  };

  const verifyThePhone = () => {
    let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container') 
    firebase.auth().signInWithPhoneNumber(telephone,recaptcha )
    .then((e) => {
      let code = prompt("Tasdiqlash kodini kiriting")
      if(code === null){
        alert("Kod kiritilmadi")
      }
      else{
        e.confirm(code).then(user => console.log(user))
      }
    })

    .catch(err => console.log(err))
  }

// =====================get======================================

  useEffect(() => {
    db.collection("words").onSnapshot(data => {
      setMalumot(data.docs.map(info =>(
        info.data()
      ) ))
    })
  }, [])

console.log(malumot);
  return (
    <div className="app">
      <input
        type="text"
        value={name}
        placeholder="Your name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        value={age}
        placeholder="your age"
        onChange={(e) => setAge(e.target.value)}
      />
      <input
        type="number"
        placeholder="your Medals"
        value={medals}
        onChange={(e) => setMedals(e.target.value)}
      />
      <label htmlFor="daraja"></label>
      <select
        id="daraja"
        value={daraja}
        onChange={(e) => setDaraja(e.target.value)}
      >
        <option value="Junior Developer">Junior Developer</option>
        <option value="Middle Developer">Middle Developer</option>
        <option value="Senior Developer">Senior Developer</option>
      </select>
      <input
        type="text"
        placeholder="hobbies"
        value={hobbies}
        onChange={(e) => setHobbies(e.target.value)}
      />
      <button onClick={saveToFirebase}>Add to fireBase</button>

{/* ================================================================================================ */}

      <h1>Phone number Authentication</h1>
      <input
        type="text"
        placeholder="your telephone  number"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
      />
      <div id="recaptcha-container"></div>
      <button onClick={verifyThePhone}>Verify the phone</button>

      {/* ================================================================== */}

      <h1>user data</h1>
      {
        malumot &&
        malumot?.map((user, index) =>
        <p key={index}>{user.userInfo.name}</p>
        )
      }
    </div>
  );
}

export default App;
