function main() {
  /* ************************** */
  /* ************************** */
  /* ************************** */
  /* HEADER MENU USER */
  const OPEN_USER_MENU = "open_user_menu";
  const headerUserIcon = document.getElementById("header_user_icon");

  function closeUserMenu(event) {
    const menu = document.getElementById("user_menu");

    if (!menu.contains(event.target) && !headerUserIcon.contains(event.target)) {
      menu.classList.remove(OPEN_USER_MENU);
      document.removeEventListener("click", closeUserMenu);
    }
  }

  function openUserMenu() {
    const menu = document.getElementById("user_menu");
    console.log(menu)

    menu.classList.toggle(OPEN_USER_MENU);
    document.addEventListener("click", closeUserMenu);
  }

  headerUserIcon.addEventListener("click", openUserMenu);
  /* HEADER MENU USER */
  /* ************************** */
  /* ************************** */
  /* ************************** */
}

window.addEventListener("load", main);
