// 1. Impor module yang diperlukan dari firebase dan firestore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

// 2. Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC_1XwbW-9zcNkRJXIQr4N1GgAyzQr6O2g",
  authDomain: "uasgenap2026-549f7.firebaseapp.com",
  projectId: "uasgenap2026-549f7",
  storageBucket: "uasgenap2026-549f7.firebasestorage.app",
  messagingSenderId: "560108074909",
  appId: "1:560108074909:web:50c7719780334c88bee174",
};

//3.inisialisasi FIREBASE dan Firestone
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const messageCollection = collection(db, "message")

//Menentukan elemen-elemen DOM yang diperlukan
const chatForm = document.getElementById("chat-form")
const usernameInput = document.getElementById("username")
const messageInput = document.getElementById("message")
const chatBox = document.getElementById("chat-box")

//.fitur kirim pesan

chatForm.addEventListener("submit", async (event) => {
  event.preventDefault()
  
  const username = usernameInput.value.trim()
  const message = messageInput.value.trim()
  
  if (username && message) {
    //kirim ke firestore
    try {
      await addDoc(messageCollection, {
     username: username, 
     message: message, 
     waktu: serverTimestamp()
      })
      
      // bersihkan input setelah mengririm pesan 
      messageInput.value =""
    } catch (error) {
      console.log("Gagal mengirim pesan", error)
    }
  }
})

//fitur pesan listener (realtime)

const queryPesan= query(messageCollection, orderBy("waktu", "asc")) 

onSnapshot(queryPesan, (cuplikan) => {
  //Bersikah chatbox sebelum menampilkan
  chatBox.innerHTML=""
  
  //tampilanpesan baru chatbox
  cuplikan.forEach((doc)=>{
    //ambul data dari dokumen
    const data = doc.data()
    
    //membuattampilanwkartu
    const waktu = data.waktu.toDate().toLocaleTimeString(
      [], 
      {hour: '2-digit', minute: '2-digit'}
    )
    
    // render pesan (memanggil fungsi renderPesan) 
    renderPesan(data.username, data.message, waktu)
    
  }) 
}) 

function renderPesan(username, message, waktu) {
  // buat elemen untuk pesan
  const messageDiv = document.createElement("div")
  
  //menambah nama class messege
  messageDiv.classList.add("message-card")
  
  //menambah konten peson ke memeso
  messageDiv.innerHTML=`
  <div class="message-content">
    <strong>${username}</strong>
    <span>${message}</span>
  </div>
  
  <span class="time">${waktu}</span>
  ` //
  
  //menambahkanmessagadiv
  chatBox.appendChild(messageDiv)
}