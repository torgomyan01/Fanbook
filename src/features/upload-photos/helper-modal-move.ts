export const removeClassActiveEventsMenus = () => {
    const eventTables = document.querySelectorAll('.button-to-move-modal');
    eventTables.forEach((items) => {
        items.classList.remove('active');
    });
};
