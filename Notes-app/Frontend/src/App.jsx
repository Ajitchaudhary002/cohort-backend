import { useEffect, useState } from 'react'
import axios from 'axios'


const App = () => {

  const [notes, setNotes] = useState([])
  const [editingNoteId, setEditingNoteId] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')


  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes/")
      .then((res) => {
        setNotes(res.data.notes)
      })

  }

  useEffect(() => {
    fetchNotes()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    const { title, description } = e.target.elements
    // console.log(title.value, description.value)

    axios.post("http://localhost:3000/api/notes/", {
      title: title.value,
      description: description.value
    })
      .then(() => {
        fetchNotes()
      })

  }

  function handleDeleteNote(noteId) {
    axios.delete('http://localhost:3000/api/notes/' + noteId)
      .then(() => {
        fetchNotes();
      })
  }

  async function handleUpdateNote(noteId) {
    if (editingNoteId === noteId) {
      // Save the update
      try {
        
        await axios.patch(`http://localhost:3000/api/notes/${noteId}`, {
          title: newTitle,
          description: newDescription
        })

        setEditingNoteId(null)
        setNewDescription('')
        setNewTitle('')
        fetchNotes()
      } catch (error) {
        console.error('Failed to update note:', error)
      }
    } else {
      // Enter edit mode
      const note = notes.find(n => n._id === noteId)
      setEditingNoteId(noteId)
      setNewDescription(note.description)
      setNewTitle(note.title)
    }
  }

  return (

    <>
      <div className='app-header'>
        <h1>📝 My Notes</h1>
        <p>Create, update, and manage your notes</p>
      </div>

      <form onSubmit={handleSubmit} className='note-form'>
        <input name='title' type="text" placeholder='Note title...' required />
        <input name='description' type="text" placeholder='Note description...' required />
        <button type='submit'>+ Create Note</button>
      </form>

      <div className='notes'>
        {notes.length === 0 ? (
          <div className='empty-state' style={{ gridColumn: '1 / -1' }}>
            No notes yet. Create your first note!
          </div>
        ) : (
          notes.map((note) => {
            return <div key={note._id} className='note'>

              {editingNoteId === note._id ? (
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className='edit-input'
                />
              ) : (
                <h2>{note.title}</h2>
              )}

              {editingNoteId === note._id ? (
                <input
                  type="text"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className='edit-input'
                />
              ) : (
                <p>{note.description}</p>
              )}

              <div className='note-buttons'>
                <button type="button" className='deleteBtn'
                  onClick={() => handleDeleteNote(note._id)}>
                  🗑️ Delete
                </button>

                <button type="button" onClick={() => handleUpdateNote(note._id)}>
                  {editingNoteId === note._id ? '💾 Save' : '✏️ Update'}
                </button>
              </div>

            </div>
          })
        )}
      </div>
    </>
  )
}

export default App
