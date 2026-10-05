// ==========================================
// 1. IMPORT FIREBASE
// ==========================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"


// ==========================================
// 2. CONFIG FIREBASE
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyC_1XwbW-9zcNkRJXIQr4N1GgAyzQr6O2g",
  authDomain: "uasgenap2026-549f7.firebaseapp.com",
  projectId: "uasgenap2026-549f7",
  storageBucket: "uasgenap2026-549f7.firebasestorage.app",
  messagingSenderId: "560108074909",
  appId: "1:560108074909:web:50c7719780334c88bee174"
}


// ==========================================
// 3. INISIALISASI FIREBASE & FIRESTORE
// ==========================================
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const messageCollection = collection(db, "message")


// ==========================================
// 4. ID BROWSER
// ==========================================
function ambilAtauBuatIdBrowser() {

  let idBrowser = localStorage.getItem("livechatpunyaku123")

  if (!idBrowser) {

    idBrowser =
      "user_" +
      Math.random().toString(36).substring(2, 11) +
      "_" +
      Date.now()

    localStorage.setItem(
      "livechatpunyaku123",
      idBrowser
    )
  }

  return idBrowser
}

const idBrowserSekarang =
  ambilAtauBuatIdBrowser()


// ==========================================
// 5. USERNAME
// ==========================================
const usernameTersimpam =
  localStorage.getItem("livechat_username") || ""


// ==========================================
// 6. SUARA NOTIFIKASI
// ==========================================
const suaraPesan =
  new Audio("./notifikasipesan.mp3")

suaraPesan.volume = 1.0

let jumlahPesanSebelumnya = 0
let pertamaKaliMemuat = true


// ==========================================
// 7. DAFTAR STIKER
// ==========================================
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

  "https://raw.githubusercontent.com/microsoft/fluentui-emoji/main/assets/Collision/3D/collision_3d.png",

  "https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/1f595_3d.png",

  "https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/1f5ff_3d.png",

  "https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/1f412_3d.png",

  "https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/1fab1_3d.png"
]


// ==========================================
// 8. AMBIL ELEMEN HTML
// ==========================================
const chatForm =
  document.getElementById("chat-form")

const usernameInput =
  document.getElementById("username")

const messageInput =
  document.getElementById("message")

const chatBox =
  document.getElementById("chat-box")

const pemilihStiker =
  document.getElementById("pemilih-stiker")

const divDaftarStiker =
  document.getElementById("daftar-stiker")

const tombolStiker =
  document.getElementById("tombol-stiker")


// ==========================================
// 9. USERNAME YANG SUDAH TERSIMPAN
// ==========================================
if (usernameTersimpam) {

  usernameInput.value =
    usernameTersimpam

  usernameInput.disabled = true
}


// ==========================================
// 10. RENDER STIKER
// ==========================================
daftarstiker.forEach((url) => {

  const img =
    document.createElement("img")

  img.src = url

  img.classList.add(
    "pilihan-stiker"
  )

  img.onerror = () => {
    img.style.display = "none"
  }


  img.onclick = () => {

    if (
      usernameInput.value.trim()
    ) {

      kirimStiker(url)

      pemilihStiker.classList.add(
        "tersembunyi"
      )

    } else {

      alert(
        "Isi nama terlebih dahulu!"
      )

      usernameInput.focus()
    }
  }


  divDaftarStiker.appendChild(img)
})


// ==========================================
// 11. TOMBOL STIKER
// ==========================================
tombolStiker.onclick = (event) => {

  event.preventDefault()

  pemilihStiker.classList.toggle(
    "tersembunyi"
  )
}


// ==========================================
// 12. VALIDASI USERNAME
// ==========================================
function dapatkanDanKunciUsername() {

  let username =
    localStorage.getItem(
      "livechat_username"
    )


  if (!username) {

    username =
      usernameInput.value.trim()


    if (!username) {

      alert(
        "Username tidak boleh kosong!"
      )

      usernameInput.focus()

      return
    }


    localStorage.setItem(
      "livechat_username",
      username
    )

    usernameInput.disabled = true
  }


  return username
}


// ==========================================
// 13. KIRIM STIKER
// ==========================================
async function kirimStiker(url) {

  const username =
    dapatkanDanKunciUsername()


  if (!username) return


  pemilihStiker.classList.add(
    "tersembunyi"
  )


  try {

    await addDoc(
      messageCollection,
      {

        username: username,

        idBrowser:
          idBrowserSekarang,

        message: url,

        waktu:
          serverTimestamp(),

        tipe: "stiker"
      }
    )

  } catch (error) {

    console.log(
      "Gagal mengirim stiker:",
      error
    )
  }
}


// ==========================================
// 14. KIRIM PESAN TEKS
// ==========================================
chatForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault()


    const username =
      dapatkanDanKunciUsername()


    if (!username) return


    const message =
      messageInput.value.trim()


    if (!message) return


    try {

      await addDoc(
        messageCollection,
        {

          username: username,

          idBrowser:
            idBrowserSekarang,

          message: message,

          waktu:
            serverTimestamp(),

          tipe: "teks"
        }
      )


      messageInput.value = ""

    } catch (error) {

      console.log(
        "Gagal mengirim pesan:",
        error
      )
    }
  }
)


// ==========================================
// 15. QUERY PESAN
// ==========================================
const queryPesan =
  query(
    messageCollection,
    orderBy("waktu", "asc")
  )


// ==========================================
// 16. REALTIME LISTENER
// ==========================================
onSnapshot(
  queryPesan,
  (cuplikan) => {

    chatBox.innerHTML = ""


    const jumlahPesanSekarang =
      cuplikan.size


    cuplikan.forEach((doc) => {

      const data = doc.data()


      if (!data.waktu) return


      const waktu =
        data.waktu
          .toDate()
          .toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit"
            }
          )


      renderPesan(
        data.username,
        data.message,
        waktu,
        data.tipe,
        data.idBrowser
      )
    })


    chatBox.scrollTop =
      chatBox.scrollHeight


    // ======================================
    // 🔔 NOTIFIKASI PESAN BARU
    // ======================================
    if (
      !pertamaKaliMemuat &&
      jumlahPesanSekarang >
        jumlahPesanSebelumnya
    ) {

      suaraPesan.currentTime = 0


      suaraPesan.play().catch(
        (error) => {

          console.log(
            "Suara belum bisa diputar:",
            error
          )
        }
      )
    }


    jumlahPesanSebelumnya =
      jumlahPesanSekarang

    pertamaKaliMemuat = false
  }
)


// ==========================================
// 17. RENDER PESAN
// ==========================================
function renderPesan(
  username,
  message,
  waktu,
  tipe = "teks",
  idBrowser
) {

  const messageDiv =
    document.createElement("div")


  messageDiv.classList.add(
    "message-card"
  )


  let isipesan


  // ========================================
  // PESAN MILIK SENDIRI
  // ========================================
  if (
    idBrowser ===
    idBrowserSekarang
  ) {

    messageDiv.classList.add(
      "my-message"
    )
  }


  // ========================================
  // STIKER
  // ========================================
  if (tipe === "stiker") {

    isipesan = `
      <img
        src="${message}"
        alt="stiker"
        class="stiker-chat"
      >
    `

  } else {

    // ======================================
    // TEKS
    // ======================================
    isipesan = `
      <span class="text">${message}</span>
    `
  }


  messageDiv.innerHTML = `
    <div class="message-content">

      <strong>${username}</strong>

      ${isipesan}

    </div>

    <span class="time">${waktu}</span>
  `


  chatBox.appendChild(
    messageDiv
  )
}