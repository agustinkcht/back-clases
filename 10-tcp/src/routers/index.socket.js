import notesManager from "../data/fs/NotesManager.js"

export default async (socket) => {
    console.log(`client ${socket.id} connected`);
    socket.emit('notes', await notesManager.read());
    socket.on('chargeNote', async data => {
        await notesManager.create(data)
    });
    socket.emit('notes', await notesManager.read());
} 
// es llamada desde el socketServer.on
