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

// aran yang berisi daftar URL Stiker

const daftarstiker = [
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Grinning%20face/3D/grinning_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Face%20with%20tears%20of%20joy/3D/face_with_tears_of_joy_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Rolling%20on%20the%20floor%20laughing/3D/rolling_on_the_floor_laughing_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Beaming%20face%20with%20smiling%20eyes/3D/beaming_face_with_smiling_eyes_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Grinning%20squinting%20face/3D/grinning_squinting_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Smiling%20face%20with%20heart-eyes/3D/smiling_face_with_heart_eyes_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Star-struck/3D/star-struck_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Face%20blowing%20a%20kiss/3D/face_blowing_a_kiss_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Smiling%20face%20with%20hearts/3D/smiling_face_with_hearts_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Smiling%20face%20with%20sunglasses/3D/smiling_face_with_sunglasses_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Zany%20face/3D/zany_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Face%20savoring%20food/3D/face_savoring_food_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Squinting%20face%20with%20tongue/3D/squinting_face_with_tongue_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Thinking%20face/3D/thinking_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Exploding%20head/3D/exploding_head_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Face%20screaming%20in%20fear/3D/face_screaming_in_fear_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Flushed%20face/3D/flushed_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Crying%20face/3D/crying_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Loudly%20crying%20face/3D/loudly_crying_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Angry%20face/3D/angry_face_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Face%20with%20symbols%20on%20mouth/3D/face_with_symbols_on_mouth_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Thumbs%20up/3D/thumbs_up_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Thumbs%20down/3D/thumbs_down_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Clapping%20hands/3D/clapping_hands_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Victory%20hand/3D/victory_hand_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Folded%20hands/3D/folded_hands_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Red%20heart/3D/red_heart_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Fire/3D/fire_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Party%20popper/3D/party_popper_3d.png",
  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Collision/3D/collision_3d.png" , 
"https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/1f595_3d.png", 
"https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/1f5ff_3d.png",
"https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/1f412_3d.png",
"https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/1fab1_3d.png",
]

//Menentukan elemen-elemen DOM yang diperlukan
const chatForm = document.getElementById("chat-form")
const usernameInput = document.getElementById("username")
const messageInput = document.getElementById("message")
const chatBox = document.getElementById("chat-box")
const pemilihStiker = document.getElementById("pemilih-stiker")
const divDaftarStiker = document.getElementById("daftar-stiker")
const tombolStiker = document.getElementById("tombol-stiker")

// render popup stiker
daftarstiker.forEach((url) => {
  //buat elemen img untuk setiap
  const img = document.createElement("img")
  //menentukansumber gambar stiker dari url
  img.src = url
  //menanmbah nama class
  img.classList.add("pilihan-stiker")
  
  //mengirim stiker ke fire 
  img.onerror = () => {
    img.style.display ="none"
  }
  
  //elemen img
  divDaftarStiker.appendChild(img) 
}) 

//menampilkanpanel pemilih stiker tombol
tombolStiker.onclick = () => {
  // toggle class tersembunyi pada panel pemilih stiker
  pemilihStiker.classList.toggle("tersembunyi")
}

//fungsi kirim stiker ke fire
async function kirimStiker(url) {
  const username = usernameInput.value.trim()
 
  // megiriim ke fire
  try {
    await addDoc(messageCollection, {
      username: username, 
      message: url, 
      waktu: serverTimestamp(), 
      tipe: "stiker"
    })
  } catch (error) {
    console.log("gagal mengirim stiker:", error)
  }
}

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
  chatBox.scrollTop = chatBox.scrollHeight
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