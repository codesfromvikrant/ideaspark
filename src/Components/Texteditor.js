import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
// Routing
import { useParams } from 'react-router-dom';

import {
  setDoc,
  getDoc,
  doc,
  colRef,
  updateDoc,
  arrayUnion
} from '../firebase'



const Texteditor = () => {

  const { userId, noteID } = useParams();
  const [noteData, setNoteData] = useState({
    id: noteID,
    title: '',
    content: ''
  });

  // Hnadling user Inputs
  const handleInput = (event) => {
    const { name, value } = event.target;

    setNoteData(prevNoteData => ({
      ...prevNoteData,
      [name]: value
    }))
  }

  // Get the note data and Update the data
  const docRef = doc(colRef, userId);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    /*async function getData() {
      const data = (await getDoc(docRef)).data()
      setUserData(data)
    }
    getData()*/
    getDoc(docRef)
      .then((snap) => {
        setUserData(snap.data())
        const { notesdata } = snap.data();
        notesdata.forEach((obj) => {
          if (obj.id == noteID) {
            setNoteData(prevData => ({
              ...prevData,
              title: obj.title,
              content: obj.content
            }))
          }
        })
      })
      .catch((error) => { console.log(error) })
  }, [])
  console.log(userData)
  const { notesdata } = userData
  let updatedArr = notesdata
  if (!updatedArr) {
    updateDoc(doc(colRef, userId), {
      notesdata: arrayUnion(noteData)
    })
  } else {
    updatedArr.forEach((obj) => {
      if (obj.id === noteID) {
        obj.title = noteData.title
        obj.content = noteData.content
      }
    })
    updateDoc(doc(colRef, userId), {
      notesdata: updatedArr
    })
  }


  // Styling Components
  const style = {
    resize: 'none',
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
  }

  return (
    <div className="w-full p-10 h-[100vh] bg-gray-100 overflow-y-scroll">
      <textarea onChange={handleInput} name="title" style={style} name="title" className="p-4 rounded text-4xl outline-none" placeholder="Title"></textarea>
      <textarea onChange={handleInput} name="content" style={{ ...style, height: '100%' }} className="p-4 rounded text-lg outline-none" placeholder="Start Writing..."></textarea>
    </div >
  )
}

export default Texteditor;