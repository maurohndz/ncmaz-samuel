function main() {
  /* ************************** */
  /* ************************** */
  /* ************************** */
  /* HEADER MENU USER */
  const OPEN_USER_MENU = "open_user_menu";
  const headerUserIcon = document.getElementById("header_user_icon");

  function closeUserMenu(event) {
    const menu = document.getElementById("user_menu");

    if (
      !menu.contains(event.target) &&
      !headerUserIcon.contains(event.target)
    ) {
      menu.classList.remove(OPEN_USER_MENU);
      document.removeEventListener("click", closeUserMenu);
    }
  }

  function openUserMenu() {
    const menu = document.getElementById("user_menu");

    menu.classList.toggle(OPEN_USER_MENU);
    document.addEventListener("click", closeUserMenu);
  }

  headerUserIcon?.addEventListener("click", openUserMenu);
  /* HEADER MENU USER */
  /* ************************** */
  /* ************************** */
  /* ************************** */

  /* ************************** */
  /* ************************** */
  /* ************************** */
  /* HERO */
  const OPEN_VIDEO_MODAL = "open_video_modal";
  const videoBtn = document.getElementById("video_modal_btn");
  const videoBtnClose = document.getElementById("video_modal_btn-close");

  function closeModalVideo(event) {
    const modal = document.getElementById("hero_video_modal");
    const modalContent = document.querySelector(".video_modal_content");

    if (
      (!modalContent.contains(event.target) &&
        !videoBtn.contains(event.target)) ||
      videoBtnClose.contains(event.target)
    ) {
      modal.classList.remove(OPEN_VIDEO_MODAL);
      document.removeEventListener("click", closeUserMenu);
    }
  }

  function openModalVideo() {
    const modal = document.getElementById("hero_video_modal");

    modal.classList.toggle(OPEN_VIDEO_MODAL);
    document.addEventListener("click", closeModalVideo);
  }

  videoBtn?.addEventListener("click", openModalVideo);
  videoBtnClose?.addEventListener("click", closeModalVideo);
  /* HERO */
  /* ************************** */
  /* ************************** */
  /* ************************** */
}

window.addEventListener("load", main);
