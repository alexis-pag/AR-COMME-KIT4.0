document.addEventListener("DOMContentLoaded", () => {
  const videoData = [
    { titre: "Temoignage 1", id: "video0" },
    { titre: "Temoignage 2", id: "video1" }
  ];

  const videoPlane = document.querySelector("#video-plane");
  const modal = new bootstrap.Modal(document.getElementById('infoModal'));
  const modalContent = document.getElementById('modal-content');
  const videoButtonsContainer = document.getElementById('video-buttons');

  let currentVideoIndex = 0;

  // Création automatique des boutons pour chaque vidéo
  videoData.forEach((vid, index) => {
    const btn = document.createElement("button");
    btn.innerText = vid.titre;
    btn.classList.add("btn", "btn-primary", "btn-video");
    btn.addEventListener("click", () => {
      switchVideo(index);
    });
    videoButtonsContainer.appendChild(btn);
  });

  function switchVideo(index) {
    if(index === currentVideoIndex) return;

    const currentVideo = document.getElementById(videoData[currentVideoIndex].id);
    const nextVideo = document.getElementById(videoData[index].id);

    currentVideo.pause();
    nextVideo.currentTime = 0;
    nextVideo.play();

    videoPlane.setAttribute("src", `#${videoData[index].id}`);
    currentVideoIndex = index;

    // Optionnel : afficher info modal sur changement
    modalContent.innerText = `Lecture de : ${videoData[index].titre}`;
    modal.show();
  }

  // Lecture automatique lorsque le marker est détecté
  const sceneEl = document.querySelector("a-scene");
  sceneEl.addEventListener("arReady", () => {
    const video = document.getElementById(videoData[currentVideoIndex].id);
    video.play();
  });

  // Détecter la visibilité du marker
  const targetEl = document.querySelector("[mindar-image-target]");
  targetEl.addEventListener("targetFound", () => {
    const video = document.getElementById(videoData[currentVideoIndex].id);
    video.play();
  });
  targetEl.addEventListener("targetLost", () => {
    const video = document.getElementById(videoData[currentVideoIndex].id);
    video.pause();
  });
});
