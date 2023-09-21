/* ************************** */
/* ************************** */
/* ************************** */
/* music PLAYER */
const MUTE = "musicPlayer-mute";
const PLAYING = "musicPlayer-playing";
const PLAYING_PAUSE = "musicPlayer-playing-pause";
const SPEED = "musicPlayer_changeSpeed-show";
const MUSIC_OPEN = "musicPlayer-open";
const MUSIC_OPEN_SUBMENU = "musicPlayer-open-subMenu";

class musicPlayer {
  constructor(container) {
    this.globalsPlay = document.querySelectorAll(".musicPlayer_global_play");
    //
    this.audio = document.getElementById("musicPlayer_audio");
    this.btn_mute = document.getElementById("musicPlayer_mute");
    this.playButtons = document.querySelectorAll(".musicPlayer_play");
    this.btn_forward = document.querySelectorAll(".musicPlayer_forward");
    this.btn_backward = document.querySelectorAll(".musicPlayer_backward");
    this.volumeSlider = document.getElementById("musicPlayer_volumeSlider");
    this.volumeBar = document.getElementById("musicPlayer_volumeBar");
    this.progressInput = document.getElementById("musicPlayer_progress");
    this.progresSlider = document.getElementById("musicPlayer_progresSlider");
    this.currentTime = document.getElementById("musicPlayer_time-current");
    this.totalTime = document.getElementById("musicPlayer_time-total");
    this.effectDisc = document.querySelector(".musicPlayer_image");
    this.songImage = document.getElementById("musicPlayer_image");
    this.songTitle = document.getElementById("musicPlayer_title");
    this.songLabel = document.getElementById("musicPlayer_label");
    this.close = document.getElementById("musicPlayer_close");
    this.btnSubMenu = document.getElementById("musicPlayer_subMenu");

    this.container = container;
    this.speedButtons = {};

    Array.from(this.globalsPlay).forEach((btn) =>
      btn.addEventListener("click", (e) => this.restartAudio(e))
    );
    this.audio.addEventListener("loadedmetadata", () => this.loadInitData());

    this.getSeedButtons();
    this.loadActions();
  }

  openSubMenu() {
    console.log("ok");
    if (
      window?.innerWidth <= 1023 &&
      this.container.classList.contains(MUSIC_OPEN)
    ) {
      this.container.classList.toggle(MUSIC_OPEN_SUBMENU);
    }

    if (this.container.classList.contains(MUSIC_OPEN_SUBMENU)) {
      window?.addEventListener("resize", () => this.closeSubMenuResize());
    } else {
      window?.removeEventListener("resize", () => this.closeSubMenuResize());
    }
  }

  closeSubMenuResize() {
    if (window?.innerWidth >= 1023) {
      this.container.classList.remove(MUSIC_OPEN_SUBMENU);
    }
  }

  loadActions() {
    this.btn_mute?.addEventListener("click", () => this.toggleMute());
    this.volumeSlider?.addEventListener("input", () => this.setVolume());
    this.progressInput?.addEventListener("input", () => this.setProgress());
    this.close.addEventListener("click", () => this.closePlayer());
    this.btnSubMenu.addEventListener("click", () => this.openSubMenu());

    Array.from(this.btn_forward).forEach((btn) =>
      btn.addEventListener("click", () => this.seekTime(15))
    );

    Array.from(this.btn_backward).forEach((btn) =>
      btn.addEventListener("click", () => this.seekTime(-15))
    );

    Array.from(this.playButtons).forEach((btn) =>
      btn.addEventListener("click", () => this.togglePlay())
    );

    //
    Array.from(Object.values(this.speedButtons)).forEach((values) => {
      Array.from(values).forEach((btn) =>
        btn.addEventListener("click", () => this.changeSpeed(btn))
      );
    });
  }

  loadInitData() {
    this.audio.currentTime = 0;
    this.audio.pause();

    this.setVolume();
    this.printTotalTime();
    this.togglePlay();

    this.container.classList.add(MUSIC_OPEN);
  }

  closePlayer() {
    this.container.classList.remove(MUSIC_OPEN);
    this.audio.pause();

    this.effectDisc.classList.remove(PLAYING);
    this.currentButton.classList.remove(PLAYING);
    this.container.classList.remove(MUSIC_OPEN_SUBMENU);
    Array.from(this.playButtons).forEach((btn) =>
      btn.classList.remove(PLAYING)
    );

    window?.removeEventListener("resize", () => this.closeSubMenuResize());

    this.currentButton = null;
    this.dataset = null;
    this.audio.src = "";
    this.songImage.src = "";
    this.songTitle.innerHTML = "";
    this.songLabel.innerHTML = "";
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    this.btn_mute?.classList.toggle(MUTE);
  }

  togglePlay() {
    if (this.audio.paused) {
      this.audio.play();
      this.effectDisc.classList.remove(PLAYING_PAUSE);
      this.currentButton.classList.remove(PLAYING_PAUSE);

      this.effectDisc.classList.add(PLAYING);
      this.currentButton.classList.add(PLAYING);

      Array.from(this.playButtons).forEach((btn) => btn.classList.add(PLAYING));

      this.audio.addEventListener("timeupdate", () => this.updateProgress());
    } else {
      this.audio.pause();
      this.effectDisc.classList.add(PLAYING_PAUSE);
      this.currentButton.classList.add(PLAYING_PAUSE);

      Array.from(this.playButtons).forEach((btn) =>
        btn.classList.remove(PLAYING)
      );

      this.audio.removeEventListener("timeupdate", () => this.updateProgress());
    }
  }

