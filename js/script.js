/* ************************** */
/* ************************** */
/* ************************** */
/* MUSIC PLAYER */
const MUTE = "musicPlayer-mute";
const PLAYING = "musicPlayer-playing";
const SPEED = "musicPlayer_changeSpeed-show";

class MusicPlayer {
  constructor() {
    this.audio = document.getElementById("musicPlayer_audio");
    this.btn_mute = document.getElementById("musicPlayer_mute");
    this.playButtons = document.querySelectorAll(".musicPlayer_play");
    this.btn_forward = document.getElementById("musicPlayer_forward");
    this.btn_backward = document.getElementById("musicPlayer_backward");
    this.volumeSlider = document.getElementById("musicPlayer_volumeSlider");
    this.volumeBar = document.getElementById("musicPlayer_volumeBar");
    this.progressInput = document.getElementById("musicPlayer_progress");
    this.progresSlider = document.getElementById("musicPlayer_progresSlider");
    this.currentTime = document.getElementById("musicPlayer_time-current");
    this.totalTime = document.getElementById("musicPlayer_time-total");
    this.speedButtons = document.querySelectorAll(".musicPlayer_changeSpeed");
    this.image = document.querySelector(".musicPlayer_image");

    this.loadActions();
    this.loadInitData();
  }

  loadActions() {
    this.btn_mute?.addEventListener("click", () => this.toggleMute());
    this.btn_forward?.addEventListener("click", () => this.seekTime(15));
    this.btn_backward?.addEventListener("click", () => this.seekTime(-15));
    this.volumeSlider?.addEventListener("input", () => this.setVolume());
    this.progressInput?.addEventListener("input", () => this.setProgress());

    Array.from(this.playButtons).forEach((btn) => {
      btn.addEventListener("click", () => this.togglePlay());
    });

    Array.from(this.speedButtons).forEach((btn) => {
      btn.addEventListener("click", () => this.changeSpeed(btn.dataset.speed));
    });
  }

  loadInitData() {
    this.setVolume();
    this.printTotalTime();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    this.btn_mute?.classList.toggle(MUTE);
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
      Array.from(this.playButtons).forEach((btn) => btn.classList.add(PLAYING));
      this.audio.addEventListener("timeupdate", () => this.updateProgress());
      this.image.classList.add(PLAYING);
    } else {
      this.audio.pause();
      this.image.classList.remove(PLAYING);
      Array.from(this.playButtons).forEach((btn) =>
        btn.classList.remove(PLAYING)
      );
    }
  }

  setVolume() {
    this.volume = parseFloat(this.volumeSlider.value);
    this.audio.volume = this.volume;
    this.volumeBar.style.width = `${this.volume * 100}%`;
    this.setMute();
  }

  setMute(isMuted = false) {
    this.audio.muted = isMuted;
    this.isMuted = isMuted;

    if (isMuted) {
      this.btn_mute?.classList.add(MUTE, isMuted);
    } else {
      this.btn_mute?.classList.remove(MUTE, isMuted);
    }
  }

  seekTime(seconds) {
    this.audio.currentTime += seconds;
  }

  updateProgress() {
    const currentTime = this.audio.currentTime;
    const duration = this.audio.duration;

    if (!isNaN(duration)) {
      const percent = currentTime / duration;
      this.progressInput.value = percent;
      this.progresSlider.style.width = `${percent * 100}%`;
      this.printCurrentTime();
    }
  }

  setProgress() {
    const percent = this.progressInput.value;
    const duration = this.audio.duration;

    if (!isNaN(duration)) {
      const newPosition = percent * duration;
      this.audio.currentTime = newPosition;
      this.progresSlider.style.width = `${percent * 100}%`;
    }
  }

  getTimeInMinutes(seconds) {
    const totalMinutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedTime = `${totalMinutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
    return formattedTime;
  }

  getTotalTimeFormatted() {
    const duration = this.audio.duration;
    if (!isNaN(duration)) {
      return this.getTimeInMinutes(duration);
    }
    return "00:00";
  }

  getCurrentTimeFormatted() {
    const currentTime = this.audio.currentTime;
    return this.getTimeInMinutes(currentTime);
  }

  printCurrentTime() {
    const currentTime = this.getCurrentTimeFormatted();
    this.currentTime.innerHTML = currentTime;
  }

  printTotalTime() {
    const totalTime = this.getTotalTimeFormatted();
    this.totalTime.innerHTML = totalTime;
  }

  changeSpeed(speed) {
    this.audio.playbackRate = parseFloat(speed);
    this.hideAllChangeSpeed();

    switch (speed) {
      case "1.5":
        this.speedButtons[1].classList.add(SPEED);
        break;

      case "2.0":
        this.speedButtons[2].classList.add(SPEED);
        break;

      case "1.0":
        this.speedButtons[0].classList.add(SPEED);
        break;
    }
  }

  hideAllChangeSpeed() {
    Array.from(this.speedButtons).forEach((btn) => {
      btn.classList.remove(SPEED);
    });
  }
}

/* MUSIC PLAYER */
/* ************************** */
/* ************************** */
/* ************************** */

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
  const trendingToìcSlider = document.querySelector(".trendingTopics_slider");

  if (trendingToìcSlider) {
    const slider = new Splide(trendingToìcSlider, {
      arrowPath:
        "M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z",
      classes: {
        arrow: "splide__arrow trendingTopics-arrow",
        prev: "splide__arrow--prev trendingTopics-prev",
        next: "splide__arrow--next trendingTopics-next",
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
        },
      },
    });

    slider.mount();
  }
  /* TRENDING TOPICS */
  /* ************************** */
  /* ************************** */
  /* ************************** */

  /* ************************** */
  /* ************************** */
  /* ************************** */
  /* MUSIC PLAYER */
  const music = document.getElementById("musicPlayer");

  if (music) {
    new MusicPlayer();
  }
  /* MUSIC PLAYER */
  /* ************************** */
  /* ************************** */
  /* ************************** */
}

window.addEventListener("load", main);
