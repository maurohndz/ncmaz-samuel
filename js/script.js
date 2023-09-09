function main() {
  /* ************************** */
  /* ************************** */
  /* ************************** */
  /* HEADER MENU */
  const OPEN_MENU = "header_menu-open";
  const OPEN_SUBMENU = "header_subMenu-open";

  const headerMenuOpen = document.getElementById("header_btn-open");
  const headerMenuClose = document.getElementById("header_btn-close");
  const menu = document.getElementById("header_menu");
  const itemsMenu = document.querySelectorAll(".header_menu_item");
  const shadowHeader = document.querySelector(".header_main_shadow");

  function validateWindow() {
    return window?.innerWidth <= 1023;
  }

  function openMenu(event) {
    event?.preventDefault();
    event?.stopPropagation();

    if (validateWindow()) {
      menu?.classList?.add(OPEN_MENU);

      shadowHeader?.addEventListener("click", clickOutSideMenu);
      Array.from(itemsMenu).forEach((item) =>
        item.addEventListener("click", toggleSubMenu)
      );
    }
  }

  function toggleSubMenu(event) {
    event?.preventDefault();
    event?.stopPropagation();

    const elementCliked = event?.currentTarget;
    const subMenu = elementCliked?.nextElementSibling;

    subMenu?.classList?.toggle(OPEN_SUBMENU);

    if (!subMenu?.classList?.contains(OPEN_SUBMENU)) {
      const allSubMennus = subMenu?.querySelectorAll(`.${OPEN_SUBMENU}`);

      Array.from(allSubMennus).forEach((item) =>
        item?.classList?.remove(OPEN_SUBMENU)
      );
    }
  }

  function clickOutSideMenu(event) {
    closeMenu(event);
  }

  function closeMenu(event) {
    event?.preventDefault();
    event?.stopPropagation();

    menu?.classList?.remove(OPEN_MENU);

    const allSubMennus = document.querySelectorAll(`.${OPEN_SUBMENU}`);
    Array.from(allSubMennus).forEach((item) =>
      item?.classList?.remove(OPEN_SUBMENU)
    );

    shadowHeader?.removeEventListener("click", clickOutSideMenu);
    Array.from(itemsMenu).forEach((item) =>
      item.removeEventListener("click", toggleSubMenu)
    );
  }

  function handleResize(event) {
    if (!validateWindow()) closeMenu(event);
  }

  window?.addEventListener("resize", handleResize);
  headerMenuOpen?.addEventListener("click", openMenu);
  headerMenuClose?.addEventListener("click", closeMenu);
  /* HEADER MENU */
  /* ************************** */
  /* ************************** */
  /* ************************** */

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
