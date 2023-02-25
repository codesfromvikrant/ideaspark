import React, { useState } from "react";
import { getDoc, doc, colRef } from '../firebase'
import { useParams } from 'react-router-dom';

const Notescollec = () => {
  const { userId, noteID } = useParams();
  // Getting notes data from firestore
  const docRef = doc(colRef, userId);
  const [notes, setNotes] = useState('')

  getDoc(docRef)
    .then((snap) => {
      const { notesdata } = snap.data()
      setNotes(notesdata)
      console.log(notes)
    })
    .catch((error) => { console.log(error) })

  return (
    <div className="bg-white w-full p-4 rounded-md z-50 relative ">
      <i className="fa fa-solid fa-ellipsis-vertical absolute right-6"></i>
      <h3 className="mb-3 text-gray-900 font-bold uppercase">Notes...</h3>
      <div className="notescollec pb-2 w-full overflow-x-auto">
        <div className="flex w-full gap-2 ">

          {notes && notes.map((obj) => {
            return (
              <div className="max-w-[12rem] h-[15rem] p-2 rounded text-sm text-gray-500 border-gray-200 border-2 shadow-xl">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore adipisci quibusdam natus error est beatae odit tempora reprehenderit, consequuntur fugiat exercitationem molestiae.</div>

            )
          })}


        </div>
      </div>
    </div >
  )
}

export default Notescollec;