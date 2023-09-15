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
  const itemsMenu = document.querySelectorAll(".header_menu_item") ?? [];
  const shadowHeader = document.querySelector(".header_main_shadow");

  function validateWindow() {
    return window?.innerWidth <= 1023;
  }

  function openMenu(event) {
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
      const allSubMennus = subMenu?.querySelectorAll(`.${OPEN_SUBMENU}`) ?? [];

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

    const allSubMennus = document.querySelectorAll(`.${OPEN_SUBMENU}`) ?? [];
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
  /* HEADER MENU NOTIFICATIONS */
  const OPEN_NOTIFICATIONS = "user_notifications-open";
  const btnNotifications = document.getElementById("user_notifications_btn");
  const notifications = document.getElementById("user_notifications");

  function hideNotifications(event) {
    event?.preventDefault();
    event?.stopPropagation();

    if (
      !notifications.contains(event.target) &&
      !btnNotifications.contains(event.target)
    ) {
      notifications.classList.remove(OPEN_NOTIFICATIONS);
      document.removeEventListener("click", closeUserMenu);
      window.removeEventListener("resize", hideNotificationsAction);
    }
  }

  function hideNotificationsAction(event) {
    event?.preventDefault();
    event?.stopPropagation();

    if (window?.innerWidth <= 639) {
      notifications.classList.remove(OPEN_NOTIFICATIONS);
      document.removeEventListener("click", closeUserMenu);
    }
  }

  function showNotifications(event) {
    event?.preventDefault();
    event?.stopPropagation();

    notifications?.classList?.toggle(OPEN_NOTIFICATIONS);
    document.addEventListener("click", hideNotifications);
    window.addEventListener("resize", hideNotificationsAction);
  }

  btnNotifications?.addEventListener("click", showNotifications);
  /* HEADER MENU NOTIFICATIONS */
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

  /* ********************************** */
  /* ********************************** */
  /* ********************************** */
  /* DASH BOARD */
  const DASHBOARD_BTN_SHOW = "dashboard_btn-active";
  const DASHBOARD_ITEM_SHOW = "dashboard_main_item-active";
  const dashboardBtn = document.querySelectorAll("button.dashboard_btn") ?? [];
  const dashboardItem =
    document.querySelectorAll("div.dashboard_main_item") ?? [];

  function clearDashboard() {
    Array.from(dashboardBtn).forEach((btn) => {
      btn?.classList?.remove(DASHBOARD_BTN_SHOW);
    });

    Array.from(dashboardItem).forEach((item) => {
      item?.classList?.remove(DASHBOARD_ITEM_SHOW);
    });
  }

  function showDashboardItem(event) {
    event?.preventDefault();
    event?.stopPropagation();

    const btn = event?.currentTarget;
    const op = btn?.getAttribute("op");
    const item = document.querySelector(`div[op="${op}"].dashboard_main_item`);

    clearDashboard();

    item?.classList?.add(DASHBOARD_ITEM_SHOW);
    btn?.classList?.add(DASHBOARD_BTN_SHOW);
  }

  Array.from(dashboardBtn).forEach((btn) => {
    btn?.addEventListener("click", showDashboardItem);
  });
  /* DASH BOARD */
  /* ********************************** */
  /* ********************************** */
  /* ********************************** */

  /* ************************** */
  /* ************************** */
  /* ************************** */
  /* ACTIONS */
  const OPEN_MENU_MORE = "action_community_menu-open";
  const menuMoreBtn = document.getElementById("menu_more");
  const menuMore = document.getElementById("action_community_menu_more");

  function hideMore(event) {
    event?.preventDefault();
    event?.stopPropagation();

    if (
      !menuMore.contains(event.target) &&
      !menuMoreBtn.contains(event.target)
    ) {
      menuMore.classList.remove(OPEN_MENU_MORE);
      document.removeEventListener("click", hideMore);
    }
  }

  function showMore(event) {
    event?.preventDefault();
    event?.stopPropagation();

    menuMore?.classList?.toggle(OPEN_MENU_MORE);

    if (menuMore?.classList?.contains(OPEN_MENU_MORE)) {
      document.addEventListener("click", hideMore);
    }
  }

  menuMoreBtn?.addEventListener("click", showMore);
  /* ACTIONS */
  /* ************************** */
  /* ************************** */
  /* ************************** */

  /* ************************** */
  /* ************************** */
  /* ************************** */
  /* TRENDING TOPICS */
  const trendingToìcSlider = document.querySelector('.trendingTopics_slider');

  if (trendingToìcSlider) {
    const slider = new Splide(trendingToìcSlider, {
      arrowPath: 'M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z',
      classes: {
        arrow : 'splide__arrow trendingTopics-arrow',
        prev  : 'splide__arrow--prev trendingTopics-prev',
        next  : 'splide__arrow--next trendingTopics-next',
      },
      perPage: 5,
      perMove: 1,
      pagination: false,
      breakpoints: {
        1279: {
          perPage: 4,
        },
        1024: {
          perPage: 3,
        },
        499: {
          perPage: 2,
        },
        320: {
          perPage: 1,
        }
      }
    });

    slider.mount();
  }
  /* TRENDING TOPICS */
  /* ************************** */
  /* ************************** */
  /* ************************** */
}

window.addEventListener("load", main);