  getSeedButtons() {
    const speedButtons = document.querySelectorAll(".musicPlayer_changeSpeed");

    speedButtons.forEach((element) => {
      const dataSpeed = element.getAttribute("data-speed");

      if (!this.speedButtons[dataSpeed]) {
        this.speedButtons[dataSpeed] = [];
      }

      this.speedButtons[dataSpeed].push(element);
    });
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

  changeSpeed(btn) {
    const speed = btn.dataset.speed;
    this.audio.playbackRate = parseFloat(speed);
    this.hideAllChangeSpeed();

    switch (speed) {
      case "1.5":
        Array.from(this.speedButtons["2.0"]).forEach((btn) =>
          btn.classList.add(SPEED)
        );
        break;

      case "2.0":
        Array.from(this.speedButtons["1.0"]).forEach((btn) =>
          btn.classList.add(SPEED)
        );
        break;

      case "1.0":
        Array.from(this.speedButtons["1.5"]).forEach((btn) =>
          btn.classList.add(SPEED)
        );
        break;
    }
  }

  hideAllChangeSpeed() {
    Array.from(Object.values(this.speedButtons)).forEach((values) => {
      Array.from(values).forEach((btn) => btn.classList.remove(SPEED));
    });
  }

  restartAudio(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event?.currentTarget === this.currentButton) {
      this.togglePlay();
      return;
    }

    this.effectDisc?.classList.remove(PLAYING_PAUSE);
    this.effectDisc?.classList.remove(PLAYING);

    this.currentButton = event?.currentTarget;
    this.dataset = this.currentButton?.dataset;
    this.audio.src = this.dataset?.musicSrc;
    this.songImage.src = this.dataset?.musicImg;
    this.songTitle.innerHTML = this.dataset?.musicTitle;
    this.songLabel.innerHTML = this.dataset?.musicLabel;
  }
}

/* music PLAYER */
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

    console.log(
      !menu.contains(event.target) && !headerUserIcon.contains(event.target)
    );
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
    if (window?.innerWidth <= 639) {
      notifications.classList.remove(OPEN_NOTIFICATIONS);
      document.removeEventListener("click", closeUserMenu);
    }
  }

  function showNotifications(event) {
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
  /* HEADER MENU SEARCH */
  const SHOW_MODAL = "section_modal-open";
  const iconSearch = document.getElementById("header_icon_search");
  const searchModal = document.getElementById("header_search_modal");

  function hideSearchModal(event) {
    const content = searchModal.querySelector(".section_modal_content");

    if (
      !content?.contains(event.target) &&
      !iconSearch?.contains(event.target)
    ) {
      searchModal.classList.remove(SHOW_MODAL);
      document.removeEventListener("click", hideSearchModal);
    }
  }

  function openSearchModal(event) {
    searchModal?.classList.add(SHOW_MODAL);
    document.addEventListener("click", hideSearchModal);
  }

  iconSearch.addEventListener("click", openSearchModal)
  /* HEADER MENU SEARCH */
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
  /* music PLAYER */
  const music = document.getElementById("musicPlayer");

  if (music) {
    new musicPlayer(music);
  }
  /* music PLAYER */
  /* ************************** */
  /* ************************** */
  /* ************************** */

  /* ************************** */
  /* ************************** */
  /* ************************** */
  /* EFFECTS */
  const likeButtons = document.querySelectorAll(".like_action");

  Array.from(likeButtons).forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("like_active");
    });
  });
  /* EFFECTS */
  /* ************************** */
  /* ************************** */
  /* ************************** */

  /* ************************** */
  /* ************************** */
  /* ************************** */
  /* GRID VIDEOS */
  const SHOW_IFRAME = "video_iframe-visible";

  const videos = document.querySelectorAll(".videos_item_image");

  function iframeVideo(url) {
    return `<div class="video_iframe">
      <iframe
        width="560"
        height="315"
        src="${url}"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </div>
    `;
  }

  function showIframe(container, iframe) {
    container?.classList.add(SHOW_IFRAME);
    iframe?.removeEventListener("load", showIframe);
  }

  function loadIframe(video) {
    const container = video?.querySelector(".video_iframe");
    const iframe = container?.querySelector("iframe");

    iframe?.addEventListener("load", () => showIframe(container, iframe));
  }

  function focusVideo(video) {
    const exist = video?.querySelector(".video_iframe");

    if (exist) {
      exist.remove();
    }

    const iframe = iframeVideo(video?.dataset?.url) ?? null;

    video?.insertAdjacentHTML("beforeend", iframe);
    loadIframe(video);
  }

  function leaveVideo(video) {
    const iframe = video?.querySelector(".video_iframe");

    if (iframe) {
      video?.removeChild(iframe);
    }
  }

  Array.from(videos).forEach((video) => {
    video.addEventListener("mouseenter", () => focusVideo(video));
    video.addEventListener("mouseleave", () => leaveVideo(video));
  });
  /* GRID VIDEOS */
  /* ************************** */
  /* ************************** */
  /* ************************** */

  /* ************************** */
  /* ************************** */
  /* ************************** */
  /* CHANGE THEME */
  const themeButtons = document.querySelectorAll(".change_theme");

  function changeTheme(event) {
    event.preventDefault();
    event.stopPropagation();

    const body = document.body;
    const current = body.getAttribute("data-theme");

    if (current) {
      body.setAttribute("data-theme", "");
    } else {
      body.setAttribute("data-theme", "dark");
    }
  }

  Array.from(themeButtons).forEach((button) => {
    button.addEventListener("click", changeTheme);
  });
  /* CHANGE THEME */
  /* ************************** */
  /* ************************** */
  /* ************************** */
}

window.addEventListener("load", main);
