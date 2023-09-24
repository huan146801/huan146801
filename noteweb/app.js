document.addEventListener('DOMContentLoaded', () => {
    const noteTitle = document.getElementById('note-title');
    const noteContent = document.getElementById('note-content');
    const saveButton = document.getElementById('save-button');
    const notesList = document.getElementById('notes');
    const noteDetail = document.getElementById('note-detail');
    const detailTitle = document.getElementById('detail-title');
    const detailContent = document.getElementById('detail-content');
    const deleteButton = document.getElementById('delete-button');
    const translateButton = document.getElementById('translate-button');

    // Lấy danh sách ghi chú từ Local Storage
    let notes = JSON.parse(localStorage.getItem('notes')) || [];

    // Hiển thị danh sách ghi chú
    function displayNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = note.title;
            listItem.addEventListener('click', () => showNoteDetail(index));
            notesList.appendChild(listItem);
        });
    }

    // Hiển thị chi tiết ghi chú
    function showNoteDetail(index) {
        const note = notes[index];
        detailTitle.textContent = note.title;
        detailContent.textContent = note.content;
        noteDetail.style.display = 'block';
        deleteButton.addEventListener('click', () => deleteNote(index));
        translateButton.addEventListener('click', () => translateNoteContent(note.content));
    }

    // Xóa ghi chú
    function deleteNote(index) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        noteDetail.style.display = 'none';
        displayNotes();
    }

    // Dịch nội dung ghi chú
    function translateNoteContent(content) {
        // Sử dụng Google Translate API để dịch
        // Thực hiện cuộc gọi API tại đây và hiển thị kết quả
        // Sau khi nhận được kết quả, hiển thị nó trong giao diện người dùng
    }

    // Lưu ghi chú mới vào Local Storage
    saveButton.addEventListener('click', () => {
        const title = noteTitle.value;
        const content = noteContent.value;
        if (title && content) {
            notes.push({ title, content });
            localStorage.setItem('notes', JSON.stringify(notes));
            noteTitle.value = '';
            noteContent.value = '';
            displayNotes();
        }
    });

    // Hiển thị danh sách ghi chú ban đầu
    displayNotes();
});
